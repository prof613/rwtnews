"use client" // Needs to be a client component for useRouter and usePathname

import type React from "react"

import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"

type PaginationControlsProps = {
  currentPage: number
  totalPages: number
  basePath: string // e.g., /categories/news or /search
  className?: string
}

export default function PaginationControls({
  currentPage,
  totalPages,
  basePath,
  className = "",
}: PaginationControlsProps) {
  const pathname = usePathname() // Current path without query params
  const searchParams = useSearchParams() // Current query params

  // Function to create page links with existing query parameters preserved
  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams)
    if (pageNumber === 1) {
      params.delete("page") // Remove page param for the first page for cleaner URL
    } else {
      params.set("page", String(pageNumber))
    }
    const queryString = params.toString()
    return `${basePath}${queryString ? `?${queryString}` : ""}`
  }

  if (totalPages <= 1) {
    return null // Don't render pagination if there's only one page or less
  }

  const pageNumbers = []
  const maxPagesToShow = 5 // Max number of page links to show (e.g., 1 ... 4 5 6 ... 10)
  const halfMaxPages = Math.floor(maxPagesToShow / 2)

  let startPage = Math.max(1, currentPage - halfMaxPages)
  let endPage = Math.min(totalPages, currentPage + halfMaxPages)

  if (currentPage <= halfMaxPages) {
    endPage = Math.min(totalPages, maxPagesToShow)
  }
  if (currentPage + halfMaxPages >= totalPages) {
    startPage = Math.max(1, totalPages - maxPagesToShow + 1)
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i)
  }

  const showFirstEllipsis = startPage > 2
  const showLastEllipsis = endPage < totalPages - 1

  const PageLink = ({
    page,
    children,
    isActive,
    isDisabled,
    ariaLabel,
  }: {
    page?: number
    children: React.ReactNode
    isActive?: boolean
    isDisabled?: boolean
    ariaLabel?: string
  }) => {
    if (isDisabled) {
      return (
        <span
          className="px-3 py-2 text-sm text-gray-400 bg-gray-100 rounded-md cursor-not-allowed"
          aria-disabled="true"
          aria-label={ariaLabel}
        >
          {children}
        </span>
      )
    }
    if (isActive) {
      return (
        <span
          className="px-3 py-2 text-sm font-bold text-white bg-rwt-red rounded-md"
          aria-current="page"
          aria-label={ariaLabel || `Page ${page}`}
        >
          {children}
        </span>
      )
    }
    return (
      <Link
        href={createPageURL(page!)}
        className="px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-rwt-blue transition-colors"
        aria-label={ariaLabel || `Go to page ${page}`}
      >
        {children}
      </Link>
    )
  }

  return (
    <nav aria-label="Pagination" className={`flex items-center justify-center space-x-2 ${className}`}>
      {/* First Page Link */}
      <PageLink page={1} isDisabled={currentPage === 1} ariaLabel="Go to first page">
        <ChevronsLeft size={18} />
      </PageLink>

      {/* Previous Page Link */}
      <PageLink page={currentPage - 1} isDisabled={currentPage === 1} ariaLabel="Go to previous page">
        <ChevronLeft size={18} />
      </PageLink>

      {/* Ellipsis and First Page Number if needed */}
      {showFirstEllipsis && (
        <>
          <PageLink page={1}>1</PageLink>
          <span className="px-3 py-2 text-sm text-gray-500">...</span>
        </>
      )}

      {/* Page Number Links */}
      {pageNumbers.map((page) => (
        <PageLink key={page} page={page} isActive={page === currentPage}>
          {page}
        </PageLink>
      ))}

      {/* Ellipsis and Last Page Number if needed */}
      {showLastEllipsis && (
        <>
          <span className="px-3 py-2 text-sm text-gray-500">...</span>
          <PageLink page={totalPages}>{totalPages}</PageLink>
        </>
      )}

      {/* Next Page Link */}
      <PageLink page={currentPage + 1} isDisabled={currentPage === totalPages} ariaLabel="Go to next page">
        <ChevronRight size={18} />
      </PageLink>

      {/* Last Page Link */}
      <PageLink page={totalPages} isDisabled={currentPage === totalPages} ariaLabel="Go to last page">
        <ChevronsRight size={18} />
      </PageLink>
    </nav>
  )
}
