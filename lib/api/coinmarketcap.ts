import { MarketData } from '@/lib/types'

const CMC_API_KEY = process.env.CMC_PRO_API_KEY
const BASE_URL = 'https://pro-api.coinmarketcap.com/v1'

export async function getLatestMarketData(limit = 20): Promise<MarketData[]> {
  // If no key, return empty array to prevent crashing (UI should handle empty state)
  if (!CMC_API_KEY) {
    console.warn('CMC_PRO_API_KEY is not set')
    // Return mock data or empty? strict empty for now to signal "configure me"
    return []
  }

  try {
    const res = await fetch(
      `${BASE_URL}/cryptocurrency/listings/latest?limit=${limit}&sort=market_cap&convert=USD`, 
      {
        headers: {
          'X-CMC_PRO_API_KEY': CMC_API_KEY,
          'Accept': 'application/json',
        },
        next: { revalidate: 60 }, // Cache for 1 minute
      }
    )

    if (!res.ok) {
      const errorBody = await res.text()
      console.error('CMC API Error Response:', errorBody)
      throw new Error(`CMC API Error: ${res.status} ${res.statusText}`)
    }

    const json = await res.json()
    return json.data as MarketData[]
  } catch (error) {
    console.error('Failed to fetch market data:', error)
    return []
  }
}
