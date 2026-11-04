import CustomerDashboardView from "@/components/dashboard/CustomerDashboardView"
import { getCustomerDashboardProps } from "@/lib/customer-dashboard-data"

export const metadata = {
  title: "Settings — Customer Dashboard | LocalCare",
}

export default async function CustomerSettingsPage() {
  const props = await getCustomerDashboardProps("settings")
  return <CustomerDashboardView {...props} />
}

