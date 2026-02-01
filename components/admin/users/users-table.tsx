"use client"

import * as React from "react"
import Link from "next/link"
import { Profile } from "@/lib/types"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MoreHorizontal, User, Shield, Mail } from "lucide-react"

interface UsersTableProps {
  initialData: Profile[]
}

export function UsersTable({ initialData }: UsersTableProps) {
  const [data] = React.useState<Profile[]>(initialData)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
      <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        <Table>
            <TableHeader className="bg-muted/20">
              <TableRow className="hover:bg-transparent border-b border-border">
                <TableHead className="w-[300px] h-10 text-[10px] uppercase tracking-widest font-semibold text-muted-foreground pl-6">User Identity</TableHead>
                <TableHead className="h-10 text-[10px] uppercase tracking-widest font-semibold text-muted-foreground">Access Role</TableHead>
                <TableHead className="h-10 text-[10px] uppercase tracking-widest font-semibold text-muted-foreground">Plan Tier</TableHead>
                <TableHead className="h-10 text-[10px] uppercase tracking-widest font-semibold text-muted-foreground">Joined</TableHead>
                <TableHead className="h-10 text-right w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-32 text-center text-sm text-muted-foreground">
                    No users found.
                  </TableCell>
                </TableRow>
              ) : (
                data.map((profile) => (
                  <TableRow key={profile.id} className="h-14 border-border/40 hover:bg-muted/30 transition-colors">
                    <TableCell className="pl-6">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8 border border-border/50">
                            <AvatarImage src={profile.avatar_url || undefined} />
                            <AvatarFallback className="bg-muted text-muted-foreground text-xs">
                                <User className="h-3 w-3" />
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col gap-0.5">
                            <span className="font-medium text-sm text-foreground">
                                {profile.first_name || "User"} {profile.last_name || ""}
                            </span>
                            <span className="text-[10px] text-muted-foreground font-mono">
                                {profile.username ? `@${profile.username}` : "No username"}
                            </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                        {profile.role === 'admin' ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium uppercase border bg-indigo-500/10 text-indigo-600 border-indigo-500/20 dark:text-indigo-400">
                             Admin
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium uppercase border bg-muted text-muted-foreground border-border">
                             User
                          </span>
                        )}
                    </TableCell>
                    <TableCell>
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium uppercase tracking-wider text-muted-foreground/80">
                           {profile.plan || 'Free'}
                        </span>
                    </TableCell>
                    <TableCell>
                        <span className="text-xs font-mono text-muted-foreground">
                            {formatDate(profile.created_at)}
                        </span>
                    </TableCell>
                    <TableCell className="text-right pr-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[160px]">
                          <DropdownMenuLabel className="text-[10px] uppercase tracking-widest text-muted-foreground">Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => {
                              navigator.clipboard.writeText(profile.id)
                          }} className="text-xs">
                            Copy ID
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem disabled className="text-xs">
                            <Mail className="mr-2 h-3.5 w-3.5" /> Email User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
      </div>
  )
}
