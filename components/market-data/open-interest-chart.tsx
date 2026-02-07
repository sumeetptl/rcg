"use client"

import { useMemo, useState } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Area,
  ComposedChart
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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

export interface OIDataPoint {
  time: string
  openInterest: number
  price: number
}

interface OpenInterestChartProps {
  data?: OIDataPoint[]
  symbol?: string
  className?: string
}

// --- Mock Data Generator ---

const generateMockData = (): OIDataPoint[] => {
  const data: OIDataPoint[] = []
  let price = 42000
  let oi = 12000000000 // 12B start

  for (let i = 0; i < 24; i++) {
    // Random walk
    price = price * (1 + (Math.random() * 0.02 - 0.01))
    oi = oi * (1 + (Math.random() * 0.03 - 0.015))
    
    data.push({
      time: `${i}:00`,
      openInterest: oi,
      price: price
    })
  }
  return data
}

// --- Component ---

export function OpenInterestChart({ data, symbol = "BTCUSDT", className }: OpenInterestChartProps) {
  const chartData = useMemo(() => data || generateMockData(), [data])
  const [timeframe, setTimeframe] = useState("1h")

  // Interpret Trend
  const getInterpretation = () => {
    if (chartData.length < 2) return "Insufficient data."
    
    const start = chartData[0]
    const end = chartData[chartData.length - 1]
    
    const oiChange = (end.openInterest - start.openInterest) / start.openInterest
    const priceChange = (end.price - start.price) / start.price
    
    if (oiChange > 0.01 && priceChange > 0.01) return "Aggressive positioning with momentum."
    if (oiChange > 0.01 && Math.abs(priceChange) < 0.01) return "Leverage buildup, watch for expansion."
    if (oiChange < -0.01 && priceChange > 0.01) return "Short covering / organic move."
    if (oiChange < -0.01 && priceChange < -0.01) return "Deleveraging phase."
    
    return "Market is ranging with stable leverage."
  }

  const formatcurrency = (value: number) => {
    if (value >= 1e9) return `$${(value / 1e9).toFixed(1)}B`
    if (value >= 1e6) return `$${(value / 1e6).toFixed(1)}M`
    return `$${value.toLocaleString()}`
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border border-border/60 bg-background/95 p-3 shadow-xl backdrop-blur-md min-w-[200px]">
          <div className="flex items-center justify-between mb-2 border-b border-border/20 pb-1">
             <span className="font-bold font-mono text-sm text-foreground">Time: {label}</span>
           </div>
           
           <div className="space-y-1 text-xs font-mono font-medium">
             {payload.map((entry: any, index: number) => (
               <div key={index} className="flex items-center justify-between gap-4">
                  <span style={{ color: entry.color }}>{entry.name}:</span>
                  <span className="text-foreground font-bold">
                    {entry.name === "Open Interest" 
                        ? formatcurrency(entry.value)
                        : `$${entry.value.toLocaleString()}`
                    }
                  </span>
               </div>
             ))}
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
                    Open Interest & Price
                </h3>
                 <TooltipProvider>
                    <UITooltip delayDuration={0}>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-muted-foreground/60 hover:text-foreground cursor-help transition-colors" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-[280px] text-xs leading-relaxed">
                        Open interest reflects total outstanding derivatives positions. It does not indicate direction by itself.
                      </TooltipContent>
                    </UITooltip>
                </TooltipProvider>
             </div>
            <p className="text-xs text-muted-foreground font-medium">
              Leverage expansion vs price movement for <span className="text-foreground font-bold">{symbol}</span>
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
                tickFormatter={(val) => val >= 1e9 ? `${(val/1e9).toFixed(1)}B` : `${(val/1e6).toFixed(0)}M`}
                tick={{ fill: "var(--chart-1)", fontSize: 10, fontFamily: "var(--font-mono)", fontWeight: "bold" }}
                width={40}
                domain={['auto', 'auto']}
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
             <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'var(--border)', strokeWidth: 1, strokeDasharray: '4 4' }} />
             
             {/* Open Interest Area (Subtle fill) */}
             <defs>
                <linearGradient id="colorOI" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0}/>
                </linearGradient>
             </defs>
             <Area 
                yAxisId="left"
                type="monotone" 
                dataKey="openInterest" 
                name="Open Interest"
                stroke="var(--chart-1)" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorOI)" 
                activeDot={{ r: 4, strokeWidth: 0, fill: "var(--chart-1)" }}
             />
             
             {/* Price Line (Thin overlay) */}
             <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="price" 
                name="Price"
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
            Market Interpretation
          </h4>
          <p className="text-sm font-medium text-foreground">
            {getInterpretation()}
          </p>
       </div>
    </div>
  )
}
