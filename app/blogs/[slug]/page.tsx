
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { createClient } from "@/lib/supabase/server"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Clock, Lock } from "lucide-react"
import type { Metadata } from "next"
import { MostReadBlogs } from "@/components/blogs/most-read-blogs"

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
  const canViewPremium = !!user

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
      <Header isAuthenticated={!!user} />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 lg:gap-12">
            
            {/* Main Article Content */}
            <div className="min-w-0">
              <div className="overflow-hidden rounded-lg border border-border bg-background">
                {/* Header section with category, title, and meta */}
                <header className="p-8 sm:p-12">
                  <Link
                    href="/blogs"
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
                      <p className="text-xl text-muted-foreground leading-relaxed">{blog.excerpt}</p>
                    )}
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground font-medium uppercase tracking-wider">
                      <span className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {formatDate(blog.published_at)}
                      </span>
                    </div>
                  </div>
                </header>

                <Separator />

                {/* Main content section (reading-focused) */}
                <div className="p-8 sm:p-12">
                  {/* Cover Image inside content for reading flow */}
                  {blog.cover_image && (
                    <div className="relative mb-12 aspect-[21/9] overflow-hidden rounded-lg bg-muted border border-border/40">
                      <Image
                        src={blog.cover_image || "/placeholder.svg"}
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
                      <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-serif prose-headings:font-semibold prose-p:leading-relaxed prose-p:text-lg prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
                        <div dangerouslySetInnerHTML={{ __html: blog.content || "" }} />
                      </div>
                    )}
                  </div>
                </div>

                {/* Optional footer/meta section */}
                <footer className="border-t border-border bg-muted/10 p-8 sm:px-12">
                  <p className="text-sm text-muted-foreground italic font-serif">
                    &copy; {new Date().getFullYear()} The Real Crypto G Research. All rights reserved.
                  </p>
                </footer>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-8">
               <div className="sticky top-24">
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
