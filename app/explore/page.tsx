import { Suspense } from "react"
import { Search } from "lucide-react"
import { db } from "@/db"
import { services as servicesTable, user } from "@/db/schema"
import { eq } from "drizzle-orm"
import { services as staticServices } from "@/lib/data"
import ServiceCard from "@/components/services/ServiceCard"
import { SearchPillBar, FilterSidebar } from "@/components/services/FilterBar"
import { getProviderAvatar } from "@/lib/avatar-resolver"
import Pagination from "@/components/ui/Pagination"

export const metadata = {
  title: "Services — Local Service Finder",
}

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = (await searchParams) || {}
  const category = typeof params.category === "string" ? params.category : undefined
  const query = typeof params.q === "string" ? params.q : undefined
  const city = typeof params.city === "string" ? params.city : undefined

  let dbData: any[] = []
  try {
    dbData = await db
      .select({ service: servicesTable, provider: user })
      .from(servicesTable)
      .leftJoin(user, eq(servicesTable.providerId, user.id))
  } catch (err) {
    console.error("Database query error in explore, using static services:", err)
    dbData = []
  }

  const dbMappedServices = (dbData || []).map((row) => {
    const s = row.service || {}
    const providerName = row.provider?.name || "Verified Provider"
    const rawAvatar = row.provider?.image || s.image || null
    return {
      id: s.id || crypto.randomUUID(),
      name: providerName,
      avatar: getProviderAvatar(providerName, s.category, rawAvatar),
      title: s.title || `${s.category || "Local"} Service`,
      category: s.category || "General",
      description: s.description || "",
      priceRange: `${s.price || 250} ETB / ${s.priceUnit || "hr"}`,
      location: `${s.location || "Bole"}, ${s.city || "Addis Ababa"}`,
      verified: Boolean(s.verified),
      rating: s.rating || "5.0",
      reviewCount: s.reviewCount || 0,
    }
  })

  let allServices: any[] = [...dbMappedServices, ...staticServices]

  if (category && category.toLowerCase() !== "all") {
    const catTerm = category.toLowerCase().trim()
    allServices = allServices.filter((s) => {
      const sCat = (s.category || "").toLowerCase()
      const sTitle = (s.title || "").toLowerCase()
      const sServices = Array.isArray(s.services)
        ? s.services.map((x: string) => x.toLowerCase()).join(" ")
        : ""

      // Direct exact match
      if (sCat === catTerm) return true

      // Substring match
      if (sCat.includes(catTerm) || catTerm.includes(sCat)) return true

      // Semantic category aliases
      if (catTerm === "cleaning" && (sCat.includes("clean") || sCat.includes("housekeep"))) return true
      if (
        (catTerm === "nanny" || catTerm === "babysitter" || catTerm === "babysitting") &&
        (sCat.includes("nanny") || sCat.includes("baby"))
      ) {
        return true
      }
      if ((catTerm === "handyman" || catTerm === "handymen" || catTerm === "handy men") && sCat.includes("handy")) {
        return true
      }
      if (catTerm === "plumbing" && (sCat.includes("handy") || sTitle.includes("plumb") || sServices.includes("plumb"))) {
        return true
      }
      if (
        (catTerm === "electrical" || catTerm === "tech") &&
        (sCat.includes("tech") || sCat.includes("handy") || sTitle.includes("electr") || sServices.includes("electr"))
      ) {
        return true
      }
      if (
        (catTerm === "education" || catTerm === "tutoring" || catTerm === "tutor") &&
        (sCat.includes("educat") || sTitle.includes("tutor"))
      ) {
        return true
      }
      if (
        (catTerm === "food" || catTerm === "cooking" || catTerm === "catering") &&
        (sCat.includes("food") || sCat.includes("cook") || sCat.includes("cater"))
      ) {
        return true
      }
      if (
        (catTerm === "beauty" || catTerm === "hair" || catTerm === "salon") &&
        (sCat.includes("beauty") || sCat.includes("hair"))
      ) {
        return true
      }

      return false
    })
  }

  if (city && city.toLowerCase() !== "all") {
    const cityTerm = city.toLowerCase().trim()
    allServices = allServices.filter((s) => {
      const loc = `${s.location || ""} ${s.city || ""}`.toLowerCase()
      return loc.includes(cityTerm)
    })
  }

  if (query && query.trim()) {
    const qLower = query.toLowerCase().trim()
    allServices = allServices.filter((s) => {
      const titleMatch = (s.title || "").toLowerCase().includes(qLower)
      const nameMatch = (s.name || "").toLowerCase().includes(qLower)
      const descMatch = (s.description || "").toLowerCase().includes(qLower)
      const catMatch = (s.category || "").toLowerCase().includes(qLower)
      const servicesMatch = Array.isArray(s.services)
        ? s.services.some((srv: string) => srv.toLowerCase().includes(qLower))
        : false
      return titleMatch || nameMatch || descMatch || catMatch || servicesMatch
    })
  }

  // Pagination calculation
  const pageParam = typeof params.page === "string" ? parseInt(params.page, 10) : 1
  const currentPage = Math.max(1, isNaN(pageParam) ? 1 : pageParam)
  const ITEMS_PER_PAGE = 6
  const totalItems = allServices.length
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE))
  const paginatedServices = allServices.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  return (
    <div className="bg-[#FDFBF7] min-h-screen py-8 sm:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        <Suspense fallback={<div className="h-16 animate-pulse rounded-2xl bg-white" />}>
          <SearchPillBar currentCity={city} currentQuery={query} />
        </Suspense>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4">
            <Suspense fallback={<div className="h-96 animate-pulse rounded-2xl bg-white" />}>
              <FilterSidebar currentCategory={category} />
            </Suspense>
          </div>

          <div className="lg:col-span-8">
            <div className="flex items-center justify-between pb-4">
              <h1 className="text-xl font-bold text-gray-900 tracking-tight">
                {allServices.length} Providers Found
              </h1>
            </div>

            {allServices.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-gray-200 bg-white p-12 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-[#FF6B00] mb-4">
                  <Search className="h-7 w-7" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">No Service Providers Found</h3>
                <p className="text-xs text-gray-500 max-w-sm mx-auto mt-1.5 mb-6">
                  We couldn&apos;t find any professionals matching your selected criteria. Try adjusting your category or location filters.
                </p>
                <a
                  href="/explore"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#FF6B00] px-5 py-2.5 text-xs font-bold text-white hover:bg-orange-600 transition shadow-xs"
                >
                  View All Services
                </a>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-4">
                  {paginatedServices.map((service: any) => (
                    <ServiceCard key={service.id} service={service} />
                  ))}
                </div>

                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalItems={totalItems}
                  itemsPerPage={ITEMS_PER_PAGE}
                  itemName="service providers"
                  baseUrl="/explore"
                  queryParams={{ category, q: query, city }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
