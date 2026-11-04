import ProviderDashboardView from "@/components/dashboard/ProviderDashboardView"
import { getProviderDashboardProps } from "@/lib/provider-dashboard-data"

export const metadata = {
  title: "Earnings — Provider Dashboard | LocalCare",
}

export default async function ProviderEarningsPage() {
  const props = await getProviderDashboardProps("earnings")
  return <ProviderDashboardView {...props} />
}

