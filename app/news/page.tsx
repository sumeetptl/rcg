import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { createClient } from "@/lib/supabase/server"
import { BreakingNewsBar } from "@/components/news/breaking-news-bar"
import { NewsLayout } from "@/components/news/news-layout"
import { EditorialNewsCard } from "@/components/news/editorial-news-card"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "News",
  description: "Institutional market intelligence and technical reporting.",
}

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let query = supabase
    .from("news")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false })

  if (category && category !== "All") {
    query = query.eq("category", category)
  }

  const { data: news } = await query
  const featuredNews = news?.[0]
  const standardNews = news?.slice(1) || []

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground selection:bg-primary/20">
      <BreakingNewsBar />
      <Header isAuthenticated={!!user} user={user} className="border-b border-border/40" />

      <NewsLayout>
        {/* Feed Header */}
        <div className="mb-8 border-b border-border pb-6">
            <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground">
                {category || "Global Wire"}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground font-mono uppercase tracking-widest">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
        </div>

        {/* Featured Story */}
        {featuredNews && (
            <div className="mb-12 pb-12 border-b border-border">
                <EditorialNewsCard news={featuredNews} featured={true} />
            </div>
        )}

        {/* Standard Feed */}
        <div className="space-y-4">
            {standardNews.map((item: any) => (
                <EditorialNewsCard key={item.id} news={item} />
            ))}
            {(!news || news.length === 0) && (
                <div className="py-12 text-center text-muted-foreground">
                    No reports filed in this sector.
                </div>
            )}
        </div>
      </NewsLayout>

      <Footer />
    </div>
  )
}
