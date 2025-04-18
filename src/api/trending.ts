import axios from "axios";
import { PaginatedApiResponse, Podcast } from "./types";

const BASE_URL = "https://api.wokpa.app/api/listeners";

/**
 * Fetch popular and trending podcasts with pagination
 */
export const getTrendingPodcasts = async (page: number = 1, perPage: number = 15): Promise<Podcast[]> => {
  const { data } = await axios.get<PaginatedApiResponse<Podcast>>(
    `${BASE_URL}/popular-and-trending-podcasts?page=${page}&per_page=${perPage}`
  );
  return data.data.data;
};
