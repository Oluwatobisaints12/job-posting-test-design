"use client"

import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import { Play, Clock, Headphones } from "lucide-react"
import { Skeleton } from "./ui/skeleton"
import { montserratBold, montserratMedium, montserratSemiBold } from "../../../fonts"

// Corrected Podcast interface based on API response
interface Podcast {
  created_at: number
  id: number
  title: string
  description: string
  picture_url: string
  cover_picture_url: string
  total_plays: number
  total_episodes: number
  duration: string
  category_name: string
  publisher: {
    id: number
    first_name: string
    last_name: string
    company_name: string
    profile_image_url: string
  }
}

interface PodcastsResponse {
  data: {
    data: Podcast[]
  }
  message: string
}

// Fetch podcasts from API
const fetchPodcasts = async (): Promise<PodcastsResponse> => {
  const response = await fetch("https://api.wokpa.app/api/listeners/episodes/latest?page=1&per_page=15")

  if (!response.ok) {
    throw new Error("Failed to fetch podcasts")
  }

  return response.json()
}

export default function PopularPodcasts() {
  const { data, isLoading, error } = useQuery<PodcastsResponse, Error>({
    queryKey: ["popularPodcasts"],
    queryFn: fetchPodcasts,
  })

  if (isLoading) {
    return <PodcastsLoadingSkeleton />
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold text-red-500 mb-2">Error Loading Podcasts</h2>
        <p className="text-gray-600">{error.message}</p>
        <p className="mt-4 text-sm text-gray-500">Please try again later or contact support if the issue persists.</p>
      </div>
    )
  }

  const podcasts = data?.data?.data.slice(0, 3) || []

  return (
    <div className="bg-[#F6F6F6] container mt-[3.1875rem] justify-center mx-auto lg:w-full lg:max-w-[1355px] lg:py-[1.6875rem] ">
     <div className="flex flex-col p-4">
        <h1 className={`text-[#282828] text-[1.5rem] ${montserratBold.className}`}>EDITOR'S PICK</h1>
        <h2 className={`text-[#5A5A5A] text-[1rem] mt-[6px] ${montserratSemiBold.className}`}>Featured Episodes</h2>
      </div>

      {podcasts.length === 0 ? (
        <p className="text-center text-gray-500 py-8">No podcasts found</p>
      ) : (
        <div className="flex flex-col lg:flex lg:flex-row ">
  {podcasts.map((podcast, index) => {
  let cardStyle = '';

  if (index === 0) {
    cardStyle = ' text-white  w-[670px] h-[561px]  rounded-[3px] mr-[1.625rem]';
  } else if (index === 1 || index === 2) {
    cardStyle = 'text-black  rounded-lg w-[300px] mr-[1.125rem]';
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

function PodcastCard({ podcast, isFirst = false }: { podcast: Podcast; isFirst?: boolean }) {
  return (
    <div className=" bg-[#F6F6F6]">
      
      <div         className={`relative ${isFirst ? "w-[670px] h-[561px]" : "aspect-square"} `}
      >
        <Image
          src={podcast.picture_url || "/placeholder.svg?height=300&width=300"}
          alt={podcast.title}
          fill
          className="object-cover"
        />
        <div className="a">
          <button className="bg-white rounded-full p-3 transform hover:scale-110 transition-transform">
            <Play className="h-6 w-6 text-black" />
          </button>
        </div>
      </div>
  
      {/* Only show this for non-first items */}
      {!isFirst && (
        <div className="bg-white p-[1rem]">
          <h3 className={`${montserratSemiBold.className} text-[1.125rem] text-[#282828]`}>{podcast.title}</h3>
          <p className="text-sm text-gray-600 line-clamp-1 mt-1">
            {podcast?.publisher?.first_name} {podcast?.publisher?.last_name}
          </p>
  
          <div className="mt-3 flex items-center text-xs text-gray-500 space-x-3">
            <div className="flex flex-row items-center">
              <span className={`${montserratMedium.className} text-[13px]`}>{formatDate(podcast.created_at || 0)}</span>
              
            <span className={`${montserratMedium.className} text-[13px]`}>{formatDuration(podcast.duration)}</span>
            </div>
           
           
        
          </div>
  
          {/* <div className="mt-3">
            <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-xs font-semibold text-gray-700">
              {podcast.category_name || "Podcast"}
            </span>
          </div> */}
        </div>
      )}
    </div>
  );
  
}

function PodcastsLoadingSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Skeleton className="h-8 w-64 mb-6" />
      <div className="">
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
            <Skeleton className="aspect-square w-full" />
            <div className="p-4">
              <Skeleton className="h-5 w-full mb-2" />
              <Skeleton className="h-4 w-3/4 mb-3" />
              <Skeleton className="h-3 w-1/2 mb-3" />
              <Skeleton className="h-6 w-1/3 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Helper to format numbers
function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short', // e.g., Apr
    day: 'numeric',
  });
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

