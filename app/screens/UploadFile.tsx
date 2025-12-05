import { useAudioData } from "@/stores/useAudioData";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as DocumentPicker from "expo-document-picker";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const UploadFile = () => {
  const router = useRouter();
  const { upload } = useAudioData();

  const pickAudioFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "audio/*",
        copyToCacheDirectory: true,
      });

      if (!result.canceled) {
        const file = result.assets[0];
        console.log("Selected file:", file);
        console.log(file.uri);

        // آماده‌سازی فرم دیتا بدون base64
        const fd = new FormData();
        fd.append("audioFile", {
          uri: file.uri,
          name: file.name || "audio.m4a",
          type: file.mimeType || "audio/m4a",
        } as any);

        console.log("FormData آماده شد ✅");
        upload(fd);
        router.replace("/screens/Home");
        console.log("212");
      } else {
        console.log("User canceled file picker");
      }
    } catch (err) {
      console.log("Error picking file:", err);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 w-full">
        {/* Header */}
        <View className="flex flex-row justify-between items-center px-5 pt-2 pb-3">
          <TouchableOpacity
            onPress={() => router.push("/screens/Home")}
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
              Upload File
            </Text>
          </View>
          <View className="w-10" />
        </View>

        {/* Main Content */}
        <View className="flex-1 items-center px-6" style={{ marginTop: -30 }}>
          {/* Upload Area */}
          <View className="w-full items-center mt-8">
            <TouchableOpacity
              onPress={pickAudioFile}
              activeOpacity={0.8}
              className="w-full rounded-3xl p-12 items-center justify-center border-2 border-dashed"
              style={{
                backgroundColor: "#f9fafb",
                borderColor: "#d1d5db",
              }}
            >
              <View
                className="w-20 h-20 rounded-2xl items-center justify-center mb-6"
                style={{ backgroundColor: "#eff6ff" }}
              >
                <Ionicons
                  name="cloud-upload-outline"
                  size={40}
                  color="#2563eb"
                />
              </View>
              <Text className="text-2xl font-bold text-gray-900 mb-2">
                Upload File
              </Text>
              <Text className="text-base text-gray-500 text-center px-4">
                Select an audio file from your device
              </Text>
            </TouchableOpacity>
          </View>

          {/* Select Button */}
          <TouchableOpacity
            onPress={pickAudioFile}
            activeOpacity={0.8}
            className="w-full bg-blue-600 rounded-2xl mt-8 flex-row items-center justify-center gap-x-3"
            style={{
              shadowColor: "#2563eb",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 5,
            }}
          >
            <Ionicons name="folder-open-outline" size={24} color="white" />
            <Text className="text-white text-lg font-semibold py-4">
              Choose File
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UploadFile;
