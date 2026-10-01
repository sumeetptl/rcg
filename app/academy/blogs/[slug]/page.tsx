
import { notFound, redirect } from "next/navigation"
import { CloudinaryImage } from "@/components/cloudinary-image"
import Link from "next/link"
import { Footer } from "@/components/footer"
import { createClient } from "@/lib/supabase/server"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Clock, Lock, BookOpen, Share2 } from "lucide-react"
import type { Metadata } from "next"
import { MostReadBlogs } from "@/components/academy/blogs/most-read-blogs"
import { ReadingProgressBar } from "@/components/academy/blogs/reading-progress-bar"
import { TableOfContents } from "@/components/academy/blogs/table-of-contents"

interface BlogPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()

  const { data: blog } = await supabase
    .from("blogs")
    .select("title, excerpt")
    .eq("slug", slug)
    .eq("status", "published")
    .single()

  if (!blog) {
    return { title: "Blog Not Found" }
  }

  return {
    title: blog.title,
    description: blog.excerpt || undefined,
  }
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: blog } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single()

  if (!blog) {
    notFound()
  }

  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect("/auth/login")
  }

  const canViewPremium = true // All logged in users can read blogs

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Draft"
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <ReadingProgressBar />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 lg:gap-12">
            
            {/* Main Article Content */}
            <div className="min-w-0">
              <div className="overflow-hidden rounded-lg border border-border bg-background">
                {/* Header section with category, title, and meta */}
                <header className="p-8 sm:p-12">
                  <Link
                    href="/academy/blogs"
                    className="mb-8 inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Blog
                  </Link>

                  <div className="space-y-6">
                    <div className="flex flex-wrap items-center gap-2">
                      {(blog.tags || []).map((tag: string) => (
                        <Badge key={tag} variant="secondary" className="text-xs uppercase tracking-wider">
                          {tag}
                        </Badge>
                      ))}
                      {blog.access_level === "premium" && (
                        <Badge className="bg-primary text-primary-foreground">Premium</Badge>
                      )}
                    </div>
                    
                    <h1 className="font-serif text-3xl font-semibold leading-tight text-balance sm:text-4xl lg:text-5xl">
                      {blog.title}
                    </h1>
                    
                    {blog.excerpt && (
                      <p className="text-xl text-muted-foreground leading-relaxed border-l-4 border-primary/30 pl-5 py-1 italic">{blog.excerpt}</p>
                    )}
                    
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-2 font-mono uppercase tracking-wider text-xs">
                          <Clock className="h-3.5 w-3.5" />
                          {formatDate(blog.published_at)}
                        </span>
                        {blog.reading_time && (
                          <span className="flex items-center gap-2 font-mono uppercase tracking-wider text-xs">
                            <BookOpen className="h-3.5 w-3.5" />
                            {blog.reading_time} min read
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </header>

                <Separator />

                {/* Main content section (reading-focused) */}
                <div className="p-8 sm:p-12">
                  {/* Cover Image inside content for reading flow */}
                  {blog.cover_image && (
                    <div className="relative mb-12 aspect-video overflow-hidden rounded-lg bg-muted border border-border/40">
                      <CloudinaryImage
                        src={blog.cover_image}
                        alt={blog.title}
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                  )}

                  <div className="mx-auto max-w-3xl">
                    {blog.access_level === "premium" && !canViewPremium ? (
                      <div className="rounded-lg border border-border bg-muted/30 p-12 text-center">
                        <Lock className="mx-auto h-12 w-12 text-muted-foreground" />
                        <h2 className="mt-4 text-2xl font-semibold">Premium Content</h2>
                        <p className="mt-2 text-muted-foreground">
                          Sign in or create an account to access this premium article.
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
                      <div
                        className="article-content prose prose-neutral dark:prose-invert max-w-none
                          prose-headings:font-serif prose-headings:font-semibold prose-headings:tracking-tight
                          prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
                          prose-h1:mt-10 prose-h1:mb-5 prose-h2:mt-8 prose-h2:mb-4 prose-h3:mt-6 prose-h3:mb-3
                          prose-p:text-base prose-p:leading-8 prose-p:text-foreground/90
                          prose-a:text-primary prose-a:no-underline prose-a:underline-offset-2 hover:prose-a:underline
                          prose-strong:text-foreground prose-strong:font-semibold
                          prose-code:bg-muted prose-code:rounded prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
                          prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-pre:rounded-lg
                          prose-blockquote:border-l-4 prose-blockquote:border-primary/40 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-muted-foreground prose-blockquote:not-italic
                          prose-img:rounded-lg prose-img:border prose-img:border-border
                          prose-hr:border-border
                          prose-table:border prose-table:border-border prose-th:bg-muted/50 prose-th:font-semibold prose-td:border-border prose-th:border-border
                          prose-li:leading-7
                        "
                      >
                        <div dangerouslySetInnerHTML={{ __html: blog.content || "" }} />
                      </div>
                    )}
                  </div>
                </div>

                {/* Optional footer/meta section */}
                <footer className="border-t border-border bg-muted/10 p-8 sm:px-12">
                  <p className="text-sm text-muted-foreground italic font-serif">
                    &copy; {new Date().getFullYear()} CoinStaq Research. All rights reserved.
                  </p>
                </footer>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-8">
               <div className="sticky top-24 space-y-8">
                  <TableOfContents contentSelector=".article-content" />
                  <Separator className="bg-border/40" />
                  <MostReadBlogs />
               </div>
            </aside>
            
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
