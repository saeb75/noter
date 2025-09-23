import Entypo from "@expo/vector-icons/Entypo";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Signin = () => {
  return (
    <SafeAreaView className="px-6 pt-2 flex-1 bg-white w-full">
      <View className="w-full h-[38%] bg-white"></View>
      <View className="w-full flex-1 flex flex-col justify-between items-center ">
        <View className="w-full flex flex-col items-center justify-center gap-y-3">
          <View className="flex flex-row justify-center items-center gap-x-2">
            <Entypo
              name="circle"
              size={14}
              color="#3b82f6"
              className="bg-blue-500 rounded-full"
            />

            <Text className="text-xl font-semibold">minutes</Text>
          </View>
          <View className="flex flex-col items-center">
            <Text className="text-4xl font-semibold">Instant notes from</Text>
            <View className="flex flex-row">
              <Text className="text-4xl font-semibold">audio and video,</Text>
              <Text className="text-4xl font-semibold text-blue-500">
                {" "}
                done
              </Text>
            </View>
            <Text className="text-4xl font-semibold text-blue-500">
              with AI
            </Text>
          </View>
        </View>
        <TouchableOpacity className="flex flex-row mb-3 items-center justify-center rounded-full border-2 border-gray-200 gap-x-2 w-full py-4">
          <Image
            source={require("@/assets/google.png")}
            width={100}
            height={100}
            className="size-5 "
            resizeMode="contain"
          />
          <Text className="text-2xl font-semibold">Sign in with Google</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Signin;
