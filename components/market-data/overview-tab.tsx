"use client"

import { MarketPulseCard } from "@/components/market-data/market-pulse-card"
import { InsightBox } from "@/components/market-data/insight-box"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function OverviewTab() {
  return (
    <div className="space-y-10 animate-in fade-in-50 duration-500">
      {/* Top Section: Market Pulse Strip */}
      <div className="border-y border-border/40 bg-background/50 py-4 overflow-x-auto">
        <div className="flex items-center gap-8 min-w-max px-2">
           {/* Metric 1 */}
           <div className="flex items-center gap-4">
              <div className="w-0.5 h-6 bg-border/60" />
              <div className="flex flex-col gap-1">
                 <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">BTC Trend (HTF)</span>
                 <div className="flex items-baseline gap-2">
                    <span className="text-xl font-mono font-medium tracking-tight text-foreground">$44,250</span>
                    <span className="text-xs font-bold font-mono text-signal-hit">+1.2%</span>
                 </div>
                 <span className="text-[10px] text-muted-foreground font-medium">Accumulation in spot.</span>
              </div>
           </div>

           {/* Metric 2 */}
           <div className="flex items-center gap-4">
              <div className="w-0.5 h-6 bg-border/60" />
              <div className="flex flex-col gap-1">
                 <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">OI Change (24h)</span>
                 <div className="flex items-baseline gap-2">
                    <span className="text-xl font-mono font-medium tracking-tight text-foreground">$2.4B</span>
                    <span className="text-xs font-bold font-mono text-signal-hit">+5.4%</span>
                 </div>
                 <span className="text-[10px] text-muted-foreground font-medium">Leverage buildup.</span>
              </div>
           </div>

           {/* Metric 3 */}
           <div className="flex items-center gap-4">
              <div className="w-0.5 h-6 bg-border/60" />
              <div className="flex flex-col gap-1">
                 <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Liq. Vol (24h)</span>
                 <div className="flex items-baseline gap-2">
                    <span className="text-xl font-mono font-medium tracking-tight text-foreground">$85.2M</span>
                    <span className="text-xs font-bold font-mono text-muted-foreground">-12%</span>
                 </div>
                 <span className="text-[10px] text-muted-foreground font-medium">Low volatility.</span>
              </div>
           </div>

            {/* Metric 4 */}
            <div className="flex items-center gap-4">
              <div className="w-0.5 h-6 bg-brand-primary/40" /> {/* Brand accent */}
              <div className="flex flex-col gap-1">
                 <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Funding Bias</span>
                 <div className="flex items-baseline gap-2">
                    <span className="text-xl font-mono font-medium tracking-tight text-signal-hit">Bullish</span>
                    <span className="text-xs font-bold font-mono text-muted-foreground">0.015%</span>
                 </div>
                 <span className="text-[10px] text-muted-foreground font-medium">Longs paying shorts.</span>
              </div>
           </div>
        </div>
      </div>

      {/* Middle Row: Heatmaps & Charts */}
      <div className="grid gap-8 lg:grid-cols-3">
        <Card className="col-span-2 border-border/40 bg-background/50 shadow-none rounded-none border-x-0 sm:border-x sm:rounded-lg">
          <CardHeader className="pb-2 border-b border-border/40">
            <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Long vs Short Dominance
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-[300px] text-muted-foreground text-sm font-medium pt-6">
            <div className="p-4 border border-dashed border-border rounded opacity-50">
                [Visualization: LS Ratio Heatmap]
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/40 bg-background/50 shadow-none rounded-none border-x-0 sm:border-x sm:rounded-lg">
           <CardHeader className="pb-2 border-b border-border/40">
            <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Liquidation Clusters
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-[300px] text-muted-foreground text-sm font-medium pt-6">
             <div className="p-4 border border-dashed border-border rounded opacity-50">
                [Visualization: Liq Levels]
             </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row: Editorial Insight - Cleaner Design */}
      <div className="border-l-2 border-blue-500/40 pl-6 py-2">
         <h4 className="text-sm font-serif font-bold text-foreground mb-2">Market Interpretation</h4>
         <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl font-medium">
            Rising Open Interest combined with flat price action typically suggests a significant volatility expansion is imminent. Funding rates remain neutral, indicating organic leverage rather than FOMO. Key levels to watch: <span className="text-foreground font-bold">$45,200</span> (Liq Cluster) and <span className="text-foreground font-bold">$43,800</span> (Support).
         </p>
      </div>
    </div>
  )
}
