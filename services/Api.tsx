import { AuthResponse } from "@/types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ApiAuthConfig = {
  BASE_URL: process.env.EXPO_PUBLIC_API_AUTH_BASE_URL || "",
  headers: {
    accept: "application/json",
    "Content-Type": "application/json",
  },
};

export let authToken: string | null = null;

export const setAuthToken = (token: string | null) => {
  authToken = token;
};

export const initAuthToken = async () => {
  try {
    console.log("initAuthToken");
    const stored = await AsyncStorage.getItem("auth");
    if (stored) {
      const data: AuthResponse = JSON.parse(stored);
      authToken = data.jwt;
      console.log("Token loaded:", authToken);
    }
  } catch (err) {
    console.log("Error loading token:", err);
  }
};

export const ApiGenerateConfig = () => ({
  BASE_URL: process.env.EXPO_PUBLIC_API_GENERATE_BASE_URL || "",
  headers: {
    accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${authToken}`,
  },
});

export const TrancribeYoutubeApi = async (
  { youtubeUrl }: { youtubeUrl: string },
  signal?: AbortSignal
) => {
  const endpoint = `${ApiAuthConfig.BASE_URL}/youtube/transcript`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: ApiAuthConfig.headers,
    body: JSON.stringify({
      youtubeUrl: youtubeUrl,
    }),
    signal,
  });
  console.log("1");

  if (!response.ok) {
    console.log("eror");
    throw new Error(`Creating Transctibe failed : ${response.status}`);
  }
  console.log("2");
  const data = await response.json();
  return data;
};
