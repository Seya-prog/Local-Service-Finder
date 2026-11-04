import CustomerDashboardView from "@/components/dashboard/CustomerDashboardView"
import { getCustomerDashboardProps } from "@/lib/customer-dashboard-data"

export const metadata = {
  title: "My Bookings — Customer Dashboard | LocalCare",
}

export default async function CustomerBookingsPage() {
  const props = await getCustomerDashboardProps("bookings")
  return <CustomerDashboardView {...props} />
}

