"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

// Mock data until we have real analytics
const MOST_READ_BLOGS = [
  {
    id: "mr-1",
    title: "Understanding Order Flow Imbalance",
    slug: "understanding-order-flow-imbalance",
    views: "2.4k"
  },
  {
    id: "mr-2",
    title: "The Role of Delta in Options Trading",
    slug: "role-of-delta-options-trading",
    views: "1.8k"
  },
  {
    id: "mr-3",
    title: "Market Structure Shifts in 2024",
    slug: "market-structure-shifts-2024",
    views: "1.5k"
  },
  {
    id: "mr-4",
    title: "Identifying Liquidity Traps",
    slug: "identifying-liquidity-traps",
    views: "1.2k"
  }
]

export function MostReadBlogs() {
  return (
    <div className="space-y-6">
      <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
        Most Read
      </h3>
      <div className="space-y-6">
        {MOST_READ_BLOGS.map((blog, index) => (
          <Link 
            key={blog.id}
            href={`/blogs/${blog.slug}`}
            className="group block space-y-2"
          >
            <div className="flex items-start justify-between gap-4">
               <span className="text-2xl font-bold text-muted-foreground/20 font-serif leading-none">
                  0{index + 1}
               </span>
               <h4 className="flex-1 font-medium leading-snug group-hover:text-primary transition-colors text-sm">
                  {blog.title}
               </h4>
            </div>
          </Link>
        ))}
      </div>
      
      <div className="pt-6 border-t border-border/40">
         <div className="rounded bg-muted/30 p-4 border border-border/40">
            <h4 className="text-xs font-bold uppercase tracking-wider mb-2 text-primary">
               Editor's Pick
            </h4>
            <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
               Deep dive into the mechanics of perpetual swap funding rates and their impact on price action.
            </p>
            <Link href="/blogs" className="text-xs font-bold uppercase tracking-wide flex items-center gap-1 hover:underline">
               Read Analysis <ArrowUpRight className="h-3 w-3" />
            </Link>
         </div>
      </div>
    </div>
  )
}
