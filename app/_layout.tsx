import { Stack } from "expo-router";
import "../global.css";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* <Stack.Screen
        name="screens/Signin"
        options={{
          headerShown: false,
        }}
      /> */}
      <Stack.Screen
        name="screens/Home"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="screens/Upgrade"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="screens/Setting"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="screens/Support"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="screens/YoutubeVideo" />
      <Stack.Screen name="screens/UploadFile" />
      <Stack.Screen name="screens/RecordAudio" />
    </Stack>
  );
}
