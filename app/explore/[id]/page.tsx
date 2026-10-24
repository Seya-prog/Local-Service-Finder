import { db } from "@/db"
import { services as servicesTable, user, bookings } from "@/db/schema"
import { eq } from "drizzle-orm"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { services as staticServices } from "@/lib/data"

export default async function ServiceDetails({ params }: { params: Promise<{ id: string }> }) {
  const p = await params;
  const session = await auth.api.getSession({ headers: await headers() })
  
  let service: Record<string, string | number | boolean | null> | null = null;
  
  let isDummy = false;

  const data = await db
    .select({ service: servicesTable, provider: user })
    .from(servicesTable)
    .leftJoin(user, eq(servicesTable.providerId, user.id))
    .where(eq(servicesTable.id, p.id))
    .limit(1);

  if (data.length > 0) {
    service = data[0].service;
    
  } else {
    const dummy = staticServices.find((s) => s.id === p.id);
    if (!dummy) return <div className="py-20 text-center text-xl font-bold text-gray-600">Service not found.</div>;
    
    service = { ...dummy, price: "25", priceUnit: "hr", title: dummy.category + " Services" };
    
    isDummy = true;
  }

  const safeServiceId = String(service.id);
  const safeProviderId = String(service.providerId || "dummy");
  const safePrice = String(service.price || "0");

  async function createBooking(formData: FormData) {
    "use server"
    if (isDummy) return; 
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
    <div className="bg-[#FDFBF7] min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-start border-b border-gray-100 pb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{service.title}</h1>
            <p className="text-orange-600 font-semibold mt-2">{service.category}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Rate</p>
            <p className="font-bold text-2xl text-gray-900">${service.price} <span className="text-sm font-normal text-gray-500">/ {service.priceUnit}</span></p>
          </div>
        </div>
        
        <div className="mt-8">
          <h3 className="text-lg font-bold mb-2 text-gray-900">About this service</h3>
          <p className="text-gray-700 leading-relaxed">{service.description}</p>
        </div>

        <div className="mt-10 bg-gray-50 p-6 rounded-xl border border-gray-200">
          <h3 className="text-lg font-bold mb-4 text-gray-900">Book an Appointment</h3>
          {isDummy ? (
            <div className="text-center py-4 bg-orange-50 text-orange-800 rounded-lg font-medium border border-orange-200">
              This is a static demo profile. Booking is disabled.
            </div>
          ) : session ? (
            <form action={createBooking} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input type="date" name="date" required className="w-full rounded-lg border border-gray-300 p-2.5" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <select name="time" required className="w-full rounded-lg border border-gray-300 p-2.5">
                    <option value="Morning (9AM - 12PM)">Morning (9AM - 12PM)</option>
                    <option value="Afternoon (1PM - 4PM)">Afternoon (1PM - 4PM)</option>
                    <option value="Evening (5PM - 8PM)">Evening (5PM - 8PM)</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="w-full bg-[#FF6B00] text-white py-3 rounded-xl font-bold text-lg hover:bg-orange-600 transition-colors shadow-sm">
                Confirm Booking
              </button>
            </form>
          ) : (
            <div className="text-center py-4">
              <p className="text-gray-600 mb-3">Please sign in to book this service.</p>
              <a href="/sign-in" className="bg-[#FF6B00] text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-600 inline-block">Sign In to Book</a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
