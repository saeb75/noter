import { Generate } from "@/services/generateApi";
import { GeneratedItem, getItems } from "@/types/types";
import { create } from "zustand";

interface IGenerationState {
  loading: boolean;
  error: string | null;
  allItemsData: GeneratedItem[] | [];
  numOfItems: number | null;
  getItems: () => Promise<void>;
  clearItemsData: () => void;
}

export const useGeneration = create<IGenerationState>((set) => ({
  loading: false,
  error: null,
  allItemsData: [],
  numOfItems: null,
  getItems: async () => {
    // console.log("start getItems");
    try {
      set({ loading: true, error: null });
      const data: getItems | null = await Generate.getGenerations();

      if (!data) {
        console.log("no data returned from API");
        set({ error: "No data returned from API", loading: false });
        return;
      }

      // In useGeneration.ts, after getting data from backend:
      const sortedData = data.data.sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateB - dateA; // Newest first
      });
      set({ allItemsData: sortedData, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },
  clearItemsData: () => {
    set({ allItemsData: [], numOfItems: null, error: null });
  },
}));
