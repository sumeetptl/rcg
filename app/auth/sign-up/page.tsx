"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock } from "lucide-react"

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-block">
            <span className="font-serif text-2xl font-semibold tracking-tight">RealCryptoG</span>
          </Link>
        </div>

        <Card className="text-center">
          <CardHeader className="space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Lock className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl font-semibold">Registration Closed</CardTitle>
            <CardDescription>
              New account registration is currently by invitation only.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Please contact our support team on Telegram to request access and obtain your login credentials.
            </p>
          </CardContent>
          <CardFooter className="flex flex-col space-y-3">
            <Button className="w-full" asChild>
              <Link href="https://t.me/RealCryptoG_Admin" target="_blank" rel="noopener noreferrer">
                Contact on Telegram
              </Link>
            </Button>
            <Button variant="outline" className="w-full bg-transparent" asChild>
              <Link href="/auth/login">Back to Sign In</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
