import { db } from "@/db"
import { services as servicesTable, user, bookings } from "@/db/schema"
import { eq } from "drizzle-orm"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { services as staticServices } from "@/lib/data"
import ServiceDetailClient, { ServiceDetailData } from "@/components/services/ServiceDetailClient"
import { getProviderAvatar } from "@/lib/avatar-resolver"

export default async function ServiceDetails({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const p = await params
  let session = null
  try {
    session = await auth.api.getSession({ headers: await headers() })
  } catch (err) {
    console.error("Auth session check error:", err)
    session = null
  }

  let dbData: any[] = []
  try {
    dbData = await db
      .select({ service: servicesTable, provider: user })
      .from(servicesTable)
      .leftJoin(user, eq(servicesTable.providerId, user.id))
      .where(eq(servicesTable.id, p.id))
      .limit(1)
  } catch (err) {
    console.error("Database query error, falling back to static services:", err)
    dbData = []
  }

  let serviceData: ServiceDetailData | null = null

  if (dbData.length > 0) {
    const s = dbData[0].service
    const prov = dbData[0].provider
    const providerName = prov?.name || "Verified Provider"
    const resolvedAvatar = getProviderAvatar(providerName, s.category, prov?.image || s.image)
    const mainImg = resolvedAvatar || "/avatars/abel.jpg"

    serviceData = {
      id: s.id,
      providerId: s.providerId,
      title: s.title,
      category: s.category,
      description: s.description,
      price: s.price,
      priceUnit: s.priceUnit,
      location: s.location,
      city: s.city,
      providerName,
      providerAvatar: resolvedAvatar,
      rating: s.rating || "4.9",
      reviewCount: s.reviewCount || 3,
      experience: "5 yrs experience",
      servicesIncluded: [
        "General cleaning",
        "Deep cleaning",
        "Move-in / Move-out cleaning",
        "Eco-friendly products",
      ],
      serviceAreas: [`${s.city || "Bole"}, Addis Ababa`, "Kazanchis, Addis Ababa", "Sarbet, Addis Ababa"],
      galleryImages: [mainImg],
      isDummy: false,
    }
  } else {
    const dummy = staticServices.find((s) => s.id === p.id)
    if (!dummy) {
      return (
        <div className="py-20 text-center text-xl font-bold text-gray-600">
          Service not found.
        </div>
      )
    }

    const defaultIncluded =
      dummy.services && dummy.services.length > 0
        ? dummy.services
        : [
            "General cleaning",
            "Deep cleaning",
            "Move-in / Move-out cleaning",
            "Eco-friendly products",
          ]

    const singlePhoto = dummy.avatar || "/images/hero-cleaner.jpg"

    serviceData = {
      id: dummy.id,
      providerId: dummy.createdBy || "dummy-provider",
      title: `${dummy.category} Services`,
      category: dummy.category,
      description:
        dummy.description ||
        "I provide reliable and professional services for your home. I pay attention to detail and ensure thorough quality work. Your satisfaction is my priority.",
      price: "250",
      priceUnit: "hr",
      location: dummy.location,
      city: dummy.city || "Addis Ababa",
      providerName: dummy.name,
      providerAvatar: dummy.avatar || "/avatars/meron.jpg",
      rating: dummy.rating || 4.9,
      reviewCount: dummy.reviewCount || 124,
      experience: dummy.experience || "5 yrs experience",
      servicesIncluded: defaultIncluded,
      serviceAreas: [`${dummy.city || "Bole"}, Addis Ababa`, "Kazanchis, Addis Ababa", "Sarbet, Addis Ababa"],
      galleryImages: [singlePhoto],
      isDummy: true,
    }
  }

  const safeServiceId = serviceData.id
  const safeProviderId = serviceData.providerId
  const safePrice = serviceData.price
  const isDemo = serviceData.isDummy

  async function createBooking(formData: FormData) {
    "use server"
    if (isDemo) return
    const currentSession = await auth.api.getSession({ headers: await headers() })
    if (!currentSession) redirect("/sign-in")

    const date = formData.get("date") as string
    const time = formData.get("time") as string

    await db.insert(bookings).values({
      id: crypto.randomUUID(),
      serviceId: safeServiceId,
      customerId: currentSession.user.id,
      providerId: safeProviderId,
      bookingDate: new Date(date),
      timeSlot: time,
      status: "Upcoming",
      totalPrice: safePrice,
    })
    redirect("/dashboard/customer")
  }

  return (
    <ServiceDetailClient
      service={JSON.parse(JSON.stringify(serviceData))}
      isLoggedIn={Boolean(session)}
      createBookingAction={createBooking}
    />
  )
}
