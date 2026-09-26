"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe, Lightbulb, ShieldCheck } from "lucide-react"

const practicalAnalysis = [
  {
    title: "Research",
    description: "Understand markets through structured analysis. We define the current market regime, identifying major pivot points and narrative drivers.",
    icon: Globe,
    label: "PILLAR 01"
  },
  {
    title: "Strategy",
    description: "Translate insights into defined approaches. We utilize a systematic framework to identify confluence between order flow, volume profile, and liquidity.",
    icon: Lightbulb,
    label: "PILLAR 02"
  },
  {
    title: "Conviction",
    description: "Build informed decisions with clear assumptions. Every thesis comes with explicit invalidation zones and risk frameworks for capital preservation.",
    icon: ShieldCheck,
    label: "PILLAR 03"
  },
]

export function AnalysisPhilosophy() {
  return (
    <section className="py-24 px-4 bg-background">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
            Our Philosophy
          </div>
          <h2 className="font-serif text-3xl font-medium sm:text-4xl">Structured Information Over Noise</h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Our approach is built on clear frameworks. We prioritize research over hype, strategy over impulsive execution, and risk awareness over overconfidence.
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
