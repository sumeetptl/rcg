"use client";
import React, { useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowUp, ArrowDown, Clock, Target, AlertTriangle, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Signal } from "@/lib/types";
import { CryptoLogo } from "@/components/crypto/crypto-logo";
import { toPng } from "html-to-image";
import { toast } from "sonner";
import { analyzeSignal } from "@/lib/signal-analytics";

interface SignalCardProps {
  signal: Signal;
  showAnalysis?: boolean | "compact";
  isPremium?: boolean;
}

export function SignalCard({ signal, showAnalysis = false, isPremium = false }: SignalCardProps) {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = React.useState(false);
  // Normalize direction to uppercase for comparison/display if schema stores lowercase
  const directionUpper = signal.direction.toUpperCase() as "LONG" | "SHORT";
  const isLong = directionUpper === "LONG";
  const isLocked = !isPremium && signal.access_level === "premium";
  const analytics = analyzeSignal(signal);
  const isUpdated = Boolean(
    signal.updated_at &&
    new Date(signal.updated_at).getTime() - new Date(signal.created_at).getTime() > 60000
  );

  // Map schema statuses to colors
  const statusColors: Record<string, string> = {
    draft: "bg-muted text-muted-foreground border-border",
    active: "bg-primary/10 text-primary border-primary/30",
    closed: "bg-muted text-muted-foreground border-border", // Generic closed
    cancelled: "bg-muted text-muted-foreground border-border",
    // Keep uppercase mapping just in case
    PENDING:
      "bg-signal-pending/20 text-signal-pending border-signal-pending/30",
    ACTIVE: "bg-primary/10 text-primary border-primary/30",
    HIT: "bg-signal-hit/20 text-signal-hit border-signal-hit/30",
    MISSED: "bg-signal-missed/20 text-signal-missed border-signal-missed/30",
    CANCELLED: "bg-muted text-muted-foreground border-border",
  };

  // Result colors
  const resultColors: Record<string, string> = {
    win: "text-signal-hit",
    loss: "text-signal-missed",
    breakeven: "text-muted-foreground",
  };

  const formatPrice = (price: number | null | undefined) => {
    if (price === undefined || price === null) return "-";
    return price < 1
      ? price.toFixed(6)
      : price.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleDownload = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!cardRef.current) return;
    
    try {
      setIsDownloading(true);
      // Temporarily add a class for watermark visibility if needed, or just let the faint one show
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2, // High quality
        style: {
          transform: 'scale(1)',
          borderRadius: '16px',
        }
      });
      
      const link = document.createElement('a');
      link.download = `CoinStaq-${signal.asset}-Signal.png`;
      link.href = dataUrl;
      link.click();
      toast.success("Signal card downloaded!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to download signal card.");
    } finally {
      setIsDownloading(false);
    }
  };

  const getPriceDisplay = (price: number | null | undefined) => {
    if (isLocked) return "$***.**";
    return `$${formatPrice(price)}`;
  };

  if (showAnalysis === "compact") {
    return (
      <div className="flex items-center justify-between rounded-lg border border-border bg-card p-3 transition-colors hover:bg-muted/50 relative overflow-hidden">
        {isLocked && (
          <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] z-10 flex items-center justify-center">
            <Link href="/profile" className="bg-background/90 border px-3 py-1 rounded-full flex items-center gap-2 shadow-sm hover:bg-muted transition-colors">
              <AlertTriangle className="h-3 w-3 text-amber-500" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Upgrade to View</span>
            </Link>
          </div>
        )}
        <div className="flex items-center gap-3">
          <CryptoLogo symbol={signal.asset} size={32} />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-sm">
                {signal.asset}
              </span>
              <Badge
                variant="outline"
                className={cn(
                  "h-5 px-1.5 text-[10px]",
                  statusColors[signal.status] || statusColors["active"],
                )}
              >
                {signal.status}
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className={cn(isLocked && "blur-sm")}>{isLocked ? "XXX" : directionUpper}</span>
              <span className={cn(isLocked && "blur-sm")}>@ {getPriceDisplay(signal.entry_price)}</span>
            </div>
          </div>
        </div>

        <div className="text-right">
          {isLocked ? (
             <span className="text-muted-foreground text-xs uppercase tracking-widest font-bold">Premium</span>
          ) : signal.result ? (
            <span
              className={cn(
                "font-mono font-bold text-sm uppercase",
                resultColors[signal.result],
              )}
            >
              {signal.result}
            </span>
          ) : (
            <span className="text-muted-foreground text-xs">Running...</span>
          )}
        </div>
      </div>
    );
  }

  return (
    <Link href={isLocked ? "/profile" : `/intelligence/trade-ideas/${signal.id}`} className="group block h-full">
      <Card ref={cardRef} className="relative h-full overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-md bg-card">
        {/* Lock Overlay */}
        {isLocked && (
          <div className="absolute inset-0 bg-background/40 backdrop-blur-[3px] z-20 flex flex-col items-center justify-center pointer-events-none">
            <div className="bg-background/90 border border-border px-5 py-3 rounded-full flex items-center gap-3 shadow-xl backdrop-blur-md pointer-events-auto hover:bg-muted transition-colors cursor-pointer">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              <div className="flex flex-col">
                <span className="text-xs font-bold uppercase tracking-widest text-foreground">Premium Signal</span>
                <span className="text-[10px] text-muted-foreground">Upgrade to view setup</span>
              </div>
            </div>
          </div>
        )}

        {/* Watermark */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.03] dark:opacity-[0.05] z-0 overflow-hidden">
           <span className="font-serif text-8xl font-black rotate-[-30deg] tracking-tighter whitespace-nowrap">COINSTAQ</span>
        </div>

        <div className="relative z-10 h-full flex flex-col">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CryptoLogo symbol={signal.asset} size={40} />
                <div>
                  <h3 className="font-mono text-lg font-semibold transition-colors group-hover:text-primary">
                    {signal.asset}
                  </h3>
                  <p
                    className={cn(
                      "text-sm font-medium",
                      isLocked ? "text-muted-foreground blur-sm select-none" : (isLong ? "text-signal-long" : "text-signal-short"),
                    )}
                  >
                    {isLocked ? "XXXXX" : directionUpper}
                  </p>
                </div>
              </div>
              <Badge
                variant="outline"
                className={cn(
                  "border",
                  statusColors[signal.status] || statusColors["active"],
                )}
              >
                {signal.status}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-4 flex-1 flex flex-col">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Entry</p>
                <p className={cn("font-mono font-medium", isLocked && "blur-sm select-none")}>
                  {getPriceDisplay(signal.entry_price)}
                </p>
              </div>
              <div>
                <p className="flex items-center gap-1 text-muted-foreground">
                  <AlertTriangle className="h-3 w-3" /> Stop Loss
                </p>
                <p className={cn("font-mono font-medium text-signal-short", isLocked && "blur-sm select-none text-muted-foreground")}>
                  {getPriceDisplay(signal.stop_loss)}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Target className="h-3 w-3" /> Targets
                </p>
                {analytics.achievedRoi && (
                  <span className="font-mono text-xs font-bold text-emerald-500">
                    Achieved: {analytics.achievedRoi}
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {analytics.targets.map((tp, idx) => (
                  <span
                    key={idx}
                    className={cn(
                      "rounded-md px-2 py-1 font-mono text-xs flex items-center gap-1.5 border transition-all",
                      tp.isHit
                        ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-500 font-semibold shadow-sm shadow-emerald-500/10"
                        : "border-border/60 bg-muted/40 text-muted-foreground",
                      isLocked && "blur-sm select-none bg-muted text-muted-foreground border-transparent"
                    )}
                  >
                    {tp.isHit && <span className="text-[10px] font-bold">✓</span>}
                    <span>{tp.label}:</span>
                    <span>{isLocked ? "XXXXX" : formatPrice(tp.price)}</span>
                    <span className={cn("text-[10px]", tp.isHit ? "text-emerald-400 font-bold" : "opacity-60")}>
                      ({tp.roi})
                    </span>
                  </span>
                ))}
              </div>
            </div>

            {signal.result && (
              <div className="rounded-lg bg-muted/50 p-3 flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Result</p>
                  <p
                    className={cn(
                      "font-mono text-base font-semibold uppercase",
                      resultColors[signal.result],
                    )}
                  >
                    {signal.result}
                  </p>
                </div>
                {(signal.achieved_roi !== null || analytics.achievedRoi) && (
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Realised ROI</p>
                    <p className="font-mono text-base font-bold text-emerald-500">
                      {signal.achieved_roi !== null ? `+${signal.achieved_roi}%` : analytics.achievedRoi}
                    </p>
                  </div>
                )}
              </div>
            )}

            {showAnalysis && signal.context && !isLocked && (
              <div className="border-t border-border pt-4">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {signal.context}
                </p>
              </div>
            )}
            
            {showAnalysis && signal.context && isLocked && (
              <div className="border-t border-border pt-4">
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded w-full animate-pulse" />
                  <div className="h-4 bg-muted rounded w-5/6 animate-pulse" />
                  <div className="h-4 bg-muted rounded w-4/6 animate-pulse" />
                </div>
              </div>
            )}

            <div className="mt-auto pt-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{formatDate(signal.created_at)}</span>
                </div>
                {isUpdated && (
                  <span className="text-[10px] font-mono text-primary/80 bg-primary/10 rounded px-1.5 py-0.5">
                    Updated {formatDate(signal.updated_at!)}
                  </span>
                )}
              </div>
              
              <button 
                 onClick={handleDownload}
                 disabled={isDownloading || isLocked}
                 className={cn("relative z-20 flex items-center justify-center p-1.5 rounded-md text-muted-foreground transition-colors cursor-pointer", isLocked ? "opacity-30 cursor-not-allowed" : "hover:bg-muted hover:text-foreground")}
                 title={isLocked ? "Unlock to Download" : "Download Signal Card"}
              >
                <Download className={cn("h-4 w-4", isDownloading && "animate-pulse opacity-50")} />
              </button>
            </div>
          </CardContent>
        </div>
      </Card>
    </Link>
  );
}
