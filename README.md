# Red, White and True News - Next.js Frontend

This is the Next.js (App Router) frontend for the Red, White and True News website. It is designed to connect to a Strapi CMS backend.

## Project Overview

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS, global styles
- **State Management**: React Server Components, React Client Components with hooks
- **Content Source**: Strapi CMS (expected)

## Prerequisites

- Node.js (version 20.x or later recommended)
- npm, yarn, or pnpm
- A running Strapi instance with the required content types and data.

## Getting Started

### 1. Clone the Repository (if applicable)

\`\`\`bash
# If this project is in a Git repository
# git clone <repository-url>
# cd <project-folder>
\`\`\`

### 2. Install Dependencies

\`\`\`bash
npm install
# or
yarn install
# or
pnpm install
\`\`\`

### 3. Set Up Environment Variables

Create a `.env.local` file in the root of the project by copying the example file:

\`\`\`bash
cp .env.local.example .env.local
\`\`\`

Then, edit `.env.local` with your actual credentials and URLs:

- `NEXT_PUBLIC_STRAPI_URL`: The full URL to your Strapi backend (e.g., `http://127.0.0.1:1337` or `https://your-strapi-api.com`). This is used client-side and server-side for fetching data.
- `NEXT_PUBLIC_YOUTUBE_API_KEY`: Your YouTube Data API v3 key for fetching video information.
- `SENDGRID_API_KEY`: Your SendGrid API key. This is used server-side (in an API route or Server Action) for the newsletter signup and should be kept secret.
- `FROM_EMAIL`: The email address used as the sender for newsletters (e.g., `webcontact@redwhiteandtruenews.com`).

### 4. Ensure Strapi Backend is Running and Configured

- Your Strapi backend must be running and accessible at the `NEXT_PUBLIC_STRAPI_URL`.
- **Important**: API Permissions in Strapi:
    - For each content type (articles, opinions, memes, categories, external-articles, etc.), ensure that the `find` and `findOne` permissions are enabled for the "Public" role in Strapi's `Settings > Roles > Public > Permissions` section.
    - For the newsletter subscription, if you have a `subscriptions` content type, ensure the `create` permission is enabled for the Public role.
    - Ensure all fields you want to display, including relations (like categories, author images, featured images), are populated and accessible via the API.

### 5. Run the Development Server

\`\`\`bash
npm run dev
# or
yarn dev
# or
pnpm dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Key Project Structure

- `app/`: Contains all routes, layouts, and UI components (App Router).
  - `(site)/`: Route group for main site pages with shared layout.
  - `api/`: API routes handled by Next.js (e.g., newsletter signup).
- `components/`: Shared React components.
  - `layout/`: Header, Footer, Sidebar, etc.
  - `shared/`: Reusable UI elements like cards, buttons.
  - `sections/`: Components specific to homepage sections.
- `lib/`: Utility functions, Strapi API helpers, constants.
  - `strapi.ts`: Core functions for interacting with the Strapi API.
  - `actions.ts`: Server Actions.
- `public/`: Static assets (images, fonts).
- `styles/`: Global stylesheets.
- `types/`: TypeScript type definitions.

## Strapi Data Fetching

- Data is primarily fetched using Server Components.
- Helper functions in `lib/strapi.ts` are used to interact with the Strapi API.
- Ensure your Strapi API endpoints are structured as expected by these helper functions (e.g., population of related fields).

## Image Placeholders

During development, if actual images are not yet available from Strapi or locally, the site will use placeholder images or styles. You will need to provide actual images for:

- `public/images/core/american-flag.jpg` (for the site background)
- `public/images/core/mainbanner.jpg`
- `public/images/core/rwtn_favicon.jpg`
- `public/images/core/stoptdslogo1.png`
- `public/images/core/placeholder.jpg` (fallback for content images)
- `public/images/staff/authors/placeholder-author.jpg` (fallback for author images)
- Social media icons in `public/images/core/`

Refer to the "Placeholder Image List" (to be provided separately) for recommended sizes.

## Building for Production

\`\`\`bash
npm run build
npm run start
\`\`\`

## Linting

\`\`\`bash
npm run lint
\`\`\`

## Further Information

Refer to the "Backend Handover Document" (to be provided separately) for detailed information on expected API responses from Strapi and other backend integration points.
