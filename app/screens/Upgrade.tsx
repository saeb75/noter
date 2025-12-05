import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";

import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const UpgradePage = () => {
  const UpgradeFeatures = [
    {
      icon: <Entypo name="infinity" size={20} color="blue" />,
      title: "Unlimited AI note-taking minutes",
    },
    {
      icon: <AntDesign name="file-text" size={20} color="blue" />,
      title: "File Uploads to AI notes",
    },
    {
      icon: <Feather name="play" size={20} color="blue" />,
      title: "Youtube Videos to AI notes",
    },
    {
      icon: <Feather name="message-circle" size={20} color="blue" />,
      title: "Chat with notes, audio, and videos",
    },
    {
      icon: <MaterialIcons name="electric-bolt" size={20} color="blue" />,
      title: "Priority access to top-tire AI models",
    },
  ];

  const router = useRouter();
  return (
    <SafeAreaView className="px-4    flex-1 bg-white">
      <View className="flex-1">
        <View className="bg-white px-3 py-2 absolute  w-full h-full">
          <View className="flex flex-col flex-1 items-center w-full gap-y-5 ">
            {/* 1 */}
            <View className="flex flex-row justify-between items-center w-full">
              <View className="flex flex-row justify-center items-center gap-x-2">
                <Entypo
                  name="circle"
                  size={14}
                  color="#3b82f6"
                  className="bg-blue-500 rounded-full"
                />
                <Text className="text-lg font-semibold">minutes</Text>
              </View>
              <TouchableOpacity onPress={() => router.replace("/screens/Home")}>
                <MaterialCommunityIcons name="close" size={22} color="black" />
              </TouchableOpacity>
            </View>
            {/* 2 */}
            <View className="w-full">
              <Text className="text-2xl py-1 font-bold">Try 7 days free</Text>
              <Text className="text-base text-gray-700 ">
                Perfect notes you can trust, without lifting a finger.
              </Text>
              <Text className="text text-gray-700">Powered Minutes AI.</Text>
            </View>
            {/* 3 */}
            <View className="flex flex-col w-full gap-y-4 ">
              {UpgradeFeatures.map((item) => (
                <View
                  key={item.title}
                  className="flex flex-row items-center gap-x-4"
                >
                  {item.icon}
                  <Text className="text-lg">{item.title}</Text>
                </View>
              ))}
            </View>
            {/* 4 */}
            <View className="w-full flex flex-col gap-y-2 items-center">
              <Text className="font-semibold py-2">
                Choose a plan for after your trail. Cancel anytime.
              </Text>
              <View className="w-full flex-col items-center gap-y-4">
                <TouchableOpacity className="flex flex-col w-full border-2 border-blue-800 bg-blue-100 gap-y-1 rounded-xl px-3 py-4">
                  <Text className="text-xl font-semibold">Monthly</Text>
                  <Text className="text">7 days free, 25 USD / month</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex flex-row justify-between items-center w-full border-2 border-gray-100 bg-white rounded-xl px-3 py-4">
                  <View className="flex flex-col">
                    <Text className="text-xl font-semibold">Monthly</Text>
                    <Text className="text">7 days free, 25 USD / month</Text>
                  </View>
                  <View className="bg-blue-600 rounded-full px-2 py-1 ">
                    <Text className="text-center font-semibold  text-white">
                      Save 44%
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            {/* 5 */}
            <TouchableOpacity className="rounded-full w-full  bg-blue-600 py-3">
              <Text className="text-white text-center text-xl ">
                Start free trail
              </Text>
            </TouchableOpacity>
            {/* 6 */}
            <View className="w-full flex flex-row justify-center gap-x-7">
              <TouchableOpacity>
                <Text className="text-sm text-gray-800">Terms of Use</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text className="text-sm text-gray-800">Restore Purchase</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text className="text-sm text-gray-800">Privacy Policy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UpgradePage;
