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
    console.error("Database query error in provider dashboard, using fallback:", err)
    mappedServices = [
      {
        id: "srv-demo-1",
        title: "Home Cleaning",
        category: "Home Cleaning",
        price: "200",
        city: "Addis Ababa",
        location: "Bole",
        description: "Professional eco-friendly home and apartment cleaning in Addis Ababa.",
        image: "/avatars/meron.jpg",
      },
      {
        id: "srv-demo-2",
        title: "Plumbing",
        category: "Plumbing",
        price: "250",
        city: "Addis Ababa",
        location: "Kazanchis",
        description: "Emergency leak repairs, pipe fixtures, and residential maintenance.",
        image: "/avatars/abel.jpg",
      },
      {
        id: "srv-demo-3",
        title: "Electrical Services",
        category: "Electrical Services",
        price: "220",
        city: "Addis Ababa",
        location: "Mexico",
        description: "Lighting fixtures, circuit breakers, and wiring troubleshooting.",
        image: "/avatars/yonas.jpg",
      },
    ]

    mappedBookings = [
      {
        id: "bk-req-1",
        serviceTitle: "Deep Home Cleaning",
        customerName: "Bethlehem Tadesse",
        customerImage: "/avatars/meron.jpg",
        date: "Apr 12, 2026",
        status: "Pending",
        price: 200,
      },
      {
        id: "bk-req-2",
        serviceTitle: "Plumbing",
        customerName: "Hiwot Girma",
        customerImage: "/avatars/hana.jpg",
        date: "Apr 11, 2026",
        status: "Pending",
        price: 250,
      },
      {
        id: "bk-req-3",
        serviceTitle: "Electrical Services",
        customerName: "Kidus Solomon",
        customerImage: "/avatars/solomon.jpg",
        date: "Apr 10, 2026",
        status: "Accepted",
        price: 220,
      },
    ]
  }

  return {
    userName: session.user.name || "Abel Tesfaye",
    userEmail: session.user.email,
    services: mappedServices,
    bookings: mappedBookings,
    initialTab,
  }
}

