"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CalendarFilters } from "@/components/economic-calendar/calendar-filters"
import { CalendarDateStrip } from "@/components/economic-calendar/calendar-date-strip"
import { CalendarEventList } from "@/components/economic-calendar/calendar-event-list"
import { CalendarEventDetail } from "@/components/economic-calendar/calendar-event-detail"
import { MOCK_EVENTS } from "@/components/economic-calendar/mock-data"
import { EconomicEvent } from "@/components/economic-calendar/types"

export default function EconomicCalendarPage() {
  const [selectedEvent, setSelectedEvent] = useState<EconomicEvent | null>(null)
  // Default to today
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split("T")[0])

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />

      <main className="flex-1">
        {/* Header Section */}
        <section className="border-b border-border bg-muted/30 py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
             <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div>
                  <h1 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">Economic Calendar</h1>
                  <p className="mt-2 max-w-2xl text-lg text-muted-foreground">
                    Upcoming macro events that may impact global markets.
                  </p>
                </div>
                
                {/* Timezone / Toggle (Visual only for now) */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground font-mono bg-background/50 px-3 py-1.5 rounded-full border border-border/50">
                   <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                   UTC+5:30 (Local)
                </div>
             </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-8">
           <div className="mx-auto max-w-7xl px-4 sm:px-6">
              
              <div className="space-y-6">
                 {/* Filters */}
                 <CalendarFilters />
                 
                 {/* Date Strip */}
                 <CalendarDateStrip selectedDate={selectedDate} onSelectDate={setSelectedDate} />
              </div>

              <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 lg:gap-12 items-start">
                 
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
        </section>
      </main>

      <Footer />
    </div>
  )
}
