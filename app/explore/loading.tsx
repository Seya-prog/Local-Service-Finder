export default function ExploreLoading() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] py-8 sm:py-10 animate-pulse">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Search pill bar skeleton */}
        <div className="h-16 w-full rounded-2xl bg-white border border-gray-100 shadow-xs" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Filter sidebar skeleton */}
          <div className="lg:col-span-4 rounded-3xl border border-gray-100 bg-white p-6 space-y-5 shadow-xs">
            <div className="h-6 w-24 rounded-lg bg-gray-200" />
            <div className="space-y-3 pt-2">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="h-4 w-4 rounded bg-gray-200" />
                  <div className="h-4 w-32 rounded bg-gray-100" />
                </div>
              ))}
            </div>
          </div>

          {/* Cards skeleton */}
          <div className="lg:col-span-8 space-y-4">
            <div className="h-6 w-40 rounded-lg bg-gray-200 mb-2" />
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="rounded-2xl border border-gray-100 bg-white p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row gap-5 items-start"
              >
                <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-gray-200 shrink-0" />
                <div className="flex-1 space-y-3 w-full">
                  <div className="flex items-center justify-between">
                    <div className="h-5 w-36 rounded bg-gray-200" />
                    <div className="h-4 w-20 rounded bg-gray-100" />
                  </div>
                  <div className="h-4 w-24 rounded bg-gray-100" />
                  <div className="h-4 w-full rounded bg-gray-50" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
