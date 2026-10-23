import { verifySession } from "@/lib/dal";
import { db } from "@/db";
import { bookings } from "@/db/schema";
import { eq } from "drizzle-orm";
import CustomerEmptyState from "@/components/dashboard/CustomerEmptyState";

export default async function CustomerDashboardPage() {
  // 1. Secure the page
  const session = await verifySession();
  const userId = session.user.id;

  // 2. Fetch bookings matching this customer ID
  const customerBookings = await db.select().from(bookings).where(eq(bookings.customerId, userId));

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Customer Dashboard</h1>
      
      {customerBookings.length === 0 ? (
        <CustomerEmptyState />
      ) : (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold mb-4">My Bookings</h2>
          {customerBookings.map((booking) => (
            <div key={booking.id} className="p-6 border rounded-xl bg-white shadow-sm flex justify-between items-center">
              <div>
                <p className="font-medium text-lg">Booking ID: {booking.id}</p>
                <p className="text-sm text-gray-500">Scheduled: {new Date(booking.bookingDate).toLocaleDateString()} at {booking.timeSlot}</p>
              </div>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                {booking.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
