import Image from "next/image"
import { Play, Share2, Bookmark } from "lucide-react"
import type { Podcast } from "../../../types/postcast"
import { montserratBold, montserratMedium, montserratSemiBold } from "../../../fonts"

interface PodcastCardProps {
  podcast: Podcast
}

export function PodcastCard({ podcast }: PodcastCardProps) {
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const month = date.toLocaleString("default", { month: "short" }).toUpperCase()
    const day = date.getDate()
    const year = date.getFullYear()
    return `${month} ${day}, ${year}`
  }

  return (
    <div className="flex flex-col w-full max-w-[231px]">
      <div className="relative mb-3 overflow-hidden rounded-lg">
        <Image
          src={podcast.picture_url || "/placeholder.svg?height=200&width=200"}
          alt={podcast.title}
          width={250}
          height={250}
          className="w-full aspect-square object-cover"
        />
      </div>

      <div className="flex flex-col">
        <h3 className={` text-[#282828] ${montserratBold.className} text-[1rem]`}>{podcast.title}</h3>
        <p className={` text-[#282828] ${montserratSemiBold.className} text-[14px] mt-[18px]`}>{podcast.category_type || "Uncategorized"}</p>
        <p className={` text-[#828282] ${montserratMedium.className} text-[13px]  mt-[5px]`}>{podcast.author}</p>
        <div className={` text-[#828282] ${montserratMedium.className} text-[13px]`}>
          <span className={` text-[#828282] ${montserratMedium.className} text-[13px] `}>{formatDate(podcast.created_at)}</span>
          <span className="mx-2">•</span>
          <span className={` text-[#828282] ${montserratMedium.className} text-[13px] `}>45 MINS</span>
        </div>

        <div className="flex items-center gap-2 mt-[12px]">
          <button className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full">
            <Play size={16} fill="white" />
          </button>
          <button className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full">
            <Share2 size={16} />
          </button>
          <button className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full">
            <Bookmark size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
