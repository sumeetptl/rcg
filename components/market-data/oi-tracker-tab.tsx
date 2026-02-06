"use client"

import { InsightBox } from "@/components/market-data/insight-box"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUp, ArrowDown } from "lucide-react"

export function OITrackerTab() {
  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      {/* Top Metrics */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card className="border-border/60 bg-background/50">
          <CardContent className="p-6">
            <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
              Total BTC OI
            </div>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-2xl font-mono font-medium text-foreground">
                $14.2B
              </span>
              <span className="flex items-center text-xs font-bold text-signal-hit font-mono">
                <ArrowUp className="mr-0.5 h-3 w-3" />
                2.1%
              </span>
            </div>
          </CardContent>
        </Card>
         <Card className="border-border/60 bg-background/50">
          <CardContent className="p-6">
            <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
               Long/Short Ratio
            </div>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-2xl font-mono font-medium text-foreground">
                1.12
              </span>
              <span className="text-xs text-muted-foreground font-medium">
                Slightly Long Biased
              </span>
            </div>
          </CardContent>
        </Card>
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
