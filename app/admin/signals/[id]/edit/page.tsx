import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { SignalForm } from "@/components/admin/signals/signal-form"
import { Signal } from "@/lib/types"

interface EditSignalPageProps {
  params: Promise<{ id: string }>
}

export default async function EditSignalPage({ params }: EditSignalPageProps) {
  const { id } = await params
  
  const supabase = await createClient()
  const { data: signal, error } = await supabase
    .from("signals")
    .select("*")
    .eq("id", id)
    .single()

  if (error || !signal) {
    notFound()
  }

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
            <h1 className="font-serif text-3xl font-semibold tracking-tight">Edit Trading Signal</h1>
         </div>
      </div>

      <SignalForm initialData={signal as Signal} />
    </div>
  )
}

