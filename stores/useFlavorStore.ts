import { create } from "zustand";

export type FlavorType = "Shopping" | "Technology" | "Financial" | "Social";

interface FlavorStore {
  selectedFlavors: FlavorType[];
  setSelectedFlavors: (s: FlavorType[]) => void;
}

export const useFlavorStore = create<FlavorStore>((set) => ({
  selectedFlavors: ["Shopping"],
  setSelectedFlavors: (s) =>
    set((prev) => ({
      ...prev,
      selectedFlavors: s,
    })),
}));
