import { EconomicEvent } from "./types"

const TODAY = new Date().toISOString().split("T")[0] // YYYY-MM-DD

export const MOCK_EVENTS: Record<string, EconomicEvent[]> = {
  [TODAY]: [
    {
      id: "ev-1",
      time: `${TODAY}T08:30:00Z`,
      title: "Core CPI (YoY)",
      country: "United States",
      currency: "USD",
      impact: "high",
      previous: "3.9%",
      forecast: "3.7%",
      actual: "3.8%",
      description: "Consumer Price Index (CPI) measures the change in the price of goods and services. A higher than expected reading should be taken as positive/bullish for the USD, but negative for risk assets like BTC.",
      impactedAssets: ["BTC", "ETH", "DXY", "SPX"]
    },
    {
      id: "ev-2",
      time: `${TODAY}T08:30:00Z`,
      title: "CPI (MoM)",
      country: "United States",
      currency: "USD",
      impact: "high",
      previous: "0.3%",
      forecast: "0.2%",
      actual: "0.3%",
      description: "Month-over-month inflation data. Persistent high monthly readings indicate sticky inflation.",
      impactedAssets: ["DXY", "BTC"]
    },
    {
      id: "ev-3",
      time: `${TODAY}T14:00:00Z`,
      title: "FOMC Meeting Minutes",
      country: "United States",
      currency: "USD",
      impact: "high",
      previous: "",
      forecast: "",
      actual: "",
      description: "Detailed record of the FOMC's most recent meeting, providing in-depth insights into the economic and financial conditions that influenced their vote on interest rates.",
      impactedAssets: ["BTC", "ETH", "SOL", "Total Market"]
    }
  ],
  "Tomorrow": [
    {
      id: "ev-4",
      time: "2024-02-15T08:30:00Z",
      title: "Initial Jobless Claims",
      country: "United States",
      currency: "USD",
      impact: "medium",
      previous: "218K",
      forecast: "220K",
      description: "Measures the number of individuals who filed for unemployment insurance for the first time during the past week.",
      impactedAssets: ["DXY", "GOLD"]
    },
    {
      id: "ev-5",
      time: "2024-02-15T13:15:00Z",
      title: "ECB President Lagarde Speaks",
      country: "Euro Zone",
      currency: "EUR",
      impact: "medium",
      previous: "",
      forecast: "",
      description: "Speech may contain clues regarding future monetary policy and interest rate shifts in the Eurozone.",
      impactedAssets: ["EUR", "DXY"]
    }
  ]
}
