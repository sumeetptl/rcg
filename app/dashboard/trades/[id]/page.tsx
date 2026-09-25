import React from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, BrainCircuit, Calendar, Clock, Edit, TrendingUp, TrendingDown, Target, Info, Sparkles, Image as ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

// High-fidelity mock data since DB schema is not applied yet
const MOCK_TRADE = {
  id: "trade-12345",
  pair: "BTC/USDT",
  direction: "LONG",
  market: "crypto",
  exchange: "Binance",
  account: "Main Margin",
  source: "Personal Analysis",
  strategy: "Mean Reversion",
  status: "closed",
  
  // Execution
  entry_price: 64500.00,
  exit_price: 66200.00,
  leverage: "10x",
  
  // Risk & Metrics
  stop_loss: 63800.00,
  take_profit: 66500.00,
  position_size: "0.5 BTC",
  risk_percentage: 1.2,
  fees: 15.50,
  funding: -4.20,
  rr: 2.4,
  pnl: 850.00,
  
  // Review
  emotion: "calm",
  mistake: "early_exit",
  notes: "The setup was clean on the 4H timeframe. Price swept the local lows and reclaimed the POC. I entered on the retest. Exited slightly earlier than my Take Profit because the momentum started fading on lower timeframes and I didn't want to hold through the weekend. Overall good execution.",
  
  // Timeline
  created_at: "2024-03-10T14:30:00Z",
  updated_at: "2024-03-12T09:15:00Z"
}

