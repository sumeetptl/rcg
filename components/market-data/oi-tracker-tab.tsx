"use client"

import { InsightBox } from "@/components/market-data/insight-box"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUp, ArrowDown } from "lucide-react"

export function OITrackerTab() {
  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      {/* Top Metrics Strip */}
      <div className="border-y border-border/40 bg-background/50 py-4 overflow-x-auto">
        <div className="flex items-center gap-8 min-w-max px-2">
            {/* Metric 1 */}
            <div className="flex items-center gap-4">
                <div className="w-0.5 h-6 bg-border/60" />
                <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Total BTC OI</span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-xl font-mono font-medium tracking-tight text-foreground">$14.2B</span>
                        <span className="flex items-center text-xs font-bold text-signal-hit font-mono">
                            <ArrowUp className="mr-0.5 h-3 w-3" />
                            2.1%
                        </span>
                    </div>
                </div>
            </div>

            {/* Metric 2 */}
            <div className="flex items-center gap-4">
                <div className="w-0.5 h-6 bg-border/60" />
                <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Long/Short Ratio</span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-xl font-mono font-medium tracking-tight text-foreground">1.12</span>
                        <span className="text-xs font-bold font-mono text-signal-hit">Long Bias</span>
                    </div>
                </div>
            </div>

             {/* Metric 3 (Derived/Static for now to fill strip) */}
            <div className="flex items-center gap-4">
                <div className="w-0.5 h-6 bg-border/60" />
                <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Est. Leverage</span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-xl font-mono font-medium tracking-tight text-foreground">12x</span>
                        <span className="text-xs font-bold font-mono text-muted-foreground">High</span>
                    </div>
                </div>
            </div>
        </div>
      </div>

       {/* Main Chart Section */}
       <div className="grid gap-6 lg:grid-cols-3">
        <Card className="col-span-2 border-border/60 bg-background/50 h-[400px]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground/80">
              Open Interest vs Price
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-[320px] text-muted-foreground text-sm font-medium">
            [Chart: OI Line + Price Overlay Placeholder]
          </CardContent>
        </Card>

        <div className="space-y-6">
           {/* Insight Box */}
           <InsightBox 
              title="Interpretation"
              content="Open Interest has increased by $300M in the last 4 hours while price has remained sideways. This divergence often indicates a buildup of leverage that precedes a volatility squeeze."
              variant="warning"
              className="h-full"
           />
        </div>
      </div>
    </div>
  )
}
