import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { getSignals } from "@/lib/services/signals"
import { AdminPageHeader } from "@/components/admin/page-header"
import { PerformanceReportView } from "@/components/admin/signals/performance-report-view"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Signals Performance Report | Admin",
  description: "Audited trade performance analytics and downloadable institutional reports across 1 Day, 1 Week, and 1 Month.",
}

export default async function PerformanceReportPage() {
  const signals = await getSignals()

  return (
    <div className="min-h-screen bg-muted/10 p-6 lg:p-10 space-y-6">
      <AdminPageHeader
        label="Trading Operations"
        heading="Performance Report"
        text="Audited signal execution statistics, strike rates, and downloadable visual reports for 1 Day, 1 Week, and 1 Month horizons."
      >
        <Button variant="outline" size="sm" asChild>
          <Link href="/admin/signals">
            <ArrowLeft className="mr-2 h-3.5 w-3.5" />
            Back to Signals
          </Link>
        </Button>
      </AdminPageHeader>

      <PerformanceReportView signals={signals} />
    </div>
  )
}
