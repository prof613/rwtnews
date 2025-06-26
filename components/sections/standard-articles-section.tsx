import { fetchStandardArticles } from "@/lib/strapi" // Assuming this function fetches standard articles
import type { ArticleEntity } from "@/types"
import ArticleCard from "@/components/shared/article-card"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

type StandardArticlesSectionProps = {
  // You could add props for title, number of articles, etc., if needed for reusability
  // For now, it's hardcoded for the homepage "The RIGHT News" section
  count?: number
}

export default async function StandardArticlesSection({ count = 6 }: StandardArticlesSectionProps) {
  // Fetch a specific number of standard articles (e.g., not explicitly "featured")
  // The fetchStandardArticles function would need to handle appropriate filtering/sorting
  // e.g., sort by date, exclude already featured articles if necessary.
  const articles = await fetchStandardArticles({
    limit: count,
    sort: "date:desc",
    // Example: If you have a boolean 'isFeatured' field in Strapi for articles:
    // filters: { isFeatured: { $ne: true } }
  })


// ADD ONLY THESE 6 LINES:
console.log('Articles returned:', articles)
console.log('Articles length:', articles?.length)
if (articles && articles.length > 0) {
  console.log('First article:', articles[0])
  console.log('First article attributes:', articles[0]?.attributes)
}
// END OF ADDITION


  if (!articles || articles.length === 0) {
    return (
      <section className="py-8 text-center">
        <p className="text-gray-600">No articles available at the moment.</p>
      </section>
    )
  }

  // Split articles for layout: first article larger, rest in a grid
  const firstArticle = articles[0]
  const remainingArticles = articles.slice(1)

  return (
    <section className="py-6 md:py-8">
      {/* Optional: Section title is already in app/(site)/page.tsx, but could be here too */}
      {/* <h2 className="text-3xl font-bold text-rwt-blue text-center mb-8">The RIGHT News</h2> */}

      <div className="space-y-8">
        {/* First article - larger display */}
        {firstArticle && (
          <div className="mb-8 md:mb-12">
            <ArticleCard article={firstArticle} type="featured-preview" />
            {/* Using 'featured-preview' type for potentially slightly different styling if defined in ArticleCard */}
          </div>
        )}

        {/* Remaining articles - grid display */}
        {remainingArticles.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {remainingArticles.map((article: ArticleEntity) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </div>

      {/* "View More" Link - if there are more articles than shown */}
      {/* This logic assumes fetchStandardArticles might return more than `count` if pagination was involved,
          or you might have a dedicated category page for all "News" articles. */}
      <div className="text-center mt-8 md:mt-12">
        <Link
          href="/categories/news" // Link to the main "News" category page
          className="inline-flex items-center text-md font-semibold text-rwt-red hover:underline group"
        >
          View All News
          <ArrowRight size={20} className="ml-1.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  )
}
