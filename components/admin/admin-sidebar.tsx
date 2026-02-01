"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  TrendingUp,
  FileText,
  Newspaper,
  Users,
  Settings,
  MoreHorizontal,
  LogOut,
  Command,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarInput,
  useSidebar,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThemeToggle } from "@/components/theme-toggle"

// Define navigation groups with "banking-grade" structure
const navGroups = [
  {
    label: "Platform",
    items: [
      {
        title: "Overview",
        url: "/admin",
        icon: LayoutDashboard,
      },
      {
        title: "Market Signals",
        url: "/admin/signals",
        icon: TrendingUp,
      },
    ],
  },
  {
    label: "Editorial",
    items: [
      {
        title: "Blog Posts",
        url: "/admin/blogs",
        icon: FileText,
      },
      {
        title: "News Feed",
        url: "/admin/news",
        icon: Newspaper,
      },
    ],
  },
  {
    label: "Management",
    items: [
      {
        title: "User Registry",
        url: "/admin/users",
        icon: Users,
      },
    ],
  },
]

export function AdminSidebar({ userProfile }: { userProfile: any }) {
  const pathname = usePathname()
  const { state } = useSidebar()

  return (
    <Sidebar variant="floating" className="group-data-[side=left]:border-r-0">
      <SidebarHeader className="gap-4 pt-5 pb-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center gap-2 px-1 transition-all group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                  <span className="truncate font-semibold">RealCryptoG</span>
                  <span className="truncate text-xs text-muted-foreground">Admin Console</span>
                </div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
        <div className="px-2 group-data-[collapsible=icon]:hidden">
             <SidebarInput placeholder="Search..." className="h-9 bg-background/50" />
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        {navGroups.map((group, index) => (
          <SidebarGroup key={group.label} className="group-data-[collapsible=icon]:py-0">
            <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden">{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={item.url === "/admin" ? pathname === "/admin" : pathname.startsWith(item.url)} 
                      tooltip={item.title}
                      className="rounded-lg data-[active=true]:bg-primary/5 data-[active=true]:text-primary data-[active=true]:font-medium transition-colors"
                    >
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="pb-4">
        {state !== "collapsed" && (
           <div className="px-2 pb-2">
             <div className="flex items-center justify-between rounded-lg border bg-background p-2 shadow-sm">
                <span className="text-xs font-medium text-muted-foreground pl-1">Theme</span>
                <ThemeToggle />
             </div>
           </div>
        )}
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground rounded-xl"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={userProfile?.avatar_url} alt={userProfile?.username || "Admin"} />
                    <AvatarFallback className="rounded-lg">AD</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                    <span className="truncate font-semibold">{userProfile?.first_name || "Admin"}</span>
                    <span className="truncate text-xs">{userProfile?.email}</span>
                  </div>
                  <MoreHorizontal className="ml-auto size-4 group-data-[collapsible=icon]:hidden" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src={userProfile?.avatar_url} alt={userProfile?.username || "Admin"} />
                      <AvatarFallback className="rounded-lg">AD</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">{userProfile?.first_name || "Admin"}</span>
                      <span className="truncate text-xs">{userProfile?.email}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="/dashboard">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        Back to User Dashboard
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/profile">
                        <Settings className="mr-2 h-4 w-4" />
                        Profile
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                    className="text-red-600 focus:text-red-600 focus:bg-red-100 dark:focus:bg-red-900/20"
                    asChild
                >
                  <Link href="/auth/login">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
