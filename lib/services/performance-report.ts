import { Signal } from "@/lib/types"
import { formatPair } from "@/lib/signal-formatter"

export type PerformanceTimeframe = "1D" | "1W" | "1M" | "ALL"

export interface TradePerformanceItem {
  id: string
  asset: string
  pair: string
  direction: "LONG" | "SHORT"
  entryPrice: number | null
  stopLoss: number | null
  target1: number | null
  status: string
  result: "win" | "loss" | "breakeven" | null
  hitTargets: number[]
  achievedRoi: number // e.g. +36.8% (10x leveraged)
  rawRoi: number // unleveraged price %
  createdAt: string
  updatedAt?: string | null
}

export interface PerformanceReportData {
  timeframe: PerformanceTimeframe
  timeframeLabel: string
  startDate: string
  endDate: string
  totalSignals: number
  activeCount: number
  closedCount: number
  wins: number
  losses: number
  breakevens: number
  winRate: number // 0 - 100
  netRoi: number // e.g. +184.5% (10x leveraged)
  netRawRoi: number // unleveraged
  avgGainPerWin: number
  avgLossPerLoss: number
  profitFactor: number
  longsCount: number
  longsWins: number
  longsWinRate: number
  shortsCount: number
  shortsWins: number
  shortsWinRate: number
  bestTrade: TradePerformanceItem | null
  trades: TradePerformanceItem[]
  formattedText: string
}

