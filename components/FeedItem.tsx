import React, { memo, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Image,
  Share,
} from "react-native";
import { FeedItem as FeedItemType } from "../hooks/useRSS";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  LucideShare,
  LucideHeart,
  LucideExternalLink,
} from "lucide-react-native";

const FeedItem = memo(({ item }: { item: FeedItemType }) => {
  const handleOpenPost = () => {
    if (item.url) Linking.openURL(item.url);
  };

  const handleShare = async () => {
    if (!item.url) return;
    try {
      await Share.share({ message: item.url, url: item.url });
    } catch (err) {
      console.log(err);
    }
  };

  const handleFavorite = () => {
    // TODO: implement
  };

  const cleanSummary = useMemo(() => {
    if (!item.description) return "";

    let text = item.description.replace(/<[^>]*>?/gm, "").trim();
    text = text.replace(/\r\n/g, "\n").replace(/\n{2,}/g, "\n\n");

    const paragraphs = text.split("\n\n");
    let firstParagraph = paragraphs[0].trim();

    if (firstParagraph.length > 500) {
      firstParagraph = firstParagraph.slice(0, 500).trim() + "...";
    } else {
      firstParagraph = firstParagraph + "...";
    }

    return firstParagraph;
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

  const faviconUrl = useMemo(() => {
    try {
      const domain = new URL(item.url ?? "").hostname;
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
    } catch {
      return undefined;
    }
  }, [item.url]);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Image source={{ uri: faviconUrl }} style={styles.avatar} />

        <View style={{ flex: 1 }}>
          <Text style={styles.source}>{item.source}</Text>
          <Text style={styles.date}>{timeAgo}</Text>
        </View>
      </View>

      <Text style={styles.title}>{item.title}</Text>

      {!!cleanSummary && <Text style={styles.summary}>{cleanSummary}</Text>}

      {item.image && (
        <Image source={{ uri: item.image.url }} style={styles.postImage} />
      )}

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionBtn} onPress={handleOpenPost}>
          <LucideExternalLink size={22} color="#4b5563" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionBtn} onPress={handleFavorite}>
          <LucideHeart size={22} color="#ef4444" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionBtn} onPress={handleShare}>
          <LucideShare size={22} color="#4b5563" />
        </TouchableOpacity>
      </View>
    </View>
  );
});

FeedItem.displayName = "FeedItem";
export default FeedItem;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 16,
    marginBottom: 16,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(92, 92, 92, 0.24)",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 12,
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 10,
  },

  source: {
    fontSize: 14,
    color: "#111827",
    fontWeight: "700",
  },

  date: {
    fontSize: 12,
    color: "#6b7280",
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
    marginTop: 4,
    marginBottom: 8,
  },

  summary: {
    fontSize: 14,
    color: "#4b5563",
    lineHeight: 20,
    marginBottom: 12,
  },

  postImage: {
    width: "100%",
    height: 180,
    borderRadius: 16,
    marginBottom: 12,
    backgroundColor: "#f3f4f6",
  },

  actions: {
    flexDirection: "row",
    paddingTop: 8,
    gap: 12,
  },

  actionBtn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "rgba(92, 92, 92, 0.24)",
  },
});
