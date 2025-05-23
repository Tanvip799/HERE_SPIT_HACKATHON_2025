require("dotenv").config();
const connectDB = require("./services/connect");
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const port = 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Get API key from environment variables
const OLAMAPS_API_KEY = process.env.OLAMAPS_API_KEY;

// Route coordinates
const startLat = 19.1659;
const startLng = 72.96568;
const endLat = 19.17229;
const endLng = 72.956469;

// Build OlaMaps API URL
const url = `https://api.olamaps.io/routing/v1/directions/basic?origin=${startLat}%2C${startLng}&destination=${endLat}%2C${endLng}&alternatives=false&steps=true&overview=full&language=en&api_key=${OLAMAPS_API_KEY}`;

const config = {
  headers: {
    accept: "application/json",
    origin: "http://10.10.114.197:8082",
  },
};

// Routes
// Uncomment and implement routes as needed
// const login = require("./routes/login");
// const messages = require("./routes/getMessages"); 
// const forum = require("./routes/forum");
// const gemini = require("./routes/gemini");
// const ai = require("./routes/ai");
// app.use("/api/login", login);
// app.use("/api/messages", messages);
// app.use("/api/forum", forum);
// app.use("/api/gemini", gemini);
// app.use("/api/ai", ai);

const start = async () => {
  try {
    await connectDB();
    
    // Make request to OlaMaps API
    const response = await axios.post(url, null, { headers: config.headers });
    console.log("Route data:", response.data.routes[0]);

  } catch (error) {
    console.error("Error:", error.message);
  }
};

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

start();
