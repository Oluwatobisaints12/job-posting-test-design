/**
 * Server-side API functions
 * These functions are meant to be used in server components
 */

import { Category, Podcast, Episode } from './types';

const BASE_URL = "https://api.wokpa.app/api/listeners";

/**
 * Fetch top podcasts for server components
 */
export async function getTopPodcasts(): Promise<Podcast[]> {
  try {
    const response = await fetch(`${BASE_URL}/top-podcasts?page=1&per_page=15`, {
      cache: "no-store",
    });

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
    const response = await fetch(`${BASE_URL}/top-categories`, {
      cache: "no-store",
    });

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
    const response = await fetch(`${BASE_URL}/episodes/latest?page=1&per_page=15`, {
      cache: "no-store",
    });

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
