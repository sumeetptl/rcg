import { AIChatInterface } from "@/components/intelligence/ai/ai-chat-interface"

export const metadata = {
  title: "AI Market Analyst | CoinStaq Intelligence",
  description: "LLM-powered crypto market analyst",
}

export default function AIPage() {
  return (
    <div className="flex flex-col gap-4 py-4 -mb-24">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-serif font-medium">CoinStaq AI Analyst</h1>
        <p className="text-sm text-muted-foreground">
          Real-time market intelligence and technical analysis powered by LLMs.
        </p>
      </div>
      <AIChatInterface />
    </div>
  )
}
