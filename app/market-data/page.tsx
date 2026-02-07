import { MarketDataHeader } from "@/components/market-data/market-data-header"
import { OverviewTab } from "@/components/market-data/overview-tab"
import { LiveMarketTab } from "@/components/market-data/live-market-tab"
import { OITrackerTab } from "@/components/market-data/oi-tracker-tab"
import { LiquidationsTab } from "@/components/market-data/liquidations-tab"
import { WhaleActivityTab } from "@/components/market-data/whale-activity-tab"
import { EconomicCalendarTab } from "@/components/market-data/economic-calendar-tab"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getLatestMarketData } from "@/lib/api/coinmarketcap"

export default async function MarketDataPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>
}) {
  const { tab } = await searchParams
  const currentTab = tab || "overview"

  // Fetch data on the server
  // Note: We only need this for 'live-market' really, but fetching top level is easier for now
  // In a production app, we might want to fetch inside the tab or use Suspense
  const marketData = await getLatestMarketData(10)

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:border-x lg:border-border/40 lg:min-h-screen">
          <MarketDataHeader />
          
          <main className="pb-8">
            <Tabs defaultValue={currentTab} className="space-y-8">
              {/* Sticky Tabs List - Adjusted for new layout */}
              <div className="sticky top-[0px] z-40 bg-background/95 pb-4 pt-2 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <TabsList className="h-auto w-full justify-start overflow-x-auto rounded-none border-b border-border bg-transparent p-0">
                  <TabsTrigger
                    value="overview"
                    className="relative rounded-none border-b-2 border-transparent px-4 py-3 font-mono text-sm font-bold uppercase tracking-wider text-muted-foreground transition-none data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                  >
                    Overview
                  </TabsTrigger>
                  <TabsTrigger
                    value="live-market"
                    className="relative rounded-none border-b-2 border-transparent px-4 py-3 font-mono text-sm font-bold uppercase tracking-wider text-muted-foreground transition-none data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                  >
                    Live Market
                  </TabsTrigger>
                  <TabsTrigger
                    value="open-interest"
                    className="relative rounded-none border-b-2 border-transparent px-4 py-3 font-mono text-sm font-bold uppercase tracking-wider text-muted-foreground transition-none data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                  >
                    Open Interest
                  </TabsTrigger>
                  <TabsTrigger
                    value="liquidations"
                    className="relative rounded-none border-b-2 border-transparent px-4 py-3 font-mono text-sm font-bold uppercase tracking-wider text-muted-foreground transition-none data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                  >
                    Liquidations
                  </TabsTrigger>
                  <TabsTrigger
                    value="whale-activity"
                    className="relative rounded-none border-b-2 border-transparent px-4 py-3 font-mono text-sm font-bold uppercase tracking-wider text-muted-foreground transition-none data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                  >
                    Whale Activity
                  </TabsTrigger>
                  <TabsTrigger
                    value="economic-calendar"
                    className="relative rounded-none border-b-2 border-transparent px-4 py-3 font-mono text-sm font-bold uppercase tracking-wider text-muted-foreground transition-none data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                  >
                    Economic Calendar
                  </TabsTrigger>
                  <TabsTrigger
                    value="funding"
                    disabled
                    className="relative rounded-none border-b-2 border-transparent px-4 py-3 font-mono text-sm font-bold uppercase tracking-wider text-muted-foreground/50 opacity-50 cursor-not-allowed"
                  >
                    Funding & Metrics <span className="ml-2 text-[9px] bg-muted px-1 py-0.5 rounded">SOON</span>
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="overview" className="mt-0">
                <OverviewTab />
              </TabsContent>

              <TabsContent value="live-market" className="mt-0">
                <LiveMarketTab initialData={marketData} />
              </TabsContent>

              <TabsContent value="open-interest" className="mt-0">
                <OITrackerTab />
              </TabsContent>

              <TabsContent value="liquidations" className="mt-0">
                <LiquidationsTab />
              </TabsContent>

              <TabsContent value="whale-activity" className="mt-0">
                <WhaleActivityTab />
              </TabsContent>

              <TabsContent value="economic-calendar" className="mt-0">
                <EconomicCalendarTab />
              </TabsContent>
            </Tabs>
          </main>
      </div>
    </div>
  )
}
