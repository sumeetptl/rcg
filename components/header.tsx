"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"
import { useState } from "react"

const publicNavItems = [
  { href: "/", label: "Home" },
  { href: "/blogs", label: "Blogs" },
  { href: "/news", label: "News" },
  { href: "/about", label: "About" },
]

const authNavItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/signals", label: "Signals" },
  { href: "/dashboard/blogs", label: "Blogs" },
  { href: "/dashboard/news", label: "News" },
  { href: "/profile", label: "Profile" },
]

interface HeaderProps {
  isAuthenticated?: boolean
  isAdmin?: boolean
  className?: string
}

export function Header({ isAuthenticated = false, isAdmin = false, className }: HeaderProps) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = isAuthenticated ? authNavItems : publicNavItems

  return (
    <header className={cn("sticky top-4 z-50 w-full px-4 sm:px-6", className)}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between rounded-xl border border-border bg-background/80 px-4 shadow-sm backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
        <Link href={isAuthenticated ? "/dashboard" : "/"} className="flex items-center gap-2 ml-2">
          <div className="relative h-10 w-10 overflow-hidden">
             <Image 
               src="/logo.png" 
               alt="RealCryptoG Logo" 
               fill
               className="object-contain dark:hidden"
               priority
             />
             <Image 
               src="/logo-n.png" 
               alt="RealCryptoG Logo" 
               fill
               className="hidden object-contain dark:block"
               priority
             />
          </div>
          {/* <span className="font-serif text-xl font-semibold tracking-tight">RealCryptoG</span> */}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-3 py-2 text-sm font-medium transition-colors hover:text-foreground",
                pathname === item.href
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
            <form action="/auth/signout" method="post">
              <Button variant="ghost" size="sm" type="submit">
                Sign Out
              </Button>
            </form>
          ) : (
            <>
              <Button size="sm" asChild>
                <Link href="/auth/login">Sign In</Link>
              </Button>
            </>
          )}

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-foreground md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="mt-2 mx-auto max-w-7xl rounded-xl border border-border/40 bg-background/95 p-4 shadow-lg backdrop-blur-md supports-[backdrop-filter]:bg-background/80 md:hidden">
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent",
                  pathname === item.href
                    ? "bg-accent text-foreground"
                    : "text-muted-foreground"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {isAdmin && (
              <Link
                href="/admin"
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent",
                  pathname.startsWith("/admin")
                    ? "bg-accent text-foreground"
                    : "text-muted-foreground"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                Admin
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
