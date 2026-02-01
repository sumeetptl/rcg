"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { SignalCard } from "@/components/signal-card"
import { Signal } from "@/lib/types"
import { cn } from "@/lib/utils"
import { 
  ArrowUp, 
  ArrowDown, 
  Target, 
  AlertTriangle, 
  Clock,
  TrendingUp,
  TrendingDown
} from "lucide-react"

interface SignalViewContainerProps {
  signals: Signal[]
}

export function SignalViewContainer({ signals }: SignalViewContainerProps) {
  const searchParams = useSearchParams()
  const view = (searchParams.get("view") || "grid") as "grid" | "list" | "table"

  const formatPrice = (price: number | null | undefined) => {
    if (price === undefined || price === null) return "-"
    return price < 1 ? price.toFixed(6) : price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const resultColors: Record<string, string> = {
    win: "text-signal-hit",
    loss: "text-signal-missed",
    breakeven: "text-muted-foreground",
  }

  if (view === "table") {
    return (
      <div className="overflow-hidden rounded-lg border border-border">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border bg-muted/30 text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
              <th className="px-6 py-4">Asset / Type</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Entry</th>
              <th className="px-6 py-4">Target 1</th>
              <th className="px-6 py-4">Stop Loss</th>
              <th className="px-6 py-4 text-right">Result</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {signals.map((signal) => {
              const directionUpper = signal.direction.toUpperCase()
              const isLong = directionUpper === "LONG"
              return (
                <tr key={signal.id} className="group hover:bg-muted/10 transition-colors">
                  <td className="px-6 py-4">
                    <Link href={`/signals/${signal.id}`} className="flex items-center gap-3">
                      <div className={cn(
                        "flex h-7 w-7 items-center justify-center rounded",
                        isLong ? "bg-signal-long/10 text-signal-long" : "bg-signal-short/10 text-signal-short"
                      )}>
                        {isLong ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-mono text-sm font-bold text-foreground">{signal.asset}</span>
                        <span className={cn("text-[10px] font-bold uppercase tracking-widest", isLong ? "text-signal-long" : "text-signal-short")}>
                          {directionUpper}
                        </span>
                      </div>
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className="text-[9px] uppercase tracking-widest font-bold border-border/60">
                      {signal.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-xs font-mono font-medium text-foreground">
                    ${formatPrice(signal.entry_price)}
                  </td>
                  <td className="px-6 py-4 text-xs font-mono font-medium text-signal-hit">
                    ${formatPrice(signal.target_1)}
                  </td>
                  <td className="px-6 py-4 text-xs font-mono font-medium text-signal-missed">
                    ${formatPrice(signal.stop_loss)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    {signal.result ? (
                      <span className={cn("font-mono text-[10px] font-bold uppercase tracking-widest", resultColors[signal.result])}>
                        {signal.result}
                      </span>
                    ) : (
                      <span className="text-[10px] uppercase font-bold text-muted-foreground/60 tracking-widest italic">Live</span>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }

  if (view === "list") {
    return (
      <div className="mx-auto max-w-5xl space-y-8">
        {signals.map((signal) => {
          const isLong = signal.direction.toUpperCase() === "LONG"
          return (
            <Link key={signal.id} href={`/signals/${signal.id}`} className="group block">
              <div className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-lg border border-border bg-background hover:border-primary/40 transition-all hover:bg-muted/5">
                <div className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-xl flex-shrink-0",
                  isLong ? "bg-signal-long/10" : "bg-signal-short/10"
                )}>
                  {isLong ? <ArrowUp className="h-6 w-6 text-signal-long" /> : <ArrowDown className="h-6 w-6 text-signal-short" />}
                </div>
                
                <div className="flex-1 w-full space-y-1">
                  <div className="flex items-center justify-between sm:justify-start sm:gap-4">
                    <h3 className="font-mono text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                      {signal.asset}
                    </h3>
                    <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-widest border-border/60">
                      {signal.status}
                    </Badge>
                  </div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                    Technical Analysis Execution Protocol
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-8 w-full sm:w-auto sm:border-l sm:border-border sm:pl-8">
                  <div className="space-y-1">
                    <span className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Entry</span>
                    <span className="font-mono text-sm font-bold">${formatPrice(signal.entry_price)}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Target</span>
                    <span className="font-mono text-sm font-bold text-signal-hit">${formatPrice(signal.target_1)}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Stop</span>
                    <span className="font-mono text-sm font-bold text-signal-missed">${formatPrice(signal.stop_loss)}</span>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1 w-full sm:w-32 border-t sm:border-t-0 sm:border-l sm:border-border pt-4 sm:pt-0 sm:pl-8">
                  {signal.result ? (
                    <div className={cn("text-xs font-bold uppercase tracking-widest", resultColors[signal.result])}>
                      {signal.result}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary animate-pulse">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      Live Data
                    </div>
                  )}
                  <span className="text-[10px] font-mono text-muted-foreground/50">
                    {formatDate(signal.created_at)}
                  </span>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    )
  }

  // Default Grid
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {signals.map((signal) => (
        <SignalCard key={signal.id} signal={signal} showAnalysis />
      ))}
    </div>
  )
}
