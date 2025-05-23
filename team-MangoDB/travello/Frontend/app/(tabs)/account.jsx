// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   Image,
//   ScrollView,
//   Dimensions,
//   Animated,
// } from "react-native";
// import { FontAwesome5 } from "@expo/vector-icons";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { router } from "expo-router";

// const Account = () => {
//   // Sample travel history data - in real app, this would come from API/backend
//   const travelHistory = {
//     busTrips: 45,
//     trainTrips: 12,
//     averageWeeklyTrips: 8,
//     mostFrequentRoutes: ["Route 101", "Central Line"],
//     peakHours: "8 AM - 10 AM"
//   };

//   // Generated pass suggestions based on travel history
//   const passRecommendations = [
//     {
//       id: "1",
//       type: "Smart Commute",
//       duration: "Monthly",
//       price: 999,
//       savings: 450,
//       description: "Unlimited bus and train rides",
//       bestMatch: true,
//     }
//   ];

//   const menuOptions = [
//     { id: "1", name: "Previous Rides", icon: "history", onPress: () => router.push("/previous-rides") },
//     { id: "2", name: "Payment Methods", icon: "credit-card", onPress: () => {} },
//     { id: "3", name: "Settings", icon: "cog", onPress: () => {} },
//     { id: "4", name: "Help", icon: "question-circle", onPress: () => {} },
//     { id: "5", name: "Logout", icon: "sign-out-alt", onPress: () => {} },
//   ];

//   const PassCard = ({ pass }) => (
//     <TouchableOpacity 
//       className={`p-4 rounded-xl mb-3 ${pass.bestMatch ? 'bg-emerald-50 border-2 border-emerald-500' : 'bg-white'}`}
//     >
//       <View className="flex-row justify-between items-center mb-2">
//         <View className="flex-row items-center">
//           <Text className="text-xl font-pbold text-gray-800">{pass.type}</Text>
//           {pass.bestMatch && (
//             <View className="bg-emerald-500 rounded-full px-2 py-1 ml-2">
//               <Text className="text-white text-xs font-pbold">Best Match</Text>
//             </View>
//           )}
//         </View>
//         <Text className="text-2xl font-pbold text-emerald-600">₹{pass.price}</Text>
//       </View>
      
//       <Text className="text-gray-600 mb-2">{pass.description}</Text>
      
//       <View className="flex-row justify-between items-center">
//         <Text className="text-gray-500">{pass.duration}</Text>
//         <View className="flex-row items-center">
//           <FontAwesome5 name="piggy-bank" size={16} color="#059669" className="mr-1" />
//           <Text className="text-emerald-600 font-pmedium">Save ₹{pass.savings}</Text>
//         </View>
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <SafeAreaView className="flex-1 bg-gray-50">
//       <ScrollView className="flex-1 px-4 pt-6">
//         <View className="flex-row items-center mb-8">
//           <Image
//             source={{ uri: "https://i.pravatar.cc/150?img=68" }}
//             className="w-24 h-24 rounded-full mr-4"
//           />
//           <View>
//             <Text className="text-3xl font-pbold text-gray-800">Nimit Sheth</Text>
//             <Text className="text-lg font-pmedium text-gray-600">nimit@example.com</Text>
//           </View>
//         </View>

//         <View className="bg-white rounded-xl shadow-sm p-4 mb-6">
//           <Text className="text-xl font-psemibold text-gray-800 mb-2">Travelo Wallet</Text>
//           <Text className="text-3xl font-pbold text-emerald-600">₹120.50</Text>
//           <TouchableOpacity
//             className="bg-emerald-600 rounded-lg py-2 px-4 mt-4 flex-row items-center justify-center"
//             onPress={() => console.log("Add funds")}
//           >
//             <FontAwesome5 name="plus-circle" size={16} color="white" className="mr-2" />
//             <Text className="text-white font-psemibold text-base">Add Funds</Text>
//           </TouchableOpacity>
//         </View>

