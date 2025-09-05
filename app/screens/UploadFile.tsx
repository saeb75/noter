import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const UploadFile = () => {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 px-5 pt-2 bg-white w-full">
      <View className="w-full flex flex-row justify-end  pt-5 pb-9 ">
        <TouchableOpacity onPress={() => router.push("/screens/Home")}>
          <MaterialCommunityIcons name="close" size={22} color="gray" />
        </TouchableOpacity>
      </View>
      <View className="w-full flex-1">
        <View className="w-full">
          <Text className="text-3xl font-semibold">Upload a file</Text>
          <Text className="text-xl  py-2 text-gray-500">
            Select an audio file or transcript or notes.
          </Text>
        </View>
        <View className="w-full pt-6 ">
          <TouchableOpacity className="flex flex-row justify-center items-center gap-x-2">
            <Text className="text-2xl text-blue-600">Language Setting</Text>
            <Feather name="settings" size={24} color="#2563eb" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity className="w-full bg-blue-600 rounded-full mt-10">
          <Text className="text-center text-2xl text-white py-3 font-semibold">
            Select file
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default UploadFile;
