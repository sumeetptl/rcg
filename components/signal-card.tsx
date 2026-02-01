"use client"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { ArrowUp, ArrowDown, Clock, Target, AlertTriangle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Signal } from "@/lib/types"

interface SignalCardProps {
  signal: Signal
  showAnalysis?: boolean | "compact"
}

export function SignalCard({ signal, showAnalysis = false }: SignalCardProps) {
  // Normalize direction to uppercase for comparison/display if schema stores lowercase
  const directionUpper = signal.direction.toUpperCase() as "LONG" | "SHORT"
  const isLong = directionUpper === "LONG"
  
  // Map schema statuses to colors
  const statusColors: Record<string, string> = {
    draft: "bg-muted text-muted-foreground border-border",
    active: "bg-primary/10 text-primary border-primary/30",
    closed: "bg-muted text-muted-foreground border-border", // Generic closed
    cancelled: "bg-muted text-muted-foreground border-border",
    // Keep uppercase mapping just in case
    PENDING: "bg-signal-pending/20 text-signal-pending border-signal-pending/30",
    ACTIVE: "bg-primary/10 text-primary border-primary/30",
    HIT: "bg-signal-hit/20 text-signal-hit border-signal-hit/30",
    MISSED: "bg-signal-missed/20 text-signal-missed border-signal-missed/30",
    CANCELLED: "bg-muted text-muted-foreground border-border",
  }

  // Result colors
  const resultColors: Record<string, string> = {
    win: "text-signal-hit",
    loss: "text-signal-missed",
    breakeven: "text-muted-foreground",
  }

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

  if (showAnalysis === "compact") {
    return (
      <div className="flex items-center justify-between rounded-lg border border-border bg-card p-3 transition-colors hover:bg-muted/50">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-md",
              isLong ? "bg-signal-long/10" : "bg-signal-short/10"
            )}
          >
            {isLong ? (
              <ArrowUp className="h-4 w-4 text-signal-long" />
            ) : (
              <ArrowDown className="h-4 w-4 text-signal-short" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-sm">{signal.asset}</span>
              <Badge variant="outline" className={cn("h-5 px-1.5 text-[10px]", statusColors[signal.status] || statusColors['active'])}>
                {signal.status}
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>{directionUpper}</span>
              <span>@ {formatPrice(signal.entry_price)}</span>
            </div>
          </div>
        </div>
        
        <div className="text-right">
          {signal.result ? (
            <span className={cn("font-mono font-bold text-sm uppercase", resultColors[signal.result])}>
              {signal.result}
            </span>
          ) : (
            <span className="text-muted-foreground text-xs">Running...</span>
          )}
        </div>
      </div>
    )
  }

  return (
    <Link href={`/signals/${signal.id}`} className="group block h-full">
      <Card className="h-full overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-md">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-lg",
                  isLong ? "bg-signal-long/10" : "bg-signal-short/10"
                )}
              >
                {isLong ? (
                  <ArrowUp className="h-5 w-5 text-signal-long" />
                ) : (
                  <ArrowDown className="h-5 w-5 text-signal-short" />
                )}
              </div>
              <div>
                <h3 className="font-mono text-lg font-semibold transition-colors group-hover:text-primary">{signal.asset}</h3>
                <p className={cn("text-sm font-medium", isLong ? "text-signal-long" : "text-signal-short")}>
                  {directionUpper}
                </p>
              </div>
            </div>
            <Badge variant="outline" className={cn("border", statusColors[signal.status] || statusColors['active'])}>
              {signal.status}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Entry</p>
              <p className="font-mono font-medium">${formatPrice(signal.entry_price)}</p>
            </div>
            <div>
              <p className="flex items-center gap-1 text-muted-foreground">
                <AlertTriangle className="h-3 w-3" /> Stop Loss
              </p>
              <p className="font-mono font-medium text-signal-short">${formatPrice(signal.stop_loss)}</p>
            </div>
          </div>

          <div className="space-y-2">
            <p className="flex items-center gap-1 text-sm text-muted-foreground">
              <Target className="h-3 w-3" /> Targets
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-md bg-signal-hit/10 px-2 py-1 font-mono text-xs text-signal-hit">
                TP1: ${formatPrice(signal.target_1)}
              </span>
              {signal.target_2 && (
                <span className="rounded-md bg-signal-hit/10 px-2 py-1 font-mono text-xs text-signal-hit">
                  TP2: ${formatPrice(signal.target_2)}
                </span>
              )}
              {signal.target_3 && (
                <span className="rounded-md bg-signal-hit/10 px-2 py-1 font-mono text-xs text-signal-hit">
                  TP3: ${formatPrice(signal.target_3)}
                </span>
              )}
            </div>
          </div>

          {signal.result && (
            <div className="rounded-lg bg-muted/50 p-3">
              <p className="text-sm text-muted-foreground">Result</p>
              <p
                className={cn(
                  "font-mono text-lg font-semibold uppercase",
                  resultColors[signal.result]
                )}
              >
                {signal.result}
              </p>
            </div>
          )}

          {showAnalysis && signal.context && (
            <div className="border-t border-border pt-4">
              <p className="text-sm leading-relaxed text-muted-foreground">{signal.context}</p>
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
             <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              {formatDate(signal.created_at)}
            </div>
            <span className="text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
               View Details &rarr;
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
