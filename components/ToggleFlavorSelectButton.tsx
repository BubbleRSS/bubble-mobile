import React from "react";
import { Pressable } from "react-native";
import * as Lucide from "lucide-react-native";
import { useFlavorStore } from "@/stores/useFlavorStore";

export default function ToggleFlavorSelectButton() {
  const toggle = useFlavorStore((s) => s.toggleSelector);
  const isOpen = useFlavorStore((s) => s.isSelectorOpen);

  return (
    <Pressable onPress={toggle} style={{ padding: 10 }}>
      {isOpen ? (
        <Lucide.Check size={22} color="#5C5C5C" />
      ) : (
        <Lucide.ChevronDown size={22} color="#5C5C5C" />
      )}
    </Pressable>
  );
}
