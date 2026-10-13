/**
 * Market Briefing Agent
 * Generates institutional Academy-tone market intelligence briefs
 * from derivatives data (OI, funding, liquidations, long/short ratios).
 * Compatible with Tiptap editor and the existing Supabase blogs schema.
 */

import { GoogleGenAI } from '@google/genai'
import { MarketBriefingDataset } from './market-briefing-data'

export interface GeneratedBriefingDraft {
  title: string
  slug: string
  excerpt: string
  content: string // HTML format directly accepted by Tiptap
  tags: string[]
  access_level: 'public' | 'free' | 'premium'
  status: 'draft'
  metrics: MarketBriefingDataset
  provider: 'gemini' | 'analytical-engine'
}

function formatUSD(num: number): string {
  if (Math.abs(num) >= 1e9) return `$${(num / 1e9).toFixed(2)}B`
  if (Math.abs(num) >= 1e6) return `$${(num / 1e6).toFixed(2)}M`
  if (Math.abs(num) >= 1e3) return `$${(num / 1e3).toFixed(1)}K`
  return `$${num.toLocaleString()}`
}

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

/**
 * High-precision quantitative Academy-tone engine
 * Generates structured, institutional content directly from live derivatives metrics.
 */
function generateDeterministicAcademyBrief(dataset: MarketBriefingDataset): GeneratedBriefingDraft {
  const { assets, aggregated, timeframe, periodLabel } = dataset
  const dateStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

  const isWeekly = timeframe === 'weekly'
  const prefix = isWeekly ? 'Weekly Derivatives Brief' : 'Daily Market Pulse'

  let titleTheme = `${prefix}: ${aggregated.overallRegime}`
  if (aggregated.dominantLiquidatedSide === 'LONGS') {
    titleTheme = `${prefix}: Leverage Flushout Clears Liquidity as Funding Normalizes`
  } else if (aggregated.dominantLiquidatedSide === 'SHORTS') {
    titleTheme = `${prefix}: Short Squeeze Propels Price into Major Liquidity Pockets`
  } else {
    titleTheme = `${prefix}: Neutral Consolidation and Order Book Stabilization`
  }

  const title = `${titleTheme} (${dateStr})`
  const slug = generateSlug(`${prefix.toLowerCase()}-${dateStr}-${aggregated.dominantLiquidatedSide.toLowerCase()}`)

  const excerpt = `Institutional analysis of derivatives structure for ${dateStr}. Cumulative liquidations reached ${formatUSD(aggregated.totalLiquidationsUSD)}, with total open interest settling at ${formatUSD(aggregated.totalMarketOIUSD)}. Market regime: ${aggregated.overallRegime}.`

  // Build clean Tiptap-compatible HTML
  const content = `
<h2>Executive Summary</h2>
<p>Over the preceding ${isWeekly ? 'seven trading days' : 'twenty-four hours'}, digital asset derivatives markets experienced <strong>${aggregated.overallRegime.toLowerCase()}</strong>. Cumulative liquidations across tracked perpetual contracts totaled <strong>${formatUSD(aggregated.totalLiquidationsUSD)}</strong>, dominated by <strong>${aggregated.dominantLiquidatedSide}</strong>.</p>
<blockquote>${aggregated.keySummary}</blockquote>
<p>Total open interest across Bitcoin, Ethereum, and Solana stands at <strong>${formatUSD(aggregated.totalMarketOIUSD)}</strong>, reflecting a weighted average funding rate of <strong>${(aggregated.avgFundingRate).toFixed(4)}%</strong> per 8-hour epoch (${(aggregated.avgFundingRate * 3 * 365).toFixed(2)}% annualized). Institutional participants should focus on key liquidation clusters and avoid chasing overleveraged momentum into unresolved order-book imbalances.</p>

<hr />

<h2>Derivatives Telemetry Matrix</h2>
<p>The following table synthesizes core open interest, funding rate, liquidation volume, and account positioning across prime perpetual contracts:</p>

<table>
  <thead>
    <tr>
      <th>Asset</th>
      <th>Mark Price</th>
      <th>24h Chg</th>
      <th>Open Interest</th>
      <th>OI Chg</th>
      <th>8h Funding</th>
      <th>Long Liqs</th>
      <th>Short Liqs</th>
      <th>L/S Ratio</th>
      <th>Regime</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>BTC</strong></td>
      <td>$${assets.BTC.price.toLocaleString()}</td>
      <td>${assets.BTC.priceChangePercent >= 0 ? '+' : ''}${assets.BTC.priceChangePercent}%</td>
      <td>${formatUSD(assets.BTC.openInterestUSD)}</td>
      <td>${assets.BTC.openInterestChangePercent >= 0 ? '+' : ''}${assets.BTC.openInterestChangePercent}%</td>
      <td>${assets.BTC.fundingRate.toFixed(4)}%</td>
      <td>${formatUSD(assets.BTC.liquidationsLongUSD)}</td>
      <td>${formatUSD(assets.BTC.liquidationsShortUSD)}</td>
      <td>${assets.BTC.longShortRatio}</td>
      <td>${assets.BTC.marketRegime}</td>
    </tr>
    <tr>
      <td><strong>ETH</strong></td>
      <td>$${assets.ETH.price.toLocaleString()}</td>
      <td>${assets.ETH.priceChangePercent >= 0 ? '+' : ''}${assets.ETH.priceChangePercent}%</td>
      <td>${formatUSD(assets.ETH.openInterestUSD)}</td>
      <td>${assets.ETH.openInterestChangePercent >= 0 ? '+' : ''}${assets.ETH.openInterestChangePercent}%</td>
      <td>${assets.ETH.fundingRate.toFixed(4)}%</td>
      <td>${formatUSD(assets.ETH.liquidationsLongUSD)}</td>
      <td>${formatUSD(assets.ETH.liquidationsShortUSD)}</td>
      <td>${assets.ETH.longShortRatio}</td>
      <td>${assets.ETH.marketRegime}</td>
    </tr>
    <tr>
      <td><strong>SOL</strong></td>
      <td>$${assets.SOL.price.toLocaleString()}</td>
      <td>${assets.SOL.priceChangePercent >= 0 ? '+' : ''}${assets.SOL.priceChangePercent}%</td>
      <td>${formatUSD(assets.SOL.openInterestUSD)}</td>
      <td>${assets.SOL.openInterestChangePercent >= 0 ? '+' : ''}${assets.SOL.openInterestChangePercent}%</td>
      <td>${assets.SOL.fundingRate.toFixed(4)}%</td>
      <td>${formatUSD(assets.SOL.liquidationsLongUSD)}</td>
      <td>${formatUSD(assets.SOL.liquidationsShortUSD)}</td>
      <td>${assets.SOL.longShortRatio}</td>
      <td>${assets.SOL.marketRegime}</td>
    </tr>
  </tbody>
</table>

<hr />

<h2>Open Interest & Leverage Distribution</h2>
<p><strong>Bitcoin (BTC):</strong> Open interest currently registers at <strong>${assets.BTC.openInterestNative.toLocaleString()} BTC</strong> (${formatUSD(assets.BTC.openInterestUSD)}), reflecting a ${assets.BTC.openInterestChangePercent >= 0 ? 'net expansion' : 'deleveraging contraction'} of <strong>${assets.BTC.openInterestChangePercent}%</strong> over the period. ${assets.BTC.openInterestChangePercent < 0 ? 'A contraction in open interest alongside spot resilience typically indicates healthy spot absorption following margin liquidations.' : 'Expansion in open interest at current resistance levels indicates aggressive speculative positioning.'}</p>
<p><strong>Ethereum & Solana:</strong> Altcoin perpetual open interest displays a similar posture. ETH open interest stands at <strong>${formatUSD(assets.ETH.openInterestUSD)}</strong>, while SOL open interest holds at <strong>${formatUSD(assets.SOL.openInterestUSD)}</strong>. Funding rates across alts remain at <strong>${assets.ETH.fundingRate}%</strong> and <strong>${assets.SOL.fundingRate}%</strong> respectively, indicating disciplined cost-of-carry conditions without retail euphoria.</p>

<hr />

<h2>Liquidation Cascade Dynamics</h2>
<p>Total liquidated volume reached <strong>${formatUSD(aggregated.totalLiquidationsUSD)}</strong>. The breakdown demonstrates clear directional asymmetry:</p>
<ul>
  <li><strong>Long Liquidations:</strong> ${formatUSD(aggregated.totalLongLiqsUSD)} (${((aggregated.totalLongLiqsUSD / (aggregated.totalLiquidationsUSD || 1)) * 100).toFixed(1)}% of total volume)</li>
  <li><strong>Short Liquidations:</strong> ${formatUSD(aggregated.totalShortLiqsUSD)} (${((aggregated.totalShortLiqsUSD / (aggregated.totalLiquidationsUSD || 1)) * 100).toFixed(1)}% of total volume)</li>
</ul>
<p>${aggregated.dominantLiquidatedSide === 'LONGS' ? 'Cascading long stops provided liquidity for limit buyers at structural swing lows. When perpetual open interest sheds speculative weight while spot CVD (Cumulative Volume Delta) stabilizes, it creates favorable risk-reward setups for systematic accumulation.' : aggregated.dominantLiquidatedSide === 'SHORTS' ? 'Aggressive short positioning encountered spot liquidity sweeps, triggering forced market buys that accelerated price through structural overhead resistance.' : 'Both sides of the book were tested symmetrically, pointing toward range-bound mean reversion tactics.'}</p>

<hr />

<h2>Tactical Playbook & Key Invalidation Triggers</h2>
<ol>
  <li><strong>Leverage Discipline:</strong> In environments with ${aggregated.overallRegime.toLowerCase()}, margin traders should keep effective account leverage under 3x to prevent stop-hunting volatility from triggering liquidation.</li>
  <li><strong>Funding Arbitrage & Premium Watch:</strong> Track the 8-hour funding rate. If annualized rates drift beyond +25%, look for exhaustion signals or long de-risking opportunities.</li>
  <li><strong>Critical Invalidation:</strong> Treat local high-density liquidation clusters as magnets for wick tests rather than breakout confirmation. Wait for candle close confirmation and delta volume confirmation before initiating directional exposure.</li>
</ol>

<blockquote><strong>CoinStaq Academy Risk Disclaimer:</strong> This briefing is prepared for technical and institutional participants to evaluate derivatives mechanics and order-book liquidity. It does not constitute financial advice. Always execute with predetermined stops and strict position sizing.</blockquote>
`

  return {
    title,
    slug,
    excerpt,
    content: content.trim(),
    tags: ['Analysis', 'Market Update', 'Derivatives'],
    access_level: 'public',
    status: 'draft',
    metrics: dataset,
    provider: 'analytical-engine',
  }
}

