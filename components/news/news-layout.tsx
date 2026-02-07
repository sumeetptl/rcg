"use client"

import { ReactNode } from "react"
import { NewsNav } from "./news-nav"
import { NewsContext } from "./news-context"

interface NewsLayoutProps {
  children: ReactNode
}

export function NewsLayout({ children }: NewsLayoutProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
       <div className="grid grid-cols-1 gap-12 lg:grid-cols-[200px_1fr_280px]">
          
          {/* Left Sidebar: Navigation */}
          <aside className="hidden lg:block border-r border-border/40 pr-8 sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto custom-scrollbar">
             <NewsNav />
          </aside>

          {/* Center Column: Main Feed */}
          <main className="min-w-0">
             {children}
          </main>

          {/* Right Sidebar: Context */}
          <aside className="hidden lg:block border-l border-border/40 pl-8 sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto custom-scrollbar">
             <NewsContext />
          </aside>

       </div>
    </div>
  )
}
