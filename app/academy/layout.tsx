import React from "react"
import { AcademySubNav } from "@/components/layout/AcademySubNav"
import { BreadcrumbNav } from "@/components/layout/BreadcrumbNav"

export default function AcademyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 mt-4">
        <BreadcrumbNav />
        <div className="mt-4 mb-6">
          <AcademySubNav />
        </div>
      </div>
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6">
        {children}
      </main>
    </div>
  )
}
