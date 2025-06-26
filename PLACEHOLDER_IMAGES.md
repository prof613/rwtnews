# Placeholder Image List & Sizes for Red, White and True News

This document lists the placeholder images required for the Red, White and True News frontend. Please replace these placeholders with actual, optimized images in your `public` directory.

## I. Core Site Images

---

1.  **File Path:** `public/images/core/american-flag.jpg`
    *   **Description/Purpose:** A subtle American flag texture or image intended for the main site background.
    *   **Used In:** Potentially applied to the `<body>` tag via `styles/globals.css` if a full-site background image is desired.
    *   **Recommended Dimensions/Aspect Ratio:** Large enough to cover various screen sizes without significant pixelation (e.g., at least 1920x1080px). Should be highly optimized for file size due to its pervasive nature.
    *   **Notes:** Consider a seamless texture or an image that looks good when tiled or stretched. File size is critical.

2.  **File Path:** `public/images/core/mainbanner.jpg`
    *   **Description/Purpose:** The main promotional banner displayed prominently, often at the top of the main content area on the homepage.
    *   **Used In:** `components/layout/main-banner.tsx`
    *   **Recommended Dimensions/Aspect Ratio:** The original site's image was 1000x250px (4:1 aspect ratio). This is a good starting point. Ensure it's responsive.
    *   **Notes:** This image is often an LCP (Largest Contentful Paint) element, so optimize it well.

3.  **File Path:** `public/images/core/rwtn_favicon.jpg`
    *   **Description/Purpose:** The favicon for the website, displayed in browser tabs and bookmarks.
    *   **Used In:** `app/layout.tsx` (metadata)
    *   **Recommended Dimensions/Aspect Ratio:** Square. Common sizes are 16x16px, 32x32px, 48x48px, 64x64px.
    *   **Notes:** **Crucially, favicons are best served as `.ico` or `.png` files.** A `.jpg` may not render correctly or consistently across all browsers. Please replace with an appropriate format. Consider providing multiple sizes for different devices.

4.  **File Path:** `public/images/core/stoptdslogo1.png`
    *   **Description/Purpose:** The main logo for Red, White and True News.
    *   **Used In:** `components/layout/header.tsx`, `components/layout/footer.tsx`.
    *   **Recommended Dimensions/Aspect Ratio:** The dimensions will depend on your logo's design. For the header, it was set to `width={150}` and `height={40}`. For the footer, `width={180}` and `height={48}`. Ensure it's clear and legible.
    *   **Notes:** A transparent background (PNG) is highly recommended for versatility.

5.  **File Path:** `public/images/core/placeholder.jpg`
    *   **Description/Purpose:** A generic fallback image used for articles, opinions, or any content where a specific featured image is missing.
    *   **Used In:** `ArticleCard.tsx`, `OpinionCard.tsx`, `ExternalArticleCard.tsx`, `ArticlePageClient.tsx`, `OpinionPageClient.tsx`, `FeaturedArticleSection.tsx`, etc.
    *   **Recommended Dimensions/Aspect Ratio:** A 16:9 aspect ratio is common for article previews (e.g., 1200x675px, 800x450px). For cards, ensure it looks good at smaller sizes too.
    *   **Notes:** Keep it neutral and visually unobtrusive.

## II. Staff / Author Images

---

1.  **File Path:** `public/images/staff/authors/placeholder-author.jpg`
    *   **Description/Purpose:** A fallback image for author profile pictures when a specific author image is not available.
    *   **Used In:** `ArticlePageClient.tsx`, `OpinionPageClient.tsx`, `AboutPage.tsx` (dummy data).
    *   **Recommended Dimensions/Aspect Ratio:** Square (1:1 aspect ratio). Common sizes are 100x100px, 128x128px, or 150x150px.
    *   **Notes:** Should be a simple, generic silhouette or icon.

## III. Social Media Icons

---

*   **Description/Purpose:** Icons for various social media platforms.
*   **Used In:** `components/layout/header.tsx`, `components/layout/footer.tsx`.
*   **Recommended Dimensions/Aspect Ratio:** Square. Typically small, e.g., 24x24px or 32x32px.
*   **Notes:** These are currently listed as PNGs. Consider using SVG icons (e.g., from a library like Lucide React, or custom SVGs) for better scalability, smaller file sizes, and easier color manipulation via CSS. If using PNGs, ensure they have transparent backgrounds if they are to be placed on varied background colors.

1.  **File Path:** `public/images/core/facebook.png`
2.  **File Path:** `public/images/core/twitter.png` (or X logo)
3.  **File Path:** `public/images/core/youtube.png`
4.  **File Path:** `public/images/core/instagram.png`
5.  **File Path:** `public/images/core/tiktok.png`
6.  **File Path:** `public/images/core/rumble.png`
7.  **File Path:** `public/images/core/gettr.png`
8.  **File Path:** `public/images/core/truth.png`

## General Image Guidelines:

*   **Optimization:** All images should be optimized for the web to reduce file sizes and improve loading times. Use tools like ImageOptim, Squoosh, or TinyPNG.
*   **Formats:** Use appropriate formats:
    *   **JPEG (.jpg):** For photographs and complex images where transparency is not needed.
    *   **PNG (.png):** For images requiring transparency (like logos, icons) or sharp lines.
    *   **SVG:** For logos and icons where scalability and crispness at all sizes are paramount.
    *   **WebP:** Offers excellent compression and quality with transparency, but ensure browser compatibility if not using Next.js Image optimization which handles this.
*   **Responsiveness:** Use the Next.js `<Image>` component with appropriate `sizes` props to ensure images are served efficiently for different screen sizes.
*   **Accessibility:** Always provide meaningful `alt` text for images, unless they are purely decorative (in which case, `alt=""`).

This list should help in gathering or creating the necessary visual assets for the website.
