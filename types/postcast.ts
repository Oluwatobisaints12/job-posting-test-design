export interface Publisher {
    id: number
    first_name: string
    last_name: string
    company_name: string
    profile_image_url: string | null
    created_at: string
    updated_at: string
  }
  
  export interface Podcast {
    id: number
    user_id: number
    title: string
    author: string
    category_name: string | null
    category_type: string
    picture_url: string
    cover_picture_url: string | null
    description: string
    embeddable_player_settings: any
    created_at: string
    updated_at: string
    subscriber_count: number
    publisher: Publisher
  }
  