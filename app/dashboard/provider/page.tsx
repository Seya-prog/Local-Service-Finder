import ProviderDashboardView from "@/components/dashboard/ProviderDashboardView"
import { getProviderDashboardProps } from "@/lib/provider-dashboard-data"

export const metadata = {
  title: "Provider Dashboard — LocalCare",
}

export default async function ProviderDashboardPage({
  searchParams,
}: {
  searchParams?: Promise<{ tab?: string }>
}) {
  const sp = searchParams ? await searchParams : undefined
  const tab = sp?.tab || "dashboard"
  const props = await getProviderDashboardProps(tab)

  return <ProviderDashboardView {...props} />
}
