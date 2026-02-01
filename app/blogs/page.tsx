import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BlogCard } from "@/components/blog-card"
import { getBlogs } from "@/lib/services/blogs"
import { Badge } from "@/components/ui/badge"
import { ContentViewSwitcher } from "@/components/content-view-switcher"
import { BlogViewContainer } from "@/components/blogs/blog-view-container"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog",
  description: "In-depth crypto analysis, market research, and trading insights from RealCryptoG.",
}

const categories = ["All", "Analysis", "Tutorial", "Market Update", "Strategy"]

export default async function BlogsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams
  
  const blogs = await getBlogs({ 
    category,
    publishedOnly: true 
  })

  const featuredBlog = blogs?.[0]
  const restBlogs = blogs?.slice(1) || []

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Header */}
        <section className="border-b border-border bg-muted/30 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1 className="font-serif text-4xl font-semibold tracking-tight">Technical Research</h1>
                <p className="mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed">
                  Deep-dive market analysis and institutional-grade trading insights from the RCG editorial board.
                </p>
              </div>
              <ContentViewSwitcher />
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="border-b border-border py-4">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <a
                  key={cat}
                  href={cat === "All" ? "/blogs" : `/blogs?category=${encodeURIComponent(cat)}`}
                >
                  <Badge
                    variant={(!category && cat === "All") || category === cat ? "default" : "outline"}
                    className="cursor-pointer transition-colors hover:bg-primary hover:text-primary-foreground font-medium uppercase tracking-tighter"
                  >
                    {cat}
                  </Badge>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <BlogViewContainer blogs={blogs || []} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
