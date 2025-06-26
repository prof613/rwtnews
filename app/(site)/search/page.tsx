import type { Metadata } from "next"
import Link from "next/link"
// import { SearchIcon } from 'lucide-react' // Example icon

export const metadata: Metadata = {
  title: "Search Results",
  description: "Search for content on Red, White and True News.",
}

export default function SearchPage({ searchParams }: { searchParams?: { q?: string } }) {
  const query = searchParams?.q || ""

  return (
    <div className="py-8 px-4 md:px-0">
      <h1 className="text-4xl font-bold text-rwt-blue text-center mb-8">
        {/* <SearchIcon size={36} className="inline-block mr-3 align-middle" /> */}
        Search Results
      </h1>

      {query && (
        <p className="text-center text-lg text-gray-700 mb-12">
          Showing results for: <span className="font-semibold">{query}</span>
        </p>
      )}

      {/* Search Input - This would typically be part of the header or a dedicated search bar component */}
      {/* For this page, we'll assume the query comes from URL params */}
      {/* You might want a search input here as well if users land directly or want to refine */}
      <div className="max-w-xl mx-auto mb-12">
        <form action="/search" method="GET" className="flex gap-2">
          <input
            type="search"
            name="q"
            defaultValue={query}
            placeholder="Search articles, opinions, and more..."
            className="flex-grow p-3 border border-gray-300 rounded-md focus:ring-rwt-red focus:border-rwt-red"
            aria-label="Search query"
          />
          <button
            type="submit"
            className="bg-rwt-red text-white px-6 py-3 rounded-md hover:bg-opacity-80 transition-colors"
          >
            Search
          </button>
        </form>
      </div>

      <div className="max-w-3xl mx-auto bg-gray-50 p-8 rounded-lg shadow text-center">
        {query ? (
          <>
            <h2 className="text-2xl font-semibold text-rwt-blue mb-4">Search Functionality Coming Soon</h2>
            <p className="text-gray-700 mb-4">
              The ability to search our full content archive is currently under development.
            </p>
            <p className="text-gray-700">
              We are working on implementing a comprehensive search feature to help you find exactly what you're looking
              for. Please check back later.
            </p>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-semibold text-rwt-blue mb-4">What are you looking for?</h2>
            <p className="text-gray-700 mb-4">
              Enter a search term above to find articles, opinions, and more across Red, White and True News.
            </p>
          </>
        )}
        <div className="mt-8">
          <Link href="/" className="text-rwt-red hover:underline font-semibold">
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  )
}
