import { useAudioData } from "@/stores/useAudioData";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  AudioModule,
  RecordingPresets,
  setAudioModeAsync,
  useAudioRecorder,
  useAudioRecorderState,
} from "expo-audio";
import * as FileSystem from "expo-file-system/legacy";
import { useRouter } from "expo-router";
import * as Sharing from "expo-sharing";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Animated,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const RecordAudio = () => {
  const router = useRouter();
  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const recorderState = useAudioRecorderState(audioRecorder);
  const [recordedUri, setRecordedUri] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [pulseAnim] = useState(new Animated.Value(1));

  const audioStore = useAudioData();

  // Animated pulse effect during recording
  useEffect(() => {
    if (recorderState.isRecording) {
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.15,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      );
      pulse.start();
      return () => pulse.stop();
    } else {
      pulseAnim.setValue(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recorderState.isRecording]);

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
      console.log("Stop button pressed! Stopping recording...");

      // Stop the recorder - simple and direct
      await audioRecorder.stop();

      // Get the URI after stopping (should be available immediately)
      const uri = audioRecorder.uri;
      console.log("Recording stopped. URI:", uri);

      if (uri) {
        setRecordedUri(uri);
        console.log("Recording saved successfully:", uri);
      } else {
        // If URI not immediately available, wait a bit and try again
        setTimeout(() => {
          const retryUri = audioRecorder.uri;
          if (retryUri) {
            setRecordedUri(retryUri);
            console.log("Recording saved on retry:", retryUri);
          }
        }, 300);
      }
    } catch (error: any) {
      console.error("Error stopping recording:", error);
      Alert.alert(
        "Error",
        `Failed to stop recording: ${error.message || "Unknown error"}`
      );
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

          <View
            className="flex flex-row items-center gap-x-2 bg-white px-4 py-2 rounded-full shadow-sm"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.05,
              shadowRadius: 3,
              elevation: 2,
            }}
          >
            <View
              className={`w-2 h-2 rounded-full ${
                recorderState.isRecording ? "bg-red-500" : "bg-blue-500"
              }`}
              style={
                recorderState.isRecording
                  ? {
                      shadowColor: "#ef4444",
                      shadowOffset: { width: 0, height: 0 },
                      shadowOpacity: 0.8,
                      shadowRadius: 4,
                      elevation: 4,
                    }
                  : {}
              }
            />
            <Text className="text-base font-semibold text-gray-800">
              {recorderState.isRecording ? "Recording" : "New Recording"}
            </Text>
          </View>

          <View className="w-10" />
        </View>

        {/* Main Content Area */}
        <View
          className="flex-1 items-center px-6"
          style={{ justifyContent: "center", marginTop: -50 }}
        >
          {!recordedUri || recorderState.isRecording ? (
            <>
              {/* Timer Display - Prominent */}
              <View className="mb-6 items-center">
                <Text
                  className={`text-6xl font-mono font-bold mb-2 ${
                    recorderState.isRecording ? "text-red-600" : "text-gray-400"
                  }`}
                >
                  {recorderState.isRecording
                    ? formatTime(recordingTime)
                    : "00:00"}
                </Text>
                {recorderState.isRecording && (
                  <View className="flex-row items-center gap-x-1 mt-2">
                    <View className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                    <Text className="text-sm text-gray-600 font-medium">
                      Recording in progress
                    </Text>
                  </View>
                )}
              </View>

              {/* Recording Button */}
              <View className="items-center mb-6 relative">
                <TouchableOpacity
                  onPress={() => {
                    if (recorderState.isRecording) {
                      console.log("Stopping recording...");
                      stopRecording();
                    } else {
                      console.log("Starting recording...");
                      record();
                    }
                  }}
                  disabled={isUploading}
                  activeOpacity={0.7}
                  className={`w-32 h-32 rounded-full flex items-center justify-center ${
                    recorderState.isRecording ? "bg-red-500" : "bg-blue-600"
                  }`}
                  style={{
                    shadowColor: recorderState.isRecording
                      ? "#ef4444"
                      : "#2563eb",
                    shadowOffset: { width: 0, height: 8 },
                    shadowOpacity: 0.3,
                    shadowRadius: 12,
                    elevation: 8,
                  }}
                >
                  <Animated.View
                    style={{
                      transform: [{ scale: pulseAnim }],
                    }}
                  >
                    {recorderState.isRecording ? (
                      <View className="w-12 h-12 bg-white rounded-lg items-center justify-center">
                        <View className="w-6 h-6 bg-red-500 rounded-sm" />
                      </View>
                    ) : (
                      <FontAwesome name="microphone" size={40} color="white" />
                    )}
                  </Animated.View>
                </TouchableOpacity>

                {/* Outer Ring Animation */}
                {recorderState.isRecording && (
                  <Animated.View
                    className="absolute w-32 h-32 rounded-full border-4 border-red-200"
                    pointerEvents="none"
                    style={{
                      transform: [{ scale: pulseAnim }],
                      opacity: pulseAnim.interpolate({
                        inputRange: [1, 1.15],
                        outputRange: [0.5, 0],
                      }),
                    }}
                  />
                )}
              </View>

              {/* Instruction Text */}
              <Text className="text-center text-base text-gray-600 font-medium px-8 mt-2">
                {recorderState.isRecording
                  ? "Tap the button again to stop recording"
                  : "Tap the microphone to start recording your minutes"}
              </Text>
            </>
          ) : (
            /* After Recording - Action Options */
            <View className="w-full items-center" style={{ marginTop: -20 }}>
              {/* Success Message */}
              <View className="mb-6 items-center">
                <View className="w-20 h-20 bg-green-100 rounded-full items-center justify-center mb-4">
                  <Ionicons name="checkmark-circle" size={56} color="#10b981" />
                </View>
                <Text className="text-2xl font-bold text-gray-900 mb-2">
                  Recording Complete!
                </Text>
                <Text className="text-base text-gray-500 text-center px-4">
                  Duration: {formatTime(recordingTime)}
                </Text>
              </View>

              {/* Action Buttons */}
              <View className="w-full gap-y-3 px-4">
                {/* Upload Button - Primary */}
                <TouchableOpacity
                  onPress={uploadAudio}
                  disabled={isUploading}
                  className={`w-full rounded-2xl py-5 flex-row items-center justify-center gap-x-3 ${
                    isUploading ? "bg-gray-300" : "bg-blue-600"
                  }`}
                  style={{
                    shadowColor: isUploading ? "transparent" : "#2563eb",
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 8,
                    elevation: 5,
                  }}
                >
                  {isUploading ? (
                    <>
                      <ActivityIndicator size="small" color="#ffffff" />
                      <Text className="text-white text-lg font-semibold">
                        Uploading...
                      </Text>
                    </>
                  ) : (
                    <>
                      <Ionicons
                        name="cloud-upload-outline"
                        size={24}
                        color="white"
                      />
                      <Text className="text-white text-lg font-semibold">
                        Upload & Create Note
                      </Text>
                    </>
                  )}
                </TouchableOpacity>

                {/* Secondary Actions Row */}
                <View className="flex-row gap-x-3">
                  {/* Save Button */}
                  <TouchableOpacity
                    onPress={saveToPhone}
                    disabled={isUploading}
                    className="flex-1 bg-white rounded-2xl py-4 flex-row items-center justify-center gap-x-2 border border-gray-200"
                    style={{
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.05,
                      shadowRadius: 4,
                      elevation: 2,
                    }}
                  >
                    <Ionicons
                      name="download-outline"
                      size={20}
                      color="#374151"
                    />
                    <Text className="text-gray-700 font-semibold">Save</Text>
                  </TouchableOpacity>

                  {/* Delete Button */}
                  <TouchableOpacity
                    onPress={deleteRecording}
                    disabled={isUploading}
                    className="flex-1 bg-white rounded-2xl py-4 flex-row items-center justify-center gap-x-2 border border-gray-200"
                    style={{
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.05,
                      shadowRadius: 4,
                      elevation: 2,
                    }}
                  >
                    <Ionicons name="trash-outline" size={20} color="#ef4444" />
                    <Text className="text-red-500 font-semibold">Delete</Text>
                  </TouchableOpacity>
                </View>

                {/* Record Again Button */}
                <TouchableOpacity
                  onPress={() => {
                    setRecordedUri(null);
                    setRecordingTime(0);
                  }}
                  disabled={isUploading}
                  className="w-full rounded-2xl py-4 bg-gray-50 flex-row items-center justify-center gap-x-2"
                >
                  <Ionicons name="mic-outline" size={20} color="#374151" />
                  <Text className="text-gray-700 font-semibold">
                    Record Again
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RecordAudio;
