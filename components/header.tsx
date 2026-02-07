"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"
import { Menu, X, ChevronDown } from "lucide-react"
import { useState } from "react"
import { UserNav } from "@/components/user-nav"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const publicNavItems = [
  { href: "/", label: "Home" },
  {
    label: "Resources",
    children: [
      { href: "/news", label: "News" },
      { href: "/blogs", label: "Blogs" },
    ],
  },
  { href: "/about", label: "About" },
]

const authNavItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/market-data", label: "Market Data" },
  { href: "/dashboard/signals", label: "Signals" },
  {
    label: "Resources",
    children: [
      { href: "/dashboard/news", label: "News" },
      { href: "/dashboard/blogs", label: "Blogs" },
    ],
  },
]

interface HeaderProps {
  isAuthenticated?: boolean
  isAdmin?: boolean
  className?: string
  user?: any // Using any to avoid importing Supabase types directly in client component
}

export function Header({ isAuthenticated = false, isAdmin = false, className, user }: HeaderProps) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = isAuthenticated ? authNavItems : publicNavItems

  return (
    <header className={cn("sticky top-4 z-50 w-full px-4 sm:px-6", className)}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between rounded-xl border border-border bg-background/80 px-4 shadow-sm backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
        <Link href={isAuthenticated ? "/dashboard" : "/"} className="flex items-center gap-2 ml-2">
          <div className="relative h-10 w-10 overflow-hidden">
             <Image 
               src="/day-logo.png" 
               alt="RealCryptoG Logo" 
               fill
               className="object-contain dark:hidden"
               priority
             />
             <Image 
               src="/night-logo.png" 
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
          {navItems.map((item) => {
            if (item.children) {
              const isActive = item.children.some(child => pathname.startsWith(child.href))
              
              return (
                <DropdownMenu key={item.label}>
                  <DropdownMenuTrigger asChild>
                    <button
                      className={cn(
                        "flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors hover:text-foreground focus:outline-none",
                        isActive ? "text-foreground" : "text-muted-foreground"
                      )}
                    >
                      {item.label}
                      <ChevronDown className="h-4 w-4 opacity-50" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[160px] bg-background/95 backdrop-blur-md border-border/40 shadow-lg supports-[backdrop-filter]:bg-background/60">
                    {item.children.map((child) => (
                      <DropdownMenuItem key={child.href} asChild>
                        <Link
                          href={child.href}
                          className={cn(
                            "w-full cursor-pointer",
                            pathname === child.href && "bg-accent/50 font-medium"
                          )}
                        >
                          {child.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )
            }

            return (
              <Link
                key={item.href}
                href={item.href!}
                className={cn(
                  "px-3 py-2 text-sm font-medium transition-colors hover:text-foreground",
                  pathname === item.href
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {item.label}
              </Link>
            )
          })}
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
            {navItems.map((item) => {
              if (item.children) {
                return (
                  <div key={item.label} className="flex flex-col gap-1">
                    <div className="px-3 py-2 text-xs font-bold uppercase text-muted-foreground/50">
                      {item.label}
                    </div>
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={cn(
                          "rounded-md pl-6 pr-3 py-2 text-sm font-medium transition-colors hover:bg-accent",
                          pathname === child.href
                            ? "bg-accent text-foreground"
                            : "text-muted-foreground"
                        )}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )
              }
              
              return (
                <Link
                  key={item.href}
                  href={item.href!}
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
              )
            })}
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
             {isAuthenticated && (
                <div className="pt-2 mt-2 border-t border-border">
                    <UserNav user={user} />
                </div>
             )}
          </nav>
        </div>
      )}
    </header>
  )
}
