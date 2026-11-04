import { verifyProviderSession } from "@/lib/dal"
import { db } from "@/db"
import { services, bookings, user } from "@/db/schema"
import { eq } from "drizzle-orm"
import {
  ProviderBookingItem,
  ProviderServiceItem,
} from "@/components/dashboard/ProviderDashboardView"
import { getProviderAvatar } from "@/lib/avatar-resolver"

export async function getProviderDashboardProps(initialTab: string = "dashboard") {
  const session = await verifyProviderSession()
  const userId = session.user.id

  let mappedServices: ProviderServiceItem[] = []
  let mappedBookings: ProviderBookingItem[] = []

  try {
    const rawServices = await db
      .select()
      .from(services)
      .where(eq(services.providerId, userId))

    const rawBookings = await db
      .select({
        id: bookings.id,
        serviceTitle: services.title,
        customerName: user.name,
        customerImage: user.image,
        bookingDate: bookings.bookingDate,
        timeSlot: bookings.timeSlot,
        status: bookings.status,
        totalPrice: bookings.totalPrice,
        servicePrice: services.price,
      })
      .from(bookings)
      .leftJoin(services, eq(bookings.serviceId, services.id))
      .leftJoin(user, eq(bookings.customerId, user.id))
      .where(eq(bookings.providerId, userId))

    mappedBookings = rawBookings.map((b) => ({
      id: b.id,
      serviceTitle: b.serviceTitle || "Requested Service",
      customerName: b.customerName || "Customer",
      customerImage: b.customerImage || getProviderAvatar(b.customerName, "customer"),
      date: b.bookingDate
        ? new Date(b.bookingDate).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
        : "Upcoming",
      status: b.status,
      price: b.totalPrice || b.servicePrice,
    }))

    mappedServices = rawServices.map((s) => ({
      id: s.id,
      title: s.title,
      category: s.category,
      price: s.price,
      city: s.city,
      location: s.location,
      description: s.description,
    }))
  } catch (err) {
    console.error("Database query error in provider dashboard:", err)
    mappedServices = []
    mappedBookings = []
  }

  const safeName =
    session.user.name && session.user.name.trim() !== ""
      ? session.user.name
      : session.user.email
      ? session.user.email.split("@")[0]
      : "Provider"

  return {
    userName: safeName,
    userEmail: session.user.email || "",
    userImage: session.user.image || null,
    services: mappedServices,
    bookings: mappedBookings,
    initialTab,
  }
}

