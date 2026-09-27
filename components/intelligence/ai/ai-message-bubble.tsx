"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { User, BrainCircuit, ChevronDown, ChevronRight, Check, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Message } from "./ai-chat-interface"

interface AIMessageBubbleProps {
  message: Message
}

export function AIMessageBubble({ message }: AIMessageBubbleProps) {
  const isUser = message.role === "user"
  const [isThinkingOpen, setIsThinkingOpen] = useState(true)

  const hasThinking = message.thinkingSteps && message.thinkingSteps.length > 0
  const isThinkingDone = message.thinkingSteps?.every(s => s.status === "done")

  return (
    <div className={cn("flex w-full gap-4", isUser ? "justify-end" : "justify-start")}>
      {!isUser && (
        <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border border-primary/20 bg-primary/10 text-primary">
          <BrainCircuit className="h-5 w-5" />
        </div>
      )}
      
      <div className={cn("relative flex max-w-[85%] flex-col gap-2", isUser ? "items-end" : "items-start")}>
        
        {/* Thinking Process UI */}
        {!isUser && hasThinking && (
           <div className="flex flex-col gap-2 w-full sm:min-w-[280px] rounded-lg border border-border/50 bg-muted/20 p-3">
             <button 
               onClick={() => setIsThinkingOpen(!isThinkingOpen)}
               className="flex items-center justify-between text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
             >
               <span className="flex items-center gap-2">
                  {!isThinkingDone ? <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" /> : <Check className="h-3.5 w-3.5 text-green-500" />}
                  {isThinkingDone ? "Analyzed market data" : "Thinking process..."}
               </span>
               {isThinkingOpen ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
             </button>
             
             <AnimatePresence>
               {isThinkingOpen && (
                 <motion.div
                   initial={{ height: 0, opacity: 0 }}
                   animate={{ height: "auto", opacity: 1 }}
                   exit={{ height: 0, opacity: 0 }}
                   className="overflow-hidden"
                 >
                   <ul className="mt-2 space-y-2 text-[11px] text-muted-foreground/80 border-l-2 border-border/50 pl-3 ml-1">
                     {message.thinkingSteps?.map((step) => (
                       <li key={step.id} className="flex items-start gap-2">
                         {step.status === "pending" ? (
                           <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary/50 mt-[5px] animate-pulse" />
                         ) : (
                           <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-green-500/50 mt-[5px]" />
                         )}
                         <span className={cn(step.status === "pending" && "text-foreground animate-pulse")}>
                           {step.text}
                         </span>
                       </li>
                     ))}
                   </ul>
                 </motion.div>
               )}
             </AnimatePresence>
           </div>
        )}

        {/* Content Bubble */}
        {message.content && (
          <div
            className={cn(
              "relative flex flex-col gap-2 rounded-xl px-4 py-3 text-sm shadow-sm",
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
        )}
      </div>

      {isUser && (
        <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full bg-secondary text-secondary-foreground border border-border">
          <User className="h-4 w-4" />
        </div>
      )}
    </div>
  )
}
