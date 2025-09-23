import HomePage from "@/components/Home/HomePage";

import { SafeAreaView } from "react-native-safe-area-context";

const Index = () => {
  return (
    <SafeAreaView className="px-4 pt-2 flex-1  bg-white">
      <HomePage />
    </SafeAreaView>
  );
};

export default Index;
