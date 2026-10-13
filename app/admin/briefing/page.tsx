import { Metadata } from "next"
import { AdminPageHeader } from "@/components/admin/page-header"
import { BriefingDashboard } from "@/components/admin/briefing/briefing-dashboard"
import { fetchMarketDerivatives } from "@/lib/services/market-briefing-data"

export const metadata: Metadata = {
  title: "Market Briefing Agent | Admin",
  description: "Autonomous derivatives intelligence and Academy-tone editorial drafting agent.",
}

export default async function MarketBriefingPage() {
  // Pre-fetch weekly derivatives dataset on the server
  const initialDataset = await fetchMarketDerivatives("weekly")

  return (
    <div className="min-h-screen bg-muted/10 p-6 lg:p-10 space-y-6">
      <AdminPageHeader
        label="Editorial Automation"
        heading="Market Briefing Agent"
        text="Pulls live open interest, funding rates, liquidations, and long/short positioning to draft structured Academy-tone briefs for editorial review."
      />
      
      <BriefingDashboard initialDataset={initialDataset} />
    </div>
  )
}
