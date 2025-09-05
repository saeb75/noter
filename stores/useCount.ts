import { create } from "zustand";
type TCounterStore = {
  count: number;
  inc: () => void;
  AsyncInc: () => Promise<void>;
  dec: () => void;
};
export const useCount = create<TCounterStore>((set) => ({
  count: 0,
  AsyncInc: async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    set((state) => ({ count: state.count + 1 }));
  },
  inc: () => {
    set((state) => ({ count: state.count + 1 }));
  },
  dec: () => {
    set((state) => ({ count: state.count - 1 }));
  },
}));
