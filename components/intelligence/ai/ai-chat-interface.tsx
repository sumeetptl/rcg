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
    <div className="flex h-[calc(100dvh-270px)] md:h-[calc(100dvh-290px)] w-full gap-6 pb-2">
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
            
            {/* Removed standalone isGenerating text because we render thinking inside the bubble now */}
            <div ref={bottomRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="p-2 sm:p-4">
          <div className="mx-auto max-w-3xl flex flex-col gap-2">
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
