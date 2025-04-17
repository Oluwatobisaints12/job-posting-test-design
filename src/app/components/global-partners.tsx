import React from 'react'
import Image from 'next/image'
import { montserratExtraBold } from '../../../fonts';


export default function GlobalPartners() {
  // Partner data to make the component more maintainable
  const partnerRows = [
    [
      { src: "/assets/images/world-bank.png", alt: "World Bank", width: 176, height: 99 },
      { src: "/assets/images/foundation.png", alt: "Foundation", width: 318, height: 56 },
      { src: "/assets/images/nedbank.png", alt: "Nedbank", width: 178, height: 102 },
      { src: "/assets/images/fledge.png", alt: "Fledge", width: 222, height: 78 },
    ],
    [
      { src: "/assets/images/pan-aliament.png", alt: "Pan Aliament", width: 176, height: 124 },
      { src: "/assets/images/business.png", alt: "Business", width: 214, height: 44 },
      { src: "/assets/images/hub-lagos.png", alt: "Hub Lagos", width: 178, height: 85 },
      { src: "/assets/images/africa.png", alt: "Africa", width: 179, height: 114 },
      { src: "/assets/images/mic.png", alt: "Mic", width: 158, height: 118 },
    ],
    [
      { src: "/assets/images/embassy.png", alt: "Embassy", width: 109, height: 109 },
      { src: "/assets/images/workspace.png", alt: "Workspace", width: 246, height: 116 },
      { src: "/assets/images/signal.png", alt: "Signal", width: 91, height: 91 },
      { src: "/assets/images/south-africa.png", alt: "South Africa", width: 226, height: 72 },
      { src: "/assets/images/absa.png", alt: "ABSA", width: 108, height: 67 },
      { src: "/assets/images/sapna.png", alt: "Sapna", width: 105, height: 105 },
    ],
  ]

  return (
    <div className="w-full max-w-[1262px] mx-auto px-4 sm:px-6 md:px-8 mb-12 md:mb-[7.9375rem]">
      <h1
        className={`${montserratExtraBold.className} text-[1.25rem] md:text-[1.5rem] text-[#282828] text-center mb-8 md:mb-[2.625rem]`}
      >
        OUR GLOBAL PARTNERS
      </h1>

      {/* Responsive partner grid */}
      <div className="space-y-8 md:space-y-12">
        {/* First row */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-[1078px] mx-auto">
          {partnerRows[0].map((partner, index) => (
            <div key={index} className="flex items-center justify-center">
              <div className="relative h-[60px] sm:h-[80px] md:h-[100px] w-full">
                <Image
                  src={partner.src || "/placeholder.svg"}
                  alt={partner.alt}
                  fill
                  sizes="(max-width: 640px) 150px, (max-width: 768px) 200px, 250px"
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Second row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 md:gap-8 max-w-[1117px] mx-auto">
          {partnerRows[1].map((partner, index) => (
            <div key={index} className="flex items-center justify-center">
              <div className="relative h-[60px] sm:h-[80px] md:h-[100px] w-full">
                <Image
                  src={partner.src || "/placeholder.svg"}
                  alt={partner.alt}
                  fill
                  sizes="(max-width: 640px) 150px, (max-width: 768px) 200px, 250px"
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Third row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 md:gap-8 mx-auto">
          {partnerRows[2].map((partner, index) => (
            <div key={index} className="flex items-center justify-center">
              <div className="relative h-[60px] sm:h-[80px] md:h-[100px] w-full">
                <Image
                  src={partner.src || "/placeholder.svg"}
                  alt={partner.alt}
                  fill
                  sizes="(max-width: 640px) 150px, (max-width: 768px) 200px, 250px"
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

