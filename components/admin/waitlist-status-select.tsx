"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

interface WaitlistStatusSelectProps {
  entryId: string
  initialStatus: string
}

export function WaitlistStatusSelect({ entryId, initialStatus }: WaitlistStatusSelectProps) {
  const [status, setStatus] = useState(initialStatus)
  const [isUpdating, setIsUpdating] = useState(false)
  const supabase = createClient()
  const router = useRouter()

  const handleStatusChange = async (newStatus: string) => {
    setStatus(newStatus)
    setIsUpdating(true)
    
    const { error } = await supabase
      .from("waitlist_entries")
      .update({ status: newStatus })
      .eq("id", entryId)
      
    setIsUpdating(false)
    
    if (error) {
      console.error("Failed to update status", error)
      setStatus(initialStatus) // Revert on failure
      alert("Failed to update status")
    } else {
      router.refresh()
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Select value={status} onValueChange={handleStatusChange} disabled={isUpdating}>
        <SelectTrigger className="w-[120px] h-8 text-xs capitalize">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="approved">Approved</SelectItem>
          <SelectItem value="invited">Invited</SelectItem>
          <SelectItem value="rejected">Rejected</SelectItem>
        </SelectContent>
      </Select>
      {isUpdating && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
    </div>
  )
}
