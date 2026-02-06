import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { createClient } from "@/lib/supabase/server";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { analyzeSignal, formatPrice } from "@/lib/signal-analytics";
import {
  ArrowLeft,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Clock,
} from "lucide-react";
import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { CryptoLogo } from "@/components/crypto/crypto-logo";

interface SignalPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: SignalPageProps): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createClient();

  const { data: signal } = await supabase
    .from("signals")
    .select("asset, direction, status")
    .eq("id", id)
    .single();

  if (!signal) {
    return { title: "Signal Not Found" };
  }

  return {
    title: `${signal.asset} ${signal.direction} - Trade Research`,
    description: `Institutional analysis for ${signal.asset} (${signal.direction}). Status: ${signal.status}`,
  };
}

export default async function SignalDetailPage({ params }: SignalPageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: signal } = await supabase
    .from("signals")
    .select("*")
    .eq("id", id)
    .single();

  if (!signal) {
    notFound();
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // --- Server-Side Analytics Calculation ---
  // This runs on the server before HTML is generated.
  const analytics = analyzeSignal(signal);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header isAuthenticated={!!user} />

      <main className="flex-1 py-12">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          <div className="overflow-hidden rounded-lg border border-border bg-background">
            {/* Header section with asset, direction, and status */}
            <header className="p-8 sm:p-12">
              <Link
                href="/dashboard"
                className="mb-8 inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Signals
              </Link>

              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="hidden sm:block">
                      <CryptoLogo symbol={signal.asset} size={48} />
                    </div>
                    <h1 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl text-foreground flex items-center gap-2">
                       <span className="sm:hidden">
                        <CryptoLogo symbol={signal.asset} size={36} />
                      </span>
                      {signal.asset}{" "}
                      <span className="text-muted-foreground font-sans text-2xl mx-1">
                        —
                      </span>{" "}
                      <span className={cn(analytics.directionColor)}>
                        {signal.direction} Setup
                      </span>
                    </h1>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground font-medium">
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4" />
                      {formatDate(signal.created_at)}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-border" />
                    <span>TIMEFRAME: {signal.timeframe || "Intraday"}</span>
                    {signal.confidence && (
                      <>
                        <span className="h-1 w-1 rounded-full bg-border" />
                        <span className="uppercase tracking-wider font-bold text-primary/80">
                          {signal.confidence} Confidence
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <Badge
                  variant="outline"
                  className={cn(
                    "h-10 px-4 text-xs tracking-widest font-bold uppercase",
                    analytics.directionBg,
                    analytics.directionColor,
                    analytics.directionBorder,
                  )}
                >
                  {signal.status}
                </Badge>
              </div>
            </header>

            <Separator />

            {/* Main content section */}
            <div className="p-8 sm:p-12">
              {/* Signal Snapshot Grid */}
              <div className="mb-12 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-5">
                <div className="p-5 border border-border bg-muted/20 rounded-md">
                  <span className="block text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-2">
                    Entry
                  </span>
                  <span className="font-mono text-xl font-semibold">
                    {formatPrice(signal.entry_price)}
                  </span>
                </div>
                <div className="p-5 border border-border bg-muted/20 rounded-md">
                  <span className="block text-[10px] uppercase tracking-widest text-rose-500/80 font-bold mb-2">
                    Stop Loss
                  </span>
                  <span className="font-mono text-xl font-semibold text-rose-500">
                    {formatPrice(signal.stop_loss)}
                  </span>
                </div>
                <div className="p-5 border border-border bg-muted/20 rounded-md">
                  <span className="block text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-2">
                    Risk/Trade
                  </span>
                  <span className="font-mono text-xl font-semibold">
                    {analytics.riskPercent}
                  </span>
                </div>
                <div className="p-5 border border-border bg-muted/20 rounded-md">
                  <span className="block text-[10px] uppercase tracking-widest text-emerald-500/80 font-bold mb-2">
                    Max R:R
                  </span>
                  <span className="font-mono text-xl font-semibold text-emerald-500">
                    {analytics.maxRR}
                  </span>
                </div>
                <div className="p-5 border border-border bg-muted/20 rounded-md hidden lg:block">
                  <span className="block text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-2">
                    Leverage
                  </span>
                  <span className="font-mono text-xl font-semibold text-muted-foreground">
                    10x ISO
                  </span>
                </div>
              </div>

              <div className="grid gap-12 lg:grid-cols-[2fr_1fr]">
                {/* Main Content Column */}
                <div className="space-y-12">
                  {/* Trade Rationale */}
                  <section>
                    <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground mb-6 flex items-center gap-3">
                      <span className="h-px w-8 bg-border" /> Trade Rationale
                    </h3>
                    {signal.context ? (
                      <div className="prose prose-neutral dark:prose-invert max-w-none text-foreground/80 leading-relaxed text-lg">
                        <p className="whitespace-pre-wrap">{signal.context}</p>
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground italic font-serif">
                        No research notes attached to this execution.
                      </p>
                    )}
                  </section>

                  {/* Risk Note */}
                  <section className="bg-muted/30 border border-border/60 rounded-md p-6">
                    <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-foreground mb-4">
                      <AlertTriangle className="h-4 w-4 text-amber-500" /> Risk
                      Protocol
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-3 list-disc pl-5">
                      <li>
                        Market volatility varies; ensure this setup aligns with
                        your personal risk tolerance.
                      </li>
                      <li>
                        Invalidation occurs if price closes consistently beyond
                        the Stop Loss level.
                      </li>
                      <li>
                        Take profit levels are technical projections, not
                        guarantees. Secure profits proactively.
                      </li>
                    </ul>
                  </section>

                  {/* Result Section (Conditional) */}
                  {(signal.status === "closed" || signal.result) && (
                    <section className="border-t border-border pt-12">
                      <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground mb-8">
                        Execution Performance
                      </h3>
                      <div
                        className={cn(
                          "border border-border p-8 rounded-md",
                          signal.result === "win"
                            ? "bg-emerald-500/[0.02] border-emerald-500/20"
                            : signal.result === "loss"
                              ? "bg-rose-500/[0.02] border-rose-500/20"
                              : "bg-muted/10",
                        )}
                      >
                        <div className="flex items-start gap-6">
                          <div
                            className={cn(
                              "p-3 rounded-full",
                              signal.result === "win"
                                ? "text-emerald-500 bg-emerald-500/10"
                                : signal.result === "loss"
                                  ? "text-rose-500 bg-rose-500/10"
                                  : "text-muted-foreground bg-muted",
                            )}
                          >
                            {signal.result === "win" ? (
                              <CheckCircle2 className="h-8 w-8" />
                            ) : signal.result === "loss" ? (
                              <XCircle className="h-8 w-8" />
                            ) : (
                              <AlertCircle className="h-8 w-8" />
                            )}
                          </div>
                          <div className="space-y-3">
                            <p className="font-serif text-2xl font-semibold capitalize tracking-tight">
                              Outcome: {signal.result || "Closed"}
                            </p>
                            <p className="text-muted-foreground text-base leading-relaxed max-w-xl">
                              {signal.result_note ||
                                "This execution has been archived by the editorial team after reaching neutral maturity."}
                            </p>
                          </div>
                        </div>
                      </div>
                    </section>
                  )}
                </div>

                {/* Side Column: Price Architecture */}
                <div className="space-y-8">
                  <div className="rounded-md border border-border bg-card overflow-hidden">
                    <div className="bg-muted/40 px-5 py-3 border-b border-border text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      Price Architecture
                    </div>
                    <div className="divide-y divide-border/60">
                      {/* Entry */}
                      <div className="flex items-center justify-between px-5 py-4">
                        <span className="text-sm font-medium text-muted-foreground">
                          Target Entry
                        </span>
                        <span className="font-mono text-sm font-bold">
                          {formatPrice(signal.entry_price)}
                        </span>
                      </div>
                      {/* Stop */}
                      <div className="flex items-center justify-between px-5 py-4 bg-rose-500/[0.03]">
                        <span className="text-sm font-medium text-rose-600/80 uppercase tracking-wider">
                          Invalidation
                        </span>
                        <span className="font-mono text-sm font-bold text-rose-600">
                          {formatPrice(signal.stop_loss)}
                        </span>
                      </div>
                      {/* Targets */}
                      {analytics.targets.map((tp, i) => (
                        <div key={i} className="px-5 py-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-bold text-emerald-600/90">
                              {tp.label}
                            </span>
                            <span className="font-mono text-sm font-bold text-emerald-600">
                              {formatPrice(tp.price)}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
                            <span>
                              {tp.movePercent ? `+${tp.movePercent}` : "-"}
                            </span>
                            <span className="bg-muted px-1.5 py-0.5 rounded-sm">
                              {tp.rr} RR
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Context Info */}
                  <div className="rounded-md border border-border bg-muted/10 p-5 space-y-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground uppercase tracking-wider font-bold">
                        Asset Class
                      </span>
                      <span className="font-bold text-foreground">
                        CRYPTO SPOT
                      </span>
                    </div>
                    <Separator className="bg-border/60" />
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground uppercase tracking-wider font-bold">
                        Execution Strategy
                      </span>
                      <span className="font-bold text-foreground">
                        TREND ALPHA
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Optional footer/meta section */}
            <footer className="border-t border-border bg-muted/10 p-8 sm:px-12 flex items-center justify-between">
              <p className="text-xs text-muted-foreground font-mono uppercase tracking-[0.2em]">
                System Archive // verified execution
              </p>
              <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                G-INTEL PROTOCOL v1.2
              </div>
            </footer>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
