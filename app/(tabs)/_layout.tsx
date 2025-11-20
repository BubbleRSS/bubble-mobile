import Header from "@/components/Header";
import TabBar from "@/components/TabBar";
import ToggleFlavorSelectButton from "@/components/ToggleFlavorSelectButton";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShadowVisible: false,
        tabBarShowLabel: false,
        sceneStyle: {
          backgroundColor: "transparent",
        },
        headerTitleStyle: {
          fontSize: 24,
        },
        header: (props) => <Header {...props} />,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Bubble",
          header: (props) => (
            <Header {...props} actionButton={<ToggleFlavorSelectButton />} />
          ),
        }}
      />
      <Tabs.Screen name="flavors" options={{ title: "Flavors" }} />
      <Tabs.Screen name="favorites" options={{ title: "Favorites" }} />
      <Tabs.Screen name="settings" options={{ title: "Settings" }} />
    </Tabs>
  );
}
