import { createClient } from "@/lib/supabase/server"
import { Badge } from "@/components/ui/badge"
import { BlogViewContainer } from "@/components/blogs/blog-view-container"
import { MostReadBlogs } from "@/components/blogs/most-read-blogs"
import { BlogShortcuts } from "@/components/blogs/blog-shortcuts"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Analysis & Insights",
}

const categories = ["All", "Analysis", "Tutorial", "Market Update", "Strategy"]

export default async function DashboardBlogsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams
  const supabase = await createClient()

  let query = supabase
    .from("blogs")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false })

  if (category && category !== "All") {
    query = query.contains("tags", [category])
  }

  const { data: blogs } = await query

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:border-x lg:border-border/40 lg:min-h-screen">
      {/* Calm Header */}
      <header className="mb-10 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="font-serif text-3xl font-medium tracking-tight text-foreground">Analysis & Insights</h1>
          <p className="text-muted-foreground text-sm font-medium">
            In-depth market research, trading strategies, and educational content.
          </p>
        </div>
      </header>

      {/* Category Filter */}
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <a
            key={cat}
            href={cat === "All" ? "/dashboard/blogs" : `/dashboard/blogs?category=${encodeURIComponent(cat)}`}
          >
            <Badge
              variant={(!category && cat === "All") || category === cat ? "default" : "outline"}
              className="cursor-pointer transition-colors px-3 py-1 font-medium uppercase tracking-tighter"
            >
              {cat}
            </Badge>
          </a>
        ))}
      </div>

       <div className="pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8 lg:gap-12">
             
             {/* Left Sidebar (Shortcuts) */}
             <aside className="hidden lg:block space-y-8 pt-2">
                <BlogShortcuts />
             </aside>

             {/* Main Content */}
             <div className="min-w-0">
                <BlogViewContainer blogs={blogs || []} />
             </div>

          </div>
       </div>
    </div>
  )
}
