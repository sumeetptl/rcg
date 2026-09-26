import React from "react"
import { IntelligenceSubNav } from "@/components/layout/IntelligenceSubNav"
import { BreadcrumbNav } from "@/components/layout/BreadcrumbNav"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function IntelligenceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let isPremium = false

  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("plan, role")
      .eq("id", user.id)
      .single()

    isPremium = profile?.plan === "premium" || profile?.role === "admin"
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 mt-4">
        <BreadcrumbNav />
        <div className="mt-4 mb-6">
          <IntelligenceSubNav />
        </div>
      </div>
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 pb-24">
        {isPremium ? (
          children
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <Lock className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-3xl font-serif font-bold tracking-tight mb-4">Premium Intelligence</h2>
            <p className="text-muted-foreground max-w-md mb-8">
              Unlock proprietary institutional signals, AI-driven chat insights, and deep technical analytics. Upgrade your account to gain an edge.
            </p>
            <Button asChild size="lg" className="rounded-full px-8">
              <Link href={user ? "/profile" : "/auth/login"}>
                {user ? "Upgrade to Premium" : "Sign in to Access"}
              </Link>
            </Button>
          </div>
        )}
      </main>
    </div>
  )
}
