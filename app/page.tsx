import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/home/hero-section"
import { HomeMarketPulse } from "@/components/home/home-market-pulse"
import { MarketTexture } from "@/components/home/market-texture"
import { PlatformPreview } from "@/components/home/platform-preview"
import { AnalysisPhilosophy } from "@/components/home/analysis-philosophy"
import { TransparencyMethodology } from "@/components/home/transparency-methodology"
import { StatsSection } from "@/components/home/stats-section"
import { ComparisonSection } from "@/components/home/comparison-section"
import { FinalCTA } from "@/components/home/final-cta"
import { getUser, isAdmin } from "@/lib/auth"

export default async function HomePage() {
  const user = await getUser()
  const admin = await isAdmin()

  return (
    <div className="relative flex min-h-screen flex-col">
      <Header 
        isAuthenticated={!!user} 
        isAdmin={admin}
        user={user}
        className="fixed top-4 left-0 right-0" 
      />

      <main className="flex-1">
        {/* Background Texture for the entire top section */}
        <div className="relative">
          <MarketTexture />
          <HeroSection />
        </div>

        <HomeMarketPulse />
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
