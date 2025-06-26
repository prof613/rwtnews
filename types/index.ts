// types/index.ts

import type React from "react"

// --- Re-exporting Strapi Types for easier access ---
// This makes it so you can import, for example, `ArticleEntity` from '@/types'
// instead of '@/types/strapi-types'.
export type {
  StrapiMedia,
  StrapiMediaAttributes,
  StrapiMediaFormat,
  StrapiMediaResponse,
  StrapiMediaArrayResponse,
  StrapiEntity,
  StrapiRelation,
  StrapiRelationArray,
  StrapiPagination,
  StrapiResponse,
  StrapiError,
  CategoryAttributes,
  CategoryEntity,
  CategoryEntityResponse,
  CategoryEntityResponseCollection,
  TagAttributes,
  TagEntity,
  ArticleAttributes,
  ArticleEntity,
  ArticleEntityResponse,
  ArticleEntityResponseCollection,
  OpinionAttributes,
  OpinionEntity,
  OpinionEntityResponse,
  OpinionEntityResponseCollection,
  MemeAttributes,
  MemeEntity,
  MemeEntityResponse,
  MemeEntityResponseCollection,
  ExternalArticleAttributes,
  ExternalArticleEntity,
  ExternalArticleEntityResponse,
  ExternalArticleEntityResponseCollection,
  SubscriptionAttributes,
  SubscriptionEntity,
  StaffMemberAttributes,
  StaffMemberEntity,
  StaffMemberEntityResponseCollection,
  StrapiRichTextContent, // Re-exporting the rich text type
  StrapiBlockNode,
  StrapiTextLeaf,
  StrapiLinkNode,
  StrapiImageNode,
  StrapiListItemNode,
  ArticleFiltersInput, // Re-exporting filter types if needed directly
  OpinionFiltersInput,
  MemeFiltersInput,
  ExternalArticleFiltersInput,
} from "./strapi-types"

// --- General Application Types ---

// For components that accept children
export interface ChildrenProps {
  children: React.ReactNode
}

// For navigation links (used in Header, Footer, etc.)
export interface NavLinkItem {
  href: string
  label: string
  icon?: React.ElementType // Optional icon component
  disabled?: boolean
  isExternal?: boolean // If it's an external link
  subLinks?: NavLinkItem[] // For dropdowns or nested navigation
}

// For breadcrumb items (already defined in Breadcrumbs.tsx, but good to have centrally)
export type BreadcrumbItem = {
  label: string
  href: string
  isCurrent?: boolean
}

// For social media links
export interface SocialLink {
  href: string
  src?: string // Path to image icon, if using images
  icon?: React.ElementType // Lucide icon component, if using SVG icons
  alt: string // For accessibility
  name: string // e.g., "Facebook", "Twitter"
}

// For API responses that are not from Strapi (e.g., newsletter subscription)
export interface ApiResponse<T = any> {
  success: boolean
  message?: string
  error?: string
  data?: T
  field?: string // For form field-specific errors
}

// For YouTube video data (as used in YoutubeVideosSection.tsx)
export interface YouTubeVideo {
  id: string
  title: string
  thumbnailUrl: string
  publishedAt: string
  description?: string
}

// Example for a configuration object if needed
// export interface SiteConfig {
//   siteName: string;
//   siteUrl: string;
//   defaultOgImage: string;
//   // ... other global site settings
// }

// You can add more application-specific types here as your project grows.
// For example, types for form states, context values, UI element configurations, etc.
