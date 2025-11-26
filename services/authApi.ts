import { AuthResponse } from "@/types/types";
import axios from "axios";
import { ApiAuthConfig } from "./Api";

export const Auth = {
  GoogleAuth: async (token: string) => {
    const endpoint = `${ApiAuthConfig.BASE_URL}/auth`;
    try {
      const { data } = await axios.post(
        endpoint,
        { token },
        { headers: ApiAuthConfig.headers }
      );
      return data.data;
    } catch (error: any) {
      console.log(error.response?.data || error.message);
      throw error;
    }
  },
  Signup: async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<AuthResponse> => {
    const endpoint = `${ApiAuthConfig.BASE_URL}/register`;
    console.log("endpoint", endpoint);
    console.log("email", email);
    console.log("password", password);
    try {
      const { data } = await axios.post(
        endpoint,
        { username: email, email, password },
        { headers: ApiAuthConfig.headers }
      );

      console.log(JSON.stringify(data.data, null, 2));

      return data.data;
    } catch (err: any) {
      console.log(err.response?.data || err.message);
      throw err;
    }
  },

  Login: async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<AuthResponse> => {
    const endpoint = `${ApiAuthConfig.BASE_URL}/login`;
    console.log("endpoint login", endpoint);
    console.log("email login", email);
    console.log("password login", password);
    try {
      const { data } = await axios.post(
        endpoint,
        { email, password },
        { headers: ApiAuthConfig.headers }
      );
      return data.data;
    } catch (err: any) {
      console.log(err.response?.data || err.message);
      throw err;
    }
  },
};
