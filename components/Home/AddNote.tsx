import AntDesign from "@expo/vector-icons/AntDesign";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type AddNoteProps = {
  isClick: boolean;
  setIsClick: React.Dispatch<React.SetStateAction<boolean>>;
};
const AddNote: React.FC<AddNoteProps> = ({ isClick, setIsClick }) => {
  return (
    <View className="w-full pb-1">
      <TouchableOpacity
        className="flex flex-row  w-full py-4 rounded-r-3xl rounded-l-3xl bg-blue-600 justify-center items-center gap-x-2"
        onPress={() => setIsClick(!isClick)}
      >
        <AntDesign name="plus" size={24} color="white" />
        <Text className="text-xl text-white font-semibold">New Minutes</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddNote;
