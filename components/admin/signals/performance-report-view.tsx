"use client"

import React, { useState, useMemo } from "react"
import { toPng } from "html-to-image"
import { toast } from "sonner"
import {
  Download,
  Copy,
  Check,
  TrendingUp,
  TrendingDown,
  Award,
  Target,
  BarChart3,
  Calendar,
  Layers,
  ArrowUp,
  ArrowDown,
  Share2,
  Percent,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { CryptoLogo } from "@/components/crypto/crypto-logo"
import { Signal } from "@/lib/types"
import {
  PerformanceTimeframe,
  computePerformanceReport,
} from "@/lib/services/performance-report"
import { cn } from "@/lib/utils"

interface PerformanceReportViewProps {
  signals: Signal[]
  className?: string
}

export function PerformanceReportView({ signals, className }: PerformanceReportViewProps) {
  const [timeframe, setTimeframe] = useState<PerformanceTimeframe>("1W")
  const [leverage, setLeverage] = useState<number>(10)
  const [isDownloading, setIsDownloading] = useState<boolean>(false)
  const [copied, setCopied] = useState<boolean>(false)

  const report = useMemo(() => {
    return computePerformanceReport(signals, timeframe, leverage)
  }, [signals, timeframe, leverage])

  const handleDownloadImage = async () => {
    const element = document.getElementById("performance-report-capture")
    if (!element) {
      toast.error("Could not find the performance report element to capture.")
      return
    }

    try {
      setIsDownloading(true)
      const dataUrl = await toPng(element, {
        cacheBust: true,
        pixelRatio: 2,
        style: {
          transform: "scale(1)",
        },
      })

      const link = document.createElement("a")
      link.download = `CoinStaq-Intelligence-Performance-Report-${timeframe}.png`
      link.href = dataUrl
      link.click()
      toast.success("Intelligence performance report downloaded successfully!")
    } catch (err) {
      console.error("Capture error:", err)
      toast.error("Failed to download performance report image.")
    } finally {
      setIsDownloading(false)
    }
  }

  const handleCopyFormattedText = async () => {
    try {
      await navigator.clipboard.writeText(report.formattedText)
      setCopied(true)
      toast.success("Report copied to clipboard in CoinStaq format!")
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Copy error:", err)
      toast.error("Failed to copy report text")
    }
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* Control Bar (Excluded from image capture) */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-xl border border-border bg-card/80 backdrop-blur-sm shadow-xs">
        {/* Timeframe Selector */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono font-semibold uppercase text-muted-foreground mr-1 flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-primary" />
            Horizon:
          </span>
          <div className="flex rounded-lg border border-border p-0.5 bg-muted/30">
            {(["1D", "1W", "1M", "ALL"] as const).map((tf) => (
              <button
                key={tf}
                type="button"
                onClick={() => setTimeframe(tf)}
                className={`px-3 py-1.5 text-xs font-mono font-medium rounded-md transition-all ${
                  timeframe === tf
                    ? "bg-primary text-primary-foreground shadow-xs font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tf === "1D" ? "1 Day" : tf === "1W" ? "1 Week" : tf === "1M" ? "1 Month" : "All-Time"}
              </button>
            ))}
          </div>
        </div>

        {/* Leverage and Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 sm:justify-end">
          {/* Leverage Selector */}
          <div className="flex items-center gap-1 rounded-lg border border-border px-2 py-1 bg-muted/20 text-xs font-mono">
            <span className="text-[11px] text-muted-foreground">Lev:</span>
            {[1, 5, 10, 20].map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLeverage(l)}
                className={`px-1.5 py-0.5 rounded text-[11px] transition-colors ${
                  leverage === l ? "bg-primary/20 text-primary font-bold" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {l}x
              </button>
            ))}
          </div>

          {/* Copy Formatted Text Button */}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleCopyFormattedText}
            className="gap-1.5 text-xs font-mono h-9 shadow-xs"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-emerald-500" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
            <span>{copied ? "Copied!" : "Copy Formatted Text"}</span>
          </Button>

          {/* Download Image Button */}
          <Button
            type="button"
            size="sm"
            onClick={handleDownloadImage}
            disabled={isDownloading}
            className="gap-1.5 text-xs font-mono h-9 shadow-xs bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Download className={cn("h-3.5 w-3.5", isDownloading && "animate-pulse")} />
            <span>{isDownloading ? "Capturing..." : "Download Report"}</span>
          </Button>
        </div>
      </div>

      {/* Downloadable / Capturable Report Card */}
      <div
        id="performance-report-capture"
        className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 sm:p-10 text-card-foreground shadow-sm"
      >
        {/* Subtle Watermark */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.02] dark:opacity-[0.03] z-0 overflow-hidden">
          <span className="font-serif text-[10rem] font-black rotate-[-25deg] tracking-tighter whitespace-nowrap select-none">
            COINSTAQ
          </span>
        </div>

        {/* Content Container */}
        <div className="relative z-10 space-y-8">
          {/* Header Banner */}
          <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border/60 pb-6">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-primary px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20">
                  COINSTAQ INTELLIGENCE
                </span>
                <Badge variant="outline" className="font-mono text-xs">
                  {report.timeframeLabel}
                </Badge>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
                Performance Report
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground font-mono">
                {report.startDate} – {report.endDate} • {leverage}x Effective Leverage
              </p>
            </div>

            <div className="text-left sm:text-right font-mono">
              <span className="text-[11px] uppercase tracking-wider text-muted-foreground block">
                Verification Stamp
              </span>
              <span className="text-xs text-foreground font-semibold">
                SYSTEM AUDITED: {new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>
          </header>

          {/* Top KPI Metrics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Win Rate */}
            <div className="p-4 rounded-xl border border-border/80 bg-background/50 space-y-1">
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="text-[11px] font-mono uppercase tracking-wider">Win Rate</span>
                <Award className="h-4 w-4 text-primary" />
              </div>
              <div className="text-3xl font-mono font-bold tracking-tight text-foreground">
                {report.winRate}%
              </div>
              <div className="text-[11px] font-mono text-muted-foreground flex items-center gap-1.5">
                <span className="text-emerald-500 font-semibold">{report.wins}W</span>
                <span>•</span>
                <span className="text-rose-500 font-semibold">{report.losses}L</span>
                <span>•</span>
                <span>{report.breakevens}BE</span>
              </div>
            </div>

            {/* Net Realized ROI */}
            <div className="p-4 rounded-xl border border-border/80 bg-background/50 space-y-1">
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="text-[11px] font-mono uppercase tracking-wider">Net ROI ({leverage}x)</span>
                <Percent className="h-4 w-4 text-emerald-500" />
              </div>
              <div
                className={cn(
                  "text-3xl font-mono font-bold tracking-tight",
                  report.netRoi >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
                )}
              >
                {report.netRoi >= 0 ? "+" : ""}
                {report.netRoi}%
              </div>
              <div className="text-[11px] font-mono text-muted-foreground">
                Raw Price: {report.netRawRoi >= 0 ? "+" : ""}{report.netRawRoi}%
              </div>
            </div>

            {/* Total Signals */}
            <div className="p-4 rounded-xl border border-border/80 bg-background/50 space-y-1">
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="text-[11px] font-mono uppercase tracking-wider">Total Setups</span>
                <Layers className="h-4 w-4 text-primary" />
              </div>
              <div className="text-3xl font-mono font-bold tracking-tight text-foreground">
                {report.totalSignals}
              </div>
              <div className="text-[11px] font-mono text-muted-foreground">
                {report.closedCount} Resolved • {report.activeCount} Active
              </div>
            </div>

            {/* Profit Factor / Best Trade */}
            <div className="p-4 rounded-xl border border-border/80 bg-background/50 space-y-1">
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="text-[11px] font-mono uppercase tracking-wider">Profit Factor</span>
                <BarChart3 className="h-4 w-4 text-primary" />
              </div>
              <div className="text-3xl font-mono font-bold tracking-tight text-foreground">
                {report.profitFactor > 0 ? report.profitFactor.toFixed(2) : "—"}
              </div>
              <div className="text-[11px] font-mono text-muted-foreground truncate">
                Avg Win: +{report.avgGainPerWin}% ROI
              </div>
            </div>
          </div>

          {/* Directional Distribution & Execution Quality */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl border border-border/80 bg-muted/20 text-xs font-mono">
            {/* Longs */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 font-semibold text-emerald-600 dark:text-emerald-400">
                  <ArrowUp className="h-3.5 w-3.5" /> Long Setups
                </span>
                <span>{report.longsWins} / {report.longsCount} Won ({report.longsWinRate}%)</span>
              </div>
              <div className="h-2 w-full bg-muted/70 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-full rounded-full transition-all"
                  style={{ width: `${report.longsWinRate}%` }}
                />
              </div>
            </div>

            {/* Shorts */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 font-semibold text-rose-600 dark:text-rose-400">
                  <ArrowDown className="h-3.5 w-3.5" /> Short Setups
                </span>
                <span>{report.shortsWins} / {report.shortsCount} Won ({report.shortsWinRate}%)</span>
              </div>
              <div className="h-2 w-full bg-muted/70 rounded-full overflow-hidden">
                <div
                  className="bg-rose-500 h-full rounded-full transition-all"
                  style={{ width: `${report.shortsWinRate}%` }}
                />
              </div>
            </div>
          </div>

          {/* Detailed Trades Table */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg font-semibold tracking-tight text-foreground flex items-center gap-2">
                <Target className="h-4 w-4 text-primary" />
                Signals Log ({report.trades.length})
              </h3>
              <span className="text-xs font-mono text-muted-foreground">
                Showing all setups in window
              </span>
            </div>

            {report.trades.length === 0 ? (
              <div className="p-8 text-center rounded-xl border border-border border-dashed bg-muted/10 text-muted-foreground text-xs font-mono">
                No signals found in this timeframe window.
              </div>
            ) : (
              <div className="rounded-xl border border-border overflow-hidden">
                <table className="w-full text-xs font-mono">
                  <thead>
                    <tr className="border-b border-border bg-muted/40 text-left text-muted-foreground">
                      <th className="p-3 pl-4">Asset / Pair</th>
                      <th className="p-3">Direction</th>
                      <th className="p-3">Entry Price</th>
                      <th className="p-3">Status / Result</th>
                      <th className="p-3 text-right pr-4">Realized ROI ({leverage}x)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {report.trades.map((t) => (
                      <tr key={t.id} className="hover:bg-muted/20 transition-colors">
                        <td className="p-3 pl-4">
                          <div className="flex items-center gap-2.5">
                            <CryptoLogo symbol={t.asset} size={20} />
                            <span className="font-bold text-foreground">{t.pair}</span>
                          </div>
                        </td>
                        <td className="p-3">
                          <span
                            className={cn(
                              "inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase",
                              t.direction === "LONG"
                                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                            )}
                          >
                            {t.direction === "LONG" ? <ArrowUp className="h-2.5 w-2.5" /> : <ArrowDown className="h-2.5 w-2.5" />}
                            {t.direction}
                          </span>
                        </td>
                        <td className="p-3 text-muted-foreground">
                          {t.entryPrice ? `$${t.entryPrice.toLocaleString()}` : "Market"}
                        </td>
                        <td className="p-3">
                          {t.result === "win" ? (
                            <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold text-[11px]">
                              <span>TP{t.hitTargets[t.hitTargets.length - 1] || 1} Hit</span>
                            </span>
                          ) : t.result === "loss" ? (
                            <span className="inline-flex items-center gap-1 text-rose-600 dark:text-rose-400 font-semibold text-[11px]">
                              <span>Stop Loss</span>
                            </span>
                          ) : (
                            <Badge variant="outline" className="text-[10px] uppercase font-mono py-0">
                              {t.status}
                            </Badge>
                          )}
                        </td>
                        <td className="p-3 text-right pr-4 font-bold">
                          {t.result ? (
                            <span
                              className={
                                t.achievedRoi >= 0
                                  ? "text-emerald-600 dark:text-emerald-400"
                                  : "text-rose-600 dark:text-rose-400"
                              }
                            >
                              {t.achievedRoi >= 0 ? "+" : ""}
                              {t.achievedRoi}%
                            </span>
                          ) : (
                            <span className="text-muted-foreground font-normal">—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Institutional Stamp & Footer */}
          <footer className="pt-6 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-muted-foreground">
            <div>
              <span className="font-serif font-bold text-foreground text-sm tracking-tight block">
                Less Noise. More Edge.
              </span>
              <span>CoinStaq Intelligence • Transparent Research & Mathematical Execution</span>
            </div>

            <div className="text-right text-[11px]">
              <span>Official Intelligence Report • Past performance is not indicative of future returns.</span>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}
