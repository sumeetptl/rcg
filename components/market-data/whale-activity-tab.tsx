"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ArrowRight, Wallet, Building2 } from "lucide-react"

const WHALE_TX = [
    { id: 1, asset: "BTC", amount: 2500, from: "Unknown Wallet", to: "Binance", type: "inflow", time: "10m ago", value: "$110M" },
    { id: 2, asset: "ETH", amount: 15000, from: "Coinbase", to: "Unknown Wallet", type: "outflow", time: "45m ago", value: "$35M" },
    { id: 3, asset: "SOL", amount: 500000, from: "Unknown Wallet", to: "Unknown Wallet", type: "transfer", time: "1h ago", value: "$48M" },
]

export function WhaleActivityTab() {
  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      {/* Top Metrics Strip */}
      <div className="border-y border-border/40 bg-background/50 py-4 overflow-x-auto">
        <div className="flex items-center gap-8 min-w-max px-2">
            {/* Metric 1 */}
             <div className="flex items-center gap-4">
                <div className="w-0.5 h-6 bg-border/60" />
                <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Net Exch Flow (24h)</span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-xl font-mono font-medium tracking-tight text-signal-missed">-$145M</span>
                        <span className="text-xs font-bold font-mono text-muted-foreground">Outflow</span>
                    </div>
                </div>
            </div>

            {/* Metric 2 */}
            <div className="flex items-center gap-4">
                <div className="w-0.5 h-6 bg-border/60" />
                <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Whale Dominance</span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-xl font-mono font-medium tracking-tight text-foreground">68%</span>
                        <span className="text-xs font-bold font-mono text-signal-hit">High</span>
                    </div>
                </div>
            </div>

            {/* Metric 3 */}
             <div className="flex items-center gap-4">
                <div className="w-0.5 h-6 bg-brand-primary/40" />
                <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Smart Money</span>
                    <div className="flex items-baseline gap-2">
                         <span className="text-xl font-mono font-medium tracking-tight text-signal-hit">Accumulating</span>
                         <span className="text-xs font-bold font-mono text-muted-foreground">ETH</span>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Feed Column: "Terminal Stream" style */}
        <div className="col-span-2 space-y-4">
            <div className="flex items-center justify-between px-2">
                <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground/80">
                    Proprietary Stream (&gt; $1M)
                </h3>
                <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-signal-hit animate-pulse" />
                    <span className="text-[10px] font-mono text-signal-hit">LIVE</span>
                </div>
            </div>
            
            <div className="space-y-3">
                {WHALE_TX.map((tx) => (
                    <div key={tx.id} className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-none border-l-2 border-border/40 bg-background/40 hover:bg-muted/10 p-4 transition-all hover:border-primary/50">
                        <div className="flex items-center gap-4">
                            <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-background/80 border border-border/40 font-mono text-[10px] font-bold">
                                {tx.asset}
                            </div>
                            <div className="space-y-0.5">
                                <div className="flex items-center gap-2 text-sm font-mono font-medium text-foreground/90">
                                    {tx.amount.toLocaleString()} <span className="text-muted-foreground">{tx.asset}</span>
                                    <span className="text-xs text-muted-foreground/60 font-medium ml-2">({tx.value})</span>
                                </div>
                                <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-mono">
                                    <span className="flex items-center gap-1 opacity-70">
                                        {tx.from}
                                    </span>
                                    <ArrowRight className="h-3 w-3 opacity-40" />
                                    <span className="flex items-center gap-1 opacity-70">
                                        {tx.to}
                                    </span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                            {tx.type === "inflow" && (
                                    <span className="text-[10px] uppercase font-bold tracking-widest text-signal-missed bg-signal-missed/5 px-2 py-0.5 rounded-sm">
                                    Inflow
                                    </span>
                            )}
                            {tx.type === "outflow" && (
                                    <span className="text-[10px] uppercase font-bold tracking-widest text-signal-hit bg-signal-hit/5 px-2 py-0.5 rounded-sm">
                                    Outflow
                                    </span>
                            )}
                            {tx.type === "transfer" && (
                                    <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground bg-muted/10 px-2 py-0.5 rounded-sm">
                                    Transfer
                                    </span>
                            )}
                            <span className="text-[10px] text-muted-foreground/50 font-mono">{tx.time}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Interpretation Column */}
        <div className="space-y-6">
            <div className="border border-border/60 bg-background/50 p-6 h-full">
                <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">
                    Flow Analysis
                </h4>
                <div className="space-y-8">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                             <div className="h-2 w-2 bg-signal-missed rounded-full" />
                             <span className="text-xs font-bold uppercase tracking-wider text-foreground">Exchange Inflows</span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed pl-4 border-l border-border/40">
                             High volume of BTC moving to Binance suggests potential sell-side pressure building up.
                        </p>
                    </div>
                     <div className="space-y-2">
                        <div className="flex items-center gap-2">
                             <div className="h-2 w-2 bg-signal-hit rounded-full" />
                             <span className="text-xs font-bold uppercase tracking-wider text-foreground">Exchange Outflows</span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed pl-4 border-l border-border/40">
                            ETH outflows to cold wallets indicate accumulation and reduced liquid supply.
                        </p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}
