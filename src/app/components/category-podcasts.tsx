import Link from "next/link"
import { montserratBold } from "../../../fonts"
import { Podcast } from "@/api/types"
import { getTopPodcastsServer } from "@/api"
import PodcastCard from "./podcast-card"

// Category Section Component
const CategorySection = ({
  title,
  podcasts,
  colorClass = "bg-[#CC0001]"
}: {
  title: string,
  podcasts: Podcast[],
  colorClass?: string
}) => {
  return (
    <div className="w-full mx-auto gap-[25px] mt-[5.3125rem] overflow-x-hidden">
      <div className="flex items-center justify-between mb-[2.4375rem]">
        <h2 className="text-xl font-medium text-gray-700 flex items-center">
          <span className={`h-[16px] ${colorClass} w-[3px] mr-[5px]`}></span>
          <span className={`text-[#5A5A5A] ${montserratBold.className} text-[1.5rem]`}>
            {title}
          </span>
        </h2>
        <Link
          href="/"
          className="text-sm text-purple-600 flex items-center gap-1 rounded-full px-4 py-1 border border-purple-200 transition-all duration-300 hover:bg-purple-50 hover:shadow-sm"
        >
          View all <span className="text-xs">›</span>
        </Link>
      </div>

      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-[80px]">
          {podcasts.slice(0, 5).map((podcast) => (
            <PodcastCard key={`podcast-${podcast.id}`} podcast={podcast} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default async function CategoryPodcasts() {
  // Fetch podcasts with their category information
  const allPodcasts = await getTopPodcastsServer(1, 100); // Get a larger number to ensure we have enough for each category

  // Group podcasts by category_type
  const podcastsByCategory: Record<string, Podcast[]> = {};

  // Group podcasts by their category_type
  allPodcasts.forEach(podcast => {
    if (podcast.category_type) {
      if (!podcastsByCategory[podcast.category_type]) {
        podcastsByCategory[podcast.category_type] = [];
      }
      podcastsByCategory[podcast.category_type].push(podcast);
    }
  });

  // Define category colors (you can customize these)
  const categoryColors: Record<string, string> = {
    "EDUCATION": "bg-[#CC0001]",
    "ENTERTAINMENT": "bg-[#0088CC]",
    "NEWS": "bg-[#FF9900]",
    "SPORTS": "bg-[#00CC88]",
    "BUSINESS": "bg-[#9900CC]",
    "HEALTH & FITNESS": "bg-[#00CCAA]",
    "SOCIETY & CULTURE": "bg-[#CC8800]",
    "TECHNOLOGY": "bg-[#0066CC]",
    "MUSIC": "bg-[#CC0066]",
    "ARTS": "bg-[#66CC00]"
  };

  // Define the main categories to display individually
  // We'll prioritize these categories if they have podcasts
  const priorityCategories = [
    "EDUCATION",
    "ENTERTAINMENT",
    "NEWS",
    "SPORTS",
    "BUSINESS",
    "HEALTH & FITNESS",
    "SOCIETY & CULTURE",
    "TECHNOLOGY",
    "MUSIC"
  ];

  // Get the first 4 categories that actually have podcasts
  const mainCategories = priorityCategories
    .filter(category => podcastsByCategory[category] && podcastsByCategory[category].length > 0)
    .slice(0, 4);

  // Collect all other podcasts
  const otherPodcasts: Podcast[] = [];
  Object.keys(podcastsByCategory).forEach(categoryType => {
    if (!mainCategories.includes(categoryType)) {
      otherPodcasts.push(...podcastsByCategory[categoryType]);
    }
  });

  return (
    <>
      {/* Display main categories */}
      {mainCategories.map(categoryType => {
        const categoryPodcasts = podcastsByCategory[categoryType] || [];
        if (categoryPodcasts.length === 0) return null;

        return (
          <CategorySection
            key={`category-section-${categoryType}`}
            title={categoryType}
            podcasts={categoryPodcasts}
            colorClass={categoryColors[categoryType] || "bg-[#CC0001]"}
          />
        );
      })}

      {/* Display other podcasts */}
      {otherPodcasts.length > 0 && (
        <CategorySection
          key="category-section-other"
          title="Other Podcasts"
          podcasts={otherPodcasts}
          colorClass="bg-[#666666]"
        />
      )}
    </>
  );
}
