import { Generate } from "@/services/generateApi";
import { ApiYoutubeLinkResponse } from "@/types/types";
import { create } from "zustand";

interface IYoutubeDataState {
  error: string | null;
  loading: boolean;
  generatedData: ApiYoutubeLinkResponse | null;
  generate: (ytLink: string) => Promise<void>;
  clearYoutubeData: () => void;
}

export const useYoutubeData = create<IYoutubeDataState>((set) => ({
  error: null,
  loading: false,
  generatedData: null,
  generate: async (ytLink) => {
    try {
      set({ loading: true, error: null, generatedData: null });
      const data = await Generate.generateYoutubeData({ youtubeUrl: ytLink });

      if (!data) {
        set({ error: "No data returned from API", loading: false });
        return;
      }

      set({ generatedData: data, loading: false, error: null });
    } catch (err: any) {
      set({ error: err?.message || "Something went wrong", loading: false });
    }
  },
  clearYoutubeData: () => {
    set({ generatedData: null, error: null });
  },
}));
