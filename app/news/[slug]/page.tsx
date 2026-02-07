import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { createClient } from "@/lib/supabase/server"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, ExternalLink, Lock } from "lucide-react"
import { NewsArticleLayout } from "@/components/news/news-article-layout"
import { NewsReadingProgress } from "@/components/news/news-reading-progress"
import type { Metadata } from "next"

interface NewsPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: NewsPageProps): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()

  const { data: news } = await supabase
    .from("news")
    .select("title, summary")
    .eq("slug", slug)
    .eq("status", "published")
    .single()

  if (!news) {
    return { title: "News Not Found" }
  }

  return {
    title: news.title,
    description: news.summary || undefined,
  }
}

export default async function NewsDetailPage({ params }: NewsPageProps) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: news } = await supabase
    .from("news")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single()

  if (!news) {
    notFound()
  }

  const { data: { user } } = await supabase.auth.getUser()
  const canViewPremium = !!user

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Just now"
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  // Calculate read time (approximate)
  const wordCount = news.content ? news.content.split(/\s+/).length : 0
  const readTime = Math.ceil(wordCount / 200)

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground selection:bg-primary/20">
      <NewsReadingProgress />
      <Header isAuthenticated={!!user} user={user} className="border-b border-border/40" />

      <main className="flex-1">
         <NewsArticleLayout category={news.category}>
            
            {/* Article Header */}
            <header className="mb-12">
               <div className="mb-6 flex items-center gap-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-primary">
                     {news.category || "General"}
                  </span>
                  {news.access_level === "premium" && (
                     <Badge className="bg-primary text-primary-foreground h-5 text-[10px] px-2">Premium</Badge>
                  )}
               </div>

               <h1 className="font-serif text-3xl font-semibold leading-tight text-balance sm:text-4xl lg:text-5xl text-foreground mb-8">
                  {news.title}
               </h1>

               <div className="flex flex-wrap items-center gap-6 text-xs font-bold uppercase tracking-widest text-muted-foreground border-y border-border/40 py-4">
                  <span className="text-foreground">
                     {news.source || "RCG Wire"}
                  </span>
                  <span className="flex items-center gap-2">
                     <Clock className="h-3 w-3" />
                     {formatDate(news.published_at)}
                  </span>
                  <span>
                     {readTime} min read
                  </span>
                  {news.source_url && (
                     <a
                        href={news.source_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-primary hover:underline ml-auto"
                     >
                        Source <ExternalLink className="ml-1 h-3 w-3" />
                     </a>
                  )}
               </div>
            </header>

            {/* Thumbnail (only if exists) */}
            {news.thumbnail && (
               <div className="relative mb-12 aspect-[2/1] w-full overflow-hidden rounded bg-muted border border-border/40 grayscale hover:grayscale-0 transition-all duration-700">
                  <Image
                     src={news.thumbnail}
                     alt={news.title}
                     fill
                     className="object-cover"
                     priority
                  />
               </div>
            )}

            {/* Article Body */}
            <div className="prose prose-neutral dark:prose-invert max-w-none 
               prose-headings:font-serif prose-headings:font-semibold prose-headings:text-foreground
               prose-p:text-lg prose-p:leading-relaxed prose-p:text-foreground/90
               prose-strong:font-bold prose-strong:text-foreground
               prose-blockquote:border-l-2 prose-blockquote:border-primary prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-muted-foreground
               prose-a:text-primary prose-a:no-underline hover:prose-a:underline
               selection:bg-primary/20
            "> 
               {/* Editorial Lede (first paragraph) - mocked styling via standard prose for now, but conceptually distinct */}
               {news.access_level === "premium" && !canViewPremium ? (
                  <div className="rounded border border-border bg-muted/30 p-12 text-center mt-8">
                     <Lock className="mx-auto h-8 w-8 text-muted-foreground mb-4" />
                     <h2 className="text-xl font-semibold font-serif mb-2">Institutional Access Required</h2>
                     <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                        This analysis is reserved for approved market participants. Authenticate to view full report.
                     </p>
                     <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Button asChild size="default" className="w-full sm:w-auto">
                           <Link href="/auth/sign-up">Request Access</Link>
                        </Button>
                        <Button variant="outline" asChild size="default" className="w-full sm:w-auto">
                           <Link href="/auth/login">Client Login</Link>
                        </Button>
                     </div>
                  </div>
               ) : (
                  <div dangerouslySetInnerHTML={{ __html: news.content || "" }} />
               )}
            </div>

            {/* "Why It Matters" Footer */}
            <div className="mt-16 rounded border border-border/60 bg-muted/20 p-8">
               <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Why It Matters</h3>
               <ul className="space-y-2 list-disc pl-4 text-sm font-medium text-foreground/80 marker:text-primary">
                  <li>Impacts institutional capital flow assumptions.</li>
                  <li>Suggests potential volatility expansion in related assets.</li>
                  <li>Aligns with broader regulatory enforcement trends.</li>
               </ul>
            </div>

         </NewsArticleLayout>
      </main>

      <Footer />
    </div>
  )
}
