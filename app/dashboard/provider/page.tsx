import { verifySession } from "@/lib/dal";
import { db } from "@/db";
import { services, bookings } from "@/db/schema";
import { eq } from "drizzle-orm";
import ProviderEmptyState from "@/components/dashboard/ProviderEmptyState";
import ServiceCard from "@/components/services/ServiceCard";

export default async function ProviderDashboardPage() {
  // 1. Secure the page and get user ID
  const session = await verifySession();
  const userId = session.user.id;

  // 2. Fetch data specifically owned by this provider
  const providerServices = await db.select().from(services).where(eq(services.providerId, userId));
  const providerBookings = await db.select().from(bookings).where(eq(bookings.providerId, userId));

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Provider Dashboard</h1>
      
      {providerServices.length === 0 ? (
        <ProviderEmptyState />
      ) : (
        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-semibold mb-4">My Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {providerServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Recent Bookings</h2>
            {providerBookings.length === 0 ? (
              <p className="text-gray-500 bg-white p-6 rounded-xl border">No bookings yet.</p>
            ) : (
              <div className="space-y-4">
                {providerBookings.map((booking) => (
                  <div key={booking.id} className="p-4 border rounded-xl bg-white flex justify-between">
                    <div>
                      <p className="font-medium">Booking ID: {booking.id}</p>
                      <p className="text-sm text-gray-500">Date: {new Date(booking.bookingDate).toLocaleDateString()}</p>
                    </div>
                    <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm h-fit">
                      {booking.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
