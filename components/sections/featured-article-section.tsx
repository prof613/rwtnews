import Link from "next/link"
import Image from "next/image"
import { fetchFeaturedArticles } from "@/lib/strapi" // Assuming this function fetches featured articles
import type { ArticleEntity } from "@/types"
import { formatDate } from "@/lib/formatters"
import { Tag, CalendarDays, ArrowRight } from "lucide-react"

export default async function FeaturedArticleSection() {
  // Fetch one primary featured article.
  // Adjust the fetchFeaturedArticles function or add a new one if you need more specific logic
  // (e.g., fetch a single "hero" article).
  const featuredArticles = await fetchFeaturedArticles({ limit: 1, sort: "date:desc" })

  if (!featuredArticles || featuredArticles.length === 0) {
    return (
      <section className="py-8 text-center">
        <p className="text-gray-600">No featured article available at the moment.</p>
      </section>
    )
  }

  const article: ArticleEntity = featuredArticles[0]
  const { title, slug, excerpt, image, category, date, image_path } = article.attributes

  const primaryCategoryName = category?.data?.attributes?.name
  const primaryCategorySlug = primaryCategoryName?.toLowerCase().replace(/\s+/g, "-")

  let imageUrl = "/images/core/placeholder.jpg" // Default placeholder
  if (image?.data?.attributes?.url) {
    imageUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL}${image.data.attributes.url}`
  } else if (image_path) {
    imageUrl = image_path.startsWith("http") ? image_path : `${process.env.NEXT_PUBLIC_STRAPI_URL}${image_path}`
  }

  const articleUrl = `/articles/${slug}`

  return (
    <section className="py-6 md:py-8 group">
      <Link
        href={articleUrl}
        className="block md:flex gap-6 items-center bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
      >
        {/* Image Section */}
        <div className="md:w-1/2 lg:w-3/5 flex-shrink-0 mb-4 md:mb-0">
          <div className="relative w-full aspect-video overflow-hidden rounded-md">
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt={title || "Featured article image"}
              fill
              priority // This is likely an LCP element
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 60vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="md:w-1/2 lg:w-2/5">
          {primaryCategoryName && primaryCategorySlug && (
            <Link
              href={`/categories/${primaryCategorySlug}`}
              className="inline-flex items-center text-xs text-rwt-red font-semibold uppercase tracking-wider mb-2 hover:underline"
            >
              <Tag size={14} className="mr-1.5" />
              {primaryCategoryName}
            </Link>
          )}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-rwt-blue group-hover:text-rwt-red transition-colors mb-3 leading-tight">
            {title}
          </h2>

          {date && (
            <div className="flex items-center text-sm text-gray-500 mb-3">
              <CalendarDays size={16} className="mr-1.5 text-gray-400" />
              <span>{formatDate(date)}</span>
            </div>
          )}

          {excerpt && <p className="text-gray-700 mb-4 line-clamp-3 sm:line-clamp-4 leading-relaxed">{excerpt}</p>}

          <div className="inline-flex items-center text-md font-semibold text-rwt-red group-hover:underline">
            Read Full Story
            <ArrowRight size={18} className="ml-1.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    </section>
  )
}