//         <View className="mb-6">
//           <View className="flex-row justify-between items-center mb-4">
//             <Text className="text-xl font-psemibold text-gray-800">Recommended Passes</Text>
//             <TouchableOpacity className="flex-row items-center">
//               <Text className="text-emerald-600 font-pmedium mr-1">View All</Text>
//               <FontAwesome5 name="chevron-right" size={14} color="#059669" />
//             </TouchableOpacity>
//           </View>
          
//           <View className="bg-white rounded-xl p-4 mb-4">
//             <Text className="text-gray-600 mb-3">
//               You've traveled through bus {travelHistory.busTrips} times this month! 🚌
//             </Text>
//             <Text className="text-emerald-600 font-pmedium mb-3">
//               Get our Monthly Bus Pass and save up to 30% on your daily commute!
//             </Text>
//             <View className="flex-row flex-wrap">
//               <View className="bg-emerald-100 rounded-lg px-3 py-1 mr-2 mb-2">
//                 <Text className="text-primary">🎯 Perfect for your commute</Text>
//               </View>
//               <View className="bg-emerald-100 rounded-lg px-3 py-1 mr-2 mb-2">
//                 <Text className="text-primary">💰 Best value for money</Text>
//               </View>
//               <View className="bg-gray-100 rounded-lg px-3 py-1 mr-2 mb-2">
//                 <Text className="text-gray-700">~{travelHistory.averageWeeklyTrips} Trips/Week</Text>
//               </View>
//             </View>
//           </View>

//           {passRecommendations.map(pass => (
//             <PassCard key={pass.id} pass={pass} />
//           ))}
//         </View>

//         <Text className="text-xl font-psemibold text-gray-800 mb-4">Account Settings</Text>
//         <FlatList
//           data={menuOptions}
//           keyExtractor={(item) => item.id}
//           scrollEnabled={false}
//           renderItem={({ item }) => (
//             <TouchableOpacity
//               key={item.id}
//               className="flex-row items-center bg-white rounded-lg px-4 py-4 mb-3 shadow-sm"
//               onPress={item.onPress}
//             >
//               <View className="bg-gray-100 rounded-full p-2 mr-4">
//                 <FontAwesome5
//                   name={item.icon}
//                   size={20}
//                   color="#4b5563"
//                 />
//               </View>
//               <Text className="text-lg text-gray-800 font-pmedium flex-1">
//                 {item.name}
//               </Text>
//               <FontAwesome5
//                 name="chevron-right"
//                 size={16}
//                 color="#9ca3af"
//               />
//             </TouchableOpacity>
//           )}
//         />
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default Account;
import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
  Linking,
  Vibration,
  Image,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { Accelerometer } from "expo-sensors";
import * as Location from "expo-location";
import axios from "axios";
import { Audio } from "expo-av";
import { MaterialIcons } from "@expo/vector-icons"; // For microphone icon
import MapView, { Marker } from 'react-native-maps'; // Import MapView and Marker

