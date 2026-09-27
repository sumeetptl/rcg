"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, LineChart, BookOpen, Users, Shield, Menu, User, LogOut, Settings } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThemeToggle } from "@/components/theme-toggle"
import { createClient } from "@/lib/supabase/client"

interface BottomNavigationProps {
  isAuthenticated?: boolean
  isAdmin?: boolean
  user?: any
}

export function BottomNavigation({ isAuthenticated = false, isAdmin = false, user }: BottomNavigationProps) {
  const pathname = usePathname()
  const router = useRouter()

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

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  const email = user?.email
  const name = user?.user_metadata?.name || email?.split("@")[0]
  const avatarUrl = user?.user_metadata?.avatar_url

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

      {/* Menu / Profile Tab */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className={cn(
              "flex flex-col items-center justify-center w-full h-full space-y-1 transition-all duration-200 text-muted-foreground hover:text-foreground active:scale-95 outline-none"
            )}
          >
            <div className="p-1 rounded-full transition-colors">
                <Menu className="h-5 w-5" strokeWidth={2} />
            </div>
            <span className="text-[9px] font-medium tracking-wide transition-all">
              Menu
            </span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 mb-2 ml-2" align="end" side="top">
          {isAuthenticated ? (
            <>
              <DropdownMenuLabel className="font-normal">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={avatarUrl} alt={name || "User"} />
                    <AvatarFallback>{name?.[0]?.toUpperCase() || "U"}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {email}
                    </p>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="w-full cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                {isAdmin && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin" className="w-full cursor-pointer">
                      <Shield className="mr-2 h-4 w-4" />
                      <span>Admin Console</span>
                    </Link>
                  </DropdownMenuItem>
                )}
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
            </>
          ) : (
            <DropdownMenuItem asChild>
              <Link href="/auth/login" className="w-full cursor-pointer font-medium text-primary">
                <User className="mr-2 h-4 w-4" />
                <span>Sign In</span>
              </Link>
            </DropdownMenuItem>
          )}
          
          {/* Theme Toggle accessible via Menu */}
          <div className="flex items-center justify-between px-2 py-1.5">
            <span className="text-sm font-medium text-muted-foreground">Theme</span>
            <ThemeToggle />
          </div>

          {isAuthenticated && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={handleLogout}
                className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-100 dark:focus:bg-red-900/20"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

    </nav>
  )
}
