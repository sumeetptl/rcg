import { createClient } from "@/lib/supabase/server"
import { SignalCard } from "@/components/signal-card"
import { Badge } from "@/components/ui/badge"
import { MetricsRail } from "@/components/metrics-rail"
import { ContentViewSwitcher } from "@/components/content-view-switcher"
import { SignalViewContainer } from "@/components/signals/signal-view-container"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Trading Terminal",
}

const statusFilters = ["All", "active", "pending", "closed"]

export default async function SignalsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>
}) {
  const { status } = await searchParams
  const supabase = await createClient()

  let query = supabase
    .from("signals")
    .select("*")
    .order("created_at", { ascending: false })

  if (status && status !== "All") {
    query = query.eq("status", status.toLowerCase())
  }

  const { data: signals } = await query

  // Calculate stats
  const allSignals = signals || []
  
  // 1. Active Setups
  const activeSignals = allSignals.filter((s) => s.status === "active" || s.status === "pending")
  
  // 2. Closed & Scored Signals
  const closedSignals = allSignals.filter((s) => s.result === "win" || s.result === "loss" || s.result === "breakeven")
  const wins = closedSignals.filter(s => s.result === "win").length
  const losses = closedSignals.filter(s => s.result === "loss").length
  
  // 3. Win Rate (Strike Rate) - including breakeven in denominator often makes sense for strict win rate, or just wins+losses
  const winRate = closedSignals.length > 0 
    ? ((wins / closedSignals.length) * 100).toFixed(0) 
    : "0"

  // 4. Net Performance (Est. R-Multiples)
  const estimatedNetR = (wins * 1.5) - (losses * 1.0)

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:border-x lg:border-border/40 lg:min-h-screen">
      {/* Calm Header */}
      <header className="mb-10 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="font-serif text-3xl font-medium tracking-tight text-foreground">Technical Terminal</h1>
          <p className="text-muted-foreground text-sm font-medium">
            Institutional execution parameters and risk-adjusted market entries.
          </p>
        </div>
        <ContentViewSwitcher />
      </header>

      {/* Metrics Rail */}
      <MetricsRail
        className="mb-10"
        metrics={[
          {
            label: "Active Setups",
            value: activeSignals.length,
            delta: "Live",
          },
          {
            label: "Strike Rate",
            value: closedSignals.length > 0 ? `${winRate}%` : "—",
            delta: `${wins}W · ${losses}L`,
          },
          {
            label: "Total Signals",
            value: allSignals.length,
            delta: "Lifetime",
          },
          {
            label: "Net Performance",
            value: `${estimatedNetR > 0 ? '+' : ''}${estimatedNetR.toFixed(1)}R`,
            delta: "Est. Realized",
            deltaType: estimatedNetR >= 0 ? "positive" : "negative",
            accent: true,
          },
        ]}
      />

      {/* Status Filter */}
      <div className="mb-8 flex flex-wrap gap-2">
        {statusFilters.map((filterStatus) => (
          <a
            key={filterStatus}
            href={filterStatus === "All" ? "/dashboard/signals" : `/dashboard/signals?status=${filterStatus}`}
          >
            <Badge
              variant={(!status && filterStatus === "All") || status === filterStatus.toLowerCase() ? "default" : "outline"}
              className="cursor-pointer transition-colors capitalize px-3 py-1 font-medium uppercase tracking-tighter"
            >
              {filterStatus}
            </Badge>
          </a>
        ))}
      </div>

      {/* Signals Section */}
      <div className="pb-12">
        <SignalViewContainer signals={signals || []} />
      </div>
    </div>
  )
}
