"use client"

import { useMemo, useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { Info } from "lucide-react"
import {
  Tooltip as UITooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// --- Types ---

interface SlippageBandCounts {
  "0-5bps": number
  "5-15bps": number
  "15-30bps": number
  "30-60bps": number
  ">60bps": number
}

export interface SlippageDataPoint {
  time: string
  bands: SlippageBandCounts
}

interface SlippageHeatmapProps {
  data?: SlippageDataPoint[]
  symbol?: string
  className?: string
}

// --- Mock Data Generator ---

const BANDS = [">60bps", "30-60bps", "15-30bps", "5-15bps", "0-5bps"] as const

const generateMockData = (): SlippageDataPoint[] => {
  const data: SlippageDataPoint[] = []
  
  for (let i = 0; i < 24; i++) {
    // Simulate market stress at certain hours
    const isStress = i > 14 && i < 18
    
    data.push({
      time: `${i}:00`,
      bands: {
        "0-5bps": Math.floor(Math.random() * 50) + 20,
        "5-15bps": Math.floor(Math.random() * 20) + 5,
        "15-30bps": isStress ? Math.floor(Math.random() * 15) + 5 : Math.floor(Math.random() * 5),
        "30-60bps": isStress ? Math.floor(Math.random() * 8) + 2 : Math.floor(Math.random() * 2),
        ">60bps": isStress ? Math.floor(Math.random() * 3) : 0,
      }
    })
  }
  return data
}

// --- Component ---

export function SlippageHeatmap({ data, symbol = "BTCUSDT", className }: SlippageHeatmapProps) {
  const chartData = useMemo(() => data || generateMockData(), [data])
  const [timeframe, setTimeframe] = useState("1h")

  // Color Scale Logic
  const getCellColor = (band: string, count: number) => {
    if (count === 0) return "bg-muted/10"
    
    // Base intensity helper
    const getIntensity = (max: number) => {
        if (count >= max) return 900
        if (count >= max * 0.8) return 800
        if (count >= max * 0.6) return 600
        if (count >= max * 0.4) return 400
        return 200
    }

    if (band === "0-5bps") return `bg-slate-500/${getIntensity(60) / 10}` // Cool Gray (Low impact)
    if (band === "5-15bps") return `bg-indigo-500/${getIntensity(30) / 10}` // Cool Blue/Indigo
    if (band === "15-30bps") return `bg-purple-500/${getIntensity(20) / 10}` // Muted Purple
    if (band === "30-60bps") return `bg-amber-600/${getIntensity(10) / 10}` // Soft Amber (Stress)
    if (band === ">60bps") return `bg-orange-600/${getIntensity(5) / 10}` // Deep Amber/Orange (Dislocation)

    return "bg-muted/10"
  }

  // Interpretation Logic
  const getInterpretation = () => {
    // Analyze last few periods
    const last = chartData[chartData.length - 1]
    const highSlippage = last.bands[">60bps"] + last.bands["30-60bps"]
    const mediumSlippage = last.bands["15-30bps"]

    if (highSlippage > 5) return "Liquidity vacuum — aggressive forced exits causing dislocation."
    if (mediumSlippage > 10) return "Order book thinning — caution advised."
    if (highSlippage === 0 && mediumSlippage < 5) return "Market absorbed recent flow efficiently."
    
    return "Normal execution conditions."
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
             <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold uppercase tracking-widest text-foreground">
                    Slippage Impact
                </h3>
                 <TooltipProvider>
                    <UITooltip delayDuration={0}>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-muted-foreground/60 hover:text-foreground cursor-help transition-colors" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-[280px] text-xs leading-relaxed">
                        Slippage reflects price impact during forced liquidations. High slippage indicates thin liquidity or order book stress.
                      </TooltipContent>
                    </UITooltip>
                </TooltipProvider>
             </div>
            <p className="text-xs text-muted-foreground font-medium">
              Measures execution degradation during forced position closures.
            </p>
        </div>
        
        {/* Legend (Inline) */}
        <div className="hidden sm:flex items-center gap-4 text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
            <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded bg-slate-500/40" /> Normal
            </div>
            <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded bg-purple-500/60" /> Stress
            </div>
            <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded bg-amber-600/80" /> Dislocation
            </div>
        </div>
      </div>

      {/* Heatmap Grid */}
      <div className="rounded-lg border border-border/40 bg-background/50 p-4 overflow-x-auto">
         <div className="min-w-[600px] grid grid-cols-[80px_1fr] gap-4">
            
            {/* Y-Axis Labels */}
            <div className="flex flex-col justify-between py-6 text-[10px] font-mono font-medium text-muted-foreground text-right pr-2">
                {BANDS.map(band => (
                    <span key={band} className="h-6 flex items-center justify-end">{band}</span>
                ))}
            </div>

            {/* Grid Content */}
            <div className="relative">
                 {/* Columns (Time) */}
                 <div className="grid grid-flow-col auto-cols-auto gap-0.5 h-full">
                    {chartData.map((point, i) => (
                        <div key={i} className="flex flex-col justify-between gap-1 group relative">
                             {/* Cells */}
                             {BANDS.map(band => (
                                 <UITooltip key={band}>
                                    <TooltipTrigger asChild>
                                        <div 
                                            className={cn("h-6 w-full rounded-sm transition-opacity hover:opacity-100", getCellColor(band, point.bands[band as keyof SlippageBandCounts]))} 
                                        />
                                    </TooltipTrigger>
                                    <TooltipContent className="text-xs">
                                        <div className="font-bold mb-1">{point.time} • {band}</div>
                                        <div>Events: {point.bands[band as keyof SlippageBandCounts]}</div>
                                    </TooltipContent>
                                 </UITooltip>
                             ))}
                             
                             {/* Time Label (Every 4th) */}
                             {i % 4 === 0 && (
                                 <span className="absolute -bottom-6 left-0 text-[9px] font-mono text-muted-foreground">
                                     {point.time}
                                 </span>
                             )}
                        </div>
                    ))}
                 </div>
            </div>
         </div>
         <div className="h-6" /> {/* Spacing for X-axis labels */}
      </div>

      {/* Interpretation Panel */}
       <div className="rounded-lg border-l-2 border-purple-500/40 bg-muted/10 p-4">
          <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">
            <Info className="h-3 w-3" />
            Structure Analysis
          </h4>
          <p className="text-sm font-medium text-foreground">
            {getInterpretation()}
          </p>
       </div>
    </div>
  )
}
