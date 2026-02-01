"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe, Lightbulb, ShieldCheck } from "lucide-react"

const practicalAnalysis = [
  {
    title: "Market Context",
    description: "Every analysis begins with a high-timeframe objective review. We define the current market regime, identifying major pivot points and narrative drivers before looking for specific setups.",
    icon: Globe,
    label: "PHASE 01"
  },
  {
    title: "Trade Logic",
    description: "Setup identification is purely systematic. We utilize a proprietary technical framework to identify confluence between order flow, volume profile, and structural liquidity.",
    icon: Lightbulb,
    label: "PHASE 02"
  },
  {
    title: "Risk Framing",
    description: "We define failure before success. Every trade comes with explicit invalidation zones and position sizing recommendations designed for long-term capital preservation.",
    icon: ShieldCheck,
    label: "PHASE 03"
  },
]

export function AnalysisPhilosophy() {
  return (
    <section className="py-24 px-4 bg-background">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
            Analysis Methodology
          </div>
          <h2 className="font-serif text-3xl font-medium sm:text-4xl">Practical Analysis Delivery</h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Our research is structured to provide clarity in high-volatility environments. 
            We avoid emotional forecasting in favor of repeatable, data-driven frameworks.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {practicalAnalysis.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
            >
              <Card className="h-full overflow-hidden border border-border bg-card shadow-none transition-all hover:border-primary/20">
                <CardContent className="p-6">
                  <div className="flex flex-col gap-4">
                    <span className="text-[10px] font-bold tracking-[0.2em] text-muted-foreground">
                      {item.label}
                    </span>
                    <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-primary/5 text-primary">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl font-semibold tracking-tight">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        {/* Supporting text note */}
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-sm text-muted-foreground italic"
        >
          * All research is archived and accessible for historical auditing.
        </motion.p>
      </div>
    </section>
  )
}
