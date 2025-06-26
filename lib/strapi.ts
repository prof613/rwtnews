import qs from "qs" // For building query strings
import type {
  ArticleEntity,
  ArticleEntityResponseCollection,
  ArticleFiltersInput,
  OpinionEntity,
  OpinionEntityResponseCollection,
  OpinionFiltersInput,
  MemeEntityResponseCollection,
  MemeFiltersInput,
  ExternalArticleEntityResponseCollection,
  ExternalArticleFiltersInput,
  MemeEntity,
  ExternalArticleEntity,
} from "@/types/strapi-types" // Assuming you have or will generate these types from Strapi

// Define the base URL for your Strapi API from environment variables
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN // For authenticated requests if needed (server-side only)

if (!STRAPI_URL) {
  throw new Error("NEXT_PUBLIC_STRAPI_URL is not defined. Please set it in your environment variables.")
}

// --- Helper function to make API requests ---
async function fetchStrapiAPI<T>(
  path: string,
  params: Record<string, any> = {},
  options: RequestInit = {},
): Promise<T> {
  const defaultOptions: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      // Add Authorization header if an API token is provided and this is a server-side call
      ...(STRAPI_API_TOKEN && typeof window === "undefined" ? { Authorization: `Bearer ${STRAPI_API_TOKEN}` } : {}),
    },
    next: { revalidate: 3600 }, // Default revalidation period (1 hour), adjust as needed
    ...options,
  }

  // Remove undefined params
  Object.keys(params).forEach((key) => params[key] === undefined && delete params[key])

  const queryString = qs.stringify(params, { encodeValuesOnly: true }) // arrayFormat: 'indices' is default
  const requestUrl = `${STRAPI_URL}/api${path}${queryString ? `?${queryString}` : ""}`

  try {
    const response = await fetch(requestUrl, defaultOptions)

    if (!response.ok) {
      const errorBody = await response.text() // Read error body as text first
      console.error(`Strapi API Error (${response.status}): ${requestUrl}`)
      console.error(`Error details: ${errorBody}`)
      throw new Error(`Failed to fetch from Strapi: ${response.status} ${response.statusText}. Details: ${errorBody}`)
    }

    const data = await response.json()
    return data as T // Assuming the response structure matches T (e.g., { data: ..., meta: ... })
  } catch (error) {
    console.error(`Error in fetchStrapiAPI for ${requestUrl}:`, error)
    throw error // Re-throw the error to be handled by the caller
  }
}

// --- Common Population Parameters ---
// Define common population objects to reuse, adjust based on your Strapi setup
const COMMON_ARTICLE_POPULATE = {
  image: { fields: ["url", "alternativeText", "width", "height"] },
  category: { fields: ["name", "slug"] },
  secondary_category: { fields: ["name", "slug"] },
  tags: { fields: ["name", "slug"] },
  author_image: { fields: ["url", "alternativeText"] }, // If author is a relation with an image
}

const COMMON_OPINION_POPULATE = {
  featured_image: { fields: ["url", "alternativeText", "width", "height"] },
  secondary_category: { fields: ["name", "slug"] },
  tags: { fields: ["name", "slug"] },
  author_image: { fields: ["url", "alternativeText"] },
}

const COMMON_MEME_POPULATE = {
  image: { fields: ["url", "alternativeText", "width", "height"] },
  // category: { fields: ['name', 'slug'] }, // If memes have categories
}

const COMMON_EXTERNAL_ARTICLE_POPULATE = {
  // No complex relations typically, but could have categories/tags
  // category: { fields: ['name', 'slug'] },
}

// --- Article Fetching Functions ---
export async function fetchArticles(
  params?: {
    filters?: ArticleFiltersInput
    sort?: string | string[]
    pagination?: { page?: number; pageSize?: number; start?: number; limit?: number }
    populate?: any // Allow custom populate
  },
  options?: RequestInit,
): Promise<ArticleEntityResponseCollection> {
  return fetchStrapiAPI<ArticleEntityResponseCollection>(
    "/articles",
    {
      populate: COMMON_ARTICLE_POPULATE,
      ...params,
    },
    options,
  )
}

