export default function ExploreLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Search bar skeleton */}
      <div className="mb-8 flex gap-3">
        <div className="h-12 w-48 animate-pulse rounded-lg bg-gray-200" />
        <div className="h-12 flex-1 animate-pulse rounded-lg bg-gray-200" />
        <div className="h-12 w-28 animate-pulse rounded-lg bg-orange-200" />
      </div>
      <div className="flex gap-8">
        {/* Filter sidebar skeleton */}
        <div className="hidden w-64 shrink-0 space-y-4 lg:block">
          <div className="h-6 w-20 animate-pulse rounded bg-gray-200" />
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-5 w-40 animate-pulse rounded bg-gray-100" />
          ))}
        </div>
        {/* Cards skeleton */}
        <div className="flex-1 space-y-6">
          <div className="h-6 w-32 animate-pulse rounded bg-gray-200" />
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-40 animate-pulse rounded-xl bg-gray-100" />
          ))}
        </div>
      </div>
    </div>
  )
}
