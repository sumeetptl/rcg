"use client"

import { useMemo } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Cell
} from "recharts"

// --- Types ---

export interface RatioData {
  asset: string
  symbol: string
  longPct: number
  shortPct: number
  delta: number // -1.0 to 1.0 (where 0 is neutral)
  openInterest: string // e.g. "$1.2B"
  fundingRate: number // e.g. 0.01
  volume24h: string // e.g. "$450M"
}

interface LongShortRatioChartProps {
  data?: RatioData[]
  className?: string
}

// --- Mock Data Generator ---

const ASSETS = ["BTC", "ETH", "SOL", "OP", "ARB", "XRP", "LDO"]

const generateMockData = (): RatioData[] => {
  return ASSETS.map((asset) => {
    // Generate random delta (-0.8 to 0.8)
    const baseDelta = (Math.random() * 1.6) - 0.8
    const delta = Math.round(baseDelta * 100) / 100
    
    const longPct = Math.round(((delta + 1) / 2) * 100)
    const shortPct = 100 - longPct

    // Mock additional metrics
    const oi = (Math.random() * 2 + 0.1).toFixed(1) + "B"
    const funding = Math.random() * 0.02 * (Math.random() > 0.5 ? 1 : -1)
    const vol = (Math.random() * 800 + 50).toFixed(0) + "M"

    return {
      asset,
      symbol: `${asset}USDT`,
      longPct,
      shortPct,
      delta,
      openInterest: `$${oi}`,
      fundingRate: Number(funding.toFixed(4)),
      volume24h: `$${vol}`
    }
  })
}

// --- Component ---

export function LongShortRatioChart({ data, className }: LongShortRatioChartProps) {
  const router = useRouter()
  
  const chartData = useMemo(() => data || generateMockData(), [data])

  // Custom Tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload as RatioData
      return (
        <div className="rounded-lg border border-border/60 bg-background/95 p-3 shadow-xl backdrop-blur-md min-w-[200px]">
           <div className="flex items-center justify-between mb-2 border-b border-border/20 pb-1">
             <span className="font-bold font-mono text-sm">{item.asset}</span>
             <span className={cn("text-[10px] font-bold", item.fundingRate > 0 ? "text-signal-hit" : "text-signal-missed")}>
                Funding: {item.fundingRate > 0 ? "+" : ""}{item.fundingRate}%
             </span>
           </div>
           
           <div className="space-y-1 text-xs font-mono font-medium">
             <div className="flex items-center justify-between gap-4 text-signal-hit">
               <span>Longs:</span>
               <span>{item.longPct}%</span>
             </div>
             <div className="flex items-center justify-between gap-4 text-signal-missed">
               <span>Shorts:</span>
               <span>{item.shortPct}%</span>
             </div>
             
             <div className="my-2 border-t border-border/20" />
             
             <div className="flex items-center justify-between gap-4 text-muted-foreground">
                <span>Open Interest:</span>
                <span className="text-foreground">{item.openInterest}</span>
             </div>
              <div className="flex items-center justify-between gap-4 text-muted-foreground">
                <span>24h Vol:</span>
                <span className="text-foreground">{item.volume24h}</span>
             </div>

             <div className="mt-2 pt-2 border-t border-border/20 flex items-center justify-between gap-4 font-bold text-foreground">
               <span>Net Delta:</span>
               <span className={item.delta > 0 ? "text-signal-hit" : "text-signal-missed"}>
                 {item.delta > 0 ? "+" : ""}{item.delta}
               </span>
             </div>
           </div>
        </div>
      )
    }
    return null
  }

  return (
    <div className={cn("w-full space-y-4", className)}>
      <div className="flex flex-col space-y-1">
        <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-widest text-foreground">
            Long / Short Ratio Variance
            </h3>
        </div>
        <p className="text-xs text-muted-foreground font-medium">
          Positioning imbalance relative to neutral (0). Positive = Long Heavy, Negative = Short Heavy.
        </p>
      </div>

      <div className="h-[320px] w-full rounded-lg border border-border/40 bg-background/50 p-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--border)" opacity={0.2} />
            <XAxis 
                type="number" 
                domain={[-1, 1]} 
                hide 
            />
            <YAxis 
                dataKey="asset" 
                type="category" 
                tick={{ fill: "var(--muted-foreground)", fontSize: 10, fontFamily: "var(--font-mono)", fontWeight: "bold" }}
                width={40}
                axisLine={false}
                tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
            <ReferenceLine x={0} stroke="var(--border)" strokeDasharray="3 3" />
            
            <Bar dataKey="delta" radius={[2, 2, 2, 2]} barSize={20} cursor="pointer" onClick={(data) => router.push(`/market-data/asset/${(data as any).symbol}`)}>
              {chartData.map((entry, index) => (
                <Cell 
                    key={`cell-${index}`} 
                    fill={entry.delta > 0 ? "var(--signal-hit)" : "var(--signal-missed)"} 
                    fillOpacity={0.9} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      
       {/* Legend Footer */}
        <div className="flex items-center justify-center gap-8 border-t border-border/40 pt-4">
             <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-signal-missed" />
                <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Short Dominance</span>
            </div>
             <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-signal-hit" />
                <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Long Dominance</span>
            </div>
        </div>
    </div>
  )
}
