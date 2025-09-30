import HomePage from "@/components/Home/HomePage";
import NoteOptions from "@/components/Home/NoteOptions";
import React, { useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <>
      <GestureHandlerRootView>
        <SafeAreaView className="px-6 pt-2 flex-1  bg-white">
          <HomePage isVisible={isVisible} setIsVisible={setIsVisible} />
        </SafeAreaView>
        <NoteOptions isVisible={isVisible} setIsVisible={setIsVisible} />
      </GestureHandlerRootView>
    </>
  );
};

export default Home;
