import { fetchExternalArticles } from "@/lib/strapi" // Assuming this function fetches external articles
import type { ExternalArticleEntity } from "@/types"
import ExternalArticleCard from "@/components/shared/external-article-card"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

type ExternalArticlesSectionProps = {
  count?: number
}

export default async function ExternalArticlesSection({ count = 4 }: ExternalArticlesSectionProps) {
  // Fetch a specific number of external articles
  const externalArticles = await fetchExternalArticles({
    limit: count,
    sort: "date:desc", // Assuming external articles also have a date for sorting
  })

  if (!externalArticles || externalArticles.length === 0) {
    return (
      <section className="py-8 text-center">
        <p className="text-gray-600">No external articles available at the moment.</p>
      </section>
    )
  }

  return (
    <section className="py-6 md:py-8">
      {/* Optional: Section title is already in app/(site)/page.tsx */}
      {/* <h2 className="text-3xl font-bold text-rwt-blue text-center mb-8">From the Web</h2> */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {externalArticles.map((extArticle: ExternalArticleEntity) => (
          <ExternalArticleCard key={extArticle.id} externalArticle={extArticle} />
        ))}
      </div>

      {/* "View More" Link - if there's a dedicated page for all external links */}
      <div className="text-center mt-8 md:mt-12">
        <Link
          href="/categories/news-from-web" // Link to the category page for external news
          className="inline-flex items-center text-md font-semibold text-rwt-red hover:underline group"
        >
          More From The Web
          <ArrowRight size={20} className="ml-1.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  )
}
