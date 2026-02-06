"use client"

import { MarketPulseCard } from "@/components/market-data/market-pulse-card"
import { InsightBox } from "@/components/market-data/insight-box"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function OverviewTab() {
  return (
    <div className="space-y-8 animate-in fade-in-50 duration-500">
      {/* Top Row: Market Pulse */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MarketPulseCard
          title="BTC Trend (HTF)"
          value="$44,250"
          trend="up"
          change="+1.2%"
          subtext="Strong accumulation in spot markets."
        />
        <MarketPulseCard
          title="OI Change (24h)"
          value="$2.4B"
          trend="up"
          change="+5.4%"
          subtext="Leverage buildup. Watch for squeeze."
        />
        <MarketPulseCard
          title="Liq. Volume (24h)"
          value="$85.2M"
          trend="neutral"
          change="-12%"
          subtext="Low volatility environment."
        />
        <MarketPulseCard
          title="Funding Bias"
          value="0.015%"
          trend="up"
          change="Bullish"
          subtext="Longs paying shorts. Sentiment positive."
        />
      </div>

      {/* Middle Row: Heatmaps & Charts */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="col-span-2 border-border/60 bg-background/50 h-[320px]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground/80">
              Long vs Short Dominance
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-[240px] text-muted-foreground text-sm font-medium">
            [Chart: LS Ratio Heatmap Placeholder]
          </CardContent>
        </Card>

        <Card className="border-border/60 bg-background/50 h-[320px]">
           <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground/80">
              Liquidation Clusters
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-[240px] text-muted-foreground text-sm font-medium">
             [Chart: Liq Levels Placeholder]
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row: Editorial Insight */}
      <InsightBox
        title="Market Interpretation"
        content="Rising Open Interest combined with flat price action typically suggests a significant volatility expansion is imminent. Funding rates remain neutral, indicating organic leverage rather than FOMO. Key levels to watch: $45,200 (Liq Cluster) and $43,800 (Support)."
        variant="default"
      />
    </div>
  )
}
