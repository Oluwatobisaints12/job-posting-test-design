"use client"
import { useParams } from "next/navigation"
import { Play, Pause, Share2 } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { Card, CardContent } from "../../components/ui/card"
import Link from "next/link"
// Removed unused imports
import { useState, useRef, useEffect } from "react"
import { Pagination } from "@/app/components/pagination-button"
import { montserratBold, montserratMedium } from "@/../../fonts"

// Import custom hooks
import { usePodcastDetails } from "@/hooks/usePodcasts"
import { usePodcastEpisodes } from "@/hooks/useEpisodes"

export default function PodcastDetailPage() {
  const params = useParams()
  // No longer need router as we're using Link components
  const podcastId = params.id as string

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1) // Will be calculated based on episodes count
  const EPISODES_PER_PAGE = 3 // Show only 3 episodes per page

  // Audio player state
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentEpisode, setCurrentEpisode] = useState<any>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Fetch podcast details using custom hook
  const {
    data: podcast,
    isLoading: podcastLoading,
    isError: podcastError,
  } = usePodcastDetails(podcastId)

  // Fetch all episodes first
  const {
    data: allEpisodes,
    isLoading: episodesLoading,
    isError: episodesError,
  } = usePodcastEpisodes(podcastId)

  // Calculate total pages based on episodes count
  useEffect(() => {
    if (allEpisodes) {
      setTotalPages(Math.ceil(allEpisodes.length / EPISODES_PER_PAGE))
    }
  }, [allEpisodes])

  // Get paginated episodes
  const episodes = allEpisodes ? allEpisodes.slice(
    (currentPage - 1) * EPISODES_PER_PAGE,
    currentPage * EPISODES_PER_PAGE
  ) : []

  // No longer needed as we're using Link component for navigation
  // const handleBack = () => {
  //   router.back()
  // }

  // Handle page change for pagination
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // Scroll to episodes section when changing pages
    const episodesSection = document.getElementById('episodes-section')
    if (episodesSection) {
      episodesSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Play episode function
  const playEpisode = (episode: any) => {
    setCurrentEpisode(episode)
    if (audioRef.current) {
      audioRef.current.src = episode.audio_url
      audioRef.current.load()
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  // Toggle play/pause - now handled directly in the play button click
  // const togglePlayPause = () => {
  //   if (audioRef.current) {
  //     if (isPlaying) {
  //       audioRef.current.pause()
  //     } else {
  //       audioRef.current.play()
  //     }
  //     setIsPlaying(!isPlaying)
  //   }
  // }

  // We're now using an inline function for playing the latest episode

  // No longer needed as we're using Link components
  // const navigateToEpisode = (episode: any) => {
  //   router.push(`/podcast/${podcastId}/episode/${episode.id}`)
  // }

  if (podcastLoading || episodesLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )

  if (podcastError || episodesError)
    return <p className="text-center text-red-500 p-4">Failed to load podcast details.</p>

  return (
    <div>


      {/* Featured Podcast with Background */}
      <div className="w-full relative text-white mb-12">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <div className="w-full h-full">
            <img
              src={podcast?.picture_url || "/placeholder.svg"}
              alt="background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80 backdrop-blur-sm" />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-[1362px] mx-auto p-4 py-12">
          <div className="grid md:grid-cols-[300px_1fr] gap-8">
            <div>
              <img
                src={podcast?.picture_url || "/placeholder.svg"}
                alt={podcast?.title}
                className="w-full aspect-square object-cover rounded-lg shadow-md"
              />
            </div>
            <div className="flex flex-col">
              <Badge variant="outline" className="w-fit mb-2 text-white border-white">
                {podcast?.category?.name || "Podcast"}
              </Badge>
              <h1 className="text-3xl font-bold mb-2">{podcast?.title}</h1>
              <p className="text-white/80 mb-4">By {podcast?.author}</p>
              <p className="mb-6 text-white/90">{podcast?.description || "No description available."}</p>
              <div className="mt-6 flex items-center gap-4">
                <p className="text-white/80">Available on</p>
                <div className="flex gap-3">
                  {/* Platform icons */}
                  <img src="/spotify.svg" alt="Spotify" className="h-6 w-6" />
                  <img src="/apple-podcasts.svg" alt="Apple Podcasts" className="h-6 w-6" />
                  <img src="/google-podcasts.svg" alt="Google Podcasts" className="h-6 w-6" />
                  <div className="flex items-center justify-center bg-[#439ECA] rounded-full h-6 w-6 text-white text-xs font-bold">W</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1362px] mx-auto p-4">



      {/* Episodes List */}
      <div id="episodes-section" className="mb-12">
        <h2 className={`text-2xl ${montserratBold.className} mb-6`}>ALL EPISODES <span className="text-gray-500 text-sm ml-2">({allEpisodes?.length || 0} AVAILABLE)</span></h2>
        <div className="space-y-4">
          {episodes?.map((episode: any) => (
            <Card key={episode.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 border-0 bg-transparent hover:translate-y-[-3px]">
              <CardContent className="p-4">
                <div className="flex items-start gap-6">
                  <div
                    className="relative shrink-0 cursor-pointer"
                    onClick={() => playEpisode(episode)}
                  >
                    <img
                      src={episode.picture_url || podcast?.picture_url || "/placeholder.svg"}
                      alt={episode.title}
                      className="w-24 h-24 object-cover rounded-md"
                    />
                    <div className="absolute inset-0 flex items-center justify-center hover:bg-black/30 rounded-md transition-all duration-300">
                      <Button
                        size="icon"
                        variant="secondary"
                        className="h-10 w-10 rounded-full shadow-md opacity-90 bg-[#CC0001] hover:bg-[#E50001] hover:scale-110 transition-all duration-300 text-white"
                      >
                        {currentEpisode?.id === episode.id && isPlaying ? (
                          <Pause className="h-5 w-5" />
                        ) : (
                          <Play className="h-5 w-5 ml-1" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <Link
                    href={`/podcast/${podcastId}/episode/${episode.id}`}
                    className="flex-1 cursor-pointer block transition-all duration-300 hover:text-[#CC0001]"
                    prefetch
                  >
                    <div className="flex items-center gap-3 text-gray-500 mb-2">
                      <span className={`uppercase ${montserratMedium.className} text-xs`}>
                        {new Date(episode.published_at || episode.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase()}
                      </span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                      <span className={`${montserratMedium.className} text-xs`}>
                        {episode.duration ? `${Math.floor(episode.duration / 60)} MINS` : "--"}
                      </span>
                    </div>
                    <h3 className={`${montserratBold.className} text-lg mb-2 hover:text-[#CC0001] transition-colors`}>{episode.title}</h3>
                    <p className="text-sm line-clamp-2 text-gray-600">{episode.description || "No description available."}</p>
                  </Link>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-gray-100">
                      <Share2 className="h-4 w-4 text-gray-500" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-8 flex justify-center">
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
      </div>

      {/* Removed More Podcasts section as requested */}
    </div>
    </div>
  )
}

// Helper function to format duration is no longer needed as we're using a different format
