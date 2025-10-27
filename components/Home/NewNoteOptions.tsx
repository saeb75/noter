import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import Modal from "react-native-modal";

type VisibleProps = {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
};
const NewNoteOptions: React.FC<VisibleProps> = ({
  isVisible,
  setIsVisible,
}) => {
  const router = useRouter();
  return (
    <View>
      <Modal
        isVisible={isVisible}
        onBackdropPress={() => setIsVisible(false)}
        
        className="-mx-0    "
        style={{
          justifyContent: "flex-end",
          margin: 0,
        }}
        hasBackdrop={true}
        backdropOpacity={0.2}
      >
        <View className=" bg-white flex flex-col w-full px-3 h-[25rem] ">
          <View className="w-full flex flex-row justify-center py-3">
            <View className="bg-gray-300 h-[4px] w-[50px] rounded-lg"></View>
          </View>
          <View className="w-full flex flex-row justify-between items-center pt-4 pb-10">
            <Text className="font-bold text-xl">New Minutes</Text>
            <View className="flex flex-row items-center gap-x-2 ">
              <View className="border-[1px] rounded-xl  px-2 border-gray-400 flex flex-row items-center justify-center gap-x-2 py-[2px]">
                <Entypo name="language" size={14} color="#9ca3af" />
                <Text className="text-sm text-gray-500">Auto Detect</Text>
              </View>
              <AntDesign name="close" size={20} color="black" className=" " />
            </View>
          </View>
          <View className="flex flex-col gap-y-4 w-full  ">
            {/* 1 */}
            <TouchableOpacity
              onPress={() => {
                setIsVisible(false);
                router.push("/screens/RecordAudio");
              }}
              className="flex flex-row justify-between items-center bg-blue-100 mx-1 py-5 px-4 rounded-lg"
            >
              <View className="flex flex-row justify-center items-center gap-x-4">
                <View className="bg-blue-600 rounded-full size-9 flex flex-row justify-center items-center">
                  <FontAwesome5 name="microphone" size={15} color="white" />
                </View>
                <Text className="text-lg">Record Audio</Text>
              </View>
              <MaterialIcons name="navigate-next" size={24} color="black" />
            </TouchableOpacity>
            {/* 2 */}
            <TouchableOpacity
              onPress={() => {
                setIsVisible(false);
                router.push("/screens/UploadFile");
              }}
              className="flex flex-row justify-between items-center bg-blue-100 mx-1 py-5 px-4 rounded-lg"
            >
              <View className="flex flex-row justify-center items-center gap-x-4">
                <View className="bg-blue-600 rounded-full size-9 flex flex-row justify-center items-center">
                  <Entypo name="folder" size={15} color="white" />
                </View>
                <Text className="text-lg">Upload from files</Text>
              </View>
              <MaterialIcons name="navigate-next" size={24} color="black" />
            </TouchableOpacity>
            {/* 3 */}
            <TouchableOpacity
              onPress={() => {
                setIsVisible(false);
                router.push("/screens/YoutubeVideo");
              }}
              className="flex flex-row justify-between items-center bg-blue-100 mx-1 py-5 px-4 rounded-lg"
            >
              <View className="flex flex-row justify-center items-center gap-x-4">
                <View className="bg-blue-600 rounded-full size-9 flex flex-row justify-center items-center">
                  <Entypo name="controller-play" size={15} color="white" />
                </View>
                <Text className="text-lg">YouTube Video</Text>
              </View>
              <MaterialIcons name="navigate-next" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default NewNoteOptions;
