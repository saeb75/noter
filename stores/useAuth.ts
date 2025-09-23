import { Login, Signup } from "@/services/Api";
import { AuthResponse, User } from "@/types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

interface AuthState {
  user: User | null;
  loading: boolean;
  token: string | null;
  error: string | null;

  register: (email: string, password: string) => Promise<void>;
  login: (identifier: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  hydrate: () => Promise<void>;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  loading: false,
  token: null,
  error: null,

  register: async (email, password) => {
    try {
      set({ loading: true, error: null });
      const data: AuthResponse = await Signup({ email, password });
      set({ user: data.user, token: data.jwt, loading: false });
      await AsyncStorage.setItem("auth", JSON.stringify(data));
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  login: async (identifier: string, password: string) => {
    try {
      set({ loading: true, error: null });
      const data: AuthResponse = await Login({ identifier, password });
      set({ user: data.user, token: data.jwt, loading: false });
      await AsyncStorage.setItem("auth", JSON.stringify(data));
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },
  logout: async () => {
    await AsyncStorage.removeItem("auth");
    set({ user: null, token: null });
  },

  hydrate: async () => {
    const stored = await AsyncStorage.getItem("auth");
    if (stored) {
      const data: AuthResponse = JSON.parse(stored);
      set({ user: data.user, token: data.jwt });
    }
  },
}));
