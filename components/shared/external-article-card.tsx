import Image from "next/image"
import type { ExternalArticleEntity } from "@/types" // Assuming ExternalArticleEntity is defined
import { ExternalLink, Globe } from "lucide-react" // Icons

type ExternalArticleCardProps = {
  externalArticle: ExternalArticleEntity
  className?: string
}

export default function ExternalArticleCard({ externalArticle, className = "" }: ExternalArticleCardProps) {
  const { title, url, source, image_url, excerpt } = externalArticle.attributes

  // Use a placeholder if no image_url is provided
  const imageUrl = image_url || "/images/core/placeholder.jpg"

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex flex-col sm:flex-row items-center bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl group ${className}`}
    >
      {/* Image Section */}
      <div className="relative w-full sm:w-1/3 aspect-video sm:aspect-square flex-shrink-0">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={title || "External article image"}
          fill
          sizes="(max-width: 640px) 100vw, 33vw"
          className="object-cover"
          // Note: The hostname for this image's 'src' must be added to next.config.mjs
        />
      </div>

      {/* Content Section */}
      <div className="p-4 md:p-5 flex flex-col justify-between self-stretch">
        <div>
          {source && (
            <div className="mb-1 flex items-center text-xs text-gray-500">
              <Globe size={14} className="mr-1.5 text-rwt-red" />
              <span className="font-medium">via {source}</span>
            </div>
          )}

          <h3 className="text-md md:text-lg font-semibold text-rwt-blue group-hover:text-rwt-red transition-colors leading-tight line-clamp-3">
            {title}
          </h3>

          {excerpt && <p className="mt-2 text-sm text-gray-700 line-clamp-2 leading-relaxed">{excerpt}</p>}
        </div>

        <div className="mt-3 flex items-center text-sm font-medium text-rwt-red group-hover:underline">
          Read on {source || "Source"}
          <ExternalLink size={16} className="ml-1.5" />
        </div>
      </div>
    </a>
  )
}
