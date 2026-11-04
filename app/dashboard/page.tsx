import { verifySession } from "@/lib/dal"
import { redirect } from "next/navigation"

export const metadata = {
  title: "Dashboard — LocalCare",
}

export default async function DashboardRootPage() {
  const session = await verifySession()
  const role = (session.user as any)?.role || "customer"

  if (role === "provider") {
    redirect("/dashboard/provider")
  } else {
    redirect("/dashboard/customer")
  }
}

