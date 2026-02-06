"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { InsightBox } from "@/components/market-data/insight-box"

export function LiquidationsTab() {
  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      {/* Top Metrics */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
         <Card className="border-border/60 bg-background/50">
          <CardContent className="p-6">
            <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
              Total 24h Liquidations
            </div>
            <div className="mt-2 text-3xl font-mono font-medium text-signal-missed/90">
                $124.5M
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-2 border-border/60 bg-background/50">
           <CardHeader className="pb-2">
            <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
               Rekt Split (Long vs Short)
            </CardTitle>
           </CardHeader>
           <CardContent>
             <div className="space-y-2">
               <div className="flex justify-between text-xs font-mono font-bold">
                 <span className="text-signal-hit">Longs: $92M (74%)</span>
                 <span className="text-signal-missed">Shorts: $32.5M (26%)</span>
               </div>
               <Progress value={74} className="h-2 bg-signal-missed" indicatorClassName="bg-signal-hit" />
             </div>
           </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-3">
         <Card className="col-span-2 border-border/60 bg-background/50 h-[350px]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground/80">
              Liquidation Cascades (Timeline)
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-[280px] text-muted-foreground text-sm font-medium">
            [Chart: Hourly Liq Bars Placeholder]
          </CardContent>
        </Card>

        <InsightBox 
            title="Pain Points"
            content="74% of recent liquidations are Longs, suggesting an over-leveraged bull bias is being flushed out. A move below $42,500 could trigger a secondary cascade."
            className="h-[350px]"
        />
      </div>
    </div>
  )
}
