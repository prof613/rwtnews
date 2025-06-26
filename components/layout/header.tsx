"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Search } from "lucide-react" // Using Lucide icons

// Navigation links data
const navLinks = [
  { href: "/", label: "Home" },
  { href: "/categories/news", label: "News" },
  { href: "/categories/opinion", label: "Opinion" },
  { href: "/categories/meme-cartoons", label: "Memes/Cartoons" },
  { href: "/videos", label: "Videos" },
  { href: "/about", label: "About" },
  { href: "/support", label: "Our Mission" },
  { href: "/contact", label: "Contact" },
  { href: "#", label: "Community", disabled: true },
]

// Social links data
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

// Reusable NavLink component
const NavLink = ({ href, label, disabled = false }: { href: string; label: string; disabled?: boolean }) => (
  <Link
    href={href}
    className={`px-3 py-2 rounded-md text-sm font-medium ${
      disabled ? "text-gray-400 cursor-not-allowed" : "text-white hover:bg-rwt-red transition-colors"
    }`}
    aria-disabled={disabled}
    tabIndex={disabled ? -1 : undefined}
    onClick={(e) => disabled && e.preventDefault()}
  >
    {label}
  </Link>
)

// Social Icon component
const SocialIcon = ({ href, src, alt }: { href: string; src: string; alt: string }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
    <Image src={src || "/placeholder.svg"} alt={alt} width={24} height={24} />
  </a>
)

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="bg-rwt-blue sticky top-0 z-50 shadow-md">
      {/* Top bar with social links */}
      <div className="bg-gray-800 bg-opacity-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-end items-center h-10">
          <div className="flex items-center space-x-4">
            {socialLinks.map((social) => (
              <SocialIcon key={social.alt} {...social} />
            ))}
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src="/images/core/stoptdslogo1.png" // Main logo
                alt="Red, White and True News Logo"
                width={150} // Adjust width as needed
                height={40} // Adjust height as needed
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex md:items-center md:space-x-1">
            {navLinks.map((link) => (
              <NavLink key={link.label} {...link} />
            ))}
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex items-center">
            <form action="/search" method="GET" className="relative">
              <input
                type="search"
                name="q"
                placeholder="Search..."
                className="bg-gray-700 text-white rounded-full pl-4 pr-10 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-rwt-red"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <Search size={18} />
              </button>
            </form>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  link.disabled
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
                aria-disabled={link.disabled}
                tabIndex={link.disabled ? -1 : undefined}
                onClick={(e) => {
                  if (link.disabled) e.preventDefault()
                  else setIsMobileMenuOpen(false) // Close menu on click
                }}
              >
                {link.label}
              </Link>
            ))}
            {/* Mobile Search Bar */}
            <div className="px-2 pt-4">
              <form action="/search" method="GET" className="relative">
                <input
                  type="search"
                  name="q"
                  placeholder="Search..."
                  className="w-full bg-gray-700 text-white rounded-full pl-4 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rwt-red"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <Search size={18} />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
