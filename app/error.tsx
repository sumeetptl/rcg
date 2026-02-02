'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an analytics service
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-6 text-center px-4">
      <div className="bg-destructive/10 p-4 rounded-full">
        <AlertCircle className="h-10 w-10 text-destructive" />
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">System Malfunction</h2>
        <p className="text-muted-foreground max-w-md">
          We encountered an unexpected error while processing your request. 
          Our engineers have been notified.
        </p>
      </div>
      <Button onClick={() => reset()}>
        Attempt Reconnection
      </Button>
    </div>
  )
}
