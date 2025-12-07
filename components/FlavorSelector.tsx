import { FlavorType, useFlavorStore } from "@/stores/useFlavorStore";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import * as Lucide from "lucide-react-native";
import { useFlavorSelectorStore } from "@/stores/useFlavorSelectorStore";
import { useEffect, useState } from "react";

const flavors = ["Shopping", "Technology", "Financial", "Social"] as const;

export default function FlavorSelector() {
  const { selectedFlavors, setSelectedFlavors } = useFlavorStore();
  const { isSelectorOpen } = useFlavorSelectorStore();
  const [localSelectedFlavors, setLocalSelectedFlavors] = useState<
    FlavorType[]
  >([]);

  useEffect(() => {
    if (isSelectorOpen) {
      setLocalSelectedFlavors(selectedFlavors);
    }
  }, [isSelectorOpen]);

  const toggleFlavor = (flavor: FlavorType) => {
    const selecteds = localSelectedFlavors;
    const newSelecteds = selecteds.includes(flavor)
      ? [...selecteds.filter((f) => f !== flavor)]
      : [...selecteds, flavor];

    newSelecteds.length && setLocalSelectedFlavors(newSelecteds);
  };

  useEffect(() => {
    !isSelectorOpen && setSelectedFlavors(localSelectedFlavors);
  }, [isSelectorOpen, localSelectedFlavors, setSelectedFlavors]);

  return isSelectorOpen ? (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ marginTop: 10, marginBottom: 10 }}
    >
      {flavors.map((s) => {
        const active = localSelectedFlavors.includes(s);
        return (
          <Pressable
            key={s}
            onPress={() => toggleFlavor(s)}
            style={[styles.badge, active && styles.badgeActive]}
          >
            <View
              style={{
                flexDirection: "row",
                gap: 5,
                alignItems: "center",
              }}
            >
              <View>
                <Text
                  style={[styles.badgeText, active && styles.badgeTextActive]}
                >
                  {s}
                </Text>
              </View>
              {active && <Lucide.Check size={20} color="#fff" />}
            </View>
          </Pressable>
        );
      })}
    </ScrollView>
  ) : (
    <></>
  );
}

const styles = StyleSheet.create({
  badge: {
    display: "flex",
    justifyContent: "center",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#A98DFF",
    marginRight: 8,
  },
  badgeActive: {
    backgroundColor: "#A98DFF",
  },
  badgeText: {
    color: "#A98DFF",
    fontWeight: "500",
  },
  badgeTextActive: {
    color: "#fff",
  },
});
