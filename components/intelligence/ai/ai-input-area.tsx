"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send, Paperclip, Command } from "lucide-react"
import { cn } from "@/lib/utils"

interface AIInputAreaProps {
  onSend: (message: string) => void
  isGenerating?: boolean
}

export function AIInputArea({ onSend, isGenerating }: AIInputAreaProps) {
  const [input, setInput] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`
    }
  }, [input])

  const handleSend = () => {
    if (!input.trim() || isGenerating) return
    onSend(input)
    setInput("")
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="relative flex w-full items-end gap-1 rounded-[24px] border border-border/80 bg-background p-1 pl-3 pr-1 shadow-sm transition-shadow focus-within:ring-1 focus-within:ring-primary/30">
      <div className="flex flex-col justify-end pb-0.5">
        <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full text-muted-foreground hover:text-foreground">
          <Paperclip className="h-3.5 w-3.5" />
        </Button>
      </div>
      
      <Textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask CoinStaq AI to analyze an asset, macro trend, or wallet..."
        className="min-h-[36px] w-full resize-none border-0 bg-transparent px-1 py-2 text-sm shadow-none focus-visible:ring-0"
        rows={1}
      />
      
      <div className="flex flex-col justify-end pb-0.5">
        <Button 
          size="icon" 
          className={cn(
            "h-7 w-7 rounded-full transition-all",
            input.trim() ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground opacity-50"
          )}
          onClick={handleSend}
          disabled={!input.trim() || isGenerating}
        >
          <Send className="h-3.5 w-3.5 ml-0.5" />
        </Button>
      </div>
    </div>
  )
}
