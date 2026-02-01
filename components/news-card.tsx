import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, ExternalLink } from "lucide-react"
import { News } from "@/lib/types"

interface NewsCardProps {
  news: News
  compact?: boolean
}

export function NewsCard({ news, compact = false }: NewsCardProps) {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Just now"
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffHours < 1) return "Just now"
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }

  if (compact) {
    return (
      <Link href={`/news/${news.slug}`} className="group block">
        <article className="flex gap-4 py-4">
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-[10px] uppercase tracking-wider">
                {news.category}
              </Badge>
              {news.is_premium && (
                <Badge className="bg-primary px-1.5 py-0 text-[10px] text-primary-foreground">
                  Premium
                </Badge>
              )}
            </div>
            <h3 className="line-clamp-2 font-medium leading-snug transition-colors group-hover:text-primary">
              {news.title}
            </h3>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>{formatDate(news.published_at)}</span>
              {news.source && (
                <>
                  <span className="text-border">|</span>
                  <span>{news.source}</span>
                </>
              )}
            </div>
          </div>
          {news.thumbnail && (
            <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
              <Image
                src={news.thumbnail || "/placeholder.svg"}
                alt={news.title}
                fill
                className="object-cover"
              />
            </div>
          )}
        </article>
      </Link>
    )
  }

  return (
    <Link href={`/news/${news.slug}`} className="group block">
      <Card className="h-full overflow-hidden transition-shadow hover:shadow-md">
        {news.thumbnail && (
          <div className="relative aspect-[16/9] overflow-hidden bg-muted">
            <Image
              src={news.thumbnail || "/placeholder.svg"}
              alt={news.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {news.is_premium && (
              <Badge className="absolute right-3 top-3 bg-primary text-primary-foreground">
                Premium
              </Badge>
            )}
          </div>
        )}
        <CardContent className={news.thumbnail ? "p-5" : "p-5 pt-5"}>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs uppercase tracking-wider">
              {news.category}
            </Badge>
            {!news.thumbnail && news.is_premium && (
              <Badge className="bg-primary text-primary-foreground">Premium</Badge>
            )}
          </div>
          <h3 className="mt-3 line-clamp-2 font-semibold leading-snug transition-colors group-hover:text-primary">
            {news.title}
          </h3>
          {news.summary && (
            <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{news.summary}</p>
          )}
          <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {formatDate(news.published_at)}
            </span>
            {news.source && (
              <span className="flex items-center gap-1">
                {news.source}
                {news.source_url && <ExternalLink className="h-3 w-3" />}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