// Main App component for the crash detection simulator
const App = () => {
  // State variables for managing the application's state
  const [isMonitoring, setIsMonitoring] = useState(true);
  const [crashDetected, setCrashDetected] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [location, setLocation] = useState({
    latitude: 19.1232, // Default to a Mumbai location
    longitude: 72.8361, // Default to a Mumbai location
  });
  const [accelerometerData, setAccelerometerData] = useState({
    x: 0,
    y: 0,
    z: 0,
    force: 0,
  });
  const [message, setMessage] = useState("Monitoring accelerometer data...");
  const [capturedImageUri, setCapturedImageUri] = useState(null);

  // AUDIO RECORDING STATES
  const [isRecordingAudio, setIsRecordingAudio] = useState(false);
  const [audioRecording, setAudioRecording] = useState(null);
  const [emergencyTranscript, setEmergencyTranscript] = useState("");
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [manualTranscriptInput, setManualTranscriptInput] = useState(""); // For manual text input

  // Refs for managing intervals and timeouts
  const countdownIntervalRef = useRef(null);
  const crashTimeoutRef = useRef(null);
  const accelerometerSubscriptionRef = useRef(null);
  const locationSubscriptionRef = useRef(null);

  // Constants for crash detection logic
  const CRASH_THRESHOLD_FORCE = 2.5;
  const CRASH_THRESHOLD_CHANGE = 1.0;
  const ACCELEROMETER_UPDATE_INTERVAL = 200;
  const CRASH_ALERT_DELAY = 10000; // 10 seconds delay before triggering next action

  // Stores a history of accelerometer forces
  const forceHistory = useRef([]);
  const HISTORY_SIZE = 5;

  // Update the API base URL constant
  const API_BASE_URL = "http://10.10.114.197:5001"; // Change this to match your server

  // Function to handle accelerometer data updates
  const processAccelerometerData = useCallback(
    ({ x, y, z }) => {
      const force = Math.sqrt(x * x + y * y + z * z);
      setAccelerometerData({ x, y, z, force });

      forceHistory.current.push(force);
      if (forceHistory.current.length > HISTORY_SIZE) {
        forceHistory.current.shift();
      }

      if (!crashDetected) {
        if (forceHistory.current.length === HISTORY_SIZE) {
          const averagePreviousForce =
            forceHistory.current
              .slice(0, HISTORY_SIZE - 1)
              .reduce((sum, val) => sum + val, 0) /
            (HISTORY_SIZE - 1);
          const currentForce = forceHistory.current[HISTORY_SIZE - 1];

          if (
            currentForce > CRASH_THRESHOLD_FORCE &&
            Math.abs(currentForce - averagePreviousForce) >
              CRASH_THRESHOLD_CHANGE
          ) {
            handleCrash();
          }
        }
      }
    },
    [crashDetected]
  );

  // Effect hook to manage accelerometer and location monitoring and permissions
  useEffect(() => {
    const setupMonitoring = async () => {
      let { status: accelStatus } =
        await Accelerometer.requestPermissionsAsync();
      if (accelStatus !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Accelerometer permission is required for crash detection."
        );
        setIsMonitoring(false);
        setMessage("Accelerometer permission denied. Monitoring stopped.");
        return;
      }

      let { status: locationStatus } =
        await Location.requestForegroundPermissionsAsync();
      if (locationStatus !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Location permission is required to provide location in case of emergency."
        );
      }

      Accelerometer.setUpdateInterval(ACCELEROMETER_UPDATE_INTERVAL);
      accelerometerSubscriptionRef.current = Accelerometer.addListener(
        processAccelerometerData
      );

      locationSubscriptionRef.current = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000,
          distanceInterval: 10,
        },
        (newLocation) => {
          setLocation(newLocation.coords);
        }
      );

      setMessage("Monitoring accelerometer and location data...");
    };

    const stopMonitoring = () => {
      if (accelerometerSubscriptionRef.current) {
        accelerometerSubscriptionRef.current.remove();
        accelerometerSubscriptionRef.current = null;
      }
      if (locationSubscriptionRef.current) {
        locationSubscriptionRef.current.remove();
        locationSubscriptionRef.current = null;
      }
      setMessage("Monitoring stopped.");
    };

    if (isMonitoring) {
      setupMonitoring();
    } else {
      stopMonitoring();
    }

    return () => stopMonitoring();
  }, [isMonitoring, processAccelerometerData]);

  // Function to simulate taking a picture
  const simulateTakePicture = useCallback(() => {
    const timestamp = new Date().getTime();
    setCapturedImageUri(
      `https://placehold.co/200x150/FF0000/FFFFFF?text=Crash+Pic+${timestamp}`
    );
  }, []);

  // Function to start emergency audio recording
  const startEmergencyAudioRecording = async () => {
    try {
      if (audioRecording) {
        await audioRecording.stopAndUnloadAsync();
        setAudioRecording(null);
      }

      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording: newRecording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setAudioRecording(newRecording);
      setIsRecordingAudio(true);
      setMessage("Please speak about the emergency...");
      Vibration.vibrate(200); // Short vibrate to indicate recording start
    } catch (err) {
      console.error("Failed to start emergency audio recording", err);
      Alert.alert(
        "Recording Error",
        "Could not start audio recording. " + err.message
      );
      // Fallback: If recording fails, send alert without transcript
      sendEmergencyAlert(
        location,
        "Audio recording failed. No transcript available."
      );
      setMessage("Audio recording failed, sending alert without transcript.");
    }
  };

  // Function to stop emergency audio recording and trigger transcription
  const stopEmergencyAudioRecording = async () => {
    try {
      setIsRecordingAudio(false);
      setIsTranscribing(true); // Indicate transcription in progress
      setMessage("Stopping recording and transcribing...");
      Vibration.vibrate(300); // Vibrate to indicate recording stopped

      await audioRecording.stopAndUnloadAsync();
      const uri = audioRecording.getURI();
      setAudioRecording(null);

      await transcribeEmergencyAudio(uri);
    } catch (err) {
      console.error("Failed to stop emergency audio recording", err);
      Alert.alert(
        "Recording Error",
        "Could not stop audio recording. " + err.message
      );
      setIsTranscribing(false);
      // Fallback: If stopping fails, send alert without transcript
      sendEmergencyAlert(
        location,
        "Audio recording stop failed. No transcript available."
      );
      setMessage(
        "Audio recording stop failed, sending alert without transcript."
      );
    }
  };

  // Function to transcribe emergency audio
  const transcribeEmergencyAudio = async (audioUri) => {
    try {
      setIsTranscribing(true);
      setMessage("Transcribing emergency details...");

      const formData = new FormData();
      const fileUri =
        Platform.OS === "android" ? audioUri : audioUri.replace("file://", "");

      formData.append("file", {
        uri: fileUri,
        type: "audio/m4a",
        name: "emergency_recording.m4a",
      });

      const transcriptionUrl = `http://10.10.114.197:5000/transcribe`; // Use API_BASE_URL for consistency if it was same
      console.log("Sending transcription request to:", transcriptionUrl);

      const response = await fetch(transcriptionUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
          // 'Content-Type' will be set automatically by FormData for multipart/form-data
        },
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Transcription server response error:", errorText);
        throw new Error(`Transcription server error: ${response.status}`);
      }

      const result = await response.json();
      if (!result.text) {
        throw new Error("Invalid transcription response format: Missing text.");
      }

      setEmergencyTranscript(result.text);
      setIsTranscribing(false);
      setMessage("Transcription complete. Sending alert...");
      // Now, send the emergency alert with the transcribed text
      sendEmergencyAlert(location, result.text);
    } catch (error) {
      console.error("Transcription error:", error);
      setIsTranscribing(false);
      Alert.alert(
        "Transcription Failed",
        "Could not transcribe audio. " + error.message
      );
      // Fallback: If transcription fails, send alert with a default message
      sendEmergencyAlert(
        location,
        "No detailed transcript available due to error."
      );
      setMessage("Transcription failed, sending alert with default message.");
    }
  };

  // Function to handle sending alert from manual text input
  const handleManualSend = () => {
    if (manualTranscriptInput.trim()) {
      sendEmergencyAlert(location, manualTranscriptInput.trim());
      setManualTranscriptInput(""); // Clear input after sending
    } else {
      Alert.alert("No message", "Please type an emergency message or record audio.");
    }
  };

  // Function to handle crash detection
  const handleCrash = useCallback(async () => {
    if (crashDetected) return;

    setCrashDetected(true);
    Vibration.vibrate(500);
    setMessage("Crash Detected! Alerting emergency services...");
    setCountdown(10);
    simulateTakePicture();
    setEmergencyTranscript(""); // Clear previous transcript
    setManualTranscriptInput(""); // Clear manual input

    // Start the countdown interval for the emergency alert
    countdownIntervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownIntervalRef.current); // Stop countdown
          // Automatically start audio recording after countdown if not cancelled
          if (!isRecordingAudio && !isTranscribing) { // Only start if not already recording/transcribing
            startEmergencyAudioRecording();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // This timeout will ensure recording starts even if countdown is interrupted
    crashTimeoutRef.current = setTimeout(() => {
      if (crashDetected && !isRecordingAudio && !isTranscribing) {
        clearInterval(countdownIntervalRef.current);
        startEmergencyAudioRecording();
      }
    }, CRASH_ALERT_DELAY);
  }, [crashDetected, location, simulateTakePicture, isRecordingAudio, isTranscribing]);

  // Modified sendEmergencyAlert to accept transcript
  const sendEmergencyAlert = (coords, transcriptToSend) => {
    let mapUrl = "";
    console.log(
      "Sending alert with coordinates:",
      coords,
      "and transcript:",
      transcriptToSend
    );

    axios
      .post(`${API_BASE_URL}/process_transcript`, {
        transcript: transcriptToSend,
        lat: coords.latitude,
        lng: coords.longitude,
      })
      .then((res) => {
        console.log("Success:", res.data);

        const data = res.data;
        let detailedMessage = "Emergency Alert Dispatched!\n\n";

        // 1. Transcript Analysis
        if (transcriptToSend) {
          detailedMessage += `--- Your Emergency Description ---\n`;
          detailedMessage += `${transcriptToSend}\n\n`;
        }

        if (data.transcript_analysis) {
          detailedMessage += "--- AI Analysis ---\n";
          detailedMessage += `Summary: ${data.transcript_analysis.summary}\n`;
          if (
            data.transcript_analysis.key_issues &&
            data.transcript_analysis.key_issues.length > 0
          ) {
            detailedMessage += `Key Issues: ${data.transcript_analysis.key_issues.join(
              ", "
            )}\n`;
          }
          if (data.transcript_analysis.suggestion) {
            detailedMessage += `Suggestion: ${data.transcript_analysis.suggestion}\n`;
          }
          detailedMessage += "\n";
        }

        // 2. Location Information
        if (coords) {
          detailedMessage += `--- Location ---\n`;
          detailedMessage += `Approx. Location: ${coords.latitude.toFixed(
            4
          )}, ${coords.longitude.toFixed(4)}\n`;
          // Correct Google Maps URL format
          mapUrl = `https://www.google.com/maps/search/?api=1&query=${coords.latitude},${coords.longitude}`;
          detailedMessage += `\n`;
        } else {
          detailedMessage += "Location: Not available\n\n";
        }

        // 3. Closest Nearby Services
        if (data.closest_nearby_services) {
          detailedMessage += "--- Nearby Emergency Services ---\n";
          if (data.closest_nearby_services.police) {
            const police = data.closest_nearby_services.police;
            detailedMessage += `\nPolice: ${
              police.name
            } (${police.distance_meters.toFixed(0)}m away)`;
          }
          if (data.closest_nearby_services.firebrigade) {
            const firebrigade = data.closest_nearby_services.firebrigade;
            detailedMessage += `\nFire: ${
              firebrigade.name
            } (${firebrigade.distance_meters.toFixed(0)}m away)`;
          }
          if (data.closest_nearby_services.hospital) {
            const hospital = data.closest_nearby_services.hospital;
            detailedMessage += `\nHospital: ${
              hospital.name
            } (${hospital.distance_meters.toFixed(0)}m away)`;
          }
          detailedMessage += "\n";
        }

        setMessage(`🚨 Emergency Alert Dispatched!`);

        setCrashDetected(false);
        clearInterval(countdownIntervalRef.current);
        clearTimeout(crashTimeoutRef.current);
        forceHistory.current = [];
        setIsMonitoring(true);
        setCapturedImageUri(null);
        setEmergencyTranscript(""); // Clear transcript after sending
        setManualTranscriptInput(""); // Clear manual input

        Alert.alert(
          "Emergency Alert Dispatched!",
          detailedMessage,
          [
            {
              text: "View on Map",
              onPress: () => {
                if (mapUrl && Linking.canOpenURL(mapUrl)) {
                  Linking.openURL(mapUrl);
                } else {
                  Alert.alert("Error", "Cannot open Google Maps URL.");
                }
              },
            },
            { text: "OK", style: "cancel" },
          ],
          { cancelable: false }
        );
      })
      .catch((error) => {
        console.error("Error making API request:", error);
        if (error.response) {
          console.error("Data:", error.response.data);
          console.error("Status:", error.response.status);
          console.error("Headers:", error.response.headers);
          Alert.alert(
            "API Error",
            `Status: ${error.response.status}\nMessage: ${
              error.response.data?.error || "An error occurred on the server."
            }`
          );
        } else if (error.request) {
          console.error("Request made but no response:", error.request);
          Alert.alert(
            "Network Error",
            "No response from the server. Check your connection or server status."
          );
        } else {
          console.error("Error message:", error.message);
          Alert.alert(
            "Request Setup Error",
            `An error occurred: ${error.message}`
          );
        }
        console.error("Config:", error.config);

        setCrashDetected(false);
        clearInterval(countdownIntervalRef.current);
        clearTimeout(crashTimeoutRef.current);
        forceHistory.current = [];
        setIsMonitoring(true);
        setCapturedImageUri(null);
        setEmergencyTranscript(""); // Clear transcript on error
        setManualTranscriptInput(""); // Clear manual input on error
      });
  };

  // Function to cancel the emergency alert countdown (and audio recording)
  const cancelAlert = () => {
    clearInterval(countdownIntervalRef.current);
    clearTimeout(crashTimeoutRef.current);
    if (isRecordingAudio && audioRecording) {
      audioRecording.stopAndUnloadAsync().catch((e) =>
        console.error("Error stopping audio on cancel:", e)
      );
    }
    setIsRecordingAudio(false);
    setIsTranscribing(false);
    setMessage("Emergency alert cancelled.");
    resetDetection();
  };

  // Function to reset the detection state to initial values
  const resetDetection = () => {
    setCrashDetected(false);
    setCountdown(10);
    forceHistory.current = [];
    setIsMonitoring(true);
    setMessage("Monitoring accelerometer data...");
    setCapturedImageUri(null);
    setEmergencyTranscript(""); // Ensure transcript is cleared on full reset
    setManualTranscriptInput(""); // Clear manual input on full reset
  };

  // Cleanup effect
  useEffect(() => {
    return () => {
      clearInterval(countdownIntervalRef.current);
      clearTimeout(crashTimeoutRef.current);
      if (accelerometerSubscriptionRef.current) {
        accelerometerSubscriptionRef.current.remove();
      }
      if (locationSubscriptionRef.current) {
        locationSubscriptionRef.current.remove();
      }
      if (audioRecording?.getStatusAsync) {
        audioRecording
          .getStatusAsync()
          .then((status) => {
            if (!status.isLoaded) return;
            return audioRecording.stopAndUnloadAsync();
          })
          .catch((e) => {
            console.log("Audio cleanup:", e.message);
          });
      }
    };
  }, [audioRecording]);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>
          <Text style={styles.icon}>🚨</Text> Crash Detection
        </Text>

        {/* Manual Text Input and Voice Button */}
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Type emergency message or use voice..."
            placeholderTextColor="#888"
            value={manualTranscriptInput}
            onChangeText={setManualTranscriptInput}
            editable={!isRecordingAudio && !isTranscribing} // Disable when recording/transcribing
          />
          <TouchableOpacity
            style={styles.voiceButton}
            onPress={isRecordingAudio ? stopEmergencyAudioRecording : startEmergencyAudioRecording}
            disabled={isTranscribing} // Disable while transcribing
          >
            {isRecordingAudio ? (
              <MaterialIcons name="stop" size={24} color="#FFF" />
            ) : (
              <MaterialIcons name="mic" size={24} color="#FFF" />
            )}
          </TouchableOpacity>
        </View>

        {/* Send Button for Manual Input */}
        <TouchableOpacity
          onPress={handleManualSend}
          style={styles.sendButton}
          disabled={isRecordingAudio || isTranscribing || !manualTranscriptInput.trim()} // Disable if recording/transcribing or no text
        >
          <Text style={styles.buttonText}>Send Emergency Message</Text>
        </TouchableOpacity>


        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>{message}</Text>
          {isMonitoring && !crashDetected && !isRecordingAudio && !isTranscribing && (
            <Text style={styles.subMessageText}>
              Current Force: {accelerometerData.force.toFixed(2)} G
            </Text>
          )}
        </View>

        {crashDetected && (
          <View style={styles.alertBox}>
            {isRecordingAudio ? (
              // Display recording UI
              <View style={styles.recordingContainer}>
                <ActivityIndicator size="large" color="#006400" />
                <Text style={styles.recordingText}>
                  Please speak about the emergency... ({countdown}s)
                </Text>
                <TouchableOpacity
                  onPress={stopEmergencyAudioRecording}
                  style={styles.stopRecordingButton}
                >
                  <Text style={styles.buttonText}>Stop Recording</Text>
                </TouchableOpacity>
              </View>
            ) : isTranscribing ? (
              // Display transcribing UI
              <View style={styles.recordingContainer}>
                <ActivityIndicator size="large" color="#006400" />
                <Text style={styles.recordingText}>Transcribing audio...</Text>
              </View>
            ) : (
              // Original countdown UI
              <>
                <Text style={styles.alertTitle}>
                  Emergency Alert in {countdown} seconds...
                </Text>
                {location && (
                  <Text style={styles.alertLocation}>
                    Location: {location.latitude.toFixed(4)},{" "}
                    {location.longitude.toFixed(4)}
                  </Text>
                )}
              </>
            )}

            {capturedImageUri && (
              <View style={styles.imagePreviewContainer}>
                <Text style={styles.imagePreviewText}>Picture Captured!</Text>
                <Image
                  source={{ uri: capturedImageUri }}
                  style={styles.capturedImage}
                />
              </View>
            )}
            <TouchableOpacity onPress={cancelAlert} style={styles.cancelButton}>
              <Text style={styles.buttonText}>Cancel Alert</Text>
            </TouchableOpacity>
          </View>
        )}

        {emergencyTranscript && !isTranscribing && ( // Display transcript after it's received
            <View style={styles.transcriptBox}>
                <Text style={styles.transcriptTitle}>Your Emergency Description:</Text>
                <Text style={styles.transcriptText}>{emergencyTranscript}</Text>
            </View>
        )}

        {location && (
          <View style={styles.mapContainer}>
            <Text style={styles.locationInfoTitle}>Last Known Location</Text>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.005, // Smaller delta for a more zoomed-in view
                longitudeDelta: 0.005,
              }}
              pitchEnabled={false} // Disable 3D tilt
              rotateEnabled={false} // Disable rotation
              scrollEnabled={true} // Allow scrolling
              zoomEnabled={true} // Allow zooming
            >
              <Marker
                coordinate={{ latitude: location.latitude, longitude: location.longitude }}
                title="Your Location"
                description="Potential emergency site"
              />
            </MapView>
            <TouchableOpacity
              onPress={() => {
                const mapUrl = `https://www.google.com/maps/search/?api=1&query=${location.latitude},${location.longitude}`;
                Linking.canOpenURL(mapUrl).then((supported) => {
                  if (supported) {
                    Linking.openURL(mapUrl);
                  } else {
                    Alert.alert("Error", "Cannot open Google Maps URL.");
                  }
                });
              }}
            >
              <Text style={styles.mapLink}>View on Google Maps</Text>
            </TouchableOpacity>
            <Text style={styles.locationCoords}>
              (Latitude: {location.latitude.toFixed(4)}, Longitude:{" "}
              {location.longitude.toFixed(4)})
            </Text>
          </View>
        )}
      </View>
      {!crashDetected && ( // Only show if no crash is currently detected
        <TouchableOpacity
          onPress={handleCrash}
          style={styles.simulateCrashButton}
        >
          <Text style={styles.buttonText}>Simulate Crash</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

// StyleSheet for React Native components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F2F5", // Lighter background for a modern look
    padding: 20,
    position: 'relative', // Added for absolute positioning of simulate button
  },
  card: {
    backgroundColor: "#FFFFFF", // White card background
    borderRadius: 15,
    padding: 25,
    width: "100%",
    maxWidth: 400,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8, // For Android shadow
    borderColor: "#EEE", // Lighter border
    borderWidth: 1,
    marginBottom: 20, // Add some bottom margin to separate from the simulate button
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 25,
    textAlign: "center",
    color: "#006400", // Dark green title
  },
  icon: {
    fontSize: 28,
    marginRight: 10,
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#F9F9F9',
  },
  textInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#333',
  },
  voiceButton: {
    backgroundColor: '#006400', // Dark green for voice button
    padding: 12,
    borderRadius: 8,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButton: {
    backgroundColor: "#006400", // Dark green for send button
    ...Platform.select({
      ios: {
        shadowColor: "#006400",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
      },
      android: {
        elevation: 8,
      },
    }),
    width: "100%",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  messageContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  messageText: {
    fontSize: 18,
    color: "#333", // Darker text for readability
    marginBottom: 5,
    textAlign: "center",
  },
  subMessageText: {
    fontSize: 14,
    color: "#666", // Medium gray for sub-messages
  },
  simulateCrashButton: {
    backgroundColor: "#FF0000", // Bright red for simulate crash
    ...Platform.select({
      ios: {
        shadowColor: "#FF0000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
      },
      android: {
        elevation: 8,
      },
    }),
    position: 'absolute', // Absolute positioning
    bottom: 40, // Distance from bottom
    right: 40, // Distance from right
    width: 150, // Fixed width
    height: 50, // Fixed height
    borderRadius: 25, // Make it circular
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000, // Ensure it's on top
  },
  cancelButton: {
    backgroundColor: "#DC2626", // Red for cancel (kept red for emergency visual)
    ...Platform.select({
      ios: {
        shadowColor: "#DC2626",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
      },
      android: {
        elevation: 8,
      },
    }),
    width: "100%",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  alertBox: {
    backgroundColor: "rgba(255, 0, 0, 0.1)", // Lighter red tint
    borderColor: "#FF0000", // Solid red border
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  alertTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FF0000", // Red color
    marginBottom: 10,
    textAlign: "center",
  },
  alertLocation: {
    fontSize: 14,
    color: "#FF5555", // Lighter red
    marginBottom: 10,
    textAlign: "center",
  },
  imagePreviewContainer: {
    marginTop: 15,
    alignItems: "center",
  },
  imagePreviewText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  capturedImage: {
    width: 200,
    height: 150,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#CCC",
    resizeMode: "contain",
  },
  mapContainer: {
    marginTop: 30,
    backgroundColor: "#F0F0F0", // Light gray background
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    borderColor: "#DDD",
    borderWidth: 1,
    height: 300, // Fixed height for the map container
    width: '100%',
    overflow: 'hidden', // Ensures the map respects the border radius
  },
  map: {
    ...StyleSheet.absoluteFillObject, // Make the map fill its container
    borderRadius: 10, // Apply border radius to the map itself
  },
  locationInfoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    zIndex: 1, // Ensure title is above map content
    backgroundColor: '#F0F0F0', // Match background for readability
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 5,
  },
  mapLink: {
    color: "#007BFF", // Blue link color
    fontSize: 16,
    textDecorationLine: "underline",
    marginTop: 10, // Space between map and link
    marginBottom: 5,
    zIndex: 1, // Ensure link is clickable
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 5,
  },
  locationCoords: {
    fontSize: 14,
    color: "#666",
    zIndex: 1,
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 5,
  },
  recordingContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  recordingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333', // Dark text for recording
    marginTop: 10,
    textAlign: 'center',
  },
  stopRecordingButton: {
    backgroundColor: '#DC2626', // Red for stop recording button
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginTop: 20,
  },
  transcriptBox: {
      backgroundColor: "#F0F0F0", // Light gray
      borderRadius: 10,
      padding: 15,
      marginTop: 20,
      borderColor: "#DDD",
      borderWidth: 1,
  },
  transcriptTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 5,
  },
  transcriptText: {
      fontSize: 14,
      color: '#666',
  },
});

export default App;