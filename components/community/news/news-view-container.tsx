"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Clock, ExternalLink } from "lucide-react"
import { News } from "@/lib/types"
import { cn } from "@/lib/utils"
import { NewsCard } from "@/components/news-card"

interface NewsViewContainerProps {
  news: News[]
}

export function NewsViewContainer({ news }: NewsViewContainerProps) {
  const searchParams = useSearchParams()
  const view = (searchParams.get("view") || "grid") as "grid" | "list" | "table"

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Just now"
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (view === "table") {
    return (
      <div className="overflow-hidden rounded-lg border border-border">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border bg-muted/30 text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Source</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {news.map((item) => (
              <tr key={item.id} className="group hover:bg-muted/10 transition-colors">
                <td className="px-6 py-4">
                  <Link href={`/news/${item.slug}`} className="flex flex-col gap-1">
                    <span className="font-serif text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                      {item.title}
                    </span>
                  </Link>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{item.source}</span>
                </td>
                <td className="px-6 py-4">
                  <Badge variant="outline" className="text-[10px] font-medium uppercase tracking-widest px-1.5 py-0 border-border/60">
                    {item.category}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-[11px] font-mono text-muted-foreground">
                  {formatDate(item.published_at)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  if (view === "list") {
    return (
      <div className="mx-auto max-w-5xl space-y-12">
        {news.map((item) => (
          <article key={item.id} className="group flex flex-col gap-4 border-b border-border pb-12 last:border-0">
            <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
              <div className="flex items-center gap-3">
                <span className="text-primary">{item.source}</span>
                <span>•</span>
                <span>{item.category}</span>
              </div>
              <span>{formatDate(item.published_at)}</span>
            </div>
            <Link href={`/news/${item.slug}`} className="block">
              <h2 className="font-serif text-2xl font-bold leading-tight group-hover:text-primary transition-colors sm:text-3xl">
                {item.title}
              </h2>
            </Link>
            <p className="text-muted-foreground text-base leading-relaxed line-clamp-2">
              {item.summary}
            </p>
            <div className="pt-2">
               <Link href={`/news/${item.slug}`} className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-2 hover:underline">
                 Verification Feed <ExternalLink className="h-3 w-3" />
               </Link>
            </div>
          </article>
        ))}
      </div>
    )
  }

  // Default Grid
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {news.map((item) => (
        <NewsCard key={item.id} news={item} />
      ))}
    </div>
  )
}
