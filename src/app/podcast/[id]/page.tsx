"use client"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Play } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { Card, CardContent } from "../../components/ui/card"
import Link from "next/link"
import NewsletterSignup from "@/app/components/get-me-in"

// Import custom hooks
import { usePodcastDetails, useRelatedPodcasts } from "@/hooks/usePodcasts"
import { usePodcastEpisodes } from "@/hooks/useEpisodes"

export default function PodcastDetailPage() {
  const params = useParams()
  const router = useRouter()
  const podcastId = params.id as string

  // Fetch podcast details using custom hook
  const {
    data: podcast,
    isLoading: podcastLoading,
    isError: podcastError,
  } = usePodcastDetails(podcastId)

  // Fetch episodes using custom hook
  const {
    data: episodes,
    isLoading: episodesLoading,
    isError: episodesError,
  } = usePodcastEpisodes(podcastId)

  // Fetch related podcasts using custom hook
  const {
    data: relatedPodcasts,
  } = useRelatedPodcasts(5)

  // Handle back navigation
  const handleBack = () => {
    router.back()
  }

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
        <NewsletterSignup />
        <div className="max-w-[1362px] mx-auto p-4">
      <Button variant="ghost" onClick={handleBack} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to podcasts
      </Button>

      {/* Featured Podcast */}
      <div className="mb-12">
        <div className="grid md:grid-cols-[300px_1fr] gap-8">
          <div>
            <img
              src={podcast?.picture_url || "/placeholder.svg"}
              alt={podcast?.title}
              className="w-full aspect-square object-cover rounded-lg shadow-md"
            />
          </div>
          <div className="flex flex-col">
            <Badge variant="outline" className="w-fit mb-2">
              {podcast?.category?.name || "Podcast"}
            </Badge>
            <h1 className="text-3xl font-bold mb-2">{podcast?.title}</h1>
            <p className="text-muted-foreground mb-4">By {podcast?.author}</p>
            <p className="mb-6">{podcast?.description || "No description available."}</p>
            <div className="flex gap-4 mt-auto">
              <Button>
                <Play className="mr-2 h-4 w-4" /> Play Latest
              </Button>
              <Button variant="outline">Subscribe</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Episodes List */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Episodes</h2>
        <div className="space-y-4">
          {episodes?.map((episode: any) => (
            <Card key={episode.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="relative shrink-0">
                    <img
                      src={episode.picture_url || podcast?.picture_url || "/placeholder.svg"}
                      alt={episode.title}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <Button
                      size="icon"
                      variant="secondary"
                      className="h-8 w-8 rounded-full absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 shadow-md"
                    >
                      <Play className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium mb-1">{episode.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {new Date(episode.published_at).toLocaleDateString()}
                    </p>
                    <p className="text-sm line-clamp-2">{episode.description || "No description available."}</p>
                  </div>
                  <div className="text-sm text-muted-foreground whitespace-nowrap">
                    {episode.duration ? formatDuration(episode.duration) : "--:--"}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* More Podcasts */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">More Podcasts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {relatedPodcasts?.slice(0, 5).map((relatedPodcast: any) => (
            <Link href={`/podcast/${relatedPodcast.id}`} key={relatedPodcast.id}>
              <Card className="cursor-pointer transition-all hover:shadow-md">
                <CardContent className="p-0">
                  <div className="relative">
                    <img
                      src={relatedPodcast.picture_url || "/placeholder.svg"}
                      alt={relatedPodcast.title}
                      className="w-full h-[180px] object-cover rounded-t-lg"
                    />
                    <div className="absolute bottom-2 left-2">
                      <Badge variant="secondary" className="bg-black/70 text-white">
                        {relatedPodcast.episodes_count || 0} Episodes
                      </Badge>
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium line-clamp-1">{relatedPodcast.title}</h3>
                    <p className="text-sm text-muted-foreground">{relatedPodcast.author}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
    </div>

  )
}

// Helper function to format duration
function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
}
