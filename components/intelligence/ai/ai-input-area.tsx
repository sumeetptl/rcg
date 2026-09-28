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
    <div className="relative flex w-full items-end gap-1.5 rounded-full border border-border/50 bg-muted/30 p-1 pl-3 pr-1 shadow-sm backdrop-blur-xl transition-all focus-within:bg-background focus-within:border-primary/30 focus-within:ring-1 focus-within:ring-primary/30">
      <div className="flex flex-col justify-end pb-[2px]">
        <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full text-muted-foreground hover:bg-muted/80 hover:text-foreground">
          <Paperclip className="h-3 w-3" />
        </Button>
      </div>
      
      <Textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask CoinStaq AI..."
        className="min-h-[28px] w-full resize-none border-0 bg-transparent px-1 py-1.5 text-[13px] shadow-none focus-visible:ring-0 leading-relaxed"
        rows={1}
      />
      
      <div className="flex flex-col justify-end pb-[2px]">
        <Button 
          size="icon" 
          className={cn(
            "h-6 w-6 rounded-full transition-all",
            input.trim() ? "bg-foreground text-background hover:bg-foreground/90 scale-100" : "bg-muted text-muted-foreground opacity-50 scale-95"
          )}
          onClick={handleSend}
          disabled={!input.trim() || isGenerating}
        >
          <Send className="h-3 w-3 ml-[1px]" />
        </Button>
      </div>
    </div>
  )
}
