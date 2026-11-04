import { verifySession } from "@/lib/dal"
import { redirect } from "next/navigation"

export const metadata = {
  title: "Settings — LocalCare",
}

export default async function SettingsPage() {
  const session = await verifySession()

  if (session?.user?.role === "provider") {
    redirect("/dashboard/provider/settings")
  } else {
    redirect("/dashboard/customer/settings")
  }
}

