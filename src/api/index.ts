// Export all API functions
export * from './podcasts';
export * from './episodes';
export * from './categories';
export * from './types';
export * from './trending';
export * from './search';

// Export server functions with explicit naming to avoid conflicts
import {
  getTopPodcasts as getTopPodcastsServer,
  getTopCategories as getTopCategoriesServer,
  getLatestEpisodes as getLatestEpisodesServer,
  getTrendingPodcasts as getTrendingPodcastsServer,
  getEpisodeById as getEpisodeByIdServer,
  searchPodcasts as searchPodcastsServer
} from './server';

export {
  getTopPodcastsServer,
  getTopCategoriesServer,
  getLatestEpisodesServer,
  getTrendingPodcastsServer,
  getEpisodeByIdServer,
  searchPodcastsServer
};
