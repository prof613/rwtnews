// Strapi API Response Types
// These are simplified representations. You should generate or define these
// more accurately based on your Strapi content types.

// --- Generic Strapi Response Structures ---
export interface StrapiMediaFormat {
  name: string
  hash: string
  ext: string
  mime: string
  path: string | null
  width: number
  height: number
  size: number
  url: string
}

export interface StrapiMediaAttributes {
  name: string
  alternativeText?: string | null
  caption?: string | null
  width: number
  height: number
  formats?: {
    thumbnail?: StrapiMediaFormat
    small?: StrapiMediaFormat
    medium?: StrapiMediaFormat
    large?: StrapiMediaFormat
    // Add any custom formats you have
  }
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl?: string | null
  provider: string
  provider_metadata?: any | null // Adjust if you have specific provider metadata
  createdAt: string
  updatedAt: string
}

export interface StrapiMedia {
  id: number
  attributes: StrapiMediaAttributes
}

export interface StrapiMediaResponse {
  data: StrapiMedia | null
}

export interface StrapiMediaArrayResponse {
  data: StrapiMedia[]
}

export interface StrapiBaseEntity {
  id: number
  attributes: {
    createdAt: string
    updatedAt: string
    publishedAt?: string | null // Present if content type is draft/publish
    // Add any common fields like 'locale' if using i18n
  }
}

export interface StrapiEntity<T> extends StrapiBaseEntity {
  attributes: T & StrapiBaseEntity["attributes"]
}

export interface StrapiRelation<T> {
  data: StrapiEntity<T> | null
}

export interface StrapiRelationArray<T> {
  data: StrapiEntity<T>[]
}

export interface StrapiPagination {
  page: number
  pageSize: number
  pageCount: number
  total: number
}

export interface StrapiError {
  status: number
  name: string
  message: string
  details: any
}

export interface StrapiResponse<T> {
  data: T // Can be a single entity or an array of entities
  meta?: {
    pagination?: StrapiPagination
    // Add other meta fields if present
  }
  error?: StrapiError
}

// --- Content Type Specific Attributes & Entities ---

// Category
export interface CategoryAttributes {
  name: string
  slug: string
  description?: string | null
  // articles?: StrapiRelationArray<ArticleAttributes>; // Example if you have relations
  // opinions?: StrapiRelationArray<OpinionAttributes>;
}
export type CategoryEntity = StrapiEntity<CategoryAttributes>
export type CategoryEntityResponse = StrapiResponse<CategoryEntity>
export type CategoryEntityResponseCollection = StrapiResponse<CategoryEntity[]>

// Tag
export interface TagAttributes {
  name: string
  slug: string
}
export type TagEntity = StrapiEntity<TagAttributes>

// Article
export interface ArticleAttributes {
  title: string
  slug: string
  excerpt?: string | null
  quote?: string | null
  rich_body: any // Strapi Rich Text JSON structure, define more accurately if possible
  date: string // ISO Date string
  author?: string | null
  word_count?: number | null
  read_time?: number | null
  is_featured?: boolean | null
  image_path?: string | null // Legacy or alternative image path
  image?: StrapiMediaResponse | null // Relation to Media library
  author_image?: StrapiMediaResponse | null // Relation for author's image
  category?: StrapiRelation<CategoryAttributes> | null
  secondary_category?: StrapiRelation<CategoryAttributes> | null
  tags?: StrapiRelationArray<TagAttributes> | null
  contentType?: "article" // Manually added in lib/strapi.ts for category pages
  // Add any other fields specific to your Article content type
}
export type ArticleEntity = StrapiEntity<ArticleAttributes>
export type ArticleEntityResponse = StrapiResponse<ArticleEntity>
export type ArticleEntityResponseCollection = StrapiResponse<ArticleEntity[]>

// Opinion
export interface OpinionAttributes {
  title: string
  slug: string
  excerpt?: string | null
  quote?: string | null
  rich_body: any // Strapi Rich Text JSON structure
  date: string
  author?: string | null
  word_count?: number | null
  read_time?: number | null
  image_path?: string | null // Legacy or alternative image path
  featured_image?: StrapiMediaResponse | null // Relation to Media library
  author_image?: StrapiMediaResponse | null
  // Opinions typically have "Opinion" as primary, so secondary_category is important
  secondary_category?: StrapiRelation<CategoryAttributes> | null
  tags?: StrapiRelationArray<TagAttributes> | null
  contentType?: "opinion"
}
export type OpinionEntity = StrapiEntity<OpinionAttributes>
export type OpinionEntityResponse = StrapiResponse<OpinionEntity>
export type OpinionEntityResponseCollection = StrapiResponse<OpinionEntity[]>

// Meme
export interface MemeAttributes {
  title?: string | null
  slug?: string | null // If memes have individual pages
  image_path?: string | null
  image?: StrapiMediaResponse | null
  date?: string | null // Date uploaded or created
  // category?: StrapiRelation<CategoryAttributes>; // If memes are categorized
  tags?: StrapiRelationArray<TagAttributes> | null
  contentType?: "meme"
}
export type MemeEntity = StrapiEntity<MemeAttributes>
export type MemeEntityResponse = StrapiResponse<MemeEntity>
export type MemeEntityResponseCollection = StrapiResponse<MemeEntity[]>

