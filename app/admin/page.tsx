import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { getSignalStats } from "@/lib/services/signals"
import { getBlogStats } from "@/lib/services/blogs"
import { getNewsStats } from "@/lib/services/news"
import { getUserStats } from "@/lib/services/users"
import { Button } from "@/components/ui/button"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { 
  Activity, 
  FileText, 
  Users, 
  Plus, 
  ArrowRight,
  MoreHorizontal,
  LayoutDashboard
} from "lucide-react"
import { cn } from "@/lib/utils"
import { MetricsRail } from "@/components/metrics-rail"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin Console",
}

export default async function AdminPage() {
  const [signals, blogs, news, users] = await Promise.all([
    getSignalStats(),
    getBlogStats(),
    getNewsStats(),
    getUserStats(),
  ])

  // Stats aggregation
  const activeSignals = signals.filter((s) => s.status === "active").length
  const draftSignals = signals.filter((s) => s.status === "draft").length
  const publishedBlogs = blogs.filter((b) => b.status === "published").length
  const totalUsers = users.length

  // Recent 5 Signals
  const recentSignals = signals
    .sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime())
    .slice(0, 5)

  // Recent 5 Content items (Blogs)
  const recentBlogs = blogs
    .sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime())
    .slice(0, 5)

  return (
    <div className="min-h-screen bg-muted/10 p-6 lg:p-10">
      
      {/* Admin Header - Banking Style */}
      <header className="mb-8 flex flex-col gap-4 border-b border-border/60 pb-6 sm:flex-row sm:items-end sm:justify-between">
         <div>
            <h1 className="font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">System Overview</h1>
            <p className="font-serif text-3xl font-medium tracking-tight text-foreground">
               Command Center
            </p>
         </div>
         <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" asChild>
               <Link href="/admin/blogs/new">
                  <FileText className="mr-2 h-3.5 w-3.5" />
                  New Post
               </Link>
            </Button>
            <Button size="sm" asChild>
               <Link href="/admin/signals/new">
                  <Activity className="mr-2 h-3.5 w-3.5" />
                  New Signal
               </Link>
            </Button>
         </div>
      </header>

      {/* Admin Metrics Rail */}
      {(() => {
        // Calculate active users (30D)
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        const activeUsers = users.filter(u => {
          const lastActivity = (u as any).updated_at || u.created_at
          return lastActivity && new Date(lastActivity) >= thirtyDaysAgo
        }).length

        // Calculate premium users
        const premiumUsers = users.filter(u => u.plan === 'premium').length

        // Calculate signals published (30D)
        const signalsPublished = signals.filter(s => {
          return s.created_at && new Date(s.created_at) >= thirtyDaysAgo
        }).length

        // Calculate win rate from closed signals (30D)
        const closedSignals = signals.filter(s => 
          s.status === 'closed' && 
          s.created_at && 
          new Date(s.created_at) >= thirtyDaysAgo
        )
        const wins = closedSignals.filter(s => s.result === 'win').length
        const losses = closedSignals.filter(s => s.result === 'loss').length
        const winRate = closedSignals.length > 0 
          ? Math.round((wins / closedSignals.length) * 100) 
          : 0

        // Calculate platform PnL (estimated)
        const platformPnL = ((winRate - 50) * 0.5).toFixed(1)
        const isPnLPositive = parseFloat(platformPnL) >= 0

        return (
          <MetricsRail
            className="mb-10"
            metrics={[
              {
                label: "Total Users",
                value: totalUsers,
                delta: "Registered",
              },
              {
                label: "Active Users (30D)",
                value: activeUsers,
                delta: `${Math.round((activeUsers / totalUsers) * 100)}% active`,
              },
              {
                label: "Premium Users",
                value: premiumUsers,
                delta: `${Math.round((premiumUsers / totalUsers) * 100)}% conversion`,
              },
              {
                label: "Signals Published",
                value: signalsPublished,
                delta: "Last 30 days",
              },
              {
                label: "Win Rate (30D)",
                value: `${winRate}%`,
                delta: `${wins}W · ${losses}L`,
              },
              {
                label: "Platform PnL",
                value: `${isPnLPositive ? '+' : ''}${platformPnL}%`,
                delta: "30D Est.",
                deltaType: isPnLPositive ? "positive" : "negative",
                accent: true,
              },
            ]}
          />
        )
      })()}

      <div className="grid gap-10 lg:grid-cols-2">
         
         {/* Recent Signals Panel */}
         <section className="rounded-xl border border-border bg-card shadow-sm">
            <div className="flex items-center justify-between border-b border-border p-4">
               <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-muted-foreground" />
                  <h2 className="text-sm font-semibold">Recent Signals</h2>
               </div>
               <Link href="/admin/signals" className="text-xs text-primary hover:underline">View All</Link>
            </div>
            <Table>
               <TableHeader>
                  <TableRow className="hover:bg-transparent">
                     <TableHead className="w-[100px]">Asset</TableHead>
                     <TableHead>Status</TableHead>
                     <TableHead className="text-right">Created</TableHead>
                     <TableHead className="w-[40px]"></TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  {recentSignals.map((s) => (
                     <TableRow key={s.id} className="h-12">
                        <TableCell className="font-medium font-mono">{s.asset}</TableCell>
                        <TableCell>
                           <StatusBadge status={s.status} />
                        </TableCell>
                        <TableCell className="text-right text-xs text-muted-foreground font-mono">
                           {new Date(s.created_at || "").toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                           <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                              <Link href={`/admin/signals/${s.id}/edit`}>
                                 <MoreHorizontal className="h-4 w-4" />
                              </Link>
                           </Button>
                        </TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </section>

         {/* Recent Content Panel */}
          <section className="rounded-xl border border-border bg-card shadow-sm">
            <div className="flex items-center justify-between border-b border-border p-4">
               <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <h2 className="text-sm font-semibold">Recent Content</h2>
               </div>
               <Link href="/admin/blogs" className="text-xs text-primary hover:underline">View All</Link>
            </div>
            <Table>
               <TableHeader>
                  <TableRow className="hover:bg-transparent">
                     <TableHead className="w-[200px]">Title</TableHead>
                     <TableHead>Status</TableHead>
                     <TableHead className="text-right">Date</TableHead>
                     <TableHead className="w-[40px]"></TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  {recentBlogs.map((b) => (
                     <TableRow key={b.id} className="h-12">
                        <TableCell className="font-medium truncate max-w-[200px]">{b.title}</TableCell>
                        <TableCell>
                           <StatusBadge status={b.status} />
                        </TableCell>
                        <TableCell className="text-right text-xs text-muted-foreground font-mono">
                           {new Date(b.created_at || "").toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                           <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                              <Link href={`/admin/blogs/${b.slug}/edit`}>
                                 <MoreHorizontal className="h-4 w-4" />
                              </Link>
                           </Button>
                        </TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </section>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status?: string | null }) {
   const displayStatus = status || "draft"
   const variants: Record<string, string> = {
      active: "bg-emerald-500/10 text-emerald-600 border-emerald-200",
      published: "bg-emerald-500/10 text-emerald-600 border-emerald-200",
      draft: "bg-muted text-muted-foreground border-border",
      closed: "bg-muted text-muted-foreground border-border",
      pending: "bg-yellow-500/10 text-yellow-600 border-yellow-200",
   }
   return (
      <span className={cn("inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium uppercase border", variants[displayStatus] || variants.draft)}>
         {displayStatus}
      </span>
   )
}
