import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Separator } from "@/components/ui/separator"
import { createClient } from "@/lib/supabase/server"
import { HelpCircle, Info, MessageSquare, ShieldQuestion } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Investor-Grade FAQ — The Real Crypto G",
  description: "System transparency and operating procedures. Addressing the questions of serious market participants.",
}

const faqs = [
  {
    question: "Do you trade the signals you publish?",
    answer: "Yes. All authors within the G-Terminal ecosystem utilize the published execution parameters for their own personal or institutional accounts. This alignment of interests is fundamental to our editorial integrity. However, we do not front-run signals; publication occurs either concurrently or before team execution."
  },
  {
    question: "How do you handle 'losing' signals in your performance metrics?",
    answer: "Every broadcasted signal remains in our historical database. We do not delete, hide, or manipulate the entry or exit data of losing trades. Transparency is our primary product. Losing trades are vital data points that help us refine our models and prevent model drift over time."
  },
  {
    question: "Why should I trust your research over free social media analysts?",
    answer: "You shouldn't 'trust' based on branding alone. We encourage skepticism. Our value proposition is based on a transparent, backtested methodology and institutional-grade risk management that free social media sources often lack. We prioritize long-term capital preservation over short-term engagement metrics."
  },
  {
    question: "What is your stance on 'paid' groups and signal scams?",
    answer: "The Real Crypto G operates as a professional research terminal, not a marketing funnel. We strictly avoid the hyper-promotional 'guaranteed gains' language common in the industry. Our fee structure covers the operational costs of high-grade data feeds and analyst time, not profit-sharing from user trades."
  },
  {
    question: "How often are signals published?",
    answer: "Frequency is dictated by the market, not a schedule. We do not force trades to meet a quota. If market conditions do not provide high-probability setups with a favorable R:R, the terminal may remain silent for several days. We value quality and precision over daily activity."
  },
  {
    question: "Is this platform suitable for beginner traders?",
    answer: "The platform is designed for participants who already understand the basics of order types, exchange mechanics, and risk management. While our research is educational, we assume a baseline level of market literacy. Beginners are encouraged to read our 'Responsible Usage' guide before following any execution protocol."
  },
  {
    question: "How do I cancel my institutional access?",
    answer: "Subscriptions can be managed directly through your profile settings or by contacting our support team via Telegram. We offer a no-friction cancellation policy. Access will remain active until the end of your current billing cycle."
  }
]

export default async function FAQPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header isAuthenticated={!!user} />

      <main className="flex-1 py-12">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          <div className="overflow-hidden rounded-lg border border-border bg-background">
            
            {/* Page Header */}
            <header className="p-8 sm:p-12">
              <div className="space-y-4">
                <h1 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl text-foreground">
                  Investor-Grade FAQ
                </h1>
                <p className="text-lg text-muted-foreground font-medium leading-relaxed max-w-3xl">
                  Addressing the operational and strategic inquiries of serious market participants with radical transparency.
                </p>
              </div>
            </header>

            <Separator />

            {/* Main Content */}
            <div className="p-8 sm:p-12">
              <div className="grid gap-16 lg:grid-cols-[1fr_300px]">
                
                <div className="space-y-12">
                  {faqs.map((faq, index) => (
                    <div key={index} className="space-y-4">
                      <h3 className="text-lg font-serif font-semibold text-foreground flex items-start gap-4">
                        <span className="text-primary font-mono text-sm leading-7">[{String(index + 1).padStart(2, '0')}]</span>
                        {faq.question}
                      </h3>
                      <div className="pl-12">
                        <p className="text-muted-foreground leading-relaxed text-base">
                          {faq.answer}
                        </p>
                      </div>
                      {index < faqs.length - 1 && <Separator className="mt-8 bg-border/40" />}
                    </div>
                  ))}
                </div>

                {/* Sidebar */}
                <div className="space-y-12">
                  <div className="space-y-6 py-2">
                    <div className="flex items-center gap-3">
                      <HelpCircle className="h-4 w-4 text-primary" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">General Help</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Info className="h-4 w-4 text-primary" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Operating Rules</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MessageSquare className="h-4 w-4 text-primary" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Support Logs</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <ShieldQuestion className="h-4 w-4 text-primary" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Integrity Sync</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Inquiry Desk</p>
                    <p className="text-[11px] font-mono text-muted-foreground/80 leading-relaxed">
                      Questions not addressed here?
                      <br />
                      <span className="text-primary mt-2 block hover:underline cursor-pointer">Telegram Support</span>
                      <span className="text-primary mt-1 block hover:underline cursor-pointer">support@realcryptog.com</span>
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Footer */}
            <footer className="border-t border-border bg-muted/10 px-8 py-6 sm:px-12 flex items-center justify-between">
              <p className="text-xs text-muted-foreground font-mono uppercase tracking-[0.2em]">
                System Entity // help documentation
              </p>
              <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                G-INTEL INTERNAL v1.0
              </div>
            </footer>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
