import { Signal } from "@/lib/types"

export interface SignalAnalytics {
  riskPercent: string
  maxRR: string
  rrRatio: number | null
  targets: {
    price: number
    label: string
    movePercent: string
    rr: string
  }[]
  isLong: boolean
  directionColor: string
  directionBg: string
  directionBorder: string
}

export function analyzeSignal(signal: Signal): SignalAnalytics {
  const entry = signal.entry_price || 0
  const stop = signal.stop_loss || 0
  
  // Direction Logic
  const isLong = signal.direction.toUpperCase() === "LONG"
  const directionColor = isLong 
    ? "text-emerald-600 dark:text-emerald-500" 
    : "text-rose-600 dark:text-rose-500"
  const directionBg = isLong 
    ? "bg-emerald-500/10" 
    : "bg-rose-500/10"
  const directionBorder = isLong 
    ? "border-emerald-500/20" 
    : "border-rose-500/20"

  // Mathematical Calculations
  let riskPercent = "N/A"
  let maxRR = "N/A"
  let rrRatio: number | null = null
  const targets = []

  // Basic Stats
  if (entry && stop) {
    const riskDiff = Math.abs(entry - stop)
    
    // Risk %
    if (entry > 0) {
        const risk = (riskDiff / entry) * 100
        riskPercent = risk.toFixed(2) + "%"
    }

    // Process Targets
    const rawTargets = [
      { p: signal.target_1, l: "TP 1" },
      { p: signal.target_2, l: "TP 2" },
      { p: signal.target_3, l: "TP 3" }
    ]

    let bestReward = 0

    for (const t of rawTargets) {
      if (t.p) {
        const reward = Math.abs(t.p - entry)
        const moveRaw = (reward / entry) * 100
        const ratio = riskDiff > 0 ? reward / riskDiff : 0
        
        if (ratio > bestReward) bestReward = ratio

        targets.push({
          price: t.p,
          label: t.l,
          movePercent: moveRaw.toFixed(2) + "%",
          rr: `1:${ratio.toFixed(1)}`
        })
      }
    }

    if (bestReward > 0) {
      maxRR = `1:${bestReward.toFixed(1)}`
      rrRatio = bestReward
    }
  }

  return {
    riskPercent,
    maxRR,
    rrRatio,
    targets,
    isLong,
    directionColor,
    directionBg,
    directionBorder
  }
}

export const formatPrice = (price: number | null | undefined) => {
  if (price === undefined || price === null) return "—"
  if (price === 0) return "Market"
  return price < 1 
    ? price.toFixed(6) 
    : price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
