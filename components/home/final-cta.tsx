"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function FinalCTA() {
  return (
    <section className="relative py-32 px-4 overflow-hidden">
      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 10 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="font-serif text-4xl font-medium sm:text-5xl md:text-6xl tracking-tight">
            Trade less. <span className="text-muted-foreground">Think better.</span>
          </h2>
          <p className="mt-8 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto italic">
            "The goal is not to be right, but to be disciplined. 
            Join a platform that respects the process."
          </p>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="h-12 px-8" asChild>
              <Link href="/auth/login">Explore the Platform</Link>
            </Button>
            <Button variant="outline" size="lg" className="h-12 px-8" asChild>
              <Link href="/methodology">Read the Methodology</Link>
            </Button>
          </div>
        </motion.div>
      </div>
      
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]" />
    </section>
  )
}
