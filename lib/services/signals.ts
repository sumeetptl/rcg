import { createClient } from "@/lib/supabase/server"
import { Signal } from "@/lib/types"

export async function getSignals(options: {
    status?: string
    limit?: number
} = {}): Promise<Signal[]> {
    const supabase = await createClient()
    let query = supabase.from("signals").select("*")

    if (options.status) {
        query = query.eq("status", options.status)
    }

    if (options.limit) {
        query = query.limit(options.limit)
    }

    query = query.order("created_at", { ascending: false })

    const { data, error } = await query

    if (error) {
        console.error("Error fetching signals:", error)
        return []
    }

    return data as Signal[]
}

export async function getSignalStats(): Promise<Partial<Signal>[]> {
    const supabase = await createClient()
    const { data, error } = await supabase.from("signals").select("id, status, result, created_at, asset")
    if (error) return []
    return data as unknown as Partial<Signal>[]
}
