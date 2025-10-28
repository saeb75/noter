import {
  ApiYoutubeLinkResponse,
  AudioUploadResponse,
  getItems,
} from "@/types/types";
import axios from "axios";
import { ApiGenerateConfig } from "./Api";
export const Generate = {
  getYoutubeData: async ({
    youtubeUrl,
  }: {
    youtubeUrl: string;
  }): Promise<ApiYoutubeLinkResponse | null> => {
    const headers = ApiGenerateConfig().headers;

    // Check if token is null or undefined
    if (!headers.Authorization || headers.Authorization === "Bearer null") {
      console.log("getYoutubeData: Skipping API call - no valid token");
      return null;
    }

    const endpoint = `${ApiGenerateConfig().BASE_URL}/youtube-transcript`;
    console.log("endpoint getYoutubeData", endpoint);

    try {
      const { data } = await axios.post<ApiYoutubeLinkResponse>(
        endpoint,
        { youtubeUrl, fileName: "test" },
        { headers }
      );

      return data || null;
    } catch (err: any) {
      console.log(err.response?.data || err.message);
      return null;
    }
  },

  getAudioData: async (FormData: any): Promise<AudioUploadResponse | null> => {
    const headers = ApiGenerateConfig().headers;

    // Check if token is null or undefined
    if (!headers.Authorization || headers.Authorization === "Bearer null") {
      console.log("getAudioData: Skipping API call - no valid token");
      return null;
    }

    const endpoint = `${ApiGenerateConfig().BASE_URL}/audio-transcript`;
    try {
      const { data } = await axios.post(endpoint, FormData, {
        headers: {
          ...headers,
          "Content-Type": "multipart/form-data",
        },
      });
      return data || null;
    } catch (err: any) {
      console.log(err.response?.data || err.message);
      return null;
    }
  },

  getGenerations: async (): Promise<getItems | null> => {
    const headers = ApiGenerateConfig().headers;

    // Check if token is null or undefined
    if (!headers.Authorization || headers.Authorization === "Bearer null") {
      // console.log("getGenerations: Skipping API call - no valid token");
      return null;
    }

    const endpoint = `${ApiGenerateConfig().BASE_URL}/generations`;
    // console.log("endpoint getGenerations", endpoint);
    // console.log(headers);
    try {
      const { data } = await axios.get(endpoint, {
        headers,
      });

      return data || null;
    } catch (err: any) {
      console.log(
        "error from getGenerations",
        err.response?.data || err.message
      );
      return null;
    }
  },
};
