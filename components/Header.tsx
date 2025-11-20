import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View } from "react-native";

type HeaderProps = {
  actionButton?: React.JSX.Element;
} & BottomTabHeaderProps;

export default function Header({ options, actionButton }: HeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{options.title}</Text>

      {actionButton ? actionButton : <></>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: 50,
    paddingBottom: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "semibold",
  },
});
