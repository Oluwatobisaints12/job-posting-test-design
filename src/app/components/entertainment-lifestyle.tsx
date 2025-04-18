import Link from "next/link"
import CategoryCard from "./category-card"
import { montserratBold } from "../../../fonts"

// Import server API function
import { getTopCategories } from "@/api"

export default async function NewsAndStorytelling() {
  const categories = await getTopCategories()

  return (
    <div className="w-full mx-auto gap-[25px] mt-[5.3125rem] overflow-x-hidden">
      <div className="flex items-center justify-between mb-[2.4375rem]">
        <h2 className={` text-[#5A5A5A] ${montserratBold.className} text-[1.5rem]`}>
            <span className="h-[16px] bg-[#CC0001] w-[3px] mr-[5px]"></span>
         Entertainment & Lifestyle

        </h2>
        <Link
          href="#"
          className="text-sm text-purple-600 flex items-center gap-1 rounded-full px-4 py-1 border border-purple-200"
        >
          View all <span className="text-xs">›</span>
        </Link>
      </div>

      <div className="flex justify-center">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-[80px]">
      {categories.slice(0, 5).map((category: { name: string; image_url: string }) => (
  <CategoryCard key={`category-${category.name}`} category={category} />
))}
      </div>
    </div>
    </div>
  )
}
