"use client"

import { notFound } from "next/navigation"
import Image from "next/image"
import { Suspense, useEffect, useState } from "react"
import { fetchOpinionBySlug, fetchRelatedOpinions } from "@/lib/strapi" // Assuming fetchRelatedOpinions exists or will be created
import { formatDate } from "@/lib/formatters"
import Breadcrumbs from "@/components/shared/breadcrumbs"
import SocialShareButtons from "@/components/shared/social-share-buttons"
import EngagementButtons from "@/components/shared/engagement-buttons"
import OpinionCard from "@/components/shared/opinion-card" // Assuming OpinionCard for related items
import { RichTextRenderer } from "@/components/shared/rich-text-renderer"
import { PageSpinner } from "@/components/shared/spinners"
import type { OpinionEntity } from "@/types" // Assuming OpinionEntity type

type Props = {
  params: { slug: string }
}

// Component for displaying related opinions
async function RelatedOpinions({
  opinionId,
  tags,
  secondaryCategoryId,
}: {
  opinionId: number
  tags?: { data: { id: number; attributes: { name: string } }[] }
  secondaryCategoryId?: number
}) {
  const related = await fetchRelatedOpinions(opinionId, tags, secondaryCategoryId) // You'll need to implement fetchRelatedOpinions

  if (!related || related.length === 0) {
    return null
  }

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold text-rwt-blue mb-4">Related Opinions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {related.map((relatedOpinion) => (
          <OpinionCard key={relatedOpinion.id} opinion={relatedOpinion} />
        ))}
      </div>
    </section>
  )
}

export default function OpinionPageClient({ params }: Props) {
  const [opinion, setOpinion] = useState<OpinionEntity | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadOpinion() {
      setIsLoading(true)
      try {
        const fetchedOpinion = await fetchOpinionBySlug(params.slug)
        if (!fetchedOpinion) {
          notFound()
        }
        setOpinion(fetchedOpinion)
      } catch (error) {
        console.error("Failed to fetch opinion:", error)
        // Potentially redirect to an error page or show an error message
        notFound() // Or a more specific error handling
      }
      setIsLoading(false)
    }
    if (params.slug) {
      loadOpinion()
    }
  }, [params.slug])

  if (isLoading) {
    return <PageSpinner message="Loading opinion..." />
  }

  if (!opinion) {
    // This case should ideally be handled by notFound in useEffect,
    // but as a fallback or if notFound doesn't behave as expected in client component initial render.
    return notFound()
  }

  const {
    title,
    quote,
    author,
    date,
    updatedAt,
    rich_body,
    featured_image, // Prioritize this
    image_path, // Fallback
    secondary_category, // Opinions have "Opinion" as primary, so we focus on secondary
    word_count,
    read_time,
    tags,
  } = opinion.attributes

  const secondaryCategoryName = secondary_category?.data?.attributes?.name

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Opinion", href: "/categories/opinion" }, // Hardcoded "Opinion" category link
    ...(secondaryCategoryName
      ? [
          {
            label: secondaryCategoryName,
            href: `/categories/${secondaryCategoryName.toLowerCase().replace(/\s+/g, "-")}`,
          },
        ]
      : []),
    { label: title, href: `/opinions/${params.slug}` },
  ]

  const imageUrl = featured_image?.data?.attributes?.url
    ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${featured_image.data.attributes.url}`
    : image_path
      ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${image_path}`
      : "/images/core/placeholder.jpg"

  const authorImageUrl = opinion.attributes.author_image?.data?.attributes?.url
    ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${opinion.attributes.author_image.data.attributes.url}`
    : "/images/staff/authors/placeholder-author.jpg"

  const currentUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/opinions/${params.slug}`

  return (
    <article className="py-8">
      <Breadcrumbs items={breadcrumbItems} />

      <div className="my-2 text-sm text-gray-600">
        <span className="font-semibold">Opinion</span>
        {secondaryCategoryName && " - "}
        {secondaryCategoryName && <span className="font-semibold">{secondaryCategoryName}</span>}
      </div>

      <h1 className="text-4xl font-bold text-rwt-blue mb-3 leading-tight">{title}</h1>

      {quote && (
        <p className="text-lg italic text-gray-700 border-l-4 border-rwt-red pl-4 py-2 my-4 bg-gray-50 rounded">
          {quote}
        </p>
      )}

      <div className="flex items-center space-x-3 my-4 text-sm text-gray-700">
        {author && (
          <div className="flex items-center">
            <Image
              src={authorImageUrl || "/placeholder.svg"}
              alt={author || "Author"}
              width={40}
              height={40}
              className="rounded-full mr-2 object-cover"
            />
            <span className="font-semibold">{author}</span>
          </div>
        )}
        <span>•</span>
        <span>Published: {formatDate(date)}</span>
        {updatedAt && new Date(updatedAt).getTime() > new Date(date).getTime() + 60000 && (
          <>
            <span>•</span>
            <span>Updated: {formatDate(updatedAt)}</span>
          </>
        )}
        {word_count && (
          <>
            <span>•</span>
            <span>{word_count} words</span>
          </>
        )}
        {read_time && (
          <>
            <span>•</span>
            <span>{read_time} min read</span>
          </>
        )}
      </div>

      <div className="my-6">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          width={1200}
          height={675}
          className="w-full h-auto object-cover rounded-lg shadow-md"
          priority
        />
      </div>

      <div className="my-6 flex items-center space-x-4 border-y py-3">
        <EngagementButtons articleId={opinion.id} contentType="opinion" />
        <SocialShareButtons url={currentUrl} title={title} />
        <button
          onClick={() => typeof window !== "undefined" && window.print()}
          className="text-gray-600 hover:text-rwt-blue flex items-center"
        >
          {/* <Printer size={20} className="mr-1" /> Print */}
          Print
        </button>
      </div>

      <div className="prose prose-lg max-w-none dark:prose-invert">
        <RichTextRenderer content={rich_body} />
      </div>

      <Suspense fallback={<PageSpinner message="Loading related opinions..." />}>
        <RelatedOpinions opinionId={opinion.id} tags={tags} secondaryCategoryId={secondary_category?.data?.id} />
      </Suspense>
    </article>
  )
}
