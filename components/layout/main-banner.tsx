import Image from "next/image"
import Link from "next/link"

// This component is a Server Component by default as it doesn't use client-side hooks.
// It will display a static or dynamically fetched banner image.
// For now, we'll use a static image as per the original site structure.

export default function MainBanner() {
  // In the future, you could fetch banner details from Strapi if needed.
  // For example:
  // const bannerData = await fetchMainBannerData();
  // const imageUrl = bannerData?.image?.url || "/images/core/mainbanner.jpg";
  // const linkUrl = bannerData?.link || "/";

  const imageUrl = "/images/core/mainbanner.jpg" // Static path for now
  const linkUrl = "/" // Link for the banner, e.g., to homepage or a specific promotion

  return (
    <section className="mb-6 md:mb-8">
      <Link href={linkUrl} className="block group">
        <div className="relative w-full aspect-[3/1] md:aspect-[4/1] rounded-lg overflow-hidden shadow-lg">
          {/* 
            Adjust aspect ratio as needed. 
            Original site's mainbanner.jpg is 1000x250, which is 4:1.
            A common banner aspect ratio is also 3:1.
            Using aspect-[4/1] to match the image dimensions.
          */}
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt="Red, White and True News - Main Banner"
            fill
            priority // This image is likely to be LCP on homepage
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 1000px" // Adjust sizes based on layout
            className="object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
          />
          {/* Optional: Add text overlay on the banner if needed in the future */}
          {/* <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
            <h2 className="text-white text-2xl md:text-4xl font-bold">Banner Text</h2>
          </div> */}
        </div>
      </Link>
    </section>
  )
}
