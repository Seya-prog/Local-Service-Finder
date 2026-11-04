import React from "react"
import { Loader2 } from "lucide-react"

interface LoadingSpinnerProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl"
  className?: string
  color?: string
}

const sizeClasses = {
  xs: "h-3.5 w-3.5 border-2",
  sm: "h-4 w-4 border-2",
  md: "h-6 w-6 border-2",
  lg: "h-8 w-8 border-3",
  xl: "h-12 w-12 border-4",
}

export function LoadingSpinner({
  size = "md",
  className = "",
  color = "text-[#FF6B00]",
}: LoadingSpinnerProps) {
  return (
    <div
      className={`inline-flex items-center justify-center ${className}`}
      role="status"
      aria-label="Loading"
    >
      <svg
        className={`animate-spin ${sizeClasses[size]} rounded-full border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite] ${color}`}
        viewBox="0 0 24 24"
        fill="none"
      >
        <circle
          className="opacity-20"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="3"
        />
        <path
          className="opacity-90"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  )
}

/**
 * Full page or section centered loading overlay with a modern brand badge and smooth spinner.
 */
export function PageLoader({ message }: { message?: string }) {
  return (
    <div className="flex min-h-[60vh] w-full flex-col items-center justify-center px-4 py-12">
      <div className="relative flex flex-col items-center">
        {/* Outer glowing halo */}
        <div className="absolute -inset-4 rounded-full bg-orange-500/10 blur-xl animate-pulse" />

        {/* Brand circle with dual-ring spinner */}
        <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-orange-100">
          <LoadingSpinner size="lg" color="text-[#FF6B00]" />
        </div>

        {/* Message */}
        {message && (
          <p className="mt-4 text-xs sm:text-sm font-semibold tracking-wide text-gray-600 animate-pulse">
            {message}
          </p>
        )}
      </div>
    </div>
  )
}

/**
 * Modern Dashboard Skeleton layout for Customer & Provider dashboards.
 */
export function DashboardLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] py-6 sm:py-8 animate-pulse">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Header skeleton */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-gray-200/60">
          <div className="space-y-2.5">
            <div className="h-8 w-60 rounded-xl bg-gray-200" />
            <div className="h-4 w-40 rounded-lg bg-gray-100" />
          </div>
          <div className="flex items-center gap-3">
            <div className="h-10 w-28 rounded-xl bg-gray-200" />
            <div className="h-10 w-32 rounded-xl bg-orange-100" />
          </div>
        </div>

        {/* Metrics/Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="rounded-2xl border border-gray-100 bg-white p-5 space-y-3 shadow-xs"
            >
              <div className="flex items-center justify-between">
                <div className="h-4 w-24 rounded bg-gray-100" />
                <div className="h-8 w-8 rounded-xl bg-orange-50" />
              </div>
              <div className="h-7 w-20 rounded-lg bg-gray-200" />
              <div className="h-3 w-32 rounded bg-gray-100" />
            </div>
          ))}
        </div>

        {/* Main Grid: Sidebar + Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Nav Tabs Skeleton */}
          <div className="lg:col-span-3 rounded-2xl border border-gray-100 bg-white p-4 space-y-2 shadow-xs">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-11 rounded-xl bg-gray-50 flex items-center px-4 gap-3"
              >
                <div className="h-5 w-5 rounded bg-gray-200 shrink-0" />
                <div className="h-4 w-28 rounded bg-gray-200" />
              </div>
            ))}
          </div>

          {/* Right Main Content Skeleton */}
          <div className="lg:col-span-9 space-y-6">
            <div className="rounded-2xl border border-gray-100 bg-white p-6 space-y-5 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="h-6 w-44 rounded-lg bg-gray-200" />
                <div className="h-8 w-24 rounded-lg bg-gray-100" />
              </div>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-gray-50/50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-gray-200 shrink-0" />
                      <div className="space-y-2">
                        <div className="h-4 w-36 rounded bg-gray-200" />
                        <div className="h-3 w-24 rounded bg-gray-100" />
                      </div>
                    </div>
                    <div className="h-8 w-24 rounded-xl bg-gray-200" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Service Detail Page Loading Skeleton
 */
export function ServiceDetailLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] py-6 sm:py-10 animate-pulse">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Back Link Skeleton */}
        <div className="h-4 w-32 rounded bg-gray-200" />

        {/* Hero Card Skeleton */}
        <div className="rounded-3xl border border-gray-100 bg-white p-5 sm:p-7 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* Left Photo Skeleton */}
            <div className="lg:col-span-7">
              <div className="h-72 sm:h-96 md:h-[420px] w-full rounded-3xl bg-gray-200" />
            </div>

            {/* Right Details Skeleton */}
            <div className="lg:col-span-5 space-y-4 pt-2">
              <div className="h-8 w-3/4 rounded-xl bg-gray-200" />
              <div className="h-4 w-1/2 rounded bg-gray-100" />
              <div className="h-5 w-28 rounded-full bg-amber-50" />
              <div className="h-4 w-40 rounded bg-gray-100" />
              <div className="h-10 w-36 rounded-lg bg-gray-200 mt-6" />
              <div className="h-12 w-full rounded-2xl bg-orange-100 mt-6" />
            </div>
          </div>
        </div>

        {/* Tabs and Body Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-4">
            <div className="h-10 w-full rounded-2xl bg-gray-200" />
            <div className="h-48 w-full rounded-2xl bg-white border border-gray-100 p-6 space-y-3">
              <div className="h-4 w-full rounded bg-gray-100" />
              <div className="h-4 w-5/6 rounded bg-gray-100" />
              <div className="h-4 w-2/3 rounded bg-gray-100" />
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="h-72 w-full rounded-3xl bg-white border border-gray-100 p-6 space-y-4">
              <div className="h-6 w-36 rounded bg-gray-200" />
              <div className="h-10 w-full rounded-xl bg-gray-100" />
              <div className="h-10 w-full rounded-xl bg-gray-100" />
              <div className="h-12 w-full rounded-xl bg-gray-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

