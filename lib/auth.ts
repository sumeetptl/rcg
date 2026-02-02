import { createClient } from "@/lib/supabase/server"
import { cache } from "react"

export const getUser = cache(async () => {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return user
})

export const getProfile = cache(async () => {
  const supabase = await createClient()
  const user = await getUser()
  
  if (!user) return null

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()
    
  return profile
})

export const isAdmin = cache(async () => {
  const profile = await getProfile()
  return profile?.role === "admin"
})
