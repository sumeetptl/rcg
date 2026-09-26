"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AIMessageBubble } from "./ai-message-bubble"
import { AIInputArea } from "./ai-input-area"
import { AIMarketContext } from "./ai-market-context"
import { Sparkles, TrendingUp, Search, ShieldAlert } from "lucide-react"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
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

  const handleSend = (text: string) => {
    if (!text.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date(),
    }
    
    setMessages(prev => [...prev, userMessage])
    setIsGenerating(true)

    // Simulate AI response for now
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I'm currently running in UI-only mode. Once backend capabilities are connected, I'll be able to analyze this data instantly.",
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, aiMessage])
      setIsGenerating(false)
    }, 1500)
  }

  return (
    <div className="flex h-[calc(100vh-14rem)] w-full gap-6">
      {/* Main Chat Area */}
      <div className="flex flex-1 flex-col rounded-xl border border-border bg-background shadow-sm overflow-hidden">
        
        {/* Chat Feed */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="mx-auto flex max-w-3xl flex-col gap-6">
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
            
            {isGenerating && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="flex items-center gap-2 text-sm text-muted-foreground ml-12"
              >
                <div className="flex gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="h-1.5 w-1.5 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="h-1.5 w-1.5 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
                <span>Analyzing market data...</span>
              </motion.div>
            )}
            <div ref={bottomRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t border-border/50 bg-muted/10 p-4 sm:px-6 sm:pb-6">
          <div className="mx-auto max-w-3xl flex flex-col gap-3">
            {messages.length === 1 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
                {suggestedPrompts.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(prompt.text)}
                    className="flex items-center gap-2 rounded-lg border border-border/50 bg-card p-3 text-left text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  >
                    <prompt.icon className="h-4 w-4 text-primary" />
                    {prompt.text}
                  </button>
                ))}
              </div>
            )}
            <AIInputArea onSend={handleSend} isGenerating={isGenerating} />
            <p className="text-center text-[10px] text-muted-foreground">
              CoinStaq AI can make mistakes. Consider verifying critical technical levels.
            </p>
          </div>
        </div>
      </div>

      {/* Right Sidebar (Context) */}
      <div className="hidden w-72 flex-col gap-4 lg:flex">
        <AIMarketContext />
        <div className="rounded-xl border border-border bg-card/50 p-4">
          <h3 className="text-sm font-semibold tracking-tight mb-2">Capabilities</h3>
          <ul className="text-xs text-muted-foreground space-y-2">
            <li className="flex items-center gap-2"><Sparkles className="h-3.5 w-3.5 text-primary" /> Multi-timeframe trend analysis</li>
            <li className="flex items-center gap-2"><Sparkles className="h-3.5 w-3.5 text-primary" /> Aggregated funding rate mapping</li>
            <li className="flex items-center gap-2"><Sparkles className="h-3.5 w-3.5 text-primary" /> NLP sentiment on SEC filings</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
