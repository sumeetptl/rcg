import { createClient } from "@/lib/supabase/server"
import { News } from "@/lib/types"

export async function getNews(options: {
    publishedOnly?: boolean
    limit?: number
} = {}): Promise<News[]> {
    const supabase = await createClient()
    let query = supabase.from("news").select("*")

    if (options.publishedOnly) {
        query = query.eq("status", "published")
    }

    if (options.limit) {
        query = query.limit(options.limit)
    }

    query = query.order("published_at", { ascending: false })

    const { data, error } = await query

    if (error) {
        console.error("Error fetching news:", error)
        return []
    }

    return data as News[]
}

export async function getNewsStats(): Promise<Partial<News>[]> {
    const supabase = await createClient()
    const { data, error } = await supabase.from("news").select("id, status, created_at")
    if (error) return []
    return data as Partial<News>[]
}
