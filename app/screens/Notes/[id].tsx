import { useGeneration } from "@/stores/useGeneration";
import { GeneratedItem } from "@/types/types";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const NotePage = () => {
  const { allItemsData } = useGeneration();
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const [minute, setMinute] = useState<GeneratedItem | null>(null);

  const [isMinutesActive, setIsMinutesActive] = useState(true);
  const [isTranscriptActive, setIsTranscriptActive] = useState(false);

  useEffect(() => {
    if (id && allItemsData.length > 0) {
      const foundMinute = allItemsData.find(
        (item) => id === item.id.toString()
      );
      if (foundMinute) {
        setMinute(foundMinute);
      }
    }
  }, [id, allItemsData]);

  if (!minute) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#2563eb" />
          <Text className="text-gray-500 mt-4">Loading note...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleMinutesActive = () => {
    setIsMinutesActive(true);
    setIsTranscriptActive(false);
  };
  const handleTranscriptActive = () => {
    setIsTranscriptActive(true);
    setIsMinutesActive(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 w-full">
        {/* Header */}
        <View className="flex flex-row justify-between items-center px-5 pt-2 pb-3">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full bg-white items-center justify-center shadow-sm"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 3,
              elevation: 3,
            }}
          >
            <Ionicons name="chevron-back" size={22} color="#374151" />
          </TouchableOpacity>
          <View className="flex-1 items-center">
            <Text className="text-xl font-semibold text-gray-900">
              Note Details
            </Text>
          </View>
          <View className="w-10" />
        </View>

        {/* Title and Date Section */}
        <View className="px-5 pb-4 border-b border-gray-100">
          <View className="mb-3">
            <Text className="text-2xl font-bold text-gray-900">
              {minute?.title}
            </Text>
          </View>
          <View className="flex flex-row items-center gap-x-2">
            <Ionicons name="calendar-outline" size={16} color="#2563eb" />
            <Text className="text-sm text-gray-500">
              {minute.createdAt.slice(0, 10)}
            </Text>
          </View>
        </View>

        {/* Tab Switcher */}
        <View className="px-5 pt-4 pb-3">
          <View
            className="flex flex-row items-center rounded-2xl p-1"
            style={{
              backgroundColor: "#f3f4f6",
            }}
          >
            <TouchableOpacity
              onPress={handleMinutesActive}
              activeOpacity={0.7}
              className="flex-1 py-3 flex flex-row justify-center items-center gap-x-2 rounded-xl"
              style={{
                backgroundColor: isMinutesActive ? "#2563eb" : "transparent",
                shadowColor: isMinutesActive ? "#2563eb" : "transparent",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.15,
                shadowRadius: 2,
                elevation: isMinutesActive ? 2 : 0,
              }}
            >
              <Feather
                name="list"
                size={18}
                color={isMinutesActive ? "#ffffff" : "#6b7280"}
              />
              <Text
                style={{
                  color: isMinutesActive ? "#ffffff" : "#6b7280",
                }}
                className="font-semibold text-base"
              >
                Minutes
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleTranscriptActive}
              activeOpacity={0.7}
              className="flex-1 py-3 flex flex-row justify-center items-center gap-x-2 rounded-xl"
              style={{
                backgroundColor: isTranscriptActive ? "#2563eb" : "transparent",
                shadowColor: isTranscriptActive ? "#2563eb" : "transparent",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.15,
                shadowRadius: 2,
                elevation: isTranscriptActive ? 2 : 0,
              }}
            >
              <AntDesign
                name="message"
                size={18}
                color={isTranscriptActive ? "#ffffff" : "#6b7280"}
              />
              <Text
                style={{
                  color: isTranscriptActive ? "#ffffff" : "#6b7280",
                }}
                className="font-semibold text-base"
              >
                Transcript
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Content Area */}
        <View className="flex-1" style={{ backgroundColor: "#ffffff" }}>
          {isMinutesActive && (
            <ScrollView
              className="flex-1 w-full"
              contentContainerStyle={{
                paddingHorizontal: 20,
                paddingVertical: 16,
              }}
              showsVerticalScrollIndicator={false}
            >
              <View
                className="w-full rounded-2xl p-5"
                style={{
                  backgroundColor: "#f9fafb",
                }}
              >
                <Text className="text-base leading-7 text-gray-800">
                  {minute.summary}
                </Text>
              </View>
            </ScrollView>
          )}

          {isTranscriptActive && (
            <ScrollView
              className="flex-1 w-full"
              contentContainerStyle={{
                paddingHorizontal: 20,
                paddingVertical: 16,
              }}
              showsVerticalScrollIndicator={false}
            >
              <View
                className="w-full rounded-2xl p-5"
                style={{
                  backgroundColor: "#f9fafb",
                }}
              >
                <Text className="text-base leading-7 text-gray-800">
                  {minute.transcript}
                </Text>
              </View>
            </ScrollView>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NotePage;
