"use server"

import { createClient as createSupabaseAdmin } from "@supabase/supabase-js"
import { revalidatePath } from "next/cache"
import { fetchMarketDerivatives, MarketBriefingDataset } from "@/lib/services/market-briefing-data"
import { generateMarketBriefing, GeneratedBriefingDraft } from "@/lib/services/market-briefing-agent"

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

export async function fetchLiveDerivativesAction(timeframe: 'daily' | 'weekly' = 'weekly'): Promise<{
  success: boolean
  data?: MarketBriefingDataset
  error?: string
}> {
  try {
    const data = await fetchMarketDerivatives(timeframe)
    return { success: true, data }
  } catch (err: any) {
    return { success: false, error: err?.message || 'Failed to fetch derivatives data' }
  }
}

export async function generateBriefingDraftAction(options: {
  timeframe: 'daily' | 'weekly'
  focusAsset?: string
  apiKey?: string
}): Promise<{
  success: boolean
  draft?: GeneratedBriefingDraft
  error?: string
}> {
  try {
    const dataset = await fetchMarketDerivatives(options.timeframe)
    const draft = await generateMarketBriefing(dataset, {
      apiKey: options.apiKey,
      focusAsset: options.focusAsset,
    })
    return { success: true, draft }
  } catch (err: any) {
    return { success: false, error: err?.message || 'Failed to generate briefing draft' }
  }
}

export async function saveBriefingDraftToBlogsAction(draft: {
  title: string
  slug: string
  excerpt: string
  content: string
  tags?: string[]
  access_level?: 'public' | 'free' | 'premium'
  status?: 'draft' | 'published'
}): Promise<{
  success: boolean
  blogId?: string
  slug?: string
  error?: string
}> {
  try {
    const supabase = getAdminClient()
    
    // Check if slug exists; if so, make unique
    let finalSlug = draft.slug
    const { data: existing } = await supabase
      .from("blogs")
      .select("id")
      .eq("slug", finalSlug)
      .maybeSingle()

    if (existing) {
      finalSlug = `${draft.slug}-${Date.now().toString().slice(-4)}`
    }

    const payload = {
      title: draft.title,
      slug: finalSlug,
      excerpt: draft.excerpt || null,
      content: draft.content,
      tags: draft.tags || ["Analysis", "Market Update", "Derivatives"],
      access_level: draft.access_level || "public",
      status: draft.status || "draft",
      published_at: draft.status === "published" ? new Date().toISOString() : null,
    }

    const { data, error } = await supabase
      .from("blogs")
      .insert([payload])
      .select("id, slug")
      .single()

    if (error) {
      throw new Error(error.message)
    }

    revalidatePath("/admin/blogs")
    revalidatePath("/academy/blogs")

    return {
      success: true,
      blogId: data.id,
      slug: data.slug,
    }
  } catch (err: any) {
    return { success: false, error: err?.message || 'Failed to save blog draft' }
  }
}
