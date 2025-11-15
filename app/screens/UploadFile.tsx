import { useAudioData } from "@/stores/useAudioData";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import * as DocumentPicker from "expo-document-picker";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const UploadFile = () => {
  const router = useRouter();
  const [selectedFile, setSelectedFile] =
    useState<DocumentPicker.DocumentPickerAsset | null>(null);
  const [formData, setFormData] = useState<FormData | null>(null);
  const { audioData, upload } = useAudioData();

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
        setSelectedFile(file);

        // آماده‌سازی فرم دیتا بدون base64
        const fd = new FormData();
        fd.append("audioFile", {
          uri: file.uri,
          name: file.name || "audio.m4a",
          type: file.mimeType || "audio/m4a",
        } as any);

        setFormData(fd);

        console.log("FormData آماده شد ✅");
        upload(fd);
        router.push("/screens/Home");
        console.log("212");
      } else {
        console.log("User canceled file picker");
      }
    } catch (err) {
      console.log("Error picking file:", err);
    }
  };

  useEffect(() => {
    if (audioData) {
      console.log("audioData", audioData);
    }
  }, [audioData]);

  return (
    <SafeAreaView className="flex-1 px-5 pt-2 bg-white w-full">
      <View className="w-full flex flex-row justify-end pt-5 pb-9">
        <TouchableOpacity onPress={() => router.push("/screens/Home")}>
          <MaterialCommunityIcons name="close" size={22} color="gray" />
        </TouchableOpacity>
      </View>

      <View className="w-full flex-1">
        <View className="w-full">
          <Text className="text-3xl font-semibold">Upload a file</Text>
          <Text className="text-xl py-2 text-gray-500">
            Select an audio file or transcript or notes.
          </Text>
        </View>

        {/* <View className="w-full pt-6">
          <TouchableOpacity className="flex flex-row justify-center items-center gap-x-2">
            <Text className="text-2xl text-blue-600">Language Setting</Text>
            <Feather name="settings" size={24} color="#2563eb" />
          </TouchableOpacity>
        </View> */}

        <TouchableOpacity
          className="w-full bg-blue-600 rounded-full mt-10"
          onPress={pickAudioFile}
        >
          <Text className="text-center text-2xl text-white py-3 font-semibold">
            Select file
          </Text>
        </TouchableOpacity>

        {selectedFile && (
          <Text className="text-center mt-5 text-gray-700">
            Selected: {selectedFile.name}
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default UploadFile;
