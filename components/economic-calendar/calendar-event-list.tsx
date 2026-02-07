"use client"

import { EconomicEvent } from "./types"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

interface CalendarEventListProps {
  events: Record<string, EconomicEvent[]>
  selectedEventId: string | null
  onSelectEvent: (event: EconomicEvent) => void
}

export function CalendarEventList({ events, selectedEventId, onSelectEvent }: CalendarEventListProps) {
  
  const formatDateHeader = (dateStr: string) => {
    if (dateStr === "Tomorrow") return "Tomorrow"
    if (new Date(dateStr).toDateString() === new Date().toDateString()) return `Today — ${new Date().toLocaleDateString('en-US', { weekday: 'long' })}`
    return new Date(dateStr).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
  }

  const formatTime = (timeStr: string) => {
    return new Date(timeStr).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const getImpactDots = (impact: string) => {
    const color = impact === 'high' ? 'text-red-500' : impact === 'medium' ? 'text-orange-500' : 'text-blue-500'
    const count = impact === 'high' ? 3 : impact === 'medium' ? 2 : 1
    
    return (
      <div className="flex gap-0.5">
        {[...Array(3)].map((_, i) => (
          <div 
            key={i} 
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              i < count ? color : "bg-muted-foreground/20"
            )} 
          />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {Object.entries(events).map(([date, dayEvents]) => (
        <section key={date} className="rounded-xl border border-border bg-card overflow-hidden">
          {/* Day Header */}
          <div className="bg-muted/30 px-4 py-3 border-b border-border flex items-center justify-between">
             <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
               {formatDateHeader(date)}
             </h3>
             <Badge variant="outline" className="text-[10px] font-normal bg-background text-muted-foreground border-border/50">
                {dayEvents.length} Events
             </Badge>
          </div>
          
          <div className="divide-y divide-border/50">
            {dayEvents.map((event) => (
              <div 
                key={event.id}
                onClick={() => onSelectEvent(event)}
                className={cn(
                  "group relative flex items-center gap-4 p-4 transition-all hover:bg-muted/50 cursor-pointer",
                  selectedEventId === event.id && "bg-muted shadow-inner"
                )}
              >
                 {selectedEventId === event.id && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
                 )}

                 {/* Time */}
                 <div className="w-16 flex-shrink-0 font-mono text-sm font-medium text-muted-foreground group-hover:text-foreground">
                    {formatTime(event.time)}
                 </div>

                 {/* Content */}
                 <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                       <span className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                          {event.title}
                       </span>
                       <Badge variant="secondary" className="h-5 px-1.5 text-[10px] font-mono text-muted-foreground border border-border/50 bg-background/50">
                          {event.currency}
                       </Badge>
                    </div>
                 </div>

                 {/* Impact */}
                 <div className="flex-shrink-0 pl-4">
                    {getImpactDots(event.impact)}
                 </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
