import { verifySession } from "@/lib/dal";
import { db } from "@/db";
import { services, bookings } from "@/db/schema";
import { eq } from "drizzle-orm";
import ProviderEmptyState from "@/components/dashboard/ProviderEmptyState";
import CreateServiceForm from "@/components/dashboard/CreateServiceForm";
import { deleteService } from "@/lib/actions";

export default async function ProviderDashboardPage() {
  const session = await verifySession();
  const userId = session.user.id;

  const providerServices = await db.select().from(services).where(eq(services.providerId, userId));
  const providerBookings = await db.select().from(bookings).where(eq(bookings.providerId, userId));

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Provider Dashboard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-1">
          <CreateServiceForm />
        </div>
        
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">My Services</h2>
            {providerServices.length === 0 ? (
              <ProviderEmptyState />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {providerServices.map((service) => (
                  <div key={service.id} className="relative group p-5 border rounded-xl bg-white shadow-sm hover:shadow-md transition">
                    <h3 className="font-semibold text-lg">{service.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{service.category} • ${service.price}/hr</p>
                    <p className="text-sm text-gray-500">{service.city} — {service.location}</p>
                    
                    <form action={async () => {
                      "use server";
                      await deleteService(service.id);
                    }} className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button type="submit" className="bg-red-600 text-white px-3 py-1 rounded-md text-sm font-medium hover:bg-red-700 shadow-sm">
                        Delete
                      </button>
                    </form>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Recent Bookings</h2>
            {providerBookings.length === 0 ? (
              <p className="text-gray-500 bg-white p-6 rounded-xl border">No bookings yet.</p>
            ) : (
              <div className="space-y-4">
                {providerBookings.map((booking) => (
                  <div key={booking.id} className="p-4 border rounded-xl bg-white flex justify-between items-center">
                    <div>
                      <p className="font-medium">Booking ID: {booking.id}</p>
                      <p className="text-sm text-gray-500">Date: {new Date(booking.bookingDate).toLocaleDateString()}</p>
                    </div>
                    <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">
                      {booking.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
