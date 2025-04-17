"use client"

import { useState } from "react"
import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Card, CardContent } from "../components/ui/card"
import Link from "next/link"
import { montserratBold, montserratMedium } from "../../../fonts"

// API functions
const fetchPodcasts = async (page: number) => {
    const { data } = await axios.get(`https://api.wokpa.app/api/listeners/episodes/latest?page=${page}&per_page=15`)
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
    console.log(podcasts, 'podcast2')

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
        <div className="bg-white w-full sm:px-6 max-w-[1355px] mx-auto">
            {/* Trending Section */}
            <div className="mb-8 md:mb-10 lg:mb-12 pt-6 md:pt-8 lg:pt-20">
                <div className="mb-4 md:mb-6 lg:mb-7">
                    <h2 className={`${montserratBold.className} text-xl md:text-2xl text-[#282828]`}>
                        Newly added episodes
                    </h2>
                </div>

                <div className="relative">
                    {/* Responsive carousel/grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5 md:gap-6">
                        {podcasts?.slice(0, 5).map((podcast: any) => (
                            <Link href={`/podcast/${podcast.id}`} key={podcast.id} className="block">
                                <Card className="cursor-pointer transition-all hover:shadow-md h-full">
                                    <CardContent className="p-0 w-full">
                                        <div className="relative">
                                            <img
                                                src={podcast.picture_url || "/placeholder.svg"}
                                                alt={podcast.title}
                                                className="w-full aspect-square object-cover"
                                            />
                                            <div className="flex flex-row items-center mt-3 px-3">
                                                <span className={`${montserratBold.className} text-xs text-[#828282]`}>
                                                    {formatDate(podcast.created_at || 0)}
                                                </span>
                                                <span className="w-1.5 h-1.5 bg-[#828282] rounded-full mx-2"></span>
                                                <span className={`${montserratBold.className} text-xs text-[#828282]`}>
                                                    {formatDuration(podcast.duration)}
                                                </span>
                                            </div>
                                        </div>
                                        
                                        <div className="mt-2 px-3 pb-4">
                                            <h3 className={`${montserratBold.className} text-sm sm:text-base text-[#282828] line-clamp-2`}>
                                                {podcast.title}
                                            </h3>
                                            
                                            <div className="flex flex-col sm:flex-row sm:items-center mt-3 sm:mt-4">
                                                <span className={`${montserratMedium.className} text-xs sm:text-sm text-[#282828] sm:mr-4 mb-2 sm:mb-0`}>
                                                    More episodes
                                                </span>
                                                
                                                <div className="flex gap-2 sm:gap-3 items-center">
                                                    <Button variant="ghost" size="icon" className="h-6 w-6 p-0">
                                                        <svg width="24" height="24" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                                                    
                                                    <Button variant="ghost" size="icon" className="h-6 w-6 p-0">
                                                        <svg width="24" height="24" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>

                    {/* Pagination buttons - repositioned for responsiveness */}
                    <div className="flex justify-center md:justify-end mt-6 md:mt-8">
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={handlePrevPage}
                                disabled={page === 1}
                                className="rounded-full h-8 w-8 md:h-10 md:w-10"
                            >
                                <ChevronLeft className="h-3 w-3 md:h-4 md:w-4" />
                                <span className="sr-only">Previous</span>
                            </Button>
                            <Button 
                                variant="outline" 
                                size="icon" 
                                onClick={handleNextPage} 
                                className="rounded-full h-8 w-8 md:h-10 md:w-10"
                            >
                                <ChevronRight className="h-3 w-3 md:h-4 md:w-4" />
                                <span className="sr-only">Next</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Commented out section kept as in original */}
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