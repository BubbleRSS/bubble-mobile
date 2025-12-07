import FlavorSelector from "@/components/FlavorSelector";
import { Text, View } from "react-native";
import { useFlavorStore } from "@/stores/useFlavorStore";
import { useEffect } from "react";
import { useAsyncStorage } from "@/hooks/useAsyncStorage";
import Feed from "@/components/Feed";

export default function Index() {
  const { selectedFlavors, setSelectedFlavors } = useFlavorStore();
  const { getData } = useAsyncStorage();

  useEffect(() => {
    const loadSelectedFlavors = async () => {
      const selected = await getData("SELECTED_FLAVORS");

      if (selected) {
        setSelectedFlavors(JSON.parse(selected) ?? []);
      }
    };

    loadSelectedFlavors();
  }, [getData, setSelectedFlavors]);

  return (
    <View style={{ flex: 1, paddingHorizontal: 16 }}>
      <View>
        <FlavorSelector />
        <Text>Selected: {selectedFlavors}</Text>
      </View>
      <Feed />
    </View>
  );
}
