import { useAuth } from "@/stores/useAuth";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import appsFlyer from "react-native-appsflyer";
import { Settings } from "react-native-fbsdk-next";
import { LogLevel, OneSignal } from "react-native-onesignal";

// 1. تعریف ثابت‌ها (Constants) در بیرون از کامپوننت
const AF_DEV_KEY = "YOUR_DEV_KEY";
const AF_APP_ID = "YOUR_APP_ID";
const ONESIGNAL_APP_ID = "0ae64ab3-d9de-4d0f-95ea-bdc0d509bd91";

const Index = () => {
  // 2. استفاده از useEffect برای یک بار مقداردهی اولیه SDK ها
  useEffect(() => {
    // ------------------------------------
    // OneSignal Initialization
    // ------------------------------------
    OneSignal.Debug.setLogLevel(LogLevel.Verbose);
    OneSignal.initialize(ONESIGNAL_APP_ID);
    OneSignal.Notifications.requestPermission(false);

    // ------------------------------------
    // AppsFlyer Initialization (فقط یک بار اجرا می شود)
    // ------------------------------------
    appsFlyer.initSdk(
      {
        devKey: AF_DEV_KEY,
        isDebug: false,
        appId: AF_APP_ID,
        onInstallConversionDataListener: true,
        onDeepLinkListener: true,
        timeToWaitForATTUserAuthorization: 10,
      },
      (result) => {
        console.log("AppsFlyer Success:", result);
      },
      (error) => {
        console.error("AppsFlyer Error:", error);
      }
    );

    Settings.initializeSDK();
    Settings.setAdvertiserTrackingEnabled(true);
    Settings.setAdvertiserIDCollectionEnabled(true);
  }, []); // ✅ آرایه خالی تضمین می کند که این کد فقط یک بار اجرا شود

  const { token, hydrate } = useAuth();
  const [isHydrating, setIsHydrating] = useState(true);

  // useEffect برای بارگذاری احراز هویت
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
