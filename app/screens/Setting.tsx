import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import React from "react";

import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Setting = () => {
  const router = useRouter();
  return (
    <SafeAreaView className="px-5 pt-2 flex-1 bg-white">
      <View className="flex flex-col w-full items-center bg-white flex-1 ">
        <View className="flex flex-row justify-between items-center w-full fixed ">
          <TouchableOpacity
            onPress={() => router.push("/screens/Home")}
            className="flex flex-row items-center -ml-2"
          >
            <Ionicons name="chevron-back-outline" size={25} color="#1d4ed8" />
            <Text className="text-blue-700 text-xl">Back</Text>
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
        <ScrollView
          className="flex-1 w-full bg-white"
          showsVerticalScrollIndicator={false}
        >
          {/* 1 */}
          <View className="w-full ">
            <Text className="text-lg font-semibold py-3 pt-7">
              LANGUAGE SETTING0
            </Text>
            <View className="w-full bg-gray-100 flex flex-col px-3 py-2 rounded-lg  ">
              <TouchableOpacity className="flex flex-row justify-between items-center py-3">
                <Text className="text-xl">Audio Language</Text>
                <View className="flex flex-row items-center gap-x-2">
                  <Text className=" text-gray-500">Auto Detect</Text>
                  <MaterialIcons
                    name="navigate-next"
                    size={22}
                    color="#6b7280"
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity className="flex flex-row justify-between items-center py-3">
                <Text className="text-xl">Notes Language</Text>
                <View className="flex flex-row items-center gap-x-2">
                  <Text className=" text-gray-500">Auto Detect</Text>
                  <MaterialIcons
                    name="navigate-next"
                    size={22}
                    color="#6b7280"
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          {/* 2 */}
          <View className="flex flex-col  w-full py-5">
            <Text className="text-xl py-3 font-semibold">SUPPORT</Text>
            <View className="bg-gray-100 w-full flex flex-col items-center  gap-y-2 rounded-lg px-3 py-2">
              <TouchableOpacity className="flex flex-row justify-between w-full items-center py-3">
                <View className="flex flex-row gap-x-4 items-center">
                  <View className="flex flex-row  justify-center size-10 items-center bg-blue-700 rounded-xl">
                    <Entypo name="message" size={19} color="white" />
                  </View>
                  <Text className="text-lg ">Give feedback</Text>
                </View>
                <MaterialIcons name="navigate-next" size={24} color="#6b7280" />
              </TouchableOpacity>
              {/* 2 */}
              <TouchableOpacity className="flex flex-row justify-between w-full items-center py-3">
                <View className="flex flex-row gap-x-4 items-center">
                  <View className="flex flex-row  justify-center size-10 items-center bg-orange-400 rounded-xl">
                    <MaterialIcons
                      name="local-post-office"
                      size={19}
                      color="white"
                    />
                  </View>
                  <Text className="text-lg ">Contact us</Text>
                </View>
                <MaterialIcons name="navigate-next" size={24} color="#6b7280" />
              </TouchableOpacity>
              {/* 3 */}
              <TouchableOpacity className="flex flex-row justify-between w-full items-center py-3">
                <View className="flex flex-row gap-x-4 items-center">
                  <View className="flex flex-row  justify-center size-10 items-center bg-yellow-400 rounded-xl">
                    <Entypo name="star" size={19} color="white" />
                  </View>
                  <Text className="text-lg ">Leave a review</Text>
                </View>
                <MaterialIcons name="navigate-next" size={24} color="#6b7280" />
              </TouchableOpacity>
            </View>
          </View>
          {/* 3 */}
          <View className="w-full">
            <Text className="text-lg font-semibold py-3 pt-7">LEGAL</Text>
            <View className="bg-gray-100 w-full flex flex-col  items-center  gap-y-2 rounded-lg px-3 py-2">
              <TouchableOpacity className="w-full flex flex-row justify-between items-center py-3">
                <View className="flex flex-row items-center gap-x-4">
                  <View className="bg-green-500 rounded-xl size-10 flex flex-row justify-center items-center">
                    <FontAwesome6 name="shield" size={16} color="white" />
                  </View>
                  <Text className="text-lg ">Privacy Policy</Text>
                </View>
                <MaterialIcons name="navigate-next" size={24} color="#6b7280" />
              </TouchableOpacity>
              {/* 2 */}
              <TouchableOpacity className="w-full flex flex-row justify-between items-center py-3">
                <View className="flex flex-row items-center gap-x-4">
                  <View className="bg-green-500 rounded-xl size-10 flex flex-row justify-center items-center">
                    <FontAwesome name="file-text" size={16} color="white" />
                  </View>
                  <Text className="text-lg ">Terms of Service</Text>
                </View>
                <MaterialIcons name="navigate-next" size={24} color="#6b7280" />
              </TouchableOpacity>
            </View>
          </View>
          {/* 4 */}
          <View className="w-full">
            <Text className="text-lg font-semibold py-3 pt-7">ACCOUNT</Text>
            <View className="bg-gray-100 w-full flex flex-col  items-center  gap-y-2 rounded-lg px-3 py-2">
              <View className="w-full mb-5 mt-3">
                <Text className="text-start text-lg">
                  Email:erfan81kral81@gmail.com
                </Text>
              </View>
              <TouchableOpacity className="w-full flex flex-row justify-between items-center py-3">
                <View className="flex flex-row items-center gap-x-4">
                  <View className="bg-green-500 rounded-xl size-10 flex flex-row justify-center items-center">
                    <FontAwesome
                      name="credit-card-alt"
                      size={15}
                      color="white"
                    />
                  </View>
                  <Text className="text-lg ">Manage subscription</Text>
                </View>
                <MaterialIcons name="navigate-next" size={24} color="#6b7280" />
              </TouchableOpacity>
              {/* 2 */}
              <TouchableOpacity className="w-full flex flex-row justify-between items-center py-3">
                <View className="flex flex-row items-center gap-x-4">
                  <View className="bg-pink-400 rounded-xl size-10 flex flex-row justify-center items-center">
                    <Ionicons name="refresh" size={18} color="white" />
                  </View>
                  <Text className="text-lg ">Restore Purchases</Text>
                </View>
                <MaterialIcons name="navigate-next" size={24} color="#6b7280" />
              </TouchableOpacity>
              <TouchableOpacity className="w-full flex flex-row justify-between items-center py-3">
                <View className="flex flex-row items-center gap-x-4">
                  <View className="bg-pink-700 rounded-xl size-10 flex flex-row justify-center items-center">
                    <Ionicons name="exit" size={18} color="white" />
                  </View>
                  <Text className="text-lg ">Sign out</Text>
                </View>
                <MaterialIcons name="navigate-next" size={24} color="#6b7280" />
              </TouchableOpacity>
            </View>
          </View>
          {/* 5 */}
          <View className="w-full ">
            <View className="flex flex-row items-center pt-7 pb-3 gap-x-1">
              <MaterialIcons name="dangerous" size={24} color="red" />
              <Text className="text-lg font-semibold  text-orange-600">
                DANGER ZONE
              </Text>
            </View>
            <View className="bg-gray-100 w-full flex flex-col  items-center  gap-y-2 rounded-lg px-3 py-2">
              <TouchableOpacity className="w-full flex flex-row justify-between items-center py-3">
                <View className="flex flex-row items-center gap-x-4">
                  <View className="bg-orange-500 rounded-xl size-10 flex flex-row justify-center items-center">
                    <MaterialIcons name="delete" size={18} color="white" />
                  </View>
                  <Text className="text-lg  ">Delete account</Text>
                </View>
                <MaterialIcons name="navigate-next" size={24} color="#6b7280" />
              </TouchableOpacity>
            </View>
          </View>
          <View className="w-full">
            <Text className="text-gray-500 text-center mt-7 text-base">
              version 12.1
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Setting;
