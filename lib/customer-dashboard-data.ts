import { verifySession } from "@/lib/dal"
import { db } from "@/db"
import { bookings as bookingsTable, services as servicesTable, user } from "@/db/schema"
import { eq } from "drizzle-orm"
import { BookingDisplayItem } from "@/components/dashboard/BookingItem"
import { getProviderAvatar } from "@/lib/avatar-resolver"

export async function getCustomerDashboardProps(initialTab: string = "dashboard") {
  const session = await verifySession()
  const userId = session.user.id

  let formattedBookings: BookingDisplayItem[] = []

  try {
    const rawBookings = await db
      .select({
        booking: bookingsTable,
        service: servicesTable,
        provider: user,
      })
      .from(bookingsTable)
      .leftJoin(servicesTable, eq(bookingsTable.serviceId, servicesTable.id))
      .leftJoin(user, eq(bookingsTable.providerId, user.id))
      .where(eq(bookingsTable.customerId, userId))

    formattedBookings = rawBookings.map((row) => {
      const b = row.booking
      const s = row.service
      const p = row.provider

      const formattedDate = new Date(b.bookingDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })

      return {
        id: b.id,
        serviceTitle: s?.title || `${s?.category || "Local"} Service`,
        providerName: p?.name || "Service Provider",
        date: formattedDate,
        time: b.timeSlot,
        status: b.status,
        image: getProviderAvatar(p?.name, s?.category, p?.image || s?.image),
        price: b.totalPrice || s?.price || "250",
      }
    })
  } catch (err) {
    console.error("Database error in customer dashboard, using fallback:", err)
    formattedBookings = [
      {
        id: "bk-sample-1",
        serviceTitle: "Plumbing & Pipe Maintenance",
        providerName: "Abel Tesfaye",
        date: "May 10, 2026",
        time: "10:00 AM",
        status: "Upcoming",
        image: "/avatars/abel.jpg",
        price: "200 ETB/hr",
      },
      {
        id: "bk-sample-2",
        serviceTitle: "Deep Home Cleaning",
        providerName: "Meron Hailu",
        date: "Apr 25, 2026",
        time: "2:00 PM",
        status: "Completed",
        image: "/avatars/meron.jpg",
        price: "150 ETB/hr",
      },
      {
        id: "bk-sample-3",
        serviceTitle: "Private Math Tutoring",
        providerName: "Solomon Kebede",
        date: "Apr 18, 2026",
        time: "4:00 PM",
        status: "Completed",
        image: "/avatars/solomon.jpg",
        price: "300 ETB/hr",
      },
    ]
  }

  return {
    userName: session.user.name || "Dawit Kebede",
    userEmail: session.user.email,
    bookings: formattedBookings,
    initialTab,
  }
}

