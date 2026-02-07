"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

export function MarketDataHeader() {
  return (
    <div className="flex flex-col gap-6 py-8">
      <div className="flex w-full flex-col justify-between gap-6 md:flex-row md:items-start">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="font-serif text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
              Market Data
            </h1>
            <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-widest border-primary/20 text-primary">
              Live
            </Badge>
          </div>
          <p className="max-w-2xl text-base text-muted-foreground font-medium">
            Real-time derivatives and flow data. Context over noise.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 hidden sm:block">
              Asset
            </span>
            <Select defaultValue="btc">
              <SelectTrigger className="w-[120px] h-9 text-xs font-bold uppercase tracking-wider">
                <SelectValue placeholder="Asset" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="btc">BTC</SelectItem>
                <SelectItem value="eth">ETH</SelectItem>
                <SelectItem value="sol">SOL</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 hidden sm:block">
              Timeframe
            </span>
            <Select defaultValue="4h">
              <SelectTrigger className="w-[100px] h-9 text-xs font-bold uppercase tracking-wider">
                <SelectValue placeholder="Timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1h">1H</SelectItem>
                <SelectItem value="4h">4H</SelectItem>
                <SelectItem value="24h">24H</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  )
}
