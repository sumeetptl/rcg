"use client"

import { motion } from "framer-motion"
import { 
  BarChart3, 
  Brain, 
  Newspaper, 
  CalendarDays, 
  BookOpen, 
  ChevronRight,
  Lock,
  X,
  Instagram,

  Send,
  Unlock,
  ArrowUpRight
} from "lucide-react"
import Link from "next/link"

// 1. Social Links - Unlocked
const socialLinks = [

  { icon: X, label: "X", href: "https://twitter.com/therealcryptog_", subtext: "@therealcryptog_" },
  { icon: Send, label: "Telegram Community", href: "https://t.me/therealcryptog_official", subtext: "Join the discussion" },
  { icon: Instagram, label: "Instagram", href: "https://instagram.com/therealcrypto_g", subtext: "@therealcrypto_g" },
]

// 2. Public Resources - Unlocked (News, Blogs, Calendar)
const publicLinks = [
  { icon: Newspaper, label: "News Portal", href: "/news", subtext: "Live crypto updates" },
  { icon: BookOpen, label: "Blogs & Insights", href: "/blogs", subtext: "Deep dive research" },
  { icon: CalendarDays, label: "Economic Calendar", href: "/economic-calendar", subtext: "Key macro events" },
]

// 3. Platform Links - Locked (Market Data, Signals)
const platformLinks = [
  { icon: BarChart3, label: "Market Data Dashboard", href: "/market-data" },
  { icon: Brain, label: "Trading Signals", href: "/signals" },
]

export function LinkStack({ onLoginClick }: { onLoginClick?: () => void }) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  const cardBaseClass = "flex items-center justify-between p-4 rounded-xl bg-white/60 dark:bg-white/5 border border-black/5 dark:border-white/5 backdrop-blur-md hover:bg-white/80 dark:hover:bg-white/10 hover:border-black/10 dark:hover:border-white/10 hover:-translate-y-1 transition-all duration-300 group shadow-sm"
  const iconBaseClass = "p-2.5 rounded-lg bg-primary/5 dark:bg-white/5 group-hover:bg-primary/10 dark:group-hover:bg-white/10 transition-colors text-primary dark:text-white"

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="w-full max-w-md mx-auto px-4 pb-12"
    >
      {/* 2. Public Intelligence (Unlocked) */}
      <div className="mb-8">
        <motion.h3 variants={item} className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60 pl-1 mb-3">
          Public Intelligence
        </motion.h3>
        
        <div className="space-y-3">
          {publicLinks.map((link) => (
            <motion.div key={link.label} variants={item}>
              <Link 
                href={link.href}
                className={cardBaseClass}
              >
                <div className="flex items-center gap-4">
                  <div className={iconBaseClass}>
                    <link.icon className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-foreground/90">{link.label}</span>
                    <span className="text-xs text-muted-foreground group-hover:text-foreground/70 transition-colors">{link.subtext}</span>
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-muted-foreground opacity-50 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

       {/* 1. Social Profiles (Unlocked) */}
       <div className="mb-8">
        <motion.h3 variants={item} className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60 pl-1 mb-3">
          Connect
        </motion.h3>
        
        <div className="space-y-3">
          {socialLinks.map((link) => (
            <motion.div key={link.label} variants={item}>
              <Link 
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cardBaseClass}
              >
                <div className="flex items-center gap-4">
                  <div className={iconBaseClass}>
                    <link.icon className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-foreground/90">{link.label}</span>
                    <span className="text-xs text-muted-foreground group-hover:text-foreground/70 transition-colors">{link.subtext}</span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 3. Platform Access (Locked) */}
      <div className="mb-8">
        <motion.div variants={item} className="flex items-center justify-between pl-1 mb-3">
           <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">
            Exclusive Access
          </h3>
          <span className="text-[10px] font-bold tracking-wide bg-primary/10 text-primary px-2 py-0.5 rounded-full border border-primary/20">
            WAITLIST
          </span>
        </motion.div>

        <div className="space-y-2">
          {platformLinks.map((link) => (
            <motion.div key={link.label} variants={item}>
              <button 
                onClick={onLoginClick}
                className="w-full flex items-center justify-between p-3 rounded-lg bg-black/5 dark:bg-white/[0.02] border border-transparent hover:border-primary/20 hover:bg-primary/5 transition-all duration-300 group shadow-none cursor-pointer text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-md text-muted-foreground/70 group-hover:text-primary transition-colors">
                    <link.icon className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                    {link.label}
                  </span>
                </div>
                <Lock className="w-3.5 h-3.5 text-muted-foreground/40 group-hover:text-primary/70 transition-colors" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Login Link */}
      <motion.div variants={item} className="flex justify-center">
        <Link 
          href="/auth/login"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 group"
        >
           Already have access? <span className="underline underline-offset-4 decoration-muted-foreground/30 group-hover:decoration-primary/50">Login here</span>
        </Link>
      </motion.div>

    </motion.div>
  )
}
