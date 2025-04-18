import axios from "axios";
import { ApiResponse, PaginatedApiResponse, Podcast } from "./types";

const BASE_URL = "https://api.wokpa.app/api/listeners";

/**
 * Fetch top podcasts with pagination
 */
export const getTopPodcasts = async (page: number = 1, perPage: number = 15): Promise<Podcast[]> => {
  try {
    const { data } = await axios.get<PaginatedApiResponse<Podcast>>(
      `${BASE_URL}/top-podcasts?page=${page}&per_page=${perPage}`
    );
    return data.data.data;
  } catch (error) {
    console.error("Error fetching top podcasts:", error);
    return [];
  }
};

/**
 * Fetch podcast details by ID
 */
export const getPodcastById = async (id: string): Promise<Podcast> => {
  const { data } = await axios.get<ApiResponse<Podcast>>(`${BASE_URL}/podcasts/${id}`);
  return data.data;
};

/**
 * Fetch related podcasts (currently returns top podcasts as a substitute)
 */
export const getRelatedPodcasts = async (limit: number = 5): Promise<Podcast[]> => {
  const { data } = await axios.get<PaginatedApiResponse<Podcast>>(
    `${BASE_URL}/top-podcasts?page=1&per_page=${limit}`
  );
  return data.data.data;
};
