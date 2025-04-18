import React, { Suspense } from 'react'
import AllPodcast from '../components/all-podcast'
import { montserratExtraBold } from '../../../fonts'

// Loading component
function Loading() {
  return (
    <div className="container max-w-[1355px] w-full mx-auto px-4 py-8">
      <h1 className={`${montserratExtraBold.className} text-[#5A5A5A] text-[1.75rem] text-center sm:text-left`}>ALL PODCASTS</h1>
      <div className="border-b border-[#DCDCDC] mb-8 w-full mt-[1rem]"></div>
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-pulse text-xl">Loading podcasts...</div>
      </div>
    </div>
  )
}

const page = () => {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <AllPodcast />
      </Suspense>
    </div>
  )
}

export default page
