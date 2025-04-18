import axios from "axios";
import { PaginatedApiResponse, ApiResponse, Episode } from "./types";

const BASE_URL = "https://api.wokpa.app/api/listeners";

/**
 * Fetch latest episodes with pagination
 */
export const getLatestEpisodes = async (page: number = 1, perPage: number = 15): Promise<Episode[]> => {
  const { data } = await axios.get<PaginatedApiResponse<Episode>>(
    `${BASE_URL}/episodes/latest?page=${page}&per_page=${perPage}`
  );
  return data.data.data;
};

/**
 * Fetch episodes for a specific podcast
 */
export const getPodcastEpisodes = async (podcastId: string, page: number = 1, perPage: number = 15): Promise<Episode[]> => {
  const { data } = await axios.get<PaginatedApiResponse<Episode>>(
    `${BASE_URL}/podcasts/${podcastId}/episodes?page=${page}&per_page=${perPage}`
  );
  return data.data.data;
};

/**
 * Fetch a single episode by ID
 */
export const getEpisodeById = async (id: string): Promise<Episode> => {
  const { data } = await axios.get<ApiResponse<Episode>>(`${BASE_URL}/episodes/${id}`);
  return data.data;
};
