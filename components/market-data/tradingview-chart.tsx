"use client"

import { useEffect, useRef, memo } from "react"
import { useTheme } from "next-themes"

declare global {
  interface Window {
    TradingView: any
  }
}

interface TradingViewChartProps {
  symbol: string
  interval?: string
}

function TradingViewChartComponent({ symbol, interval = "60" }: TradingViewChartProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Clear previous chart
    container.innerHTML = ""

    const script = document.createElement("script")
    script.src = "https://s3.tradingview.com/tv.js"
    script.async = true
    script.onload = () => {
      if (window.TradingView) {
        new window.TradingView.widget({
          autosize: true,
          symbol: `BINANCE:${symbol}USDT`, // Defaulting to Binance for now, can be dynamic
          interval: interval,
          timezone: "Etc/UTC",
          theme: "dark", // User requested dark theme enforced
          style: "1",
          locale: "en",
          enable_publishing: false,
          hide_side_toolbar: false,
          allow_symbol_change: false, // User requested disable symbol search
          container_id: container.id,
          // Minimal toolbar settings if possible via overrides or standard config
          toolbar_bg: "#000000",
          hide_top_toolbar: false, // User requested minimal, but we need timeframe if header doesn't fully control it yet.
          // We can try to match the app theme, but user specifically asked for "Dark mode" in requirements.
        })
      }
    }
    container.appendChild(script)

    return () => {
      if (container) {
        container.innerHTML = ""
      }
    }
  }, [symbol, interval]) // Re-render on symbol or interval change

  return (
    <div className="h-full w-full relative bg-background/50 rounded-lg overflow-hidden border border-border/50">
      <div id={`tradingview_${symbol}`} ref={containerRef} className="h-full w-full" />
    </div>
  )
}

export const TradingViewChart = memo(TradingViewChartComponent)
