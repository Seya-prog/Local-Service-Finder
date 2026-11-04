import ProviderDashboardView from "@/components/dashboard/ProviderDashboardView"
import { getProviderDashboardProps } from "@/lib/provider-dashboard-data"

export const metadata = {
  title: "Settings — Provider Dashboard | LocalCare",
}

export default async function ProviderSettingsPage() {
  const props = await getProviderDashboardProps("settings")
  return <ProviderDashboardView {...props} />
}

