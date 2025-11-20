import React, { memo, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import { FeedItem as FeedItemType } from "../hooks/useRSS";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

const FeedItem = memo(({ item }: { item: FeedItemType }) => {
  const handlePress = () => {
    if (item.url) Linking.openURL(item.url);
  };

  const cleanSummary = useMemo(() => {
    if (!item.description) return "";
    return (
      item.description
        .replace(/<[^>]*>?/gm, "")
        .trim()
        .slice(0, 150) + "..."
    );
  }, [item.description]);

  const timeAgo = useMemo(() => {
    try {
      return formatDistanceToNow(new Date(item.datePublished), {
        addSuffix: true,
        locale: ptBR,
      });
    } catch {
      return "";
    }
  }, [item.datePublished]);

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={styles.card}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <Text style={styles.source}>{item.source}</Text>
        <Text style={styles.date}>{timeAgo}</Text>
      </View>

      <Text style={styles.title}>{item.title}</Text>

      {!!cleanSummary && <Text style={styles.summary}>{cleanSummary}</Text>}
    </TouchableOpacity>
  );
});

FeedItem.displayName = "FeedItem";
export default FeedItem;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  source: {
    fontSize: 12,
    color: "#6366f1",
    fontWeight: "700",
    textTransform: "uppercase",
  },
  date: {
    fontSize: 12,
    color: "#9ca3af",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 6,
    lineHeight: 24,
  },
  summary: {
    fontSize: 14,
    color: "#4b5563",
    lineHeight: 20,
  },
});
