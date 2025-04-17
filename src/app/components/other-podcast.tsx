import Link from "next/link"
import CategoryCard from "./category-card"
import { montserratBold } from "../../../fonts"
import OtherCard from "./other-postcard-card"

async function getTopPodcasts() {
  try {
    const response = await fetch("https://api.wokpa.app/api/listeners/top-podcasts?page=1&per_page=15", {
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`)
    }

    const data = await response.json()
    return data?.data?.data || [] // Access the correct data structure
  } catch (error) {
    console.error("Error fetching top podcasts:", error)
    return []
  }
}

export default async function OtherPodcasts() {  // Renamed for clarity
  const otherPodcasts = await getTopPodcasts()

  return ( 
    <div className="w-full max-w-[1355px] mx-auto gap-[25px] mt-[5.3125rem] overflow-x-hidden">
      <div className="flex items-center justify-between mb-[2.4375rem]">
        <h2 className="text-xl font-medium text-gray-700 flex items-center">
          <span className="h-[16px] bg-[#CC0001] w-[3px] mr-[5px]"></span>
          <span className={`text-[#5A5A5A] ${montserratBold.className} text-[1.5rem]`}>
            Other Podcasts
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


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-[80px] overflow-x-hidden">
        {otherPodcasts.slice(0, 5).map((podcast: { id: string; category_type: string; picture_url: string }) => (
          <OtherCard 
            key={`podcast-${podcast.id}`} 
            category={{
                category_type: podcast.category_type,
              image_url: podcast.picture_url
            }} 
          />
        ))}
      </div>
    </div>
    </div>
  )
}
