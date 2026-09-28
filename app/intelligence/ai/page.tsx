import { AIChatInterface } from "@/components/intelligence/ai/ai-chat-interface"

export const metadata = {
  title: "AI Market Analyst | CoinStaq Intelligence",
  description: "LLM-powered crypto market analyst",
}

export default function AIPage() {
  return (
    <div className="flex flex-col h-[calc(100dvh-180px)] -mx-4 sm:-mx-6 -mb-24">
      <AIChatInterface />
    </div>
  )
}
