import CustomerDashboardView from "@/components/dashboard/CustomerDashboardView"
import { getCustomerDashboardProps } from "@/lib/customer-dashboard-data"

export const metadata = {
  title: "Profile — Customer Dashboard | LocalCare",
}

export default async function CustomerProfilePage() {
  const props = await getCustomerDashboardProps("profile")
  return <CustomerDashboardView {...props} />
}

