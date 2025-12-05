import { useNoteOptions } from "@/stores/useNoteOptions";
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

// type VisibleProps = {
//   isVisible: boolean;
//   setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
// };

const NoteOptions = () => {
  const { isVisible, setIsVisible } = useNoteOptions();
  const snapPoints = useMemo(() => ["50%"], []);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const router = useRouter();

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) {
        setIsVisible(false);
      }
    },
    [setIsVisible]
  );

  const handleClose = useCallback(() => {
    bottomSheetRef.current?.close();
    setIsVisible(false);
  }, [setIsVisible]);

  const handleOptionPress = useCallback(
    (route: string) => {
      setIsVisible(false);
      router.push(route as any);
    },
    [router, setIsVisible]
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={isVisible ? 0 : -1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      enablePanDownToClose
      onClose={handleClose}
      backgroundStyle={{ backgroundColor: "#ffffff" }}
      handleIndicatorStyle={{ backgroundColor: "#d1d5db", width: 40 }}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          pressBehavior="close"
          opacity={0.5}
        />
      )}
    >
      <BottomSheetView className="pb-6 h-full">
        <View className="bg-white flex flex-1 flex-col w-full px-4 h-[25rem]">
          <View className="w-full flex flex-row justify-between items-center pt-3 pb-8">
            <Text className="font-bold text-2xl text-gray-900">
              New Minutes
            </Text>
            <TouchableOpacity
              onPress={handleClose}
              className="w-8 h-8 items-center justify-center"
              activeOpacity={0.6}
            >
              <AntDesign name="close" size={22} color="#6b7280" />
            </TouchableOpacity>
          </View>
          <View className="flex flex-col gap-y-3 w-full">
            {/* 1 */}
            <TouchableOpacity
              onPress={() => handleOptionPress("/screens/RecordAudio")}
              activeOpacity={0.7}
              className="flex flex-row justify-between items-center mx-1 py-4 px-5 rounded-xl"
              style={{
                backgroundColor: "#eff6ff",
                borderWidth: 1,
                borderColor: "#dbeafe",
              }}
            >
              <View className="flex flex-row justify-center items-center gap-x-4">
                <View
                  className="rounded-xl w-12 h-12 flex flex-row justify-center items-center"
                  style={{ backgroundColor: "#2563eb" }}
                >
                  <FontAwesome5 name="microphone" size={16} color="white" />
                </View>
                <Text
                  className="text-lg font-semibold"
                  style={{ color: "#1e293b" }}
                >
                  Record Audio
                </Text>
              </View>
              <MaterialIcons name="navigate-next" size={24} color="#2563eb" />
            </TouchableOpacity>
            {/* 2 */}
            <TouchableOpacity
              onPress={() => handleOptionPress("/screens/UploadFile")}
              activeOpacity={0.7}
              className="flex flex-row justify-between items-center mx-1 py-4 px-5 rounded-xl"
              style={{
                backgroundColor: "#faf5ff",
                borderWidth: 1,
                borderColor: "#e9d5ff",
              }}
            >
              <View className="flex flex-row justify-center items-center gap-x-4">
                <View
                  className="rounded-xl w-12 h-12 flex flex-row justify-center items-center"
                  style={{ backgroundColor: "#9333ea" }}
                >
                  <Entypo name="folder" size={16} color="white" />
                </View>
                <Text
                  className="text-lg font-semibold"
                  style={{ color: "#1e293b" }}
                >
                  Upload from files
                </Text>
              </View>
              <MaterialIcons name="navigate-next" size={24} color="#9333ea" />
            </TouchableOpacity>
            {/* 3 */}
            <TouchableOpacity
              onPress={() => handleOptionPress("/screens/YoutubeVideo")}
              activeOpacity={0.7}
              className="flex flex-row justify-between items-center mx-1 py-4 px-5 rounded-xl"
              style={{
                backgroundColor: "#fef2f2",
                borderWidth: 1,
                borderColor: "#fecaca",
              }}
            >
              <View className="flex flex-row justify-center items-center gap-x-4">
                <View
                  className="rounded-xl w-12 h-12 flex flex-row justify-center items-center"
                  style={{ backgroundColor: "#dc2626" }}
                >
                  <Entypo name="controller-play" size={16} color="white" />
                </View>
                <Text
                  className="text-lg font-semibold"
                  style={{ color: "#1e293b" }}
                >
                  YouTube Video
                </Text>
              </View>
              <MaterialIcons name="navigate-next" size={24} color="#dc2626" />
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default NoteOptions;
