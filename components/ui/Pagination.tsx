"use client"

import React from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

export interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange?: (page: number) => void
  createPageUrl?: (page: number) => string
  baseUrl?: string
  queryParams?: Record<string, string | number | undefined | null>
  urlPattern?: string
  totalItems?: number
  itemsPerPage?: number
  itemName?: string
  className?: string
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  createPageUrl,
  baseUrl,
  queryParams,
  urlPattern,
  totalItems,
  itemsPerPage,
  itemName = "results",
  className = "",
}: PaginationProps) {
  if (totalPages <= 1 && (!totalItems || totalItems <= (itemsPerPage || 10))) {
    return null
  }

  // Calculate range for display
  const startItem = itemsPerPage ? (currentPage - 1) * itemsPerPage + 1 : undefined
  const endItem =
    itemsPerPage && totalItems
      ? Math.min(currentPage * itemsPerPage, totalItems)
      : undefined

  // Generate page numbers with ellipsis
  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = []
    const maxVisible = 5

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)
      if (currentPage > 3) {
        pages.push("ellipsis")
      }

      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)

      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      if (currentPage < totalPages - 2) {
        pages.push("ellipsis")
      }
      pages.push(totalPages)
    }

    return pages
  }

  const pages = getPageNumbers()

  const handlePageClick = (page: number) => {
    if (page === currentPage || page < 1 || page > totalPages) return
    if (onPageChange) {
      onPageChange(page)
    }
  }

  const resolvePageUrl = (page: number): string | null => {
    if (urlPattern) {
      return urlPattern.replace("[page]", String(page))
    }
    if (baseUrl) {
      const qp = new URLSearchParams()
      if (queryParams) {
        for (const [key, val] of Object.entries(queryParams)) {
          if (val !== undefined && val !== null && String(val).trim() !== "") {
            qp.set(key, String(val))
          }
        }
      }
      if (page > 1) {
        qp.set("page", String(page))
      }
      const qs = qp.toString()
      return qs ? `${baseUrl}?${qs}` : baseUrl
    }
    if (createPageUrl) {
      return createPageUrl(page)
    }
    return null
  }

  const renderButton = (
    page: number,
    label: React.ReactNode,
    isActive = false,
    disabled = false
  ) => {
    const activeClasses = isActive
      ? "bg-[#FF6B00] text-white shadow-sm font-bold"
      : "bg-white text-gray-700 hover:bg-orange-50 hover:text-[#FF6B00] border border-gray-200"

    const disabledClasses = disabled
      ? "opacity-40 cursor-not-allowed pointer-events-none text-gray-400 bg-gray-50 border border-gray-200"
      : "cursor-pointer"

    const baseClasses = `inline-flex h-9 min-w-9 items-center justify-center rounded-xl px-3 text-xs sm:text-sm font-semibold transition-all ${activeClasses} ${disabledClasses}`

    const targetUrl = resolvePageUrl(page)
    if (targetUrl && !disabled) {
      return (
        <Link href={targetUrl} className={baseClasses}>
          {label}
        </Link>
      )
    }

    return (
      <button
        type="button"
        disabled={disabled}
        onClick={() => handlePageClick(page)}
        className={baseClasses}
      >
        {label}
      </button>
    )
  }

  return (
    <div
      className={`flex flex-col sm:flex-row items-center justify-between gap-4 py-6 border-t border-gray-200/60 ${className}`}
    >
      {/* Items count summary */}
      <div className="text-xs sm:text-sm text-gray-500 font-medium text-center sm:text-left">
        {startItem !== undefined && endItem !== undefined && totalItems !== undefined ? (
          <span>
            Showing <strong className="text-gray-900">{startItem}</strong> to{" "}
            <strong className="text-gray-900">{endItem}</strong> of{" "}
            <strong className="text-gray-900">{totalItems}</strong> {itemName}
          </span>
        ) : (
          <span>
            Page <strong className="text-gray-900">{currentPage}</strong> of{" "}
            <strong className="text-gray-900">{totalPages}</strong>
          </span>
        )}
      </div>

      {/* Pagination controls */}
      <nav aria-label="Pagination" className="inline-flex items-center gap-1.5">
        {/* Previous Button */}
        {renderButton(
          currentPage - 1,
          <span className="inline-flex items-center gap-1">
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Prev</span>
          </span>,
          false,
          currentPage <= 1
        )}

        {/* Numbered Page Buttons */}
        <div className="flex items-center gap-1">
          {pages.map((p, idx) => {
            if (p === "ellipsis") {
              return (
                <span
                  key={`ellipsis-${idx}`}
                  className="px-2 text-xs text-gray-400 font-bold select-none"
                >
                  •••
                </span>
              )
            }
            return (
              <React.Fragment key={p}>
                {renderButton(p, p, p === currentPage)}
              </React.Fragment>
            )
          })}
        </div>

        {/* Next Button */}
        {renderButton(
          currentPage + 1,
          <span className="inline-flex items-center gap-1">
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="h-4 w-4" />
          </span>,
          false,
          currentPage >= totalPages
        )}
      </nav>
    </div>
  )
}

