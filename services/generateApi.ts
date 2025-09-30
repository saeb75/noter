import {
  ApiYoutubeLinkResponse,
  AudioUploadResponse,
  getItems,
} from "@/types/types";
import axios from "axios";
import { ApiAuthConfig, ApiGenerateConfig } from "./Api";
export const Generate = {
  getYoutubeData: async ({
    youtubeUrl,
  }: {
    youtubeUrl: string;
  }): Promise<ApiYoutubeLinkResponse | null> => {
    const endpoint = `${ApiGenerateConfig().BASE_URL}/notes/youtube-to-audio`;

    try {
      const { data } = await axios.post<ApiYoutubeLinkResponse>(
        endpoint,
        { youtubeUrl, fileName: "test" },
        { headers: ApiGenerateConfig().headers }
      );

      return data || null;
    } catch (err: any) {
      console.log(err.response?.data || err.message);
      return null;
    }
  },
  getAudioData: async (FormData: any): Promise<AudioUploadResponse | null> => {
    const endpoint = `${ApiGenerateConfig().BASE_URL}/notes/audio-upload`;
    try {
      const { data } = await axios.post(
        endpoint,
        FormData,

        {
          headers: {
            ...ApiGenerateConfig().headers,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return data || null;
    } catch (err: any) {
      console.log(err.response?.data || err.message);
      return null;
    }
  },

  getGenerations: async (): Promise<getItems | null> => {
    const endpoint = `${ApiAuthConfig.BASE_URL}/api/generations/user-generations`;

    try {
      const { data } = await axios.get<getItems>(endpoint, {
        headers: ApiGenerateConfig().headers,
      });

      return data || null;
    } catch (err: any) {
      console.log(err.response?.data || err.message);
      return null;
    }
  },
};
