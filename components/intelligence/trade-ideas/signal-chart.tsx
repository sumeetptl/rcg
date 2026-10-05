"use client";

import React, { useEffect, useRef, useState } from "react";
import { createChart, ColorType, IChartApi, ISeriesApi, CandlestickData, CandlestickSeries } from "lightweight-charts";
import { Signal } from "@/lib/types";
import { Loader2, ZoomIn, ZoomOut, RefreshCw } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

const TIMEFRAMES = [
  { label: "1m", value: "1m" },
  { label: "5m", value: "5m" },
  { label: "15m", value: "15m" },
  { label: "1H", value: "1h" },
  { label: "4H", value: "4h" },
  { label: "1D", value: "1d" },
  { label: "1W", value: "1w" },
];

interface SignalChartProps {
  signal: Signal;
}

export function SignalChart({ signal }: SignalChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [interval, setInterval] = useState("4h");
  const [reloadKey, setReloadKey] = useState(0);
  const { theme, systemTheme } = useTheme();
  
  const chartRef = useRef<IChartApi | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const currentTheme = theme === "system" ? systemTheme : theme;
    const isDark = currentTheme === "dark";

    const chartOptions = {
      layout: {
        textColor: isDark ? "#d1d5db" : "#374151",
        background: { type: ColorType.Solid, color: "transparent" },
      },
      grid: {
        vertLines: { color: isDark ? "#374151" : "#e5e7eb" },
        horzLines: { color: isDark ? "#374151" : "#e5e7eb" },
      },
      crosshair: {
        mode: 0, // Normal mode
      },
      rightPriceScale: {
        borderColor: isDark ? "#374151" : "#e5e7eb",
      },
      timeScale: {
        borderColor: isDark ? "#374151" : "#e5e7eb",
        timeVisible: true,
      },
      width: chartContainerRef.current.clientWidth,
      height: 400,
    };

    const chart = createChart(chartContainerRef.current, chartOptions);
    chartRef.current = chart;

    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      upColor: "#10b981",
      downColor: "#ef4444",
      borderVisible: false,
      wickUpColor: "#10b981",
      wickDownColor: "#ef4444",
    });

    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth });
      }
    };

    window.addEventListener("resize", handleResize);

    const loadData = async () => {
      try {
        setLoading(true);
        // Normalize symbol format (e.g. "BTC" -> "BTCUSDT")
        let symbol = signal.asset.toUpperCase();
        if (!symbol.endsWith("USDT")) {
            symbol += "USDT";
        }
        
        const response = await fetch(`https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=500`);
        
        if (!response.ok) {
            throw new Error("Failed to fetch market data");
        }
        
        const data = await response.json();
        
        const formattedData: CandlestickData[] = data.map((d: any) => ({
            time: d[0] / 1000,
            open: parseFloat(d[1]),
            high: parseFloat(d[2]),
            low: parseFloat(d[3]),
            close: parseFloat(d[4]),
        }));

        candlestickSeries.setData(formattedData);

        // Add Signal Markings (Entry, Stop Loss, Targets)
        const isLong = signal.direction.toUpperCase() === "LONG";
        
        // Entry Price
        if (signal.entry_price) {
            candlestickSeries.createPriceLine({
                price: signal.entry_price,
                color: isDark ? "#60a5fa" : "#3b82f6", // Blue
                lineWidth: 2,
                lineStyle: 2, // Dashed
                axisLabelVisible: true,
                title: "ENTRY",
            });
        }

        // Stop Loss
        if (signal.stop_loss) {
            candlestickSeries.createPriceLine({
                price: signal.stop_loss,
                color: "#ef4444", // Red
                lineWidth: 2,
                lineStyle: 1, // Dotted
                axisLabelVisible: true,
                title: "SL",
            });
        }

        // Targets
        const targetColor = "#10b981"; // Green
        
        if (signal.target_1) {
            candlestickSeries.createPriceLine({
                price: signal.target_1,
                color: targetColor,
                lineWidth: 2,
                lineStyle: 2,
                axisLabelVisible: true,
                title: "TP1",
            });
        }
        if (signal.target_2) {
            candlestickSeries.createPriceLine({
                price: signal.target_2,
                color: targetColor,
                lineWidth: 2,
                lineStyle: 2,
                axisLabelVisible: true,
                title: "TP2",
            });
        }
        if (signal.target_3) {
            candlestickSeries.createPriceLine({
                price: signal.target_3,
                color: targetColor,
                lineWidth: 2,
                lineStyle: 2,
                axisLabelVisible: true,
                title: "TP3",
            });
        }
        
        // Set default zoom to show the most recent 100 candles instead of all 500
        chart.timeScale().setVisibleLogicalRange({
          from: Math.max(0, formattedData.length - 100),
          to: formattedData.length - 1,
        });
      } catch (err: any) {
        console.error("Chart data error:", err);
        setError("Chart data currently unavailable for this asset.");
      } finally {
        setLoading(false);
      }
    };

    loadData();

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [signal, theme, systemTheme, interval, reloadKey]);

  const handleZoomIn = () => {
    if (!chartRef.current) return;
    const timeScale = chartRef.current.timeScale();
    const logicalRange = timeScale.getVisibleLogicalRange();
    if (logicalRange) {
      const len = logicalRange.to - logicalRange.from;
      const newLen = len * 0.8;
      const center = logicalRange.from + len / 2;
      timeScale.setVisibleLogicalRange({
        from: center - newLen / 2,
        to: center + newLen / 2,
      });
    }
  };

  const handleZoomOut = () => {
    if (!chartRef.current) return;
    const timeScale = chartRef.current.timeScale();
    const logicalRange = timeScale.getVisibleLogicalRange();
    if (logicalRange) {
      const len = logicalRange.to - logicalRange.from;
      const newLen = len * 1.25;
      const center = logicalRange.from + len / 2;
      timeScale.setVisibleLogicalRange({
        from: center - newLen / 2,
        to: center + newLen / 2,
      });
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {TIMEFRAMES.map((tf) => (
            <Button
              key={tf.value}
              variant={interval === tf.value ? "default" : "outline"}
              size="sm"
              onClick={() => setInterval(tf.value)}
              className="h-7 text-xs font-mono"
            >
              {tf.label}
            </Button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleZoomOut}
            className="h-7 w-7 p-0"
            title="Zoom Out"
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleZoomIn}
            className="h-7 w-7 p-0"
            title="Zoom In"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setReloadKey(k => k + 1)}
            className="h-7 w-7 p-0"
            title="Reload Chart"
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>
      <div className="relative w-full h-[400px] bg-background border border-border rounded-lg overflow-hidden">
        {loading && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-background/50 backdrop-blur-sm">
          <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
          <p className="text-sm text-muted-foreground font-mono">Loading chart data...</p>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/90">
          <p className="text-sm text-muted-foreground font-mono bg-muted px-4 py-2 rounded-md">{error}</p>
        </div>
      )}
      <div ref={chartContainerRef} className="absolute inset-0" />
      </div>
    </div>
  );
}
