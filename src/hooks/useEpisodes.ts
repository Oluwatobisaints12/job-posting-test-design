import { useQuery } from "@tanstack/react-query";
import { getLatestEpisodes, getPodcastEpisodes } from "@/api";
import type { Episode } from "@/api/types";

/**
 * Hook to fetch latest episodes with pagination
 */
export const useLatestEpisodes = (page: number = 1, perPage: number = 15) => {
  return useQuery<Episode[], Error>({
    queryKey: ["latestEpisodes", page, perPage],
    queryFn: () => getLatestEpisodes(page, perPage),
    keepPreviousData: true,
  });
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
