import React from "react"
import { TradeForm } from "@/components/dashboard/trades/trade-form"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function NewTradePage() {
  return (
    <div className="mx-auto max-w-5xl p-6 lg:p-8 space-y-8">
      <div className="flex flex-col gap-4">
        <Link 
          href="/dashboard/trades" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Trades
        </Link>
        <div className="flex flex-col gap-1">
          <h1 className="font-serif text-3xl font-semibold tracking-tight">Log a New Trade</h1>
          <p className="text-muted-foreground text-sm">
            Enter the details of your trade setup, execution, and review below.
          </p>
        </div>
      </div>
      
      <div className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-sm">
         <TradeForm />
      </div>
    </div>
  )
}
