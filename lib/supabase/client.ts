import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase project URL and Anon Key are missing. Check your Vercel Environment Variables.')
  }

  return createBrowserClient(
    supabaseUrl,
    supabaseAnonKey,
  )
}
