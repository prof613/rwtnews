# Backend Handover Document: Red, White and True News (Next.js Frontend)

**Date:** June 24, 2025
**Project:** Red, White and True News Website Rebuild
**Frontend:** Next.js (App Router)
**Backend:** Strapi CMS

## 1. Introduction

This document outlines the data requirements and API expectations of the Next.js frontend for the Red, White and True News website. It is intended for the Strapi backend developer to ensure the CMS is configured to provide the necessary data structures.

**Base Strapi URL:** The frontend expects the Strapi API to be accessible via the `NEXT_PUBLIC_STRAPI_URL` environment variable (e.g., `http://127.0.0.1:1337`). All API paths mentioned below are relative to `/api` (e.g., `NEXT_PUBLIC_STRAPI_URL/api/articles`).

**API Token:** For server-side data fetching that might require authentication (e.g., fetching draft content, or if some content types are restricted), the `STRAPI_API_TOKEN` environment variable can be used. Publicly accessible content should have permissions enabled for the "Public" role in Strapi.

**Key Frontend Libraries/Helpers:**
*   `lib/strapi.ts`: Contains helper functions for fetching data from Strapi.
*   `types/strapi-types.ts`: Contains TypeScript definitions for expected Strapi data structures. Please review these types for detailed field expectations.



## 2. General API Expectations

*   **REST API:** The frontend primarily uses Strapi's REST API.
*   **JSON Format:** Responses should be in JSON format.
*   **Population:** Many components rely on populated relations. Default population strategies are defined in `lib/strapi.ts` (e.g., `COMMON_ARTICLE_POPULATE`). Ensure these relations can be populated.
    *   Deep population might be needed for nested components (e.g., `article.image.formats.thumbnail.url`).
*   **Filtering & Sorting:** The frontend uses Strapi's filtering and sorting capabilities (e.g., by slug, date, featured status).
*   **Pagination:** Paginated responses should follow Strapi's standard structure: `{ data: [...], meta: { pagination: { page, pageSize, pageCount, total } } }`.
*   **Error Handling:** API errors should return appropriate HTTP status codes and a JSON error object (e.g., `{ error: { status, name, message, details } }`).
*   **Permissions:**
    *   For all content types intended for public viewing, ensure `find` and `findOne` permissions are enabled for the "Public" role in Strapi (`Settings > Roles > Public`).
    *   For the `subscriptions` content type (newsletter), ensure `create` permission is enabled for the "Public" role.

## 3. Content Type Definitions and Expected Fields

The following sections detail each Strapi Content Type the frontend expects, along with their key fields and relations. Refer to `types/strapi-types.ts` for more precise type definitions.

---

### 3.1. Articles (`/api/articles`)

*   **Purpose:** Main news articles.
*   **Key Fields:**
    *   `title` (string, required): Title of the article.
    *   `slug` (string, UID, required, unique): URL-friendly identifier.
    *   `excerpt` (text, optional): Short summary for cards and previews.
    *   `quote` (text, optional): A prominent quote displayed on the article page.
    *   `rich_body` (richtext, required): Main content of the article. Expected to be Strapi's standard rich text JSON structure (paragraphs, headings, lists, images, quotes, code blocks).
        *   **Images within Rich Text:** Should be properly linked to the Media Library and return URL, alt text, width, height.
    *   `date` (date, required): Publication date.
    *   `updatedAt` (datetime, automatic): Last update timestamp.
    *   `author` (string, optional): Name of the author.
    *   `word_count` (integer, optional): Estimated word count.
    *   `read_time` (integer, optional): Estimated read time in minutes.
    *   `is_featured` (boolean, optional, default: false): Flag to mark article as featured. Used for homepage and sidebar.
    *   `image_path` (string, optional): Legacy field for image URL if not using the `image` relation.
*   **Relations:**
    *   `image` (media, single): Featured image for the article.
        *   **Expected Population:** `url`, `alternativeText`, `width`, `height`, `formats` (thumbnail, small, etc.).
    *   `author_image` (media, single, optional): Profile picture of the author.
        *   **Expected Population:** `url`, `alternativeText`.
    *   `category` (relation, single, to: Category): Primary category.
        *   **Expected Population:** `name`, `slug`.
    *   `secondary_category` (relation, single, to: Category, optional): Secondary category.
        *   **Expected Population:** `name`, `slug`.
    *   `tags` (relation, multiple, to: Tag, optional): Content tags.
        *   **Expected Population:** `name`, `slug`.
