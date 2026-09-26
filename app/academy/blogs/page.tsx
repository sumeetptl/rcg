import { Footer } from "@/components/footer"
import { getBlogs } from "@/lib/services/blogs"
import { BlogViewContainer } from "@/components/academy/blogs/blog-view-container"
import { MostReadBlogs } from "@/components/academy/blogs/most-read-blogs"
import { BlogShortcuts } from "@/components/academy/blogs/blog-shortcuts"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog",
  description: "In-depth crypto analysis, market research, and trading insights from CoinStaq.",
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

      <main className="flex-1">
        {/* Header */}
        <header className="mb-10 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between px-4 sm:px-6 mx-auto max-w-7xl">
          <div className="flex flex-col gap-2">
            <h1 className="font-serif text-3xl font-medium tracking-tight text-foreground">Technical Research</h1>
            <p className="text-muted-foreground text-sm font-medium">
              Deep-dive market analysis and institutional-grade trading insights from the RCG editorial board.
            </p>
          </div>
        </header>

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
