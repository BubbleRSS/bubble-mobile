import FlavorSelector from "@/components/FlavorSelector";
import { View } from "react-native";

export default function Index() {
  return (
    <View style={{ flex: 1, paddingHorizontal: 16 }}>
      <View>
        <FlavorSelector />
      </View>
    </View>
  );
}
