"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { CryptoLogo } from "@/components/crypto/crypto-logo"
import { cn } from "@/lib/utils"

interface AssetHeaderProps {
  symbol: string
  price?: number
  change24h?: number
}

export function AssetHeader({ symbol, price, change24h }: AssetHeaderProps) {
  const router = useRouter()

  return (
    <header className="sticky top-[80px] z-30 flex h-16 items-center justify-between border-b border-border/40 bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 sm:px-6 lg:px-8">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
              onClick={() => router.back()}
          >
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
          </Button>

          <div className="flex items-center gap-3">
              <CryptoLogo symbol={symbol} size={32} />
              <div>
                  <div className="flex items-center gap-2">
                      <h1 className="text-lg font-bold tracking-tight text-foreground">{symbol}</h1>
                      <span className="text-xs font-mono text-muted-foreground">/ USDT</span>
                  </div>
                  {/* Mobile-ish view for price could go here or separate */}
              </div>
          </div>

          {/* Separator */}
          <div className="h-8 w-px bg-border/40 hidden sm:block" />

          {/* Price Info */}
          <div className="hidden sm:flex items-center gap-4">
              <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Price</span>
                  <span className="font-mono text-sm font-bold">
                      {price ? `$${price.toLocaleString(undefined, { minimumFractionDigits: 2 })}` : "---"}
                  </span>
              </div>
              
              <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground">24h Change</span>
                  <span className={cn(
                      "font-mono text-sm font-bold",
                      change24h && change24h > 0 ? "text-signal-hit" : "text-signal-missed"
                  )}>
                      {change24h ? `${change24h > 0 ? "+" : ""}${change24h.toFixed(2)}%` : "---"}
                  </span>
              </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Timeframe Selector - Placeholder functionality for now or link to URL state */}
          <div className="flex items-center rounded-md border border-border/50 bg-muted/20 p-1">
              {["15m", "1H", "4H", "1D"].map((tf) => (
                  <button
                      key={tf}
                      className={cn(
                          "rounded px-2.5 py-1 text-[10px] font-medium transition-all hover:bg-background hover:text-foreground",
                          tf === "1H" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground" // Default active state for visual
                      )}
                  >
                      {tf}
                  </button>
              ))}
          </div>
          
          <Button variant="outline" size="sm" className="hidden sm:flex h-8 gap-2 text-xs" onClick={() => router.push('/market-data?tab=live-market')}>
              Back to Live Market
          </Button>
        </div>
      </div>
    </header>
  )
}
