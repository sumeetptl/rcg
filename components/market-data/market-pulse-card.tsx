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
  className?: string
}

export function MarketPulseCard({
  title,
  value,
  trend = "neutral",
  change,
  subtext,
  className,
}: MarketPulseCardProps) {
  return (
    <Card className={cn("overflow-hidden border-border/60 bg-background/50 hover:bg-background/80 transition-colors", className)}>
      <CardContent className="p-6">
        <div className="flex flex-col gap-1">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
            {title}
          </p>
          <div className="flex items-baseline gap-2 mt-1">
            <h3 className="text-2xl font-mono font-medium tracking-tight text-foreground">
              {value}
            </h3>
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
          </div>
          {subtext && (
            <p className="mt-2 text-xs text-muted-foreground font-medium">
              {subtext}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
