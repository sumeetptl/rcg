"use client"

import { EconomicEvent } from "./types"
import { Badge } from "@/components/ui/badge"
import { X, ExternalLink, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface CalendarEventDetailProps {
  event: EconomicEvent | null
  onClose: () => void
}

export function CalendarEventDetail({ event, onClose }: CalendarEventDetailProps) {
  if (!event) {
    return (
      <div className="hidden lg:flex h-full min-h-[400px] flex-col items-center justify-center rounded-xl border border-border bg-muted/10 p-8 text-center text-muted-foreground">
        <TrendingUp className="mb-4 h-12 w-12 opacity-20" />
        <p className="max-w-xs text-sm">Select an event from the list to view detailed impact analysis and historical data.</p>
      </div>
    )
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high": return "text-red-500 bg-red-500/10 border-red-500/20"
      case "medium": return "text-orange-500 bg-orange-500/10 border-orange-500/20"
      default: return "text-blue-500 bg-blue-500/10 border-blue-500/20"
    }
  }

  return (
    <div className="sticky top-24 rounded-xl border border-border bg-card shadow-sm overflow-hidden">
      {/* Header */}
      <div className="border-b border-border p-6 bg-muted/30">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
             <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="bg-background">
                   {event.country}
                </Badge>
                <Badge variant="outline" className={cn("capitalize border", getImpactColor(event.impact))}>
                   {event.impact} Impact
                </Badge>
             </div>
             <h2 className="text-xl font-bold font-serif leading-tight">{event.title}</h2>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground lg:hidden">
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* Data Grid */}
        <div className="grid grid-cols-3 gap-4 text-center">
           <div className="p-3 rounded bg-muted/50 space-y-1">
              <div className="text-[10px] uppercase font-bold text-muted-foreground">Previous</div>
              <div className="font-mono text-lg">{event.previous}</div>
           </div>
           <div className="p-3 rounded bg-muted/50 space-y-1">
              <div className="text-[10px] uppercase font-bold text-muted-foreground">Forecast</div>
              <div className="font-mono text-lg">{event.forecast}</div>
           </div>
           {event.actual && (
             <div className="p-3 rounded bg-primary/10 space-y-1 border border-primary/20">
                <div className="text-[10px] uppercase font-bold text-primary">Actual</div>
                <div className="font-mono text-lg font-bold text-primary">{event.actual}</div>
             </div>
           )}
        </div>

        {/* Why It Matters */}
        <div className="space-y-3">
           <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Why It Matters</h3>
           <p className="text-sm leading-relaxed text-muted-foreground">
              {event.description}
           </p>
        </div>

        {/* Impact Assets */}
        <div className="space-y-3">
           <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Likely Impacted</h3>
           <div className="flex flex-wrap gap-2">
              {event.impactedAssets.map(asset => (
                 <Badge key={asset} variant="secondary" className="font-mono font-medium">
                    {asset}
                 </Badge>
              ))}
           </div>
        </div>

        {/* Disclaimer / Footer */}
        <div className="pt-6 border-t border-border">
           <p className="text-[11px] text-muted-foreground/60 italic">
              * Forecasts are market consensus. Actual market reaction may vary depending on context.
           </p>
        </div>
      </div>
    </div>
  )
}