export async function fetchArticleBySlug(slug: string, options?: RequestInit): Promise<ArticleEntity | null> {
  const response = await fetchArticles(
    {
      filters: { slug: { $eq: slug } },
      pagination: { limit: 1 },
    },
    options,
  )
  return response.data?.[0] || null
}

export async function fetchFeaturedArticles(
  params?: { limit?: number; sort?: string | string[] },
  options?: RequestInit,
): Promise<ArticleEntity[]> {
  // Assuming 'is_featured' is a boolean field in your Article content type
  const response = await fetchArticles(
    {
      filters: { is_featured: { $eq: true } },
      sort: params?.sort || "date:desc",
      pagination: { limit: params?.limit || 3 }, // Default to 3 featured articles
    },
    options,
  )
  return response.data || []
}

export async function fetchStandardArticles(
  params?: { limit?: number; sort?: string | string[]; filters?: ArticleFiltersInput },
  options?: RequestInit,
): Promise<ArticleEntity[]> {
  // Example: Fetch non-featured articles, or adjust logic as needed
  const defaultFilters: ArticleFiltersInput = { is_featured: { $ne: true } }
  const response = await fetchArticles(
    {
      filters: { ...defaultFilters, ...params?.filters },
      sort: params?.sort || "date:desc",
      pagination: { limit: params?.limit || 6 },
    },
    options,
  )
  return response.data || []
}

export async function fetchRelatedArticles(
  articleId: number,
  tags?: { data: { id: number; attributes: { name: string } }[] },
  primaryCategoryId?: number,
  limit = 3,
): Promise<ArticleEntity[]> {
  if (!tags && !primaryCategoryId) return []

  const filters: ArticleFiltersInput = {
    id: { $ne: articleId }, // Exclude the current article
    $or: [],
  }

  if (primaryCategoryId) {
    filters.$or!.push({ category: { id: { $eq: primaryCategoryId } } })
  }
  if (tags && tags.data.length > 0) {
    filters.$or!.push({ tags: { id: { $in: tags.data.map((t) => t.id) } } })
  }

  if (filters.$or!.length === 0) return [] // No criteria to filter by

  const response = await fetchArticles({
    filters,
    sort: "date:desc", // Or by relevance if your Strapi supports it
    pagination: { limit },
  })
  return response.data || []
}

// --- Opinion Fetching Functions ---
export async function fetchOpinions(
  params?: {
    filters?: OpinionFiltersInput
    sort?: string | string[]
    pagination?: { page?: number; pageSize?: number; start?: number; limit?: number }
    populate?: any
  },
  options?: RequestInit,
): Promise<OpinionEntityResponseCollection> {
  return fetchStrapiAPI<OpinionEntityResponseCollection>(
    "/opinions",
    {
      populate: COMMON_OPINION_POPULATE,
      ...params,
    },
    options,
  )
}

export async function fetchOpinionBySlug(slug: string, options?: RequestInit): Promise<OpinionEntity | null> {
  const response = await fetchOpinions(
    {
      filters: { slug: { $eq: slug } },
      pagination: { limit: 1 },
    },
    options,
  )
  return response.data?.[0] || null
}

export async function fetchLatestOpinions(
  params?: { limit?: number; sort?: string | string[] },
  options?: RequestInit,
): Promise<OpinionEntity[]> {
  const response = await fetchOpinions(
    {
      sort: params?.sort || "date:desc",
      pagination: { limit: params?.limit || 5 },
    },
    options,
  )
  return response.data || []
}

export async function fetchRelatedOpinions(
  opinionId: number,
  tags?: { data: { id: number; attributes: { name: string } }[] },
  secondaryCategoryId?: number,
  limit = 3,
): Promise<OpinionEntity[]> {
  if (!tags && !secondaryCategoryId) return []

  const filters: OpinionFiltersInput = {
    id: { $ne: opinionId },
    $or: [],
  }

  if (secondaryCategoryId) {
    filters.$or!.push({ secondary_category: { id: { $eq: secondaryCategoryId } } })
  }
  if (tags && tags.data.length > 0) {
    filters.$or!.push({ tags: { id: { $in: tags.data.map((t) => t.id) } } })
  }

  if (filters.$or!.length === 0) return []

  const response = await fetchOpinions({
    filters,
    sort: "date:desc",
    pagination: { limit },
  })
  return response.data || []
}

