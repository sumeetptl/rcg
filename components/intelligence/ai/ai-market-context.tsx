"use client"

import { Badge } from "@/components/ui/badge"
import { Activity, TrendingUp, BarChart2, Radio } from "lucide-react"

export function AIMarketContext() {
  return (
    <div className="flex w-full flex-col gap-4 rounded-xl border border-border bg-card/50 p-4">
      <div className="flex items-center gap-2 border-b border-border/40 pb-2">
        <Radio className="h-4 w-4 text-primary animate-pulse" />
        <h3 className="text-sm font-semibold tracking-tight">Active Context</h3>
      </div>
      
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Monitored Assets</span>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="font-mono text-xs">BTC/USDT <span className="ml-1 text-green-500">+$64.2k</span></Badge>
            <Badge variant="secondary" className="font-mono text-xs">SOL/USDT <span className="ml-1 text-green-500">+$142.1</span></Badge>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Network Signals</span>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Activity className="h-3.5 w-3.5" />
                <span>Agg. Open Interest</span>
              </div>
              <span className="font-mono font-medium">$34.2B</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <TrendingUp className="h-3.5 w-3.5" />
                <span>24h Liquidations</span>
              </div>
              <span className="font-mono font-medium text-red-400">$184M</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <BarChart2 className="h-3.5 w-3.5" />
                <span>Fear & Greed</span>
              </div>
              <span className="font-mono font-medium text-orange-400">72 (Greed)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
