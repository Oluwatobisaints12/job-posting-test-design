"use client"

import Image from "next/image"
import Link from "next/link"
import { Play } from "lucide-react"
import { montserratBold, montserratMedium } from "../../../fonts"
import { Button } from "./ui/button"
import { Podcast, Episode } from "@/api/types"
import { useEffect, useState } from "react"

// Helper to format duration
function formatDuration(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours > 0) {
    return `${hours} hr${hours > 1 ? 's' : ''} ${remainingMinutes} min`;
  }

  return `${minutes} min`;
}

// Podcast Card Component
export default function PodcastCard({ podcast }: { podcast: Podcast }) {
  const [latestEpisode, setLatestEpisode] = useState<Episode | null>(null);

  // Fetch the latest episode for this podcast to enable the play button
  useEffect(() => {
    // This is a simplified approach - in a real app, you'd want to fetch this data more efficiently
    // For example, by adding a specific API endpoint to get the latest episode for a podcast
    const fetchLatestEpisode = async () => {
      try {
        // Use the existing hook but we'll only take the first result
        const response = await fetch(`https://api.wokpa.app/api/listeners/podcasts/${podcast.id}/episodes?page=1&per_page=1`);
        const data = await response.json();
        if (data?.data?.data?.length > 0) {
          setLatestEpisode(data.data.data[0]);
        }
      } catch (error) {
        console.error("Error fetching latest episode:", error);
      }
    };

    fetchLatestEpisode();
  }, [podcast.id]);

  return (
    <Link href={`/podcast/${podcast.id}`} className="block transition-all duration-300 w-full max-w-[265px]" prefetch>
      <div className="bg-[#F4F4F4] rounded-[5px] w-full h-[367px] px-[21px] py-[22px] border-b-4 border-b-[#D5D3D3] shadow-[0_4px_10px_-1px_rgba(0,0,0,0.2)] overflow-hidden transition-all duration-300 hover:shadow-[0_8px_15px_-1px_rgba(0,0,0,0.3)] hover:translate-y-[-5px] cursor-pointer">
        <div className="relative w-full h-[234px]">
          <Image
            src={podcast.picture_url}
            alt={podcast.title || "podcast title"}
            fill
            className="object-cover rounded-md transition-transform duration-500 ease-in-out hover:scale-105"
            onError={(e) => {
              // Fallback to a default image
              (e.target as HTMLImageElement).src = "/default-image.jpg";
            }}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 265px"
            priority={false}
            loading="lazy"
          />

          {/* Play button overlay - visible on hover over the image */}
          {latestEpisode && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
              <Link
                href={`/podcast/${podcast.id}/episode/${latestEpisode.id}`}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#CC0001] rounded-full p-3 transform hover:scale-110 transition-all duration-300 ease-in-out hover:bg-[#E50001] shadow-lg"
              >
                <Play className="h-5 w-5 text-white" fill="white" />
              </Link>
            </div>
          )}
        </div>
        <div className="mt-[1rem]">
          <h3 className={`text-[#282828] text-[1.125rem] ${montserratBold.className} truncate`}>{podcast.title}</h3>

          {/* Show episode duration if available */}
          {latestEpisode && (
            <p className={`text-[#5A5A5A] text-[0.875rem] ${montserratMedium.className} mt-1`}>
              Latest: {formatDuration(latestEpisode.duration || 0)}
            </p>
          )}

          <div className="flex gap-[11px] items-center mt-[14px]">
            {/* Play button - always visible next to other icons */}
            {latestEpisode && (
              <Link
                href={`/podcast/${podcast.id}/episode/${latestEpisode.id}`}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#CC0001] rounded-full p-2 transform hover:scale-110 transition-all duration-300 ease-in-out hover:bg-[#E50001] shadow-lg flex items-center justify-center h-6 w-6"
              >
                <Play className="h-3 w-3 text-white" fill="white" />
              </Link>
            )}

            <Button variant="ghost" size="icon" className="h-6 w-6 transition-all duration-300 hover:bg-[#d1d1d1] hover:scale-110">
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="15" cy="15" r="15" fill="#E1E1E1" />
                <g clipPath="url(#clip0_1_462)">
                  <path d="M6.00027 14.9903C5.99325 16.7533 7.41679 18.1882 9.17983 18.1952C9.99178 18.1985 10.7745 17.8922 11.3685 17.3387L16.1257 19.4866C16.0926 19.6644 16.0745 19.8447 16.0715 20.0256C16.0659 21.8008 17.5003 23.2444 19.2755 23.25C21.0507 23.2556 22.4943 21.8211 22.4999 20.0459C22.5056 18.2708 21.071 16.8272 19.2959 16.8215C18.2353 16.8182 17.2413 17.3382 16.6393 18.2114L12.1699 16.1933C12.4873 15.4268 12.4886 14.5657 12.1733 13.7983L16.6366 11.7699C17.6416 13.2235 19.6348 13.5871 21.0884 12.582C22.542 11.577 22.9055 9.5839 21.9005 8.1303C20.8954 6.67671 18.9023 6.31312 17.4487 7.31816C16.583 7.91671 16.0671 8.90263 16.0687 9.95508C16.0716 10.1362 16.09 10.3168 16.1236 10.4948L11.3788 12.6509C10.0933 11.4438 8.07266 11.5073 6.86555 12.7929C6.30688 13.3879 5.99724 14.1742 6.00027 14.9903Z" fill="#5A5A5A" />
                </g>
                <defs>
                  <clipPath id="clip0_1_462">
                    <rect width="16.5" height="16.5" fill="white" transform="translate(6 6.75)" />
                  </clipPath>
                </defs>
              </svg>
            </Button>
            <Button variant="ghost" size="icon" className="h-6 w-6 transition-all duration-300 hover:bg-[#d1d1d1] hover:scale-110">
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="15" cy="15" r="15" fill="#E1E1E1" />
                <g clipPath="url(#clip0_1_492)">
                  <path d="M20.25 10.4999H19.3305C20.3903 9.46485 20.5522 8.1036 19.7393 7.01985C19.3305 6.47385 18.7343 6.12135 18.06 6.02535C17.3835 5.9271 16.7137 6.10185 16.1693 6.50985C15.6608 6.89085 15.2858 7.3761 15.009 7.8696C14.7323 7.37535 14.3573 6.89085 13.8488 6.50985C13.3043 6.1011 12.633 5.9271 11.9588 6.02535C11.2845 6.12135 10.6883 6.4746 10.2795 7.01985C9.471 8.0976 9.627 9.44985 10.6897 10.4999H9.75C7.68225 10.4999 6 12.1821 6 14.2499V20.2499C6 22.3176 7.68225 23.9999 9.75 23.9999H20.25C22.3177 23.9999 24 22.3176 24 20.2499V14.2499C24 12.1821 22.3177 10.4999 20.25 10.4999ZM17.07 7.70985C17.2537 7.57185 17.4727 7.49985 17.6978 7.49985C18 7.49985 18.3712 7.6956 18.54 7.91985C19.0207 8.56035 18.5723 9.15285 18.2828 9.4296C17.112 10.4684 15.87 10.4999 15.7642 10.5006H15.7545C15.7687 10.4324 15.7732 10.3611 15.7673 10.2884L15.7657 10.2726C15.8325 9.8241 16.1115 8.42835 17.07 7.70985ZM11.757 9.44685C11.4465 9.1506 10.9988 8.56035 11.4795 7.9191C11.6483 7.69485 11.8935 7.54935 12.171 7.5096C12.4507 7.4736 12.7252 7.54185 12.9495 7.70985C13.9088 8.4291 14.1877 9.82635 14.2545 10.2719L14.253 10.2876C14.247 10.3604 14.2515 10.4316 14.2657 10.4999H14.256C14.1503 10.4999 12.9082 10.4676 11.757 9.44685ZM9.75 11.9991H14.118C13.5548 13.4624 11.3685 13.4984 11.2485 13.4991C10.8345 13.4991 10.4992 13.8351 10.4992 14.2491C10.4992 14.6631 10.8352 14.9991 11.2492 14.9991C12.312 14.9991 14.022 14.6331 14.9992 13.4571C15.9765 14.6339 17.6865 14.9991 18.7493 14.9991C19.1632 14.9991 19.4993 14.6639 19.4993 14.2491C19.4993 13.8344 19.1632 13.4991 18.7493 13.4991C18.6428 13.4991 16.4408 13.4796 15.879 11.9991H20.2493C21.4898 11.9991 22.4993 13.0086 22.4993 14.2491V18.7491H7.5V14.2491C7.5 13.0086 8.5095 11.9991 9.75 11.9991ZM20.25 22.4991H9.75C8.5095 22.4991 7.5 21.4896 7.5 20.2491H22.5C22.5 21.4896 21.4905 22.4991 20.25 22.4991Z" fill="#5A5A5A" />
                </g>
                <defs>
                  <clipPath id="clip0_1_492">
                    <rect width="18" height="18" fill="white" transform="translate(6 6)" />
                  </clipPath>
                </defs>
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </Link>
  )
}
