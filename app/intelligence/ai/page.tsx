import { AIChatInterface } from "@/components/intelligence/ai/ai-chat-interface"
import { createClient } from "@/lib/supabase/server"
import { Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata = {
  title: "AI Market Analyst | CoinStaq Intelligence",
  description: "LLM-powered crypto market analyst",
}

export default async function AIPage() {
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

  if (!isPremium) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center h-[calc(100dvh-180px)]">
        <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
          <Lock className="h-10 w-10 text-primary" />
        </div>
        <h2 className="text-3xl font-serif font-bold tracking-tight mb-4">Premium AI Intelligence</h2>
        <p className="text-muted-foreground max-w-md mb-8">
          Unlock proprietary AI-driven chat insights and deep technical analytics. Upgrade your account to gain an edge.
        </p>
        <Button asChild size="lg" className="rounded-full px-8">
          <Link href={user ? "/profile" : "/auth/login"}>
            {user ? "Upgrade to Premium" : "Sign in to Access"}
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-[calc(100dvh-180px)] -mx-4 sm:-mx-6 -mb-24">
      <AIChatInterface />
    </div>
  )
}
