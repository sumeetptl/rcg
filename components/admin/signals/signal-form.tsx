"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Save } from "lucide-react"
import { FormSection } from "@/components/admin/form-section"
import { Signal } from "@/lib/types"

interface SignalFormProps {
  initialData?: Partial<Signal>
}

export function SignalForm({ initialData }: SignalFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    asset: initialData?.asset || "",
    direction: initialData?.direction || "LONG",
    entry_price: initialData?.entry_price?.toString() || "",
    stop_loss: initialData?.stop_loss?.toString() || "",
    target_1: initialData?.target_1?.toString() || "",
    target_2: initialData?.target_2?.toString() || "",
    target_3: initialData?.target_3?.toString() || "",
    timeframe: initialData?.timeframe || "1D",
    confidence: initialData?.confidence || "Medium",
    status: initialData?.status || "draft",
    access_level: initialData?.access_level || "premium",
    result: initialData?.result || "",
    result_note: initialData?.result_note || "",
    context: initialData?.context || "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    const supabase = createClient()
    
    // Validate required numeric fields
    if (!formData.entry_price || !formData.stop_loss || !formData.target_1) {
        setError("Entry Price, Stop Loss, and Target 1 are required.")
        setIsLoading(false)
        return
    }

    const payload = {
      title: formData.title,
      asset: formData.asset.toUpperCase(),
      direction: formData.direction,
      entry_price: parseFloat(formData.entry_price),
      stop_loss: parseFloat(formData.stop_loss),
      target_1: parseFloat(formData.target_1),
      target_2: formData.target_2 ? parseFloat(formData.target_2) : null,
      target_3: formData.target_3 ? parseFloat(formData.target_3) : null,
      timeframe: formData.timeframe,
      confidence: formData.confidence,
      status: formData.status,
      access_level: formData.access_level,
      result: formData.result || null,
      result_note: formData.result_note || null,
      context: formData.context || null,
    }

    let queryError = null;

    if (initialData?.id) {
        // Update existing signal
        const { error: updateError } = await supabase
            .from("signals")
            .update(payload)
            .eq("id", initialData.id)
        queryError = updateError
    } else {
        // Insert new signal
        const { error: insertError } = await supabase
            .from("signals")
            .insert(payload)
        queryError = insertError
    }

    if (queryError) {
      setError(queryError.message)
      setIsLoading(false)
      return
    }

    router.push("/admin/signals")
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* 1. Signal Overview */}
      <FormSection title="Signal Overview" description="Core details about the asset and trade direction.">
        <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="title">Title</Label>
                <Input
                id="title"
                placeholder="e.g. BTC Breakout Setup"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="asset">Asset (Coin/Token)</Label>
                <Input
                id="asset"
                placeholder="e.g. BTC, ETH/USDT"
                value={formData.asset}
                onChange={(e) => setFormData({ ...formData, asset: e.target.value })}
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
                <Label htmlFor="timeframe">Timeframe</Label>
                <Input
                id="timeframe"
                placeholder="e.g. 4H, 1D"
                value={formData.timeframe}
                onChange={(e) => setFormData({ ...formData, timeframe: e.target.value })}
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="confidence">Confidence Level</Label>
                <Select
                value={formData.confidence}
                onValueChange={(value) => setFormData({ ...formData, confidence: value })}
                >
                <SelectTrigger>
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
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
                <Label htmlFor="target_1" className="text-green-600 dark:text-green-400">Target 1 ($)</Label>
                <Input
                id="target_1"
                type="number"
                step="any"
                placeholder="0.00"
                value={formData.target_1}
                onChange={(e) => setFormData({ ...formData, target_1: e.target.value })}
                required
                className="font-mono"
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="target_2" className="text-muted-foreground">Target 2 (Optional)</Label>
                <Input
                id="target_2"
                type="number"
                step="any"
                placeholder="Optional"
                value={formData.target_2}
                onChange={(e) => setFormData({ ...formData, target_2: e.target.value })}
                className="font-mono"
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="target_3" className="text-muted-foreground">Target 3 (Optional)</Label>
                <Input
                id="target_3"
                type="number"
                step="any"
                placeholder="Optional"
                value={formData.target_3}
                onChange={(e) => setFormData({ ...formData, target_3: e.target.value })}
                className="font-mono"
                />
            </div>
        </div>
      </FormSection>

      {/* 3. Analysis */}
      <FormSection title="Analysis & Context" description="Provide your reasoning for this trade setup.">
        <Textarea
            id="context"
            placeholder="Technical breakdown, chart patterns, and risk/reward ratio..."
            rows={6}
            value={formData.context}
            onChange={(e) => setFormData({ ...formData, context: e.target.value })}
            className="min-h-[150px] font-sans"
        />
      </FormSection>

      {/* 4. Administration */}
      <FormSection title="Administration" description="Publishing status and access level controls.">
        <div className="grid gap-6 sm:grid-cols-2">
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
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                <Label htmlFor="access_level">Access Level</Label>
                <Select
                    value={formData.access_level}
                    onValueChange={(value) => setFormData({ ...formData, access_level: value })}
                >
                    <SelectTrigger>
                    <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="free">Free Users</SelectItem>
                    <SelectItem value="premium">Premium Only</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            
            {/* Conditional Result Tracking if Closed */}
            {(formData.status === "closed" || formData.result) && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="result">Trade Result</Label>
                  <Select
                      value={formData.result || ""}
                      onValueChange={(value) => setFormData({ ...formData, result: value })}
                  >
                      <SelectTrigger>
                        <SelectValue placeholder="Select outcome..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="win">Win</SelectItem>
                        <SelectItem value="loss">Loss</SelectItem>
                        <SelectItem value="breakeven">Breakeven</SelectItem>
                      </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="result_note">Result Note</Label>
                    <Input
                    id="result_note"
                    placeholder="e.g. Hit TP2 and reversed"
                    value={formData.result_note}
                    onChange={(e) => setFormData({ ...formData, result_note: e.target.value })}
                    />
                </div>
              </>
            )}
        </div>
      </FormSection>
      
      <div className="flex justify-end pt-4 border-t border-border">
         <Button onClick={handleSubmit} disabled={isLoading} className="w-full sm:w-auto">
             {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
             {!isLoading && <Save className="mr-2 h-4 w-4" />}
             {initialData?.id ? "Update Trade" : "Save Trade"}
         </Button>
      </div>
    </form>
  )
}
