"use client"

import { Separator } from "@/components/ui/separator"
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react"

export function NewsArticleContext() {
  return (
    <div className="space-y-8">
       {/* Asset Impact Panel - Sticky */}
       <div className="space-y-4 rounded bg-muted/20 p-4 border border-border/40">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Market Impact</h3>
          
          <div className="space-y-3">
             <div className="flex justify-between items-center text-sm">
                <span className="font-mono font-bold">BTC</span>
                <span className="text-emerald-500 font-mono text-xs flex items-center">
                   <ArrowUpRight className="h-3 w-3 mr-1" /> +0.3%
                </span>
             </div>
             <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Open Interest</span>
                <span className="text-emerald-500 font-mono text-xs flex items-center">
                   +2.1%
                </span>
             </div>
             <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Funding</span>
                <span className="text-muted-foreground font-mono text-xs flex items-center">
                   Neutral
                </span>
             </div>
          </div>
       </div>

       <Separator />

       {/* Related Coverage */}
       <div className="space-y-4">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Related Coverage</h3>
          <ul className="space-y-3">
             <li>
                <a href="#" className="block text-xs font-medium text-muted-foreground hover:text-foreground leading-snug transition-colors">
                   SEC delays decision on Ethereum ETF applications
                </a>
             </li>
             <li>
                <a href="#" className="block text-xs font-medium text-muted-foreground hover:text-foreground leading-snug transition-colors">
                   Grayscale wins lawsuit against SEC regarding GBTC conversion
                </a>
             </li>
          </ul>
       </div>

       {/* Signal Separation Badge */}
       <div className="rounded border border-primary/20 bg-primary/5 p-4 mt-8">
          <p className="text-[10px] font-medium text-muted-foreground leading-relaxed">
             <strong className="text-primary block mb-1 uppercase tracking-wider">Disclaimer</strong>
             News analysis is for informational purposes only. Trading signals and execution parameters are published separately in the Terminal.
          </p>
       </div>
    </div>
  )
}
