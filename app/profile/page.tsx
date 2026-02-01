import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { ProfileForm } from "@/components/profile/profile-form"
import { ProfileHeader } from "@/components/profile/profile-header"
import { SecuritySection } from "@/components/profile/security-section"
import { Separator } from "@/components/ui/separator"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Profile - The Real Crypto G",
  description: "Manage your profile and account settings",
}

export default async function ProfilePage() {
  const supabase = await createClient()
  
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Fetch complete profile from database
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  if (!profile) {
    redirect("/auth/login")
  }

  // Combine user data with profile
  const userProfile = {
    ...profile,
    email: user.email || "",
    last_sign_in_at: user.last_sign_in_at || null,
  }

  const isAdmin = profile.role === "admin"

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:border-x lg:border-border/40 lg:min-h-screen">
      
      {/* Page Header */}
      <header className="mb-10 flex flex-col gap-2">
        <h1 className="font-serif text-3xl font-medium tracking-tight text-foreground">
          Profile Settings
        </h1>
        <p className="text-sm text-muted-foreground font-medium">
          Manage your account information and preferences
        </p>
      </header>

      <div className="space-y-8">
        
        {/* Profile Overview */}
        <ProfileHeader profile={userProfile} isAdmin={isAdmin} />

        <Separator className="bg-border/60" />

        {/* Editable Profile Information */}
        <section>
          <div className="mb-6">
            <h2 className="text-sm font-semibold tracking-tight text-foreground">
              Profile Information
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Update your personal details and public profile
            </p>
          </div>
          <ProfileForm profile={userProfile} />
        </section>

        <Separator className="bg-border/60" />

        {/* Security Section */}
        <SecuritySection email={user.email || ""} />

      </div>
    </div>
  )
}
