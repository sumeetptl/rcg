"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { User, Shield, Crown } from "lucide-react"
import type { Profile } from "@/lib/types"

interface ProfileHeaderProps {
  profile: Profile & { email: string; last_sign_in_at: string | null }
  isAdmin: boolean
}

export function ProfileHeader({ profile, isAdmin }: ProfileHeaderProps) {
  const initials = [profile.first_name, profile.last_name]
    .filter(Boolean)
    .map((n) => n?.[0])
    .join("")
    .toUpperCase() || profile.username?.[0]?.toUpperCase() || "U"

  const displayName = [profile.first_name, profile.last_name]
    .filter(Boolean)
    .join(" ") || profile.username || "User"

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <section className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
      {/* Avatar */}
      <div className="shrink-0">
        <Avatar className="h-24 w-24 border-2 border-border">
          <AvatarImage src={profile.avatar_url || undefined} alt={displayName} />
          <AvatarFallback className="bg-muted text-lg font-medium">
            {initials}
          </AvatarFallback>
        </Avatar>
      </div>

      {/* Profile Info */}
      <div className="flex-1 space-y-4">
        {/* Name and Username */}
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            {displayName}
          </h2>
          {profile.username && (
            <p className="mt-1 text-sm text-muted-foreground">
              @{profile.username}
            </p>
          )}
        </div>

        {/* Role and Plan Badges */}
        <div className="flex flex-wrap items-center gap-2">
          {isAdmin ? (
            <Badge variant="default" className="gap-1.5 rounded-sm px-2.5 py-1">
              <Shield className="h-3 w-3" />
              <span className="text-[10px] font-semibold uppercase tracking-wider">
                Administrator
              </span>
            </Badge>
          ) : (
            <Badge variant="secondary" className="gap-1.5 rounded-sm px-2.5 py-1">
              <User className="h-3 w-3" />
              <span className="text-[10px] font-semibold uppercase tracking-wider">
                User
              </span>
            </Badge>
          )}

          {profile.plan === "premium" && (
            <Badge
              variant="outline"
              className="gap-1.5 rounded-sm border-amber-500/30 bg-amber-500/5 px-2.5 py-1 text-amber-700 dark:text-amber-400"
            >
              <Crown className="h-3 w-3" />
              <span className="text-[10px] font-semibold uppercase tracking-wider">
                Premium
              </span>
            </Badge>
          )}

          {profile.plan === "free" && (
            <Badge variant="outline" className="gap-1.5 rounded-sm px-2.5 py-1">
              <span className="text-[10px] font-semibold uppercase tracking-wider">
                Free Plan
              </span>
            </Badge>
          )}
        </div>

        {/* Read-only Metadata */}
        <div className="space-y-2 border-l-2 border-border/40 pl-4 text-xs text-muted-foreground">
          <div className="flex items-baseline gap-2">
            <span className="font-mono uppercase tracking-wider">Email:</span>
            <span className="font-medium text-foreground/80">{profile.email}</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-mono uppercase tracking-wider">Member Since:</span>
            <span className="font-medium text-foreground/80">
              {formatDate(profile.created_at)}
            </span>
          </div>
          {profile.last_sign_in_at && (
            <div className="flex items-baseline gap-2">
              <span className="font-mono uppercase tracking-wider">Last Login:</span>
              <span className="font-medium text-foreground/80">
                {formatDate(profile.last_sign_in_at)}
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
