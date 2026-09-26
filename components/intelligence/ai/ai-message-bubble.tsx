"use client"

import { cn } from "@/lib/utils"
import { Sparkles, User, BrainCircuit } from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface AIMessageBubbleProps {
  message: Message
}

export function AIMessageBubble({ message }: AIMessageBubbleProps) {
  const isUser = message.role === "user"

  return (
    <div className={cn("flex w-full gap-4", isUser ? "justify-end" : "justify-start")}>
      {!isUser && (
        <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border border-primary/20 bg-primary/10 text-primary">
          <BrainCircuit className="h-5 w-5" />
        </div>
      )}
      
      <div
        className={cn(
          "relative flex max-w-[85%] flex-col gap-2 rounded-xl px-4 py-3 text-sm shadow-sm",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-card border border-border text-card-foreground"
        )}
      >
        <div className="whitespace-pre-wrap leading-relaxed">
          {message.content}
        </div>
        <span className={cn(
          "text-[10px] opacity-70 flex justify-end",
          isUser ? "text-primary-foreground/80" : "text-muted-foreground"
        )}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>

      {isUser && (
        <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full bg-secondary text-secondary-foreground border border-border">
          <User className="h-4 w-4" />
        </div>
      )}
    </div>
  )
}
