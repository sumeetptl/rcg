import { ReactNode } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { createClient } from "@/lib/supabase/server"

interface LegalLayoutProps {
  children: ReactNode
  title: string
  subtitle: string
  lastUpdated: string
}

export async function LegalLayout({ children, title, subtitle, lastUpdated }: LegalLayoutProps) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header isAuthenticated={!!user} />
      
      <main className="flex-1 py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          {/* Editorial Header - Hardened */}
          <header className="mb-12 text-center sm:text-left border-b border-border pb-8">
            <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-foreground mb-4">
              {title}
            </h1>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed max-w-2xl">
              {subtitle}
            </p>
            <div className="flex items-center justify-center sm:justify-start gap-2 text-xs text-muted-foreground font-mono uppercase tracking-widest">
              <span>Last updated</span>
              <span className="w-0.5 h-0.5 bg-current rounded-full" />
              <span>{lastUpdated}</span>
            </div>
          </header>

          {/* Content Body - Dense & Formal */}
          <article className="prose prose-neutral dark:prose-invert max-w-none text-muted-foreground">
             {children}
          </article>
        </div>
      </main>

      <Footer />
    </div>
  )
}