*   **Frontend Usage:** Homepage (featured, standard), article detail pages, category pages, related articles.

---

### 3.2. Opinions (`/api/opinions`)

*   **Purpose:** Opinion pieces, editorials.
*   **Key Fields:**
    *   `title` (string, required): Title of the opinion piece.
    *   `slug` (string, UID, required, unique): URL-friendly identifier.
    *   `excerpt` (text, optional): Short summary.
    *   `quote` (text, optional): Prominent quote.
    *   `rich_body` (richtext, required): Main content.
    *   `date` (date, required): Publication date.
    *   `author` (string, optional): Name of the author.
    *   `word_count` (integer, optional): Estimated word count.
    *   `read_time` (integer, optional): Estimated read time in minutes.
    *   `image_path` (string, optional): Legacy field for image URL.
*   **Relations:**
    *   `featured_image` (media, single): Main image for the opinion piece.
        *   **Expected Population:** `url`, `alternativeText`, `width`, `height`, `formats`.
    *   `author_image` (media, single, optional): Profile picture of the author.
        *   **Expected Population:** `url`, `alternativeText`.
    *   `secondary_category` (relation, single, to: Category, optional): Opinions are primarily under a main "Opinion" category (handled by frontend routing). This field is for sub-categorization.
        *   **Expected Population:** `name`, `slug`.
    *   `tags` (relation, multiple, to: Tag, optional): Content tags.
        *   **Expected Population:** `name`, `slug`.
*   **Frontend Usage:** Homepage (sidebar), opinion detail pages, category pages (if "Opinion" is a category or if secondary categories are browsed), related opinions.

---

### 3.3. Memes/Cartoons (`/api/memes`)

*   **Purpose:** Image-based content like memes or political cartoons.
*   **Key Fields:**
    *   `title` (string, optional): Title or caption for the meme.
    *   `slug` (string, UID, optional, unique): If memes have individual detail pages.
    *   `image_path` (string, optional): Legacy field for image URL.
    *   `date` (date, optional): Upload or creation date.
*   **Relations:**
    *   `image` (media, single, required): The meme image itself.
        *   **Expected Population:** `url`, `alternativeText`, `width`, `height`.
    *   `category` (relation, single, to: Category, optional): If memes are categorized (e.g., "Political Cartoons").
        *   **Expected Population:** `name`, `slug`.
    *   `tags` (relation, multiple, to: Tag, optional).
        *   **Expected Population:** `name`, `slug`.
*   **Frontend Usage:** Homepage (sidebar), category pages (e.g., "Memes & Cartoons"). Modal view for individual memes is a potential future feature.

---

### 3.4. External Articles (`/api/external-articles`)

*   **Purpose:** Links to articles on other websites ("From the Web").
*   **Key Fields:**
    *   `title` (string, required): Title of the external article.
    *   `url` (string, required, URL format): Direct link to the external article.
    *   `source` (string, optional): Name of the source website (e.g., "Fox News", "Breitbart").
    *   `excerpt` (text, optional): Short summary or description.
    *   `image_url` (string, optional, URL format): Direct URL to an image for the preview card (if available). The frontend will attempt to display this image, so ensure hostnames are whitelisted in Next.js config if these are diverse.
    *   `date` (date, optional): Publication date of the external article.
*   **Relations:**
    *   `category` (relation, single, to: Category, optional): If external links are categorized (e.g., "News From Web").
        *   **Expected Population:** `name`, `slug`.
    *   `tags` (relation, multiple, to: Tag, optional).
        *   **Expected Population:** `name`, `slug`.
*   **Frontend Usage:** Homepage (main section, sidebar), category pages (e.g., "News From The Web").

---

### 3.5. Categories (`/api/categories`)

*   **Purpose:** Used to categorize Articles, Opinions, Memes, External Articles.
*   **Key Fields:**
    *   `name` (string, required): Display name of the category (e.g., "News", "Politics", "Opinion").
    *   `slug` (string, UID, required, unique): URL-friendly identifier (e.g., "news", "politics").
    *   `description` (text, optional): Brief description of the category.
*   **Relations:**
    *   The frontend expects to filter content types *by* category slug. For example, fetching all articles where `category.slug` is "news".
