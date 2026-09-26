"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/community/news", label: "News Feed" },
  { href: "/community/discord", label: "Discord" },
]

export function CommunitySubNav() {
  const pathname = usePathname()

  return (
    <nav className="flex space-x-1 border-b border-border/40 overflow-x-auto">
      {navItems.map((item) => {
        const isActive = pathname.startsWith(item.href)
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "whitespace-nowrap py-3 px-4 text-sm font-medium border-b-2 transition-colors",
              isActive
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
            )}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
