import Link from "next/link"
import Image from "next/image"
import { format } from "date-fns"
import type { ArticleEntity } from "@/types/strapi-types"

interface ArticleCardProps {
  article: ArticleEntity
  type?: "article" | "featured"
  className?: string
}

export default function ArticleCard({ article, type = "article", className = "" }: ArticleCardProps) {
  // Add safety check
  if (!article || !article.attributes) {
    console.error('ArticleCard received invalid article data:', article)
    return (
      <div className="bg-gray-100 p-4 rounded-lg">
        <p className="text-gray-500">Article data unavailable</p>
      </div>
    )
  }

  const { title, slug, excerpt, image, category, date, image_path } = article.attributes

  const imageUrl = image?.data?.attributes?.url || image_path || "/placeholder.png"
  const categoryName = category?.data?.attributes?.name || "Uncategorized"
  const categorySlug = category?.data?.attributes?.slug || ""

  const formattedDate = date ? format(new Date(date), "MMM dd, yyyy") : "No date"

  return (
    <div className={`flex flex-col rounded-lg shadow-md overflow-hidden ${className}`}>
      <div className="flex-shrink-0">
        <Image
          className="h-48 w-full object-cover"
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          width={600}
          height={300}
        />
      </div>
      <div className="flex-1 bg-white p-6 flex flex-col justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-indigo-600">
            <Link href={`/category/${categorySlug}`} className="hover:underline">
              {categoryName}
            </Link>
          </p>
          <Link href={`/article/${slug}`} className="hover:underline">
            <div className="block mt-2">
              <p className="text-xl font-semibold text-gray-900">{title}</p>
              <p className="mt-3 text-base text-gray-500">{excerpt}</p>
            </div>
          </Link>
        </div>
        <div className="mt-6 flex items-center">
          <div className="flex-shrink-0">
            <span className="sr-only">{title}</span>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">
              <Link href={`/article/${slug}`} className="hover:underline">
                {/* {author.name} */}
              </Link>
            </p>
            <div className="flex space-x-1 text-sm text-gray-500">
              <time dateTime={date}>{formattedDate}</time>
              {/* <span aria-hidden="true">&middot;</span>
              <span>6 min read</span> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}