export default function TradeDetailsPage({ params }: { params: { id: string } }) {
  // Simulating fetch using params.id
  const trade = MOCK_TRADE

  if (!trade) {
    notFound()
  }

  const isWin = trade.pnl > 0
  const isLoss = trade.pnl < 0

  return (
    <div className="mx-auto max-w-6xl p-6 lg:p-8 space-y-8">
      {/* 1. Page Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-3">
          <Link 
            href="/dashboard/trades" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Trades
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="font-serif text-3xl font-semibold tracking-tight">{trade.pair}</h1>
            <Badge 
              variant="outline" 
              className={cn(
                "uppercase tracking-widest font-bold",
                trade.direction === "LONG" ? "text-emerald-500 border-emerald-500/20 bg-emerald-500/10" : "text-rose-500 border-rose-500/20 bg-rose-500/10"
              )}
            >
              {trade.direction}
            </Badge>
            <Badge variant="outline" className="uppercase tracking-widest bg-muted/50">
              {trade.status}
            </Badge>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" asChild>
            <Link href={`/dashboard/trades/${params.id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Trade
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* LEFT COLUMN: Core Details */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Trade Summary & Execution Grid */}
          <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
            <div className="bg-muted/40 px-6 py-4 border-b border-border flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <Target className="h-4 w-4" /> Execution Summary
              </h2>
              <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded">
                {trade.strategy}
              </span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border/60">
              {/* Entry */}
              <div className="bg-card p-6 flex flex-col gap-1">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Entry Price</span>
                <span className="font-mono text-xl">${trade.entry_price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
              {/* Exit */}
              <div className="bg-card p-6 flex flex-col gap-1">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Exit Price</span>
                <span className="font-mono text-xl">${trade.exit_price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
              {/* Stop Loss */}
              <div className="bg-card p-6 flex flex-col gap-1">
                <span className="text-[10px] uppercase tracking-widest text-rose-500/80 font-bold">Stop Loss</span>
                <span className="font-mono text-xl text-rose-500/90">${trade.stop_loss.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
              {/* Take Profit */}
              <div className="bg-card p-6 flex flex-col gap-1">
                <span className="text-[10px] uppercase tracking-widest text-emerald-500/80 font-bold">Take Profit</span>
                <span className="font-mono text-xl text-emerald-500/90">${trade.take_profit.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
              
              {/* Size */}
              <div className="bg-card p-6 flex flex-col gap-1">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Position Size</span>
                <span className="font-mono text-lg">{trade.position_size}</span>
              </div>
              {/* Leverage */}
              <div className="bg-card p-6 flex flex-col gap-1">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Leverage</span>
                <span className="font-mono text-lg">{trade.leverage}</span>
              </div>
              {/* Risk */}
              <div className="bg-card p-6 flex flex-col gap-1">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Risk %</span>
                <span className="font-mono text-lg">{trade.risk_percentage}%</span>
              </div>
              {/* RR */}
              <div className="bg-card p-6 flex flex-col gap-1">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Actual R:R</span>
                <span className="font-mono text-lg font-semibold">{trade.rr}R</span>
              </div>
            </div>
          </div>

          {/* Journal Notes & Mistakes */}
          <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm p-6 sm:p-8 space-y-6">
            <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2 pb-2 border-b border-border/50">
               Journal & Analysis
            </h2>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-muted/40 px-3 py-1.5 rounded-md border border-border/50">
                <span className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Emotion:</span>
                <span className="text-sm capitalize font-medium">{trade.emotion}</span>
              </div>
              <div className="flex items-center gap-2 bg-rose-500/5 px-3 py-1.5 rounded-md border border-rose-500/20">
                <span className="text-xs text-rose-500/80 uppercase tracking-widest font-bold">Mistake:</span>
                <span className="text-sm text-rose-600 dark:text-rose-400 capitalize font-medium">{trade.mistake.replace('_', ' ')}</span>
              </div>
            </div>

            <div className="prose prose-neutral dark:prose-invert max-w-none text-foreground/90 leading-relaxed">
              <p>{trade.notes}</p>
            </div>
          </div>
          
          {/* Screenshots Gallery Placeholder */}
          <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-border/50 pb-2">
              <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                 <ImageIcon className="h-4 w-4" /> Screenshots
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {/* Placeholder for an image */}
               <div className="aspect-video bg-muted/40 border border-dashed border-border rounded-lg flex flex-col items-center justify-center text-muted-foreground">
                  <ImageIcon className="h-8 w-8 mb-2 opacity-50" />
                  <span className="text-xs uppercase tracking-widest font-bold opacity-75">No chart uploaded</span>
               </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Sidebar Stats & AI */}
        <div className="space-y-6">
          
          {/* AI Review Placeholder */}
          <div className="relative overflow-hidden rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 via-card to-card p-6 shadow-sm">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <BrainCircuit className="h-24 w-24" />
            </div>
            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-sm">
                <Sparkles className="h-4 w-4" /> AI Trade Review
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Connect your database to enable AI-powered analysis of your trading habits, emotional triggers, and execution performance.
              </p>
              <Button className="w-full bg-primary/10 text-primary hover:bg-primary/20 border-primary/20 border">
                Generate Analysis
              </Button>
            </div>
          </div>

          {/* Profit & Loss Card */}
          <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm p-6">
            <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">
              Financial Outcome
            </h2>
            <div className="space-y-6">
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Net PnL</span>
                <div className={cn(
                  "text-4xl font-serif font-bold tracking-tight flex items-center gap-2",
                  isWin ? "text-emerald-500" : isLoss ? "text-rose-500" : "text-muted-foreground"
                )}>
                  {isWin ? <TrendingUp className="h-6 w-6" /> : isLoss ? <TrendingDown className="h-6 w-6" /> : null}
                  {isWin ? "+" : ""}${trade.pnl.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Exchange Fees</span>
                  <span className="font-mono text-rose-500/80">-${trade.fees.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Funding/Swap</span>
                  <span className="font-mono text-rose-500/80">-${Math.abs(trade.funding).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline & Meta */}
          <div className="bg-muted/30 border border-border rounded-xl overflow-hidden shadow-sm p-5 space-y-4">
             <div className="flex items-center gap-3 text-sm text-muted-foreground">
               <Calendar className="h-4 w-4" />
               <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest font-bold">Execution Date</span>
                  <span className="font-medium text-foreground">{new Date(trade.created_at).toLocaleDateString(undefined, { dateStyle: 'medium'})}</span>
               </div>
             </div>
             <Separator className="bg-border/50" />
             <div className="flex items-center gap-3 text-sm text-muted-foreground">
               <Clock className="h-4 w-4" />
               <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest font-bold">Last Updated</span>
                  <span className="font-medium text-foreground">{new Date(trade.updated_at).toLocaleTimeString(undefined, { timeStyle: 'short'})}</span>
               </div>
             </div>
             <Separator className="bg-border/50" />
             <div className="flex items-center gap-3 text-sm text-muted-foreground">
               <Info className="h-4 w-4" />
               <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest font-bold">Trade Source</span>
                  <span className="font-medium text-foreground">{trade.source} • {trade.account}</span>
               </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  )
}
