"use client"

import React from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { SignalForm } from "@/components/admin/signals/signal-form"

export default function NewSignalPage() {
  const router = useRouter()

  return (
    <div className="mx-auto max-w-4xl p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
         <div className="flex flex-col gap-1">
            <Link
            href="/admin/signals"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-2"
            >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Signals
            </Link>
            <h1 className="font-serif text-3xl font-semibold tracking-tight">New Trading Signal</h1>
         </div>
         <div className="flex gap-3">
            <Button variant="outline" onClick={() => router.back()}>
                Cancel
            </Button>
         </div>
      </div>

      <SignalForm />
    </div>
  )
}

