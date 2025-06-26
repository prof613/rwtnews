"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import axios from "axios"
import { Youtube, AlertTriangle, Loader2, ArrowRight } from "lucide-react" // Icons
import { formatDate } from "@/lib/formatters" // Assuming you have this

// Define a type for the YouTube video item (simplified)
interface YouTubeVideo {
  id: string
  title: string
  thumbnailUrl: string
  publishedAt: string
  description?: string
}

const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY
const CHANNEL_ID = "UC2zQ4hCorllD1a7TUnK-Y-Q" // Red, White and True News Channel ID
const MAX_RESULTS = 4 // Number of videos to display

export default function YoutubeVideosSection() {
  const [videos, setVideos] = useState<YouTubeVideo[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!YOUTUBE_API_KEY) {
      setError("YouTube API key is missing. Please configure it in environment variables.")
      setIsLoading(false)
      return
    }

    const fetchVideos = async () => {
      setIsLoading(true)
      setError(null)
      try {
        // Using YouTube Data API v3 search.list endpoint to get latest videos from the channel
        const response = await axios.get("https://www.googleapis.com/youtube/v3/search", {
          params: {
            key: YOUTUBE_API_KEY,
            channelId: CHANNEL_ID,
            part: "snippet,id",
            order: "date", // Get latest videos
            maxResults: MAX_RESULTS,
            type: "video", // Ensure we only get videos
          },
        })

        const fetchedVideos: YouTubeVideo[] = response.data.items.map((item: any) => ({
          id: item.id.videoId,
          title: item.snippet.title,
          thumbnailUrl:
            item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url || "/images/core/placeholder.jpg",
          publishedAt: item.snippet.publishedAt,
          description: item.snippet.description,
        }))
        setVideos(fetchedVideos)
      } catch (err: any) {
        console.error("Error fetching YouTube videos:", err)
        if (err.response && err.response.data && err.response.data.error) {
          setError(`Failed to load videos: ${err.response.data.error.message}`)
        } else {
          setError("Failed to load videos. Please check the console for more details.")
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchVideos()
  }, [])

  if (isLoading) {
    return (
      <section className="py-8 text-center">
        <div className="flex items-center justify-center text-gray-600">
          <Loader2 className="h-8 w-8 animate-spin text-rwt-blue mr-3" />
          <span>Loading latest videos...</span>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-8 text-center">
        <div className="flex flex-col items-center justify-center text-red-600 bg-red-50 p-4 rounded-md">
          <AlertTriangle className="h-8 w-8 mb-2" />
          <p className="font-semibold">Error Loading Videos</p>
          <p className="text-sm">{error}</p>
        </div>
      </section>
    )
  }

  if (videos.length === 0) {
    return (
      <section className="py-8 text-center">
        <p className="text-gray-600">No videos found or channel is not configured correctly.</p>
      </section>
    )
  }

  return (
    <section className="py-6 md:py-8">
      {/* Optional: Section title is already in app/(site)/page.tsx */}
      {/* <h2 className="text-3xl font-bold text-rwt-blue text-center mb-8 flex items-center justify-center">
        <Youtube size={32} className="mr-2 text-red-600" /> Latest Videos
      </h2> */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {videos.map((video) => (
          <div
            key={video.id}
            className="bg-white rounded-lg shadow-md overflow-hidden group transition-all hover:shadow-xl"
          >
            <Link
              href={`https://www.youtube.com/watch?v=${video.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <div className="relative w-full aspect-video">
                <Image
                  src={video.thumbnailUrl || "/placeholder.svg"}
                  alt={video.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  // Remember to add 'i.ytimg.com' to next.config.mjs image domains
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-opacity flex items-center justify-center">
                  <Youtube size={48} className="text-white opacity-70 group-hover:opacity-90" />
                </div>
              </div>
              <div className="p-3 md:p-4">
                <h3 className="text-sm md:text-md font-semibold text-rwt-blue group-hover:text-rwt-red transition-colors leading-tight line-clamp-2">
                  {video.title}
                </h3>
                <p className="text-xs text-gray-500 mt-1">{formatDate(video.publishedAt)}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className="text-center mt-8 md:mt-12">
        <Link
          href={`https://www.youtube.com/channel/${CHANNEL_ID}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-md font-semibold text-rwt-red hover:underline group"
        >
          View All Videos on YouTube
          <ArrowRight size={20} className="ml-1.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  )
}
