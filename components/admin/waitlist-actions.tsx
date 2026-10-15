"use client"

import { Button } from "@/components/ui/button"
import { Mail, Loader2, CheckCircle2 } from "lucide-react"
import { useState, useEffect } from "react"
import { sendInviteEmail } from "@/app/admin/waitlist/actions"
import { toast } from "sonner"

export function WaitlistActions({ email, status }: { email: string, status: string }) {
  const [origin, setOrigin] = useState("")
  const [isSending, setIsSending] = useState(false)
  const [sent, setSent] = useState(false)

  useEffect(() => {
    setOrigin(window.location.origin)
  }, [])

  if (status !== "approved" && status !== "invited") {
    return <span className="text-muted-foreground text-sm">-</span>
  }

  const handleSendInvite = async () => {
    setIsSending(true)
    
    try {
      await sendInviteEmail(email)
      toast.success("Invite sent successfully!")
      setSent(true)
    } catch (error) {
      toast.error("Failed to send invite.")
    } finally {
      setIsSending(false)
    }
  }

  return (
    <Button 
      size="sm" 
      variant={sent ? "secondary" : "outline"} 
      className="h-8 w-[120px]"
      onClick={handleSendInvite}
      disabled={isSending || sent}
    >
      {isSending ? (
        <><Loader2 className="h-3.5 w-3.5 mr-2 animate-spin" /> Sending...</>
      ) : sent ? (
        <><CheckCircle2 className="h-3.5 w-3.5 mr-2 text-green-500" /> Sent</>
      ) : (
        <><Mail className="h-3.5 w-3.5 mr-2" /> Send Invite</>
      )}
    </Button>
  )
}
