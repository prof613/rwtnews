import { Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  fetchFeaturedArticlesForSidebar,
  fetchLatestOpinionsForSidebar,
  fetchLatestMemesForSidebar,
  fetchLatestExternalArticlesForSidebar,
} from "@/lib/strapi" // Assuming these functions will be created in strapi.ts
import type { ArticleEntity, OpinionEntity, MemeEntity, ExternalArticleEntity } from "@/types"
import { formatDate } from "@/lib/formatters"
import { SidebarSpinner } from "@/components/shared/spinners" // A smaller spinner for sidebar sections

// Helper for Section Titles
const SectionTitle = ({ title, href }: { title: string; href?: string }) => (
  <div className="mb-3 pb-2 border-b-2 border-rwt-red">
    {href ? (
      <Link href={href} className="text-xl font-bold text-rwt-blue hover:text-rwt-red transition-colors">
        {title}
      </Link>
    ) : (
      <h2 className="text-xl font-bold text-rwt-blue">{title}</h2>
    )}
  </div>
)

// --- Featured Articles Section (Sidebar) ---
async function FeaturedArticlesSidebar() {
  const articles = await fetchFeaturedArticlesForSidebar({ limit: 3 }) // Fetch 3 featured articles for sidebar

  if (!articles || articles.length === 0) {
    return <p className="text-sm text-gray-600">No featured articles available.</p>
  }

  return (
    <div className="space-y-4">
      {articles.map((article: ArticleEntity) => (
        <Link
          href={`/articles/${article.attributes.slug}`}
          key={article.id}
          className="block group hover:bg-gray-50 p-2 rounded-md transition-colors"
        >
          {article.attributes.image?.data && (
            <div className="relative w-full h-32 mb-2 rounded overflow-hidden">
              <Image
                src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${article.attributes.image.data.attributes.url}`}
                alt={article.attributes.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}
          <h3 className="text-md font-semibold text-rwt-blue group-hover:text-rwt-red leading-tight line-clamp-2">
            {article.attributes.title}
          </h3>
          <p className="text-xs text-gray-500 mt-1">{formatDate(article.attributes.date)}</p>
        </Link>
      ))}
    </div>
  )
}

// --- Latest Opinions Section ---
async function LatestOpinionsSidebar() {
  const opinions = await fetchLatestOpinionsForSidebar({ limit: 4 }) // Fetch 4 latest opinions

  if (!opinions || opinions.length === 0) {
    return <p className="text-sm text-gray-600">No recent opinions.</p>
  }

  return (
    <ul className="space-y-2">
      {opinions.map((opinion: OpinionEntity) => (
        <li key={opinion.id} className="text-sm">
          <Link
            href={`/opinions/${opinion.attributes.slug}`}
            className="text-gray-700 hover:text-rwt-red hover:underline line-clamp-2"
          >
            {opinion.attributes.title}
          </Link>
        </li>
      ))}
    </ul>
  )
}

// --- Latest Memes Section ---
async function LatestMemesSidebar() {
  const memes = await fetchLatestMemesForSidebar({ limit: 2 }) // Fetch 2 latest memes

  if (!memes || memes.length === 0) {
    return <p className="text-sm text-gray-600">No recent memes.</p>
  }

  return (
    <div className="grid grid-cols-2 gap-2">
      {memes.map((meme: MemeEntity) => (
        <Link href={`/categories/meme-cartoons`} key={meme.id} className="block group">
          {/* Assuming memes have an image. Adjust if structure is different */}
          {meme.attributes.image?.data && (
            <div className="relative w-full aspect-square rounded overflow-hidden border border-gray-200">
              <Image
                src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${meme.attributes.image.data.attributes.url}`}
                alt={meme.attributes.title || "Meme"}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}
        </Link>
      ))}
    </div>
  )
}

// --- External Articles ("From the Web") Section ---
async function ExternalArticlesSidebar() {
  const externalArticles = await fetchLatestExternalArticlesForSidebar({ limit: 4 })

  if (!externalArticles || externalArticles.length === 0) {
    return <p className="text-sm text-gray-600">No recent links from the web.</p>
  }

  return (
    <ul className="space-y-2">
      {externalArticles.map((extArticle: ExternalArticleEntity) => (
        <li key={extArticle.id} className="text-sm">
          <a
            href={extArticle.attributes.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-rwt-red hover:underline line-clamp-2"
            title={extArticle.attributes.source ? `Source: ${extArticle.attributes.source}` : ""}
          >
            {extArticle.attributes.title}
          </a>
          {extArticle.attributes.source && <p className="text-xs text-gray-500">via {extArticle.attributes.source}</p>}
        </li>
      ))}
    </ul>
  )
}

// --- Social Media Placeholder ---
const SocialFeedPlaceholder = () => (
  <div className="bg-gray-100 p-4 rounded-md text-center">
    <p className="text-sm text-gray-600">Social media feed (e.g., Twitter) coming soon.</p>
    {/* You could embed a simple link to a social profile for now */}
    <a
      href="https://twitter.com/RWT_News"
      target="_blank"
      rel="noopener noreferrer"
      className="text-rwt-blue hover:underline font-semibold mt-2 inline-block"
    >
      Follow us on X
    </a>
  </div>
)

// --- Advertisement Placeholder ---
const AdPlaceholder = ({ heightClass = "h-64" }: { heightClass?: string }) => (
  <div
    className={`w-full ${heightClass} bg-gray-200 border border-gray-300 rounded-md flex items-center justify-center text-gray-500 text-sm`}
  >
    Advertisement Placeholder
  </div>
)

export default function Sidebar() {
  return (
    <aside className="space-y-8 sticky top-20">
      {" "}
      {/* top-20 to account for sticky header height */}
      {/* Section 1: Featured Articles (Sidebar) */}
      <section>
        <SectionTitle title="Featured" href="/categories/featured" />
        <Suspense fallback={<SidebarSpinner message="Loading featured..." />}>
          <FeaturedArticlesSidebar />
        </Suspense>
      </section>
      {/* Section 2: Ad Placeholder 1 */}
      <section>
        <AdPlaceholder heightClass="h-48" />
      </section>
      {/* Section 3: Latest Opinions */}
      <section>
        <SectionTitle title="Latest Opinions" href="/categories/opinion" />
        <Suspense fallback={<SidebarSpinner message="Loading opinions..." />}>
          <LatestOpinionsSidebar />
        </Suspense>
      </section>
      {/* Section 4: Latest Memes/Cartoons */}
      <section>
        <SectionTitle title="Memes & Toons" href="/categories/meme-cartoons" />
        <Suspense fallback={<SidebarSpinner message="Loading memes..." />}>
          <LatestMemesSidebar />
        </Suspense>
      </section>
      {/* Section 5: Ad Placeholder 2 */}
      <section>
        <AdPlaceholder heightClass="h-64" /> {/* Taller ad placeholder */}
      </section>
      {/* Section 6: From the Web (External Articles) */}
      <section>
        <SectionTitle title="From The Web" href="/categories/news-from-web" />
        <Suspense fallback={<SidebarSpinner message="Loading web links..." />}>
          <ExternalArticlesSidebar />
        </Suspense>
      </section>
      {/* Section 7: Social Media Feed Placeholder */}
      <section>
        <SectionTitle title="Connect With Us" />
        <SocialFeedPlaceholder />
      </section>
      {/* Section 8: Ad Placeholder 3 (Optional, if more ads are needed) */}
      {/* <section>
        <AdPlaceholder heightClass="h-32" />
      </section> */}
    </aside>
  )
}
