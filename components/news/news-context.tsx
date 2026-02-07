"use client"

import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react"

// Mock Data for MVP
const MARKET_INDICES = [
  { label: "Bitcoin", value: "$42,150.00", change: "+1.2%", trend: "up" },
  { label: "Ethereum", value: "$2,240.50", change: "-0.5%", trend: "down" },
  { label: "Total Cap", value: "$1.65T", change: "+0.8%", trend: "up" },
  { label: "BTC Dom", value: "52.4%", change: "0.0%", trend: "flat" },
]

const TRENDING_TOPICS = [
  "Bitcoin ETF Flows",
  "SEC vs Coinbase",
  "Tether Treasury",
  "Real World Assets",
  "Fed Rate Policy"
]

export function NewsContext() {
  return (
    <div className="space-y-8">
      {/* Market Indices */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">
          Market Pulse
        </h3>
        <div className="grid gap-3">
          {MARKET_INDICES.map((item) => (
            <div key={item.label} className="flex items-center justify-between text-sm">
              <span className="font-medium text-muted-foreground">{item.label}</span>
              <div className="flex items-center gap-3">
                 <span className="font-mono text-foreground">{item.value}</span>
                 <span className={`font-mono text-xs flex items-center ${
                    item.trend === 'up' ? 'text-emerald-500' : 
                    item.trend === 'down' ? 'text-rose-500' : 'text-muted-foreground'
                 }`}>
                    {item.trend === 'up' && <ArrowUpRight className="h-3 w-3 mr-0.5" />}
                    {item.trend === 'down' && <ArrowDownRight className="h-3 w-3 mr-0.5" />}
                    {item.trend === 'flat' && <Minus className="h-3 w-3 mr-0.5" />}
                    {item.change}
                 </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Topics */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">
          Context & Trends
        </h3>
        <ul className="space-y-2">
            {TRENDING_TOPICS.map(topic => (
                <li key={topic}>
                    <button className="text-sm text-foreground/80 hover:text-primary hover:underline transition-all text-left">
                        {topic}
                    </button>
                </li>
            ))}
        </ul>
      </div>

       {/* Editor's Note */}
       <div className="rounded border border-primary/20 bg-primary/5 p-4">
          <p className="font-serif text-sm italic text-foreground/80 leading-relaxed">
            "Volatility is compressing. Watch for leverage flush before next expansion leg."
          </p>
          <div className="mt-2 text-[10px] font-bold uppercase tracking-widest text-primary">
            Desk Note • 14:00 UTC
          </div>
       </div>

    </div>
  )
}
