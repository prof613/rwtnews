import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@/styles/globals.css" // Assuming globals.css is in root styles/ folder
import { ThemeProvider } from "@/components/theme-provider" // Assuming shadcn/ui theme provider

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Red, White and True News",
    template: "%s | Red, White and True News",
  },
  description: "The latest news with a patriotic perspective.",
  icons: {
    icon: "/images/core/rwtn_favicon.jpg", // Ensure this path is correct
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light" // Forcing light theme as per site design
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
