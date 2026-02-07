"use client"

import Link from "next/link"
import {  Bookmark, TrendingUp, BookOpen, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

const SHORTCUTS = [
  {
    label: "Trading Strategies",
    icon: TrendingUp,
    href: "/blogs?category=Strategy"
  },
  {
    label: "Market Analysis",
    icon: Zap,
    href: "/blogs?category=Analysis"
  },
  {
    label: "Educational Guides",
    icon: BookOpen,
    href: "/blogs?category=Tutorial"
  },
  {
    label: "My Saved Articles",
    icon: Bookmark,
    href: "/profile?tab=saved"
  }
]

export function BlogShortcuts() {
  return (
    <div className="space-y-4">
      <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
        Shortcuts
      </h3>
      <div className="grid gap-2">
        {SHORTCUTS.map((item) => (
          <Link key={item.label} href={item.href}>
            <Button variant="ghost" className="w-full justify-start gap-3 h-auto py-2 px-3 font-normal text-muted-foreground hover:text-foreground hover:bg-muted/50">
               <item.icon className="h-4 w-4" />
               {item.label}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  )
}
