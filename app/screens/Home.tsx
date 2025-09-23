import HomePage from "@/components/Home/HomePage";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  return (
    <SafeAreaView className="px-6 pt-2 flex-1  bg-white">
      <HomePage />
    </SafeAreaView>
  );
};

export default Home;
