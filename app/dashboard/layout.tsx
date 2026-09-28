import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  // Check admin role and onboarding status from database (source of truth)
  const { data: profile } = await supabase
    .from("profiles")
    .select("role, username")
    .eq("id", user.id)
    .single()

  if (profile && !profile.username) {
    redirect("/onboarding")
  }

  const isAdmin = profile?.role === 'admin'

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 bg-muted/30">{children}</main>
    </div>
  );
}
