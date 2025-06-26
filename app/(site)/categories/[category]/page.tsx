import type { Metadata } from "next"
import { Suspense } from "react"
import { notFound } from "next/navigation"
import { fetchItemsForCategory, getCategoryDisplayName, isValidCategory } from "@/lib/strapi" // We'll need to implement/refine these
import Breadcrumbs from "@/components/shared/breadcrumbs"
import ArticleCard from "@/components/shared/article-card"
import OpinionCard from "@/components/shared/opinion-card"
import MemeCard from "@/components/shared/meme-card"
import ExternalArticleCard from "@/components/shared/external-article-card"
import PaginationControls from "@/components/shared/pagination-controls"
import { PageSpinner } from "@/components/shared/spinners"
import type { ArticleEntity, OpinionEntity, MemeEntity, ExternalArticleEntity } from "@/types"

type Props = {
  params: { category: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const categorySlug = params.category
  if (!isValidCategory(categorySlug)) {
    // This check should be robust in lib/strapi.ts
    return {
      title: "Category Not Found",
    }
  }
  const displayName = getCategoryDisplayName(categorySlug)
  return {
    title: `${displayName} Archives`,
    description: `Browse ${displayName} on Red, White and True News.`,
  }
}

// Helper to render the correct card based on item type
const ItemCard = ({ item }: { item: ArticleEntity | OpinionEntity | MemeEntity | ExternalArticleEntity }) => {
  switch (
    item.attributes.contentType // Assuming contentType is added in strapi.ts when fetching
  ) {
    case "article":
      return <ArticleCard article={item as ArticleEntity} type="article" />
    case "opinion":
      return <OpinionCard opinion={item as OpinionEntity} />
    case "meme":
      return <MemeCard meme={item as MemeEntity} />
    case "external-article":
      return <ExternalArticleCard externalArticle={item as ExternalArticleEntity} />
    default:
      return null
  }
}

async function CategoryContent({ categorySlug, currentPage }: { categorySlug: string; currentPage: number }) {
  const { items, pagination } = await fetchItemsForCategory(categorySlug, currentPage)

  if (!items || items.length === 0) {
    return <p className="text-center text-gray-600 mt-8">No items found in this category.</p>
  }

  const displayName = getCategoryDisplayName(categorySlug)

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Categories", href: "/categories/all" }, // Or just a non-linked "Categories"
    { label: displayName, href: `/categories/${categorySlug}` },
  ]

  // Determine layout based on category
  let layoutClass = "grid grid-cols-1 gap-8" // Default single column for articles/opinions
  if (categorySlug === "news-from-web") {
    layoutClass = "grid grid-cols-1 md:grid-cols-2 gap-6" // 2 columns for external links
  } else if (categorySlug === "meme-cartoons") {
    layoutClass = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4" // Up to 3 columns for memes
  }

  return (
    <div className="py-8">
      <Breadcrumbs items={breadcrumbItems} />
      <h1 className="text-4xl font-bold text-rwt-blue text-center my-6">{displayName} Archives</h1>

      <div className={layoutClass}>
        {items.map((item) => (
          <ItemCard key={`${item.attributes.contentType}-${item.id}`} item={item} />
        ))}
      </div>

      {pagination && pagination.pageCount > 1 && categorySlug !== "news-from-web" && (
        <div className="mt-12">
          <PaginationControls
            currentPage={pagination.page}
            totalPages={pagination.pageCount}
            basePath={`/categories/${categorySlug}`}
          />
        </div>
      )}
    </div>
  )
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const categorySlug = params.category.toLowerCase() // Normalize slug
  const currentPage = Number(searchParams?.page) || 1

  if (!isValidCategory(categorySlug)) {
    notFound()
  }

  return (
    <Suspense
      key={categorySlug + currentPage}
      fallback={<PageSpinner message={`Loading ${getCategoryDisplayName(categorySlug)}...`} />}
    >
      <CategoryContent categorySlug={categorySlug} currentPage={currentPage} />
    </Suspense>
  )
}
