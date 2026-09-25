"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, Loader2, Save, UploadCloud } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { FormSection } from "@/components/admin/form-section"

export function TradeForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [date, setDate] = useState<Date | undefined>(new Date())

  const [formData, setFormData] = useState({
    market: "",
    exchange: "",
    broker: "",
    account: "",
    prop_firm: "",
    trade_source: "",
    pair: "",
    direction: "",
    strategy: "",
    leverage: "",
    entry: "",
    exit: "",
    stop_loss: "",
    take_profit: "",
    position_size: "",
    risk_percentage: "",
    fees: "",
    funding: "",
    emotion: "",
    mistake: "",
    notes: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call since we don't have a DB schema yet
    setTimeout(() => {
      setIsLoading(false)
      toast.success("Trade logged successfully!")
      router.push("/dashboard/trades")
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* 1. Trade Basics */}
      <FormSection title="Trade Basics" description="High-level details about where and when the trade took place.">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2">
            <Label>Date & Time</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="market">Market</Label>
            <Select value={formData.market} onValueChange={(v) => handleInputChange("market", v)}>
              <SelectTrigger><SelectValue placeholder="Select market..." /></SelectTrigger>
              <SelectContent>
                <SelectItem value="crypto">Crypto</SelectItem>
                <SelectItem value="forex">Forex</SelectItem>
                <SelectItem value="stocks">Stocks</SelectItem>
                <SelectItem value="commodities">Commodities</SelectItem>
                <SelectItem value="indices">Indices</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="exchange">Exchange</Label>
            <Input
              id="exchange"
              placeholder="e.g. Binance, Bybit"
              value={formData.exchange}
              onChange={(e) => handleInputChange("exchange", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="broker">Broker</Label>
            <Input
              id="broker"
              placeholder="e.g. Interactive Brokers"
              value={formData.broker}
              onChange={(e) => handleInputChange("broker", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="account">Account</Label>
            <Input
              id="account"
              placeholder="e.g. Main Margin, Alt"
              value={formData.account}
              onChange={(e) => handleInputChange("account", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="prop_firm">Prop Firm</Label>
            <Input
              id="prop_firm"
              placeholder="e.g. FTMO (Optional)"
              value={formData.prop_firm}
              onChange={(e) => handleInputChange("prop_firm", e.target.value)}
            />
          </div>

          <div className="space-y-2 sm:col-span-2 lg:col-span-3">
            <Label htmlFor="trade_source">Trade Source</Label>
            <Input
              id="trade_source"
              placeholder="e.g. Personal Analysis, Discord Group, Signal"
              value={formData.trade_source}
              onChange={(e) => handleInputChange("trade_source", e.target.value)}
            />
          </div>
        </div>
      </FormSection>

      {/* 2. Setup & Execution */}
      <FormSection title="Setup & Execution" description="Core trade configuration.">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-2">
            <Label htmlFor="pair">Pair / Ticker</Label>
            <Input
              id="pair"
              placeholder="e.g. BTC/USDT"
              value={formData.pair}
              onChange={(e) => handleInputChange("pair", e.target.value)}
              className="font-mono uppercase"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="direction">Direction</Label>
            <Select value={formData.direction} onValueChange={(v) => handleInputChange("direction", v)}>
              <SelectTrigger className={formData.direction === "LONG" ? "text-emerald-600 font-medium" : formData.direction === "SHORT" ? "text-rose-600 font-medium" : ""}>
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="LONG" className="text-emerald-600">LONG</SelectItem>
                <SelectItem value="SHORT" className="text-rose-600">SHORT</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="strategy">Strategy</Label>
            <Input
              id="strategy"
              placeholder="e.g. Breakout, Mean Reversion"
              value={formData.strategy}
              onChange={(e) => handleInputChange("strategy", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="leverage">Leverage</Label>
            <Input
              id="leverage"
              placeholder="e.g. 10x"
              value={formData.leverage}
              onChange={(e) => handleInputChange("leverage", e.target.value)}
              className="font-mono"
            />
          </div>
        </div>
      </FormSection>

      {/* 3. Price Levels */}
      <FormSection title="Price Levels" description="Entry, exit, and invalidation points.">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-2">
            <Label htmlFor="entry" className="text-blue-600 dark:text-blue-400">Entry Price</Label>
            <Input
              id="entry"
              type="number"
              step="any"
              placeholder="0.00"
              value={formData.entry}
              onChange={(e) => handleInputChange("entry", e.target.value)}
              className="font-mono"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="exit" className="text-purple-600 dark:text-purple-400">Exit Price</Label>
            <Input
              id="exit"
              type="number"
              step="any"
              placeholder="0.00"
              value={formData.exit}
              onChange={(e) => handleInputChange("exit", e.target.value)}
              className="font-mono"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="stop_loss" className="text-rose-600 dark:text-rose-400">Stop Loss</Label>
            <Input
              id="stop_loss"
              type="number"
              step="any"
              placeholder="0.00"
              value={formData.stop_loss}
              onChange={(e) => handleInputChange("stop_loss", e.target.value)}
              className="font-mono"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="take_profit" className="text-emerald-600 dark:text-emerald-400">Take Profit</Label>
            <Input
              id="take_profit"
              type="number"
              step="any"
              placeholder="0.00"
              value={formData.take_profit}
              onChange={(e) => handleInputChange("take_profit", e.target.value)}
              className="font-mono"
            />
          </div>
        </div>
      </FormSection>

      {/* 4. Risk & Metrics */}
      <FormSection title="Risk & Metrics" description="Sizing and associated costs.">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-2">
            <Label htmlFor="position_size">Position Size</Label>
            <Input
              id="position_size"
              type="number"
              step="any"
              placeholder="e.g. 1.5 BTC"
              value={formData.position_size}
              onChange={(e) => handleInputChange("position_size", e.target.value)}
              className="font-mono"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="risk_percentage">Risk %</Label>
            <Input
              id="risk_percentage"
              type="number"
              step="any"
              placeholder="e.g. 1.0"
              value={formData.risk_percentage}
              onChange={(e) => handleInputChange("risk_percentage", e.target.value)}
              className="font-mono"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fees">Fees Paid</Label>
            <Input
              id="fees"
              type="number"
              step="any"
              placeholder="e.g. 12.50"
              value={formData.fees}
              onChange={(e) => handleInputChange("fees", e.target.value)}
              className="font-mono"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="funding">Funding / Swap</Label>
            <Input
              id="funding"
              type="number"
              step="any"
              placeholder="e.g. -2.30"
              value={formData.funding}
              onChange={(e) => handleInputChange("funding", e.target.value)}
              className="font-mono"
            />
          </div>
        </div>
      </FormSection>

      {/* 5. Review & Psychology */}
      <FormSection title="Review & Psychology" description="Qualitative feedback and visual evidence.">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="emotion">Emotion</Label>
            <Select value={formData.emotion} onValueChange={(v) => handleInputChange("emotion", v)}>
              <SelectTrigger><SelectValue placeholder="How did you feel?" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="calm">Calm & Collected</SelectItem>
                <SelectItem value="anxious">Anxious / FOMO</SelectItem>
                <SelectItem value="greedy">Greedy</SelectItem>
                <SelectItem value="fearful">Fearful</SelectItem>
                <SelectItem value="frustrated">Frustrated</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="mistake">Mistake Made</Label>
            <Select value={formData.mistake} onValueChange={(v) => handleInputChange("mistake", v)}>
              <SelectTrigger><SelectValue placeholder="Identify any mistakes..." /></SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None (Flawless Execution)</SelectItem>
                <SelectItem value="late_entry">Late Entry</SelectItem>
                <SelectItem value="early_exit">Early Exit</SelectItem>
                <SelectItem value="overleveraged">Overleveraged</SelectItem>
                <SelectItem value="revenge_trading">Revenge Trading</SelectItem>
                <SelectItem value="ignored_rules">Ignored Trading Plan</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Write down any lessons learned, context, or thoughts on the setup..."
              rows={5}
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              className="min-h-[120px] font-sans"
            />
          </div>

          <div className="space-y-2 sm:col-span-2">
            <Label>Screenshot Upload</Label>
            <div className="flex justify-center rounded-lg border border-dashed border-border px-6 py-12">
              <div className="text-center">
                <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" aria-hidden="true" />
                <div className="mt-4 flex text-sm leading-6 text-muted-foreground justify-center">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:text-primary/80"
                  >
                    <span>Upload a file</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs leading-5 text-muted-foreground mt-2">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>
        </div>
      </FormSection>
      
      <div className="flex justify-end pt-4 border-t border-border">
         <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
             {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
             {!isLoading && <Save className="mr-2 h-4 w-4" />}
             Save Trade Entry
         </Button>
      </div>
    </form>
  )
}
