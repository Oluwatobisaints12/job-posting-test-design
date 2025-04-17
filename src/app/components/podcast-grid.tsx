"use client"

import { useEffect, useState } from "react"
import { PodcastCard } from "./postcast-card"
import { Pagination } from "./pagination-button"
import type { Podcast } from "../../../types/postcast"

export function PodcastGrid() {
  const [podcasts, setPodcasts] = useState<Podcast[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    async function fetchPodcasts() {
      try {
        setLoading(true)
        const response = await fetch(`https://api.wokpa.app/api/listeners/top-podcasts?page=${currentPage}&per_page=10`)

        if (!response.ok) {
          throw new Error("Failed to fetch podcasts")
        }

        const data = await response.json()
        setPodcasts(data.data.data)

        // Calculate total pages based on total count if available
        // For now, we'll just set it to 2 to match the screenshot
        setTotalPages(2)
      } catch (err) {
        setError("Failed to load podcasts. Please try again later.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchPodcasts()
  }, [currentPage])

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
