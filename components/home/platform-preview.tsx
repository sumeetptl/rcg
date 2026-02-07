"use client"

import { motion } from "framer-motion"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function PlatformPreview() {
  return (
    <section className="py-16 px-4 overflow-hidden md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="font-serif text-3xl font-medium sm:text-4xl">Live Platform Preview</h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Experience the interface designed for professional analysis. Our platform provides a high-density, 
              low-noise environment that prioritizes critical information over decorative hype.
            </p>
            <div className="mt-8 space-y-4">
              {["Signal Details", "Analysis Articles", "Real-time Metrics"].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            {/* Mock UI Preview */}
            <div className="rounded-xl border border-border bg-background p-4 shadow-2xl sm:p-8">
              <div className="space-y-6">
                {/* Header Mock */}
                <div className="flex items-center justify-between border-b border-border pb-6">
                  <div className="space-y-1">
                    <h3 className="font-mono text-lg font-bold tracking-tight">BTC/USDT Perpetual</h3>
                    <p className="text-sm text-muted-foreground">Bitcoin - Tether US</p>
                  </div>
                  <Badge variant="outline" className="h-6 px-3 gap-1.5 border-green-500/20 bg-green-500/5 text-green-500">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    Live Feed
                  </Badge>
                </div>

                {/* Signal Card Mock */}
                <Card className="border-border/60 bg-muted/5">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500 font-bold text-xs ring-1 ring-orange-500/20">
                        BTC
                      </div>
                      <span className="font-bold text-sm">Bitcoin</span>
                    </div>
                    <Badge className="bg-green-500/10 text-green-500 border-green-500/20 hover:bg-green-500/20">LONG</Badge>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Entry</p>
                        <p className="text-sm font-mono font-medium">$44,250</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Target</p>
                        <p className="text-sm font-mono font-medium text-green-500">$45,800</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Stop</p>
                        <p className="text-sm font-mono font-medium text-red-500">$43,500</p>
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50 border border-border/50 text-xs text-muted-foreground leading-relaxed">
                      Bullish divergence on 4H RSI coupled with increasing volume delta confirms strength. Key support held at $43.8k.
                    </div>
                  </CardContent>
                </Card>

                {/* Metrics Bar Mock */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border sm:grid-cols-4">
                  {[
                    { label: "Win Rate", value: "84.2%" },
                    { label: "Avg R:R", value: "1:2.4" },
                    { label: "Profit Factor", value: "2.14" },
                    { label: "Active", value: "12" }
                  ].map((metric, i) => (
                    <div key={i} className="space-y-1 text-center">
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{metric.label}</p>
                      <motion.div 
                        initial={{ opacity: 0, y: 5 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                        className="text-sm font-mono font-medium"
                      >
                        {metric.value}
                      </motion.div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -right-4 -top-4 -z-10 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
            <div className="absolute -bottom-4 -left-4 -z-10 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
