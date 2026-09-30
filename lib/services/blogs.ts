import { createClient } from "@/lib/supabase/server"
import { createClient as createSupabaseAdmin } from "@supabase/supabase-js"
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

// ADMIN FUNCTIONS (Bypass RLS)
function getAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Missing Supabase admin environment variables.")
  }
  return createSupabaseAdmin(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}

export async function getAdminBlogs(): Promise<Blog[]> {
  const supabase = getAdminClient()
  const { data, error } = await supabase.from("blogs").select("*").order("created_at", { ascending: false })
  
  if (error) {
    console.error("Error fetching admin blogs:", error)
    return []
  }
  
  return (data || []).map(blog => ({
    ...blog,
    tags: blog.tags || []
  })) as Blog[]
}

export async function getAdminBlogStats(): Promise<Partial<Blog>[]> {
    const supabase = getAdminClient()
    const { data, error } = await supabase.from("blogs").select("id, status, created_at, title, slug")
    if (error) return []
    return data as Partial<Blog>[]
}
