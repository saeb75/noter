import { MinuteItem } from "@/components/Home/Notes";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const initialMinutesList = [
  {
    id: 1,
    Title: "Wealth & Happiness",
    Date: "08/09/2025",
    Durtation: "12 min, 12 sec",
    Icon: <Text style={{ fontSize: 24 }}>😀</Text>,
    Time: '4"14 PM',

    Transcript: "lorem",
    Body: "lorem",
  },
  {
    id: 3,
    Title: "Health & Fitness",
    Date: "08/09/2025",
    Durtation: "12 min, 12 sec",
    Icon: <Text style={{ fontSize: 24 }}>💪</Text>,
    Time: '4"14 PM',
    Transcript: "lorem",
    Body: "lorem",
  },
  {
    id: 2,
    Title: "Career Goals",
    Date: "08/09/2025",
    Durtation: "12 min, 12 sec",
    Icon: <Text style={{ fontSize: 24 }}>🎯</Text>,
    Time: '4"14 PM',
    Transcript: "lorem",
    Body: "lorem",
  },
];
const NotePage = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [minute, setMinute] = useState<MinuteItem | null>(null);

  const [isMinutesActive, setIsMinutesActive] = useState(true);
  const [isTranscriptActive, setIsTranscriptActive] = useState(false);
  const [isChatActive, setIsChatActive] = useState(false);

  useEffect(() => {
    if (id) {
      const foundMinute = initialMinutesList.find(
        (item: MinuteItem) => item.id.toString() === id
      );

      if (foundMinute) {
        setMinute(foundMinute);
      }
    }
  }, [id]);

  if (!minute) {
    return (
      <SafeAreaView className="px-6 pt-2 flex-1 bg-white">
        <View className="flex-1 justify-center items-center">
          <Text>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleMinutesActive = () => {
    setIsMinutesActive(true);
    setIsChatActive(false);
    setIsTranscriptActive(false);
  };
  const handleTranscriptActive = () => {
    setIsTranscriptActive(true);
    setIsChatActive(false);
    setIsMinutesActive(false);
  };
  const handleChatActive = () => {
    setIsChatActive(true);
    setIsMinutesActive(false);
    setIsTranscriptActive(false);
  };
  return (
    <SafeAreaView className="px-4 pt-2 flex-1  bg-white">
      <View className="fixed gap-y-6  flex flex-col w-full ">
        {/* 1 */}
        <View className="w-full flex px-1 mb-3 flex-row justify-between items-center">
          <TouchableOpacity
            onPress={() => router.back()}
            className="flex flex-row items-center -ml-2"
          >
            <Ionicons name="chevron-back-outline" size={25} color="#2563eb" />
            <Text className="text-blue-600 text-xl">Back</Text>
          </TouchableOpacity>

          <Entypo name="share-alternative" size={22} color="#2563eb" />
        </View>
        {/* 2 */}
        <View className="w-full flex flex-col gap-y-1 ">
          <Text className="text-2xl font-semibold">{minute?.Title}</Text>
          <View className="flex flex-row  justify-start items-center relative gap-x-5">
            <View className="flex flex-row items-center gap-x-2">
              <Text className="text-gray-500">{minute.Date}</Text>
              <Text className="text-gray-500">{minute.Time}</Text>
            </View>

            <Text className="text-gray-500">{minute.Durtation}</Text>
            <Text className="absolute text-3xl text-gray-500 left-[10.1rem] bottom-[0.10rem]">
              .
            </Text>
          </View>
        </View>
        {/* 3 */}
        <View className="flex flex-row items-center  justify-between">
          <TouchableOpacity
            onPress={handleMinutesActive}
            style={{
              backgroundColor: isMinutesActive ? "#2563eb" : "#dbeafe",
            }}
            className=" w-32  py-2  flex flex-row  justify-center items-center gap-x-2 rounded-full"
          >
            <Feather
              name="list"
              size={19}
              color={isMinutesActive ? "#ffffff" : "#3b82f6"}
            />
            <Text
              style={{
                color: isMinutesActive ? "#ffffff" : "#3b82f6",
              }}
              className="font-semibold text-white"
            >
              Minutes
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleTranscriptActive}
            style={{
              backgroundColor: isTranscriptActive ? "#2563eb" : "#dbeafe",
            }}
            className=" w-32   py-2 flex flex-row justify-center items-center gap-x-2 rounded-full"
          >
            <AntDesign
              name="message1"
              size={17}
              color={isTranscriptActive ? "#ffffff" : "#3b82f6"}
            />
            <Text
              style={{
                color: isTranscriptActive ? "#ffffff" : "#3b82f6",
              }}
              className="font-semibold "
            >
              Transcript
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleChatActive}
            style={{
              backgroundColor: isChatActive ? "#2563eb" : "#dbeafe",
            }}
            className=" w-32  py-2  flex flex-row justify-center items-center gap-x-2 rounded-full"
          >
            <Feather
              name="message-square"
              size={20}
              color={isChatActive ? "#ffffff" : "#3b82f6"}
            />
            <Text
              style={{
                color: isChatActive ? "#ffffff" : "#3b82f6",
              }}
              className="font-semibold "
            >
              Chat
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {isMinutesActive && (
        <>
          <ScrollView
            className="pt-10 flex-1  w-full"
            showsVerticalScrollIndicator={false}
          >
            <View>
              <Text>Minutes part</Text>
            </View>

            <View className="px-4 py-4 mt-5 w-full rounded-xl border border-gray-200 bg-white shadow-sm flex flex-row justify-between items-center">
              <Text className="text-lg font-semibold text-gray-800">
                How did we do?
              </Text>

              <View className="flex flex-row gap-3">
                {/* Dislike Button */}
                <TouchableOpacity className="bg-red-50 border border-red-200 rounded-full size-10 justify-center items-center">
                  <Entypo name="thumbs-down" size={18} color="#ef4444" />
                </TouchableOpacity>

                {/* Like Button */}
                <TouchableOpacity className="bg-green-50 border border-green-200 rounded-full size-10 justify-center items-center">
                  <Entypo name="thumbs-up" size={18} color="#22c55e" />
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </>
      )}

      {isTranscriptActive && (
        <>
          <ScrollView
            className="pt-10 flex-1  w-full"
            showsVerticalScrollIndicator={false}
          >
            <View>
              <Text>Transcript part</Text>
            </View>
          </ScrollView>
        </>
      )}

      {isChatActive && (
        <>
          <ScrollView
            className="pt-10 flex-1  w-full"
            showsVerticalScrollIndicator={false}
          >
            <Text>Chat part</Text>
          </ScrollView>
          <View className="flex -mx-4 px-3 flex-row justify-between items-center  border-t  border-gray-200 pt-3">
            <TextInput
              placeholder="Message..."
              className=" px-4 rounded-full text-lg border border-green-100 w-[75%]"
              placeholderTextColor="gray"
            />
            <TouchableOpacity className=" border border-blue-200 bg-blue-500/10 backdrop-blur-sm px-4 py-2 flex flex-row items-center gap-x-2 rounded-full">
              <Ionicons name="refresh" size={20} color="#3b82f6" />
              <Text className="text-sm text-blue-600 font-medium">Clear</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {!isChatActive && (
        <TouchableOpacity className=" absolute bottom-10 right-5 bg-blue-600 rounded-full size-12 justify-center items-center  ">
          <Entypo name="controller-play" size={30} color="white" />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default NotePage;
