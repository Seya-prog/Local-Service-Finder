import { verifySession } from "@/lib/dal"
import { redirect } from "next/navigation"

export const metadata = {
  title: "My Profile — LocalCare",
}

export default async function ProfilePage() {
  const session = await verifySession()

  if (session?.user?.role === "provider") {
    redirect("/dashboard/provider?tab=profile")
  } else {
    redirect("/dashboard/customer?tab=profile")
  }
}

