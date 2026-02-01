"use client"

import { motion } from "framer-motion"
import { Brain, Radio, ShieldCheck } from "lucide-react"

const pillars = [
  {
    title: "Research & Analysis",
    description: "Multi-timeframe market structure, context-first trade planning, and bias-setup-execution logic.",
    icon: Brain,
  },
  {
    title: "Signals Infrastructure",
    description: "Structured entries, exits, and invalidations with historical performance tracking.",
    icon: Radio,
  },
  {
    title: "Risk & Discipline",
    description: "Capital preservation mindset with no overtrading and explicit risk disclosure.",
    icon: ShieldCheck,
  },
]

export function PlatformPillars() {
  return (
    <section className="py-24 px-4 border-y border-border/50 bg-muted/20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-3">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8, ease: "easeOut" }}
              className="group relative rounded-2xl border border-border bg-card p-8 shadow-sm transition-all hover:shadow-md hover:scale-[1.01]"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/5 text-primary transition-colors group-hover:bg-primary/10">
                <pillar.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-semibold tracking-tight">{pillar.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{pillar.description}</p>
              
              {/* Inner divider animation on hover */}
              <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-border to-transparent transition-all duration-500 group-hover:via-primary/30" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
