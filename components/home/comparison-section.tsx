"use client"

import { motion } from "framer-motion"
import { Check, X } from "lucide-react"

export function ComparisonSection() {
  return (
    <section className="py-16 px-4 bg-muted/30 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* This is for... */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="rounded-3xl border border-border bg-background p-8 sm:p-12"
          >
            <h3 className="text-2xl font-serif font-medium mb-8">This is for</h3>
            <ul className="space-y-6">
              {[
                { title: "Serious Traders", desc: "For those who view trading as a skill and a business, not a hobby." },
                { title: "Process-Driven Thinkers", desc: "Traders who value the logic behind a setup more than the outcome." },
                { title: "Long-term Skill Builders", desc: "Users focused on developing their own analytical edge over time." }
              ].map((item, i) => (
                <li key={i} className="flex gap-4">
                  <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <Check className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-semibold tracking-tight">{item.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* This is NOT for... */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-3xl border border-border bg-background p-8 sm:p-12"
          >
            <h3 className="text-2xl font-serif font-medium mb-8">This is NOT for</h3>
            <ul className="space-y-6">
              {[
                { title: "Get-Rich-Quick Seekers", desc: "If you're looking for 'moon' signals or overnight wealth, look elsewhere." },
                { title: "Blind Copy Traders", desc: "We provide research, not financial advice. Taking trades without understanding is discouraged." },
                { title: "Gambling Mindsets", desc: "High leverage, revenge trading, and emotional decision-making are not supported here." }
              ].map((item, i) => (
                <li key={i} className="flex gap-4 opacity-70">
                  <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                    <X className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-semibold tracking-tight">{item.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
