"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface CalendarDateStripProps {
  selectedDate: string // YYYY-MM-DD
  onSelectDate: (date: string) => void
}

export function CalendarDateStrip({ selectedDate, onSelectDate }: CalendarDateStripProps) {
  // Generate a mock week (e.g., current week)
  // In a real app, this would be dynamic based on current date
  const generateWeek = () => {
    const dates = []
    const today = new Date()
    // Start from 2 days ago to show some past context
    const start = new Date(today)
    start.setDate(today.getDate() - 2)

    for (let i = 0; i < 7; i++) {
      const d = new Date(start)
      d.setDate(start.getDate() + i)
      dates.push(d)
    }
    return dates
  }

  const weekDates = generateWeek()

  const formatDate = (date: Date) => {
    return {
      day: date.toLocaleDateString("en-US", { weekday: "short" }),
      date: date.getDate(),
      full: date.toISOString().split("T")[0],
      isToday: new Date().toDateString() === date.toDateString()
    }
  }

  return (
    <div className="flex items-center justify-between gap-4 py-4 overflow-x-auto no-scrollbar border-b border-border/50">
      <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0 text-muted-foreground">
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <div className="flex flex-1 items-center justify-between gap-2 min-w-max">
        {weekDates.map((dateObj) => {
          const { day, date, full, isToday } = formatDate(dateObj)
          const isSelected = selectedDate === full

          return (
            <button
              key={full}
              onClick={() => onSelectDate(full)}
              className={cn(
                "flex flex-col items-center justify-center rounded-lg px-4 py-2 transition-all min-w-[70px]",
                isSelected 
                  ? "bg-primary text-primary-foreground shadow-sm" 
                  : "hover:bg-muted/50 text-muted-foreground hover:text-foreground",
                isToday && !isSelected && "bg-muted/30 text-foreground font-medium"
              )}
            >
              <span className={cn("text-[10px] uppercase font-bold tracking-wider opacity-80", isSelected ? "text-primary-foreground/80" : "")}>
                {day}
              </span>
              <span className={cn("text-xl font-serif font-bold", isSelected ? "text-primary-foreground" : "")}>
                {date}
              </span>
              {isToday && (
                 <span className={cn("mt-1 h-1 w-1 rounded-full", isSelected ? "bg-primary-foreground" : "bg-primary")} />
              )}
            </button>
          )
        })}
      </div>

      <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0 text-muted-foreground">
         <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
