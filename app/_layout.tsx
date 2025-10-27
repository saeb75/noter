import { useAuth } from "@/stores/useAuth";

import { initAuthToken } from "@/services/Api";
import { useItemsStore } from "@/stores/useItemsStore";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import "../global.css";

export default function RootLayout() {
  const { hydrate, token } = useAuth();
  const [hydrated, setHydrated] = useState(false);
  const { getAllItemsZustand, allItemsData, clearItemsData } = useItemsStore();

  const [itemloading, setItemloading] = useState(true);
  // console.log("allItemsData", allItemsData.length);
  // console.log("token from layout", token);
  // console.log("allItemsData from layout", allItemsData.length);
  //first step
  useEffect(() => {
    const load = async () => {
      await hydrate();
      await initAuthToken(); // Initialize authToken module variable
      // console.log("hydrated");
      if (token && token !== null) {
        setHydrated(true);
        // console.log("hydrated token", token);
      }
    };
    load();
    // console.log("hydrated token from layout", token);
  }, [hydrate]);

  // Clear store when token changes (logout or new user)
  useEffect(() => {
    if (token === null || token === undefined) {
      // User logged out - clear store
      clearItemsData();
      // console.log("Store cleared - user logged out");
    } else if (token && token !== null && token !== undefined) {
      // New user logged in - clear store and fetch new data

      //  console.log("Store cleared for new user");
      // Wait a bit then fetch new data
      getAllItemsZustand();
    }
  }, [token, clearItemsData, getAllItemsZustand]);

  //fourth step
  useEffect(() => {
    const interval = setInterval(() => {
      // console.log("interval for getting generations");
      // console.log("token from interval", token);
      if (token && token !== null && token !== undefined) {
        // console.log("start interval");

        getAllItemsZustand();

        // console.log(4);
        // console.log("token from interval", token);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [token, getAllItemsZustand]);

  if (token && token !== null && token !== undefined) {
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
