"use client"

import { motion } from "framer-motion"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function PlatformPreview() {
  return (
    <section className="py-24 px-4 overflow-hidden">
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
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-6 w-48" />
                  </div>
                  <Badge variant="outline" className="h-6 px-3">Live Feed</Badge>
                </div>

                {/* Signal Card Mock */}
                <Card className="border-border/60 bg-muted/5">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded bg-primary/10" />
                      <Skeleton className="h-5 w-24" />
                    </div>
                    <Badge className="bg-signal-long/20 text-signal-long border-signal-long/30">LONG</Badge>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-4">
                    <div className="grid grid-cols-3 gap-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="space-y-2">
                          <Skeleton className="h-3 w-12" />
                          <Skeleton className="h-5 w-16" />
                        </div>
                      ))}
                    </div>
                    <Skeleton className="h-20 w-full" />
                  </CardContent>
                </Card>

                {/* Metrics Bar Mock */}
                <div className="grid grid-cols-4 gap-4 pt-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="space-y-2 text-center">
                      <div className="mx-auto h-2 w-12 rounded bg-muted" />
                      <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 1 + i * 0.1 }}
                        className="text-sm font-mono font-medium"
                      >
                        {i === 1 ? "84.2%" : i === 2 ? "12.4x" : i === 3 ? "2.14" : "98"}
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
