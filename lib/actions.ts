"use server";

import { db } from "@/db";
import { services, bookings, user } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { verifySession } from "@/lib/dal";
import { revalidatePath } from "next/cache";
import { getProviderAvatar } from "@/lib/avatar-resolver";

export async function createBooking(
  serviceId: string,
  providerId: string,
  timeSlot: string,
  bookingDate: Date
) {
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
  const serviceArea =
    (formData.get("serviceArea") as string) ||
    (formData.get("city") as string) ||
    "Bole, Addis Ababa";
  const parts = serviceArea.split(",");
  const city = parts[0]?.trim() || "Addis Ababa";
  const location = parts[1]?.trim() || parts[0]?.trim() || "Bole";
  const rawPrice =
    (formData.get("price") as string)?.replace(/[^0-9.]/g, "") || "250";

  const category = (formData.get("category") as string) || "Home Cleaning";
  const customImg = (formData.get("image") as string) || null;
  const resolvedImage = getProviderAvatar(session.user.name, category, customImg);

  await db.insert(services).values({
    id: crypto.randomUUID(),
    providerId: session.user.id,
    title:
      (formData.get("serviceName") as string) ||
      (formData.get("title") as string) ||
      "New Service",
    category,
    description: (formData.get("description") as string) || "",
    price: rawPrice,
    location,
    city,
    image: resolvedImage,
  });
  revalidatePath("/dashboard/provider");
  revalidatePath("/explore");
}

export async function updateService(serviceId: string, formData: FormData) {
  const session = await verifySession();
  const serviceArea =
    (formData.get("serviceArea") as string) ||
    (formData.get("city") as string) ||
    "Bole, Addis Ababa";
  const parts = serviceArea.split(",");
  const city = parts[0]?.trim() || "Addis Ababa";
  const location = parts[1]?.trim() || parts[0]?.trim() || "Bole";
  const rawPrice =
    (formData.get("price") as string)?.replace(/[^0-9.]/g, "") || "250";

  await db
    .update(services)
    .set({
      title:
        (formData.get("serviceName") as string) ||
        (formData.get("title") as string),
      category: formData.get("category") as string,
      description: formData.get("description") as string,
      price: rawPrice,
      city,
      location,
      image: (formData.get("image") as string) || undefined,
      updatedAt: new Date(),
    })
    .where(and(eq(services.id, serviceId), eq(services.providerId, session.user.id)));

  revalidatePath("/dashboard/provider");
  revalidatePath("/explore");
}

export async function deleteService(serviceId: string) {
  const session = await verifySession();
  const deleted = await db
    .delete(services)
    .where(and(eq(services.id, serviceId), eq(services.providerId, session.user.id)))
    .returning({ id: services.id });

  if (deleted.length === 0) throw new Error("Unauthorized");
  revalidatePath("/dashboard/provider");
  revalidatePath("/explore");
}

export async function updateBookingStatus(
  bookingId: string,
  status: "Accepted" | "Declined" | "Completed"
) {
  const session = await verifySession();
  await db
    .update(bookings)
    .set({ status, updatedAt: new Date() })
    .where(and(eq(bookings.id, bookingId), eq(bookings.providerId, session.user.id)));

  revalidatePath("/dashboard/provider");
  revalidatePath("/dashboard/customer");
}

export async function switchUserRole(newRole: "customer" | "provider") {
  const session = await verifySession();
  await db
    .update(user)
    .set({ role: newRole, updatedAt: new Date() })
    .where(eq(user.id, session.user.id));

  revalidatePath("/", "layout");
  revalidatePath("/dashboard/customer");
  revalidatePath("/dashboard/provider");
}
