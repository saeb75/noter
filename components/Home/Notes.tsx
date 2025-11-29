import { useAuth } from "@/stores/useAuth";
import { useGeneration } from "@/stores/useGeneration";

import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { useRouter } from "expo-router";
import React, { ReactElement, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export interface MinuteItem {
  id: number;
  Title: string;
  Date: string;
  Durtation: string;
  Icon: ReactElement;
  Transcript: string;
  Body: string;
  Time: string;
}

// Emoji options for the picker
const emojiOptions = [
  "😀",
  "😃",
  "😄",
  "😁",
  "😆",
  "😅",
  "😂",
  "🤣",
  "😊",
  "😇",
  "🙂",
  "🙃",
  "😉",
  "😌",
  "😍",
  "🥰",
  "😘",
  "😗",
  "😙",
  "😚",
  "😋",
  "😛",
  "😝",
  "😜",
  "🤪",
  "🤨",
  "🧐",
  "🤓",
  "😎",
  "🤩",
  "🥳",
  "😏",
  "😒",
  "😞",
  "😔",
  "😟",
  "😕",
  "🙁",
  "☹️",
  "😣",
  "😖",
  "😫",
  "😩",
  "🥺",
  "😢",
  "😭",
  "😤",
  "😠",
  "😡",
  "🤬",
  "🤯",
  "😳",
  "🥵",
  "🥶",
  "😱",
  "😨",
  "😰",
  "😥",
  "😓",
  "🤗",
  "🤔",
  "🤭",
  "🤫",
  "🤥",
  "😶",
  "😐",
  "😑",
  "😬",
  "🙄",
  "😯",
  "💼",
  "💰",
  "💎",
  "🎯",
  "🎮",
  "🎵",
  "🎨",
  "🍎",
  "🌟",
  "⚡",
  "🔥",
  "💡",
  "🎉",
  "🏆",
  "📚",
  "✨",
  "💪",
  "❤️",
  "🚀",
  "⭐",
];

const initialMinutesList = [
  {
    id: 1,
    Title: "Wealth & Happiness",
    Date: "08/09/2025",
    Durtation: "12 min, 12 sec",
    Icon: <Text style={{ fontSize: 24 }}>😀</Text>,
    Transcript: "lorem",
    Body: "lorem",
    Time: '4"14 PM',
  },
  {
    id: 3,
    Title: "Health & Fitness",
    Date: "08/09/2025",
    Durtation: "12 min, 12 sec",
    Icon: <Text style={{ fontSize: 24 }}>💪</Text>,
    Transcript: "lorem",
    Body: "lorem",

    Time: '4"14 PM',
  },
  {
    id: 2,
    Title: "Career Goals",
    Date: "08/09/2025",
    Durtation: "12 min, 12 sec",
    Icon: <Text style={{ fontSize: 24 }}>🎯</Text>,
    Transcript: "lorem",
    Body: "lorem",
    Time: '4"14 PM',
  },
];

const Notes = () => {
  const router = useRouter();
  const [minutesList, setMinutesList] =
    useState<MinuteItem[]>(initialMinutesList);
  const [isMinutes, setIsMinutes] = useState(false);
  const [isNotes] = useState(false);

  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MinuteItem | null>(null);
  const [showEditnameModal, setShowEditnameModal] = useState(false);
  const [showEditiconModal, setShowEditiconModal] = useState(false);

  // States for editing
  const [editedTitle, setEditedTitle] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("");

  const { allItemsData, getItems } = useGeneration();
  const [initialLoading, setInitialLoading] = useState(false);
  const { token, JustSign, setJustSign } = useAuth();

  useEffect(() => {
    const load = async () => {
      if (token !== null && token !== undefined) {
        if (JustSign) {
          setInitialLoading(true);
          await getItems();
          setInitialLoading(false);
          setJustSign(false);
        } else {
          await getItems();
        }
      }
    };
    load();
  }, [token, getItems, JustSign, setJustSign]);

  useEffect(() => {
    if (allItemsData.length > 0) {
      setIsMinutes(true);
    }
  }, [allItemsData]);
  // console.log("allItemsData from notes", JSON.stringify(allItemsData, null, 2));`
  const handleOptionsPress = (item: MinuteItem) => {
    setSelectedItem(item);
    setShowOptionsModal(true);
  };

  const handleEditName = () => {
    setShowOptionsModal(false);
    setEditedTitle(selectedItem?.Title || "");
    setShowEditnameModal(true);
  };

  const handleEditIcon = () => {
    setShowOptionsModal(false);
    // Initialize with current emoji or default
    setSelectedEmoji("😀");
    setShowEditiconModal(true);
  };

  if (initialLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  const handleDelete = () => {
    setShowOptionsModal(false);
    Alert.alert(
      "Delete Item",
      `Are you sure you want to delete ${selectedItem?.Title} item?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            if (selectedItem) {
              setMinutesList((prev) =>
                prev.filter((item) => item.id !== selectedItem.id)
              );
            }
          },
        },
      ]
    );
  };

  const handleSaveTitle = () => {
    if (selectedItem && editedTitle.trim()) {
      setMinutesList((prev) =>
        prev.map((item) =>
          item.id === selectedItem.id
            ? { ...item, Title: editedTitle.trim() }
            : item
        )
      );
      closeEditnameModal();
    } else {
      Alert.alert("Error", "Please enter a valid title");
    }
  };

  const handleSaveIcon = () => {
    if (selectedItem && selectedEmoji) {
      setMinutesList((prev) =>
        prev.map((item) =>
          item.id === selectedItem.id
            ? {
                ...item,
                Icon: <Text style={{ fontSize: 24 }}>{selectedEmoji}</Text>,
              }
            : item
        )
      );
      closeEditiconModal();
    } else {
      Alert.alert("Error", "Please select an emoji");
    }
  };

  const closeEditiconModal = () => {
    setShowEditiconModal(false);
    setSelectedEmoji("");
  };

  const closeEditnameModal = () => {
    setShowEditnameModal(false);
    setEditedTitle("");
  };

  const closeModal = () => {
    setShowOptionsModal(false);
    setSelectedItem(null);
  };
  console.log(isMinutes);

  return (
    <View className="pt-5 flex-1">
      <Text className="text-4xl font-bold">My minutes</Text>
      {!isMinutes && (
        <View className="flex flex-col pt-32 items-center">
          <View className="bg-blue-100 rounded-full">
            <AntDesign
              name="clock-circle"
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
      )}

      {isMinutes && (
        <>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={allItemsData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <>
                {item.state === "SUCCESS" && (
                  <TouchableOpacity
                    onPress={() =>
                      router.push(`/screens/Notes/${item.id}` as any)
                    }
                    key={item.id}
                    className="flex  my-2 flex-row rounded-xl px-3 py-3 justify-between items-center w-full border border-gray-200"
                  >
                    <View className="flex flex-row justify-center items-center gap-x-3">
                      <View className="bg-blue-100 rounded-full size-14 flex flex-row justify-center items-center">
                        <Text className="text-4xl">{item.icon || "😀"}</Text>
                      </View>
                      <View className="flex flex-col gap-y-1 justify-center items-start">
                        <Text className="text-lg font-semibold">
                          {item.title.length > 20
                            ? item.title.slice(0, 20) + "..."
                            : item.title}
                        </Text>
                        <View className="flex flex-row justify-center items-center relative gap-x-5">
                          <Text className="text-gray-500">{item.type}</Text>
                          <Text className="absolute text-3xl text-gray-500 left-[5.78rem] bottom-[0.10rem]">
                            .
                          </Text>
                          <Text className="text-gray-500">
                            {item.createdAt.slice(0, 10)}
                          </Text>
                        </View>
                      </View>
                    </View>
                    {/* <TouchableOpacity>
                      <SimpleLineIcons name="options" size={18} color="gray" />
                    </TouchableOpacity> */}
                  </TouchableOpacity>
                )}
                {item.state === "PROCESSING" && (
                  <TouchableOpacity
                    onPress={() =>
                      router.push(`/screens/Notes/${item.id}` as any)
                    }
                    key={item.id}
                    className="flex my-3 flex-row rounded-2xl px-4 py-4 justify-between items-center w-full bg-blue-50 border border-blue-200 shadow-sm active:bg-blue-100"
                    style={{
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 1,
                      },
                      shadowOpacity: 0.1,
                      shadowRadius: 2,
                      elevation: 2,
                    }}
                  >
                    <View className="flex-1">
                      <Text className="text-blue-800 font-medium text-base">
                        Processing...
                      </Text>
                      <Text className="text-blue-600 text-sm mt-1 opacity-80">
                        Your note is being prepared
                      </Text>
                    </View>

                    <View className="ml-4">
                      <ActivityIndicator
                        size="large"
                        color="#2563eb"
                        style={{ transform: [{ scale: 1.1 }] }}
                      />
                    </View>
                  </TouchableOpacity>
                )}
              </>
            )}
          />
        </>
      )}

      {isNotes && (
        <ScrollView
          className="w-full flex flex-col flex-1 mb-4 mt-6"
          contentContainerStyle={{
            alignItems: "flex-start",
            justifyContent: "flex-start",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {minutesList.map((item: MinuteItem) => (
            <TouchableOpacity
              onPress={() => router.push(`/screens/Notes/${item.id}` as any)}
              key={item.id}
              className="flex  my-2 flex-row rounded-xl px-3 py-3 justify-between items-center w-full border border-gray-200"
            >
              <View className="flex flex-row justify-center items-center gap-x-3">
                <View className="bg-blue-100 rounded-full size-14 flex flex-row justify-center items-center">
                  {item.Icon}
                </View>
                <View className="flex flex-col gap-y-1 justify-center items-start">
                  <Text className="text-lg font-semibold">{item.Title}</Text>
                  <View className="flex flex-row justify-center items-center relative gap-x-5">
                    <Text className="text-gray-500">{item.Date}</Text>
                    <Text className="absolute text-3xl text-gray-500 left-[5.78rem] bottom-[0.10rem]">
                      .
                    </Text>
                    <Text className="text-gray-500">{item.Durtation}</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity onPress={() => handleOptionsPress(item)}>
                <SimpleLineIcons name="options" size={18} color="gray" />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {/* Options Modal */}
      <Modal
        visible={showOptionsModal}
        transparent={true}
        animationType="fade"
        onRequestClose={closeModal}
      >
        <TouchableOpacity
          className="flex-1 bg-[#0e0e0e91] bg-opacity-50 justify-center items-center"
          activeOpacity={1}
          onPress={closeModal}
        >
          <TouchableOpacity
            className="bg-white rounded-2xl mx-4 p-4 w-80"
            activeOpacity={1}
          >
            <Text className="text-xl font-bold text-center mb-4 text-gray-800">
              Options
            </Text>

            <TouchableOpacity
              className="flex flex-row items-center py-4 px-2 border-b border-gray-100"
              onPress={handleEditName}
            >
              <AntDesign name="edit" size={20} color="#4B5563" />
              <Text className="text-lg ml-3 text-gray-700">Edit Name</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex flex-row items-center py-4 px-2 border-b border-gray-100"
              onPress={handleEditIcon}
            >
              <Ionicons
                name="color-palette-outline"
                size={20}
                color="#4B5563"
              />
              <Text className="text-lg ml-3 text-gray-700">Edit Icon</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex flex-row items-center py-4 px-2"
              onPress={handleDelete}
            >
              <AntDesign name="delete" size={20} color="#EF4444" />
              <Text className="text-lg ml-3 text-red-500">Delete</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="mt-4 bg-gray-100 rounded-xl py-3"
              onPress={closeModal}
            >
              <Text className="text-center text-lg font-semibold text-gray-700">
                Cancel
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      {/* Edit Name Modal */}
      <Modal
        visible={showEditnameModal}
        onRequestClose={closeEditnameModal}
        transparent={true}
        animationType="fade"
      >
        <TouchableOpacity
          className="flex-1 bg-[#0e0e0e91] bg-opacity-50 justify-center items-center"
          activeOpacity={1}
          onPress={closeEditnameModal}
        >
          <TouchableOpacity
            className="bg-white rounded-2xl mx-4 p-6 w-80"
            activeOpacity={1}
          >
            <Text className="text-xl font-bold text-center mb-4 text-gray-800">
              Edit Name
            </Text>

            <TextInput
              className="border border-gray-300 rounded-xl px-4 py-3 text-lg mb-4"
              placeholder="Enter new name"
              value={editedTitle}
              onChangeText={setEditedTitle}
              autoFocus={true}
            />

            <View className="flex-row gap-3">
              <TouchableOpacity
                className="flex-1 bg-gray-100 rounded-xl py-3"
                onPress={closeEditnameModal}
              >
                <Text className="text-center text-lg font-semibold text-gray-700">
                  Cancel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-1 bg-blue-500 rounded-xl py-3"
                onPress={handleSaveTitle}
              >
                <Text className="text-center text-lg font-semibold text-white">
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      {/* Edit Icon Modal - FIXED VERSION */}
      <Modal
        visible={showEditiconModal}
        onRequestClose={closeEditiconModal}
        transparent={true}
        animationType="fade"
      >
        <TouchableOpacity
          className="flex-1 bg-black/50 justify-center items-center px-4"
          activeOpacity={1}
          onPress={closeEditiconModal}
        >
          <TouchableOpacity
            className="bg-white rounded-2xl p-6 w-full max-w-sm"
            style={{ maxHeight: "80%" }}
            activeOpacity={1}
          >
            <Text className="text-xl font-bold text-center mb-4 text-gray-800">
              Choose Emoji
            </Text>

            {/* Selected Emoji Preview */}
            <View className="items-center mb-4">
              <View className="bg-blue-100 rounded-full w-16 h-16 flex justify-center items-center">
                <Text style={{ fontSize: 32 }}>{selectedEmoji || "😀"}</Text>
              </View>
              <Text className="text-sm text-gray-600 mt-2">
                Selected: {selectedEmoji || "😀"}
              </Text>
            </View>

            {/* Emoji Grid */}
            <ScrollView
              className="mb-4"
              style={{ maxHeight: 200 }}
              showsVerticalScrollIndicator={true}
            >
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  paddingHorizontal: 4,
                }}
              >
                {emojiOptions.map((emoji, index) => (
                  <TouchableOpacity
                    key={`emoji-${index}`}
                    style={{
                      width: 48,
                      height: 48,
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 8,
                      margin: 2,
                      backgroundColor:
                        selectedEmoji === emoji ? "#DBEAFE" : "#F3F4F6",
                    }}
                    onPress={() => {
                      console.log("Selected emoji:", emoji);
                      setSelectedEmoji(emoji);
                    }}
                  >
                    <Text style={{ fontSize: 24 }}>{emoji}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>

            {/* Buttons */}
            <View className="flex-row gap-3">
              <TouchableOpacity
                className="flex-1 bg-gray-100 rounded-xl py-3"
                onPress={closeEditiconModal}
              >
                <Text className="text-center text-lg font-semibold text-gray-700">
                  Cancel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-1 bg-blue-500 rounded-xl py-3"
                onPress={handleSaveIcon}
              >
                <Text className="text-center text-lg font-semibold text-white">
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default Notes;
