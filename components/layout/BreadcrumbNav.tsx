"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, Home } from "lucide-react"

export function BreadcrumbNav() {
  const pathname = usePathname()
  const pathSegments = pathname.split('/').filter(Boolean)

  if (pathSegments.length === 0) return null

  return (
    <nav className="flex items-center text-sm text-muted-foreground whitespace-nowrap overflow-x-auto py-2">
      <Link href="/" className="hover:text-foreground transition-colors flex items-center">
        <Home className="h-3 w-3" />
      </Link>
      
      {pathSegments.map((segment, index) => {
        const href = `/${pathSegments.slice(0, index + 1).join('/')}`
        const isLast = index === pathSegments.length - 1
        
        // Format the segment for display (e.g. "trade-ideas" -> "Trade Ideas")
        const label = segment
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')

        return (
          <div key={href} className="flex items-center">
            <ChevronRight className="h-4 w-4 mx-1 opacity-50" />
            {isLast ? (
              <span className="font-medium text-foreground">{label}</span>
            ) : (
              <Link href={href} className="hover:text-foreground transition-colors">
                {label}
              </Link>
            )}
          </div>
        )
      })}
    </nav>
  )
}
