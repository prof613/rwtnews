"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import type { MemeEntity } from "@/types" // Assuming MemeEntity is defined
import { Maximize2 } from "lucide-react" // Icon for "view larger" or modal trigger

type MemeCardProps = {
  meme: MemeEntity
  className?: string
  // Add onClick prop if implementing a modal view for memes
  onClick?: (meme: MemeEntity) => void
}

export default function MemeCard({ meme, className = "", onClick }: MemeCardProps) {
  const { title, image, image_path, slug } = meme.attributes // Assuming memes might have a slug for a detail page or direct link

  // Determine image URL
  let imageUrl = "/images/core/placeholder.jpg" // Default placeholder
  if (image?.data?.attributes?.url) {
    imageUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL}${image.data.attributes.url}`
  } else if (image_path) {
    imageUrl = image_path.startsWith("http") ? image_path : `${process.env.NEXT_PUBLIC_STRAPI_URL}${image_path}`
  }

  // Memes might link to their category page or a specific meme page if one exists.
  // For now, let's assume they link to the meme/cartoons category page,
  // or trigger an onClick for a modal if provided.
  const memeLinkHref = `/categories/meme-cartoons` // Default link
  // If you implement individual meme pages: `/memes/${slug}`

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (onClick) {
      e.preventDefault() // Prevent link navigation if onClick is defined for modal
      onClick(meme)
    }
  }

  const CardContent = () => (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl group relative ${className}`}
      onClick={onClick ? handleCardClick : undefined}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") handleCardClick(e as any)
            }
          : undefined
      }
    >
      <div className="relative w-full aspect-square overflow-hidden">
        {" "}
        {/* Memes are often square or portrait */}
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={title || "Meme"}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" // Adjust based on grid layout
          className="object-contain group-hover:scale-105 transition-transform duration-300 ease-in-out" // object-contain is often better for memes
        />
      </div>
      {/* Optional: Overlay for title or actions, e.g., view larger */}
      {onClick && (
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300 flex items-center justify-center">
          <Maximize2 size={48} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      )}
      {title &&
        !onClick && ( // Show title if not using modal click, or style it differently
          <div className="p-2 text-center">
            <p className="text-xs text-gray-600 truncate">{title}</p>
          </div>
        )}
    </div>
  )

  // If onClick (for modal) is defined, the card itself is the button.
  // Otherwise, wrap with a Link.
  if (onClick) {
    return <CardContent />
  }

  return (
    <Link href={memeLinkHref} className="block">
      <CardContent />
    </Link>
  )
}
