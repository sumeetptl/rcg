import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/home/hero-section"
import { MarketTexture } from "@/components/home/market-texture"
import { PlatformPillars } from "@/components/home/platform-pillars"
import { PlatformPreview } from "@/components/home/platform-preview"
import { AnalysisPhilosophy } from "@/components/home/analysis-philosophy"
import { TransparencyMethodology } from "@/components/home/transparency-methodology"
import { StatsSection } from "@/components/home/stats-section"
import { ComparisonSection } from "@/components/home/comparison-section"
import { FinalCTA } from "@/components/home/final-cta"
import { createClient } from "@/lib/supabase/server"

export default async function HomePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  // Check if user is admin
  let isAdmin = false
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single()
    isAdmin = profile?.role === "admin"
  }

  return (
    <div className="relative flex min-h-screen flex-col">
      <Header 
        isAuthenticated={!!user} 
        isAdmin={isAdmin}
        className="fixed top-4 left-0 right-0" 
      />

      <main className="flex-1">
        {/* Background Texture for the entire top section */}
        <div className="relative">
          <MarketTexture />
          <HeroSection />
        </div>

        <PlatformPillars />
        <PlatformPreview />
        <AnalysisPhilosophy />
        <TransparencyMethodology />
        <StatsSection />
        <ComparisonSection />
        <FinalCTA />
      </main>

      <Footer />
    </div>
  )
}
