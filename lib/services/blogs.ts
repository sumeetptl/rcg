import { createClient } from "@/lib/supabase/server"
import { Blog } from "@/lib/types"

export async function getBlogs(options: { 
  publishedOnly?: boolean 
  category?: string
  limit?: number
} = {}): Promise<Blog[]> {
  const supabase = await createClient()
  let query = supabase.from("blogs").select("*")

  if (options.publishedOnly) {
    query = query.eq("status", "published")
  }
  
  if (options.category && options.category !== "All") {
    query = query.contains("tags", [options.category])
  }

  if (options.limit) {
    query = query.limit(options.limit)
  }

  query = query.order("published_at", { ascending: false })

  const { data, error } = await query

  if (error) {
    console.error("Error fetching blogs:", error)
    return []
  }

  return (data || []).map(blog => ({
    ...blog,
    tags: blog.tags || []
  })) as Blog[]
}

export async function getBlogById(id: string): Promise<Blog | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("id", id)
    .single()

  if (error) return null
  return data as Blog
}

export async function getBlogStats(): Promise<Partial<Blog>[]> {
    const supabase = await createClient()
    const { data, error } = await supabase.from("blogs").select("id, status, created_at, title, slug")
    if (error) return []
    return data as Partial<Blog>[]
}
