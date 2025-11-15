import { useAudioData } from "@/stores/useAudioData";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {
  AudioModule,
  RecordingPresets,
  setAudioModeAsync,
  useAudioRecorder,
  useAudioRecorderState,
} from "expo-audio";
// import * as FileSystem from "expo-file-system";
import * as FileSystem from "expo-file-system/legacy";
import { useRouter } from "expo-router";
import * as Sharing from "expo-sharing";
import React, { useEffect, useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const RecordAudio = () => {
  const router = useRouter();
  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const recorderState = useAudioRecorderState(audioRecorder);
  const [recordedUri, setRecordedUri] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);

  const audioStore = useAudioData();

  const record = async () => {
    try {
      await audioRecorder.prepareToRecordAsync();
      audioRecorder.record();
      setRecordingTime(0);
    } catch (error) {
      console.error("Error starting recording:", error);
      Alert.alert("Error", "Failed to start recording");
    }
  };

  const stopRecording = async () => {
    try {
      await audioRecorder.stop();
      const uri = audioRecorder.uri;
      setRecordedUri(uri);
      console.log("Recorded URI:", uri);

      // Log file info for debugging
      if (uri) {
        const fileInfo = await FileSystem.getInfoAsync(uri);
        console.log("File info:", fileInfo);
      }
    } catch (error) {
      console.error("Error stopping recording:", error);
      Alert.alert("Error", "Failed to stop recording");
    }
  };

  const uploadAudio = async () => {
    if (!recordedUri) {
      Alert.alert("No recording found!");
      return;
    }

    setIsUploading(true);

    try {
      const fileInfo = await FileSystem.getInfoAsync(recordedUri);
      if (!fileInfo.exists) {
        throw new Error("Recording file not found");
      }

      console.log("File size:", fileInfo.size, "bytes");

      // Create FormData with direct file URI
      const formData = new FormData();
      formData.append("audioFile", {
        uri: recordedUri,
        name: "recordedAudio.m4a",
        type: "audio/m4a",
      } as any);

      console.log("Uploading audio file:", recordedUri);

      audioStore.upload(formData);
      router.push("/screens/Home");

      console.log("Upload successful");
    } catch (error: any) {
      console.error("Upload error details:", error);
      console.error("Error stack:", error.stack);

      // More specific error handling
      let errorMessage = "Failed to upload audio";
      if (error.message?.includes("Network")) {
        errorMessage = "Network error - please check your connection";
      } else if (error.message?.includes("timeout")) {
        errorMessage = "Upload timed out - please try again";
      } else if (error.message) {
        errorMessage = error.message;
      }

      Alert.alert("Upload Error", errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  const deleteRecording = async () => {
    if (recordedUri) {
      try {
        await FileSystem.deleteAsync(recordedUri);
        setRecordedUri(null);
        console.log("Recording deleted");
      } catch (error) {
        console.error("Error deleting recording:", error);
      }
    }
  };

  const saveToPhone = async () => {
    if (!recordedUri) {
      Alert.alert("No recording found!");
      return;
    }

    try {
      // Create a unique filename with timestamp
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      const fileName = `recording_${timestamp}.m4a`;

      // Get the document directory
      const documentDirectory = FileSystem.documentDirectory;
      const savedFilePath = `${documentDirectory}${fileName}`;

      // Copy the recorded file to the document directory
      await FileSystem.copyAsync({
        from: recordedUri,
        to: savedFilePath,
      });

      console.log("Audio saved to:", savedFilePath);

      Alert.alert(
        "Success!",
        `Audio saved to your phone!\n\nFile: ${fileName}`,
        [
          {
            text: "Share",
            onPress: () => shareAudio(savedFilePath),
          },
          {
            text: "OK",
            style: "default",
          },
        ]
      );
    } catch (error) {
      console.error("Error saving audio:", error);
      Alert.alert("Error", "Failed to save audio to phone");
    }
  };

  const shareAudio = async (filePath: string) => {
    try {
      const isAvailable = await Sharing.isAvailableAsync();
      if (isAvailable) {
        await Sharing.shareAsync(filePath, {
          mimeType: "audio/m4a",
          dialogTitle: "Share your recording",
        });
      } else {
        Alert.alert(
          "Sharing not available",
          "Sharing is not available on this device"
        );
      }
    } catch (error) {
      console.error("Error sharing audio:", error);
      Alert.alert("Error", "Failed to share audio");
    }
  };

  // Timer effect for recording duration
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (recorderState.isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [recorderState.isRecording]);

  // Format time display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    (async () => {
      try {
        const status = await AudioModule.requestRecordingPermissionsAsync();
        if (!status.granted) {
          Alert.alert(
            "Permission Required",
            "Permission to access microphone was denied. Please enable it in settings."
          );
          return;
        }

        await setAudioModeAsync({
          playsInSilentMode: true,
          allowsRecording: true,
        });
      } catch (error) {
        console.error("Error setting up audio:", error);
        Alert.alert("Error", "Failed to set up audio recording");
      }
    })();
  }, []);

  return (
    <SafeAreaView className="px-5 pt-2 flex-1 bg-white">
      <View className="flex-1 w-full flex flex-col justify-between items-center">
        {/* Header */}
        <View className="flex w-full flex-row justify-between items-center">
          <View></View>
          <View className="flex pl-3 flex-row justify-center items-center gap-x-2">
            <Entypo
              name="circle"
              size={14}
              color={recorderState.isRecording ? "#ef4444" : "#3b82f6"}
              className="rounded-full"
            />
            <Text className="text-xl font-semibold">
              {recorderState.isRecording ? "Recording" : "Minutes"}
            </Text>
          </View>
          <TouchableOpacity onPress={() => router.push("/screens/Home")}>
            <MaterialCommunityIcons name="close" size={24} color="blue" />
          </TouchableOpacity>
        </View>

        {/* Recording Controls */}
        <View className="w-full flex flex-col justify-center items-center">
          <TouchableOpacity
            className={`rounded-full size-32 flex flex-row justify-center items-center ${
              recorderState.isRecording ? "bg-red-600" : "bg-blue-600"
            }`}
            onPress={recorderState.isRecording ? stopRecording : record}
            disabled={isUploading}
          >
            {recorderState.isRecording ? (
              <FontAwesome5 name="stop" size={32} color="white" />
            ) : (
              <FontAwesome name="microphone" size={32} color="white" />
            )}
          </TouchableOpacity>

          <Text className="text-lg text-gray-600 py-4">
            {recorderState.isRecording
              ? "Tap to stop recording"
              : "Tap to start recording"}
          </Text>

          {/* Recording Actions */}
          {recordedUri && !recorderState.isRecording && (
            <View className="flex flex-col items-center gap-y-4 mt-4">
              <TouchableOpacity
                className={`rounded-full px-8 py-3 ${
                  isUploading ? "bg-gray-400" : "bg-green-600"
                }`}
                onPress={uploadAudio}
                disabled={isUploading}
              >
                <Text className="text-white text-lg font-semibold">
                  {isUploading ? "Uploading..." : "Upload Recording"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="bg-blue-600 rounded-full px-8 py-3"
                onPress={saveToPhone}
                disabled={isUploading}
              >
                <Text className="text-white text-lg font-semibold">
                  Save to Phone
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="bg-red-500 rounded-full px-6 py-2"
                onPress={deleteRecording}
                disabled={isUploading}
              >
                <Text className="text-white text-sm">Delete & Re-record</Text>
              </TouchableOpacity>

              <Text className="text-xs text-gray-500 mt-2 text-center px-4">
                File: {recordedUri.split("/").pop()}
              </Text>
            </View>
          )}
        </View>

        {/* Timer Display */}
        <View className="w-full">
          <Text className="text-center text-2xl font-mono">
            {recorderState.isRecording ? formatTime(recordingTime) : "00:00"}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RecordAudio;
