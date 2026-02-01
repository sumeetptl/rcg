"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase/client"
import { Loader2, KeyRound } from "lucide-react"

interface SecuritySectionProps {
  email: string
}

export function SecuritySection({ email }: SecuritySectionProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handlePasswordReset = async () => {
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const supabase = createClient()
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        email,
        {
          redirectTo: `${window.location.origin}/auth/reset-password`,
        }
      )

      if (resetError) throw resetError

      setSuccess(true)
    } catch (err: any) {
      setError(err.message || "Failed to send password reset email")
      console.error("Password reset error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section>
      <div className="mb-6">
        <h2 className="text-sm font-semibold tracking-tight text-foreground">
          Security
        </h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Manage your account security and authentication
        </p>
      </div>

      <div className="space-y-6">
        {/* Email (Read-only) */}
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            value={email}
            disabled
            className="bg-muted/30"
          />
          <p className="text-xs text-muted-foreground">
            Your email address is managed by your authentication provider.
          </p>
        </div>

        {/* Password Reset */}
        <div className="space-y-3">
          <Label>Password</Label>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
            <Button
              type="button"
              variant="outline"
              onClick={handlePasswordReset}
              disabled={isLoading}
              className="w-full sm:w-auto"
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <KeyRound className="mr-2 h-4 w-4" />
              )}
              Reset Password
            </Button>
            <p className="text-xs text-muted-foreground sm:pt-2">
              We'll send you an email with instructions to reset your password.
            </p>
          </div>

          {/* Error/Success Messages */}
          {error && (
            <div className="rounded-md border border-destructive/50 bg-destructive/5 px-4 py-3 text-sm text-destructive">
              {error}
            </div>
          )}

          {success && (
            <div className="rounded-md border border-emerald-500/50 bg-emerald-500/5 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-400">
              Password reset email sent. Please check your inbox.
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
