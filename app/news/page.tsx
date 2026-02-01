import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { NewsCard } from "@/components/news-card"
import { createClient } from "@/lib/supabase/server"
import { Badge } from "@/components/ui/badge"
import { ContentViewSwitcher } from "@/components/content-view-switcher"
import { NewsViewContainer } from "@/components/news/news-view-container"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "News",
  description: "Latest cryptocurrency news, market updates, and industry developments.",
}

const categories = ["All", "Bitcoin", "Ethereum", "Altcoins", "DeFi", "NFT", "Regulation"]

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams
  const supabase = await createClient()

  let query = supabase
    .from("news")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false })

  if (category && category !== "All") {
    query = query.eq("category", category)
  }

  const { data: news } = await query

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Header */}
        <section className="border-b border-border bg-muted/30 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
             <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1 className="font-serif text-4xl font-semibold tracking-tight">Market Intelligence</h1>
                <p className="mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed">
                  Real-time validation and reporting on high-impact events across the digital asset ecosystem.
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
                  href={cat === "All" ? "/news" : `/news?category=${encodeURIComponent(cat)}`}
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

        {/* News Section */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
             <NewsViewContainer news={news || []} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
