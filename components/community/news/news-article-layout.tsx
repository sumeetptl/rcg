"use client"

import { ReactNode } from "react"
import { NewsArticleSidebar } from "./news-article-sidebar"
import { NewsArticleContext } from "./news-article-context"

interface NewsArticleLayoutProps {
  children: ReactNode
  category?: string
}

export function NewsArticleLayout({ children, category }: NewsArticleLayoutProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
       <div className="grid grid-cols-1 gap-12 lg:grid-cols-[200px_1fr_280px]">
          
          {/* Left Sidebar: Nav */}
          <aside className="hidden lg:block sticky top-24 h-[calc(100vh-6rem)]">
             <NewsArticleSidebar category={category} />
          </aside>

          {/* Center Column: Article */}
          <article className="min-w-0">
             {children}
          </article>

          {/* Right Sidebar: Context */}
          <aside className="hidden lg:block sticky top-24 h-[calc(100vh-6rem)]">
             <NewsArticleContext />
          </aside>

       </div>
    </div>
  )
}
