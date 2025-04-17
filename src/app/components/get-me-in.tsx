"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { montserratBold, montserratMedium } from "../../../fonts"

// You'll need to import your font properly in your project
// This is just a placeholder for the font

export default function NewsletterSignup() {
    const [email, setEmail] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!email) return

        setIsSubmitting(true)
        // Here you would add your newsletter signup logic
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000))
            setEmail("")
            alert("Thank you for subscribing!")
        } catch (error) {
            console.error("Error subscribing to newsletter:", error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <section className="w-full max-w-[1418px] mx-auto bg-[#F6E8E8] py-[33px] pl-[7.5625rem] pr-[9.125rem] rounded-lg overflow-hidden mb-[9.125rem] mt-[9.375rem]">
            <div className="flex flex-col md:flex-row items-center justify-between">
                {/* Content */}
                <div className="w-full max-w-[480px] ">
                    <h2 className={`${montserratBold.className} text-[2rem] text-[#282828] mb-[3px]`}>
                        Never stop listening!
                    </h2>
                    <p className={`${montserratMedium.className} text-[1.5rem] text-[#282828] mb-[3.1875rem]`}>
                        Every episodes is a journey
                        <br />
                        you don&apos;t wanna miss out on.
                    </p>

                    <div className="relative">
                        {/* Decorative element */}
                        <div className="absolute -top-10 right-10 hidden md:block">
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M20 0C20 11.0457 11.0457 20 0 20C11.0457 20 20 28.9543 20 40C20 28.9543 28.9543 20 40 20C28.9543 20 20 11.0457 20 0Z"
                                    fill="#C4C4C4"
                                    fillOpacity="0.2"
                                />
                            </svg>
                        </div>

                        <p className={`${montserratMedium.className} text-base text-[#282828] mb-[11px]`}>
                            Get the latest headlines and unique ABR stories, sent every weekday.
                        </p>

                        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className={` ${montserratMedium.className} bg-[#D9D9D9] border-none h-13 text-[#5A5A5A] placeholder:text-[#5A5A5A] text-[14px] `}
                            />
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-[#D10000] hover:bg-[#B00000] text-white h-12 px-6 whitespace-nowrap"
                            >
                                {isSubmitting ? "Subscribing..." : "Get me in"}
                            </Button>

                            {/* Info icon */}
                            <div className="flex items-center ml-2">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="12" cy="12" r="11" stroke="#6B6B6B" strokeWidth="2" />
                                    <path d="M12 7V12M12 16V16.01" stroke="#6B6B6B" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Image */}
                <div className="w-full w-full max-w-[480px] flex justify-end">
                    {/* Decorative wave */}
                    {/* <div className="absolute left-10 top-1/2 transform -translate-y-1/2 z-10 hidden md:block">
                        <svg width="60" height="40" viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 20C10 5 20 35 30 20C40 5 50 35 60 20" stroke="#FF6B6B" strokeWidth="3" />
                        </svg>
                    </div> */}

                    <div className="relative h-[400px]  w-[404px]">
                        {/* First Image - Background */}
                        <Image
                            src="/assets/images/business-woman.png"
                            alt="People enjoying podcasts"
                            fill
                            className="object-cover rounded-full"
                            priority
                        />

                        {/* Gradient Overlay */}

                        {/* Second Image - Overlay */}
                        <div className="absolute bottom-0 top-[204px] left-[-86px] right-0 w-[218px] h-[218px]">
                            <Image
                                src="/assets/images/business-man.png"
                                alt="People enjoying podcasts"
                                fill
                                className="object-cover rounded-full"
                                priority
                            />
                        </div>

                        <div className="absolute bottom-0 top-[231px] left-[-125px] right-0 w-[68px] h-[68px]">
                            <Image
                                src="/assets/images/gradient.png"
                                alt="People enjoying podcasts"
                                fill
                                className="object-cover rounded-full"
                                priority
                            />
                        </div>
                    </div>

                    {/* <Image
              src="/placeholder.svg?height=486&width=709"
              alt="People enjoying podcasts"
              fill
              className="object-cover rounded-r-lg"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            /> */}
                </div>
            </div> 


        </section>
    )
}
