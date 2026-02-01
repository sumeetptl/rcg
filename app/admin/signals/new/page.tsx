"use client"

import React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Loader2, Save } from "lucide-react"
import { FormSection } from "@/components/admin/form-section"

export default function NewSignalPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    coin: "",
    direction: "LONG",
    entry_price: "",
    stop_loss: "",
    take_profit_1: "",
    take_profit_2: "",
    take_profit_3: "",
    analysis: "",
    status: "PENDING",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    const supabase = createClient()

    const { error: insertError } = await supabase.from("signals").insert({
      coin: formData.coin.toUpperCase(),
      direction: formData.direction,
      entry_price: parseFloat(formData.entry_price),
      stop_loss: parseFloat(formData.stop_loss),
      take_profit_1: parseFloat(formData.take_profit_1),
      take_profit_2: formData.take_profit_2 ? parseFloat(formData.take_profit_2) : null,
      take_profit_3: formData.take_profit_3 ? parseFloat(formData.take_profit_3) : null,
      analysis: formData.analysis || null,
      status: formData.status,
    })

    if (insertError) {
      setError(insertError.message)
      setIsLoading(false)
      return
    }

    router.push("/admin/signals")
    router.refresh()
  }

  return (
    <div className="mx-auto max-w-4xl p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
         <div className="flex flex-col gap-1">
            <Link
            href="/admin/signals"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-2"
            >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Signals
            </Link>
            <h1 className="font-serif text-3xl font-semibold tracking-tight">New Trading Signal</h1>
         </div>
         <div className="flex gap-3">
            <Button variant="outline" onClick={() => router.back()}>
                Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {!isLoading && <Save className="mr-2 h-4 w-4" />}
                Save Signal
            </Button>
         </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* 1. Signal Overview */}
            <FormSection title="Signal Overview" description="Core details about the asset and trade direction.">
                <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="coin">Coin/Token</Label>
                        <Input
                        id="coin"
                        placeholder="e.g. BTC, ETH/USDT"
                        value={formData.coin}
                        onChange={(e) => setFormData({ ...formData, coin: e.target.value })}
                        required
                        className="font-mono uppercase"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="direction">Direction</Label>
                        <Select
                        value={formData.direction}
                        onValueChange={(value) => setFormData({ ...formData, direction: value })}
                        >
                        <SelectTrigger className={formData.direction === "LONG" ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="LONG" className="text-green-600">LONG</SelectItem>
                            <SelectItem value="SHORT" className="text-red-600">SHORT</SelectItem>
                        </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <Select
                            value={formData.status}
                            onValueChange={(value) => setFormData({ ...formData, status: value })}
                        >
                            <SelectTrigger>
                            <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                            <SelectItem value="PENDING">PENDING</SelectItem>
                            <SelectItem value="ACTIVE">ACTIVE</SelectItem>
                            <SelectItem value="HIT">HIT (Profitable)</SelectItem>
                            <SelectItem value="MISSED">MISSED</SelectItem>
                            <SelectItem value="CANCELLED">CANCELLED</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </FormSection>

            {/* 2. Trade Levels */}
            <FormSection title="Trade Levels" description="Key price points for entry and exit.">
                 <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="space-y-2">
                        <Label htmlFor="entry_price" className="text-blue-600 dark:text-blue-400">Entry Price ($)</Label>
                        <Input
                        id="entry_price"
                        type="number"
                        step="any"
                        placeholder="0.00"
                        value={formData.entry_price}
                        onChange={(e) => setFormData({ ...formData, entry_price: e.target.value })}
                        required
                        className="font-mono"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="stop_loss" className="text-red-600 dark:text-red-400">Stop Loss ($)</Label>
                        <Input
                        id="stop_loss"
                        type="number"
                        step="any"
                        placeholder="0.00"
                        value={formData.stop_loss}
                        onChange={(e) => setFormData({ ...formData, stop_loss: e.target.value })}
                        required
                        className="font-mono"
                        />
                    </div>
                 </div>
                 <div className="grid gap-6 sm:grid-cols-3 mt-4">
                    <div className="space-y-2">
                        <Label htmlFor="take_profit_1" className="text-green-600 dark:text-green-400">TP 1 ($)</Label>
                        <Input
                        id="take_profit_1"
                        type="number"
                        step="any"
                        placeholder="0.00"
                        value={formData.take_profit_1}
                        onChange={(e) => setFormData({ ...formData, take_profit_1: e.target.value })}
                        required
                        className="font-mono"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="take_profit_2" className="text-muted-foreground">TP 2 (Optional)</Label>
                        <Input
                        id="take_profit_2"
                        type="number"
                        step="any"
                        placeholder="Optional"
                        value={formData.take_profit_2}
                        onChange={(e) => setFormData({ ...formData, take_profit_2: e.target.value })}
                        className="font-mono"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="take_profit_3" className="text-muted-foreground">TP 3 (Optional)</Label>
                        <Input
                        id="take_profit_3"
                        type="number"
                        step="any"
                        placeholder="Optional"
                        value={formData.take_profit_3}
                        onChange={(e) => setFormData({ ...formData, take_profit_3: e.target.value })}
                        className="font-mono"
                        />
                    </div>
                </div>
            </FormSection>

            {/* 3. Analysis */}
            <FormSection title="Analysis & Context" description="Provide your reasoning for this trade setup.">
                <Textarea
                    id="analysis"
                    placeholder="Technical breakdown, chart patterns, and risk/reward ratio..."
                    rows={6}
                    value={formData.analysis}
                    onChange={(e) => setFormData({ ...formData, analysis: e.target.value })}
                    className="min-h-[150px] font-sans"
                />
            </FormSection>
      </form>
    </div>
  )
}

