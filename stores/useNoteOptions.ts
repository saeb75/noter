import { create } from "zustand";

interface INoteOptionsState {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
}

export const useNoteOptions = create<INoteOptionsState>((set) => ({
  isVisible: false,
  setIsVisible: (isVisible: boolean) => set({ isVisible }),
}));
