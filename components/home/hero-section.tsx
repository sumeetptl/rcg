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
    <section className="relative min-h-[70vh] px-4 pt-24 pb-20 overflow-hidden lg:min-h-[80vh] lg:pt-48">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-center text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center text-center max-w-3xl"
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
              className="mt-6 text-lg leading-relaxed text-muted-foreground max-w-2xl mx-auto"
            >
              A focused environment providing data-driven market insights, transparent trade logic, and disciplined execution frameworks.
            </motion.p>

            <motion.div 
              variants={itemVariants} 
              className="mt-8 flex items-center justify-center gap-8"
            >
              <Link 
                href="/auth/login" 
                className="text-sm font-medium border-b border-foreground/30 pb-0.5 transition-colors hover:border-foreground"
              >
                Explore Platform
              </Link>
              <Link 
                href="/methodology" 
                className="text-sm font-medium border-b border-transparent text-muted-foreground pb-0.5 transition-colors hover:text-foreground hover:border-foreground/30"
              >
                View Methodology
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
