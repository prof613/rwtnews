// Site Information
export const SITE_NAME = "Red, White and True News"
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
export const SITE_DESCRIPTION = "The latest news with a patriotic perspective."
export const DEFAULT_OG_IMAGE_URL = `${SITE_URL}/images/core/mainbanner.jpg` // Default OpenGraph image

// Pagination
export const DEFAULT_ITEMS_PER_PAGE = 10
export const SIDEBAR_ITEMS_LIMIT = 5 // Max items for sidebar lists

// Social Media Links (can also be managed in a CMS or directly in components if preferred)
export const SOCIAL_LINKS = {
  FACEBOOK: "https://www.facebook.com/RedWhiteAndTrueNews/",
  TWITTER: "https://twitter.com/RWT_News",
  YOUTUBE: "https://www.youtube.com/channel/UC2zQ4hCorllD1a7TUnK-Y-Q",
  INSTAGRAM: "https://www.instagram.com/redwhiteandtruenews/",
  TIKTOK: "https://www.tiktok.com/@redwhiteandtruenews",
  RUMBLE: "https://rumble.com/c/RedWhiteandTrueNews",
  GETTR: "https://gettr.com/user/rwtnews",
  TRUTH_SOCIAL: "https://truthsocial.com/@RWTNews",
  // Add more as needed
}

// Contact Information
export const CONTACT_EMAIL_GENERAL = "webcontact@redwhiteandtruenews.com"
export const CONTACT_EMAIL_WEBMASTER = "webmaster@redwhiteandtruenews.com"

// YouTube API (Consider if these should be here or only env vars)
// export const YOUTUBE_CHANNEL_ID = "UC2zQ4hCorllD1a7TUnK-Y-Q"; // Already used in YoutubeVideosSection

// Strapi related constants (if any are truly constant and public)
// For example, specific known IDs for categories if they are fixed
// export const NEWS_CATEGORY_ID = 1;
// export const OPINION_CATEGORY_ID = 2;

// Default image placeholders (paths relative to /public)
export const PLACEHOLDER_IMAGE_ARTICLE = "/images/core/placeholder.jpg"
export const PLACEHOLDER_IMAGE_AUTHOR = "/images/staff/authors/placeholder-author.jpg"

// Regex for validation (example)
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Add other constants as your project grows.
// For example, navigation items if not hardcoded in Header,
// or specific configuration values.
