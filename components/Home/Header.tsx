import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type TupgradePanel = {
  UpgradePanel: boolean;
  setUpgradePanel: React.Dispatch<React.SetStateAction<boolean>>;
};
const Header: React.FC<TupgradePanel> = ({ UpgradePanel, setUpgradePanel }) => {
  return (
    <View className="flex flex-row justify-between items-center">
      <View className="">
        <TouchableOpacity
          onPress={() => setUpgradePanel(!UpgradePanel)}
          className="px-4 py-2 rounded-lg bg-blue-700 flex flex-row gap-x-2 items-center"
        >
          <AntDesign name="staro" size={23} color="white" className="" />
          <Text className="text-base text-white ">Upgrade</Text>
        </TouchableOpacity>
      </View>
      <View className="flex flex-row items-center  gap-x-7">
        <TouchableOpacity>
          <Feather name="help-circle" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="settings-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
