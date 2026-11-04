import CustomerDashboardView from "@/components/dashboard/CustomerDashboardView"
import { getCustomerDashboardProps } from "@/lib/customer-dashboard-data"

export const metadata = {
  title: "Customer Dashboard — LocalCare",
}

export default async function CustomerDashboardPage({
  searchParams,
}: {
  searchParams?: Promise<{ tab?: string }>
}) {
  const sp = searchParams ? await searchParams : undefined
  const tab = sp?.tab || "dashboard"
  const props = await getCustomerDashboardProps(tab)

  return <CustomerDashboardView {...props} />
}
