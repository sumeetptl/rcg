"use client"

import Link from "next/link"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Clock, ArrowRight, User } from "lucide-react"
import { Blog } from "@/lib/types"
import { cn } from "@/lib/utils"
import { BlogCard } from "@/components/blog-card"

interface BlogViewContainerProps {
  blogs: Blog[]
}

export function BlogViewContainer({ blogs }: BlogViewContainerProps) {
  const searchParams = useSearchParams()
  const view = (searchParams.get("view") || "grid") as "grid" | "list" | "table"

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Draft"
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  if (view === "table") {
    return (
      <div className="overflow-hidden rounded-lg border border-border">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border bg-muted/30 text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
              <th className="px-6 py-4">Article</th>
              <th className="px-6 py-4">Categories</th>
              <th className="px-6 py-4">Publish Date</th>
              <th className="px-6 py-4 text-right">Access</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {blogs.map((blog) => (
              <tr key={blog.id} className="group hover:bg-muted/10 transition-colors">
                <td className="px-6 py-4">
                  <Link href={`/blogs/${blog.slug}`} className="flex flex-col gap-1">
                    <span className="font-serif text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                      {blog.title}
                    </span>
                    <span className="text-[11px] text-muted-foreground line-clamp-1">{blog.excerpt}</span>
                  </Link>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {(blog.tags || []).slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="secondary" className="px-1.5 py-0 text-[10px] font-medium uppercase tracking-tighter">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 text-xs font-mono text-muted-foreground">
                  {formatDate(blog.published_at)}
                </td>
                <td className="px-6 py-4 text-right">
                  <Badge variant={blog.access_level === 'premium' ? 'default' : 'outline'} className="text-[9px] uppercase tracking-widest font-bold">
                    {blog.access_level}
                  </Badge>
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
      <div className="mx-auto max-w-5xl space-y-16">
        {blogs.map((blog) => (
          <article key={blog.id} className="group flex flex-col sm:flex-row gap-8 items-start">
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-3 text-xs text-muted-foreground font-medium uppercase tracking-wider">
                <span className="text-primary font-bold">RESEARCH ARTICLE</span>
                <span>•</span>
                <span>{formatDate(blog.published_at)}</span>
              </div>
              <Link href={`/blogs/${blog.slug}`} className="block">
                <h2 className="font-serif text-2xl font-bold leading-tight group-hover:text-primary transition-colors sm:text-3xl">
                  {blog.title}
                </h2>
              </Link>
              <p className="text-muted-foreground text-sm leading-relaxed sm:text-base">
                {blog.excerpt}
              </p>
              <div className="flex items-center justify-between pt-4">
                <div className="flex items-center gap-6">
                  {(blog.tags || []).slice(0, 2).map((tag) => (
                    <span key={tag} className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">{tag}</span>
                  ))}
                </div>
                {blog.access_level === "premium" && (
                   <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">PREMIUM</Badge>
                )}
              </div>
            </div>
            <Link href={`/blogs/${blog.slug}`} className="relative h-44 w-full sm:w-64 flex-shrink-0 overflow-hidden rounded-md border border-border bg-muted">
              {blog.cover_image ? (
                <Image
                  src={blog.cover_image}
                  alt={blog.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full items-center justify-center font-serif text-2xl text-muted-foreground/20">RCG</div>
              )}
            </Link>
          </article>
        ))}
      </div>
    )
  }

  // Default Grid
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  )
}
