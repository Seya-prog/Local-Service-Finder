import ProviderDashboardView from "@/components/dashboard/ProviderDashboardView"
import { getProviderDashboardProps } from "@/lib/provider-dashboard-data"

export const metadata = {
  title: "Bookings — Provider Dashboard | LocalCare",
}

export default async function ProviderBookingsPage() {
  const props = await getProviderDashboardProps("bookings")
  return <ProviderDashboardView {...props} />
}

