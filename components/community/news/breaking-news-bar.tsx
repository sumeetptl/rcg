"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface BreakingNewsBarProps {
  news?: string[]
}

const DEFAULT_NEWS = [
  "SEC delays decision on Ethereum ETF applications",
  "Bitcoin volatility compresses to 2-year lows ahead of CPI print",
  "BlackRock CEO comments on tokenization of real-world assets",
  "Regulatory clarity emerges in EU markets following MiCA implementation"
]

export function BreakingNewsBar({ news = DEFAULT_NEWS }: BreakingNewsBarProps) {
  return (
    <div className="sticky top-0 z-40 w-full border-b border-amber-500/30 bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex h-8 max-w-7xl items-center px-4 sm:px-6 overflow-hidden">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-amber-500 shrink-0 mr-4">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
          </span>
          Breaking
        </div>
        
        <div className="flex-1 overflow-hidden relative group">
           <div className="animate-marquee whitespace-nowrap flex items-center gap-8 text-xs font-medium text-foreground/90">
             {news.concat(news).map((item, i) => (
               <span key={i} className="inline-flex items-center gap-8">
                 {item}
                 <span className="text-amber-500/40">•</span>
               </span>
             ))}
           </div>
        </div>
      </div>
    </div>
  )
}
