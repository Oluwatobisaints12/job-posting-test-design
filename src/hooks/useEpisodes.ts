import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { Episode } from "@/api/types";
import { useEffect } from "react";

// Import directly from the specific modules to avoid conflicts
import { getLatestEpisodes } from "@/api/episodes";
import { getPodcastEpisodes } from "@/api/episodes";
import { getEpisodeById } from "@/api/episodes";

/**
 * Hook to fetch latest episodes with pagination
 */
export const useLatestEpisodes = (page: number = 1, perPage: number = 15) => {
  const queryClient = useQueryClient();

  // Main query with improved options
  const query = useQuery<Episode[], Error>({
    queryKey: ["latestEpisodes", page, perPage],
    queryFn: () => getLatestEpisodes(page, perPage),
    placeholderData: (previousData) => previousData, // Use this instead of keepPreviousData
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });

  // Prefetch next page
  useEffect(() => {
    // Prefetch the next page
    const nextPage = page + 1;
    queryClient.prefetchQuery({
      queryKey: ["latestEpisodes", nextPage, perPage],
      queryFn: () => getLatestEpisodes(nextPage, perPage),
      staleTime: 1000 * 60 * 5, // 5 minutes
    });

    // If we're not on the first page, make sure we have the previous page in cache
    if (page > 1) {
      const prevPage = page - 1;
      queryClient.prefetchQuery({
        queryKey: ["latestEpisodes", prevPage, perPage],
        queryFn: () => getLatestEpisodes(prevPage, perPage),
        staleTime: 1000 * 60 * 5, // 5 minutes
      });
    }
  }, [page, perPage, queryClient]);

  return query;
};

/**
 * Hook to fetch episodes for a specific podcast
 */
export const usePodcastEpisodes = (podcastId: string | null, page: number = 1, perPage: number = 15) => {
  return useQuery<Episode[], Error>({
    queryKey: ["podcastEpisodes", podcastId, page, perPage],
    queryFn: () => getPodcastEpisodes(podcastId as string, page, perPage),
    enabled: !!podcastId, // Only run the query if we have a podcast ID
  });
};

/**
 * Hook to fetch a single episode by ID
 */
export const useEpisodeDetails = (id: string | null) => {
  return useQuery<Episode, Error>({
    queryKey: ["episode", id],
    queryFn: () => getEpisodeById(id as string),
    enabled: !!id, // Only run the query if we have an ID
  });
};
