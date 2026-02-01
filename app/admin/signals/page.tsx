import { getSignals } from "@/lib/services/signals"
import { AdminPageHeader } from "@/components/admin/page-header"
import { SignalsTable } from "@/components/admin/signals/signals-table"
import type { Metadata } from "next"

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
      />
      <SignalsTable initialData={signals} />
    </div>
  )
}

