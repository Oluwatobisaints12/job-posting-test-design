import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { Podcast } from "@/api/types";
import { useEffect } from "react";

// Import directly from the specific module
import { searchPodcasts } from "@/api/search";

/**
 * Hook to search podcasts with pagination
 */
export const useSearchPodcasts = (query: string, page: number = 1, perPage: number = 15) => {
  const queryClient = useQueryClient();

  // Main query with improved options
  const queryResult = useQuery<Podcast[], Error>({
    queryKey: ["searchPodcasts", query, page, perPage],
    queryFn: () => searchPodcasts(query, page, perPage),
    placeholderData: (previousData) => previousData, // Use this instead of keepPreviousData
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
    enabled: !!query, // Only run the query if we have a search query
  });

  // Prefetch next page
  useEffect(() => {
    if (!query) return;

    // Prefetch the next page
    const nextPage = page + 1;
    queryClient.prefetchQuery({
      queryKey: ["searchPodcasts", query, nextPage, perPage],
      queryFn: () => searchPodcasts(query, nextPage, perPage),
      staleTime: 1000 * 60 * 5, // 5 minutes
    });

    // If we're not on the first page, make sure we have the previous page in cache
    if (page > 1) {
      const prevPage = page - 1;
      queryClient.prefetchQuery({
        queryKey: ["searchPodcasts", query, prevPage, perPage],
        queryFn: () => searchPodcasts(query, prevPage, perPage),
        staleTime: 1000 * 60 * 5, // 5 minutes
      });
    }
  }, [query, page, perPage, queryClient]);

  return queryResult;
};
