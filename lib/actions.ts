"use server";

import { db } from "@/db";
import { services, bookings } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { verifySession } from "@/lib/dal";
import { revalidatePath } from "next/cache";

export async function createBooking(serviceId: string, providerId: string, timeSlot: string, bookingDate: Date) {
  // Check 1: User must be signed in to book
  const session = await verifySession(); 

  await db.insert(bookings).values({
    id: crypto.randomUUID(),
    serviceId,
    providerId,
    customerId: session.user.id, // Securely grabbed from session, not the frontend
    timeSlot,
    bookingDate,
    status: "Upcoming",
  });

  revalidatePath("/dashboard/customer");
  return { success: true };
}
