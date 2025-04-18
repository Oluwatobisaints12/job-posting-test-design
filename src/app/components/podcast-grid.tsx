"use client"

import { useState, useEffect } from "react"
import PodcastCard from "./podcast-card"
import { Pagination } from "./pagination-button"

// Import custom hooks and types
import { useLatestEpisodes } from "@/hooks/useEpisodes"
import { useSearchPodcasts } from "@/hooks/useSearch"
import type { Podcast, Episode } from "@/api/types"

interface PodcastGridProps {
  searchQuery?: string
  categoryFilter?: string
  sortBy?: string
}

export function PodcastGrid({
  searchQuery = "",
  categoryFilter = "",
  sortBy = "Popular"
}: PodcastGridProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(5) // Default value
  const perPage = 16 // Changed to 16 as requested

  // Use the appropriate hook based on whether we're searching or not
  const {
    data: searchResults,
    isLoading: searchLoading,
    isError: searchError
  } = useSearchPodcasts(searchQuery, currentPage, perPage)

  const {
    data: latestEpisodes,
    isLoading: episodesLoading,
    isError: episodesError
  } = useLatestEpisodes(currentPage, perPage)

  // Determine which data to use
  const isSearching = searchQuery.trim().length > 0
  const loading = isSearching ? searchLoading : episodesLoading
  const error = isSearching ? searchError : episodesError

  // Convert episodes to podcasts format if needed
  const [displayData, setDisplayData] = useState<Podcast[]>([])

  useEffect(() => {
    if (isSearching && searchResults) {
      // Filter by category if needed
      let filtered = searchResults
      if (categoryFilter) {
        filtered = searchResults.filter(podcast =>
          podcast.category_type === categoryFilter ||
          podcast.category?.name === categoryFilter
        )
      }

      // Sort the results
      let sorted = [...filtered]
      if (sortBy === "Recent") {
        sorted.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      } else if (sortBy === "A-Z") {
        sorted.sort((a, b) => a.title.localeCompare(b.title))
      }

      setDisplayData(sorted)
      setTotalPages(Math.ceil(sorted.length / perPage))
    } else if (latestEpisodes) {
      // Convert episodes to podcast format
      const podcastsFromEpisodes = latestEpisodes.map((episode: Episode) => {
        return {
          id: episode.podcast_id,
          title: episode.title,
          picture_url: episode.picture_url,
          description: episode.description,
          created_at: episode.created_at,
          updated_at: episode.updated_at,
          // Add other required fields with default values
          user_id: 0,
          author: "",
          category_name: "",
          category_type: "",
          cover_picture_url: null,
          embeddable_player_settings: null,
          subscriber_count: 0,
          episodes_count: 0,
          publisher: { id: 0, first_name: "", last_name: "", company_name: "", profile_image_url: null, created_at: "", updated_at: "" }
        } as Podcast
      })

      // Filter by category if needed
      let filtered = podcastsFromEpisodes
      if (categoryFilter) {
        filtered = podcastsFromEpisodes.filter(podcast =>
          podcast.category_type === categoryFilter ||
          podcast.category?.name === categoryFilter
        )
      }

      // Sort the results
      let sorted = [...filtered]
      if (sortBy === "Recent") {
        sorted.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      } else if (sortBy === "A-Z") {
        sorted.sort((a, b) => a.title.localeCompare(b.title))
      }

      setDisplayData(sorted)
      // Update total pages based on the API response
      setTotalPages(Math.max(5, Math.ceil(sorted.length / perPage)))
    }
  }, [searchResults, latestEpisodes, searchQuery, categoryFilter, sortBy, isSearching, perPage])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
        {[...Array(perPage)].map((_, index) => (
          <div key={index} className="bg-gray-100 animate-pulse h-[350px] rounded-lg mx-auto w-full max-w-[265px]"></div>
        ))}
      </div>
    )
  }

  if (error) {
    return <div className="text-red-500">Failed to load podcasts. Please try again later.</div>
  }

  if (displayData.length === 0) {
    return <div className="text-center py-8">No podcasts found. Try adjusting your search or filters.</div>
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
        {displayData.map((podcast) => (
          <div key={podcast.id} className="flex justify-center w-full">
            <PodcastCard podcast={podcast} />
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
    </div>
  )
}
