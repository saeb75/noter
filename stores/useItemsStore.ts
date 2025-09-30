import { Generate } from "@/services/generateApi";
import { GeneratedItem, getItems } from "@/types/types";
import { create } from "zustand";

interface ItemsState {
  loading: boolean;
  error: string | null;
  allItemsData: GeneratedItem[] | [];
  numOfItems: number | null;
  getAllItemsZustand: () => Promise<void>;
}

export const useItemsStore = create<ItemsState>((set) => ({
  loading: false,
  error: null,
  allItemsData: [],
  numOfItems: null,
  getAllItemsZustand: async () => {
    try {
      set({ loading: true, error: null });
      const data: getItems | null = await Generate.getGenerations();
      if (!data) {
        set({ error: "No data returned from API", loading: false });
        return;
      }
      set({
        allItemsData: data.data,
        numOfItems: data.meta.total,
        loading: false,
      });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },
}));