function formatDateDisplay(d: Date): string {
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export function computePerformanceReport(
  signals: Signal[],
  timeframe: PerformanceTimeframe = "1W",
  leverage: number = 10
): PerformanceReportData {
  const now = new Date()
  let cutoff = 0

  if (timeframe === "1D") {
    cutoff = now.getTime() - 24 * 60 * 60 * 1000
  } else if (timeframe === "1W") {
    cutoff = now.getTime() - 7 * 24 * 60 * 60 * 1000
  } else if (timeframe === "1M") {
    cutoff = now.getTime() - 30 * 24 * 60 * 60 * 1000
  } else {
    cutoff = 0
  }

  const timeframeLabels: Record<PerformanceTimeframe, string> = {
    "1D": "1 Day (24 Hours)",
    "1W": "1 Week (7 Days)",
    "1M": "1 Month (30 Days)",
    ALL: "All-Time",
  }

  // Filter signals created or updated within the cutoff
  const filtered = signals.filter((s) => {
    if (cutoff === 0) return true
    const createdTime = new Date(s.created_at).getTime()
    const updatedTime = s.updated_at ? new Date(s.updated_at).getTime() : 0
    return createdTime >= cutoff || updatedTime >= cutoff
  })

  let wins = 0
  let losses = 0
  let breakevens = 0
  let activeCount = 0
  let closedCount = 0

  let totalWinRoi = 0
  let totalLossRoi = 0
  let netRoi = 0
  let netRawRoi = 0

  let longsCount = 0
  let longsWins = 0
  let shortsCount = 0
  let shortsWins = 0

  const trades: TradePerformanceItem[] = filtered.map((s) => {
    const isLong = s.direction.toUpperCase() === "LONG"
    const entry = s.entry_price || 0
    const result = s.result ? (s.result.toLowerCase() as "win" | "loss" | "breakeven") : null
    const isClosed = s.status === "closed" || result !== null

    if (!isClosed) {
      activeCount++
    } else {
      closedCount++
    }

    // Calculate trade ROI
    let rawRoi = 0
    if (s.achieved_roi !== null && s.achieved_roi !== undefined) {
      rawRoi = Number(s.achieved_roi)
    } else if (result === "win") {
      // Estimate from Target 1
      if (entry && s.target_1) {
        rawRoi = isLong ? ((s.target_1 - entry) / entry) * 100 : ((entry - s.target_1) / entry) * 100
      } else {
        rawRoi = 3.5
      }
    } else if (result === "loss") {
      // Estimate from Stop Loss
      if (entry && s.stop_loss) {
        rawRoi = isLong ? ((s.stop_loss - entry) / entry) * 100 : ((entry - s.stop_loss) / entry) * 100
      } else {
        rawRoi = -2.0
      }
    }

    // Enforce proper sign based on result
    if (result === "loss") {
      rawRoi = -Math.abs(rawRoi)
    } else if (result === "win") {
      rawRoi = Math.abs(rawRoi)
    } else if (result === "breakeven") {
      rawRoi = 0
    }

    const leveragedRoi = Number((rawRoi * leverage).toFixed(2))

    if (result === "win") {
      wins++
      totalWinRoi += leveragedRoi
      if (isLong) longsWins++
      else shortsWins++
    } else if (result === "loss") {
      losses++
      totalLossRoi += Math.abs(leveragedRoi)
    } else if (result === "breakeven") {
      breakevens++
    }

    if (isLong) longsCount++
    else shortsCount++

    netRoi += leveragedRoi
    netRawRoi += rawRoi

    const item: TradePerformanceItem = {
      id: s.id,
      asset: s.asset,
      pair: formatPair(s.asset),
      direction: isLong ? "LONG" : "SHORT",
      entryPrice: s.entry_price,
      stopLoss: s.stop_loss,
      target1: s.target_1,
      status: s.status,
      result,
      hitTargets: s.hit_targets || [],
      achievedRoi: leveragedRoi,
      rawRoi: Number(rawRoi.toFixed(2)),
      createdAt: s.created_at,
      updatedAt: s.updated_at,
    }

    return item
  })

  const bestTrade =
    trades
      .filter((t) => t.result === "win")
      .sort((a, b) => b.achievedRoi - a.achievedRoi)[0] || null

  const decidedTrades = wins + losses
  const winRate = decidedTrades > 0 ? Number(((wins / decidedTrades) * 100).toFixed(1)) : 0
  const longsWinRate = longsCount > 0 ? Number(((longsWins / longsCount) * 100).toFixed(1)) : 0
  const shortsWinRate = shortsCount > 0 ? Number(((shortsWins / shortsCount) * 100).toFixed(1)) : 0

  const avgGainPerWin = wins > 0 ? Number((totalWinRoi / wins).toFixed(2)) : 0
  const avgLossPerLoss = losses > 0 ? Number((totalLossRoi / losses).toFixed(2)) : 0
  const profitFactor = totalLossRoi > 0 ? Number((totalWinRoi / totalLossRoi).toFixed(2)) : wins > 0 ? 9.99 : 0

  const startDateObj = cutoff > 0 ? new Date(cutoff) : signals.length > 0 ? new Date(signals[signals.length - 1].created_at) : now
  const startDate = formatDateDisplay(startDateObj)
  const endDate = formatDateDisplay(now)

  // Construct formatted text report for Telegram / Discord / Twitter
  const textTrades = trades
    .filter((t) => t.result !== null)
    .slice(0, 10)
    .map((t) => {
      const icon = t.result === "win" ? "✅" : t.result === "loss" ? "❌" : "⚖️"
      const roiSign = t.achievedRoi >= 0 ? "+" : ""
      const outcome =
        t.result === "win"
          ? `TP${t.hitTargets[t.hitTargets.length - 1] || 1} Hit (${roiSign}${t.achievedRoi}% ROI)`
          : t.result === "loss"
          ? `Stop Loss (${roiSign}${t.achievedRoi}% ROI)`
          : "Breakeven (0.00% ROI)"
      return `${icon} ${t.pair} (${t.direction}) ➔ ${outcome}`
    })
    .join("\n")

  const formattedText = `╔════════════════════════════╗
    COINSTAQ INTELLIGENCE
     *PERFORMANCE REPORT*
╚════════════════════════════╝

*TIMEFRAME:* ${timeframeLabels[timeframe]} (${startDate} – ${endDate})
*TOTAL SIGNALS:* ${filtered.length}
*CLOSED TRADES:* ${closedCount} (${wins}W / ${losses}L / ${breakevens}BE)
*WIN RATE:* ${winRate}%

📊 *EXECUTION SUMMARY*
• Net Realized ROI: ${netRoi >= 0 ? "+" : ""}${netRoi.toFixed(2)}% (${leverage}x Leverage)
• Long Win Rate: ${longsWinRate}% (${longsWins}/${longsCount})
• Short Win Rate: ${shortsWinRate}% (${shortsWins}/${shortsCount})
• Avg Win: +${avgGainPerWin}% ROI
• Profit Factor: ${profitFactor > 0 ? profitFactor.toFixed(2) : "N/A"}
${bestTrade ? `• Best Trade: ${bestTrade.pair} (${bestTrade.direction}) +${bestTrade.achievedRoi}% ROI` : ""}

${textTrades ? `🎯 *RECENT CLOSED SETUPS*\n${textTrades}\n` : ""}
*Less Noise. More Edge.*

_CoinStaq Intelligence • Transparent data. Disciplined execution._`

  return {
    timeframe,
    timeframeLabel: timeframeLabels[timeframe],
    startDate,
    endDate,
    totalSignals: filtered.length,
    activeCount,
    closedCount,
    wins,
    losses,
    breakevens,
    winRate,
    netRoi: Number(netRoi.toFixed(2)),
    netRawRoi: Number(netRawRoi.toFixed(2)),
    avgGainPerWin,
    avgLossPerLoss,
    profitFactor,
    longsCount,
    longsWins,
    longsWinRate,
    shortsCount,
    shortsWins,
    shortsWinRate,
    bestTrade,
    trades,
    formattedText,
  }
}
