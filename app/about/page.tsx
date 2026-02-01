import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Separator } from "@/components/ui/separator"
import { createClient } from "@/lib/supabase/server"
import { ShieldCheck, Target, BarChart3, Lock } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About — The Real Crypto G",
  description: "Institutional research terminal providing technical execution parameters for digital asset markets.",
}

export default async function AboutPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header isAuthenticated={!!user} />

      <main className="flex-1 py-12">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          <div className="overflow-hidden rounded-lg border border-border bg-background">
            
            {/* 1. Page Header */}
            <header className="p-8 sm:p-12">
              <div className="space-y-4">
                <h1 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl text-foreground">
                  About The Real Crypto G
                </h1>
                <p className="text-lg text-muted-foreground font-medium leading-relaxed max-w-3xl">
                  An institutional-grade research terminal providing technical execution parameters for digital asset markets.
                </p>
              </div>
            </header>

            <Separator />

            {/* 2. Main Editorial Content */}
            <div className="p-8 sm:p-12">
              <div className="grid gap-16 lg:grid-cols-[1fr_300px]">
                
                {/* Content Column */}
                <div className="space-y-16">
                  
                  {/* Platform Identity */}
                  <section className="space-y-6">
                    <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Identity & Mission</h2>
                    <div className="prose prose-neutral dark:prose-invert max-w-none text-foreground leading-relaxed">
                      <p className="text-lg">
                        The Real Crypto G is a research-first terminal designed for technical market participants. 
                        Our objective is to provide objective, mathematical execution protocols for the cryptocurrency markets.
                      </p>
                      <div className="grid sm:grid-cols-2 gap-8 mt-8">
                        <div>
                          <p className="text-xs font-bold uppercase text-muted-foreground mb-3 tracking-widest">What we are</p>
                          <ul className="text-sm space-y-2 list-none p-0 text-muted-foreground font-medium">
                            <li className="flex items-start gap-2"><span className="text-emerald-500">+</span> Technical Analysis Provider</li>
                            <li className="flex items-start gap-2"><span className="text-emerald-500">+</span> Risk Management Framework Agent</li>
                            <li className="flex items-start gap-2"><span className="text-emerald-500">+</span> Market Data Interpretator</li>
                          </ul>
                        </div>
                        <div>
                          <p className="text-xs font-bold uppercase text-muted-foreground mb-3 tracking-widest">What we are not</p>
                          <ul className="text-sm space-y-2 list-none p-0 text-muted-foreground font-medium">
                            <li className="flex items-start gap-2"><span className="text-rose-500">−</span> Financial Advisory Service</li>
                            <li className="flex items-start gap-2"><span className="text-rose-500">−</span> "Signals" Pump Group</li>
                            <li className="flex items-start gap-2"><span className="text-rose-500">−</span> Wealth Management Firm</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Signal Creation */}
                  <section className="space-y-6">
                    <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Methodology</h2>
                    <div className="prose prose-neutral dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
                       <p>
                         Our execution parameters are derived through a multi-factor technical analysis framework. 
                         We do not prioritize sentiment or "hype." Every signal published is the result of 
                         historical data backtesting and real-time liquidity analysis.
                       </p>
                       <ul className="grid sm:grid-cols-2 gap-x-12 gap-y-4 list-none p-0">
                          <li className="text-sm border-l border-border pl-4">Volume-Profile Analysis</li>
                          <li className="text-sm border-l border-border pl-4">Market Structure Break Context</li>
                          <li className="text-sm border-l border-border pl-4">Liquidity Heatmap Validation</li>
                          <li className="text-sm border-l border-border pl-4">Order Block & FVG Inefficiency</li>
                       </ul>
                    </div>
                  </section>

                  {/* Risk Philosophy */}
                  <section className="space-y-6">
                    <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Risk Philosophy</h2>
                    <div className="prose prose-neutral dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
                       <p>
                         Capital preservation is our primary mandate. We believe that professional trading is a 
                         game of risk management rather than "prediction." 
                       </p>
                       <p className="bg-muted/30 p-6 border-l-2 border-primary font-medium italic text-foreground rounded-r-md">
                         "Performance is not the result of finding the right signals, but of applying the right risk protocols to every execution."
                       </p>
                    </div>
                  </section>

                  {/* Transparency */}
                  <section className="space-y-6">
                    <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Accountability</h2>
                    <div className="prose prose-neutral dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
                       <p>
                         Every signal broadcasted by the terminal is archived. We do not delete losing trades or 
                         manipulate historical entry levels. Our strike rate and performance metrics are based 
                         on the exact parameters provided to users at the time of publication.
                       </p>
                    </div>
                  </section>

                  {/* Target Audience */}
                  <section className="space-y-6">
                    <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Target Audience</h2>
                    <div className="grid sm:grid-cols-2 gap-12">
                      <div className="space-y-4">
                        <h4 className="text-xs font-bold uppercase text-foreground">Ideal Participant</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Individuals who treat technical execution as a business, favor risk-adjusted growth, 
                          and possess the discipline to follow structured invalidation levels.
                        </p>
                      </div>
                      <div className="space-y-4">
                        <h4 className="text-xs font-bold uppercase text-foreground">Non-Ideal Speculator</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Those seeking low-risk high-leverage gambles, emotional validation, or 
                          immediate financial windfalls without understanding market mechanics.
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* Closing Statement */}
                  <section className="pt-12 border-t border-border">
                    <p className="font-serif text-xl font-medium tracking-tight text-foreground max-w-2xl">
                      The Real Crypto G remains committed to editorial integrity and analytical precision 
                      above all else.
                    </p>
                    <p className="mt-4 text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">
                      G-INTEL PROTOCOL // EST 2024
                    </p>
                  </section>

                </div>

                {/* Vertical Meta Column */}
                <div className="space-y-12">
                  <div className="space-y-6 py-2">
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="h-4 w-4 text-primary" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Audited Flow</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Target className="h-4 w-4 text-primary" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Precision Focused</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <BarChart3 className="h-4 w-4 text-primary" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Data-First</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Lock className="h-4 w-4 text-primary" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Institutional Tier</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Technical Contact</p>
                    <p className="text-[11px] font-mono text-muted-foreground/80 leading-relaxed">
                      For protocol inquiries or institutional data access, contact:
                      <br />
                      <span className="text-primary mt-1 block hover:underline cursor-pointer">research@realcryptog.com</span>
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Footer Metadata */}
            <footer className="border-t border-border bg-muted/10 px-8 py-6 sm:px-12 flex items-center justify-between">
              <p className="text-xs text-muted-foreground font-mono uppercase tracking-[0.2em]">
                System Entity // verified documentation
              </p>
              <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                G-INTEL INTERNAL v2.1
              </div>
            </footer>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
