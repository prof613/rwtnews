import Link from "next/link"
import Image from "next/image"
import NewsletterForm from "@/components/shared/newsletter-form" // We'll create this next

const footerLinks = [
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
  { href: "/terms", label: "Terms of Use" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/support", label: "Our Mission" },
]

const socialLinks = [
  {
    href: "https://www.facebook.com/RedWhiteAndTrueNews/",
    src: "/images/core/facebook.png",
    alt: "Facebook",
  },
  {
    href: "https://twitter.com/RWT_News",
    src: "/images/core/twitter.png",
    alt: "Twitter",
  },
  {
    href: "https://www.youtube.com/channel/UC2zQ4hCorllD1a7TUnK-Y-Q",
    src: "/images/core/youtube.png",
    alt: "YouTube",
  },
  {
    href: "https://www.instagram.com/redwhiteandtruenews/",
    src: "/images/core/instagram.png",
    alt: "Instagram",
  },
  {
    href: "https://www.tiktok.com/@redwhiteandtruenews",
    src: "/images/core/tiktok.png",
    alt: "TikTok",
  },
  {
    href: "https://rumble.com/c/RedWhiteandTrueNews",
    src: "/images/core/rumble.png",
    alt: "Rumble",
  },
  {
    href: "https://gettr.com/user/rwtnews",
    src: "/images/core/gettr.png",
    alt: "Gettr",
  },
  {
    href: "https://truthsocial.com/@RWTNews",
    src: "/images/core/truth.png",
    alt: "Truth Social",
  },
]

const SocialIcon = ({ href, src, alt }: { href: string; src: string; alt: string }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
    <Image src={src || "/placeholder.svg"} alt={alt} width={28} height={28} className="filter invert" />
  </a>
)

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-rwt-blue text-gray-300 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Column 1: Logo and Copyright */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src="/images/core/stoptdslogo1.png" // Assuming this is the footer logo
                alt="Red, White and True News"
                width={180}
                height={48}
              />
            </Link>
            <p className="text-sm">
              &copy; {currentYear} Red, White and True News LLC.
              <br />
              All Rights Reserved.
            </p>
            <p className="text-xs">Powered by Patriotism.</p>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h5 className="text-lg font-semibold text-white mb-3">Quick Links</h5>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-white hover:underline transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Newsletter Signup */}
          <div>
            <h5 className="text-lg font-semibold text-white mb-3">Stay Updated</h5>
            <p className="text-sm mb-3">Get the latest news and opinions directly in your inbox.</p>
            <NewsletterForm />
          </div>

          {/* Column 4: Social Media */}
          <div>
            <h5 className="text-lg font-semibold text-white mb-3">Follow Us</h5>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <SocialIcon key={social.alt} {...social} />
              ))}
            </div>
            <div className="mt-6">
              <h5 className="text-lg font-semibold text-white mb-2">Support Our Mission</h5>
              <a
                href="https://www.gofundme.com/f/support-red-white-and-true-news-mission"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-rwt-red text-white font-semibold py-2 px-4 rounded-md hover:bg-opacity-80 transition-colors text-sm"
              >
                Donate via GoFundMe
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 mt-8 text-center text-sm">
          <p>
            The content on Red, White and True News is for informational and educational purposes only.
            <br />
            Views expressed are those of the authors and do not necessarily reflect the official policy or position of
            Red, White and True News LLC.
          </p>
        </div>
      </div>
    </footer>
  )
}
