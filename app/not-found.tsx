import Link from "next/link"
import { Button } from "@/components/ui/button"
import { RadioTower } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] space-y-8 text-center px-4">
      {/* Radar Ping Animation */}
      <div className="relative flex h-32 w-32 items-center justify-center">
        <div className="absolute inset-0 rounded-full border border-primary/30 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]" />
        <div className="absolute inset-4 rounded-full border border-primary/20 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite_0.5s]" />
        <div className="absolute inset-8 rounded-full border border-primary/10 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite_1s]" />
        
        <div className="relative z-10 rounded-full bg-muted p-6 border border-border shadow-sm">
          <RadioTower className="h-10 w-10 text-primary animate-pulse" />
        </div>
      </div>

      <div className="space-y-3 z-10 relative">
        <h1 className="font-serif text-5xl font-semibold tracking-tight text-foreground">
          404 <span className="text-muted-foreground font-light">|</span> Signal Lost
        </h1>
        <p className="text-muted-foreground max-w-md mx-auto text-lg">
          The frequency you are trying to reach does not exist, has been moved, or is currently jammed. 
        </p>
      </div>

      <div className="flex gap-4 pt-4 z-10 relative">
        <Button asChild size="lg" className="font-mono">
          <Link href="/dashboard">Return to Terminal</Link>
        </Button>
        <Button variant="outline" asChild size="lg" className="font-mono">
          <Link href="/">Back to Base</Link>
        </Button>
      </div>
    </div>
  )
}
