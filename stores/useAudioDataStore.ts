import { Generate } from "@/services/generateApi";
import { AudioUploadResponse } from "@/types/types";
import { create } from "zustand";

interface AudioDataState {
  loading: boolean;
  error: string | null;
  audioData: AudioUploadResponse | null;
  upload: (formData: FormData) => Promise<void>;
  clearAudioData: () => void;
}

export const useAudioDataStore = create<AudioDataState>((set) => ({
  loading: false,
  error: null,
  audioData: null,
  upload: async (formData) => {
    try {
      set({ loading: true, error: null });
      const data = await Generate.getAudioData(formData);
      set({ audioData: data, loading: false, error: null });
    } catch (err: any) {
      set({ error: err.message || "usedefind", loading: false });
    } finally {
      set({ loading: false });
    }
  },
  clearAudioData: () => {
    set({ audioData: null, error: null });
  },
}));
