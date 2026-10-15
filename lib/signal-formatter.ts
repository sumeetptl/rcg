/**
 * Signal Formatter Utility
 * Formats trading signals into the official CoinStaq text template
 * for sharing on Telegram, Discord, Twitter, and VIP channels.
 */

export interface SignalDataForFormatting {
  asset?: string | null
  direction?: "LONG" | "SHORT" | string | null
  entry_price?: number | string | null
  stop_loss?: number | string | null
  target_1?: number | string | null
  target_2?: number | string | null
  target_3?: number | string | null
  timeframe?: string | null
  leverage?: number | string | null
}

export function formatSignalPrice(price?: number | string | null): string {
  if (price === undefined || price === null || price === "") return "____"
  const num = typeof price === "string" ? parseFloat(price) : price
  if (isNaN(num)) return "____"
  if (num < 1) {
    return num.toLocaleString("en-US", { maximumFractionDigits: 6 })
  }
  return num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export function formatPair(asset?: string | null): string {
  if (!asset || !asset.trim()) return "BTC/USDT"
  const clean = asset.trim().toUpperCase()
  if (clean.includes("/")) return clean
  if (clean.includes("-")) return clean.replace("-", "/")
  if (clean.endsWith("USDT") && clean.length > 4) {
    return `${clean.slice(0, -4)}/USDT`
  }
  return `${clean}/USDT`
}

export function formatTradeType(timeframe?: string | null): "Swing" | "Scalp" {
  if (!timeframe) return "Swing"
  const tf = timeframe.trim().toUpperCase()
  if (
    tf.includes("SCALP") ||
    tf === "1M" ||
    tf === "3M" ||
    tf === "5M" ||
    tf === "15M" ||
    tf === "30M" ||
    tf === "1H" ||
    tf === "45M"
  ) {
    return "Scalp"
  }
  return "Swing"
}

export function calculateRoi(
  entryPrice?: number | string | null,
  targetPrice?: number | string | null,
  direction: string = "LONG",
  leverage: number = 10
): string {
  if (!entryPrice || !targetPrice) return "____% ROI"
  const entry = typeof entryPrice === "string" ? parseFloat(entryPrice) : entryPrice
  const target = typeof targetPrice === "string" ? parseFloat(targetPrice) : targetPrice
  if (isNaN(entry) || isNaN(target) || entry <= 0) return "____% ROI"

  const isLong = direction.toUpperCase() === "LONG"
  const priceMoveRatio = isLong ? (target - entry) / entry : (entry - target) / entry
  const leveragedRoi = priceMoveRatio * leverage * 100

  const sign = leveragedRoi >= 0 ? "+" : ""
  return `${sign}${leveragedRoi.toFixed(2)}% ROI`
}

export function calculateStopLossRoi(
  entryPrice?: number | string | null,
  stopLossPrice?: number | string | null,
  direction: string = "LONG",
  leverage: number = 10
): string {
  if (!entryPrice || !stopLossPrice) return "____% ROI"
  const entry = typeof entryPrice === "string" ? parseFloat(entryPrice) : entryPrice
  const stop = typeof stopLossPrice === "string" ? parseFloat(stopLossPrice) : stopLossPrice
  if (isNaN(entry) || isNaN(stop) || entry <= 0) return "____% ROI"

  const isLong = direction.toUpperCase() === "LONG"
  const priceMoveRatio = isLong ? (stop - entry) / entry : (entry - stop) / entry
  const leveragedRoi = priceMoveRatio * leverage * 100

  const sign = leveragedRoi >= 0 ? "+" : ""
  return `${sign}${leveragedRoi.toFixed(2)}% ROI`
}

/**
 * Generates the formatted CoinStaq trade signal text
 */
export function formatSignalToText(
  signal: SignalDataForFormatting,
  options?: {
    leverage?: number
  }
): string {
  const leverage = options?.leverage ?? (signal.leverage ? Number(signal.leverage) : 10)
  const pair = formatPair(signal.asset)
  const type = formatTradeType(signal.timeframe)
  const direction = (signal.direction || "LONG").toUpperCase()

  const entryStr = formatSignalPrice(signal.entry_price)
  const tp1Str = formatSignalPrice(signal.target_1)
  const tp2Str = formatSignalPrice(signal.target_2)
  const tp3Str = formatSignalPrice(signal.target_3)
  const slStr = formatSignalPrice(signal.stop_loss)

  const tp1Roi = calculateRoi(signal.entry_price, signal.target_1, direction, leverage)
  const tp2Roi = calculateRoi(signal.entry_price, signal.target_2, direction, leverage)
  const tp3Roi = calculateRoi(signal.entry_price, signal.target_3, direction, leverage)
  const slRoi = calculateStopLossRoi(signal.entry_price, signal.stop_loss, direction, leverage)

  return `╔════════════════════════════╗
           COINSTAQ
       *TRADE SIGNAL*
╚════════════════════════════╝

*PAIR:* ${pair}
*TYPE:* ${type}
*DIRECTION:* ${direction}
*LEVERAGE:* ${leverage}x

*ENTRY:* $${entryStr}

🎯 *TARGETS*
TP1: $${tp1Str} (${tp1Roi})
TP2: $${tp2Str} (${tp2Roi})
TP3: $${tp3Str} (${tp3Roi})

🛑 *STOP LOSS:* $${slStr} (${slRoi})

*Less Noise. More Edge.*

_Not financial advice. Manage your risk._`
}
