"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AIMessageBubble } from "./ai-message-bubble"
import { AIInputArea } from "./ai-input-area"
import { AIMarketContext } from "./ai-market-context"
import { Sparkles, TrendingUp, Search, ShieldAlert } from "lucide-react"

export type ThinkingStep = {
  id: string
  text: string
  status: "pending" | "done"
}

export type Message = {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  thinkingSteps?: ThinkingStep[]
}

const suggestedPrompts = [
  { icon: TrendingUp, text: "Analyze BTC/USDT price action" },
  { icon: Search, text: "What's driving the SOL breakout?" },
  { icon: ShieldAlert, text: "Review current liquidation heatmaps" },
  { icon: Sparkles, text: "Summarize today's macro catalysts" },
]

export function AIChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "I'm the CoinStaq AI Analyst. I have real-time access to market data, funding rates, and liquidation levels. How can I help you execute today?",
      timestamp: new Date(),
    }
  ])
  const [isGenerating, setIsGenerating] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = async (text: string) => {
    if (!text.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date(),
    }
    
    const aiMessageId = (Date.now() + 1).toString()
    const initialAiMessage: Message = {
      id: aiMessageId,
      role: "assistant",
      content: "",
      timestamp: new Date(),
      thinkingSteps: []
    }

    setMessages(prev => [...prev, userMessage, initialAiMessage])
    setIsGenerating(true)

    const steps = [
      "Parsing user query and intent...",
      "Fetching real-time on-chain data...",
      "Analyzing order book liquidity...",
      "Synthesizing market sentiment..."
    ]

    for (let i = 0; i < steps.length; i++) {
      setMessages(prev => prev.map(msg => {
        if (msg.id === aiMessageId) {
          const newSteps = [...(msg.thinkingSteps || [])];
          if (newSteps.length > 0) {
            newSteps[newSteps.length - 1].status = "done";
          }
          newSteps.push({ id: `step-${i}`, text: steps[i], status: "pending" });
          return { ...msg, thinkingSteps: newSteps };
        }
        return msg;
      }))
      await new Promise(r => setTimeout(r, 600 + Math.random() * 600));
    }

    setMessages(prev => prev.map(msg => {
      if (msg.id === aiMessageId) {
         const finalSteps = (msg.thinkingSteps || []).map(s => ({ ...s, status: "done" as const }));
         return { 
           ...msg, 
           thinkingSteps: finalSteps, 
           content: "I've analyzed the technical structure. However, I am currently running in UI-only mode to demonstrate the thinking process. Once backend LLM capabilities are connected, I will provide a full comprehensive breakdown." 
         };
      }
      return msg;
    }))
    setIsGenerating(false)
  }

  return (
    <div className="flex h-full w-full flex-col">
      {/* Main Chat Area */}
      <div className="flex flex-1 flex-col overflow-hidden relative">
        
        {/* Chat Feed */}
        <div className="flex-1 overflow-y-auto px-4 pb-24 sm:px-6">
          <div className="mx-auto flex max-w-3xl flex-col gap-6 py-6 sm:py-12">
            
            {/* Grok-like Empty State */}
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center text-center mt-12 sm:mt-24 mb-12 animate-in fade-in zoom-in duration-500">
                <div className="h-16 w-16 rounded-2xl bg-foreground text-background flex items-center justify-center mb-6">
                   <Sparkles className="h-8 w-8" />
                </div>
                <h2 className="text-3xl sm:text-5xl font-serif font-medium tracking-tight mb-4">How can I help you?</h2>
                <p className="text-muted-foreground max-w-md">
                  I have real-time access to market data, funding rates, and liquidation levels. Ask me anything.
                </p>
              </div>
            )}

            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <AIMessageBubble message={msg} />
                </motion.div>
              ))}
            </AnimatePresence>
            
            <div ref={bottomRef} />
          </div>
        </div>

        {/* Input Area - Absolute positioned at bottom like Grok */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background via-background to-transparent pt-10 pb-0 px-4 sm:px-6">
          <div className="mx-auto max-w-3xl flex flex-col gap-3">
            {messages.length === 0 && (
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {suggestedPrompts.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(prompt.text)}
                    className="flex items-center gap-2 rounded-full border border-border/50 bg-background/80 backdrop-blur-md px-4 py-2 text-xs font-medium text-muted-foreground transition-all hover:border-primary/50 hover:text-foreground"
                  >
                    <prompt.icon className="h-3.5 w-3.5 text-primary" />
                    {prompt.text}
                  </button>
                ))}
              </div>
            )}
            
            <AIInputArea onSend={handleSend} isGenerating={isGenerating} />
            
            <p className="text-center text-[10px] text-muted-foreground mt-1">
              CoinStaq AI can make mistakes. Consider verifying critical technical levels.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
