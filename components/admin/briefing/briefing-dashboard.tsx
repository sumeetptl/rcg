"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { MarketBriefingDataset } from "@/lib/services/market-briefing-data"
import { GeneratedBriefingDraft } from "@/lib/services/market-briefing-agent"
import {
  fetchLiveDerivativesAction,
  generateBriefingDraftAction,
  saveBriefingDraftToBlogsAction,
} from "@/app/admin/briefing/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Sparkles,
  Bot,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  ExternalLink,
  Save,
  CheckCircle2,
  AlertCircle,
  BarChart3,
  Flame,
  ShieldAlert,
  ArrowRight,
  Layers,
  Key,
} from "lucide-react"

interface BriefingDashboardProps {
  initialDataset: MarketBriefingDataset
}

function formatUSD(num: number): string {
  if (Math.abs(num) >= 1e9) return `$${(num / 1e9).toFixed(2)}B`
  if (Math.abs(num) >= 1e6) return `$${(num / 1e6).toFixed(2)}M`
  if (Math.abs(num) >= 1e3) return `$${(num / 1e3).toFixed(1)}K`
  return `$${num.toLocaleString()}`
}

export function BriefingDashboard({ initialDataset }: BriefingDashboardProps) {
  const router = useRouter()

  const [dataset, setDataset] = useState<MarketBriefingDataset>(initialDataset)
  const [timeframe, setTimeframe] = useState<'daily' | 'weekly'>('weekly')
  const [focusAsset, setFocusAsset] = useState<string>('all')
  const [customKey, setCustomKey] = useState<string>('')
  const [showKeyInput, setShowKeyInput] = useState<boolean>(false)

  const [isRefreshingData, setIsRefreshingData] = useState<boolean>(false)
  const [isGenerating, setIsGenerating] = useState<boolean>(false)
  const [generationStep, setGenerationStep] = useState<string>("")
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const [generatedDraft, setGeneratedDraft] = useState<GeneratedBriefingDraft | null>(null)

  // Refresh raw market telemetry
  const handleRefreshData = async () => {
    setIsRefreshingData(true)
    setError(null)
    const res = await fetchLiveDerivativesAction(timeframe)
    if (res.success && res.data) {
      setDataset(res.data)
    } else {
      setError(res.error || "Failed to refresh market data")
    }
    setIsRefreshingData(false)
  }

  // Trigger agent generation
  const handleGenerate = async () => {
    setIsGenerating(true)
    setError(null)
    setSaveSuccess(null)

    try {
      setGenerationStep("Pulling real-time derivatives (OI, funding, liquidations)...")
      await new Promise((r) => setTimeout(r, 400))

      setGenerationStep("Computing leverage clusters & liquidation cascades...")
      await new Promise((r) => setTimeout(r, 400))

      setGenerationStep("Synthesizing institutional Academy-tone brief...")
      const res = await generateBriefingDraftAction({
        timeframe,
        focusAsset: focusAsset === 'all' ? undefined : focusAsset,
        apiKey: customKey.trim() || undefined,
      })

      if (res.success && res.draft) {
        setGeneratedDraft(res.draft)
        setDataset(res.draft.metrics)
      } else {
        setError(res.error || "Failed to generate briefing")
      }
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred during generation")
    } finally {
      setIsGenerating(false)
      setGenerationStep("")
    }
  }

  // Save to blogs table
  const handleSaveToBlogs = async (andOpenEditor: boolean = false) => {
    if (!generatedDraft) return
    setIsSaving(true)
    setError(null)

    try {
      const res = await saveBriefingDraftToBlogsAction({
        title: generatedDraft.title,
        slug: generatedDraft.slug,
        excerpt: generatedDraft.excerpt,
        content: generatedDraft.content,
        tags: generatedDraft.tags,
        access_level: generatedDraft.access_level,
        status: 'draft',
      })

      if (res.success && res.blogId) {
        setSaveSuccess(`Draft saved to blogs table with slug: ${res.slug}`)
        if (andOpenEditor) {
          router.push(`/admin/blogs/${res.blogId}/edit`)
        }
      } else {
        setError(res.error || "Failed to save draft to blogs")
      }
    } catch (err: any) {
      setError(err?.message || "Error saving draft to blogs")
    } finally {
      setIsSaving(false)
    }
  }

  const { aggregated, assets } = dataset

  return (
    <div className="space-y-8">
      {/* Real-time Derivatives Telemetry Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Total Market Open Interest */}
        <Card className="bg-card border-border/70 shadow-xs">
          <CardHeader className="p-4 pb-2">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-xs font-mono font-medium uppercase tracking-wider">Total Market OI</span>
              <Layers className="h-4 w-4 text-primary" />
            </div>
            <CardTitle className="text-2xl font-mono font-semibold pt-1">
              {formatUSD(aggregated.totalMarketOIUSD)}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
              <span className={assets.BTC.openInterestChangePercent >= 0 ? "text-emerald-500 font-semibold" : "text-amber-500 font-semibold"}>
                {assets.BTC.openInterestChangePercent >= 0 ? "+" : ""}{assets.BTC.openInterestChangePercent}%
              </span>
              <span>BTC OI delta ({timeframe})</span>
            </div>
          </CardContent>
        </Card>

        {/* Metric 2: Cumulative Liquidations */}
        <Card className="bg-card border-border/70 shadow-xs">
          <CardHeader className="p-4 pb-2">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-xs font-mono font-medium uppercase tracking-wider">Total Liquidations</span>
              <ShieldAlert className="h-4 w-4 text-amber-500" />
            </div>
            <CardTitle className="text-2xl font-mono font-semibold pt-1">
              {formatUSD(aggregated.totalLiquidationsUSD)}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 space-y-1.5">
            <div className="w-full bg-muted/70 h-1.5 rounded-full overflow-hidden flex">
              <div
                className="bg-emerald-500 h-full"
                style={{ width: `${(aggregated.totalLongLiqsUSD / (aggregated.totalLiquidationsUSD || 1)) * 100}%` }}
                title={`Longs: ${formatUSD(aggregated.totalLongLiqsUSD)}`}
              />
              <div
                className="bg-rose-500 h-full"
                style={{ width: `${(aggregated.totalShortLiqsUSD / (aggregated.totalLiquidationsUSD || 1)) * 100}%` }}
                title={`Shorts: ${formatUSD(aggregated.totalShortLiqsUSD)}`}
              />
            </div>
            <div className="flex justify-between text-[11px] font-mono text-muted-foreground">
              <span className="text-emerald-500">L: {formatUSD(aggregated.totalLongLiqsUSD)}</span>
              <span className="text-rose-500">S: {formatUSD(aggregated.totalShortLiqsUSD)}</span>
            </div>
          </CardContent>
        </Card>

        {/* Metric 3: Weighted Avg Funding */}
        <Card className="bg-card border-border/70 shadow-xs">
          <CardHeader className="p-4 pb-2">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-xs font-mono font-medium uppercase tracking-wider">Avg 8h Funding</span>
              <Flame className="h-4 w-4 text-orange-500" />
            </div>
            <CardTitle className="text-2xl font-mono font-semibold pt-1">
              {aggregated.avgFundingRate >= 0 ? "+" : ""}{aggregated.avgFundingRate.toFixed(4)}%
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
              <span>Annualized:</span>
              <span className="text-foreground font-semibold">
                {(aggregated.avgFundingRate * 3 * 365).toFixed(1)}%
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Metric 4: Market Regime */}
        <Card className="bg-card border-border/70 shadow-xs">
          <CardHeader className="p-4 pb-2">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-xs font-mono font-medium uppercase tracking-wider">Derivatives Regime</span>
              <BarChart3 className="h-4 w-4 text-primary" />
            </div>
            <CardTitle className="text-lg font-sans font-semibold pt-1 truncate" title={aggregated.overallRegime}>
              {aggregated.overallRegime}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <Badge variant="outline" className="text-[11px] font-mono">
              Dominant Liqs: {aggregated.dominantLiquidatedSide}
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Control Panel & Generation Trigger */}
      <Card className="border-border/70 bg-card">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="font-serif text-xl flex items-center gap-2">
                <Bot className="h-5 w-5 text-primary" />
                Briefing Generator Controls
              </CardTitle>
              <CardDescription className="text-xs mt-1">
                Configure timeframe parameters and run the CoinStaq Academy agent to author a ready-to-publish editorial draft.
              </CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefreshData}
              disabled={isRefreshingData || isGenerating}
              className="h-8 gap-1.5 text-xs"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isRefreshingData ? 'animate-spin' : ''}`} />
              Sync Derivatives Data
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pt-0">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Timeframe */}
            <div className="space-y-1.5">
              <Label className="text-xs font-mono uppercase text-muted-foreground">Lookback Timeframe</Label>
              <div className="flex rounded-md border border-input p-1 bg-muted/20">
                <button
                  type="button"
                  onClick={() => setTimeframe('daily')}
                  className={`flex-1 py-1 text-xs font-medium rounded transition-colors ${
                    timeframe === 'daily' ? 'bg-primary text-primary-foreground shadow-xs' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Daily Pulse (24h)
                </button>
                <button
                  type="button"
                  onClick={() => setTimeframe('weekly')}
                  className={`flex-1 py-1 text-xs font-medium rounded transition-colors ${
                    timeframe === 'weekly' ? 'bg-primary text-primary-foreground shadow-xs' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Weekly Brief (7d)
                </button>
              </div>
            </div>

            {/* Asset Focus */}
            <div className="space-y-1.5">
              <Label className="text-xs font-mono uppercase text-muted-foreground">Asset Scope</Label>
              <div className="flex rounded-md border border-input p-1 bg-muted/20">
                <button
                  type="button"
                  onClick={() => setFocusAsset('all')}
                  className={`flex-1 py-1 text-xs font-medium rounded transition-colors ${
                    focusAsset === 'all' ? 'bg-primary text-primary-foreground shadow-xs' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  All (BTC, ETH, SOL)
                </button>
                <button
                  type="button"
                  onClick={() => setFocusAsset('BTC')}
                  className={`flex-1 py-1 text-xs font-medium rounded transition-colors ${
                    focusAsset === 'BTC' ? 'bg-primary text-primary-foreground shadow-xs' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  BTC Only
                </button>
              </div>
            </div>

            {/* AI Provider & Key Toggle */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-mono uppercase text-muted-foreground">AI Engine</Label>
                <button
                  type="button"
                  onClick={() => setShowKeyInput(!showKeyInput)}
                  className="text-[11px] text-primary hover:underline flex items-center gap-1 font-mono"
                >
                  <Key className="h-3 w-3" />
                  {showKeyInput ? "Hide API Key" : "Configure Key"}
                </button>
              </div>
              <div className="h-9 px-3 py-1.5 rounded-md border border-input bg-muted/10 text-xs flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                  Gemini 2.5 Flash + Analytical Engine
                </span>
                <Badge variant="outline" className="text-[10px] py-0">Active</Badge>
              </div>
            </div>
          </div>

          {/* Optional Gemini API Key input */}
          {showKeyInput && (
            <div className="p-3 rounded-lg border border-border/80 bg-muted/30 space-y-2 text-xs">
              <Label htmlFor="customKeyInput" className="text-xs font-medium text-foreground">
                Custom Gemini API Key (Optional override)
              </Label>
              <div className="flex gap-2">
                <Input
                  id="customKeyInput"
                  type="password"
                  placeholder="AIzaSy... (leave blank to use GEMINI_API_KEY from environment)"
                  value={customKey}
                  onChange={(e) => setCustomKey(e.target.value)}
                  className="h-8 text-xs font-mono"
                />
                {customKey && (
                  <Button variant="ghost" size="sm" onClick={() => setCustomKey("")} className="h-8 text-xs">
                    Clear
                  </Button>
                )}
              </div>
              <p className="text-[11px] text-muted-foreground">
                If no Gemini key is provided, the agent uses the built-in CoinStaq Analytical Engine to generate the full Academy-tone brief.
              </p>
            </div>
          )}

          {/* Generation Button & Progress State */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-border/50">
            <div className="text-xs text-muted-foreground">
              {isGenerating ? (
                <div className="flex items-center gap-2 text-primary font-mono animate-pulse">
                  <Sparkles className="h-4 w-4 animate-spin" />
                  <span>{generationStep || "Generating briefing draft..."}</span>
                </div>
              ) : (
                <span>Click generate to build an institutional brief formatted for Tiptap.</span>
              )}
            </div>

            <Button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="gap-2 font-medium shadow-xs"
            >
              <Sparkles className={`h-4 w-4 ${isGenerating ? 'animate-spin' : ''}`} />
              {isGenerating ? "Synthesizing Brief..." : `Draft ${timeframe === 'weekly' ? 'Weekly Brief' : 'Daily Pulse'}`}
            </Button>
          </div>

          {/* Error display */}
          {error && (
            <div className="p-3 rounded-md bg-destructive/10 border border-destructive/20 text-destructive text-xs flex items-center gap-2">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Save success display */}
          {saveSuccess && (
            <div className="p-3 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                <span>{saveSuccess}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="h-7 text-xs"
                onClick={() => router.push("/admin/blogs")}
              >
                View Blogs Table
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Main Content Area: Draft Preview vs Raw Data */}
      <Tabs defaultValue="draft" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="draft" className="text-xs">
              Editorial Draft {generatedDraft && <Badge variant="secondary" className="ml-1.5 text-[10px] py-0 px-1.5">Ready</Badge>}
            </TabsTrigger>
            <TabsTrigger value="telemetry" className="text-xs">
              Raw Derivatives Matrix
            </TabsTrigger>
          </TabsList>

          {generatedDraft && (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSaveToBlogs(false)}
                disabled={isSaving}
                className="h-8 text-xs gap-1.5"
              >
                <Save className="h-3.5 w-3.5" />
                {isSaving ? "Saving..." : "Save to Drafts"}
              </Button>
              <Button
                size="sm"
                onClick={() => handleSaveToBlogs(true)}
                disabled={isSaving}
                className="h-8 text-xs gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <span>Edit in Tiptap</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </Button>
            </div>
          )}
        </div>

        {/* Tab 1: Editorial Draft Preview */}
        <TabsContent value="draft">
          {generatedDraft ? (
            <Card className="border-border/70 bg-card overflow-hidden">
              <CardHeader className="border-b border-border/50 bg-muted/20 p-6">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Badge variant="outline" className="font-mono text-[11px] uppercase">
                    Status: Draft
                  </Badge>
                  <Badge variant="outline" className="font-mono text-[11px]">
                    Access: {generatedDraft.access_level}
                  </Badge>
                  <Badge variant="secondary" className="font-mono text-[11px]">
                    Engine: {generatedDraft.provider === 'gemini' ? 'Gemini 2.5' : 'CoinStaq Analytical Engine'}
                  </Badge>
                  {generatedDraft.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-[11px] bg-background/50">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <h1 className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
                  {generatedDraft.title}
                </h1>
                <p className="text-sm text-muted-foreground font-mono mt-1">
                  Slug: /{generatedDraft.slug}
                </p>
                <p className="text-sm text-foreground/80 mt-3 italic border-l-2 border-primary/40 pl-3">
                  {generatedDraft.excerpt}
                </p>
              </CardHeader>

              <CardContent className="p-6 sm:p-8">
                {/* Rendered HTML content formatted with typography */}
                <div
                  className="prose prose-sm dark:prose-invert max-w-none 
                    prose-headings:font-serif prose-headings:font-semibold
                    prose-h2:text-xl prose-h2:mt-6 prose-h2:mb-3 prose-h2:border-b prose-h2:border-border/40 prose-h2:pb-2
                    prose-p:leading-relaxed prose-p:text-muted-foreground prose-p:my-3
                    prose-blockquote:border-l-4 prose-blockquote:border-primary/40 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:my-4
                    prose-table:border prose-table:border-border prose-table:w-full prose-table:my-4 prose-table:text-xs
                    prose-th:border prose-th:border-border prose-th:bg-muted/40 prose-th:p-2 prose-th:font-mono prose-th:text-foreground
                    prose-td:border prose-td:border-border prose-td:p-2 prose-td:font-mono
                    prose-ul:list-disc prose-ul:ml-5 prose-ul:space-y-1 prose-ul:text-muted-foreground
                    prose-ol:list-decimal prose-ol:ml-5 prose-ol:space-y-1 prose-ol:text-muted-foreground
                    prose-hr:border-border/50 prose-hr:my-6"
                  dangerouslySetInnerHTML={{ __html: generatedDraft.content }}
                />

                <div className="mt-8 pt-6 border-t border-border/50 flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">
                    This post will be created as a <strong>draft</strong> in the blogs table. Opening in the blog editor allows you to edit with the live Tiptap toolbar before publishing.
                  </p>
                  <Button
                    onClick={() => handleSaveToBlogs(true)}
                    disabled={isSaving}
                    className="gap-2 text-xs"
                  >
                    <span>Save & Open in Tiptap</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-border/70 border-dashed bg-muted/10">
              <CardContent className="p-12 text-center flex flex-col items-center justify-center space-y-3">
                <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <Sparkles className="h-6 w-6" />
                </div>
                <h3 className="font-serif text-lg font-medium">No Draft Generated Yet</h3>
                <p className="text-xs text-muted-foreground max-w-md">
                  Click <strong>"Draft Weekly Brief"</strong> or <strong>"Draft Daily Pulse"</strong> above to trigger the Market Briefing Agent. It will pull current derivatives telemetry and synthesize an Academy-tone brief.
                </p>
                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  size="sm"
                  className="mt-2 text-xs gap-1.5"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  Generate Weekly Brief Draft Now
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Tab 2: Raw Derivatives Telemetry */}
        <TabsContent value="telemetry">
          <Card className="border-border/70 bg-card">
            <CardHeader className="p-4 pb-2 border-b border-border/50">
              <CardTitle className="text-sm font-mono uppercase tracking-wider text-muted-foreground">
                Prime Perpetual Contracts Telemetry ({dataset.periodLabel})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 overflow-x-auto">
              <table className="w-full text-xs font-mono">
                <thead>
                  <tr className="border-b border-border/60 bg-muted/30 text-left text-muted-foreground">
                    <th className="p-3 pl-4">Asset</th>
                    <th className="p-3">Mark Price</th>
                    <th className="p-3">24h Change</th>
                    <th className="p-3">Open Interest (USD)</th>
                    <th className="p-3">OI Delta</th>
                    <th className="p-3">8h Funding</th>
                    <th className="p-3">Annualized</th>
                    <th className="p-3">Long Liqs</th>
                    <th className="p-3">Short Liqs</th>
                    <th className="p-3">L/S Ratio</th>
                    <th className="p-3 pr-4">Regime</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {(['BTC', 'ETH', 'SOL'] as const).map((sym) => {
                    const a = assets[sym]
                    return (
                      <tr key={sym} className="hover:bg-muted/20 transition-colors">
                        <td className="p-3 pl-4 font-bold text-foreground">{sym}</td>
                        <td className="p-3">${a.price.toLocaleString()}</td>
                        <td className={`p-3 font-semibold ${a.priceChangePercent >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                          {a.priceChangePercent >= 0 ? '+' : ''}{a.priceChangePercent}%
                        </td>
                        <td className="p-3">{formatUSD(a.openInterestUSD)}</td>
                        <td className={`p-3 ${a.openInterestChangePercent >= 0 ? 'text-emerald-500' : 'text-amber-500'}`}>
                          {a.openInterestChangePercent >= 0 ? '+' : ''}{a.openInterestChangePercent}%
                        </td>
                        <td className="p-3">{a.fundingRate.toFixed(4)}%</td>
                        <td className="p-3">{a.fundingRateAnnualized}%</td>
                        <td className="p-3 text-emerald-500">{formatUSD(a.liquidationsLongUSD)}</td>
                        <td className="p-3 text-rose-500">{formatUSD(a.liquidationsShortUSD)}</td>
                        <td className="p-3">
                          <span className="font-semibold">{a.longShortRatio}</span>
                          <span className="text-[10px] text-muted-foreground ml-1">
                            ({a.longAccountPercent}% L)
                          </span>
                        </td>
                        <td className="p-3 pr-4">
                          <Badge variant="outline" className="text-[10px] py-0">
                            {a.marketRegime}
                          </Badge>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
