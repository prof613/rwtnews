"use client"
import { notFound } from "next/navigation"
import Image from "next/image"
import { Suspense } from "react"
import { fetchArticleBySlug, fetchRelatedArticles } from "@/lib/strapi"
import { formatDate } from "@/lib/formatters"
import Breadcrumbs from "@/components/shared/breadcrumbs"
import SocialShareButtons from "@/components/shared/social-share-buttons"
import EngagementButtons from "@/components/shared/engagement-buttons"
import ArticleCard from "@/components/shared/article-card"
import { RichTextRenderer } from "@/components/shared/rich-text-renderer" // We'll create this
import { PageSpinner } from "@/components/shared/spinners"

type Props = {
  params: { slug: string }
}

// Component for displaying related articles
async function RelatedArticles({
  articleId,
  tags,
  primaryCategoryId,
}: { articleId: number; tags?: { data: { id: number; attributes: { name: string } }[] }; primaryCategoryId?: number }) {
  const related = await fetchRelatedArticles(articleId, tags, primaryCategoryId)

  if (!related || related.length === 0) {
    return null
  }

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold text-rwt-blue mb-4">Related Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {related.map((relatedArticle) => (
          <ArticleCard key={relatedArticle.id} article={relatedArticle} type="article" />
        ))}
      </div>
    </section>
  )
}

export default async function ArticlePageClient({ params }: Props) {
  const article = await fetchArticleBySlug(params.slug)

  if (!article) {
    notFound() // Triggers the not-found.tsx page
  }

  const {
    title,
    quote,
    author,
    date,
    updatedAt,
    rich_body,
    image,
    category,
    secondary_category,
    word_count,
    read_time,
    tags,
  } = article.attributes

  const primaryCategoryName = category?.data?.attributes?.name
  const secondaryCategoryName = secondary_category?.data?.attributes?.name

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    ...(primaryCategoryName
      ? [{ label: primaryCategoryName, href: `/categories/${primaryCategoryName.toLowerCase().replace(/\s+/g, "-")}` }]
      : []),
    { label: title, href: `/articles/${params.slug}` }, // Current page, not a link
  ]

  const imageUrl = image?.data?.attributes?.url
    ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${image.data.attributes.url}`
    : article.attributes.image_path
      ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${article.attributes.image_path}`
      : "/images/core/placeholder.jpg"

  const authorImageUrl = article.attributes.author_image?.data?.attributes?.url
    ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${article.attributes.author_image.data.attributes.url}`
    : "/images/staff/authors/placeholder-author.jpg"

  const currentUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/articles/${params.slug}`

  return (
    <article className="py-8">
      <Breadcrumbs items={breadcrumbItems} />

      {/* Categories Display */}
      <div className="my-2 text-sm text-gray-600">
        {primaryCategoryName && <span className="font-semibold">{primaryCategoryName}</span>}
        {secondaryCategoryName && primaryCategoryName && " - "}
        {secondaryCategoryName && <span className="font-semibold">{secondaryCategoryName}</span>}
      </div>

      <h1 className="text-4xl font-bold text-rwt-blue mb-3 leading-tight">{title}</h1>

      {quote && (
        <p className="text-lg italic text-gray-700 border-l-4 border-rwt-red pl-4 py-2 my-4 bg-gray-50 rounded">
          {quote}
        </p>
      )}

      {/* Author and Date Info */}
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
        {updatedAt &&
          new Date(updatedAt).getTime() > new Date(date).getTime() + 60000 && ( // Show if updated more than 1 min after publish
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

      {/* Featured Image */}
      <div className="my-6">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          width={1200} // Adjust as needed for your design
          height={675} // 16:9 aspect ratio
          className="w-full h-auto object-cover rounded-lg shadow-md"
          priority // Prioritize loading for LCP
        />
      </div>

      {/* Engagement Buttons (Like, Comment, Share) */}
      <div className="my-6 flex items-center space-x-4 border-y py-3">
        <EngagementButtons articleId={article.id} contentType="article" />
        <SocialShareButtons url={currentUrl} title={title} />
        {/* Print option can be a simple JS window.print() or a more complex component */}
        <button
          onClick={() => typeof window !== "undefined" && window.print()}
          className="text-gray-600 hover:text-rwt-blue flex items-center"
        >
          {/* <Printer size={20} className="mr-1" /> Print (Using Lucide Icon) */}
          Print
        </button>
      </div>

      {/* Article Body */}
      <div className="prose prose-lg max-w-none dark:prose-invert">
        {/* prose-lg for larger text, max-w-none to take full width */}
        {/* dark:prose-invert for basic dark mode compatibility if ever enabled */}
        <RichTextRenderer content={rich_body} />
      </div>

      {/* Related Articles Section */}
      <Suspense fallback={<PageSpinner message="Loading related articles..." />}>
        <RelatedArticles articleId={article.id} tags={tags} primaryCategoryId={category?.data?.id} />
      </Suspense>
    </article>
  )
}
