import { useFlavorStore } from "@/stores/useFlavorStore";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import * as Lucide from "lucide-react-native";

const flavors = ["Shopping", "Technology", "Financial", "Social"] as const;

export default function FlavorSelector() {
  const { isSelectorOpen, selectedFlavors, toggleFlavor } = useFlavorStore();

  return isSelectorOpen ? (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ marginTop: 10, marginBottom: 10 }}
    >
      {flavors.map((s) => {
        const active = selectedFlavors.includes(s);
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
              }}
            >
              <Text
                style={[styles.badgeText, active && styles.badgeTextActive]}
              >
                {s}
              </Text>
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
