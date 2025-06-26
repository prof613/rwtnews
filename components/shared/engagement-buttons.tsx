"use client"

import { useState, useEffect } from "react"
import { ThumbsUp, MessageCircle } from "lucide-react" // Icons

type EngagementButtonsProps = {
  articleId: number // Or string, depending on your ID type
  contentType: "article" | "opinion" // To differentiate API endpoints if needed
  initialLikes?: number // Optional: if you fetch initial counts server-side
  // initialCommentsCount?: number; // Optional
  className?: string
  iconSize?: number
}

// Dummy API call functions (replace with actual API calls)
const fetchInitialEngagementData = async (articleId: number, contentType: string) => {
  // In a real app, you'd fetch this from your backend
  // For example: /api/engagement?articleId=${articleId}&contentType=${contentType}
  console.log(`Fetching engagement data for ${contentType} ID: ${articleId}`)
  await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate network delay
  return {
    likes: Math.floor(Math.random() * 100), // Dummy data
    // commentsCount: Math.floor(Math.random() * 20), // Dummy data
    userHasLiked: Math.random() > 0.7, // Dummy data
  }
}

const postLike = async (articleId: number, contentType: string, hasLiked: boolean) => {
  // In a real app, you'd POST this to your backend
  // For example: /api/like with body { articleId, contentType, action: hasLiked ? 'unlike' : 'like' }
  console.log(`${hasLiked ? "Unliking" : "Liking"} ${contentType} ID: ${articleId}`)
  await new Promise((resolve) => setTimeout(resolve, 300)) // Simulate network delay
  return { success: true }
}

export default function EngagementButtons({
  articleId,
  contentType,
  initialLikes = 0,
  className = "",
  iconSize = 20,
}: EngagementButtonsProps) {
  const [likes, setLikes] = useState(initialLikes)
  const [hasLiked, setHasLiked] = useState(false)
  const [isLoading, setIsLoading] = useState(true) // Start with loading true to fetch initial data

  // Fetch initial like status and count
  useEffect(() => {
    setIsLoading(true)
    fetchInitialEngagementData(articleId, contentType)
      .then((data) => {
        setLikes(data.likes)
        setHasLiked(data.userHasLiked)
      })
      .catch((err) => console.error("Failed to fetch engagement data:", err))
      .finally(() => setIsLoading(false))
  }, [articleId, contentType])

  const handleLikeClick = async () => {
    if (isLoading) return // Prevent action while initial data is loading or another action is in progress

    // Optimistic update
    const previousHasLiked = hasLiked
    const previousLikes = likes

    setHasLiked(!previousHasLiked)
    setLikes(previousLikes + (!previousHasLiked ? 1 : -1))

    try {
      // Actual API call
      const response = await postLike(articleId, contentType, previousHasLiked) // Send previous state to API
      if (!response.success) {
        // Revert optimistic update on failure
        setHasLiked(previousHasLiked)
        setLikes(previousLikes)
        alert("Failed to update like. Please try again.")
      }
      // On success, the optimistic update is already correct.
      // You might want to re-fetch the true like count here if multiple users can like simultaneously
      // and you need perfect accuracy, or rely on the optimistic update for responsiveness.
    } catch (error) {
      console.error("Error posting like:", error)
      // Revert optimistic update on error
      setHasLiked(previousHasLiked)
      setLikes(previousLikes)
      alert("An error occurred. Please try again.")
    }
  }

  const handleCommentClick = () => {
    // This would typically scroll to a comment section or open a comment modal
    // For now, it's a placeholder action.
    alert("Comment functionality coming soon! Scroll to comments or open modal.")
    // Example: document.getElementById('comment-section')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div className={`flex items-center space-x-4 ${className}`}>
      {/* Like Button */}
      <button
        onClick={handleLikeClick}
        disabled={isLoading}
        className={`flex items-center space-x-1.5 text-sm transition-colors p-1.5 rounded-md
                    ${hasLiked ? "text-rwt-red hover:bg-red-50" : "text-gray-600 hover:text-rwt-red hover:bg-red-50"}
                    ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
        aria-pressed={hasLiked}
        title={hasLiked ? "Unlike" : "Like"}
      >
        <ThumbsUp size={iconSize} fill={hasLiked ? "currentColor" : "none"} />
        <span>{likes > 0 ? likes : ""}</span>
        <span className="sr-only">Likes</span>
      </button>

      {/* Comment Button */}
      <button
        onClick={handleCommentClick}
        className="flex items-center space-x-1.5 text-sm text-gray-600 hover:text-rwt-blue hover:bg-blue-50 p-1.5 rounded-md transition-colors"
        title="View Comments"
      >
        <MessageCircle size={iconSize} />
        {/* <span>{commentsCount > 0 ? commentsCount : ''}</span> */}
        <span className="hidden sm:inline">Comment</span>
        <span className="sr-only">Comments</span>
      </button>
    </div>
  )
}
