"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface TocItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  contentSelector?: string
}

export function TableOfContents({ contentSelector = ".article-content" }: TableOfContentsProps) {
  const [items, setItems] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    const container = document.querySelector(contentSelector)
    if (!container) return

    const headings = Array.from(container.querySelectorAll("h1, h2, h3"))
    const tocItems: TocItem[] = headings.map((el, i) => {
      const id = el.id || `heading-${i}`
      el.id = id
      return {
        id,
        text: el.textContent || "",
        level: parseInt(el.tagName[1]),
      }
    })
    setItems(tocItems)
  }, [contentSelector])

  useEffect(() => {
    if (items.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
            break
          }
        }
      },
      { rootMargin: "-20% 0px -70% 0px" }
    )

    items.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [items])

  if (items.length < 2) return null

  return (
    <div className="space-y-1">
      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60 mb-3">
        On this page
      </p>
      <nav className="space-y-0.5">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => {
              e.preventDefault()
              document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" })
            }}
            className={cn(
              "block truncate rounded py-1 text-sm transition-colors",
              item.level === 1 ? "pl-0" : item.level === 2 ? "pl-3" : "pl-6",
              activeId === item.id
                ? "text-primary font-medium"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {item.text}
          </a>
        ))}
      </nav>
    </div>
  )
}
