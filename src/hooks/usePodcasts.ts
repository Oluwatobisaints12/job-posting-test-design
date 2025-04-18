import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { Podcast } from "@/api/types";
import { useEffect } from "react";

// Import directly from the specific module
import { getTopPodcasts, getPodcastById, getRelatedPodcasts } from "@/api/podcasts";

/**
 * Hook to fetch top podcasts with pagination
 */
export const useTopPodcasts = (page: number = 1, perPage: number = 15) => {
  const queryClient = useQueryClient();

  // Main query with improved options
  const query = useQuery<Podcast[], Error>({
    queryKey: ["topPodcasts", page, perPage],
    queryFn: () => getTopPodcasts(page, perPage),
    placeholderData: (previousData) => previousData, // Use this instead of keepPreviousData
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });

  // Prefetch next page
  useEffect(() => {
    // Prefetch the next page
    const nextPage = page + 1;
    queryClient.prefetchQuery({
      queryKey: ["topPodcasts", nextPage, perPage],
      queryFn: () => getTopPodcasts(nextPage, perPage),
      staleTime: 1000 * 60 * 5, // 5 minutes
    });

    // If we're not on the first page, make sure we have the previous page in cache
    if (page > 1) {
      const prevPage = page - 1;
      queryClient.prefetchQuery({
        queryKey: ["topPodcasts", prevPage, perPage],
        queryFn: () => getTopPodcasts(prevPage, perPage),
        staleTime: 1000 * 60 * 5, // 5 minutes
      });
    }
  }, [page, perPage, queryClient]);

  return query;
};

/**
 * Hook to fetch podcast details by ID
 */
export const usePodcastDetails = (id: string | null) => {
  return useQuery<Podcast, Error>({
    queryKey: ["podcast", id],
    queryFn: () => getPodcastById(id as string),
    enabled: !!id, // Only run the query if we have an ID
  });
};

/**
 * Hook to fetch related podcasts
 */
export const useRelatedPodcasts = (limit: number = 5) => {
  return useQuery<Podcast[], Error>({
    queryKey: ["relatedPodcasts", limit],
    queryFn: () => getRelatedPodcasts(limit),
  });
};
