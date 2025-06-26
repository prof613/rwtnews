# Strapi Backend Setup Guide for RWT News (Novice Friendly)

**Welcome!** This guide will walk you step-by-step through setting up the Strapi backend for your Red, White and True News website. We'll use the Strapi Admin Panel (a web interface) to build everything. No complex backend coding is required for this setup!

**Goal:** To create a Strapi backend that provides all the necessary data (articles, opinions, images, etc.) to the Next.js frontend we've already built.

**What is Strapi?** Strapi is a "headless CMS." Think of it as a user-friendly tool to create a database and an API (a way for your frontend to talk to the backend) without writing much, if any, backend code. You define your content structure (like "Articles" or "Categories") through a web interface, and Strapi does the heavy lifting.

---

## Prerequisites

*   **Node.js and npm/yarn:** Strapi and Next.js both need Node.js. If you haven't installed it, download it from [nodejs.org](https://nodejs.org/). npm is included with Node.js.
*   **A Terminal/Command Prompt:** You'll need this to run a few commands.

---

## Step 1: Install Strapi & Create Your Backend Project

1.  **Open your Terminal or Command Prompt.**
2.  **Navigate to where you want to create your backend project.** This should be a *different folder* than your Next.js frontend project. For example, if your frontend is in `C:\Projects\RWTNews_Frontend`, you might create your backend in `C:\Projects\RWTNews_Backend`.
    \`\`\`bash
    cd path/to/your/projects_folder
    \`\`\`
3.  **Run the Strapi installation command:**
    This command will create a new folder named `rwtnews-backend` (or whatever you choose) and install Strapi in it.
    \`\`\`bash
    npx create-strapi-app@latest rwtnews-backend --quickstart
    \`\`\`
    *   `rwtnews-backend`: This is the name of the folder for your Strapi project. You can change it if you like.
    *   `--quickstart`: This tells Strapi to use default settings (SQLite database, which is fine for local development and many production uses) and automatically start the server.

4.  **Wait for Installation:** This might take a few minutes. Strapi will download files and set up your project.
5.  **Automatic Startup & Admin Creation:**
    *   Once installed, Strapi should automatically open a new tab in your web browser and take you to the admin registration page (usually `http://localhost:1337/admin`).
    *   If it doesn't open automatically, manually go to `http://localhost:1337/admin` in your browser.
    *   **Create your first admin user:** Fill in your details (name, email, password). This will be your main login for managing the Strapi backend. **Remember this password!**
    *   Click "Let's Start".

You are now in the Strapi Admin Panel! Your Strapi backend server is running locally.

---

## Step 2: Understanding the Strapi Admin Panel (Quick Tour)

When you log in, you'll see a dashboard. The most important parts for us are on the left sidebar:

*   **Content-Type Builder:** This is where you define the *structure* of your content (like creating a template for "Articles" with fields for title, body, image, etc.). This is where we'll spend most of our initial time.
*   **Content Manager:** Once you've defined your structures, this is where you (or content editors) will actually *create and manage* the content (write articles, upload images).
*   **Settings:** This section has various configurations, including "Roles & Permissions" which we'll use later.

---

## Step 3: Building Your Content Structure (Content Types)

We'll now create each "Content Type" (like a data table or template) based on the `BACKEND_HANDOVER_DOCUMENT.md`.

**General Process for Creating Each Content Type:**

1.  In the Strapi Admin Panel, click on **"Content-Type Builder"** in the left sidebar.
2.  Under "Collection Types", click **"+ Create new collection type"**.
3.  Enter the **Display name** (e.g., "Article", "Category"). Strapi will auto-fill the API ID (slug).
4.  Click **"Continue"**.
5.  Now, you'll add fields to this Content Type using the buttons like "+ Add another field".

Let's create them one by one:

### 3.1. Categories

1.  **Create the Content Type:**
    *   Display name: `Category` (Strapi will suggest `category` as API ID)
    *   Click **"Continue"**.
