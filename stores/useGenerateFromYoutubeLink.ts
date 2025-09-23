import { GenerateFromYoutubeLink } from "@/services/Api";
import { ApiYoutubeLinkResponse } from "@/types/types";
import { create } from "zustand";

interface IZGenerateFromYoutubeLink {
  error: string | null;
  loading: boolean;
  generatedData: ApiYoutubeLinkResponse | null;
  generate: (ytLink: string, token: string) => Promise<void>;
}

export const useGenerateFromYoutubeLink = create<IZGenerateFromYoutubeLink>(
  (set) => ({
    error: null,
    loading: false,
    generatedData: null,
    generate: async (ytLink, token) => {
      try {
        set({ loading: true, error: null, generatedData: null });
        const data = await GenerateFromYoutubeLink(
          { youtubeUrl: ytLink },
          token
        );

        if (!data) {
          set({ error: "No data returned from API", loading: false });
          return;
        }

        set({ generatedData: data, loading: false, error: null });
      } catch (err: any) {
        set({ error: err?.message || "Something went wrong", loading: false });
      }
    },
  })
);
