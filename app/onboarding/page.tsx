"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"
import { completeOnboarding } from "./actions"

export default function OnboardingPage() {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    
    try {
      await completeOnboarding(formData)
    } catch (err: any) {
      setError(err.message || "Failed to complete onboarding")
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center flex justify-center">
          <div className="inline-flex items-center justify-center">
            <Image
              src="/night-logo.svg"
              alt="CoinStaq"
              width={240}
              height={72}
              className="object-contain dark:block hidden"
              priority
            />
            <Image
              src="/day-logo.svg"
              alt="CoinStaq"
              width={240}
              height={72}
              className="object-contain dark:hidden block"
              priority
            />
          </div>
        </div>

        <Card>
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-semibold">Welcome to CoinStaq</CardTitle>
            <CardDescription>
              Let's complete your profile before you dive in.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="username">Username <span className="text-destructive">*</span></Label>
                <div className="flex items-center">
                  <span className="flex h-10 items-center justify-center rounded-l-md border border-r-0 border-input bg-muted px-3 text-sm text-muted-foreground">
                    @
                  </span>
                  <Input
                    id="username"
                    name="username"
                    placeholder="trader_joe"
                    className="rounded-l-none focus-visible:z-10"
                    required
                    disabled={isLoading}
                    pattern="^[a-zA-Z0-9_]+$"
                    title="Only letters, numbers, and underscores allowed."
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Bio (Optional)</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  placeholder="Tell us about your trading style or background..."
                  className="resize-none h-24"
                  disabled={isLoading}
                />
              </div>

            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Complete Setup & Go to Dashboard
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
