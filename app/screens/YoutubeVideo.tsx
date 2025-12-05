import { useAuth } from "@/stores/useAuth";
import { useYoutubeData } from "@/stores/useYoutubeData";

import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Clipboard from "expo-clipboard";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const YoutubeVideo = () => {
  const [YoutubeUrl, setYoutubeUrl] = useState<string>("");
  const { token } = useAuth();
  const { generate } = useYoutubeData();
  const router = useRouter();

  const handleTrancribeBtn = () => {
    if (YoutubeUrl.trim() && token !== null) {
      generate(YoutubeUrl);
      router.replace("/screens/Home");
    }
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
            <Text className="text-xl font-semibold text-gray-900">
              YouTube Video
            </Text>
          </View>
          <View className="w-10" />
        </View>

        {/* Main Content */}
        <View className="flex-1 px-6" style={{ marginTop: -30 }}>
          {/* Title Section */}
          <View className="w-full mt-8 mb-6">
            <Text className="text-3xl font-bold text-gray-900 mb-2">
              YouTube Video Notes
            </Text>
            <Text className="text-base text-gray-500">
              Paste a YouTube link to get transcript & notes
            </Text>
          </View>

          {/* URL Input Section */}
          <View className="w-full mb-6">
            <View
              className="w-full rounded-2xl flex flex-row items-center px-4 py-4"
              style={{
                backgroundColor: "#f9fafb",
                borderWidth: 1,
                borderColor: "#e5e7eb",
              }}
            >
              <View className="flex-1 mr-3">
                <TextInput
                  value={YoutubeUrl}
                  onChangeText={setYoutubeUrl}
                  className="text-base text-gray-900"
                  placeholder="https://www.youtube.com/..."
                  placeholderTextColor="#9ca3af"
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="url"
                />
              </View>
              <TouchableOpacity
                onPress={async () => {
                  const text = await Clipboard.getStringAsync();
                  if (text) setYoutubeUrl(text);
                }}
                activeOpacity={0.7}
                className="bg-white gap-x-2 px-4 py-3 rounded-xl border border-gray-200 flex flex-row justify-center items-center"
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.05,
                  shadowRadius: 2,
                  elevation: 1,
                }}
              >
                <FontAwesome5 name="paste" size={16} color="#374151" />
                <Text className="text-gray-700 font-medium text-sm">Paste</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Info Section */}
          <View className="w-full mb-8">
            <View
              className="w-full rounded-2xl p-4"
              style={{
                backgroundColor: "#fef2f2",
                borderWidth: 1,
                borderColor: "#fecaca",
              }}
            >
              <View className="flex-row items-start gap-x-3 mb-2">
                <Ionicons name="information-circle" size={20} color="#dc2626" />
                <Text className="text-sm text-gray-700 flex-1">
                  YouTube Shorts, Live, private, and unlisted videos are not
                  supported. Additionally, Minutes might process the language
                  incorrectly depending on the video&apos;s transcript. For
                  better results,{" "}
                  <Text
                    className="text-red-600 font-semibold"
                    onPress={() => router.replace("/screens/UploadFile")}
                  >
                    use direct file upload
                  </Text>
                  .
                </Text>
              </View>
            </View>
          </View>

          {/* Action Button */}
          <View className="w-full mt-auto mb-6">
            <TouchableOpacity
              onPress={handleTrancribeBtn}
              disabled={!YoutubeUrl.trim() || token === null}
              activeOpacity={0.8}
              className={`w-full rounded-2xl py-5 flex-row items-center justify-center gap-x-3 ${
                !YoutubeUrl.trim() || token === null
                  ? "bg-gray-300"
                  : "bg-red-600"
              }`}
              style={{
                shadowColor:
                  !YoutubeUrl.trim() || token === null
                    ? "transparent"
                    : "#dc2626",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 5,
              }}
            >
              <Ionicons
                name="logo-youtube"
                size={24}
                color={
                  !YoutubeUrl.trim() || token === null ? "#9ca3af" : "white"
                }
              />
              <Text
                className={`text-lg font-semibold ${
                  !YoutubeUrl.trim() || token === null
                    ? "text-gray-500"
                    : "text-white"
                }`}
              >
                Transcribe & Summarize
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default YoutubeVideo;
