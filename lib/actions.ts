"use server";

import { db } from "@/db";
import { services, bookings } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { verifySession } from "@/lib/dal";
import { revalidatePath } from "next/cache";

export async function createBooking(serviceId: string, providerId: string, timeSlot: string, bookingDate: Date) {
  const session = await verifySession(); 
  await db.insert(bookings).values({
    id: crypto.randomUUID(),
    serviceId,
    providerId,
    customerId: session.user.id,
    timeSlot,
    bookingDate,
    status: "Upcoming",
  });
  revalidatePath("/dashboard/customer");
}

export async function createService(formData: FormData) {
  const session = await verifySession();
  await db.insert(services).values({
    id: crypto.randomUUID(),
    providerId: session.user.id,
    title: formData.get("title") as string,
    category: formData.get("category") as string,
    description: formData.get("description") as string,
    price: formData.get("price") as string,
    location: formData.get("location") as string,
    city: formData.get("city") as string,
  });
  revalidatePath("/dashboard/provider");
}

export async function deleteService(serviceId: string) {
  const session = await verifySession();
  const deleted = await db.delete(services).where(
      and(eq(services.id, serviceId), eq(services.providerId, session.user.id))
    ).returning({ id: services.id });

  if (deleted.length === 0) throw new Error("Unauthorized");
  revalidatePath("/dashboard/provider");
}
