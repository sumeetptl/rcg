"use server"

import { createClient } from "@supabase/supabase-js"
import { revalidatePath } from "next/cache"

export async function confirmUserEmail(userId: string) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set in environment variables.")
  }

  // Use the service role key to bypass RLS and perform admin actions
  const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })

  const { data, error } = await supabaseAdmin.auth.admin.updateUserById(userId, {
    email_confirm: true,
  })

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath("/admin/users")
  return { success: true }
}
