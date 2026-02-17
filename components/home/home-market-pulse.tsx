"use client"

import Link from "next/link"
import { ArrowRight, Flame, Waves, Coins, Scale, BarChart2, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function HomeMarketPulse() {
  const features = [
    {
      title: "Liquidation Heatmaps",
      description: "Visualise high-leverage clusters and predict price magnet zones with precision.",
      icon: <Flame className="h-8 w-8 text-primary" />
    },
    {
      title: "Orderflow Analysis",
      description: "Track institutional buying and selling pressure in real-time across major exchanges.",
      icon: <Waves className="h-8 w-8 text-primary" />
    },
    {
      title: "Global Funding Rates",
      description: "Monitor leverage bias and sentiment shifts to anticipate market moves.",
      icon: <Coins className="h-8 w-8 text-primary" />
    },
    {
      title: "Long/Short Ratios",
      description: "Analyse trader positioning and sentiment skew to identify contrarian opportunities.",
      icon: <Scale className="h-8 w-8 text-primary" />
    },
    {
      title: "Volume Delta",
      description: "Spot hidden accumulation and distribution patterns before price reacts.",
      icon: <BarChart2 className="h-8 w-8 text-primary" />
    },
    {
      title: "Open Interest",
      description: "Track capital flows entering or leaving the market to gauge trend strength.",
      icon: <TrendingUp className="h-8 w-8 text-primary" />
    }
  ]

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10 mb-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
             <Badge variant="outline" className="w-fit text-primary border-primary/20 bg-primary/5">
                Market Data
             </Badge>
             <h2 className="text-3xl md:text-4xl font-serif font-bold tracking-tight">
               Live Market Intelligence
             </h2>
             <p className="text-lg text-muted-foreground">
               Real-time institutional grade data, liquidations, and economic events. Now available directly on the platform.
             </p>
          </div>
          <Button asChild variant="outline" className="group">
             <Link href="/market-data">
               Explore Market Data <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
             </Link>
          </Button>
        </div>
      </div>

      {/* Auto-Scroll Carousel */}
      <div className="relative flex overflow-hidden w-full">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
        
        <motion.div 
          className="flex gap-6 py-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            duration: 40, 
            ease: "linear", 
            repeat: Infinity 
          }}
        >
          {[...features, ...features].map((feature, index) => (
            <div 
              key={index}
              className="flex-shrink-0 w-[300px] sm:w-[350px] p-6 rounded-xl border border-border bg-card shadow-sm"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
      
      {/* Decorative Gradients (Subtle) */}
      <div className="absolute top-0 right-0 -transtale-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
    </section>
  )
}
