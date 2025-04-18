"use client"

import Image from "next/image"
import Link from "next/link"
import { Play } from "lucide-react"
import { montserratBold, montserratMedium, montserratSemiBold } from "../../../fonts"
import { Episode } from "@/api/types"

interface EpisodeCardProps {
  episode: Episode
  podcastId: string
}

export function EpisodeCard({ episode, podcastId }: EpisodeCardProps) {
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const month = date.toLocaleString("default", { month: "short" }).toUpperCase()
    const day = date.getDate()
    const year = date.getFullYear()
    return `${month} ${day}, ${year}`
  }

  // Format duration for display
  const formatDuration = (seconds: number) => {
    if (!seconds) return "-- MINS"
    const minutes = Math.floor(seconds / 60)
    return `${minutes} MINS`
  }

  return (
    <Link href={`/podcast/${podcastId}/episode/${episode.id}`} className="block transition-all duration-300 hover:translate-y-[-5px] relative w-[300px]">
      <div className="bg-[#F6F6F6] relative rounded-lg h-full flex flex-col">
        <div className="relative w-full" style={{ height: '200px' }}>
          <Image
            src={episode.picture_url || "/placeholder.svg?height=300&width=300"}
            alt={episode.title}
            fill
            className="object-cover transition-transform duration-500 ease-in-out hover:scale-105"
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAEtAJJXIDTjwAAAABJRU5ErkJggg=="
          />
        </div>

        <div className="bg-white relative overflow-visible flex-1">
          <div className="flex items-start h-full">
            <div className="flex-grow p-4 flex flex-col"> {/* Added padding here instead of parent */}
              <h3 className={`${montserratSemiBold.className} text-[1.125rem] text-[#282828] line-clamp-2`}>{episode.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-1 mt-1">
                {episode.description?.substring(0, 60) || "No description available"}
              </p>

              <div className="mt-auto pt-3 flex items-center text-xs text-gray-500 space-x-3">
                <div className="flex flex-row items-center gap-2">
                  <span className={`${montserratMedium.className} text-[13px]`}>{formatDate(episode.created_at)}</span>
                  <span className="text-xs">•</span>
                  <span className={`${montserratMedium.className} text-[13px]`}>{formatDuration(episode.duration)}</span>
                </div>
              </div>
            </div>

            {/* Play button positioned to the left of the card, extending outward */}
            <div className="absolute left-[-15px] top-[20px]">
              <button className="bg-[#CC0001] rounded-full p-3 transform hover:scale-110 transition-transform shadow-lg">
                <Play className="h-5 w-5 text-white" fill="white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
