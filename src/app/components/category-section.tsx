import Image from "next/image"
import Link from "next/link"

interface Category {
  id: string
  title: string
  image: string
}

const categories: Category[] = [
  {
    id: "news",
    title: "News & Storytelling",
    image: "/placeholder.svg?height=200&width=400&text=News",
  },
  {
    id: "entertainment",
    title: "Entertainment & Lifestyle",
    image: "/placeholder.svg?height=200&width=400&text=Entertainment",
  },
  {
    id: "tech",
    title: "Tech, Sport & Business",
    image: "/placeholder.svg?height=200&width=400&text=Tech",
  },
  {
    id: "other",
    title: "Other podcasts",
    image: "/placeholder.svg?height=200&width=400&text=Other",
  },
]

export function CategorySection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {categories.map((category) => (
        <Link key={category.id} href={`/category/${category.id}`} className="relative overflow-hidden rounded-lg group">
          <div className="aspect-[4/3] relative">
            <Image
              src={category.image || "/placeholder.svg"}
              alt={category.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-4">
              <h3 className="text-white font-bold text-lg">{category.title}</h3>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
