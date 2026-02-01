"use client"

import { LayoutGrid, List, Table2 } from "lucide-react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export type ViewMode = "list" | "grid" | "table"

export function ContentViewSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentView = (searchParams.get("view") as ViewMode) || "grid"

  const setView = (view: ViewMode) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("view", view)
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const views = [
    { id: "grid", icon: LayoutGrid, label: "Grid View" },
    { id: "list", icon: List, label: "Editorial List" },
    { id: "table", icon: Table2, label: "Professional Table" },
  ] as const

  return (
    <TooltipProvider delayDuration={0}>
      <div className="flex items-center gap-1 rounded-lg border border-border bg-muted/20 p-1">
        {views.map((view) => (
          <Tooltip key={view.id}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-8 w-8 transition-all",
                  currentView === view.id
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
                onClick={() => setView(view.id)}
              >
                <view.icon className="h-4 w-4" />
                <span className="sr-only">{view.label}</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-[10px] uppercase tracking-widest font-bold">
              {view.label}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  )
}
