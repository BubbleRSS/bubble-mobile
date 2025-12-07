import { useState, useEffect, useCallback, useRef } from "react";
import { parseFeed } from "@rowanmanning/feed-parser";
import { Feed, FeedImage } from "@rowanmanning/feed-parser/lib/feed/base";
import { useAsyncStorage } from "./useAsyncStorage";

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
  const { getData, storeData } = useAsyncStorage();
  const isFirstFetch = useRef(true);

  const fetchFeeds = useCallback(async () => {
    const cached = await getData("FEED_ITEMS");
    const cachedItems = cached ? (JSON.parse(cached) as FeedItem[]) : [];

    if (cachedItems && isFirstFetch.current) {
      setLoading(true);
      setAllItems(cachedItems);
      setVisibleItems(cachedItems.slice(0, PAGE_SIZE));
      setPage(1);
      setLoading(false);
      isFirstFetch.current = false;
    } else {
      try {
        setLoading(true);

        const promises = RSS_URLS.map(async (url) => {
          try {
            const response = await fetch(url);
            const xmlText = await response.text();

            const feed = parseFeed(xmlText) as Feed;

            return feed.items.map((item) => ({
              id: item.id || item.url || new Date().toISOString(),
              title: item.title || "No title",
              source: item.feed.title || "Feed Without Name",
              url: item.url,
              datePublished: item.published || new Date(),
              dateUpdated: item.updated,
              description: item.description || "No description",
              content: item.content,
              authors: item.authors?.map((a) => a.name),
              image: item.image,
            }));
          } catch {
            return [];
          }
        });

        const results = await Promise.all(promises);

        const fetchedItems = results
          .flat()
          .sort(
            (a, b) => b.datePublished.getTime() - a.datePublished.getTime(),
          );

        const cachedIds = new Set(cachedItems.map((i) => i.id));
        const allFeedItems = [
          ...cachedItems,
          ...fetchedItems.filter((i) => !cachedIds.has(i.id)),
        ];

        await storeData("FEED_ITEMS", JSON.stringify(allFeedItems));

        setAllItems(allFeedItems);
        setVisibleItems(allFeedItems.slice(0, PAGE_SIZE));
        setPage(1);
      } catch (err) {
        console.error("General error in useRSS hook:", err);
      } finally {
        setLoading(false);
      }
    }
  }, [storeData, getData]);

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
