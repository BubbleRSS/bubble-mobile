import React from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import * as Lucide from "lucide-react-native";

const ICONS: Record<
  string,
  React.ComponentType<{ size: number; color: string }>
> = {
  index: Lucide.Home,
  flavors: Lucide.CupSoda,
  favorites: Lucide.Heart,
  settings: Lucide.Settings,
};

export default function TabBar({ state, navigation }: BottomTabBarProps) {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const Icon = ICONS[route.name];

        return (
          <Pressable
            key={route.key}
            onPress={() => navigation.navigate(route.name)}
            style={[styles.tab, isFocused && styles.activeTab]}
          >
            <Icon size={24} color={isFocused ? "#fff" : "#5C5C5C"} />
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    flexDirection: "row",
    padding: 12,
    marginHorizontal: 30,
    bottom: 10,
    borderRadius: 40,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "rgba(92, 92, 92, 0.24)",
    justifyContent: "space-between",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 40,
  },
  activeTab: {
    backgroundColor: "#FAB34D",
  },
});
