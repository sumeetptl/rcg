"use client"

import { useState } from "react"
import { CalendarFilters } from "@/components/economic-calendar/calendar-filters"
import { CalendarDateStrip } from "@/components/economic-calendar/calendar-date-strip"
import { CalendarEventList } from "@/components/economic-calendar/calendar-event-list"
import { CalendarEventDetail } from "@/components/economic-calendar/calendar-event-detail"
import { MOCK_EVENTS } from "@/components/economic-calendar/mock-data"
import { EconomicEvent } from "@/components/economic-calendar/types"

export function EconomicCalendarTab() {
  const [selectedEvent, setSelectedEvent] = useState<EconomicEvent | null>(null)
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split("T")[0])

  return (
    <div className="space-y-6">
       <div className="flex flex-col gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight font-serif">Economic Calendar</h2>
            <p className="text-muted-foreground">
              Key macro events scheduled for this week.
            </p>
          </div>
          
          <CalendarFilters />
          
          {/* Date Strip */}
          <div className="bg-card rounded-lg border border-border/50 px-2">
             <CalendarDateStrip selectedDate={selectedDate} onSelectDate={setSelectedDate} />
          </div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 lg:gap-12 items-start">
          {/* Left: Event List */}
          <div>
             <CalendarEventList 
                events={MOCK_EVENTS} 
                selectedEventId={selectedEvent?.id || null}
                onSelectEvent={setSelectedEvent}
             />
          </div>

          {/* Right: Detail Panel */}
          <div className="hidden lg:block sticky top-24">
             <CalendarEventDetail 
                event={selectedEvent} 
                onClose={() => setSelectedEvent(null)}
             />
          </div>
       </div>
    </div>
  )
}
