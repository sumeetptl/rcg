"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button" // Assuming standard shadcn button exists
import { Lock } from "lucide-react"

export function HeroSection({ onJoinWaitlist }: { onJoinWaitlist?: () => void }) {
  return (
    <section className="flex flex-col items-center justify-center text-center py-12 px-4 relative z-10 w-full max-w-xl mx-auto">
      
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mb-8 relative w-20 h-20"
      >
        <div className="relative w-full h-full">
          <Image 
             src="/night-logo.png" 
             alt="The Real Crypto G" 
             fill 
             className="object-contain dark:opacity-100 opacity-0 transition-opacity duration-300 absolute inset-0"
             priority
          />
          <Image 
             src="/day-logo.png" 
             alt="The Real Crypto G" 
             fill 
             className="object-contain dark:opacity-0 opacity-100 transition-opacity duration-300 absolute inset-0"
             priority
          />
        </div>
        {/* 
        <Image 
           src="/night-logo.png" 
           alt="The Real Crypto G" 
           fill 
           className="object-contain dark:block hidden"
        />
        <Image 
           src="/day-logo.png" 
           alt="The Real Crypto G" 
           fill 
           className="object-contain dark:hidden block"
        /> 
        */}
      </motion.div>

      {/* Brand Title */}
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-3"
      >
        The Real Crypto G
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        className="text-muted-foreground text-lg md:text-xl font-medium max-w-md leading-relaxed mb-10"
      >
        Crypto signals, market data & macro intelligence.
        <br />
        <span className="text-muted-foreground/80 text-base">Built for disciplined traders.</span>
      </motion.p>

      {/* Primary CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
      >
        <Button
          onClick={onJoinWaitlist}
          size="lg"
          className="rounded-xl px-8 h-12 text-base font-medium shadow-lg hover:shadow-primary/20 transition-all duration-250 hover:scale-[1.03] active:scale-[0.98] group relative overflow-hidden"
        >
          <Lock className="w-4 h-4 mr-2 opacity-80" />
          Join Waitlist
          
          {/* Subtle pulse effect */}
          <span className="absolute inset-0 rounded-xl ring-2 ring-white/20 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </Button>
      </motion.div>

    </section>
  )
}
