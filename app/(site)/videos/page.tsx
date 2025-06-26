import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Videos",
  description: "Watch videos from Red, White and True News.",
}

export default function VideosPage() {
  return (
    <div className="py-8 px-4 md:px-0 text-center">
      <h1 className="text-4xl font-bold text-rwt-blue mb-8">Videos</h1>

      <div className="max-w-2xl mx-auto bg-gray-100 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-rwt-blue mb-4">Coming Soon!</h2>
        <p className="text-gray-700 mb-6">
          Our dedicated video section is currently under development. We're working hard to bring you a curated
          collection of insightful and engaging video content.
        </p>
        <p className="text-gray-700 mb-6">
          In the meantime, you can find our latest video features on our{" "}
          <Link href="/" className="text-rwt-red hover:underline font-semibold">
            Homepage
          </Link>
          .
        </p>
        <p className="text-gray-700">Thank you for your patience. Please check back soon!</p>
      </div>
    </div>
  )
}
