import FeedItem from "@/components/FeedItem";
import FlavorSelector from "@/components/FlavorSelector";
import { useRSS } from "@/hooks/useRSS";
import {
  ActivityIndicator,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { items, loading, refresh, loadMore, hasMore } = useRSS();

  return (
    <View style={{ flex: 1, paddingHorizontal: 16 }}>
      <View>
        <FlavorSelector />
      </View>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#f3f4f6" />

        <View style={styles.titleContainer}>
          <Text style={styles.pageTitle}>Últimas Notícias</Text>
        </View>

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
          contentContainerStyle={styles.listContent}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  titleContainer: {
    padding: 16,
    backgroundColor: "#f3f4f6",
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#111827",
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
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
