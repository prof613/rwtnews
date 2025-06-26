import type { Metadata } from "next"
import { Suspense } from "react"
import FeaturedArticleSection from "@/components/sections/featured-article-section"
import StandardArticlesSection from "@/components/sections/standard-articles-section"
import ExternalArticlesSection from "@/components/sections/external-articles-section"
import YoutubeVideosSection from "@/components/sections/youtube-videos-section"
import { PageSpinner } from "@/components/shared/spinners" // Assuming a spinner component

export const metadata: Metadata = {
  title: "Home", // Will be combined with the template in root layout
  description: "Red, White and True News - Your source for patriotic news and opinion.",
}

// Helper component for a section title
const SectionTitle = ({ title }: { title: string }) => (
  <h2 className="text-3xl font-bold text-rwt-blue text-center my-8">{title}</h2>
)

export default function HomePage() {
  return (
    <div>
      {/* Featured Article Section */}
      <Suspense fallback={<PageSpinner message="Loading featured article..." />}>
        <FeaturedArticleSection />
      </Suspense>

      {/* Standard Articles Section ("The RIGHT News") */}
      <SectionTitle title="The RIGHT News" />
      <Suspense fallback={<PageSpinner message="Loading articles..." />}>
        <StandardArticlesSection />
      </Suspense>

      {/* External Articles Section ("From the Web") */}
      <SectionTitle title="From the Web" />
      <Suspense fallback={<PageSpinner message="Loading external news..." />}>
        <ExternalArticlesSection />
      </Suspense>

      {/* YouTube Videos Section ("Latest Videos") */}
      <SectionTitle title="Latest Videos" />
      <Suspense fallback={<PageSpinner message="Loading videos..." />}>
        <YoutubeVideosSection />
      </Suspense>

      {/* Manual Videos Preview (Future - Hidden for now as per spec) */}
      {/* 
      <SectionTitle title="Our Video Features" />
      <Suspense fallback={<PageSpinner message="Loading video features..." />}>
        <ManualVideosPreviewSection /> // This component would need to be created
      </Suspense>
      */}
    </div>
  )
}
