import axios from "axios";
import { PaginatedApiResponse, Podcast } from "./types";

const BASE_URL = "https://api.wokpa.app/api/listeners";

/**
 * Search podcasts with pagination
 */
export const searchPodcasts = async (query: string, page: number = 1, perPage: number = 15): Promise<Podcast[]> => {
  const { data } = await axios.get<PaginatedApiResponse<Podcast>>(
    `${BASE_URL}/podcast-search?q=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}`
  );
  return data.data.data;
};
