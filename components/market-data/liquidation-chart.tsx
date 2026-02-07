"use client"

import { useMemo, useState } from "react"
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell
} from "recharts"
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

export interface LiqDataPoint {
  time: string
  longLiq: number // USD value
  shortLiq: number // USD value
  price: number
}

interface LiquidationChartProps {
  data?: LiqDataPoint[]
  symbol?: string
  className?: string
}

// --- Mock Data Generator ---

const generateMockData = (): LiqDataPoint[] => {
  const data: LiqDataPoint[] = []
  let price = 42000
  
  for (let i = 0; i < 24; i++) {
    // Random walk price
    price = price * (1 + (Math.random() * 0.02 - 0.01))
    
    // Random liquidations with occasional spikes
    const isSpike = Math.random() > 0.8
    const baseLiq = Math.random() * 5000000 // 0-5M
    const spikeMult = isSpike ? (Math.random() * 5 + 2) : 1
    
    const longLiq = baseLiq * spikeMult * (Math.random() > 0.3 ? 1 : 0.2)
    const shortLiq = baseLiq * spikeMult * (Math.random() > 0.3 ? 0.2 : 1)

    data.push({
      time: `${i}:00`,
      longLiq: Math.round(longLiq),
      shortLiq: Math.round(shortLiq),
      price: price
    })
  }
  return data
}

// --- Component ---

export function LiquidationChart({ data, symbol = "BTCUSDT", className }: LiquidationChartProps) {
  const chartData = useMemo(() => data || generateMockData(), [data])
  const [timeframe, setTimeframe] = useState("1h")

  // Interpret Context
  const getInterpretation = () => {
    // Simple logic for MVP based on last data point
    const last = chartData[chartData.length - 1]
    const totalLiq = last.longLiq + last.shortLiq
    const isHigh = totalLiq > 10000000 // >10M is "high" for mock
    
    if (isHigh && last.longLiq > last.shortLiq * 1.5) return "Long wipeout: Potential downside exhaustion."
    if (isHigh && last.shortLiq > last.longLiq * 1.5) return "Short squeeze: Breakout validation via forced buying."
    if (isHigh) return "High leverage flush: Volatility expansion."
    
    return "Market is stable with low liquidations."
  }

  const formatCurrency = (value: number) => {
    if (value >= 1e6) return `$${(value / 1e6).toFixed(1)}M`
    if (value >= 1e3) return `$${(value / 1e3).toFixed(1)}K`
    return `$${value.toLocaleString()}`
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const longLiq = payload.find((p: any) => p.dataKey === "longLiq")?.value || 0
      const shortLiq = payload.find((p: any) => p.dataKey === "shortLiq")?.value || 0
      const price = payload.find((p: any) => p.dataKey === "price")?.value || 0
      const total = longLiq + shortLiq

      return (
        <div className="rounded-lg border border-border/60 bg-background/95 p-3 shadow-xl backdrop-blur-md min-w-[200px]">
          <div className="flex items-center justify-between mb-2 border-b border-border/20 pb-1">
             <span className="font-bold font-mono text-sm text-foreground">Time: {label}</span>
           </div>
           
           <div className="space-y-1 text-xs font-mono font-medium">
             <div className="flex items-center justify-between gap-4 text-signal-long">
                <span>Long Liqs:</span>
                <span className="font-bold">{formatCurrency(longLiq)}</span>
             </div>
             <div className="flex items-center justify-between gap-4 text-signal-short">
                <span>Short Liqs:</span>
                <span className="font-bold">{formatCurrency(shortLiq)}</span>
             </div>
             <div className="mt-1 pt-1 border-t border-border/20 flex items-center justify-between gap-4 text-foreground">
                <span>Total:</span>
                <span className="font-bold">{formatCurrency(total)}</span>
             </div>
             <div className="mt-1 pt-1 border-t border-border/20 flex items-center justify-between gap-4 text-muted-foreground">
                <span>Price:</span>
                <span className="font-bold text-foreground">${price.toLocaleString()}</span>
             </div>
           </div>
        </div>
      )
    }
    return null
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
             <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold uppercase tracking-widest text-foreground">
                    Liquidation Clusters
                </h3>
                 <TooltipProvider>
                    <UITooltip delayDuration={0}>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-muted-foreground/60 hover:text-foreground cursor-help transition-colors" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-[280px] text-xs leading-relaxed">
                        Liquidations occur when leveraged positions are forcibly closed. Spikes often coincide with volatility, not direction certainty.
                      </TooltipContent>
                    </UITooltip>
                </TooltipProvider>
             </div>
            <p className="text-xs text-muted-foreground font-medium">
              Forced position closures for <span className="text-foreground font-bold">{symbol}</span>
            </p>
        </div>
        
        <Select value={timeframe} onValueChange={setTimeframe}>
          <SelectTrigger className="w-[100px] h-8 text-xs font-medium bg-background/50 border-border/40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="15m">15m</SelectItem>
            <SelectItem value="1h">1h</SelectItem>
            <SelectItem value="4h">4h</SelectItem>
            <SelectItem value="1D">1D</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="h-[400px] w-full rounded-lg border border-border/40 bg-background/50 p-4 relative group">
         {/* Chart */}
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
             <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.1} />
             <XAxis 
                dataKey="time" 
                tickLine={false} 
                axisLine={false} 
                tick={{ fill: "var(--muted-foreground)", fontSize: 10, fontFamily: "var(--font-mono)" }}
                minTickGap={30}
             />
             <YAxis 
                yAxisId="left"
                orientation="left"
                tickLine={false} 
                axisLine={false}
                tickFormatter={(val) => val >= 1e6 ? `${(val/1e6).toFixed(0)}M` : `${(val/1e3).toFixed(0)}K`}
                tick={{ fill: "var(--muted-foreground)", fontSize: 10, fontFamily: "var(--font-mono)", fontWeight: "bold" }}
                width={40}
             />
             <YAxis 
                yAxisId="right"
                orientation="right"
                tickLine={false} 
                axisLine={false}
                tickFormatter={(val) => val.toLocaleString()}
                tick={{ fill: "var(--muted-foreground)", fontSize: 10, fontFamily: "var(--font-mono)" }}
                width={50}
                domain={['auto', 'auto']}
             />
             <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--muted)', opacity: 0.1 }} />
             
             {/* Stacked Bars for Liquidations */}
             <Bar 
                yAxisId="left"
                dataKey="shortLiq" 
                stackId="a" 
                fill="var(--signal-short)" 
                opacity={0.8}
                radius={[0, 0, 0, 0]}
                barSize={12}
             />
             <Bar 
                yAxisId="left"
                dataKey="longLiq" 
                stackId="a" 
                fill="var(--signal-long)" 
                opacity={0.8}
                radius={[2, 2, 0, 0]}
                barSize={12}
             />

             {/* Price Line Overlay */}
             <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="price" 
                stroke="var(--muted-foreground)" 
                strokeWidth={1}
                dot={false}
                activeDot={{ r: 3, fill: "var(--muted-foreground)" }}
                opacity={0.6}
             />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Interpretation Panel */}
       <div className="rounded-lg border-l-2 border-brand-primary/40 bg-muted/10 p-4">
          <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">
            <Info className="h-3 w-3" />
            Liquidation Context
          </h4>
          <p className="text-sm font-medium text-foreground">
            {getInterpretation()}
          </p>
       </div>
    </div>
  )
}
