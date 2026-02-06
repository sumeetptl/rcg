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
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Feed Column */}
        <Card className="col-span-2 border-border/60 bg-background/50">
            <CardHeader className="pb-4">
                <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground/80">
                    Large Transaction Feed (&gt; $1M)
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {WHALE_TX.map((tx) => (
                        <div key={tx.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-lg border border-border/40 bg-muted/20 p-4 hover:bg-muted/40 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-background border border-border/60">
                                   <span className="text-xs font-bold">{tx.asset}</span>
                                </div>
                                <div className="space-y-0.5">
                                    <div className="flex items-center gap-2 text-sm font-mono font-bold">
                                        {tx.amount.toLocaleString()} {tx.asset}
                                        <span className="text-xs text-muted-foreground font-medium">({tx.value})</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <span className="flex items-center gap-1">
                                            <Wallet className="h-3 w-3" /> {tx.from}
                                        </span>
                                        <ArrowRight className="h-3 w-3" />
                                        <span className="flex items-center gap-1">
                                            {tx.to.includes("Binance") || tx.to.includes("Coinbase") ? <Building2 className="h-3 w-3" /> : <Wallet className="h-3 w-3" />}
                                            {tx.to}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-3">
                                {tx.type === "inflow" && (
                                     <Badge variant="outline" className="border-signal-missed/30 text-signal-missed text-[10px] uppercase font-bold tracking-widest">
                                        Exchange Inflow
                                     </Badge>
                                )}
                                {tx.type === "outflow" && (
                                     <Badge variant="outline" className="border-signal-hit/30 text-signal-hit text-[10px] uppercase font-bold tracking-widest">
                                        Exchange Outflow
                                     </Badge>
                                )}
                                {tx.type === "transfer" && (
                                     <Badge variant="outline" className="text-muted-foreground text-[10px] uppercase font-bold tracking-widest">
                                        Wallet Transfer
                                     </Badge>
                                )}
                                <span className="text-[10px] text-muted-foreground font-mono">{tx.time}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>

        {/* Interpretation Column */}
        <div className="space-y-6">
            <Card className="border-border/60 bg-background/50 h-full">
                <CardHeader>
                    <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground/80">
                        Flow Analysis
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <div className="text-xs font-bold uppercase tracking-wider text-signal-missed">
                            Exchange Inflows
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            High volume of BTC moving to Binance suggests potential sell-side pressure building up.
                        </p>
                    </div>
                     <div className="space-y-2">
                        <div className="text-xs font-bold uppercase tracking-wider text-signal-hit">
                            Exchange Outflows
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            ETH outflows to cold wallets indicate accumulation and reduced liquid supply.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  )
}
