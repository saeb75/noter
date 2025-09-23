import { useAuth } from "@/stores/useAuth";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Testt = () => {
  const [emailS, setEmailS] = useState("");
  const [passS, setPassS] = useState("");
  const [emailL, setEmailL] = useState("");
  const [passL, setPassL] = useState("");
  const { register, login, error, loading, token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (token !== null) {
      router.push("/screens/Home");
    }
  }, [token, router]);
  const handleSignup = () => {
    if (emailS.trim() && passS.trim()) {
      register(emailS, passS);
    }
  };

  const handleLogin = () => {
    if (emailL.trim() && passL.trim()) {
      login(emailL, passL);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 w-full px-2 p-4 bg-white">
      <Text className="text-center text-3xl">Sign up</Text>

      <View className="flex flex-col w-full items-center mt-10 gap-y-9">
        <TextInput
          placeholder="Email"
          value={emailS}
          onChangeText={setEmailS}
          className="w-full bg-blue-100 py-2 px-3 rounded"
        />
        <TextInput
          placeholder="Password"
          value={passS}
          onChangeText={setPassS}
          secureTextEntry
          className="w-full bg-blue-100 py-2 px-3 rounded"
        />
      </View>

      <TouchableOpacity
        className="bg-red-400 mx-8 rounded-full mt-10 py-2"
        onPress={handleSignup}
      >
        <Text className="text-center text-xl">Sign up</Text>
      </TouchableOpacity>

      <View className="bg-black h-1 w-full my-16" />

      <Text className="text-center text-3xl">Login</Text>

      <View className="flex flex-col w-full items-center mt-10 gap-y-9">
        <TextInput
          placeholder="Email"
          value={emailL}
          onChangeText={setEmailL}
          className="w-full bg-blue-100 py-2 px-3 rounded"
        />
        <TextInput
          placeholder="Password"
          value={passL}
          onChangeText={setPassL}
          secureTextEntry
          className="w-full bg-blue-100 py-2 px-3 rounded"
        />
      </View>

      <TouchableOpacity
        className="bg-red-400 mx-8 rounded-full mt-10 py-2"
        onPress={handleLogin}
      >
        <Text className="text-center text-xl">Login</Text>
      </TouchableOpacity>

      {error && <Text className="text-red-500 text-center mt-4">{error}</Text>}
    </SafeAreaView>
  );
};

export default Testt;
