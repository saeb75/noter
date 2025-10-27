import { setAuthToken } from "@/services/Api";
import { Auth } from "@/services/authApi";
import { AuthResponse, User } from "@/types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { useAudioDataStore } from "./useAudioDataStore";
import { useItemsStore } from "./useItemsStore";
import { useYoutubeDataStore } from "./useYoutubeDataStore";

interface IZAuthState {
  user: User | null;
  loading: boolean;
  token: string | null;
  error: string | null;

  register: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  hydrate: () => Promise<void>;
}

export const useAuth = create<IZAuthState>((set) => ({
  user: null,
  loading: false,
  token: null,
  error: null,

  register: async (email, password) => {
    try {
      set({ loading: true, error: null });
      const data: AuthResponse = await Auth.Signup({ email, password });
      set({ user: data.user, token: data.jwt, loading: false });
      setAuthToken(data.jwt);
      await AsyncStorage.setItem("auth", JSON.stringify(data));
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  login: async (email: string, password: string) => {
    console.log("start login from useAuth");
    try {
      set({ loading: true, error: null });
      console.log("start login", "email", email, "password", password);
      const data: AuthResponse = await Auth.Login({ email, password });
      console.log(
        "data from login from useAuth",
        JSON.stringify(data, null, 2)
      );
      set({ user: data.user, token: data.jwt, loading: false });
      setAuthToken(data.jwt);
      await AsyncStorage.setItem("auth", JSON.stringify(data));
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  logout: async () => {
    await AsyncStorage.removeItem("auth");
    // Clear all store data when logging out
    const { clearItemsData } = useItemsStore.getState();
    const { clearAudioData } = useAudioDataStore.getState();
    const { clearYoutubeData } = useYoutubeDataStore.getState();
    clearItemsData();
    clearAudioData();
    clearYoutubeData();
    set({ user: null, token: null });
    setAuthToken(null);
    console.log("logout");
  },

  hydrate: async () => {
    const stored = await AsyncStorage.getItem("auth");
    // console.log("stored", stored);
    if (stored) {
      // console.log("stored");
      const data: AuthResponse = JSON.parse(stored);
      set({ user: data.user, token: data.jwt });
      setAuthToken(data.jwt);
    }
  },
}));
