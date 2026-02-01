import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Header } from "@/components/header";

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

  const isAdmin = user.user_metadata?.is_admin === true;

  return (
    <div className="flex min-h-screen flex-col">
      <Header isAuthenticated={true} isAdmin={isAdmin} />
      <main className="flex-1 bg-muted/30">{children}</main>
    </div>
  );
}
