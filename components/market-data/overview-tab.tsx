import { LongShortRatioChart } from "@/components/market-data/long-short-ratio-chart"
import { LiquidationClusters } from "@/components/market-data/liquidation-clusters"

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

      {/* Middle Row: Liquidation Clusters (Primary Focus) */}
      <div className="grid gap-8">
         <LiquidationClusters />
      </div>

      {/* Bottom Row: Charts & Market Structure */}
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="col-span-2">
           <LongShortRatioChart />
        </div>

        {/* Keeping a placeholder or moving other metrics here in future */}
         <div className="border border-border/40 bg-background/50 rounded-lg p-6 flex flex-col justify-center gap-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Session Bias</h4>
            <div className="text-2xl font-serif font-medium text-foreground">Neutral-Bullish</div>
            <p className="text-sm text-muted-foreground">Market is absorbing sell pressure at key support. Skew favors patience.</p>
         </div>
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
