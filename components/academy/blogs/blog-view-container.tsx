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
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Draft"
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }
  // Enforce List View with Dividers
  return (
    <div className="mx-auto max-w-5xl">
      {blogs.map((blog) => (
        <article key={blog.id} className="group flex flex-col sm:flex-row gap-8 items-start py-12 border-b border-border last:border-0 first:pt-0">
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
