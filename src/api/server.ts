/**
 * Server-side API functions
 * These functions are meant to be used in server components
 */

import { Category, Podcast, Episode } from './types';

const BASE_URL = "https://api.wokpa.app/api/listeners";

// Common fetch options with revalidation
const fetchOptions = {
  next: { revalidate: 3600 } // Revalidate every hour
};

/**
 * Fetch top podcasts for server components
 */
export async function getTopPodcasts(page: number = 1, perPage: number = 15): Promise<Podcast[]> {
  try {
    const response = await fetch(`${BASE_URL}/top-podcasts?page=${page}&per_page=${perPage}`, fetchOptions);

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const data = await response.json();
    return data?.data?.data || [];
  } catch (error) {
    console.error("Error fetching top podcasts:", error);
    return [];
  }
}

/**
 * Fetch top categories for server components
 */
export async function getTopCategories(): Promise<Category[]> {
  try {
    const response = await fetch(`${BASE_URL}/top-categories`, fetchOptions);

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const data = await response.json();
    return data?.data || [];
  } catch (error) {
    console.error("Error fetching top categories:", error);
    return [];
  }
}

/**
 * Fetch latest episodes for server components
 */
export async function getLatestEpisodes(): Promise<Episode[]> {
  try {
    const response = await fetch(`${BASE_URL}/episodes/latest?page=1&per_page=15`, fetchOptions);

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const data = await response.json();
    return data?.data?.data || [];
  } catch (error) {
    console.error("Error fetching latest episodes:", error);
    return [];
  }
}

/**
 * Fetch trending podcasts for server components
 */
export async function getTrendingPodcasts(): Promise<Podcast[]> {
  try {
    const response = await fetch(`${BASE_URL}/popular-and-trending-podcasts?page=1&per_page=15`, fetchOptions);

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const data = await response.json();
    return data?.data?.data || [];
  } catch (error) {
    console.error("Error fetching trending podcasts:", error);
    return [];
  }
}

/**
 * Fetch a single episode by ID for server components
 */
export async function getEpisodeById(id: string): Promise<Episode | null> {
  try {
    const response = await fetch(`${BASE_URL}/episodes/${id}`, fetchOptions);

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const data = await response.json();
    return data?.data || null;
  } catch (error) {
    console.error(`Error fetching episode ${id}:`, error);
    return null;
  }
}

/**
 * Search podcasts for server components
 */
export async function searchPodcasts(query: string): Promise<Podcast[]> {
  try {
    const response = await fetch(`${BASE_URL}/podcast-search?q=${encodeURIComponent(query)}&page=1&per_page=15`, {
      ...fetchOptions,
      next: { revalidate: 300 } // Revalidate search results more frequently (5 minutes)
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const data = await response.json();
    return data?.data?.data || [];
  } catch (error) {
    console.error("Error searching podcasts:", error);
    return [];
  }
}
