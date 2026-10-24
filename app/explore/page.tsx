import { Suspense } from "react"
import { db } from "@/db"
import { services as servicesTable, user } from "@/db/schema"
import { eq } from "drizzle-orm"
import { services as staticServices } from "@/lib/data"
import ServiceCard from "@/components/services/ServiceCard"
import { SearchPillBar, FilterSidebar } from "@/components/services/FilterBar"

export const metadata = {
  title: "Services — Local Service Finder",
}

export default async function ExplorePage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const params = await searchParams
  const category = typeof params.category === "string" ? params.category : undefined
  const query = typeof params.q === "string" ? params.q : undefined
  const city = typeof params.city === "string" ? params.city : undefined

  const dbData = await db
    .select({ service: servicesTable, provider: user })
    .from(servicesTable)
    .leftJoin(user, eq(servicesTable.providerId, user.id));

  const dbMappedServices = dbData.map((row) => ({
    id: row.service.id,
    name: row.provider?.name || "Verified Provider",
    avatar: row.provider?.image || row.service.image || "",
    title: row.service.title,
    category: row.service.category,
    description: row.service.description,
    priceRange: `$${row.service.price} / ${row.service.priceUnit}`,
    location: `${row.service.location}, ${row.service.city}`,
    verified: row.service.verified,
    rating: row.service.rating || "5.0",
    reviewCount: row.service.reviewCount || 0,
  }))

  let allServices = [...dbMappedServices, ...staticServices]

  if (category) {
    allServices = allServices.filter((s) => s.category.toLowerCase() === category.toLowerCase())
  }
  if (query) {
    allServices = allServices.filter((s) =>
      s.title?.toLowerCase().includes(query.toLowerCase()) ||
      s.description?.toLowerCase().includes(query.toLowerCase()) ||
      s.name?.toLowerCase().includes(query.toLowerCase())
    )
  }

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

            <div className="space-y-4">
              {allServices.map((service: Record<string, string | number | boolean | null>) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
