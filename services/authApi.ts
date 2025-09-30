import { AuthResponse } from "@/types/types";
import axios from "axios";
import { ApiAuthConfig } from "./Api";

export const Auth = {
  Signup: async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<AuthResponse> => {
    const endpoint = `${ApiAuthConfig.BASE_URL}/api/auth/local/register`;

    try {
      const { data } = await axios.post<AuthResponse>(
        endpoint,
        { email, password, username: email },
        { headers: ApiAuthConfig.headers }
      );
      return data;
    } catch (err: any) {
      console.log(err.response?.data || err.message);
      throw err;
    }
  },

  Login: async ({
    identifier,
    password,
  }: {
    identifier: string;
    password: string;
  }): Promise<AuthResponse> => {
    const endpoint = `${ApiAuthConfig.BASE_URL}/api/auth/local`;

    try {
      const { data } = await axios.post<AuthResponse>(
        endpoint,
        { identifier, password },
        { headers: ApiAuthConfig.headers }
      );
      return data;
    } catch (err: any) {
      console.log(err.response?.data || err.message);
      throw err;
    }
  },
};
