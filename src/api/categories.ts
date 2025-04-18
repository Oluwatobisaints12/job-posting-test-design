import axios from "axios";
import { ApiResponse, Category } from "./types";

const BASE_URL = "https://api.wokpa.app/api/listeners";

/**
 * Fetch top categories
 */
export const getTopCategories = async (): Promise<Category[]> => {
  const { data } = await axios.get<ApiResponse<Category[]>>(`${BASE_URL}/top-categories`);
  return data.data;
};