/**
 * Generate Briefing using Gemini AI with fallback to the deterministic Academy engine
 */
export async function generateMarketBriefing(
  dataset: MarketBriefingDataset,
  options?: {
    apiKey?: string
    focusAsset?: string
  }
): Promise<GeneratedBriefingDraft> {
  const geminiApiKey = options?.apiKey || process.env.GEMINI_API_KEY

  if (!geminiApiKey) {
    console.info('No GEMINI_API_KEY provided; generating brief using CoinStaq Analytical Engine.')
    return generateDeterministicAcademyBrief(dataset)
  }

  try {
    const ai = new GoogleGenAI({ apiKey: geminiApiKey })
    const isWeekly = dataset.timeframe === 'weekly'

    const prompt = `
You are the Chief Quantitative Analyst at CoinStaq Academy, writing a ${isWeekly ? 'Weekly Derivatives Brief' : 'Daily Market Pulse'}.
Your brand voice is: Institutional-grade, disciplined, mathematical, objective, zero hype, capital-preservation first.
Motto: "Less noise, more edge. Trade with Precision. Manage Risk with Discipline."
Never use retail slang (like "to the moon", "pump", "dump", "hodl"). Focus on leverage, cost of carry, order-book liquidity, liquidation cascades, and positioning.

Here is the real-time derivatives market telemetry:
${JSON.stringify(dataset, null, 2)}

Requirements:
1. Return your response in STRICT valid JSON format with NO markdown code backticks around it (or standard markdown JSON code fence).
2. The JSON must match this structure:
{
  "title": "A compelling, authoritative Academy headline (e.g. Weekly Brief: Leverage Flushout Clears Path as OI Resets (Date))",
  "slug": "url-friendly-slug",
  "excerpt": "A concise 2-sentence institutional summary of the findings",
  "content": "A complete, beautifully formatted HTML string that works seamlessly inside Tiptap editor"
}
3. The "content" HTML must include:
  - <h2>Executive Summary</h2> with <p> and a <blockquote> key institutional takeaway
  - <h2>Derivatives Telemetry Matrix</h2> with a clean <table> comparing BTC, ETH, and SOL (Price, OI, OI Change, Funding 8h, Long Liqs, Short Liqs, L/S Ratio, Regime)
  - <h2>Open Interest & Leverage Distribution</h2> breakdown
  - <h2>Liquidation Cascade Dynamics</h2> with <ul> metrics comparing Longs vs Shorts
  - <h2>Tactical Playbook & Key Invalidation Triggers</h2> with <ol> actionable institutional guidelines
  - <blockquote><strong>CoinStaq Academy Risk Disclaimer:</strong> ...</blockquote>
4. Access level is public, tags are ["Analysis", "Market Update", "Derivatives"].
`

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.3,
        responseMimeType: 'application/json',
      },
    })

    const rawText = response.text || ''
    const cleanJson = rawText.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim()
    const parsed = JSON.parse(cleanJson)

    if (parsed.title && parsed.content) {
      return {
        title: parsed.title,
        slug: parsed.slug || generateSlug(parsed.title),
        excerpt: parsed.excerpt || `Derivatives market briefing for ${dataset.periodLabel}.`,
        content: parsed.content,
        tags: ['Analysis', 'Market Update', 'Derivatives'],
        access_level: 'public',
        status: 'draft',
        metrics: dataset,
        provider: 'gemini',
      }
    }
  } catch (err) {
    console.error('Gemini Briefing generation error, falling back to Analytical Engine:', err)
  }

  // Fallback to high-grade deterministic Academy engine
  return generateDeterministicAcademyBrief(dataset)
}
