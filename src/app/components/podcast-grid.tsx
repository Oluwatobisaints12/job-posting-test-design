"use client"

import { useState } from "react"
import { PodcastCard } from "./postcast-card"
import { Pagination } from "./pagination-button"

// Import custom hook and types
import { useTopPodcasts } from "@/hooks/usePodcasts"
import type { Podcast } from "@/api/types"

export function PodcastGrid() {
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(2) // Hardcoded for now

  // Use custom hook to fetch podcasts
  const { data: podcasts, isLoading: loading, isError } = useTopPodcasts(currentPage, 10)

  // Derive error state from isError
  const error = isError ? "Failed to load podcasts. Please try again later." : null

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {[...Array(10)].map((_, index) => (
          <div key={index} className="bg-gray-100 animate-pulse h-[350px] rounded-lg"></div>
        ))}
      </div>
    )
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {podcasts.map((podcast) => (
          <PodcastCard key={podcast.id} podcast={podcast} />
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
    </div>
  )
}
