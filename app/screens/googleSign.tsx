import { useAuth } from "@/stores/useAuth";
import Entypo from "@expo/vector-icons/Entypo";
import {
  GoogleSignin,
  isErrorWithCode,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { router } from "expo-router";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const webClientId = process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT || "";
const GoogleSignIn = () => {
  GoogleSignin.configure({
    webClientId: webClientId,
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
      <View className="flex-1 justify-center items-center bg-white">
        <View className="flex flex-col items-center gap-y-4">
          <ActivityIndicator size="large" color="#3b82f6" />
          <Text className="text-lg font-medium text-gray-600">
            Signing you in...
          </Text>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView className="px-6 pt-2 flex-1 bg-white w-full">
      {/* Top Section - Logo and Branding */}
      <View className="w-full flex-1 flex-col justify-center items-center pt-8">
        {/* Logo/Brand Section */}
        <View className="w-full flex flex-col items-center justify-center gap-y-6 mb-12">
          <View className="flex flex-row justify-center items-center gap-x-2 mb-4">
            <Entypo
              name="circle"
              size={16}
              color="#3b82f6"
              className="bg-blue-500 rounded-full"
            />
            <Text className="text-2xl font-semibold text-gray-900">
              minutes
            </Text>
          </View>

          {/* Hero Text */}
          <View className="flex flex-col items-center gap-y-2 px-4">
            <Text className="text-4xl font-semibold text-center text-gray-900">
              Instant notes from
            </Text>
            <View className="flex flex-row flex-wrap justify-center">
              <Text className="text-4xl font-semibold text-gray-900">
                audio and video,
              </Text>
              <Text className="text-4xl font-semibold text-blue-500">
                {" "}
                done
              </Text>
            </View>
            <Text className="text-4xl font-semibold text-blue-500">
              with AI
            </Text>
          </View>

          {/* Subtitle */}
          <Text className="text-base text-gray-500 text-center px-8 mt-4">
            Transform your audio and video content into organized notes
            instantly
          </Text>
        </View>
      </View>

      {/* Bottom Section - Sign In Button */}
      <View className="w-full pb-8">
        <TouchableOpacity
          onPress={signIn}
          className="flex flex-row items-center justify-center rounded-full border-2 border-gray-200 gap-x-3 w-full py-4 bg-white shadow-sm active:bg-gray-50"
          activeOpacity={0.8}
        >
          <Image
            source={require("@/assets/google.png")}
            className="w-5 h-5"
            resizeMode="contain"
          />
          <Text className="text-lg font-semibold text-gray-900">
            Sign in with Google
          </Text>
        </TouchableOpacity>

        {/* Alternative: Use the built-in GoogleSigninButton */}
        {/* <View className="mt-4">
          <GoogleSigninButton
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={signIn}
          />
        </View> */}
      </View>
    </SafeAreaView>
  );
};

export default GoogleSignIn;
