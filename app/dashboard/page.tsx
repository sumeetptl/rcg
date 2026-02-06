import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowUpRight,
  TrendingUp,
  TrendingDown,
  Clock,
  Target,
  AlertTriangle,
} from "lucide-react";
import { CryptoLogo } from "@/components/crypto/crypto-logo";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Research Terminal",
};

export default async function DashboardPage() {
  const supabase = await createClient();

  const [signalsResult, newsResult, blogsResult] = await Promise.all([
    supabase
      .from("signals")
      .select("*")
      .in("status", ["active", "pending"])
      .order("created_at", { ascending: false })
      .limit(10),
    supabase
      .from("news")
      .select("id, title, source, published_at, category, summary")
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .limit(6),
    supabase
      .from("blogs")
      .select("id, title, slug, published_at, excerpt, tags, reading_time")
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .limit(3),
  ]);

  const signals = signalsResult.data || [];
  const news = newsResult.data || [];
  const blogs = blogsResult.data || [];

  // Helper formatting
  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  const formatDateTime = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  const formatPrice = (p: number | null) =>
    p
      ? p < 1
        ? p.toFixed(5)
        : p.toLocaleString(undefined, { minimumFractionDigits: 2 })
      : "—";

  // Calculate metrics for the strip
  const activeSignals = signals.filter((s) => s.status === "active");
  const freeSignals = activeSignals.filter(
    (s) => s.access_level === "free" || s.access_level === "public",
  ).length;
  const premiumSignals = activeSignals.filter(
    (s) => s.access_level === "premium",
  ).length;

  // Fetch closed signals for win rate and PnL calculations
  const closedSignalsResult = await supabase
    .from("signals")
    .select("*")
    .eq("status", "closed")
    .gte(
      "created_at",
      new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    );

  const closedSignals = closedSignalsResult.data || [];
  const winningSignals = closedSignals.filter((s) => s.result === "win").length;
  const losingSignals = closedSignals.filter((s) => s.result === "loss").length;
  const breakevenSignals =
    closedSignals.length - winningSignals - losingSignals;
  const winRate =
    closedSignals.length > 0
      ? Math.round((winningSignals / closedSignals.length) * 100)
      : 0;

  // Calculate average Risk:Reward
  const signalsWithRR = closedSignals.filter(
    (s) => s.entry_price && s.stop_loss && s.target_1,
  );
  const avgRR =
    signalsWithRR.length > 0
      ? signalsWithRR.reduce((acc, s) => {
          const risk = Math.abs(s.entry_price - s.stop_loss);
          const reward = Math.abs(s.target_1 - s.entry_price);
          return acc + reward / risk;
        }, 0) / signalsWithRR.length
      : 0;

  // Market bias based on active signals direction
  const longSignals = activeSignals.filter(
    (s) => s.direction === "LONG",
  ).length;
  const shortSignals = activeSignals.filter(
    (s) => s.direction === "SHORT",
  ).length;
  const marketBias =
    longSignals > shortSignals * 1.5
      ? "Bullish"
      : shortSignals > longSignals * 1.5
        ? "Bearish"
        : "Neutral";

  // Estimated PnL
  const estimatedPnL = ((winRate - 50) * 0.5).toFixed(1);
  const isPnLPositive = parseFloat(estimatedPnL) >= 0;

  // Calculate Risk:Reward for each active signal
  const calculateRR = (signal: any) => {
    if (!signal.entry_price || !signal.stop_loss || !signal.target_1)
      return null;
    const risk = Math.abs(signal.entry_price - signal.stop_loss);
    const reward = Math.abs(signal.target_1 - signal.entry_price);
    return (reward / risk).toFixed(1);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:border-x lg:border-border/40 lg:min-h-screen">
        {/* Header */}
        <header className="mb-8 flex flex-col gap-2">
          <h1 className="font-serif text-3xl font-medium tracking-tight text-foreground">
            Market Overview
          </h1>
          <div className="flex items-center gap-3">
            <Badge
              variant="outline"
              className="rounded-sm px-2 py-0.5 text-[10px] font-mono font-medium uppercase tracking-widest text-muted-foreground border-border/60"
            >
              {new Date().toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </Badge>
            <span className="text-xs text-muted-foreground font-medium">
              {signals.length} Active Setups · {closedSignals.length} Closed
              (30D)
            </span>
          </div>
        </header>

        {/* Enhanced Professional Metrics Bar */}
        <div className="mb-10 border-y border-border/40 py-3 overflow-x-auto">
          <div className="flex items-center gap-6 min-w-max px-4">
            {/* Metric: Active Signals */}
            <div className="flex items-center gap-3">
              <div className="w-0.5 h-5 bg-border" />
              <div className="flex items-baseline gap-2">
                <span className="text-[10px] uppercase tracking-wide text-muted-foreground font-medium">
                  Active Signals
                </span>
                <span className="text-base font-bold text-foreground">
                  {activeSignals.length}
                </span>
                <span className="text-[11px] text-muted-foreground">
                  ({freeSignals}F · {premiumSignals}P)
                </span>
              </div>
            </div>

            {/* Metric: Win Rate */}
            <div className="flex items-center gap-3">
              <div className="w-0.5 h-5 bg-border" />
              <div className="flex items-baseline gap-2">
                <span className="text-[10px] uppercase tracking-wide text-muted-foreground font-medium">
                  Win Rate
                </span>
                <span className="text-base font-bold text-foreground">
                  {winRate}%
                </span>
                <span className="text-[11px] text-muted-foreground">
                  ({winningSignals}W · {losingSignals}L · {breakevenSignals}BE)
                </span>
              </div>
            </div>

            {/* Metric: Avg R:R */}
            <div className="flex items-center gap-3">
              <div className="w-0.5 h-5 bg-border" />
              <div className="flex items-baseline gap-2">
                <span className="text-[10px] uppercase tracking-wide text-muted-foreground font-medium">
                  Avg R:R
                </span>
                <span className="text-base font-bold text-foreground">
                  {avgRR > 0 ? `1:${avgRR.toFixed(1)}` : "—"}
                </span>
                <span className="text-[11px] text-muted-foreground">
                  ({signalsWithRR.length} signals)
                </span>
              </div>
            </div>

            {/* Metric: PnL (with color accent) */}
            <div className="flex items-center gap-3">
              <div
                className={`w-0.5 h-5 ${isPnLPositive ? "bg-emerald-500/40" : "bg-rose-500/40"}`}
              />
              <div className="flex items-baseline gap-2">
                <span className="text-[10px] uppercase tracking-wide text-muted-foreground font-medium">
                  Est. PnL
                </span>
                <span
                  className={`text-base font-bold ${isPnLPositive ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}
                >
                  {isPnLPositive ? "+" : ""}
                  {estimatedPnL}%
                </span>
                <span className="text-[11px] text-muted-foreground">(30D)</span>
              </div>
            </div>

            {/* Metric: Market Bias */}
            <div className="flex items-center gap-3">
              <div
                className={`w-0.5 h-5 ${
                  marketBias === "Bullish"
                    ? "bg-emerald-500/40"
                    : marketBias === "Bearish"
                      ? "bg-rose-500/40"
                      : "bg-border"
                }`}
              />
              <div className="flex items-baseline gap-2">
                <span className="text-[10px] uppercase tracking-wide text-muted-foreground font-medium">
                  Bias
                </span>
                <span
                  className={`text-base font-bold ${
                    marketBias === "Bullish"
                      ? "text-emerald-600 dark:text-emerald-400"
                      : marketBias === "Bearish"
                        ? "text-rose-600 dark:text-rose-400"
                        : "text-foreground"
                  }`}
                >
                  {marketBias}
                </span>
                <span className="text-[11px] text-muted-foreground">
                  ({longSignals}L · {shortSignals}S)
                </span>
              </div>
            </div>

            {/* Metric: Total Closed */}
            <div className="flex items-center gap-3">
              <div className="w-0.5 h-5 bg-border" />
              <div className="flex items-baseline gap-2">
                <span className="text-[10px] uppercase tracking-wide text-muted-foreground font-medium">
                  Closed
                </span>
                <span className="text-base font-bold text-foreground">
                  {closedSignals.length}
                </span>
                <span className="text-[11px] text-muted-foreground">(30D)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1fr_340px]">
          {/* Primary: Enhanced Active Signals Table */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-sm font-semibold tracking-tight text-foreground">
                  Active Signals
                </h2>
                <p className="text-xs text-muted-foreground mt-1">
                  Real-time trading setups with detailed metrics
                </p>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard/signals">
                  View All <ArrowUpRight className="ml-1 h-3 w-3" />
                </Link>
              </Button>
            </div>

            <div className="rounded-xl border border-border/40 bg-card overflow-hidden shadow-sm">
              <div className="max-h-[600px] overflow-y-auto">
                <Table>
                  <TableHeader className="bg-muted/20 hover:bg-muted/20 sticky top-0 z-10">
                    <TableRow className="hover:bg-transparent border-b border-border/40">
                      <TableHead className="h-10 text-[10px] uppercase tracking-widest font-semibold text-muted-foreground pl-6 bg-muted/20">
                        Asset
                      </TableHead>
                      <TableHead className="h-10 text-[10px] uppercase tracking-widest font-semibold text-muted-foreground bg-muted/20">
                        Direction
                      </TableHead>
                      <TableHead className="h-10 text-right text-[10px] uppercase tracking-widest font-semibold text-muted-foreground bg-muted/20">
                        Entry
                      </TableHead>
                      <TableHead className="h-10 text-right text-[10px] uppercase tracking-widest font-semibold text-muted-foreground hidden sm:table-cell bg-muted/20">
                        Stop Loss
                      </TableHead>
                      <TableHead className="h-10 text-right text-[10px] uppercase tracking-widest font-semibold text-muted-foreground hidden md:table-cell bg-muted/20">
                        Target
                      </TableHead>
                      <TableHead className="h-10 text-center text-[10px] uppercase tracking-widest font-semibold text-muted-foreground hidden lg:table-cell bg-muted/20">
                        R:R
                      </TableHead>
                      <TableHead className="h-10 text-right text-[10px] uppercase tracking-widest font-semibold text-muted-foreground hidden xl:table-cell bg-muted/20">
                        Posted
                      </TableHead>
                      <TableHead className="w-[50px] h-10 bg-muted/20"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {signals.length > 0 ? (
                      signals.map((signal) => {
                        const isLong =
                          signal.direction.toLowerCase() === "long";
                        const rr = calculateRR(signal);
                        return (
                          <TableRow
                            key={signal.id}
                            className="group cursor-pointer hover:bg-muted/30 transition-colors h-16 border-border/40"
                          >
                            <TableCell className="font-semibold text-sm tracking-tight pl-6">
                              <Link
                                href={`/signals/${signal.id}`}
                                className="block w-full h-full py-4"
                              >
                                <div className="flex items-center gap-3">
                                  <CryptoLogo symbol={signal.asset} size={32} />
                                  <div className="flex flex-col gap-0.5">
                                    <span>{signal.asset}</span>
                                    {signal.timeframe && (
                                      <span className="text-[10px] text-muted-foreground font-normal">
                                        {signal.timeframe}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </Link>
                            </TableCell>
                            <TableCell>
                              <Link
                                href={`/signals/${signal.id}`}
                                className="block w-full h-full py-4"
                              >
                                <span
                                  className={`inline-flex items-center text-[10px] font-bold px-2.5 py-1 rounded-sm border ${isLong ? "bg-emerald-500/5 text-emerald-600 border-emerald-500/20" : "bg-rose-500/5 text-rose-600 border-rose-500/20"}`}
                                >
                                  {isLong ? (
                                    <TrendingUp className="mr-1.5 h-3 w-3" />
                                  ) : (
                                    <TrendingDown className="mr-1.5 h-3 w-3" />
                                  )}
                                  {signal.direction.toUpperCase()}
                                </span>
                              </Link>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex flex-col gap-0.5">
                                <span className="font-mono text-sm font-medium">
                                  {formatPrice(signal.entry_price)}
                                </span>
                                {signal.confidence && (
                                  <span className="text-[10px] text-muted-foreground">
                                    {signal.confidence}
                                  </span>
                                )}
                              </div>
                            </TableCell>
                            <TableCell className="text-right hidden sm:table-cell">
                              <span className="font-mono text-sm text-rose-600 dark:text-rose-400 font-medium flex items-center justify-end gap-1">
                                <AlertTriangle className="h-3 w-3" />
                                {formatPrice(signal.stop_loss)}
                              </span>
                            </TableCell>
                            <TableCell className="text-right hidden md:table-cell">
                              <span className="font-mono text-sm text-emerald-600 dark:text-emerald-400 font-medium flex items-center justify-end gap-1">
                                <Target className="h-3 w-3" />
                                {formatPrice(signal.target_1)}
                              </span>
                            </TableCell>
                            <TableCell className="text-center hidden lg:table-cell">
                              {rr ? (
                                <Badge
                                  variant="outline"
                                  className="font-mono text-[10px] bg-primary/5 border-primary/20"
                                >
                                  1:{rr}
                                </Badge>
                              ) : (
                                <span className="text-xs text-muted-foreground">
                                  —
                                </span>
                              )}
                            </TableCell>
                            <TableCell className="text-right hidden xl:table-cell">
                              <span className="text-xs text-muted-foreground font-mono">
                                {formatDate(signal.created_at)}
                              </span>
                            </TableCell>
                            <TableCell>
                              <Link
                                href={`/signals/${signal.id}`}
                                className="flex items-center justify-end text-muted-foreground/60 group-hover:text-primary transition-colors pr-4"
                              >
                                <ArrowUpRight className="h-4 w-4" />
                              </Link>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={8}
                          className="h-32 text-center text-sm text-muted-foreground"
                        >
                          No active signals found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </section>

          {/* Secondary: Enhanced Research & News */}
          <aside className="space-y-10">
            {/* Latest Research - Enhanced */}
            <section>
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-sm font-semibold tracking-tight text-foreground">
                    Latest Research
                  </h2>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    In-depth market analysis
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="h-auto p-0"
                >
                  <Link
                    href="/blogs"
                    className="text-xs text-primary hover:text-primary/80"
                  >
                    All <ArrowUpRight className="ml-0.5 h-3 w-3 inline" />
                  </Link>
                </Button>
              </div>
              <div className="space-y-5 max-h-[500px] overflow-y-auto pr-2">
                {blogs.length > 0 ? (
                  blogs.map((blog) => (
                    <Link
                      key={blog.id}
                      href={`/blogs/${blog.slug}`}
                      className="group block"
                    >
                      <article className="flex flex-col gap-2 pb-5 border-b border-border/40 last:border-0 last:pb-0">
                        {blog.tags && blog.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5">
                            {blog.tags.slice(0, 2).map((tag: string) => (
                              <Badge
                                key={tag}
                                variant="secondary"
                                className="text-[9px] uppercase tracking-wider px-1.5 py-0"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                        <h3 className="text-base font-serif font-medium leading-snug text-foreground/90 group-hover:text-primary transition-colors">
                          {blog.title}
                        </h3>
                        {blog.excerpt && (
                          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                            {blog.excerpt}
                          </p>
                        )}
                        <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-mono">
                          <Clock className="h-3 w-3" />
                          <time>{formatDate(blog.published_at)}</time>
                          {blog.reading_time && (
                            <>
                              <span>•</span>
                              <span>{blog.reading_time} min read</span>
                            </>
                          )}
                        </div>
                      </article>
                    </Link>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground italic">
                    No recent research.
                  </p>
                )}
              </div>
            </section>

            <Separator className="bg-border/60" />

            {/* Market News - Enhanced */}
            <section>
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-sm font-semibold tracking-tight text-foreground">
                    Market News
                  </h2>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    Latest crypto updates
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="h-auto p-0"
                >
                  <Link
                    href="/news"
                    className="text-xs text-primary hover:text-primary/80"
                  >
                    All <ArrowUpRight className="ml-0.5 h-3 w-3 inline" />
                  </Link>
                </Button>
              </div>
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                {news.length > 0 ? (
                  news.map((item) => (
                    <div
                      key={item.id}
                      className="group relative pl-4 border-l-2 border-border/40 hover:border-primary/50 transition-colors"
                    >
                      <div className="flex flex-col gap-2">
                        <Badge
                          variant="outline"
                          className="text-[9px] uppercase tracking-wider w-fit"
                        >
                          {item.category}
                        </Badge>
                        <p className="text-sm font-medium leading-relaxed text-foreground/90 group-hover:text-primary transition-colors">
                          {item.title}
                        </p>
                        {item.summary && (
                          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                            {item.summary}
                          </p>
                        )}
                        <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-mono">
                          <span className="uppercase tracking-wider">
                            {item.source}
                          </span>
                          <span>•</span>
                          <span>{formatDate(item.published_at)}</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground italic">
                    No wire news.
                  </p>
                )}
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
