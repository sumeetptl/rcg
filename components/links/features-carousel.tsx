"use client"

import { motion } from "framer-motion"
import { 
  BarChart2, 
  TrendingUp, 
  Flame, 
  Calendar, 
  Newspaper, 
  BrainCircuit, 
  Fish, 
  Activity 
} from "lucide-react"

const features = [
  { icon: BarChart2, label: "Live Market Data" },
  { icon: TrendingUp, label: "Smart Trading Signals" },
  { icon: Flame, label: "Liquidation Clusters" },
  { icon: Calendar, label: "Economic Calendar" },
  { icon: Newspaper, label: "Curated Crypto News" },
  { icon: BrainCircuit, label: "Strategy & Frameworks" },
  { icon: Fish, label: "Whale Tracking" },
  { icon: Activity, label: "Risk Analytics" },
]

export function FeaturesCarousel() {
  return (
    <div className="w-full relative overflow-hidden py-8 mask-gradient-x">
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />

      <motion.div
        className="flex gap-4 w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 40,
        }}
        whileHover={{ animationPlayState: "paused" }} // Note: Framer Motion handles pause differently, likely need a wrapper or use CSS if easy pause is needed. For now, continuous loop is fine, or simpler CSS animation.
        // Let's stick to Framer Motion but maybe basic CSS animation is smoother for infinite loop with pause?
        // Actually, let's use a duplicated list strategy for seamless loop.
      >
        {[...features, ...features].map((feature, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-5 py-3 rounded-lg bg-white/50 dark:bg-secondary/10 border border-black/5 dark:border-white/5 backdrop-blur-sm shadow-sm min-w-[200px] hover:translate-y-[-2px] hover:border-black/10 dark:hover:border-white/10 transition-all duration-300 group"
          >
            <feature.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
              {feature.label}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
