// API Response Types
export interface Publisher {
  id: number;
  first_name: string;
  last_name: string;
  company_name: string;
  profile_image_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

export interface Podcast {
  id: number;
  user_id: number;
  title: string;
  author: string;
  category: Category;
  category_name: string | null;
  category_type: string;
  picture_url: string;
  cover_picture_url: string | null;
  description: string;
  embeddable_player_settings: any;
  created_at: string;
  updated_at: string;
  subscriber_count: number;
  episodes_count: number;
  publisher: Publisher;
}

export interface Episode {
  id: number;
  podcast_id: number;
  title: string;
  description: string;
  picture_url: string;
  audio_url: string;
  duration: number;
  published_at: string;
  created_at: string;
  updated_at: string;
}

// API Response Wrappers
export interface ApiResponse<T> {
  data: T;
  message: string;
  status: string;
}

export interface PaginatedApiResponse<T> {
  data: {
    data: T[];
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
  };
  message: string;
  status: string;
}
