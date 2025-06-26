"use client" // Needs to be a client component to use window.encodeURIComponent

import { Facebook, Twitter, Linkedin, Mail, Copy } from "lucide-react"
import { useState, useEffect } from "react"

type SocialShareButtonsProps = {
  url: string // The URL to share
  title: string // The title of the content (used for Twitter, Email subject, etc.)
  className?: string
  iconSize?: number
}

export default function SocialShareButtons({ url, title, className = "", iconSize = 20 }: SocialShareButtonsProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [copied, setCopied] = useState(false)

  // Ensure component is mounted before using window object for encoding
  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    // Render nothing or a placeholder on the server / during hydration mismatch
    return null
  }

  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const platforms = [
    {
      name: "Facebook",
      Icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      colorClass: "hover:text-blue-600",
    },
    {
      name: "Twitter",
      Icon: Twitter,
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      colorClass: "hover:text-sky-500",
    },
    {
      name: "LinkedIn",
      Icon: Linkedin,
      href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
      colorClass: "hover:text-blue-700",
    },
    {
      name: "Email",
      Icon: Mail,
      href: `mailto:?subject=${encodedTitle}&body=Check%20out%20this%20article:%20${encodedUrl}`,
      colorClass: "hover:text-red-600",
    },
    // {
    //   name: "Reddit",
    //   Icon: Reddit,
    //   href: `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
    //   colorClass: "hover:text-orange-500",
    // },
  ]

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000) // Reset after 2 seconds
    } catch (err) {
      console.error("Failed to copy: ", err)
      alert("Failed to copy link to clipboard.")
    }
  }

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <span className="text-sm font-medium text-gray-700 hidden sm:inline">Share:</span>
      {platforms.map((platform) => (
        <a
          key={platform.name}
          href={platform.href}
          target="_blank"
          rel="noopener noreferrer"
          title={`Share on ${platform.name}`}
          className={`text-gray-500 transition-colors ${platform.colorClass}`}
          onClick={(e) => {
            // For social popups, a smaller window is often preferred.
            // This is a basic example; more robust solutions might be needed for all platforms.
            if (platform.name !== "Email") {
              e.preventDefault()
              window.open(platform.href, "_blank", "width=600,height=400,noopener,noreferrer")
            }
          }}
        >
          <platform.Icon size={iconSize} />
          <span className="sr-only">Share on {platform.name}</span>
        </a>
      ))}
      <button
        onClick={handleCopyLink}
        title={copied ? "Link Copied!" : "Copy Link"}
        className={`text-gray-500 transition-colors ${copied ? "text-green-500" : "hover:text-rwt-blue"}`}
      >
        <Copy size={iconSize} />
        <span className="sr-only">{copied ? "Link Copied!" : "Copy Link"}</span>
      </button>
      {copied && <span className="text-xs text-green-600 ml-1">Copied!</span>}
    </div>
  )
}
