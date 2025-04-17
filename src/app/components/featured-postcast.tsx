"use client"

import { useState } from "react"
import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Card, CardContent } from "../components/ui/card"
import Link from "next/link"
import { montserratBold, montserratSemiBold } from "../../../fonts"

// API functions
const fetchPodcasts = async (page: number) => {
  const { data } = await axios.get(`https://api.wokpa.app/api/listeners/top-podcasts?page=${page}&per_page=15`)
  return data.data.data
}

export default function PodcastBrowser() {
  const [page, setPage] = useState(1)

  // Fetch podcasts
  const {
    data: podcasts,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["podcasts", page],
    queryFn: () => fetchPodcasts(page),
    keepPreviousData: true,
  })

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1)
    }
  }

  const handleNextPage = () => {
    setPage((prev) => prev + 1)
  }

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )

  if (isError) return <p className="text-center text-red-500 p-4">Failed to load podcasts.</p>

  return (
    <div className="bg-white w-full max-w-[1355px]  mx-auto">
      {/* Trending Section */}
      <div className=" pt-[5.3125rem]">
        <div className="">
          <h2 className={` ${montserratBold.className} text-[1.5rem]`}>Trending this week</h2>
          <p className={` ${montserratSemiBold} text-[#5A5A5A] text-[1rem] `}>Featured Podcasts</p>
        </div>

        <div className="relative mt-[10px] py-[1.3125rem] ">
          <div className="flex flex-col overflow-x-hidden gap-[1.625rem] lg:flex lg:flex-row ">

            {podcasts?.slice(0, 5).map((podcast: any) => (
              <Link href={`/podcast/${podcast.id}`} key={podcast.id}>
                <Card className="flex justify-center cursor-pointer transition-all hover:shadow-md">
                  <CardContent className="p-0 w-[288px] h-[424px] relative flex flex-col">
                    <div className="relative h-full">
                      <img
                        src={podcast.picture_url || "/placeholder.svg"}
                        alt={podcast.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-[33px] left-2">
                        <Badge variant="secondary" className="bg-black/70 text-white">
                          {podcast.subscriber_count || 0} Episodes
                        </Badge>
                      </div>
                    </div>

                    <div className="p-3 absolute flex flex-col justify-between bottom-[-5px]">
                      <h3 className={` ${montserratBold.className} text-[1.25rem] text-white`}>{podcast.title}</h3>
                    </div>
                  </CardContent>

                </Card>
              </Link>
            ))}
          </div>

          <div className="absolute right-[-39px] bottom-[184px] flex justify-end gap-2 mt-4">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrevPage}
              disabled={page === 1}
              className="rounded-full h-10 w-10"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous</span>
            </Button>
            <Button variant="outline" size="icon" onClick={handleNextPage} className="rounded-full h-10 w-10">
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next</span>
            </Button>
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
