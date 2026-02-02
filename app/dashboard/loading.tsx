import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:border-x lg:border-border/40 lg:min-h-screen">
        
        {/* Header Skeleton */}
        <div className="mb-8 flex flex-col gap-2">
          <Skeleton className="h-8 w-48" />
          <div className="flex items-center gap-3">
             <Skeleton className="h-5 w-24 rounded-full" />
             <Skeleton className="h-4 w-64" />
          </div>
        </div>

        {/* Metrics Bar Skeleton */}
        <div className="mb-10 border-y border-border/40 py-3 overflow-x-auto">
          <div className="flex items-center gap-12 px-4">
             {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="flex items-center gap-3">
                   <div className="w-0.5 h-5 bg-border" />
                   <div className="flex items-baseline gap-2">
                      <Skeleton className="h-3 w-16" />
                      <Skeleton className="h-5 w-8" />
                   </div>
                </div>
             ))}
          </div>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1fr_340px]">
           
           {/* Active Signals Skeleton */}
           <section>
              <div className="flex items-center justify-between mb-6">
                 <div className="space-y-1">
                   <Skeleton className="h-5 w-32" />
                   <Skeleton className="h-3 w-48" />
                 </div>
                 <Skeleton className="h-8 w-24" />
              </div>

              <div className="rounded-xl border border-border/40 bg-card overflow-hidden shadow-sm">
                 <div className="p-0">
                    <div className="bg-muted/20 h-10 w-full mb-4" />
                    {[1, 2, 3, 4, 5].map((i) => (
                       <div key={i} className="flex items-center justify-between p-4 border-b border-border/40">
                          <div className="space-y-2">
                             <Skeleton className="h-4 w-24" />
                             <Skeleton className="h-3 w-12" />
                          </div>
                          <Skeleton className="h-6 w-20" />
                          <Skeleton className="h-4 w-16" />
                          <Skeleton className="h-4 w-16" />
                          <Skeleton className="h-8 w-8 rounded-full" />
                       </div>
                    ))}
                 </div>
              </div>
           </section>

           {/* Sidebar Skeleton */}
           <aside className="space-y-10">
              <section>
                 <div className="flex items-center justify-between mb-5">
                    <div className="space-y-1">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-3 w-32" />
                    </div>
                 </div>
                 <div className="space-y-5">
                    {[1, 2, 3].map((i) => (
                       <div key={i} className="flex flex-col gap-2">
                          <Skeleton className="h-3 w-16 rounded-full" />
                          <Skeleton className="h-5 w-full" />
                          <Skeleton className="h-3 w-full" />
                          <Skeleton className="h-3 w-2/3" />
                       </div>
                    ))}
                 </div>
              </section>
           </aside>

        </div>
      </div>
    </div>
  )
}
