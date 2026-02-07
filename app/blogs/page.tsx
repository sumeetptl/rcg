import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getBlogs } from "@/lib/services/blogs"
import { BlogViewContainer } from "@/components/blogs/blog-view-container"
import { MostReadBlogs } from "@/components/blogs/most-read-blogs"
import { BlogShortcuts } from "@/components/blogs/blog-shortcuts"
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
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
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
        </section>
      </main>

      <Footer />
    </div>
  )
}
