"use client"

import Image from "next/image"
import Link from "next/link"
import { useTopCategories } from "@/hooks/useCategories"
import { useTopPodcasts } from "@/hooks/usePodcasts"
import { Category } from "@/api/types"

// Define our extended category type with image_url
interface ExtendedCategory extends Category {
  image_url?: string;
}

// Define fallback categories in case API fails
const fallbackCategories: ExtendedCategory[] = [
  {
    id: 1,
    name: "News & Storytelling",
    slug: "news",
    created_at: "",
    updated_at: "",
    image_url: "/placeholder.svg?height=200&width=400&text=News",
  },
  {
    id: 2,
    name: "Entertainment & Lifestyle",
    slug: "entertainment",
    created_at: "",
    updated_at: "",
    image_url: "/placeholder.svg?height=200&width=400&text=Entertainment",
  },
  {
    id: 3,
    name: "Tech, Sport & Business",
    slug: "tech",
    created_at: "",
    updated_at: "",
    image_url: "/placeholder.svg?height=200&width=400&text=Tech",
  },
  {
    id: 4,
    name: "Other Podcasts",
    slug: "other",
    created_at: "",
    updated_at: "",
    image_url: "/placeholder.svg?height=200&width=400&text=Other",
  },
]

export function CategorySection() {
  // Fetch categories from API
  const { data: apiCategories = [], isLoading: categoriesLoading, isError: categoriesError } = useTopCategories()

  // Fetch top podcasts to get images for categories
  const { data: topPodcasts = [] } = useTopPodcasts(1, 20)

  // Use API categories if available, otherwise use fallback
  let categories = categoriesLoading || categoriesError || apiCategories.length === 0
    ? fallbackCategories
    : apiCategories as ExtendedCategory[]

  // Limit to 3 categories + "Other Podcasts"
  if (categories.length > 3) {
    // Take first 3 categories
    categories = categories.slice(0, 3);

    // Add "Other Podcasts" category
    const otherCategory: ExtendedCategory = {
      id: 999, // Use a unique ID
      name: "Other Podcasts",
      slug: "other",
      created_at: "",
      updated_at: "",
    };

    categories.push(otherCategory);
  }

  // Find images for categories from podcasts
  const categoriesWithImages = categories.map((category) => {
    // For "Other Podcasts" category, use a random podcast image from the collection
    if (category.name === "Other Podcasts" && topPodcasts.length > 0) {
      // Get a random index to make it more interesting
      const randomIndex = Math.floor(Math.random() * topPodcasts.length);
      return {
        ...category,
        image_url: topPodcasts[randomIndex]?.picture_url || `/placeholder.svg?height=200&width=400&text=${category.name}`,
      };
    }

    // For other categories, try to find matching podcasts by category_type
    const matchingPodcasts = topPodcasts.filter(podcast =>
      podcast.category_type === category.name ||
      podcast.category?.name === category.name
    );

    // If we found matching podcasts, use one of them
    if (matchingPodcasts.length > 0) {
      const randomIndex = Math.floor(Math.random() * matchingPodcasts.length);
      return {
        ...category,
        image_url: matchingPodcasts[randomIndex]?.picture_url || `/placeholder.svg?height=200&width=400&text=${category.name}`,
      };
    }

    // If no matching podcasts, use a random podcast image
    if (topPodcasts.length > 0) {
      const randomIndex = Math.floor(Math.random() * topPodcasts.length);
      return {
        ...category,
        image_url: topPodcasts[randomIndex]?.picture_url || `/placeholder.svg?height=200&width=400&text=${category.name}`,
      };
    }

    // Fallback to placeholder
    return {
      ...category,
      image_url: `/placeholder.svg?height=200&width=400&text=${category.name}`,
    };
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {categoriesWithImages.map((category) => (
        <Link
          key={category.id}
          href={`/category/${category.slug || category.id}`}
          className="relative overflow-hidden rounded-lg group hover:shadow-lg transition-all duration-300 hover:translate-y-[-5px]"
        >
          <div className="aspect-[4/3] relative">
            <Image
              src={category.image_url || "/default-image.jpg"}
              alt={category.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                // Fallback to a default image if the URL fails to load
                (e.target as HTMLImageElement).src = "/default-image.jpg";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex items-end p-4">
              <h3 className="text-white font-bold text-lg drop-shadow-md">{category.name}</h3>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
