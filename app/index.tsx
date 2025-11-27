import { useAuth } from "@/stores/useAuth";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { LogLevel, OneSignal } from "react-native-onesignal";

const Index = () => {
  useEffect(() => {
    OneSignal.Debug.setLogLevel(LogLevel.Verbose);
    // Initialize with your OneSignal App ID
    OneSignal.initialize("0ae64ab3-d9de-4d0f-95ea-bdc0d509bd91");
    // Use this method to prompt for push notifications.
    // We recommend removing this method after testing and instead use In-App Messages to prompt for notification permission.
    OneSignal.Notifications.requestPermission(false);
  }, []);
  const { token, hydrate } = useAuth();
  const [isHydrating, setIsHydrating] = useState(true);

  useEffect(() => {
    const load = async () => {
      await hydrate();
      setIsHydrating(false);
    };
    load();
  }, [hydrate]);

  if (isHydrating) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  // Redirect based on authentication state
  if (token && token !== null && token !== undefined) {
    return <Redirect href="/screens/Home" />;
  }

  return <Redirect href="/screens/googleSign" />;
};

export default Index;
