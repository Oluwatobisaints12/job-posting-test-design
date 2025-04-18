"use client"

import { useState } from "react"
import { PodcastGrid } from "./podcast-grid"
import { CategorySection } from "./category-section"
import { montserratExtraBold, montserratMedium } from "../../../fonts"
import { useTopCategories } from "@/hooks/useCategories"
import { useSearchParams } from "next/navigation"

export default function AllPodcast() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("Popular")

  // Get search query from URL params (from the layout search)
  const searchParams = useSearchParams()
  const searchQuery = searchParams?.get("q") || ""

  // Fetch categories for the dropdown
  const { data: categories = [] } = useTopCategories()

  // Handle category selection
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value)
  }

  // Handle sort selection
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value)
  }

  return (
    <main className="container max-w-[1355px] w-full mx-auto px-4 py-8">
      <h1 className={`${montserratExtraBold.className} text-[#5A5A5A] text-[1.75rem] text-center sm:text-left`}>ALL PODCASTS</h1>
      <div className="border-b border-[#DCDCDC] mb-8 w-full mt-[1rem]"></div>

      <div className="flex flex-col sm:flex-row flex-wrap items-center gap-4 mb-6">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className={`${montserratMedium.className} text-[1rem] text-[#5A5A5A]`}>Sort by:</span>
          <div className="relative flex-grow sm:flex-grow-0">
            <select
              className={`${montserratMedium.className} text-[1rem] border border-gray-300 rounded-md p-2 w-full`}
              value={sortBy}
              onChange={handleSortChange}
            >
              <option value="Popular">Popular</option>
              <option value="Recent">Recent</option>
              <option value="A-Z">A-Z</option>
            </select>
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs pointer-events-none">▼</span>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className={`${montserratMedium.className} text-[1rem] text-[#5A5A5A]`}>Filter by category:</span>
          <div className="relative flex-grow sm:flex-grow-0">
            <select
              className={`${montserratMedium.className} text-[1rem] border border-gray-300 rounded-md p-2 w-full`}
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="All">All</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs pointer-events-none">▼</span>
          </div>
        </div>
      </div>

      {(searchQuery || selectedCategory !== "All") && (
        <div className="mb-6 p-3 bg-gray-100 rounded-md">
          <p className="text-gray-700">
            {searchQuery && (
              <>Search results for: <span className="font-semibold">"{searchQuery}"</span>{selectedCategory !== "All" && " in "}</>
            )}
            {selectedCategory !== "All" && (
              <>Category: <span className="font-semibold">{selectedCategory}</span></>
            )}
          </p>
        </div>
      )}

      <PodcastGrid
        searchQuery={searchQuery}
        categoryFilter={selectedCategory === "All" ? "" : selectedCategory}
        sortBy={sortBy}
      />

      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6 text-center sm:text-left">Explore categories</h2>
        <p className="text-gray-600 mb-6">Browse our curated selection of podcast categories</p>
        <CategorySection />
      </div>
    </main>
  )
}
