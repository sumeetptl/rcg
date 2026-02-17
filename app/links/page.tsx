"use client"

import { useState } from "react"
import { BackgroundLayer } from "@/components/links/background-layer"
import { HeroSection } from "@/components/links/hero-section"
import { FeaturesCarousel } from "@/components/links/features-carousel"
import { LinkStack } from "@/components/links/link-stack"
import { WaitlistDialog } from "@/components/links/waitlist-dialog"
import { Footer } from "@/components/links/footer"

import { ThemeToggle } from "@/components/theme-toggle"

export default function LinksPage() {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false)

  return (
    <main className="min-h-screen w-full relative flex flex-col items-center overflow-x-hidden selection:bg-primary/20 selection:text-primary">
      {/* Background System */}
      <BackgroundLayer />

      {/* Theme Toggle (Top Right) */}
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <div className="w-full flex-1 flex flex-col items-center relative z-10 pt-8 sm:pt-12">
        {/* Hero Section */}
        <HeroSection onJoinWaitlist={() => setIsWaitlistOpen(true)} />

        {/* Features Carousel */}
        <div className="w-full max-w-4xl mb-12">
          <FeaturesCarousel />
        </div>

        {/* Main Links */}
        <LinkStack onLoginClick={() => setIsWaitlistOpen(true)} />
      </div>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <WaitlistDialog 
        open={isWaitlistOpen} 
        onOpenChange={setIsWaitlistOpen} 
      />
    </main>
  )
}
