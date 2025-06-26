import type { Metadata, ResolvingMetadata } from "next"
import { fetchOpinionBySlug } from "@/lib/strapi"
import OpinionPageClient from "./OpinionPageClient" // We'll create this client component

type Props = {
  params: { slug: string }
}

// Generate metadata dynamically
export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const opinion = await fetchOpinionBySlug(params.slug)

  if (!opinion) {
    return {
      title: "Opinion Not Found",
    }
  }

  const previousImages = (await parent).openGraph?.images || []
  const imageUrl = opinion.attributes.featured_image?.data?.attributes?.url
    ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${opinion.attributes.featured_image.data.attributes.url}`
    : opinion.attributes.image_path // Fallback to image_path if featured_image is not present
      ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${opinion.attributes.image_path}`
      : "/images/core/placeholder.jpg" // Default fallback image

  return {
    title: opinion.attributes.title,
    description:
      opinion.attributes.excerpt || opinion.attributes.quote || "Read this opinion on Red, White and True News.",
    openGraph: {
      title: opinion.attributes.title,
      description: opinion.attributes.excerpt || opinion.attributes.quote,
      images: [imageUrl, ...previousImages],
      type: "article", // Opinions are still articles in terms of OG type
      publishedTime: opinion.attributes.date,
      authors: opinion.attributes.author ? [opinion.attributes.author] : [],
      // Add tags if available: opinion.attributes.tags?.data?.map(t => t.attributes.name)
    },
    twitter: {
      card: "summary_large_image",
      title: opinion.attributes.title,
      description: opinion.attributes.excerpt || opinion.attributes.quote,
      images: [imageUrl],
    },
  }
}

export default function OpinionPage({ params }: Props) {
  // This Server Component will fetch data and pass it to a Client Component
  // to allow for potential client-side interactions in the future.
  return <OpinionPageClient params={params} />
}
