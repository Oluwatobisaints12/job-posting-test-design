import { useQuery } from "@tanstack/react-query";
import { getTopPodcasts, getPodcastById, getRelatedPodcasts } from "@/api";
import type { Podcast } from "@/api/types";

/**
 * Hook to fetch top podcasts with pagination
 */
export const useTopPodcasts = (page: number = 1, perPage: number = 15) => {
  return useQuery<Podcast[], Error>({
    queryKey: ["topPodcasts", page, perPage],
    queryFn: () => getTopPodcasts(page, perPage),
    keepPreviousData: true,
  });
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
