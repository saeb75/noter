import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const RecordAudio = () => {
  const router = useRouter();

  return (
    <SafeAreaView className="px-5 pt-2  flex-1 bg-white">
      <View className="flex-1 w-full flex flex-col justify-between items-center">
        <View
          className="flex  w-full flex-row justify-between
         items-center"
        >
          <View></View>
          <View className="flex  pl-3 flex-row justify-center items-center gap-x-2">
            <Entypo
              name="circle"
              size={14}
              color="#3b82f6"
              className="bg-blue-500 rounded-full"
            />
            <Text className="text-xl font-semibold">minutes</Text>
          </View>
          <TouchableOpacity
            className=""
            onPress={() => router.push("/screens/Home")}
          >
            <MaterialCommunityIcons name="close" size={24} color="blue" />
          </TouchableOpacity>
        </View>
        <View className="w-full flex flex-col justify-center items-center">
          <TouchableOpacity className="bg-blue-600 rounded-full size-32 flex flex-row justify-center items-center ">
            <FontAwesome name="microphone" size={32} color="white" />
          </TouchableOpacity>
          <Text className="text-lg text-gray-600 py-4">
            Tap to start Recording
          </Text>
        </View>
        <View className="w-full">
          <Text className="text-center text-lg">00:00</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RecordAudio;
