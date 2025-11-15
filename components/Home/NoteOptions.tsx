import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

import { useRouter } from "expo-router";
import React, { useCallback, useMemo, useRef } from "react";
import { Text, TouchableOpacity, View } from "react-native";

type VisibleProps = {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const NoteOptions: React.FC<VisibleProps> = ({ isVisible, setIsVisible }) => {
  const snappoint = useMemo(() => ["45%"], []);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const handleSheetChanges = useCallback(
    (index: number) => {
      console.log("handleSheetChanges", index);
      if (index === -1) setIsVisible(false);
    },
    [setIsVisible]
  );
  const router = useRouter();

  if (!isVisible) return null;
  return (
    <BottomSheet
      onChange={handleSheetChanges}
      enablePanDownToClose
      onClose={() => setIsVisible(false)}
      ref={bottomSheetRef}
      snapPoints={snappoint}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          pressBehavior="close"
        />
      )}
    >
      <BottomSheetView className=" pb-6 h-full   ">
        <View className=" bg-white flex flex-1 flex-col w-full px-3 h-[25rem] ">
          <View className="w-full flex flex-row justify-between items-center pt-4 pb-10">
            <Text className="font-bold text-xl">New Minutes</Text>
            <View className="flex flex-row items-center gap-x-2 ">
              <AntDesign
                name="close"
                size={20}
                color="black"
                className="pr-2 "
                onPress={() => setIsVisible(false)}
              />
            </View>
          </View>
          <View className="flex flex-col gap-y-4 w-full  ">
            {/* 1 */}
            <TouchableOpacity
              onPress={() => {
                setIsVisible(false);
                router.push("/screens/RecordAudio");
              }}
              className="flex flex-row justify-between h-[25%] items-center bg-blue-100 mx-1 py-5 px-4 rounded-lg"
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
              className="flex flex-row justify-between h-[25%] items-center bg-blue-100 mx-1 py-5 px-4 rounded-lg"
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
              className="flex h-[25%] flex-row justify-between items-center bg-blue-100 mx-1 py-5 px-4 rounded-lg"
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
      </BottomSheetView>
    </BottomSheet>
  );
};

export default NoteOptions;
