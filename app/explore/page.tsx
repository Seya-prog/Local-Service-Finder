import { Suspense } from "react"
import { services, searchServices } from "@/lib/data"
import ServiceCard from "@/components/services/ServiceCard"
import { SearchPillBar, FilterSidebar } from "@/components/services/FilterBar"

export const metadata = {
  title: "Services — ቅደስ",
  description:
    "Browse and filter local service providers. Find babysitters, handymen, tutors, caterers, and more.",
}

interface ExplorePageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function ExplorePage({ searchParams }: ExplorePageProps) {
  const params = await searchParams
  const category = typeof params.category === "string" ? params.category : undefined
  const query = typeof params.q === "string" ? params.q : undefined
  const city = typeof params.city === "string" ? params.city : undefined

  // Filter logic
  let filteredServices = services

  if (query || city) {
    filteredServices = searchServices(query || "", city)
  }

  if (category) {
    filteredServices = filteredServices.filter(
      (s) => s.category === category || s.services.some(svc => svc.toLowerCase().includes(category.toLowerCase()))
    )
  }

  const displayCount = (!query && !category) ? "64" : `${filteredServices.length}`

  return (
    <div className="bg-[#FDFBF7] min-h-screen py-8 sm:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Search Pill Bar */}
        <Suspense fallback={<div className="h-16 animate-pulse rounded-2xl bg-white" />}>
          <SearchPillBar currentCity={city} currentQuery={query} />
        </Suspense>

        {/* Two-Column Grid: Filter Sidebar (col-4) + Provider Results (col-8) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Filter Sidebar */}
          <div className="lg:col-span-4">
            <Suspense fallback={<div className="h-96 animate-pulse rounded-2xl bg-white" />}>
              <FilterSidebar currentCategory={category} />
            </Suspense>
          </div>

          {/* Right Column: Provider Results */}
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between pb-4">
              <h1 className="text-xl font-bold text-gray-900 tracking-tight">
                {displayCount} Providers
              </h1>
              {category && (
                <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
                  {category}
                </span>
              )}
            </div>

            {filteredServices.length === 0 ? (
              <div className="rounded-2xl border border-gray-100 bg-white p-12 text-center shadow-sm">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-orange-50 text-2xl">
                  🔍
                </div>
                <h3 className="text-lg font-semibold text-gray-900">No providers found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Try clearing the category filter or searching for another keyword.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredServices.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
