export type ImpactLevel = "low" | "medium" | "high"

export interface EconomicEvent {
  id: string
  title: string
  country: string
  currency: string
  time: string // ISO string or just time string depending on usage, let's use ISO for sorting
  impact: ImpactLevel
  previous?: string
  forecast?: string
  actual?: string
  description: string
  impactedAssets: string[]
}

export type CalendarFilterState = {
  impact: ImpactLevel[]
  currency: string[]
}
