import ProviderDashboardView from "@/components/dashboard/ProviderDashboardView"
import { getProviderDashboardProps } from "@/lib/provider-dashboard-data"

export const metadata = {
  title: "Help & Support — Provider Dashboard | LocalCare",
}

export default async function ProviderHelpPage() {
  const props = await getProviderDashboardProps("help")
  return <ProviderDashboardView {...props} />
}

