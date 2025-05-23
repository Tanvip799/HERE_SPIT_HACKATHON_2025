import os
import json
import asyncio # Needed for running async functions from sync context
import datetime # Needed for adding timestamp to results
import psycopg2 # PostgreSQL client for Python
from psycopg2.extras import RealDictCursor # To get results as dictionaries

# --- Import Langchain components needed to build the chain ---
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from langchain_core.runnables import RunnableSequence
from langchain_google_genai import ChatGoogleGenerativeAI
from dotenv import load_dotenv

# --- Flask Setup ---
from flask import Flask, request, jsonify

app = Flask(__name__)

# Load environment variables from .env file
load_dotenv()

# --- Configuration ---
# Explicitly set the environment variable for Langchain to pick up
os.environ["GOOGLE_API_KEY"] = os.getenv("GOOGLE_API_KEY")

# --- Database Configuration ---
DB_NAME = os.getenv("DB_NAME") or 'db123'
DB_USER = os.getenv("DB_USER") or 'user123'
DB_PASSWORD = os.getenv("DB_PASSWORD") or 'password123'
DB_HOST = os.getenv("DB_HOST") or 'localhost'
DB_PORT = os.getenv("DB_PORT") or '5432'

# --- Build the Langchain Chain ---
json_format_instructions = """
The output should be a JSON object with the following keys:
- depts: A list of strings, where each string is the name of a relevant department or organization the person should contact from the given list("police", "firebrigade", "hospital"). Infer these from the transcript.
- person_name: A string representing the full name of the person speaking or being discussed in the transcript. Extract this directly from the transcript if mentioned. If not explicitly mentioned, state "Unknown".
- summary: A concise string summarizing the main situation or problem described in the transcript.
- key_issues: A list of strings, highlighting the main problems or challenges the person is facing based on the transcript.
- location (optional): A string representing the location mentioned in the transcript, if any. If no specific location is mentioned, omit this key.
- timestamp (optional): A string representing a specific time or date mentioned in the transcript, if any. If no specific time is mentioned, omit this key.
- suggestion(optional):A string representing instructions that the person should follow in their case of emergency (DONOT RECOMMEND CONTACTING emergency services).
"""

prompt = ChatPromptTemplate.from_template(
    """
You are an AI assistant specializing in summarizing transcripts related to emergencies.
Your goal is to extract key information from the provided transcript and format it as a JSON object.
{json_format_instructions}
Here is the transcript:
{transcript}
Please provide the output in the specified JSON format.
"""
)

llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash-latest", temperature=0)

output_parser = JsonOutputParser()

# The Langchain chain instance
chain = (
    prompt.partial(json_format_instructions=json_format_instructions)
    | llm
    | output_parser
)

# --- PostgreSQL Database Connection ---
def get_db_connection():
    """Establishes and returns a new database connection."""
    try:
        conn = psycopg2.connect(
            dbname=DB_NAME,
            user=DB_USER,
            password=DB_PASSWORD,
            host=DB_HOST,
            port=DB_PORT
        )
        return conn
    except psycopg2.OperationalError as e:
        print(f"Database connection failed: {e}")
        return None

# --- PostGIS Spatial Lookup Function ---
def findPlacesWithinRadius(
  centerLat,
  centerLng,
  radiusMeters,
  dept # Assuming dept is the table name (e.g., 'police', 'firebrigade')
):
  """
  Finds places within a given radius from a center point, ordered by distance.
  Uses the specified department name as the table name.
  Returns the closest place found, or None if none found.
  """
  conn = None
  cursor = None
  try:
    conn = get_db_connection()
    if conn is None:
        print("Skipping spatial lookup due to database connection failure.")
        return None

    cursor = conn.cursor(cursor_factory=RealDictCursor)
    query = f"""
      SELECT
        id,
        name,
        ST_Distance(location, ST_SetSRID(ST_MakePoint(%s, %s), 4326)::geography) AS distance_meters,
        ST_Y(location::geometry) AS latitude,
        ST_X(location::geometry) AS longitude
      FROM {dept}
      WHERE ST_DWithin(location, ST_SetSRID(ST_MakePoint(%s, %s), 4326)::geography, %s)
      ORDER BY
        ST_Distance(location, ST_SetSRID(ST_MakePoint(%s, %s), 4326)::geography)
      LIMIT 1;
    """
    cursor.execute(query, (centerLng, centerLat, centerLng, centerLat, radiusMeters, centerLng, centerLat))
    closest_place = cursor.fetchone()
    return closest_place

  except psycopg2.Error as e:
    print(f"Error finding places within radius for dept '{dept}': {e}")
    return None
  finally:
    if cursor:
      cursor.close()
    if conn:
      conn.close()

# --- Asynchronous Langchain Processing Function ---
async def process_transcript_async(transcript_text: str):
    """
    Processes a transcript using the Langchain chain asynchronously.
    """
    try:
        result =  chain.invoke({"transcript": transcript_text})
        return result
    except Exception as e:
        print(f"An error occurred during Langchain chain execution: {e}")
        return None

# --- Flask API Endpoint ---
@app.route('/process_transcript', methods=['POST'])
def process_transcript_endpoint():
    """
    Flask API endpoint to process a transcript and find nearby services.
    Expects a JSON payload with 'transcript', 'lat', and 'lng'.
    """
    print(f" [x] Received API request")

    try:
        request_data = request.get_json()
        if not request_data:
            return jsonify({"error": "Invalid JSON payload"}), 400

        transcript = request_data.get('transcript')
        lat = request_data.get('lat')
        lng = request_data.get('lng')

        # Validate essential message data
        if not all([transcript, lat is not None, lng is not None]):
            print(" [!] Received invalid request data (missing transcript, lat, or lng).")
            return jsonify({"error": "Missing transcript, lat, or lng in request body"}), 400

        # --- Perform the Langchain processing ---
        # Use asyncio.run() to execute the async Langchain chain from this sync Flask route
        processed_transcript_data = asyncio.run(process_transcript_async(transcript))

        if processed_transcript_data is None:
            print(f" [!] Transcript processing failed.")
            return jsonify({"error": "Transcript processing failed"}), 500

        print(f"Langchain processing complete.")

        # --- Perform the PostGIS spatial lookup ---
        depts_to_contact = processed_transcript_data.get('depts', [])
        closest_places_results = {}
        radius = 5000 # Define search radius in meters

        for dept in depts_to_contact:
            try:
                closest_place = findPlacesWithinRadius(lat, lng, radius, dept)
                if closest_place:
                    closest_places_results[dept] = closest_place
                    print(f"Found closest {dept}")
                else:
                    print(f"No {dept} found within radius")
            except Exception as e:
                print(f"Error during spatial lookup for {dept}: {e}")
                # Continue to the next department even if one lookup fails

        # --- Prepare the final result ---
        final_result_payload = {
            "transcript_analysis": processed_transcript_data,
            "closest_nearby_services": closest_places_results,
            "status": "completed",
            "timestamp": datetime.datetime.now().isoformat()
        }

        return jsonify(final_result_payload), 200

    except Exception as e:
        print(f" [!] An unexpected error occurred during API request processing: {e}")
        return jsonify({"error": "An unexpected error occurred", "details": str(e)}), 500

# --- Main execution block (for running Flask development server) ---
if __name__ == '__main__':
    # Note: For production, use a WSGI server like Gunicorn or uWSGI
    # Example: gunicorn --workers 4 --bind 0.0.0.0:5000 your_flask_app_file:app
    app.run(debug=True, port=5001) # Changed port to 5001 to avoid conflict if other apps use 5000