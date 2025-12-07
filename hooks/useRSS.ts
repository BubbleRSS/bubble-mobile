import { useState, useEffect, useCallback } from "react";
import { parseFeed } from "@rowanmanning/feed-parser";
import { Feed, FeedImage } from "@rowanmanning/feed-parser/lib/feed/base";

const RSS_URLS = [
  "https://dev.to/feed",
  "https://g1.globo.com/dynamo/tecnologia/rss2.xml",
  "https://diolinux.com.br/rss",
];

const PAGE_SIZE = 15;

export interface FeedItem {
  id: string;
  title: string;
  source: string;
  url: string | null;
  datePublished: Date;
  dateUpdated: Date | null;
  description: string;
  content: string | null;
  authors: (string | null)[];
  image: FeedImage | null;
}

export function useRSS() {
  const [allItems, setAllItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleItems, setVisibleItems] = useState<FeedItem[]>([]);
  const [page, setPage] = useState(1);

  const fetchFeeds = useCallback(async () => {
    try {
      setLoading(true);
      const promises = RSS_URLS.map(async (url) => {
        try {
          const response = await fetch(url);
          const xmlText = await response.text();

          const feed = parseFeed(xmlText) as Feed;
          const items: FeedItem[] = [];

          feed.items.forEach((item) => {
            items.push({
              id: item.id || item.url || new Date().toISOString(),
              title: item.title || "Sem título",
              source: item.feed.title || "Feed Sem Nome",
              url: item.url,
              datePublished: item.published || new Date(),
              dateUpdated: item.updated,
              description: item.description || "Sem descrição",
              content: item.content,
              authors: item.authors?.map((a) => a.name),
              image: item.image,
            });
          });

          return items;
        } catch (err) {
          console.warn(`Falha ao carregar feed: ${url}`, err);
          return [];
        } finally {
          setLoading(false);
        }
      });

      const results = await Promise.all(promises);
      const mergedItems = results.flat();

      const sortedItems = mergedItems.sort(
        (a, b) => b.datePublished.getTime() - a.datePublished.getTime(),
      );

      setAllItems(sortedItems);

      setVisibleItems(sortedItems.slice(0, PAGE_SIZE));
      setPage(1);
    } catch (error) {
      console.error("Erro geral no hook useRSS:", error);
    }
  }, []);

  const loadMore = () => {
    if (visibleItems.length >= allItems.length) return;

    const nextPage = page + 1;
    const nextSlice = allItems.slice(0, nextPage * PAGE_SIZE);

    setVisibleItems(nextSlice);
    setPage(nextPage);
  };

  useEffect(() => {
    fetchFeeds();
  }, [fetchFeeds]);

  return {
    items: visibleItems,
    loading,
    refresh: fetchFeeds,
    loadMore,
    hasMore: visibleItems.length < allItems.length,
  };
}
