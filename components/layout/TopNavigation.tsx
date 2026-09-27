"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"
import { UserNav } from "@/components/user-nav"

interface TopNavigationProps {
  isAuthenticated?: boolean
  isAdmin?: boolean
  className?: string
  user?: any
}

export function TopNavigation({ isAuthenticated = false, isAdmin = false, className, user }: TopNavigationProps) {
  const pathname = usePathname()

  const currentNavItems = [
    ...(isAuthenticated ? [{ href: "/dashboard", label: "Home" }] : []),
    { href: "/intelligence", label: "Intelligence" },
    { href: "/academy", label: "Academy" },
    { href: "/community", label: "Community" },
  ]

  // Do not render the global navigation bar in the admin console
  if (pathname.startsWith('/admin')) {
    return null
  }

  return (
    <header className={cn("hidden md:block sticky top-4 z-50 w-full px-4 sm:px-6", className)}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between rounded-xl border border-border bg-background/80 px-4 shadow-sm backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
        <Link href={isAuthenticated ? "/dashboard" : "/"} className="flex items-center gap-2 ml-2">
          <div className="relative h-10 w-10 overflow-hidden">
             <Image 
               src="/day-logo.png" 
               alt="CoinStaq Logo" 
               fill
               className="object-contain dark:hidden"
               priority
             />
             <Image 
               src="/night-logo.png" 
               alt="CoinStaq Logo" 
               fill
               className="hidden object-contain dark:block"
               priority
             />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {currentNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-3 py-2 text-sm font-medium transition-colors hover:text-foreground",
                pathname.startsWith(item.href)
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
          {isAdmin && (
            <Link
              href="/admin"
              className={cn(
                "px-3 py-2 text-sm font-medium transition-colors hover:text-foreground",
                pathname.startsWith("/admin")
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              Admin
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {isAuthenticated ? (
            <UserNav user={user} />
          ) : (
            <Button size="sm" asChild>
              <Link href="/auth/login">Sign In</Link>
            </Button>
          )}

        </div>
      </div>
    </header>
  )
}
