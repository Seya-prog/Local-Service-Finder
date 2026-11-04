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
    console.error("Database error in customer dashboard:", err)
    formattedBookings = []
  }

  const safeName =
    session.user.name && session.user.name.trim() !== ""
      ? session.user.name
      : session.user.email
      ? session.user.email.split("@")[0]
      : "Customer"

  return {
    userName: safeName,
    userEmail: session.user.email || "",
    userImage: session.user.image || null,
    bookings: formattedBookings,
    initialTab,
  }
}

