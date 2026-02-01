import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Separator } from "@/components/ui/separator"
import { createClient } from "@/lib/supabase/server"
import { ShieldAlert, Scale, Brain, Gauge, FileWarning } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Responsible Usage Protocol — The Real Crypto G",
  description: "Educational guidelines for ethical execution, capital management, and risk discipline.",
}

export default async function ResponsibleUsagePage() {
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
                  Responsible Usage Protocol
                </h1>
                <p className="text-lg text-muted-foreground font-medium leading-relaxed max-w-3xl">
                  Guidelines for the ethical and disciplined utilization of terminal intelligence in digital asset markets.
                </p>
              </div>
            </header>

            <Separator />

            {/* Main Content */}
            <div className="p-8 sm:p-12">
              <div className="grid gap-16 lg:grid-cols-[1fr_300px]">
                
                <div className="space-y-16">
                  
                  {/* Nature of Intelligence */}
                  <section className="space-y-6">
                    <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary">1. Nature of the Intelligence</h2>
                    <div className="prose prose-neutral dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
                      <p>
                        The signals provided by this terminal represent <strong>statistical probabilities</strong> based on 
                        technical order flow analysis. They are not "tips," "guarantees," or financial advice.
                      </p>
                      <p>
                        Treat every broadcast as a data point in your broader execution strategy. Intelligence 
                        without a pre-defined personal trading plan is a primary cause of capital impairment.
                      </p>
                    </div>
                  </section>

                  {/* Capital Management */}
                  <section className="space-y-6">
                    <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary">2. Strategic Capital Management</h2>
                    <div className="prose prose-neutral dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
                      <p>
                        Capital management is the anchor of a professional market participant. Users should 
                        never risk more capital than their emotional and financial thresholds allow for a 
                        total loss.
                      </p>
                      <ul className="grid sm:grid-cols-2 gap-8 list-none p-0 mt-6">
                        <li className="p-5 border border-border/60 bg-muted/10 rounded-sm">
                           <span className="block text-xs font-bold uppercase text-foreground mb-2">Rule of Survival</span>
                           <span className="text-xs">Limit risk per execution to 1-2% of total equity. Survival is mandated over aggressive growth.</span>
                        </li>
                        <li className="p-5 border border-border/60 bg-muted/10 rounded-sm">
                           <span className="block text-xs font-bold uppercase text-foreground mb-2">Leverage Protocol</span>
                           <span className="text-xs">Leverage is a magnifying tool for both gain and loss. Use only if you understand liquidation mechanics.</span>
                        </li>
                      </ul>
                    </div>
                  </section>

                  {/* Execution Discipline */}
                  <section className="space-y-6">
                    <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary">3. Execution Discipline</h2>
                    <div className="prose prose-neutral dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
                      <p>
                        The terminal provides specific <strong>Entry</strong> and <strong>Invalidation</strong> zones. 
                        Deviating from these levels compromises the mathematical edge of our research framework.
                      </p>
                      <p>
                        Avoid "chasing" entries that have moved more than 0.5% beyond the broadcasted target. 
                        If you miss the window, wait for the next setup; the market is infinite, but your 
                        capital is not.
                      </p>
                    </div>
                  </section>

                  {/* Emotional Control */}
                  <section className="space-y-6">
                    <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary">4. Psychological Resilience</h2>
                    <div className="prose prose-neutral dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
                      <p>
                        Cryptocurrency trading is a psychologically demanding endeavor. Drawdown cycles are 
                        a natural and unavoidable component of professional participation.
                      </p>
                      <p className="italic border-l-2 border-primary pl-6 py-4 bg-muted/20">
                        "Your ability to follow the protocol during a losing streak defines your professionalism more than your conduct during a winning streak."
                      </p>
                    </div>
                  </section>

                  {/* Realistic Expectations */}
                  <section className="space-y-6">
                    <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary">5. Performance Horizons</h2>
                    <div className="prose prose-neutral dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
                      <p>
                        System performance should be evaluated over a horizon of 50-100 executions. Short-term 
                        variants (winning/losing streaks) are noise. Success is found in the long-term 
                        compounding of positive expectancy.
                      </p>
                    </div>
                  </section>

                </div>

                {/* Sidebar */}
                <div className="space-y-12">
                  <div className="space-y-6 py-2">
                    <div className="flex items-center gap-3">
                      <ShieldAlert className="h-4 w-4 text-primary" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Self Protection</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Scale className="h-4 w-4 text-primary" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Balance Focus</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Brain className="h-4 w-4 text-primary" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Neutral Stance</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Gauge className="h-4 w-4 text-primary" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Managed Speed</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="bg-rose-500/[0.03] border border-rose-500/20 p-5 rounded-sm flex flex-col gap-3">
                     <div className="flex items-center gap-2 text-xs font-bold text-rose-500 uppercase">
                        <FileWarning className="h-3 w-3" /> Mandatory Notice
                     </div>
                     <p className="text-[11px] text-muted-foreground leading-relaxed">
                        80% of retail participants lose capital within 12 months. Ensure you are not part of the statistic by adhering to strict risk protocols.
                     </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Footer */}
            <footer className="border-t border-border bg-muted/10 px-8 py-6 sm:px-12 flex items-center justify-between">
              <p className="text-xs text-muted-foreground font-mono uppercase tracking-[0.2em]">
                System Entity // usage documentation
              </p>
              <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                G-INTEL INTERNAL v1.8
              </div>
            </footer>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
