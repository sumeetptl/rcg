import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { createClient } from "@/lib/supabase/server"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Clock, ExternalLink, Lock } from "lucide-react"
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
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header isAuthenticated={!!user} />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <div className="overflow-hidden rounded-lg border border-border bg-background">
            {/* Header section with category, title, and meta */}
            <header className="p-8 sm:p-12">
              <Link
                href="/news"
                className="mb-8 inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to News
              </Link>

              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className="text-xs uppercase tracking-wider">
                    {news.category}
                  </Badge>
                  {news.access_level === "premium" && (
                    <Badge className="bg-primary text-primary-foreground">Premium</Badge>
                  )}
                </div>
                
                <h1 className="font-serif text-3xl font-semibold leading-tight text-balance sm:text-4xl lg:text-5xl">
                  {news.title}
                </h1>
                
                {news.summary && (
                  <p className="text-xl text-muted-foreground leading-relaxed">{news.summary}</p>
                )}
                
                <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground font-medium uppercase tracking-wider">
                  <span className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {formatDate(news.published_at)}
                  </span>
                  {news.source && (
                    <span className="flex items-center gap-2">
                      Source: {news.source}
                      {news.source_url && (
                        <a
                          href={news.source_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-primary hover:underline"
                        >
                          <ExternalLink className="ml-1 h-3 w-3" />
                        </a>
                      )}
                    </span>
                  )}
                </div>
              </div>
            </header>

            <Separator />

            {/* Main content section (reading-focused) */}
            <div className="p-8 sm:p-12">
              {/* Thumbnail inside content for reading flow */}
              {news.thumbnail && (
                <div className="relative mb-12 aspect-[21/9] overflow-hidden rounded-lg bg-muted border border-border/40">
                  <Image
                    src={news.thumbnail || "/placeholder.svg"}
                    alt={news.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}

              <div className="mx-auto max-w-3xl">
                {news.access_level === "premium" && !canViewPremium ? (
                  <div className="rounded-lg border border-border bg-muted/30 p-12 text-center">
                    <Lock className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h2 className="mt-4 text-2xl font-semibold">Premium Content</h2>
                    <p className="mt-2 text-muted-foreground">
                      Sign in or create an account to access this premium news article.
                    </p>
                    <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                      <Button asChild size="lg" className="min-w-[140px]">
                        <Link href="/auth/sign-up">Get Started Free</Link>
                      </Button>
                      <Button variant="outline" asChild size="lg" className="min-w-[140px]">
                        <Link href="/auth/login">Sign In</Link>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-serif prose-headings:font-semibold prose-p:leading-relaxed prose-p:text-lg prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
                    <div dangerouslySetInnerHTML={{ __html: news.content || "" }} />
                  </div>
                )}
              </div>
            </div>

            {/* Optional footer/meta section */}
            <footer className="border-t border-border bg-muted/10 p-8 sm:px-12">
              <p className="text-sm text-muted-foreground italic font-serif">
                &copy; {new Date().getFullYear()} The Real Crypto G Intelligence. News Wire Service.
              </p>
            </footer>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
