"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

interface CalendarFiltersProps {
  // simplified for UI demo
  activeFilter?: string
  onFilterChange?: (filter: string) => void
}

export function CalendarFilters({ activeFilter, onFilterChange }: CalendarFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 py-4">
      <div className="text-xs font-bold uppercase text-muted-foreground mr-2">
        Filter By:
      </div>
      <Button 
        variant="outline" 
        size="sm" 
        className="h-7 text-xs font-medium bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500/20"
      >
        High Impact
      </Button>
      <Button variant="outline" size="sm" className="h-7 text-xs font-medium">
        USD
      </Button>
      <Button variant="outline" size="sm" className="h-7 text-xs font-medium">
        EUR
      </Button>
    </div>
  )
}
