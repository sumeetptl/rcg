"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, LineChart, BookOpen, Users, Shield } from "lucide-react"

interface BottomNavigationProps {
  isAuthenticated?: boolean
  isAdmin?: boolean
}

export function BottomNavigation({ isAuthenticated = false, isAdmin = false }: BottomNavigationProps) {
  const pathname = usePathname()

  // Do not render the bottom navigation in the admin console
  if (pathname.startsWith('/admin')) {
    return null
  }

  const navItems = [
    { 
      href: isAuthenticated ? "/dashboard" : "/", 
      label: "Home", 
      icon: Home,
      activePattern: isAuthenticated ? "/dashboard" : "^/$"
    },
    { 
      href: "/intelligence", 
      label: "Intelligence", 
      icon: LineChart,
      activePattern: "/intelligence"
    },
    { 
      href: "/academy", 
      label: "Academy", 
      icon: BookOpen,
      activePattern: "/academy"
    },
    { 
      href: "/community", 
      label: "Community", 
      icon: Users,
      activePattern: "/community"
    },
  ]

  if (isAdmin) {
    navItems.push({
      href: "/admin",
      label: "Admin",
      icon: Shield,
      activePattern: "/admin"
    })
  }

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-[100] flex h-[68px] items-center justify-around border-t border-border bg-background/95 px-2 shadow-[0_-4px_24px_rgba(0,0,0,0.05)] backdrop-blur-xl supports-[backdrop-filter]:bg-background/80 pb-safe">
      {navItems.map((item) => {
        const Icon = item.icon
        // Check if the current pathname matches the active pattern
        const isActive = item.activePattern.startsWith('^') 
          ? new RegExp(item.activePattern).test(pathname)
          : pathname.startsWith(item.activePattern)

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center w-full h-full space-y-1 transition-all duration-200",
              isActive 
                ? "text-primary scale-105" 
                : "text-muted-foreground hover:text-foreground active:scale-95"
            )}
          >
            <div className={cn(
              "p-1 rounded-full transition-colors",
              isActive && "bg-primary/10 text-primary"
            )}>
                <Icon className={cn("h-5 w-5")} strokeWidth={isActive ? 2.5 : 2} />
            </div>
            <span className={cn(
                "text-[9px] tracking-wide transition-all",
                isActive ? "font-semibold" : "font-medium"
            )}>
              {item.label}
            </span>
          </Link>
        )
      })}
    </nav>
  )
}
