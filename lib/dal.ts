import "server-only"
import { cache } from "react"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { db } from "@/db"
import { user } from "@/db/schema"
import { eq } from "drizzle-orm"

export const verifySession = cache(async () => {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) redirect("/sign-in")
  return { user: session.user, session }
})

export const verifyProviderSession = cache(async () => {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) redirect("/sign-in")

  let role = (session.user as any)?.role

  // If role is missing from session object, check DB
  if (!role && session.user?.id) {
    try {
      const [dbUser] = await db
        .select({ role: user.role })
        .from(user)
        .where(eq(user.id, session.user.id))
        .limit(1)
      if (dbUser?.role) {
        role = dbUser.role
      }
    } catch (err) {
      console.error("Failed to query user role from DB in verifyProviderSession:", err)
    }
  }

  // Restrict provider dashboard to providers only
  if (role !== "provider") {
    redirect("/dashboard/customer")
  }

  return { user: session.user, session }
})
