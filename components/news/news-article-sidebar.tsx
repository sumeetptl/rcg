"use client"

import Link from "next/link"
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react"

interface NewsArticleSidebarProps {
  category?: string
}

export function NewsArticleSidebar({ category = "Markets" }: NewsArticleSidebarProps) {
  return (
    <nav className="flex flex-col gap-8 text-sm">
      <Link 
        href="/news" 
        className="group flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        <span className="font-medium">Back to News</span>
      </Link>

      <div className="space-y-4 border-l border-border/40 pl-4">
         <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
            Section
         </div>
         <div className="font-serif font-bold text-foreground">
            {category}
         </div>
      </div>

      <div className="space-y-4 pt-4">
         <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
            Coverage
         </div>
         <div className="flex flex-col gap-3">
             <button className="flex items-center justify-between text-muted-foreground hover:text-foreground text-left transition-colors">
                <span>Previous Article</span>
                <ChevronLeft className="h-3 w-3" />
             </button>
             <button className="flex items-center justify-between text-muted-foreground hover:text-foreground text-left transition-colors">
                <span>Next Article</span>
                <ChevronRight className="h-3 w-3" />
             </button>
         </div>
      </div>
    </nav>
  )
}
