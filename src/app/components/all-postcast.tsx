import { PodcastGrid } from "../components/podcast-grid"
import { CategorySection } from "../components/category-section"
import { montserratExtraBold, montserratMedium, montserratMediumItalic } from "../../../fonts"

export default function AllPodcast() {
  return (
    <main className="container max-w-[1355px] w-full mx-auto px-4 py-8">
      <h1 className={` ${montserratExtraBold.className} text-[#5A5A5A] text-[1.75rem]`}>ALL PODCASTS</h1>
      <div className="border-b border-[#DCDCDC] mb-8 w-full mt-[1rem]" ></div>

      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <span className={` ${montserratMedium.className} text-[1rem] text-[#5A5A5A]`}>Sort by:</span>
          <div className="relative">
            <select className={` ${montserratMedium.className} text-[1rem]`}>
              <option>Popular</option>
              <option>Recent</option>
              <option>A-Z</option>
            </select>
            <span className="absolute right-0 top-1/2 -translate-y-1/2">▼</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
        <span className={` ${montserratMedium.className} text-[1rem] text-[#5A5A5A]`}>Sort by category:</span>
          <div className="relative">
            <select className={` ${montserratMedium.className} text-[1rem]`}>
              <option>All</option>
              <option>Education</option>
              <option>Business</option>
              <option>Technology</option>
              <option>Society & Culture</option>
            </select>
            <span className="absolute right-0 top-1/2 -translate-y-1/2">▼</span>
          </div>
        </div>
      </div>

      <PodcastGrid />

      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Explore other categories</h2>
        <CategorySection />
      </div>
    </main>
  )
}
