"use client"

import { useMemo, useState } from "react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// Mock Data Generator
const CURRENT_PRICE = 44250

const generateClusterData = () => {
  const bands = []
  // Shorts above price
  for (let i = 1; i <= 15; i++) {
    const price = CURRENT_PRICE + (i * 150)
    const volume = Math.random() * 50 + 10 // 10M to 60M
    bands.push({
      id: `short-${i}`,
      price,
      type: 'short',
      volume,
      distance: ((price - CURRENT_PRICE) / CURRENT_PRICE * 100).toFixed(2)
    })
  }
  // Longs below price
  for (let i = 1; i <= 15; i++) {
    const price = CURRENT_PRICE - (i * 150)
    const volume = Math.random() * 50 + 10
    bands.push({
      id: `long-${i}`,
      price,
      type: 'long',
      volume,
      distance: ((CURRENT_PRICE - price) / CURRENT_PRICE * 100).toFixed(2)
    })
  }
  // Sort by price descending
  return bands.sort((a, b) => b.price - a.price)
}

export function LiquidationClusters({ className }: { className?: string }) {
  const [data] = useState(generateClusterData())
  
  // Find max volume for scaling
  const maxVolume = useMemo(() => Math.max(...data.map(d => d.volume)), [data])

  return (
    <div className={cn("rounded-lg border border-border/40 bg-background/50 backdrop-blur-sm overflow-hidden", className)}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/40 px-6 py-4">
        <div>
          <h3 className="font-serif text-sm font-bold uppercase tracking-widest text-foreground">
            Liquidation Clusters
          </h3>
          <p className="text-xs text-muted-foreground font-medium mt-1">
            Estimated leverage concentration by price level (Binance • 4H)
          </p>
        </div>
        <div className="flex gap-2">
           <Badge variant="outline" className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
              Binance
           </Badge>
           <Badge variant="outline" className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
              4H
           </Badge>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_300px]">
        
        {/* Visualization Panel */}
        <div className="relative border-r border-border/40 p-6 flex flex-col items-center justify-center min-h-[400px]">
           <div className="w-full max-w-2xl space-y-[2px]">
              {data.map((band) => {
                 const isShort = band.type === 'short'
                 const widthPct = (band.volume / maxVolume) * 100
                 
                 // Opacity based on volume (density)
                 const opacity = 0.3 + (band.volume / maxVolume) * 0.7

                 return (
                    <TooltipProvider key={band.id}>
                       <Tooltip delayDuration={0}>
                          <TooltipTrigger asChild>
                             <div className="group flex items-center h-5 gap-4 cursor-crosshair hover:bg-accent/10 transition-colors">
                                {/* Price Axis */}
                                <div className={cn(
                                   "w-16 text-right font-mono text-[10px] font-medium transition-colors",
                                   isShort ? "text-rose-500/60 group-hover:text-rose-500" : "text-emerald-500/60 group-hover:text-emerald-500"
                                )}>
                                   ${band.price.toLocaleString()}
                                </div>
                                
                                {/* Band */}
                                <div className="flex-1 relative h-full flex items-center">
                                   <div 
                                      className={cn(
                                         "h-3 rounded-sm transition-all duration-300",
                                         isShort ? "bg-rose-500" : "bg-emerald-500"
                                      )}
                                      style={{ 
                                         width: `${widthPct}%`,
                                         opacity: opacity
                                      }}
                                   />
                                </div>
                             </div>
                          </TooltipTrigger>
                          <TooltipContent side="right" className="text-xs border-border/60 bg-background/95 backdrop-blur-md">
                             <div className="space-y-1">
                                <div className="font-bold flex items-center gap-2">
                                   <span className={isShort ? "text-rose-500" : "text-emerald-500"}>
                                      {isShort ? "Short Liqs" : "Long Liqs"}
                                   </span>
                                   <span className="text-muted-foreground font-mono">
                                      {band.distance}% away
                                   </span>
                                </div>
                                <div className="font-mono text-foreground">
                                   ~${band.volume.toFixed(1)}M Notional
                                </div>
                             </div>
                          </TooltipContent>
                       </Tooltip>
                    </TooltipProvider>
                 )
              })}
              
              {/* Current Price Marker - Absolute centered (approximate for mock) */}
              <div className="relative flex items-center py-2 group">
                 <div className="w-16 text-right font-mono text-xs font-bold text-foreground">
                    ${CURRENT_PRICE.toLocaleString()}
                 </div>
                 <div className="flex-1 border-t border-dashed border-amber-500/50 mx-4 relative">
                    <span className="absolute -top-3 right-0 text-[9px] text-amber-500 uppercase tracking-widest font-bold bg-background px-1">Current Price</span>
                 </div>
              </div>
           </div>

           {/* Legend */}
           <div className="absolute bottom-4 right-6 flex items-center gap-6 text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
              <div className="flex items-center gap-2">
                 <div className="h-2 w-2 rounded-full bg-rose-500/50" />
                 <span>Short Pressure</span>
              </div>
              <div className="flex items-center gap-2">
                 <div className="h-2 w-2 rounded-full bg-emerald-500/50" />
                 <span>Long Support</span>
              </div>
           </div>
        </div>

        {/* Context Panel */}
        <div className="bg-muted/10 p-6 flex flex-col gap-8">
           
           {/* Auto-Insight */}
           <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-widest text-foreground">Automated Insight</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                 High density of <span className="text-emerald-500">long liquidations</span> detected below <span className="font-mono text-foreground">$43,500</span>. This zone acts as a potential liquidity magnet or reversal point if price corrects.
              </p>
           </div>

           {/* Metrics */}
           <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-foreground">Cluster Strength</h4>
              
              <div className="space-y-3">
                 <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Upside Resistance</span>
                    <Badge variant="outline" className="text-rose-500 border-rose-500/20 bg-rose-500/5">Heavy</Badge>
                 </div>
                 <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Downside Support</span>
                    <Badge variant="outline" className="text-emerald-500 border-emerald-500/20 bg-emerald-500/5">Moderate</Badge>
                 </div>
              </div>
           </div>

           {/* Educational Note */}
           <div className="mt-auto pt-6 border-t border-border/40">
              <p className="text-[10px] text-muted-foreground italic">
                 *Clusters represent estimated stop-loss and liquidation levels based on open interest distribution. Not financial advice.
              </p>
           </div>

        </div>
      </div>
    </div>
  )
}
