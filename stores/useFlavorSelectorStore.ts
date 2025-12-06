import { create } from "zustand";

interface FlavorSelectorStore {
  isSelectorOpen: boolean;
  toggleSelector: () => void;
}

export const useFlavorSelectorStore = create<FlavorSelectorStore>((set) => ({
  isSelectorOpen: false,
  toggleSelector: () =>
    set((state) => ({ isSelectorOpen: !state.isSelectorOpen })),
}));
