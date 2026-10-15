import { getSignals } from "@/lib/services/signals"
import { AdminPageHeader } from "@/components/admin/page-header"
import { SignalsTable } from "@/components/admin/signals/signals-table"
import type { Metadata } from "next"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BarChart3 } from "lucide-react"

export const metadata: Metadata = {
  title: "Manage Signals",
}

export default async function AdminSignalsPage() {
  const signals = await getSignals()

  return (
    <div className="min-h-screen bg-muted/10 p-6 lg:p-10">
      <AdminPageHeader 
        label="Trading Operations"
        heading="Signal Management" 
        text="Monitor and manage all trading signals across the platform."
        action={{
            label: "New Signal",
            href: "/admin/signals/new"
        }}
      >
        <Button variant="outline" size="sm" asChild className="border-border/80 shadow-xs">
          <Link href="/admin/signals/performance">
            <BarChart3 className="mr-2 h-3.5 w-3.5 text-primary" />
            Performance Report
          </Link>
        </Button>
      </AdminPageHeader>
      <SignalsTable initialData={signals} />
    </div>
  )
}