2.  **Add Fields:**
    *   **`name` field:**
        *   Click "+ Add another field".
        *   Select **"Text"**.
        *   In the "Name" field, type `name`.
        *   Select "Short text".
        *   Click **"Finish"**.
        *   *(Optional: Click on the `name` field you just added, go to "Advanced Settings" tab, and check "Required field" and "Unique field" if you want these constraints.)*
    *   **`slug` field:**
        *   Click "+ Add another field".
        *   Select **"UID"**.
        *   In the "Name" field, type `slug`.
        *   For "Attached field", select `name` (this means Strapi can auto-generate the slug from the category name).
        *   Click **"Finish"**.
        *   *(Make sure this is also set as Required and Unique in Advanced Settings.)*
    *   **`description` field:**
        *   Click "+ Add another field".
        *   Select **"Text"**.
        *   Name: `description`.
        *   Select "Long text".
        *   Click **"Finish"**.
3.  Click the **"Save"** button (usually green, top right). Strapi will restart to apply changes. Wait for it to reload.

### 3.2. Tags

1.  **Create the Content Type:**
    *   Display name: `Tag`
2.  **Add Fields:**
    *   **`name` field:** Text (Short text), Required, Unique.
    *   **`slug` field:** UID (attached to `name`), Required, Unique.
3.  **Save.**

### 3.3. Articles

This one has more fields, including relations and media.

1.  **Create the Content Type:**
    *   Display name: `Article`
2.  **Add Fields:**
    *   **`title` field:** Text (Short text), Required.
    *   **`slug` field:** UID (attached to `title`), Required, Unique.
    *   **`excerpt` field:** Text (Long text).
    *   **`quote` field:** Text (Long text).
    *   **`rich_body` field:**
        *   Click "+ Add another field".
        *   Select **"Rich text (Markdown)"**.
        *   Name: `rich_body`.
        *   Click **"Finish"**. (This field should be Required).
    *   **`date` field:**
        *   Click "+ Add another field".
        *   Select **"Date"**.
        *   Name: `date`.
        *   Type: `date` (for just date, or `datetime` if you need time too). The handover doc specifies `date`.
        *   Click **"Finish"**. (This field should be Required).
    *   **`author` field:** Text (Short text).
    *   **`word_count` field:** Number (Integer).
    *   **`read_time` field:** Number (Integer).
    *   **`is_featured` field:**
        *   Click "+ Add another field".
        *   Select **"Boolean"**.
        *   Name: `is_featured`.
        *   Default value: `false`.
        *   Click **"Finish"**.
    *   **`image_path` field:** Text (Short text). (This is a legacy/fallback field).
    *   **`image` (Featured Image) field:**
        *   Click "+ Add another field".
        *   Select **"Media"**.
        *   Name: `image`.
        *   Select "Single media".
        *   Click **"Finish"**.
    *   **`author_image` field:** Media (Single media), Name: `author_image`.
    *   **`category` (Primary Category) field - This is a Relation:**
        *   Click "+ Add another field".
        *   Select **"Relation"**.
        *   On the right side (usually says "Article"), find the dropdown that says "Category (Category)". Select it.
        *   Now choose the relationship type. An Article has one Category. A Category can have many Articles. So, select the icon that looks like: `Article` (many lines) --- (one line) `Category`. (This is "Many to One": Many Articles can belong to One Category).
        *   The field name on the Article side will be `category`.
        *   Click **"Finish"**.
    *   **`secondary_category` field:** Relation (similar to `category`, "Many to One" with Category), Name: `secondary_category`.
    *   **`tags` field - This is also a Relation:**
        *   Click "+ Add another field".
        *   Select **"Relation"**.
        *   Select "Tag (Tag)" from the right-side dropdown.
        *   Choose the icon that represents "Many to Many": `Article` (many lines) --- (many lines) `Tag`. (An Article can have many Tags, and a Tag can be on many Articles).
        *   The field name on the Article side will be `tags`.
        *   Click **"Finish"**.
3.  **Save.** Wait for Strapi to restart.

### 3.4. Opinions

Follow a similar process as Articles.

1.  **Create the Content Type:**
    *   Display name: `Opinion`
2.  **Add Fields:**
    *   `title`: Text (Short text), Required.
    *   `slug`: UID (attached to `title`), Required, Unique.
    *   `excerpt`: Text (Long text).
    *   `quote`: Text (Long text).
    *   `rich_body`: Rich text, Required.
    *   `date`: Date (date type), Required.
    *   `author`: Text (Short text).
    *   `word_count`: Number (Integer).
    *   `read_time`: Number (Integer).
    *   `image_path`: Text (Short text).
    *   `featured_image`: Media (Single media).
    *   `author_image`: Media (Single media).
    *   `secondary_category`: Relation ("Many to One" with Category).
    *   `tags`: Relation ("Many to Many" with Tag).
