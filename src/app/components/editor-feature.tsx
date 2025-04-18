"use client"

import Image from "next/image"
import Link from "next/link"
import { Play } from "lucide-react"
import { Skeleton } from "./ui/skeleton"
import { montserratBold, montserratMedium, montserratSemiBold } from "../../../fonts"

// Import custom hook and types
import { useLatestEpisodes } from "@/hooks/useEpisodes"
import { Episode } from "@/api/types"

export default function PopularPodcasts() {
  // Use the custom hook to fetch latest episodes
  const { data: episodes, isLoading, isError, error } = useLatestEpisodes(1, 15)

  if (isLoading) {
    return <PodcastsLoadingSkeleton />
  }

  if (isError) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold text-red-500 mb-2">Error Loading Podcasts</h2>
        <p className="text-gray-600">{error instanceof Error ? error.message : 'An unknown error occurred'}</p>
        <p className="mt-4 text-sm text-gray-500">Please try again later or contact support if the issue persists.</p>
      </div>
    )
  }

  const podcasts = episodes?.slice(0, 3) || []

  return (
    <div className="bg-[#F6F6F6] w-full mt-[3.1875rem] justify-center mx-auto lg:py-[1.6875rem]">
     <div className="flex flex-col p-4">
        <h1 className={`text-[#282828] text-[1.5rem] ${montserratBold.className}`}>EDITOR'S PICK</h1>
        <h2 className={`text-[#5A5A5A] text-[1rem] mt-[6px] ${montserratSemiBold.className}`}>Featured Episodes</h2>
      </div>

      {podcasts.length === 0 ? (
        <p className="text-center text-gray-500 py-8">No podcasts found</p>
      ) : (
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-center justify-center">
          {podcasts.map((podcast, index) => {
            let cardStyle = '';

            if (index === 0) {
              cardStyle = 'text-white w-full max-w-[670px] h-auto lg:h-[561px] rounded-[3px] mb-6 lg:mb-0 lg:mr-[1.625rem]';
            } else if (index === 1 || index === 2) {
              cardStyle = 'text-black rounded-lg w-full max-w-[300px] mb-6 lg:mb-0 lg:mr-[1.125rem]';
            } else {
              cardStyle = 'bg-gray-100 rounded-md';
            }

            return (
              <div key={podcast.id} className={cardStyle}>
                <PodcastCard podcast={podcast} isFirst={index === 0} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  )
}

function PodcastCard({ podcast, isFirst = false }: { podcast: Episode; isFirst?: boolean }) {
  // Extract author name from podcast title or use a default
  const authorName = podcast.title.split(' - ')[0] || 'Unknown Author';

  return (
    <Link href={`/podcast/${podcast.podcast_id}/episode/${podcast.id}`} className="block transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg relative w-full" prefetch>
      <div className="bg-[#F6F6F6] relative rounded-lg transition-all duration-300 ease-in-out w-full">
        <div className={`relative ${isFirst ? "w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[561px]" : "aspect-square"}`}>
          <Image
            src={podcast.picture_url || "/placeholder.svg?height=300&width=300"}
            alt={podcast.title}
            fill
            sizes={isFirst ? "(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 670px" : "(max-width: 640px) 100vw, 300px"}
            className="object-cover transition-transform duration-500 ease-in-out hover:scale-105"
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAEtAJJXIDTjwAAAABJRU5ErkJggg=="
            onError={(e) => {
              // Fallback to a default image
              (e.target as HTMLImageElement).src = "/default-image.jpg";
            }}
          />
        </div>

        {/* Only show this for non-first items */}
        {!isFirst && (
          <div className="bg-white relative overflow-visible p-4">
            <div className="flex items-start">
              <div className="flex-grow"> {/* Removed right padding as button is now on the left */}
                <h3 className={`${montserratSemiBold.className} text-[1.125rem] text-[#282828] line-clamp-2`}>{podcast.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-1 mt-1">
                  {authorName}
                </p>

                <div className="mt-3 flex items-center text-xs text-gray-500 space-x-3">
                  <div className="flex flex-row items-center gap-2">
                    <span className={`${montserratMedium.className} text-[13px]`}>{formatDate(podcast.created_at)}</span>
                    <span className="text-xs">•</span>
                    <span className={`${montserratMedium.className} text-[13px]`}>{formatDuration(podcast.duration)}</span>
                  </div>
                </div>
              </div>

              {/* Play button positioned to the left of the card, extending outward */}
              <div className="absolute left-[-15px] top-[20px]">
                <button className="bg-[#CC0001] rounded-full p-3 transform hover:scale-110 transition-all duration-300 ease-in-out hover:bg-[#E50001] shadow-lg">
                  <Play className="h-5 w-5 text-white" fill="white" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* For first item, overlay text on image with play button to the left of title */}
        {isFirst && (
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black to-transparent text-white">
            <div className="flex items-center">
              <button className="bg-[#CC0001] rounded-full p-2 sm:p-3 transform hover:scale-110 transition-all duration-300 ease-in-out hover:bg-[#E50001] shadow-lg mr-3 sm:mr-4">
                <Play className="h-4 w-4 sm:h-6 sm:w-6 text-white" fill="white" />
              </button>
              <h3 className={`${montserratBold.className} text-lg sm:text-2xl mb-1 sm:mb-2 line-clamp-2 flex-grow`}>{podcast.title}</h3>
            </div>
            <p className="text-xs sm:text-sm text-gray-200 line-clamp-1 mb-1 sm:mb-2">
              {authorName}
            </p>
            <div className="flex items-center text-[10px] sm:text-xs text-gray-300 space-x-2 sm:space-x-3">
              <span>{formatDate(podcast.created_at)}</span>
              <span>•</span>
              <span>{formatDuration(podcast.duration)}</span>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}

function PodcastsLoadingSkeleton() {
  return (
    <div className="bg-[#F6F6F6] w-full mt-[3.1875rem] justify-center mx-auto lg:py-[1.6875rem]">
      <div className="flex flex-col p-4">
        <Skeleton className="h-8 w-64 mb-2" />
        <Skeleton className="h-6 w-48" />
      </div>
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-center justify-center">
        {/* First large skeleton */}
        <div className="w-full max-w-[670px] mb-6 lg:mb-0">
          <Skeleton className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[561px] rounded-lg" />
        </div>

        {/* Two smaller skeletons */}
        <div className="flex flex-col sm:flex-row lg:flex-col gap-4">
          {Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden w-full max-w-[300px]">
              <Skeleton className="aspect-square w-full" />
              <div className="p-4">
                <Skeleton className="h-5 w-full mb-2" />
                <Skeleton className="h-4 w-3/4 mb-3" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Helper to format numbers
function formatDate(dateString: string) {
  if (!dateString || dateString === '0') {
    return 'Unknown date';
  }
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short', // e.g., Apr
      day: 'numeric',
    });
  } catch (error) {
    return 'Unknown date';
  }
}
function formatDuration(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours > 0) {
    return `${hours} hr${hours > 1 ? 's' : ''} ${remainingMinutes} min`;
  }

  return `${minutes} min`;
}

