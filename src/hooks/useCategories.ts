import { useQuery } from "@tanstack/react-query";
import { getTopCategories } from "@/api";
import type { Category } from "@/api/types";

/**
 * Hook to fetch top categories
 */
export const useTopCategories = () => {
  return useQuery<Category[], Error>({
    queryKey: ["topCategories"],
    queryFn: getTopCategories,
  });
};
