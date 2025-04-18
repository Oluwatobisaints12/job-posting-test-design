import Link from "next/link"
import CategoryCard from "./category-card"
import { montserratBold } from "../../../fonts"

// Import server API function
import { getTopCategories } from "@/api"
import { getTopPodcastsServer } from "@/api"

export default async function NewsAndStorytelling() {
  const categories = await getTopCategories()
  const podcasts = await getTopPodcastsServer(1, 20)

  // Create extended categories with image_url from podcasts
  const categoriesWithImages = categories.slice(0, 5).map(category => {
    // Find a podcast that matches this category to use its image
    const matchingPodcast = podcasts.find(podcast =>
      podcast.category_name === category.name ||
      podcast.category_type === category.name
    )

    return {
      ...category,
      image_url: matchingPodcast?.picture_url || `/placeholder.svg?height=200&width=400&text=${category.name}`
    }
  })

  return (
    <div className="w-full mx-auto gap-[25px] mt-[5.3125rem] overflow-x-hidden">
      <div className="flex items-center justify-between mb-[2.4375rem]">

        <h2 className="text-xl font-medium text-gray-700 flex items-center">
          <span className="h-[16px] bg-[#CC0001] w-[3px] mr-[5px]"></span>
          <span className={`text-[#5A5A5A] ${montserratBold.className} text-[1.5rem]`}>
            Educational
          </span>
        </h2>
        <Link
          href="#"
          className="text-sm text-purple-600 flex items-center gap-1 rounded-full px-4 py-1 border border-purple-200"
        >
          View all <span className="text-xs">›</span>
        </Link>
      </div>

  <div className="flex justify-center">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-[80px]">
      {categoriesWithImages.map((category) => (
  <CategoryCard key={`category-${category.name}`} category={category} />
))}
      </div>
  </div>
    </div>
  )
}