*   **Frontend Usage:** Category archive pages, breadcrumbs, article/opinion cards.
*   **Note on Category Page Logic (`lib/strapi.ts -> fetchItemsForCategory`):**
    The frontend has a mapping (`VALID_CATEGORY_SLUGS`) to determine which content types to fetch for a given category slug. For example:
    *   `/categories/news` fetches `articles` where `category.slug = 'news'`.
    *   `/categories/opinion` fetches `opinions`.
    *   `/categories/meme-cartoons` fetches `memes`.
    *   `/categories/news-from-web` fetches `external-articles`.
    *   `/categories/featured` fetches `articles` where `is_featured = true`.
    Ensure category slugs in Strapi match these expectations or update the frontend mapping.

---

### 3.6. Tags (`/api/tags`)

*   **Purpose:** Used for tagging various content types (Articles, Opinions, etc.).
*   **Key Fields:**
    *   `name` (string, required): Display name of the tag.
    *   `slug` (string, UID, required, unique): URL-friendly identifier.
*   **Frontend Usage:** Displaying tags on article/opinion pages, potentially for tag-based archive pages (future feature), fetching related content.

---

### 3.7. Subscriptions (`/api/subscriptions`)

*   **Purpose:** Storing email addresses for newsletter subscriptions.
*   **Key Fields:**
    *   `email` (email, required, unique): Subscriber's email address.
*   **Permissions:** Requires `create` permission for the "Public" role.
*   **Frontend Usage:** `components/shared/newsletter-form.tsx` (via `/api/newsletter` Next.js route which then posts to Strapi) and potentially a Server Action in `lib/actions.ts`.

---

### 3.8. Staff Members (`/api/staff-members`) (Optional - for About Us page)

*   **Purpose:** Information about team members.
*   **Key Fields:**
    *   `name` (string, required): Full name of the staff member.
    *   `slug` (string, UID, optional, unique): For individual bio pages.
    *   `title` (string, optional): Job title (e.g., "Editor-in-Chief").
    *   `bio` (richtext or text): Full biography.
    *   `bio_summary` (text, optional): Short summary for cards.
    *   `email` (email, optional): Contact email.
    *   `social_links` (JSON, optional): Key-value pairs for social media profiles (e.g., `{"twitter": "url", "linkedin": "url"}`).
    *   `order` (integer, optional): For custom sorting of staff members.
*   **Relations:**
    *   `thumbnail` (media, single, optional): Profile picture.
        *   **Expected Population:** `url`, `alternativeText`.
*   **Frontend Usage:** `app/(site)/about/page.tsx`. Currently uses dummy data but is structured to fetch this.

## 4. Media Library (`/api/upload`)

*   All images (featured images, author images, meme images, images in rich text) are expected to be managed via Strapi's Media Library.
*   **Expected Image Data:** When an image relation is populated, the frontend expects at least:
    *   `url` (string): The direct URL to the image.
    *   `alternativeText` (string, optional but highly recommended for accessibility).
    *   `width` (number).
    *   `height` (number).
    *   `formats` (object, optional): Contains URLs for different image sizes (thumbnail, small, medium, large). The frontend may use these for optimization.
*   Ensure appropriate image file types are allowed and that image optimization is configured in Strapi if possible.

## 5. Specific API Endpoints Used by Frontend (Examples from `lib/strapi.ts`)

*   `GET /api/articles` (with various filters for featured, standard, by slug, by category)
*   `GET /api/opinions` (with filters for by slug, by category)
*   `GET /api/memes`
*   `GET /api/external-articles`
*   `POST /api/subscriptions` (from Next.js API route, not directly from client)

## 6. Rich Text Content Structure

The `RichTextRenderer` component (`components/shared/rich-text-renderer.tsx`) is designed to parse Strapi's default rich text JSON output. It supports:
*   Paragraphs
*   Headings (H1-H6)
*   Ordered and Unordered Lists
*   Images (embedded from Media Library)
*   Quotes (Blockquotes)
*   Code Blocks (basic rendering)
*   Links (internal and external)
*   Inline formatting: bold, italic, underline, strikethrough, code.

Ensure the rich text editor in Strapi outputs a compatible JSON structure.

## 7. Environment Variables Referenced by Frontend for Strapi Interaction

*   `NEXT_PUBLIC_STRAPI_URL` (required): Base URL of the Strapi instance.
*   `STRAPI_API_TOKEN` (optional, server-side only): For authenticated requests.

## 8. Questions & Clarifications

Please direct any questions regarding these frontend expectations to the frontend development team. This document aims to be comprehensive, but specific scenarios or edge cases might require further discussion.

---

This document should serve as a good starting point for configuring Strapi. It's crucial that the field names, types, and relation structures in Strapi match these expectations to ensure smooth integration.
