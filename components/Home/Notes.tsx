import AntDesign from "@expo/vector-icons/AntDesign";
import React from "react";
import { Text, View } from "react-native";

const Notes = () => {
  return (
    <View className="pt-5  flex-1 ">
      <Text className="text-4xl font-bold">My minutes</Text>
      <View className=" flex flex-col pt-32 items-center ">
        <View className="bg-blue-100 rounded-full">
          <AntDesign
            name="clockcircleo"
            size={35}
            color="blue"
            className="p-5"
          />
        </View>

        <Text className="text-xl text-black font-semibold py-1">
          No minutes yet
        </Text>
        <Text className="text-gray-700 text-lg">
          Tap the button below to start
        </Text>
      </View>
    </View>
  );
};

export default Notes;
