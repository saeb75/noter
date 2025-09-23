import { useAuth } from "@/stores/useAuth";
import { useGenerateFromYoutubeLink } from "@/stores/useGenerateFromYoutubeLink";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const YoutubeVideo = () => {
  const [YoutubeUrl, setYoutubeUrl] = useState<string>("");
  const { token } = useAuth();
  const { generate } = useGenerateFromYoutubeLink();
  const router = useRouter();

  const handleTrancribeBtn = () => {
    if (YoutubeUrl.trim() && token !== null) {
      generate(YoutubeUrl, token);
      router.push("/screens/Home");
    }
  };

  return (
    <SafeAreaView className="flex-1 px-5 pt-2 bg-white w-full">
      <View className="w-full flex flex-row justify-end  pt-5 pb-9 ">
        <TouchableOpacity onPress={() => router.push("/screens/Home")}>
          <MaterialCommunityIcons name="close" size={22} color="gray" />
        </TouchableOpacity>
      </View>
      <View className="w-full flex-1">
        <View className="w-full">
          <Text className="text-3xl font-semibold">Youtube video notes</Text>
          <Text className="text-xl  py-2 text-gray-500">
            Paste a Youtube link for transcript & notes:
          </Text>
        </View>
        <View className=" mt-4 w-full bg-gray-100 rounded-xl flex flex-row justify-center items-center">
          <TextInput
            value={YoutubeUrl}
            onChangeText={setYoutubeUrl}
            className="w-[60%]  py-6 h-full "
            placeholder="https://..."
            placeholderTextColor="#a8b5db"
          />
          <TouchableOpacity className="  bg-white gap-x-2 px-3 py-2 rounded-lg border border-gray-200 flex flex-row justify-center items-center">
            <FontAwesome5 name="paste" size={20} color="black" />
            <Text>Tap tp Paste</Text>
          </TouchableOpacity>
        </View>
        <View className="w-full pt-16 ">
          <TouchableOpacity className="flex flex-row justify-center items-center gap-x-2">
            <Text className="text-2xl text-blue-600">Language Setting</Text>
            <Feather name="settings" size={24} color="#2563eb" />
          </TouchableOpacity>
        </View>
        <View className="w-full flex justify-center items-center mt-10">
          <Text className="text-center  text-gray-800">
            Youtube Shorts, Live, private, and unlisted videos are not
            supported. Additionallly, Minutes might process the language
            incorrectly depending on the videos transcript. For better results,
          </Text>
          <View className="flex flex-row items-center justify-center">
            <Text className="text-gray-800 ">use</Text>
            <TouchableOpacity>
              <Text className="text-blue-500 "> direrct file upload.</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => handleTrancribeBtn()}
          className="w-full bg-blue-600 rounded-full mt-5"
        >
          <Text className="text-center text-2xl text-white py-3 font-semibold">
            Transcribe & Summarize
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default YoutubeVideo;
