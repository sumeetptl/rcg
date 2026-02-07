"use client"

import { useRouter } from "next/navigation"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { ArrowUp, ArrowDown } from "lucide-react"
import { MarketData } from "@/lib/types"
import { CryptoLogo } from "@/components/crypto/crypto-logo"

// Mock Data Structure (Fallback)
const MOCK_DATA = [
  {
    asset: "BTC-PERP",
    price: 44250.50,
    change24h: 1.25,
    volume24h: 18500000000,
    funding: 0.0150,
    oiDelta: 5.4,
  },
  {
    asset: "ETH-PERP",
    price: 2350.10,
    change24h: -0.45,
    volume24h: 8500000000,
    funding: 0.0120,
    oiDelta: -1.2,
  },
]

interface LiveMarketTabProps {
  initialData?: MarketData[]
}

export function LiveMarketTab({ initialData = [] }: LiveMarketTabProps) {
  const router = useRouter()
  const hasRealData = initialData.length > 0
  
  // Map or Fallback
  const displayData = hasRealData ? initialData.map(coin => ({
      asset: coin.symbol,
      price: coin.quote.USD.price,
      change24h: coin.quote.USD.percent_change_24h,
      volume24h: coin.quote.USD.volume_24h,
      funding: 0.0100, // API doesn't provide funding, using mock flat rate for now or 0
      oiDelta: 0, // API doesn't provide OI, using 0
  })) : MOCK_DATA

  return (
    <div className="rounded-lg border border-border/40 bg-background/50 overflow-hidden animate-in fade-in-50 duration-500">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/30 hover:bg-muted/30">
            <TableHead className="w-[200px] text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Asset
            </TableHead>
            <TableHead className="text-right text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Price
            </TableHead>
            <TableHead className="text-right text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              24h Change
            </TableHead>
            <TableHead className="text-right text-[10px] font-bold uppercase tracking-widest text-muted-foreground hidden sm:table-cell">
              Volume (24h)
            </TableHead>
            <TableHead className="text-right text-[10px] font-bold uppercase tracking-widest text-muted-foreground hidden md:table-cell">
              Funding
            </TableHead>
            <TableHead className="text-right text-[10px] font-bold uppercase tracking-widest text-muted-foreground hidden md:table-cell">
              OI Delta
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayData.map((row) => (
            <TableRow 
              key={row.asset}
              className="group cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => router.push(`/market-data/asset/${row.asset}`)}
            >
              <TableCell className="font-mono font-bold text-foreground">
                <div className="flex items-center gap-3">
                   <CryptoLogo symbol={row.asset} size={24} />
                   <div className="flex items-center gap-2">
                       {row.asset}
                       {hasRealData && <Badge variant="outline" className="text-[9px] h-4 px-1 border-border/50 text-muted-foreground">SPOT</Badge>}
                   </div>
                </div>
              </TableCell>
              
              <TableCell className="text-right font-mono font-medium">
                ${row.price < 1 ? row.price.toFixed(6) : row.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </TableCell>
              
              <TableCell className="text-right">
                <div className={cn(
                  "flex items-center justify-end gap-1 font-mono font-medium text-xs",
                  row.change24h > 0 ? "text-signal-hit" : "text-signal-missed"
                )}>
                  {row.change24h > 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                  {Math.abs(row.change24h).toFixed(2)}%
                </div>
              </TableCell>
              
              <TableCell className="text-right font-mono text-xs text-muted-foreground hidden sm:table-cell">
                ${(row.volume24h / 1000000).toLocaleString(undefined, { maximumFractionDigits: 1 })}M
              </TableCell>
              
              <TableCell className="text-right hidden md:table-cell">
                <span className={cn(
                    "font-mono text-xs",
                    row.funding > 0.01 ? "text-amber-500 font-bold" : "text-muted-foreground"
                )}>
                    {(row.funding * 100).toFixed(4)}%
                </span>
              </TableCell>
              
              <TableCell className="text-right hidden md:table-cell">
                 <span className={cn(
                    "font-mono text-xs",
                     row.oiDelta > 5 ? "text-blue-500 font-bold" : "text-muted-foreground"
                 )}>
                    {row.oiDelta > 0 ? "+" : ""}{row.oiDelta}%
                 </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
