import { AssetHeader } from "@/components/market-data/asset-header"
import { TradingViewChart } from "@/components/market-data/tradingview-chart"
import { ContextTabs } from "@/components/market-data/context-tabs"
import { getLatestMarketData } from "@/lib/api/coinmarketcap"

interface AssetPageProps {
  params: Promise<{ symbol: string }>
}

export default async function AssetPage({ params }: AssetPageProps) {
  const { symbol } = await params
  
  // Fetch data to populate the header
  // Optimization: In a real app we'd have a getQuote(symbol) API. 
  // For now, we fetch the list and find the item to avoid API limits/complexity
  const marketDataList = await getLatestMarketData(100) // Fetch top 100 to increase chance of finding it
  const assetData = marketDataList.find(c => c.symbol === symbol)

  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col mx-auto max-w-7xl lg:border-x lg:border-border/40 lg:min-h-screen">
        <AssetHeader 
          symbol={symbol} 
          price={assetData?.quote.USD.price} 
          change24h={assetData?.quote.USD.percent_change_24h}
        />
        
        <main className="flex-1 w-full px-4 py-8 sm:px-6 lg:px-8 space-y-6">
            {/* Top Section: Chart */}
            <section className="h-[80vh] lg:h-[75vh] min-h-[500px]">
               <TradingViewChart symbol={symbol} />
            </section>

            {/* Bottom Section: Context */}
            <section className="pb-8">
               <ContextTabs symbol={symbol} />
            </section>
        </main>
      </div>
    </div>
  )
}
