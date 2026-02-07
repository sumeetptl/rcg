"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { InsightBox } from "@/components/market-data/insight-box"
import { LiquidationChart } from "@/components/market-data/liquidation-chart"
import { SlippageHeatmap } from "@/components/market-data/slippage-heatmap"
import { LiquidationClusters } from "@/components/market-data/liquidation-clusters"

export function LiquidationsTab() {
  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      {/* Top Metrics Strip */}
      <div className="border-y border-border/40 bg-background/50 py-4 overflow-x-auto">
        <div className="flex items-center gap-8 min-w-max px-2">
            {/* Metric 1 */}
             <div className="flex items-center gap-4">
                <div className="w-0.5 h-6 bg-border/60" />
                <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Total 24h Liq</span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-xl font-mono font-medium tracking-tight text-signal-missed">$124.5M</span>
                    </div>
                </div>
            </div>

            {/* Metric 2: Rekt Split Inline */}
            <div className="flex items-center gap-4">
                <div className="w-0.5 h-6 bg-border/60" />
                <div className="flex flex-col gap-2 w-[240px]">
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                         <span className="text-signal-hit">Longs 74%</span>
                         <span className="text-signal-missed">Shorts 26%</span>
                    </div>
                     <Progress value={74} className="h-1.5 bg-signal-missed" indicatorClassName="bg-signal-hit" />
                </div>
            </div>

            {/* Metric 3: Derived Insight */}
             <div className="flex items-center gap-4">
                <div className="w-0.5 h-6 bg-border/60" />
                <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Dominant Side</span>
                    <div className="flex items-baseline gap-2">
                         <span className="text-xl font-mono font-medium tracking-tight text-signal-hit">Bulls Rekt</span>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* Heatmap Section */}
      <LiquidationClusters />

      {/* Charts */}
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="col-span-3 lg:col-span-2 space-y-6">
            <LiquidationChart className="bg-background/50 border-border/60" />
            
            <SlippageHeatmap className="bg-background/50 border-border/60" />
        </div>

        <InsightBox 
            title="Pain Points"
            content="74% of recent liquidations are Longs, suggesting an over-leveraged bull bias is being flushed out. A move below $42,500 could trigger a secondary cascade."
            className="h-full min-h-[300px]"
        />
      </div>
    </div>
  )
}
