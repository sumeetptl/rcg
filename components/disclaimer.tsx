"use client"

import { useState } from "react"
import { X } from "lucide-react"

export function Disclaimer() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="relative md:fixed md:bottom-0 md:left-0 md:right-0 z-[100] border-b md:border-b-0 md:border-t border-border bg-background md:bg-background/95 p-3 text-[10px] text-muted-foreground sm:text-xs md:shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] md:backdrop-blur md:supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex max-w-7xl items-start justify-between gap-4 px-4 sm:px-6">
        <p className="leading-relaxed">
          <strong className="font-semibold text-foreground">Disclaimer:</strong> The content provided on CoinStaq is for informational and educational purposes only and should not be construed as financial advice. Cryptocurrency trading involves a high level of risk and may not be suitable for all investors. Past performance is not indicative of future results.
        </p>
        <button
          onClick={() => setIsVisible(false)}
          className="flex-shrink-0 rounded-md p-1 transition-colors hover:bg-muted hover:text-foreground"
          aria-label="Dismiss disclaimer"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
