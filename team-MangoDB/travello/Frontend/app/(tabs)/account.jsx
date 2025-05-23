import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  Animated,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

const Account = () => {
  // Sample travel history data - in real app, this would come from API/backend
  const travelHistory = {
    busTrips: 45,
    trainTrips: 12,
    averageWeeklyTrips: 8,
    mostFrequentRoutes: ["Route 101", "Central Line"],
    peakHours: "8 AM - 10 AM"
  };

  // Generated pass suggestions based on travel history
  const passRecommendations = [
    {
      id: "1",
      type: "Smart Commute",
      duration: "Monthly",
      price: 999,
      savings: 450,
      description: "Unlimited bus and train rides",
      bestMatch: true,
    }
  ];

  const menuOptions = [
    { id: "1", name: "Previous Rides", icon: "history", onPress: () => router.push("/previous-rides") },
    { id: "2", name: "Payment Methods", icon: "credit-card", onPress: () => {} },
    { id: "3", name: "Settings", icon: "cog", onPress: () => {} },
    { id: "4", name: "Help", icon: "question-circle", onPress: () => {} },
    { id: "5", name: "Logout", icon: "sign-out-alt", onPress: () => {} },
  ];

  const PassCard = ({ pass }) => (
    <TouchableOpacity 
      className={`p-4 rounded-xl mb-3 ${pass.bestMatch ? 'bg-emerald-50 border-2 border-emerald-500' : 'bg-white'}`}
    >
      <View className="flex-row justify-between items-center mb-2">
        <View className="flex-row items-center">
          <Text className="text-xl font-pbold text-gray-800">{pass.type}</Text>
          {pass.bestMatch && (
            <View className="bg-emerald-500 rounded-full px-2 py-1 ml-2">
              <Text className="text-white text-xs font-pbold">Best Match</Text>
            </View>
          )}
        </View>
        <Text className="text-2xl font-pbold text-emerald-600">₹{pass.price}</Text>
      </View>
      
      <Text className="text-gray-600 mb-2">{pass.description}</Text>
      
      <View className="flex-row justify-between items-center">
        <Text className="text-gray-500">{pass.duration}</Text>
        <View className="flex-row items-center">
          <FontAwesome5 name="piggy-bank" size={16} color="#059669" className="mr-1" />
          <Text className="text-emerald-600 font-pmedium">Save ₹{pass.savings}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1 px-4 pt-6">
        <View className="flex-row items-center mb-8">
          <Image
            source={{ uri: "https://i.pravatar.cc/150?img=68" }}
            className="w-24 h-24 rounded-full mr-4"
          />
          <View>
            <Text className="text-3xl font-pbold text-gray-800">Nimit Sheth</Text>
            <Text className="text-lg font-pmedium text-gray-600">nimit@example.com</Text>
          </View>
        </View>

        <View className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <Text className="text-xl font-psemibold text-gray-800 mb-2">Travelo Wallet</Text>
          <Text className="text-3xl font-pbold text-emerald-600">₹120.50</Text>
          <TouchableOpacity
            className="bg-emerald-600 rounded-lg py-2 px-4 mt-4 flex-row items-center justify-center"
            onPress={() => console.log("Add funds")}
          >
            <FontAwesome5 name="plus-circle" size={16} color="white" className="mr-2" />
            <Text className="text-white font-psemibold text-base">Add Funds</Text>
          </TouchableOpacity>
        </View>

        <View className="mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-psemibold text-gray-800">Recommended Passes</Text>
            <TouchableOpacity className="flex-row items-center">
              <Text className="text-emerald-600 font-pmedium mr-1">View All</Text>
              <FontAwesome5 name="chevron-right" size={14} color="#059669" />
            </TouchableOpacity>
          </View>
          
          <View className="bg-white rounded-xl p-4 mb-4">
            <Text className="text-gray-600 mb-3">
              You've traveled through bus {travelHistory.busTrips} times this month! 🚌
            </Text>
            <Text className="text-emerald-600 font-pmedium mb-3">
              Get our Monthly Bus Pass and save up to 30% on your daily commute!
            </Text>
            <View className="flex-row flex-wrap">
              <View className="bg-emerald-100 rounded-lg px-3 py-1 mr-2 mb-2">
                <Text className="text-primary">🎯 Perfect for your commute</Text>
              </View>
              <View className="bg-emerald-100 rounded-lg px-3 py-1 mr-2 mb-2">
                <Text className="text-primary">💰 Best value for money</Text>
              </View>
              <View className="bg-gray-100 rounded-lg px-3 py-1 mr-2 mb-2">
                <Text className="text-gray-700">~{travelHistory.averageWeeklyTrips} Trips/Week</Text>
              </View>
            </View>
          </View>

          {passRecommendations.map(pass => (
            <PassCard key={pass.id} pass={pass} />
          ))}
        </View>

        <Text className="text-xl font-psemibold text-gray-800 mb-4">Account Settings</Text>
        <FlatList
          data={menuOptions}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item.id}
              className="flex-row items-center bg-white rounded-lg px-4 py-4 mb-3 shadow-sm"
              onPress={item.onPress}
            >
              <View className="bg-gray-100 rounded-full p-2 mr-4">
                <FontAwesome5
                  name={item.icon}
                  size={20}
                  color="#4b5563"
                />
              </View>
              <Text className="text-lg text-gray-800 font-pmedium flex-1">
                {item.name}
              </Text>
              <FontAwesome5
                name="chevron-right"
                size={16}
                color="#9ca3af"
              />
            </TouchableOpacity>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Account;