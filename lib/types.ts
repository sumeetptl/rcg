export type AccessLevel = 'public' | 'free' | 'premium'
export type UserRole = 'user' | 'admin'
export type SubscriptionPlan = 'free' | 'premium'
export type SignalStatus = 'active' | 'closed' | 'pending' | 'draft' | 'cancelled'
export type SignalResult = 'win' | 'loss' | 'breakeven'

export interface Profile {
  id: string
  first_name: string | null
  last_name: string | null
  username: string | null
  avatar_url: string | null
  bio: string | null
  website: string | null
  role: UserRole
  plan: SubscriptionPlan
  is_admin: boolean
  created_at: string
}

export interface News {
  id: string
  title: string
  slug: string
  content: string | null
  summary: string | null
  category: string | null
  source: string | null
  source_url: string | null
  thumbnail: string | null
  is_premium: boolean
  access_level: AccessLevel
  status: string
  published_at: string | null
  created_at: string
}

export interface Blog {
  id: string
  title: string
  slug: string
  content: string | null
  excerpt: string | null
  author_id: string | null
  cover_image: string | null
  tags: string[] | null
  is_premium: boolean
  access_level: AccessLevel
  status: string
  published_at: string | null
  created_at: string
}

export interface Signal {
  id: string
  title: string
  asset: string
  direction: 'LONG' | 'SHORT'
  entry_price: number | null
  stop_loss: number | null
  target_1: number | null
  target_2: number | null
  target_3: number | null
  timeframe: string | null
  confidence: string | null
  status: SignalStatus
  access_level: AccessLevel
  result: SignalResult | null
  result_note: string | null
  context: string | null
  created_by: string | null
  created_at: string
}

export interface MarketData {
  id: number
  name: string
  symbol: string
  slug: string
  num_market_pairs: number
  date_added: string
  tags: string[]
  max_supply: number | null
  circulating_supply: number
  total_supply: number
  mined_supply?: number
  platform: any | null
  cmc_rank: number
  last_updated: string
  quote: {
    USD: {
      price: number
      volume_24h: number
      volume_change_24h: number
      percent_change_1h: number
      percent_change_24h: number
      percent_change_7d: number
      percent_change_30d: number
      percent_change_60d: number
      percent_change_90d: number
      market_cap: number
      market_cap_dominance: number
      fully_diluted_market_cap: number
      last_updated: string
    }
  }
}
