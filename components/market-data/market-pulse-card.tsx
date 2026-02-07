"use client"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

interface MarketPulseCardProps {
  title: string
  value: string
  trend?: "up" | "down" | "neutral"
  change?: string
  subtext?: string
  volume?: string
  sparklineData?: number[]
  className?: string
  onClick?: () => void
}

export function MarketPulseCard({
  title,
  value,
  trend = "neutral",
  change,
  subtext,
  volume,
  sparklineData,
  className,
  onClick
}: MarketPulseCardProps) {
  return (
    <Card 
      onClick={onClick}
      className={cn(
        "group relative overflow-hidden border-border/60 bg-background/50 hover:bg-background/80 transition-all hover:border-primary/20 hover:shadow-sm cursor-pointer", 
        className
      )}
    >
      <CardContent className="p-5 flex items-end justify-between relative z-10">
        <div className="flex flex-col gap-1 z-10">
          <div className="flex items-center gap-2">
             <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
               {title}
             </p>
             {volume && (
                <span className="text-[10px] font-mono text-muted-foreground/40 hidden sm:inline-block">Vol: {volume}</span>
             )}
          </div>
          
          <div className="flex items-baseline gap-2 mt-1">
            <h3 className="text-2xl font-mono font-medium tracking-tight text-foreground group-hover:text-primary transition-colors">
              {value}
            </h3>
          </div>
          
          <div className="flex items-center gap-2 mt-1">
             {change && (
               <span
                 className={cn(
                   "flex items-center text-xs font-bold font-mono",
                   trend === "up" && "text-signal-hit",
                   trend === "down" && "text-signal-missed",
                   trend === "neutral" && "text-muted-foreground"
                 )}
               >
                 {trend === "up" && <TrendingUp className="mr-1 h-3 w-3" />}
                 {trend === "down" && <TrendingDown className="mr-1 h-3 w-3" />}
                 {trend === "neutral" && <Minus className="mr-1 h-3 w-3" />}
                 {change}
               </span>
             )}
             {subtext && (
                <span className="text-[10px] text-muted-foreground font-medium border-l border-border pl-2 ml-0.5">
                   {subtext}
                </span>
             )}
          </div>
        </div>

        {/* Mini Sparkline */}
        {sparklineData && (
           <div className="h-8 w-16 opacity-30 group-hover:opacity-60 transition-opacity">
              <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                 <path
                    d={`M0 40 ${sparklineData.map((val, i) => `L${(i / (sparklineData.length - 1)) * 100} ${40 - (val / 100) * 40}`).join(" ")}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    className={cn(
                       trend === "up" ? "text-signal-hit" : trend === "down" ? "text-signal-missed" : "text-muted-foreground"
                    )}
                 />
              </svg>
           </div>
        )}
      </CardContent>
    </Card>
  )
}
