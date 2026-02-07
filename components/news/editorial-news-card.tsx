"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
// import { NewsItem } from '@/lib/types' // Assuming type exists, using any for now to be safe until integrated

interface EditorialNewsCardProps {
  news: any
  featured?: boolean
}

export function EditorialNewsCard({ news, featured = false }: EditorialNewsCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    
    if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`
    }
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }

  return (
    <article className={cn("group relative flex flex-col gap-2", featured ? "mb-12" : "mb-8")}>
      {/* Meta Row */}
      <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
        <span className="text-primary font-bold">{news.source || "RCG WIRE"}</span>
        <span>•</span>
        <span>{formatDate(news.published_at)}</span>
        {news.category && (
            <>
                <span>•</span>
                <span>{news.category}</span>
            </>
        )}
      </div>

      {/* Main Content */}
      <Link href={`/news/${news.slug}`} className="block group-hover:opacity-80 transition-opacity">
        <h2 className={cn(
            "font-serif text-foreground leading-tight group-hover:underline decoration-1 underline-offset-4",
            featured ? "text-3xl sm:text-4xl font-bold mb-3" : "text-xl font-semibold mb-2"
        )}>
          {news.title}
        </h2>
        
        <p className={cn(
            "text-muted-foreground leading-relaxed",
            featured ? "text-lg line-clamp-3" : "text-sm line-clamp-2"
        )}>
          {news.summary || news.content?.substring(0, 150) + "..."}
        </p>
      </Link>
    </article>
  )
}
