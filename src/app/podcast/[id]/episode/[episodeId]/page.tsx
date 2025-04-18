// app/podcast/[id]/episode/[episodeId]/EpisodeDetailPage.tsx
"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronLeft,
  Play,
  Pause,
  Rewind,
  FastForward,
  Volume2,
  Share2,
  Gift,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import NewsletterSignup from "@/app/components/get-me-in";
import { cn } from "@/lib/utils";
import { montserratBold } from "@/../../fonts";

// hooks
import { usePodcastDetails } from "@/hooks/usePodcasts";
import { useEpisodeDetails, usePodcastEpisodes } from "@/hooks/useEpisodes";
// components
import { EpisodeCard } from "@/app/components/episode-card";

export default function EpisodeDetailPage() {
  const { id: podcastId, episodeId } = useParams() as {
    id: string;
    episodeId: string;
  };

  // refs & state
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [expanded, setExpanded] = useState(false);

  // data fetching
  const {
    data: podcast,
    isLoading: podcastLoading,
    isError: podcastError,
  } = usePodcastDetails(podcastId);

  const {
    data: episode,
    isLoading: episodeLoading,
    isError: episodeError,
  } = useEpisodeDetails(episodeId);

  const { data: otherEpisodes } = usePodcastEpisodes(podcastId);

  // play / pause
  const togglePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  // skip
  const skip = (secs: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.min(
      Math.max(0, audioRef.current.currentTime + secs),
      duration
    );
  };

  // time updates
  const onTimeUpdate = () => {
    if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
  };
  const onLoadedMetadata = () => {
    if (audioRef.current) setDuration(audioRef.current.duration);
  };

  // format helpers
  const fmt = (sec: number) => {
    const m = Math.floor(sec / 60)
      .toString()
      .padStart(2, "0");
    const s = Math.floor(sec % 60)
      .toString()
      .padStart(2, "0");
    return `${m}:${s}`;
  };
  const fmtDate = (iso?: string) => {
    if (!iso) return "";
    const d = new Date(iso);
    const mo = d.toLocaleString("default", { month: "short" }).toUpperCase();
    return `${mo} ${d.getDate()}, ${d.getFullYear()}`;
  };

  // attempt autoplay
  useEffect(() => {
    if (!episode || !audioRef.current) return;
    audioRef.current
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => {
        /* user must click play manually */
      });
  }, [episode]);

  if (podcastLoading || episodeLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }
  if (podcastError || episodeError)
    return (
      <p className="text-center text-red-500 p-4">
        Failed to load episode details.
      </p>
    );
  if (!episode)
    return <p className="text-center p-4">Episode not found.</p>;

  // ▶️ **Use your content_url here**
  const audioUrl = episode.content_url;

  return (
    <div>
      <div className="w-full relative text-white mb-8">
        {/* BACKGROUND */}
        <div className="absolute inset-0">
          <Image
            src={
              episode.picture_url ||
              podcast?.picture_url ||
              "/placeholder.svg?height=1000&width=1000"
            }
            alt="background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80 backdrop-blur-sm" />
        </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* BACK LINK */}
        <Link
          href={`/podcast/${podcastId}`}
          className="flex items-center text-white hover:text-gray-300 mb-6"
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          Back to podcast
        </Link>

        {/* HEADER */}
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="flex-shrink-0 w-32 h-32 md:w-[120px] md:h-[120px]">
            <Image
              src={
                episode.picture_url ||
                podcast?.picture_url ||
                "/placeholder.svg?height=120&width=120"
              }
              alt={episode.title}
              width={120}
              height={120}
              className="rounded-md object-cover shadow-lg"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 text-gray-300 mb-2">
              <span className="uppercase">
                {fmtDate(episode.published_at || episode.created_at)}
              </span>
              <span className="w-1 h-1 bg-gray-300 rounded-full" />
              <span>
                {episode.duration
                  ? `${Math.floor(episode.duration / 60)} MINS`
                  : "--"}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-3">
              {episode.title}
            </h1>
            <div
              className={cn(
                "text-gray-200 text-sm md:text-base",
                !expanded && "line-clamp-3 md:line-clamp-4"
              )}
            >
              {episode.description}
            </div>
            {episode.description.length > 200 && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="text-green-500 font-medium mt-2 hover:underline"
              >
                {expanded ? "READ LESS" : "READ MORE"}
              </button>
            )}
          </div>
        </div>

        {/* PLAYER */}
        <div className="max-w-4xl mx-auto">
          <audio
            ref={audioRef}
            src={audioUrl}
            onTimeUpdate={onTimeUpdate}
            onLoadedMetadata={onLoadedMetadata}
            onEnded={() => setIsPlaying(false)}
          />

          {/* PROGRESS */}
          <div className="flex items-center mb-6">
            <span className="text-sm text-gray-300 w-12">
              {fmt(currentTime)}
            </span>
            <div
              className="flex-1 h-1 bg-gray-600/50 rounded-full mx-2 relative cursor-pointer"
              onClick={(e) => {
                if (!audioRef.current) return;
                const rect = (e.target as HTMLDivElement).getBoundingClientRect();
                const pct = (e.clientX - rect.left) / rect.width;
                const newTime = pct * duration;
                audioRef.current.currentTime = newTime;
                setCurrentTime(newTime);
              }}
            >
              <div
                className="absolute top-0 left-0 h-full bg-green-500 rounded-full"
                style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
              >
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full" />
              </div>
            </div>
            <span className="text-sm text-gray-300 w-12 text-right">
              {fmt(duration)}
            </span>
          </div>

          {/* CONTROLS */}
          <div className="flex justify-center items-center space-x-8 mb-6">
            <button
              onClick={() => skip(-15)}
              className="w-10 h-10 flex items-center justify-center text-white bg-white/10 rounded-full hover:bg-white/20"
            >
              <div className="relative">
                <Rewind className="h-5 w-5" />
                <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold">
                  15
                </span>
              </div>
            </button>

            <button
              onClick={togglePlayPause}
              className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center hover:bg-red-700 transition"
            >
              {isPlaying ? (
                <Pause className="h-7 w-7 text-white" />
              ) : (
                <Play className="h-7 w-7 text-white ml-1" fill="white" />
              )}
            </button>

            <button
              onClick={() => skip(+15)}
              className="w-10 h-10 flex items-center justify-center text-white bg-white/10 rounded-full hover:bg-white/20"
            >
              <div className="relative">
                <FastForward className="h-5 w-5" />
                <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold">
                  15
                </span>
              </div>
            </button>
          </div>

          {/* ICONS */}
          <div className="flex justify-center space-x-6">
            <button className="w-10 h-10 flex items-center justify-center text-white bg-white/10 rounded-full hover:bg-white/20">
              <Volume2 className="h-5 w-5" />
            </button>
            <button className="w-10 h-10 flex items-center justify-center text-white bg-white/10 rounded-full hover:bg-white/20">
              <Share2 className="h-5 w-5" />
            </button>
            <button className="w-10 h-10 flex items-center justify-center text-white bg-white/10 rounded-full hover:bg-white/20">
              <Gift className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>

    {/* NEXT IN QUEUE */}
    <div className="max-w-4xl mx-auto mb-12">
      <h2
        className={`text-[#282828] text-[1.5rem] ${montserratBold.className} mb-6`}
      >
        NEXT IN QUEUE
      </h2>
      <div className="flex flex-wrap gap-6 justify-center md:justify-start">
        {otherEpisodes
          ?.filter((ep: any) => ep.id !== Number(episodeId))
          .slice(0, 2)
          .map((ep: any) => (
            <EpisodeCard
              key={ep.id}
              episode={ep}
              podcastId={podcastId}
            />
          ))}
      </div>
    </div>

    <NewsletterSignup />
    </div>
  );
}
