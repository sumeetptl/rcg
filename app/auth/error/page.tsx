import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"

export default function AuthErrorPage() {
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
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
              <AlertTriangle className="h-8 w-8 text-destructive" />
            </div>
            <CardTitle className="text-2xl font-semibold">Authentication Error</CardTitle>
            <CardDescription>
              Something went wrong during the authentication process.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              This could be due to an expired link, an invalid token, or a network issue.
              Please try again or contact support if the problem persists.
            </p>
          </CardContent>
          <CardFooter className="flex flex-col space-y-3">
            <Button className="w-full" asChild>
              <Link href="/auth/login">Try Again</Link>
            </Button>
            <Button variant="outline" className="w-full bg-transparent" asChild>
              <Link href="/">Go Home</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
