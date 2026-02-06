"use client"

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

// Mock Data Structure
const MARKET_DATA = [
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
  {
    asset: "SOL-PERP",
    price: 98.45,
    change24h: 5.60,
    volume24h: 3200000000,
    funding: -0.0050,
    oiDelta: 12.5,
  },
  {
    asset: "ARB-PERP",
    price: 1.85,
    change24h: -2.30,
    volume24h: 450000000,
    funding: 0.0100,
    oiDelta: -3.5,
  },
  {
    asset: "TIA-PERP",
    price: 16.20,
    change24h: 8.40,
    volume24h: 210000000,
    funding: 0.0250,
    oiDelta: 15.2,
  },
]

export function LiveMarketTab() {
  return (
    <div className="rounded-lg border border-border bg-background overflow-hidden animate-in fade-in-50 duration-500">
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
          {MARKET_DATA.map((row) => (
            <TableRow 
              key={row.asset}
              className="group cursor-pointer hover:bg-muted/50 transition-colors"
            >
              <TableCell className="font-mono font-bold text-foreground">
                <div className="flex items-center gap-2">
                   {/* Placeholder for Logo if needed */}
                   {row.asset}
                </div>
              </TableCell>
              
              <TableCell className="text-right font-mono font-medium">
                ${row.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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