3.  **Save.**

### 3.5. Memes (or Memes/Cartoons)

1.  **Create the Content Type:**
    *   Display name: `Meme` (or `MemeCartoon` if you prefer)
2.  **Add Fields:**
    *   `title`: Text (Short text).
    *   `slug`: UID (attached to `title`, optional if memes don't have detail pages).
    *   `image_path`: Text (Short text).
    *   `date`: Date (date type).
    *   `image`: Media (Single media), Required.
    *   *(Optional) `category`: Relation ("Many to One" with Category, if you categorize memes).*
    *   *(Optional) `tags`: Relation ("Many to Many" with Tag).*
3.  **Save.**

### 3.6. External Articles

1.  **Create the Content Type:**
    *   Display name: `External Article` (or `ExternalArticle`)
2.  **Add Fields:**
    *   `title`: Text (Short text), Required.
    *   `url`: Text (Short text), Required. (In Advanced Settings for this field, you can add a Regex pattern for URL validation if desired, e.g., `https?://.+`).
    *   `source`: Text (Short text).
    *   `excerpt`: Text (Long text).
    *   `image_url`: Text (Short text). (For direct URL to an external image).
    *   `date`: Date (date type).
    *   *(Optional) `category`: Relation ("Many to One" with Category).*
    *   *(Optional) `tags`: Relation ("Many to Many" with Tag).*
3.  **Save.**

### 3.7. Subscriptions (for Newsletter)

1.  **Create the Content Type:**
    *   Display name: `Subscription`
2.  **Add Fields:**
    *   `email`: Email, Required, Unique.
3.  **Save.**

### 3.8. Staff Members (Optional - for About Us page)

1.  **Create the Content Type:**
    *   Display name: `Staff Member` (or `StaffMember`)
2.  **Add Fields:**
    *   `name`: Text (Short text), Required.
    *   `slug`: UID (attached to `name`).
    *   `title`: Text (Short text) (e.g., "Editor-in-Chief").
    *   `bio`: Rich text.
    *   `bio_summary`: Text (Long text).
    *   `email`: Email.
    *   `thumbnail`: Media (Single media).
    *   `social_links`:
        *   Click "+ Add another field".
        *   Select **"JSON"**.
        *   Name: `social_links`.
        *   Click **"Finish"**. (You'll store links like `{"twitter": "url", "linkedin": "url"}` here).
    *   `order`: Number (Integer) (for custom sorting).
3.  **Save.**

Phew! That's the structure building done. Your Strapi backend now "knows" what kind of data to expect.

---

## Step 4: Setting API Permissions

By default, Strapi keeps your data private. We need to tell it which content is publicly accessible by the frontend.

1.  In the Strapi Admin Panel, go to **"Settings"** (in the left sidebar, under "GENERAL").
2.  Under "USERS & PERMISSIONS PLUGIN", click on **"Roles"**.
3.  Click on the **"Public"** role.
4.  You'll see a list of your Content Types (Article, Category, Opinion, etc.). For each one that needs to be publicly readable:
    *   **Articles:**
        *   Find "Article" in the list.
        *   Check the boxes for `find` (to get a list of articles) and `findOne` (to get a single article by ID or slug).
    *   **Opinions:**
        *   Find "Opinion". Check `find` and `findOne`.
    *   **Categories:**
        *   Find "Category". Check `find` and `findOne`.
    *   **Tags:**
        *   Find "Tag". Check `find` and `findOne`.
    *   **Memes:**
        *   Find "Meme". Check `find` and `findOne`.
    *   **External Articles:**
        *   Find "ExternalArticle". Check `find` and `findOne`.
    *   **Staff Members (if created):**
        *   Find "StaffMember". Check `find` and `findOne`.
    *   **Subscriptions:**
        *   Find "Subscription".
        *   Check the box for `create` (this allows the frontend API route to add new email subscribers). You generally *don't* want `find` or `findOne` public for subscriptions.
5.  After checking the boxes for all necessary permissions, click the **"Save"** button (top right).

Your API is now open for the frontend to fetch data!

---

## Step 5: (Optional but Recommended) Add Some Sample Content

It's a good idea to add a few sample articles, categories, etc., so you can see data flowing into your frontend.

1.  In the Strapi Admin Panel, click on **"Content Manager"** in the left sidebar.
2.  You'll see your list of Content Types.
3.  Click on, for example, "Category".
4.  Click the **"+ Create new entry"** button.
5.  Fill in the fields (e.g., Name: "News", Slug: "news").
6.  Click **"Save"**, then **"Publish"**.
7.  Repeat for a few Articles:
    *   Give it a title, some rich text body content.
    *   Try uploading an image for the "Image" field.
    *   Select a Category you created.
    *   Save and Publish.

Adding 2-3 sample entries for each main content type will be very helpful for testing.

---

## Step 6: Connecting Your Next.js Frontend

Your Next.js frontend needs to know where your Strapi backend is running.

1.  **Find your Next.js project folder** (the one we built earlier, e.g., `RWTNews_Frontend`).
2.  Look for a file named `.env.local`. If it doesn't exist, create it by copying `.env.local.example` (if you have one) or just create a new file.
3.  Open `.env.local` in a text editor.
4.  Add or modify the following line:
    \`\`\`
    NEXT_PUBLIC_STRAPI_URL=http://127.0.0.1:1337
    \`\`\`
    *   `http://127.0.0.1:1337` is the default address where your local Strapi server is running. If you see a different port in your terminal when Strapi starts, use that port.
    *   Also, ensure other environment variables from the `README.md` are in this file if you plan to test those features (like `NEXT_PUBLIC_YOUTUBE_API_KEY`, `SENDGRID_API_KEY`, `FROM_EMAIL`). For now, `NEXT_PUBLIC_STRAPI_URL` is the most critical for basic data fetching.

---

## Step 7: Running Both Projects & Testing

You need both your Strapi backend and your Next.js frontend servers running at the same time.

1.  **Start/Verify Strapi Backend:**
    *   Open a terminal, navigate to your Strapi project folder (e.g., `cd path/to/rwtnews-backend`).
    *   Run `npm run develop` (or `yarn develop`). This starts the Strapi server if it's not already running from the `--quickstart`.
    *   You should see messages indicating the server is running, typically on port 1337.

2.  **Start Next.js Frontend:**
    *   Open a *new, separate* terminal window.
    *   Navigate to your Next.js project folder (e.g., `cd path/to/RWTNews_Frontend`).
    *   Run `npm run dev` (or `yarn dev`). This starts the Next.js development server, usually on port 3000.

3.  **Test in Browser:**
    *   Open your web browser and go to `http://localhost:3000` (your Next.js frontend).
    *   If you added sample content in Strapi and set permissions correctly, you should start seeing that content appear on your homepage, article pages, etc. For example, if you created a "News" category and an article in it, navigating to `/categories/news` (if that link exists in your header) or directly to an article page should show data.

---

## Basic Troubleshooting Tips

*   **Content Not Appearing?**
    *   **Is Strapi server running?** Check the terminal where you ran `npm run develop` for Strapi.
    *   **Is Next.js server running?** Check the terminal for Next.js.
    *   **Correct `NEXT_PUBLIC_STRAPI_URL`?** Double-check it in your Next.js `.env.local` file.
    *   **API Permissions Set?** Go back to Step 4 in Strapi and ensure `find` and `findOne` are checked for the Public role for the relevant content types.
    *   **Content Published?** In Strapi's Content Manager, make sure your sample entries are "Published" (not just saved as drafts). There's usually a green "Published" indicator or a publish button.
    *   **Browser Console Errors?** Open your browser's developer tools (usually F12) and check the "Console" tab for any error messages when loading frontend pages. This can give clues about API request failures.
    *   **Strapi Terminal Errors?** Check the terminal running your Strapi server for any error messages when the frontend tries to fetch data.

---

## Congratulations!

If you see your Strapi content appearing on your Next.js site, you've successfully set up the basics of your headless CMS backend and connected it to your frontend!

From here, you can continue adding more content in Strapi, and your frontend will display it. Refer back to the `BACKEND_HANDOVER_DOCUMENT.md` for the full list of fields and their purposes if you need a refresher while adding content.

Good luck, and take your time with each step!
