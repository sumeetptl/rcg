import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Satellite } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 text-center px-4">
      <div className="rounded-full bg-muted p-6">
        <Satellite className="h-12 w-12 text-muted-foreground" />
      </div>
      <div className="space-y-2">
        <h1 className="font-serif text-4xl font-semibold tracking-tight">Signal Lost</h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          The frequency you are trying to reach does not exist or has been moved. 
          Return to base to re-calibrate.
        </p>
      </div>
      <div className="flex gap-4">
        <Button asChild>
          <Link href="/dashboard">Return to Terminal</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  )
}