// --- Meme Fetching Functions ---
export async function fetchMemes(
  params?: {
    filters?: MemeFiltersInput
    sort?: string | string[]
    pagination?: { page?: number; pageSize?: number; start?: number; limit?: number }
    populate?: any
  },
  options?: RequestInit,
): Promise<MemeEntityResponseCollection> {
  return fetchStrapiAPI<MemeEntityResponseCollection>(
    "/memes", // Assuming your API endpoint is /memes
    {
      populate: COMMON_MEME_POPULATE,
      ...params,
    },
    options,
  )
}

export async function fetchLatestMemes(
  params?: { limit?: number; sort?: string | string[] },
  options?: RequestInit,
): Promise<MemeEntity[]> {
  const response = await fetchMemes(
    {
      sort: params?.sort || "date:desc", // Or 'createdAt:desc'
      pagination: { limit: params?.limit || 6 },
    },
    options,
  )
  return response.data || []
}

// --- External Article Fetching Functions ---
export async function fetchExternalArticles(
  params?: {
    filters?: ExternalArticleFiltersInput
    sort?: string | string[]
    pagination?: { page?: number; pageSize?: number; start?: number; limit?: number }
    populate?: any
  },
  options?: RequestInit,
): Promise<ExternalArticleEntityResponseCollection> {
  return fetchStrapiAPI<ExternalArticleEntityResponseCollection>(
    "/external-articles", // Assuming endpoint
    {
      populate: COMMON_EXTERNAL_ARTICLE_POPULATE,
      ...params,
    },
    options,
  )
}

// --- Category Specific Fetching ---
// This is a more complex function as categories can contain different types of content.
// You might need to adjust this based on how you've structured categories and content types in Strapi.
// One approach: fetch all content types that can belong to a category and merge/sort them.
// Another: have specific category types (e.g., "News Category", "Opinion Category").
// For now, this is a simplified version.

const VALID_CATEGORY_SLUGS: Record<string, { displayName: string; contentTypes: string[] }> = {
  news: { displayName: "News", contentTypes: ["articles"] },
  opinion: { displayName: "Opinion", contentTypes: ["opinions"] },
  "meme-cartoons": { displayName: "Memes & Cartoons", contentTypes: ["memes"] },
  "news-from-web": { displayName: "News From The Web", contentTypes: ["external-articles"] },
  featured: { displayName: "Featured", contentTypes: ["articles"] }, // Example for a "Featured" category
  // Add other category slugs and their display names + associated content types
  // e.g. 'politics': { displayName: 'Politics', contentTypes: ['articles', 'opinions'] }
}

export function isValidCategory(categorySlug: string): boolean {
  return Object.keys(VALID_CATEGORY_SLUGS).includes(categorySlug.toLowerCase())
}

export function getCategoryDisplayName(categorySlug: string): string {
  return VALID_CATEGORY_SLUGS[categorySlug.toLowerCase()]?.displayName || "Category"
}

