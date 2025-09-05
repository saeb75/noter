import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
export type TSupportPanel = {
  supportPanelState: boolean;
  setSupportPanelState: React.Dispatch<React.SetStateAction<boolean>>;
};
const SupportPage: React.FC<TSupportPanel> = ({
  supportPanelState,
  setSupportPanelState,
}) => {
  if (!supportPanelState) return null;
  return (
    <View className="flex flex-col w-full flex-1 items-center ">
      {/* 1 */}
      <View className="flex flex-row justify-between items-center">
        <View>
          icon //
          <Text className="text-blue-400">Back</Text>
        </View>
        <View></View>
        <View></View>
      </View>
      {/* 2 */}
      <Text>Feedback & Support</Text>
      {/* 3 */}
      <View>
        <TextInput />
        <Text>
          Be as detailed as possible. We will get back to you within 1 bussiness
          day to : Email
        </Text>
      </View>
      {/* 4 */}
      <TouchableOpacity className="bg-blue-700 rounded-xl py-3">
        <Text className="text-center text-white ">Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SupportPage;
