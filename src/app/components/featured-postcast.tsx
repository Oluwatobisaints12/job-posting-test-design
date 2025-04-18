"use client"

import { useState } from "react"
import { Badge } from "../components/ui/badge"
import { Card, CardContent } from "../components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { Play } from "lucide-react"
import { montserratBold, montserratSemiBold } from "../../../fonts"
import { ArrowButton } from "./ui/arrow-button"

// Import custom hook
import { useTopPodcasts } from "@/hooks/usePodcasts"

export default function PodcastBrowser() {
  const [page, setPage] = useState(1)

  // Fetch podcasts using custom hook
  const {
    data: podcasts,
    isLoading,
    isError,
  } = useTopPodcasts(page)

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1)
    }
  }

  const handleNextPage = () => {
    setPage((prev) => prev + 1)
  }

  // Only show full loading state on initial load
  const isInitialLoading = isLoading && !podcasts;

  if (isInitialLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isError) return <p className="text-center text-red-500 p-4">Failed to load podcasts.</p>;

  return (
    <div className="bg-white w-full mx-auto">
      {/* Trending Section */}
      <div className=" pt-[5.3125rem]">
        <div className="">
          <h2 className={` ${montserratBold.className} text-[1.5rem]`}>Trending this week</h2>
          <p className={` ${montserratSemiBold} text-[#5A5A5A] text-[1rem] `}>Featured Podcasts</p>
        </div>

        <div className="relative mt-[10px] py-[1.3125rem]">
          {/* Navigation arrows - positioned absolutely on the right */}
          <div className="hidden md:flex absolute top-1/2 transform -translate-y-1/2 right-[-39px] z-10 pointer-events-none">
            <div className="flex gap-4 pointer-events-auto">
              <div className="relative">
                <ArrowButton
                  direction="left"
                  onClick={handlePrevPage}
                  disabled={page === 1 || isLoading}
                  aria-label="Previous"
                  className="w-[50px] h-[50px] md:w-[60px] md:h-[60px] transition-transform duration-300 hover:scale-110"
                />
                {isLoading && page > 1 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-5 h-5 border-t-2 border-primary rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
              <div className="relative">
                <ArrowButton
                  direction="right"
                  onClick={handleNextPage}
                  disabled={isLoading}
                  aria-label="Next"
                  className="w-[50px] h-[50px] md:w-[60px] md:h-[60px] transition-transform duration-300 hover:scale-110"
                />
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-5 h-5 border-t-2 border-primary rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className={`flex flex-col overflow-x-hidden gap-[1.625rem] lg:flex lg:flex-row transition-opacity duration-300 ease-in-out ${isLoading ? 'opacity-60' : 'opacity-100'}`}>
            {podcasts?.slice(0, 5).map((podcast: any) => (
              <Link href={`/podcast/${podcast.id}`} key={podcast.id} className="transform transition-all duration-300 hover:translate-y-[-5px]">
                <Card className="flex justify-center cursor-pointer transition-all hover:shadow-lg overflow-hidden rounded-lg">
                  <CardContent className="p-0 w-[288px] h-[424px] relative flex flex-col">
                    <div className="relative h-full overflow-hidden">
                      <Image
                        src={podcast.picture_url || "/placeholder.svg"}
                        alt={podcast.title}
                        width={288}
                        height={424}
                        className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-105"
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAEtAJJXIDTjwAAAABJRU5ErkJggg=="
                      />

                      {/* Play button overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 ease-in-out bg-black/20">
                        <button className="bg-[#CC0001] rounded-full p-3 transform hover:scale-110 transition-transform shadow-lg">
                          <Play className="h-6 w-6 text-white" fill="white" />
                        </button>
                      </div>

                      <div className="absolute bottom-[33px] left-2">
                        <Badge variant="secondary" className="bg-black/70 text-white">
                          {podcast.subscriber_count || 0} Episodes
                        </Badge>
                      </div>

                      <div className="p-4 absolute flex flex-col justify-between bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent">
                        <h3 className={`${montserratBold.className} text-[1.25rem] text-white line-clamp-2`}>{podcast.title}</h3>
                        <p className="text-sm text-gray-200 mt-1">{podcast.author}</p>
                        <div className="flex items-center text-xs text-gray-300 mt-2">
                          <span>{new Date(podcast.created_at).toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric'})}</span>
                          <span className="mx-2">•</span>
                          <span>{podcast.duration ? `${Math.floor(podcast.duration / 60)} min` : '55 mins'}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Mobile pagination buttons */}
          <div className="flex md:hidden justify-center mt-6">
            <div className="flex gap-4">
              <div className="relative">
                <ArrowButton
                  direction="left"
                  onClick={handlePrevPage}
                  disabled={page === 1 || isLoading}
                  aria-label="Previous"
                  className="w-[50px] h-[50px] transition-transform duration-300 hover:scale-110"
                />
                {isLoading && page > 1 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-4 h-4 border-t-2 border-primary rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
              <div className="relative">
                <ArrowButton
                  direction="right"
                  onClick={handleNextPage}
                  disabled={isLoading}
                  aria-label="Next"
                  className="w-[50px] h-[50px] transition-transform duration-300 hover:scale-110"
                />
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-4 h-4 border-t-2 border-primary rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newly Added Episodes Section */}
      {/* <div className="mb-12">
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Newly added episodes</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {podcasts?.slice(5, 10).map((podcast: any) => (
            <Link href={`/podcast/${podcast.id}`} key={podcast.id}>
              <Card className="overflow-hidden cursor-pointer hover:shadow-md">
                <CardContent className="p-0">
                  <div className="relative">
                    <img
                      src={podcast.picture_url || "/placeholder.svg"}
                      alt={podcast.title}
                      className="w-full h-[180px] object-cover"
                    />
                    <div className="absolute bottom-2 left-2">
                      <Badge variant="secondary" className="bg-black/70 text-white">
                        {podcast.episodes_count || 0} Episodes
                      </Badge>
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="text-xs text-muted-foreground mb-1">{podcast.author}</p>
                    <h3 className="font-medium text-sm line-clamp-2">{podcast.title}</h3>

                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs text-muted-foreground">More Episodes</span>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M6 12H18M18 12L13 7M18 12L13 17"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </Button>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                            <path
                              d="M12 8V16M8 12H16"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div> */}
    </div>
  )
}
