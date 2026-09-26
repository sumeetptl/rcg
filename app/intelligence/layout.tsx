import React from "react"
import { IntelligenceSubNav } from "@/components/layout/IntelligenceSubNav"
import { BreadcrumbNav } from "@/components/layout/BreadcrumbNav"

export default function IntelligenceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 mt-4">
        <BreadcrumbNav />
        <div className="mt-4 mb-6">
          <IntelligenceSubNav />
        </div>
      </div>
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6">
        {children}
      </main>
    </div>
  )
}