// External Article
export interface ExternalArticleAttributes {
  title: string
  url: string
  source?: string | null
  excerpt?: string | null
  image_url?: string | null // URL to an external image
  date?: string | null // Publication date of the external article
  // category?: StrapiRelation<CategoryAttributes>; // If categorized
  tags?: StrapiRelationArray<TagAttributes> | null
  contentType?: "external-article"
}
export type ExternalArticleEntity = StrapiEntity<ExternalArticleAttributes>
export type ExternalArticleEntityResponse = StrapiResponse<ExternalArticleEntity>
export type ExternalArticleEntityResponseCollection = StrapiResponse<ExternalArticleEntity[]>

// Subscription (for Newsletter)
export interface SubscriptionAttributes {
  email: string
}
export type SubscriptionEntity = StrapiEntity<SubscriptionAttributes>

// Staff Member (for About Us page, if applicable)
export interface StaffMemberAttributes {
  name: string
  slug?: string | null
  title?: string | null // e.g., Editor-in-Chief, Reporter
  bio: any // Strapi Rich Text or Markdown
  bio_summary?: string | null
  email?: string | null
  thumbnail?: StrapiMediaResponse | null // For profile picture
  thumbnail_url?: string | null // Fallback if not using relation
  social_links?: Record<string, string> | null // e.g., { twitter: "url", linkedin: "url" }
  // order?: number; // For sorting
}
export type StaffMemberEntity = StrapiEntity<StaffMemberAttributes>
export type StaffMemberEntityResponseCollection = StrapiResponse<StaffMemberEntity[]>

// --- Strapi Filter Input Types (Simplified) ---
// These are very basic. For full power, you'd use types generated from Strapi's GraphQL schema or more detailed REST API filter types.
interface StringFilterInput {
  $eq?: string
  $ne?: string
  $in?: string[]
  $notIn?: string[]
  $contains?: string
  $notContains?: string
  $containsi?: string // case-insensitive
  $notContainsi?: string // case-insensitive
  $startsWith?: string
  $endsWith?: string
  $null?: boolean
  $notNull?: boolean
}

interface BooleanFilterInput {
  $eq?: boolean
  $ne?: boolean
  $null?: boolean
  $notNull?: boolean
}

interface NumberFilterInput {
  $eq?: number
  $ne?: number
  $lt?: number
  $lte?: number
  $gt?: number
  $gte?: number
  $in?: number[]
  $notIn?: number[]
  $null?: boolean
  $notNull?: boolean
}

interface DateFilterInput {
  $eq?: string
  $ne?: string
  $lt?: string
  $lte?: string
  $gt?: string
  $gte?: string
  $null?: boolean
  $notNull?: boolean
}

interface IDFilterInput {
  $eq?: number | string // ID can be number or string depending on DB
  $ne?: number | string
  $in?: (number | string)[]
  $notIn?: (number | string)[]
}

// Base for more complex filters including relations
interface BaseFiltersInput {
  id?: IDFilterInput
  createdAt?: DateFilterInput
  updatedAt?: DateFilterInput
  publishedAt?: DateFilterInput
  $and?: BaseFiltersInput[]
  $or?: BaseFiltersInput[]
  $not?: BaseFiltersInput
}

export interface ArticleFiltersInput extends BaseFiltersInput {
  slug?: StringFilterInput
  title?: StringFilterInput
  is_featured?: BooleanFilterInput
  category?: { id?: IDFilterInput; slug?: StringFilterInput } // Example for relation filter
  tags?: { id?: IDFilterInput; slug?: StringFilterInput }
  // Add other filterable fields for articles
}

export interface OpinionFiltersInput extends BaseFiltersInput {
  slug?: StringFilterInput
  title?: StringFilterInput
  secondary_category?: { id?: IDFilterInput; slug?: StringFilterInput }
  tags?: { id?: IDFilterInput; slug?: StringFilterInput }
  // Add other filterable fields for opinions
}

export interface MemeFiltersInput extends BaseFiltersInput {
  slug?: StringFilterInput
  // Add other filterable fields for memes
}

export interface ExternalArticleFiltersInput extends BaseFiltersInput {
  source?: StringFilterInput
  // Add other filterable fields for external articles
}

// Rich Text Content Type (as used in RichTextRenderer)
// This is a simplified version. Strapi's rich text can be more complex.
export type StrapiTextLeaf = {
  type?: "text"
  text: string
  bold?: boolean
  italic?: boolean
  underline?: boolean
  strikethrough?: boolean
  code?: boolean
}

export type StrapiLinkNode = {
  type: "link"
  url: string
  children: StrapiTextLeaf[]
}

export type StrapiImageNode = {
  type: "image"
  image: {
    name: string
    alternativeText?: string | null
    url: string
    caption?: string | null
    width: number
    height: number
  }
  children: [{ type: "text"; text: "" }]
}

export type StrapiListItemNode = {
  type: "list-item"
  children: (StrapiTextLeaf | StrapiLinkNode)[]
}

export type StrapiBlockNode =
  | { type: "paragraph"; children: (StrapiTextLeaf | StrapiLinkNode)[] }
  | { type: "heading"; level: 1 | 2 | 3 | 4 | 5 | 6; children: (StrapiTextLeaf | StrapiLinkNode)[] }
  | { type: "list"; format: "ordered" | "unordered"; children: StrapiListItemNode[] }
  | StrapiImageNode
  | { type: "quote"; children: (StrapiTextLeaf | StrapiLinkNode)[] }
  | { type: "code"; children: [{ text: string }] }

export type StrapiRichTextContent = StrapiBlockNode[]
