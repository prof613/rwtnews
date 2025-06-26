import type React from "react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import Sidebar from "@/components/layout/sidebar"
import MainBanner from "@/components/layout/main-banner"

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto p-4 flex flex-col md:flex-row gap-4 bg-white shadow-lg">
        {/* Main content area */}
        <div className="w-full md:w-3/4 order-1 md:order-1">
          <MainBanner />
          {children}
        </div>
        {/* Sidebar */}
        <div className="w-full md:w-1/4 order-2 md:order-2 mt-4 md:mt-0">
          <Sidebar />
        </div>
      </main>
      <Footer />
    </>
  )
}
