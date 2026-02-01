import { getUsers } from "@/lib/services/users"
import { AdminPageHeader } from "@/components/admin/page-header"
import { UsersTable } from "@/components/admin/users/users-table"
import { Card, CardContent } from "@/components/ui/card"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Manage Users",
}

export default async function AdminUsersPage() {
  const profiles = await getUsers()

  return (
    <div className="min-h-screen bg-muted/10 p-6 lg:p-10">
      
      {/* Admin Header - Banking Style */}
      <header className="mb-8 flex flex-col gap-4 border-b border-border/60 pb-6 sm:flex-row sm:items-end sm:justify-between">
         <div>
            <h1 className="font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Access Control</h1>
            <p className="font-serif text-3xl font-medium tracking-tight text-foreground">
               User Registry
            </p>
         </div>
      </header>
      
      {/* Metric Strip */}
      <div className="mb-10 grid gap-4 grid-cols-1 sm:grid-cols-3">
        <div className="rounded-lg border border-border bg-card/60 p-4">
           <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-1">Total Users</p>
           <div className="text-2xl font-mono font-medium tracking-tight">{profiles.length}</div>
           <p className="text-xs text-muted-foreground mt-1">Registered accounts</p>
        </div>
        
        <div className="rounded-lg border border-border bg-card/60 p-4">
           <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-1">New This Month</p>
           <div className="text-2xl font-mono font-medium tracking-tight">
              {profiles.filter((p) => {
                const date = new Date(p.created_at)
                const now = new Date()
                return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
              }).length}
           </div>
           <p className="text-xs text-muted-foreground mt-1">Growth rate</p>
        </div>

        <div className="rounded-lg border border-border bg-card/60 p-4">
           <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-1">Active This Week</p>
           <div className="text-2xl font-mono font-medium tracking-tight">
              {profiles.filter((p) => {
                const date = new Date(p.created_at)
                const now = new Date()
                const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
                return date >= weekAgo
              }).length}
           </div>
           <p className="text-xs text-muted-foreground mt-1">Recent signups</p>
        </div>
      </div>

      <UsersTable initialData={profiles} />
    </div>
  )
}

