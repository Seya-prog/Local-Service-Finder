import ProviderDashboardView from "@/components/dashboard/ProviderDashboardView"
import { getProviderDashboardProps } from "@/lib/provider-dashboard-data"

export const metadata = {
  title: "My Services — Provider Dashboard | LocalCare",
}

export default async function ProviderServicesPage() {
  const props = await getProviderDashboardProps("services")
  return <ProviderDashboardView {...props} />
}

