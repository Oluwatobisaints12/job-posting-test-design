import Link from "next/link"
import Image from "next/image"
import { Newspaper, Briefcase, Headphones } from "lucide-react"
import { montserratBold, montserratExtraBold, montserratSemiBold } from "../../../fonts"
import PlayvideoSVG from '../../../public/play-button.svg'

export default function SubHeader() {
    return (
        <div className="w-full bg-black text-white h-[72px] relative lg:pr-[10rem]">
            {/* Black image container positioned on the left */}
            <div className="absolute left-0 top-0 h-full w-full sm:w-1/3 lg:w-1/4 overflow-hidden">
                <div className="relative w-full h-full flex flex-row py-[15px]">
                    {/* Black image as background */}
                    <Image src="/assets/images/rectangle-3.png" alt="Background" fill className="object-cover" priority />

                    {/* Content to overlay on the black image */}
                    <div className="absolute  inset-0 sm:p-4 flex flex-col lg:items-center  lg:justify-between lg:flex lg:flex-row ">
                        <div className="flex flex-row gap-[1rem]">
                            <Image
                                src="/play-button.svg"
                                alt="Play Button"
                                width={46}
                                height={46}
                                priority
                            />


                            <div className="flex flex-col justify-center">

                                <p className={`text-white text-[18px] sm:text-xs z-10 mt-1 ${montserratExtraBold.className}`}>Listen to ABR Live Radio</p>
                                <p className={`text-[#9CCC65] text-[13px] ${montserratBold.className}`}>ON AIR</p>
                            </div>
                        </div>


                        {/* Small image overlay example */}
                        <div className=" flex flex-row bottom-[2px] left-[2px] gap-[1rem] lg:right-[22px] ">
                            <Image
                                src="/calender-box.svg"
                                alt="Icon"
                                width={18}
                                height={18}

                            />
                            <p className={`text-[13px] ${montserratSemiBold.className}`} >View schedules</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main sub-header content - pushed to the right on larger screens */}
            <div className="hidden lg:flex justify-end h-full px-4 z-10 ">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-[2rem] sm:gap-6 md:gap-8 sm:ml-[33%] ">
                <div className="h-[20px] w-[1.5px] bg-[#FFFFFF] border border-gray-300"></div>

                    {/* Latest News */}
                    <Link
                        href="/news"
                        className="flex items-center gap-2 hover:text-gray-300 transition-colors w-full sm:w-auto justify-center sm:justify-start py-2 sm:py-0"
                    >
                       <Image
                                src="/news.svg"
                                alt="Play Button"
                                width={18}
                                height={18}
                                priority
                            />
                        <span className="text-xs sm:text-sm md:text-sm font-medium">Latest News</span>
                    </Link>

                       {/* New Episodes */}
                       <Link
                        href="/news"
                        className="flex items-center gap-2 hover:text-gray-300 transition-colors w-full sm:w-auto justify-center sm:justify-start py-2 sm:py-0"
                    >
                       <Image
                                src="/episodes.svg"
                                alt="Play Button"
                                width={18}
                                height={18}
                                priority
                            />
                        <span className="text-xs sm:text-sm md:text-sm font-medium">New Episodes</span>
                    </Link>

                    {/* Our Service */}
                    <Link
                        href="/services"
                        className="flex items-center gap-2 hover:text-gray-300 transition-colors w-full sm:w-auto justify-center sm:justify-start py-2 sm:py-0"
                    >
                        <Image
                                src="/services.svg"
                                alt="Play Button"
                                width={18}
                                height={18}
                                priority
                            />
                        <span className="text-xs sm:text-sm md:text-sm font-medium">Our Service</span>
                    </Link>

                    {/* All Podcast */}
                    <Link
                        href="/all-podcast"
                        className="flex items-center gap-2 hover:text-gray-300 transition-colors w-full sm:w-auto justify-center sm:justify-start py-2 sm:py-0"
                    >
                       <Image
                                src="/podcast.svg"
                                alt="Play Button"
                                width={18}
                                height={18}
                                priority
                            />
                        <span className="text-xs sm:text-sm md:text-sm font-medium">All Podcast</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}
