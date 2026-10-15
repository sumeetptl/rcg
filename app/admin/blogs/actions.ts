"use server"

import { createClient as createSupabaseAdmin } from "@supabase/supabase-js"
import { Blog } from "@/lib/types"
import { revalidatePath } from "next/cache"

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

export async function getAdminBlogById(id: string): Promise<Blog | null> {
  const supabase = getAdminClient()
  const { data, error } = await supabase.from("blogs").select("*").eq("id", id).single()
  if (error || !data) return null
  return data as Blog
}

export async function updateAdminBlog(id: string, updates: any) {
  const supabase = getAdminClient()
  const { error } = await supabase.from("blogs").update(updates).eq("id", id)
  if (error) throw new Error(error.message)
  revalidatePath("/admin/blogs")
  return { success: true }
}

export async function deleteAdminBlog(id: string) {
  const supabase = getAdminClient()
  const { error } = await supabase.from("blogs").delete().eq("id", id)
  if (error) throw new Error(error.message)
  revalidatePath("/admin/blogs")
  return { success: true }
}

export async function createAdminBlog(blogData: any) {
  const supabase = getAdminClient()
  const { error } = await supabase.from("blogs").insert([blogData])
  if (error) throw new Error(error.message)
  revalidatePath("/admin/blogs")
  return { success: true }
}
