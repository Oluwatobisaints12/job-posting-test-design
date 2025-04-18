import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { Podcast } from "@/api/types";
import { useEffect } from "react";

// Import directly from the specific module
import { getTrendingPodcasts } from "@/api/trending";

/**
 * Hook to fetch trending podcasts with pagination
 */
export const useTrendingPodcasts = (page: number = 1, perPage: number = 15) => {
  const queryClient = useQueryClient();

  // Main query with improved options
  const queryResult = useQuery<Podcast[], Error>({
    queryKey: ["trendingPodcasts", page, perPage],
    queryFn: () => getTrendingPodcasts(page, perPage),
    placeholderData: (previousData) => previousData, // Use this instead of keepPreviousData
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });

  // Prefetch next page
  useEffect(() => {
    // Prefetch the next page
    const nextPage = page + 1;
    queryClient.prefetchQuery({
      queryKey: ["trendingPodcasts", nextPage, perPage],
      queryFn: () => getTrendingPodcasts(nextPage, perPage),
      staleTime: 1000 * 60 * 5, // 5 minutes
    });

    // If we're not on the first page, make sure we have the previous page in cache
    if (page > 1) {
      const prevPage = page - 1;
      queryClient.prefetchQuery({
        queryKey: ["trendingPodcasts", prevPage, perPage],
        queryFn: () => getTrendingPodcasts(prevPage, perPage),
        staleTime: 1000 * 60 * 5, // 5 minutes
      });
    }
  }, [page, perPage, queryClient]);

  return queryResult;
};
