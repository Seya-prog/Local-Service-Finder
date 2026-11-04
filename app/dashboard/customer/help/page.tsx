import CustomerDashboardView from "@/components/dashboard/CustomerDashboardView"
import { getCustomerDashboardProps } from "@/lib/customer-dashboard-data"

export const metadata = {
  title: "Help & Support — Customer Dashboard | LocalCare",
}

export default async function CustomerHelpPage() {
  const props = await getCustomerDashboardProps("help")
  return <CustomerDashboardView {...props} />
}

