import type { Metadata, ResolvingMetadata } from "next"
import { fetchArticleBySlug } from "@/lib/strapi"
import ArticlePageClient from "./ArticlePageClient"

type Props = {
  params: { slug: string }
}

// Generate metadata dynamically
export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const article = await fetchArticleBySlug(params.slug)

  if (!article) {
    return {
      title: "Article Not Found",
    }
  }

  const previousImages = (await parent).openGraph?.images || []
  const imageUrl = article.attributes.image?.data?.attributes?.url
    ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${article.attributes.image.data.attributes.url}`
    : article.attributes.image_path
      ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${article.attributes.image_path}`
      : "/images/core/placeholder.jpg" // Fallback image

  return {
    title: article.attributes.title,
    description:
      article.attributes.excerpt || article.attributes.quote || "Read this article on Red, White and True News.",
    openGraph: {
      title: article.attributes.title,
      description: article.attributes.excerpt || article.attributes.quote,
      images: [imageUrl, ...previousImages],
      type: "article",
      publishedTime: article.attributes.date,
      authors: article.attributes.author ? [article.attributes.author] : [],
      // Add tags if available: article.attributes.tags?.data?.map(t => t.attributes.name)
    },
    twitter: {
      card: "summary_large_image",
      title: article.attributes.title,
      description: article.attributes.excerpt || article.attributes.quote,
      images: [imageUrl],
    },
  }
}

export default function ArticlePage({ params }: Props) {
  return <ArticlePageClient params={params} />
}
