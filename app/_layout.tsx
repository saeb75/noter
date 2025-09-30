import { useAuth } from "@/stores/useAuth";

import { initAuthToken } from "@/services/Api";
import { useItemsStore } from "@/stores/useItemsStore";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import "../global.css";

export default function RootLayout() {
  const { hydrate, token } = useAuth();
  const [hydrated, setHydrated] = useState(false);
  const { getAllItemsZustand } = useItemsStore();
  useEffect(() => {
    initAuthToken();
  }, []);
  useEffect(() => {
    const load = async () => {
      await hydrate();
      console.log(1);
      setHydrated(true);
    };
    load();
  }, [hydrate]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (token) {
        getAllItemsZustand();

        console.log("tpken", token);
        console.log(2);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [token, getAllItemsZustand]);
  if (!hydrated) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  if (token !== null) {
    return (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="screens/Home" />
      </Stack>
    );
  }
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="screens/Testt" />
      <Stack.Screen name="screens/Home" />
      <Stack.Screen
        options={{
          presentation: "modal",
        }}
        name="screens/Upgrade"
      />
      <Stack.Screen name="screens/Setting" />
      <Stack.Screen name="screens/Support" />
      <Stack.Screen name="screens/YoutubeVideo" />
      <Stack.Screen name="screens/UploadFile" />
      <Stack.Screen name="screens/RecordAudio" />
    </Stack>
  );
}
