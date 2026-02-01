"use client"

import { motion, Variants } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"

export function HeroSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <section className="relative min-h-[80vh] px-4 pt-32 pb-20 overflow-hidden lg:pt-48">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left-aligned Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start text-left max-w-xl"
          >
            <motion.div 
              variants={itemVariants} 
              className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground"
            >
              Research & Analysis Platform
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="font-serif text-4xl font-medium leading-[1.15] tracking-tight sm:text-5xl md:text-6xl"
            >
              Institutional grade research for active crypto participants.
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="mt-6 text-lg leading-relaxed text-muted-foreground"
            >
              A focused environment providing data-driven market insights, transparent trade logic, and disciplined execution frameworks.
            </motion.p>

            <motion.div 
              variants={itemVariants} 
              className="mt-8 flex items-center gap-8"
            >
              <Link 
                href="/auth/login" 
                className="text-sm font-medium border-b border-foreground/30 pb-0.5 transition-colors hover:border-foreground"
              >
                Explore Platform
              </Link>
              <Link 
                href="/blogs" 
                className="text-sm font-medium border-b border-transparent text-muted-foreground pb-0.5 transition-colors hover:text-foreground hover:border-foreground/30"
              >
                View Methodology
              </Link>
            </motion.div>
          </motion.div>

          {/* Muted Product UI Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative hidden lg:block opacity-40 grayscale-[0.5] pointer-events-none select-none"
          >
            <div className="rounded-xl border border-border bg-background p-6 shadow-sm">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-border pb-4">
                  <div className="h-4 w-32 bg-muted rounded" />
                  <div className="h-4 w-12 bg-muted rounded" />
                </div>
                <div className="space-y-3">
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-[90%]" />
                  <Skeleton className="h-3 w-[95%]" />
                </div>
                <div className="pt-4 grid grid-cols-2 gap-4">
                  <div className="h-16 rounded bg-muted/50" />
                  <div className="h-16 rounded bg-muted/50" />
                </div>
              </div>
            </div>
            {/* Overlay to dim it further */}
            <div className="absolute inset-0 bg-background/10" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
