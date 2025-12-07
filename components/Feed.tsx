import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import FeedItem from "@/components/FeedItem";
import { useRSS } from "@/hooks/useRSS";

export default function Feed() {
  const { items, loading, refresh, loadMore, hasMore } = useRSS();

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <FeedItem item={item} />}
      refreshing={loading}
      onRefresh={refresh}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={() => (
        <View style={styles.footer}>
          {hasMore ? (
            <ActivityIndicator size="small" color="#6366f1" />
          ) : (
            !loading &&
            items.length > 0 && (
              <Text style={styles.endText}>Você chegou ao fim!</Text>
            )
          )}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  footer: {
    paddingVertical: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  endText: {
    color: "#9ca3af",
    fontSize: 12,
    fontWeight: "500",
  },
});
