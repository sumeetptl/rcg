"use server"

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

export async function completeOnboarding(formData: FormData) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    throw new Error("Unauthorized")
  }

  const username = formData.get("username") as string
  const bio = formData.get("bio") as string

  if (!username) {
    throw new Error("Username is required")
  }

  // Basic username validation: only letters, numbers, and underscores
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    throw new Error("Username can only contain letters, numbers, and underscores")
  }

  const { error } = await supabase
    .from("profiles")
    .update({ 
      username: username,
      bio: bio || null,
    })
    .eq("id", user.id)

  if (error) {
    // Handle unique constraint violation for username
    if (error.code === '23505') {
        throw new Error("This username is already taken. Please choose another one.")
    }
    throw new Error(error.message)
  }

  revalidatePath("/dashboard")
  redirect("/dashboard")
}
