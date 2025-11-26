import { useAuth } from "@/stores/useAuth";
import {
  GoogleSignin,
  GoogleSigninButton,
  isErrorWithCode,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const GoogleSignIn = () => {
  GoogleSignin.configure({
    webClientId:
      "731422422322-a5c95g122m4ug6u4hjeb5qkfnot8om4l.apps.googleusercontent.com",
  });

  const { googleAuth, token, loading } = useAuth();

  const signIn = async () => {
    try {
      console.log("signIn");
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      // Get the users ID token
      const signInResult = await GoogleSignin.signIn();
      console.log("signInResult", signInResult);

      // Try the new style of google-sign in result, from v13+ of that module
      const googleToken = signInResult.data?.idToken;

      console.log("idToken", googleToken);

      if (!googleToken) {
        throw new Error("No ID token found");
      }

      // Create a Google credential with the token
      await googleAuth(googleToken as string);
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            // operation (eg. sign in) already in progress
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // Android only, play services not available or outdated
            break;
          default:
          // some other error happened
        }
      } else {
        // an error that's not related to google sign in occurred
      }
    }
  };

  // Handle user state changes
  useEffect(() => {
    console.log("token from googleSign", token);
    if (token && token !== null && token !== undefined) {
      router.replace("/screens/Home");
    }
  }, [token]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }
  return (
    <SafeAreaView className="px-6 pt-2 flex-1 bg-white w-full">
      <View className="w-full h-[38%] bg-white"></View>
      <View className="w-full flex-1 flex flex-col justify-between items-center ">
        <GoogleSigninButton onPress={signIn} />
      </View>
    </SafeAreaView>
  );
};

export default GoogleSignIn;
