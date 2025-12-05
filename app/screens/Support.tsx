import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Support = () => {
  const router = useRouter();
  const [feedback, setFeedback] = useState("");

  const handleSubmit = () => {
    if (!feedback.trim()) {
      Alert.alert("Error", "Please enter your feedback before submitting.");
      return;
    }
    // TODO: Implement actual submission logic
    Alert.alert(
      "Success",
      "Your feedback has been submitted. We'll get back to you soon!"
    );
    setFeedback("");
    router.replace("/screens/Home");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 w-full">
        {/* Header */}
        <View className="flex flex-row justify-between items-center px-5 pt-2 pb-3">
          <TouchableOpacity
            onPress={() => router.replace("/screens/Home")}
            className="w-10 h-10 rounded-full bg-white items-center justify-center shadow-sm"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 3,
              elevation: 3,
            }}
          >
            <Ionicons name="close" size={22} color="#374151" />
          </TouchableOpacity>
          <View className="flex-1 items-center">
            <Text className="text-xl font-semibold text-gray-900">Support</Text>
          </View>
          <View className="w-10" />
        </View>

        {/* Main Content */}
        <View className="flex-1 px-6" style={{ marginTop: -30 }}>
          {/* Title Section */}
          <View className="w-full mt-8 mb-6">
            <Text className="text-3xl font-bold text-gray-900 mb-2">
              Feedback & Support
            </Text>
            <Text className="text-base text-gray-500">
              We&apos;d love to hear from you. Share your feedback or get help.
            </Text>
          </View>

          {/* Feedback Input Section */}
          <View className="w-full mb-6">
            <Text className="text-base font-semibold text-gray-900 mb-3">
              Your Message
            </Text>
            <View
              className="w-full rounded-2xl p-4"
              style={{
                backgroundColor: "#f9fafb",
                borderWidth: 1,
                borderColor: "#e5e7eb",
              }}
            >
              <TextInput
                value={feedback}
                onChangeText={setFeedback}
                textAlignVertical="top"
                multiline
                numberOfLines={8}
                className="text-base text-gray-900"
                placeholder="Tell us what's on your mind..."
                placeholderTextColor="#9ca3af"
                style={{
                  minHeight: 160,
                  maxHeight: 240,
                }}
              />
            </View>
          </View>

          {/* Info Section */}
          <View className="w-full mb-8">
            <View
              className="w-full rounded-2xl p-4"
              style={{
                backgroundColor: "#f0f9ff",
                borderWidth: 1,
                borderColor: "#bae6fd",
              }}
            >
              <View className="flex-row items-start gap-x-3">
                <Ionicons name="information-circle" size={20} color="#0284c7" />
                <Text className="text-sm text-gray-700 flex-1">
                  Be as detailed as possible. We will get back to you within 1
                  business day via email.
                </Text>
              </View>
            </View>
          </View>

          {/* Submit Button */}
          <View className="w-full mt-auto mb-6">
            <TouchableOpacity
              onPress={handleSubmit}
              disabled={!feedback.trim()}
              activeOpacity={0.8}
              className={`w-full rounded-2xl py-5 flex-row items-center justify-center gap-x-3 ${
                !feedback.trim() ? "bg-gray-300" : "bg-blue-600"
              }`}
              style={{
                shadowColor: !feedback.trim() ? "transparent" : "#2563eb",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 5,
              }}
            >
              <Ionicons
                name="send"
                size={24}
                color={!feedback.trim() ? "#9ca3af" : "white"}
              />
              <Text
                className={`text-lg font-semibold ${
                  !feedback.trim() ? "text-gray-500" : "text-white"
                }`}
              >
                Submit Feedback
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Support;
