import { MarketDataHeader } from "@/components/market-data/market-data-header"
import { OverviewTab } from "@/components/market-data/overview-tab"
import { LiveMarketTab } from "@/components/market-data/live-market-tab"
import { OITrackerTab } from "@/components/market-data/oi-tracker-tab"
import { LiquidationsTab } from "@/components/market-data/liquidations-tab"
import { WhaleActivityTab } from "@/components/market-data/whale-activity-tab"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default async function MarketDataPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>
}) {
  const { tab } = await searchParams
  const currentTab = tab || "overview"

  return (
    <div className="min-h-screen bg-muted/10">
      <MarketDataHeader />
      
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Tabs defaultValue={currentTab} className="space-y-8">
          <div className="sticky top-[80px] z-40 -mx-4 bg-background/95 px-4 pb-4 pt-2 backdrop-blur supports-[backdrop-filter]:bg-background/60 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
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
             <LiveMarketTab />
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
        </Tabs>
      </main>
    </div>
  )
}
