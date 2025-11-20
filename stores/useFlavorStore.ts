import { create } from "zustand";

type Flavor = "Shopping" | "Technology" | "Financial" | "Social";

interface FlavorStore {
  isSelectorOpen: boolean;
  selectedFlavors: Flavor[];
  toggleSelector: () => void;
  toggleFlavor: (s: Flavor) => void;
}

export const useFlavorStore = create<FlavorStore>((set) => ({
  isSelectorOpen: false,
  selectedFlavors: ["Shopping"],
  toggleSelector: () =>
    set((state) => ({ isSelectorOpen: !state.isSelectorOpen })),
  toggleFlavor: (s) =>
    set((prev) => {
      const selecteds = prev.selectedFlavors;
      const newSelecteds = selecteds.includes(s)
        ? [...selecteds.filter((f) => f !== s)]
        : [...selecteds, s];

      return {
        ...prev,
        selectedFlavors: newSelecteds.length ? newSelecteds : selecteds,
      };
    }),
}));
