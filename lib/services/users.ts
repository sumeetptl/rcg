import { createClient } from "@/lib/supabase/server"
import { Profile } from "@/lib/types"

export async function getUserStats(): Promise<Partial<Profile>[]> {
    const supabase = await createClient()
    const { data, error } = await supabase.from("profiles").select("id, created_at")
    if (error) return []
    return data as Partial<Profile>[]
}

export async function getUsers(): Promise<Profile[]> {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false })
    
    if (error) return []
    return data as Profile[]
}
