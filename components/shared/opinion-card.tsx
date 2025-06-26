import Link from "next/link"
import Image from "next/image"
import type { OpinionEntity } from "@/types" // Assuming OpinionEntity is defined
import { formatDate } from "@/lib/formatters"
import { MessageSquare, UserCircle, CalendarDays } from "lucide-react" // Icons

type OpinionCardProps = {
  opinion: OpinionEntity
  className?: string
}

export default function OpinionCard({ opinion, className = "" }: OpinionCardProps) {
  const { title, slug, excerpt, featured_image, image_path, author, date, secondary_category } = opinion.attributes

  const secondaryCategoryName = secondary_category?.data?.attributes?.name
  const secondaryCategorySlug = secondaryCategoryName?.toLowerCase().replace(/\s+/g, "-")

  // Determine image URL
  let imageUrl = "/images/core/placeholder.jpg" // Default placeholder
  if (featured_image?.data?.attributes?.url) {
    imageUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL}${featured_image.data.attributes.url}`
  } else if (image_path) {
    imageUrl = image_path.startsWith("http") ? image_path : `${process.env.NEXT_PUBLIC_STRAPI_URL}${image_path}`
  }

  const opinionUrl = `/opinions/${slug}`

  return (
    <article
      className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl group ${className}`}
    >
      <Link href={opinionUrl} className="block">
        <div className="relative w-full aspect-video overflow-hidden">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={title || "Opinion piece image"}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
          />
        </div>
      </Link>
      <div className="p-4 md:p-5">
        <div className="mb-2 flex flex-wrap items-center text-xs text-gray-500 gap-x-3 gap-y-1">
          {/* Opinion Tag */}
          <Link
            href="/categories/opinion"
            className="flex items-center font-medium text-rwt-blue hover:text-rwt-red transition-colors"
          >
            <MessageSquare size={14} className="mr-1" />
            Opinion
          </Link>

          {/* Secondary Category, if exists */}
          {secondaryCategoryName && secondaryCategorySlug && (
            <>
              <span className="text-gray-300">|</span>
              <Link href={`/categories/${secondaryCategorySlug}`} className="hover:text-rwt-red transition-colors">
                {secondaryCategoryName}
              </Link>
            </>
          )}
        </div>

        <Link href={opinionUrl}>
          <h3 className="text-lg md:text-xl font-semibold text-rwt-blue group-hover:text-rwt-red transition-colors leading-tight line-clamp-3">
            {title}
          </h3>
        </Link>

        {author && (
          <div className="mt-2 flex items-center text-xs text-gray-600">
            <UserCircle size={14} className="mr-1 text-rwt-red" />
            <span>By {author}</span>
          </div>
        )}

        {date && (
          <div className="mt-1 flex items-center text-xs text-gray-500">
            <CalendarDays size={14} className="mr-1" />
            <span>{formatDate(date)}</span>
          </div>
        )}

        {excerpt && <p className="mt-3 text-sm text-gray-700 line-clamp-3 leading-relaxed">{excerpt}</p>}

        <Link
          href={opinionUrl}
          className="inline-block mt-4 text-sm font-medium text-rwt-red hover:underline group-hover:translate-x-1 transition-transform"
        >
          Read Opinion &rarr;
        </Link>
      </div>
    </article>
  )
}
