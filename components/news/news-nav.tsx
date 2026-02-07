"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"

const CATEGORIES = [
  { id: "All", label: "All News" },
  { id: "Markets", label: "Markets" },
  { id: "Regulation", label: "Regulation" },
  { id: "On-chain", label: "On-chain" },
  { id: "Institutions", label: "Institutions" },
  { id: "ETFs", label: "ETFs" },
  { id: "Macro", label: "Macro" },
  { id: "Opinion", label: "Opinion" },
]

export function NewsNav() {
  const searchParams = useSearchParams()
  const currentCategory = searchParams.get("category") || "All"

  return (
    <nav className="space-y-1">
      <div className="mb-4 px-3 text-xs font-bold uppercase tracking-widest text-muted-foreground/60">
        Sections
      </div>
      {CATEGORIES.map((category) => {
        const isActive = currentCategory === category.id || (!searchParams.get("category") && category.id === "All")
        
        return (
          <Link
            key={category.id}
            href={category.id === "All" ? "/news" : `/news?category=${encodeURIComponent(category.id)}`}
            className={cn(
              "group flex items-center border-l-2 px-3 py-2 text-sm font-medium transition-colors hover:bg-muted/50",
              isActive
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
            )}
          >
            {category.label}
          </Link>
        )
      })}
    </nav>
  )
}