export async function fetchItemsForCategory(
  categorySlug: string,
  currentPage = 1,
  pageSize = 10,
): Promise<{
  items: (ArticleEntity | OpinionEntity | MemeEntity | ExternalArticleEntity)[]
  pagination: { page: number; pageSize: number; pageCount: number; total: number } | null
}> {
  const normalizedSlug = categorySlug.toLowerCase()
  const categoryInfo = VALID_CATEGORY_SLUGS[normalizedSlug]

  if (!categoryInfo) {
    console.warn(`Invalid category slug: ${categorySlug}`)
    return { items: [], pagination: null }
  }

  let allItems: (ArticleEntity | OpinionEntity | MemeEntity | ExternalArticleEntity)[] = []
  let overallPagination = null // Simplified pagination for now

  // This example fetches only the first content type associated with the category.
  // A more robust solution would fetch from all contentTypes and merge/sort.
  const primaryContentType = categoryInfo.contentTypes[0]

  // This is a placeholder for a more complex fetching logic.
  // You'll need to adapt this based on how your categories relate to content types.
  // For example, if 'articles' have a 'category' relation:
  if (primaryContentType === "articles") {
    const filters: ArticleFiltersInput =
      normalizedSlug === "featured" ? { is_featured: { $eq: true } } : { category: { slug: { $eq: normalizedSlug } } }

    const response = await fetchArticles({
      filters,
      sort: "date:desc",
      pagination: { page: currentPage, pageSize },
    })
    allItems = response.data.map((item) => ({ ...item, attributes: { ...item.attributes, contentType: "article" } }))
    overallPagination = response.meta?.pagination || null
  } else if (primaryContentType === "opinions") {
    // Opinions are primarily under "Opinion" category, secondary categories are different
    const filters: OpinionFiltersInput =
      normalizedSlug === "opinion"
        ? {} // No specific filter needed if "opinion" is the main category page
        : { secondary_category: { slug: { $eq: normalizedSlug } } }
    const response = await fetchOpinions({
      filters,
      sort: "date:desc",
      pagination: { page: currentPage, pageSize },
    })
    allItems = response.data.map((item) => ({ ...item, attributes: { ...item.attributes, contentType: "opinion" } }))
    overallPagination = response.meta?.pagination || null
  } else if (primaryContentType === "memes") {
    const response = await fetchMemes({
      // Assuming memes might have a category relation or you fetch all for "meme-cartoons"
      // filters: { category: { slug: { $eq: normalizedSlug } } },
      sort: "date:desc",
      pagination: { page: currentPage, pageSize },
    })
    allItems = response.data.map((item) => ({ ...item, attributes: { ...item.attributes, contentType: "meme" } }))
    overallPagination = response.meta?.pagination || null
  } else if (primaryContentType === "external-articles") {
    const response = await fetchExternalArticles({
      // Assuming external-articles might have a category relation
      // filters: { category: { slug: { $eq: normalizedSlug } } },
      sort: "date:desc",
      pagination: { page: currentPage, pageSize },
    })
    allItems = response.data.map((item) => ({
      ...item,
      attributes: { ...item.attributes, contentType: "external-article" },
    }))
    overallPagination = response.meta?.pagination || null
  }

  // If your categories can contain multiple content types, you'd fetch all of them
  // and then merge and sort them by date on the client or do a more complex server-side query if possible.

  return { items: allItems, pagination: overallPagination }
}

// --- Sidebar Specific Fetching Functions ---
// These can be more targeted versions of the above, fetching fewer fields or specific subsets.
export async function fetchFeaturedArticlesForSidebar(
  params?: { limit?: number },
  options?: RequestInit,
): Promise<ArticleEntity[]> {
  const response = await fetchArticles(
    {
      filters: { is_featured: { $eq: true } },
      sort: "date:desc",
      pagination: { limit: params?.limit || 3 },
      populate: {
        // Minimal populate for sidebar
        image: { fields: ["url", "alternativeText"] },
        category: { fields: ["name", "slug"] },
      },
    },
    options,
  )
  return response.data || []
}

export async function fetchLatestOpinionsForSidebar(
  params?: { limit?: number },
  options?: RequestInit,
): Promise<OpinionEntity[]> {
  const response = await fetchOpinions(
    {
      sort: "date:desc",
      pagination: { limit: params?.limit || 4 },
      populate: {
        // Minimal populate
        secondary_category: { fields: ["name", "slug"] },
      },
    },
    options,
  )
  return response.data || []
}

export async function fetchLatestMemesForSidebar(
  params?: { limit?: number },
  options?: RequestInit,
): Promise<MemeEntity[]> {
  const response = await fetchMemes(
    {
      sort: "date:desc",
      pagination: { limit: params?.limit || 2 },
      populate: {
        image: { fields: ["url", "alternativeText"] },
      },
    },
    options,
  )
  return response.data || []
}

export async function fetchLatestExternalArticlesForSidebar(
  params?: { limit?: number },
  options?: RequestInit,
): Promise<ExternalArticleEntity[]> {
  const response = await fetchExternalArticles(
    {
      sort: "date:desc", // Assuming external articles have a date
      pagination: { limit: params?.limit || 4 },
      // No complex relations to populate usually
    },
    options,
  )
  return response.data || []
}

// Add other specific fetch functions as needed (e.g., for staff, specific pages like About Us content)
