import React from "react"
import Link from "next/link"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TradesTable } from "@/components/dashboard/trades/trades-table"

export default function TradesPage() {
  return (
    <div className="mx-auto max-w-7xl p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
         <div className="flex flex-col gap-1">
            <h1 className="font-serif text-3xl font-semibold tracking-tight">Trade Journal</h1>
            <p className="text-muted-foreground text-sm mt-1">
                Manage, review, and export your trading history.
            </p>
         </div>
         <div className="flex gap-3">
            <Button asChild>
                <Link href="/dashboard/trades/new">
                    <Plus className="mr-2 h-4 w-4" />
                    Log New Trade
                </Link>
            </Button>
         </div>
      </div>

      <TradesTable />
    </div>
  )
}
