import { GetAllItems } from "@/services/Api";
import { GeneratedItem, getItems } from "@/types/types";
import { create } from "zustand";

interface IZGetItems {
  loading: boolean;
  error: string | null;
  allItemsData: GeneratedItem[] | [];
  numOfItems: number | null;
  getAllItemsZustand: (token: string) => Promise<void>;
}

export const useGetAllItems = create<IZGetItems>((set) => ({
  loading: false,
  error: null,
  allItemsData: [],
  numOfItems: null,
  getAllItemsZustand: async (token: string) => {
    try {
      set({ loading: true, error: null });
      const data: getItems | null = await GetAllItems(token);
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
