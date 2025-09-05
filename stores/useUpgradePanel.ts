import { create } from "zustand";

type TUpgradePanel = {
  upgradePanel: boolean;
  togle: () => void;
};

export const useUpgradePanel = create<TUpgradePanel>((set) => ({
  upgradePanel: false,
  togle: () => {
    set((state) => ({ upgradePanel: !state.upgradePanel }));
  },
}));
