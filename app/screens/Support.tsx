import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const Support = () => {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 px-6 pt-2 bg-white w-ful">
      <View className="flex flex-col w-full flex-1 items-center gap-y-6">
        {/* 1 */}
        <View className="flex flex-row justify-between items-center w-full ">
          <TouchableOpacity
            onPress={() => router.push("/screens/Home")}
            className="flex flex-row items-center -ml-2"
          >
            <Ionicons name="chevron-back-outline" size={25} color="#2563eb" />
            <Text className="text-blue-600 text-xl">Back</Text>
          </TouchableOpacity>
          <View className="flex flex-row items-center  gap-x-7">
            <TouchableOpacity onPress={() => router.push("/screens/Support")}>
              <Feather name="help-circle" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/screens/Setting")}>
              <Ionicons name="settings-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        {/* 2 */}
        <Text className="w-full text-2xl font-semibold pb-12">
          Feedback & Support
        </Text>
        {/* 3 */}
        <View className="w-full flex flex-col gap-y-3">
          <TextInput
            textAlignVertical="top"
            multiline
            className="border-[1px] border-gray-200 rounded-lg h-40 "
          />
          <Text className="text-lg text-gray-800 w-full">
            Be as detailed as possible. We will get back to you within 1
            bussiness day to : Email
          </Text>
        </View>
        {/* 4 */}
        <TouchableOpacity className="bg-blue-600 rounded-xl py-3 w-full ">
          <Text className="text-center text-white text-xl ">Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Support;
