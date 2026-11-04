import ProviderDashboardView from "@/components/dashboard/ProviderDashboardView"
import { getProviderDashboardProps } from "@/lib/provider-dashboard-data"

export const metadata = {
  title: "Profile — Provider Dashboard | LocalCare",
}

export default async function ProviderProfilePage() {
  const props = await getProviderDashboardProps("profile")
  return <ProviderDashboardView {...props} />
}

