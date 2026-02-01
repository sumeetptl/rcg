import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, ArrowRight } from "lucide-react"
import { Blog } from "@/lib/types"

interface BlogCardProps {
  blog: Blog
  featured?: boolean
}

export function BlogCard({ blog, featured = false }: BlogCardProps) {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Draft"
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  if (featured) {
    return (
      <Link href={`/blogs/${blog.slug}`} className="group block">
        <Card className="overflow-hidden border-0 bg-transparent shadow-none">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-muted">
              {blog.cover_image ? (
                <Image
                  src={blog.cover_image || "/placeholder.svg"}
                  alt={blog.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <span className="font-serif text-4xl text-muted-foreground/30">RC</span>
                </div>
              )}
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2">
                {(blog.tags || []).slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs uppercase tracking-wider">
                    {tag}
                  </Badge>
                ))}
                {blog.is_premium && (
                  <Badge className="bg-primary text-primary-foreground">Premium</Badge>
                )}
              </div>
              <h2 className="mt-4 font-serif text-2xl font-semibold leading-tight text-balance transition-colors group-hover:text-primary md:text-3xl">
                {blog.title}
              </h2>
              {blog.excerpt && (
                <p className="mt-3 line-clamp-2 text-muted-foreground">{blog.excerpt}</p>
              )}
              <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {formatDate(blog.published_at)}
                </span>
                <span className="flex items-center gap-1 font-medium text-foreground transition-colors group-hover:text-primary">
                  Read more <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </div>
        </Card>
      </Link>
    )
  }

  return (
    <Link href={`/blogs/${blog.slug}`} className="group block">
      <Card className="h-full overflow-hidden transition-shadow hover:shadow-md">
        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
          {blog.cover_image ? (
            <Image
              src={blog.cover_image || "/placeholder.svg"}
              alt={blog.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <span className="font-serif text-3xl text-muted-foreground/30">RC</span>
            </div>
          )}
          {blog.is_premium && (
            <Badge className="absolute right-3 top-3 bg-primary text-primary-foreground">
              Premium
            </Badge>
          )}
        </div>
        <CardContent className="p-5">
          <div className="flex flex-wrap gap-2">
            {(blog.tags || []).slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs uppercase tracking-wider">
                {tag}
              </Badge>
            ))}
          </div>
          <h3 className="mt-3 font-serif text-lg font-semibold leading-snug text-balance transition-colors group-hover:text-primary">
            {blog.title}
          </h3>
          {blog.excerpt && (
            <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{blog.excerpt}</p>
          )}
          <p className="mt-4 flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            {formatDate(blog.published_at)}
          </p>
        </CardContent>
      </Card>
    </Link>
  )
}
