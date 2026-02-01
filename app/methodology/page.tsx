import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Separator } from "@/components/ui/separator"
import { createClient } from "@/lib/supabase/server"
import { GitBranch, Fingerprint, Activity, Microscope } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Research Methodology — The Real Crypto G",
  description: "Detailed breakdown of the G-INTEL research framework and signal qualification protocols.",
}

export default async function MethodologyPage() {
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
                  Research Methodology
                </h1>
                <p className="text-lg text-muted-foreground font-medium leading-relaxed max-w-3xl">
                  A comprehensive overview of our institutional framework for digital asset selection and execution protocol.
                </p>
              </div>
            </header>

            <Separator />

            {/* Main Content */}
            <div className="p-8 sm:p-12">
              <div className="grid gap-16 lg:grid-cols-[1fr_300px]">
                
                <div className="space-y-16">
                  
                  {/* Research Framework */}
                  <section className="space-y-6">
                    <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary">1. Research Framework</h2>
                    <div className="prose prose-neutral dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
                      <p>
                        Our research cycle begins with a broad-spectrum liquidity scan. Unlike retail-driven technical indicators, 
                        the G-INTEL framework prioritizes high-timeframe order flow and institutional positioning.
                      </p>
                      <ul className="grid sm:grid-cols-2 gap-4 list-none p-0 mt-6">
                        <li className="flex flex-col gap-1 border-border border-l-2 pl-4">
                          <span className="font-bold text-foreground text-sm uppercase tracking-wide">Primary Input</span>
                          <span className="text-xs">Macro economic cycles and stablecoin liquidity flows.</span>
                        </li>
                        <li className="flex flex-col gap-1 border-border border-l-2 pl-4">
                          <span className="font-bold text-foreground text-sm uppercase tracking-wide">Secondary Filter</span>
                          <span className="text-xs">Exchanges orderbook depth and funding rate convergence.</span>
                        </li>
                      </ul>
                    </div>
                  </section>

                  {/* Signal Qualification */}
                  <section className="space-y-6">
                    <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary">2. Signal Qualification</h2>
                    <div className="prose prose-neutral dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
                      <p>
                        A market setup is only promoted to "Active Status" if it meets the Terminal-Ready criteria. 
                        Statistically, less than 15% of identified setups survive this qualification phase.
                      </p>
                      <div className="bg-muted/30 p-8 border border-border mt-6">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-foreground mb-4">Qualification Checklist</h4>
                        <ul className="space-y-3 p-0 m-0 list-none text-sm">
                          <li className="flex items-center gap-3"><div className="h-1 w-1 bg-primary rounded-full" /> Confluence of 3+ independent technical models.</li>
                          <li className="flex items-center gap-3"><div className="h-1 w-1 bg-primary rounded-full" /> Volume profile validation on 4H/Daily charts.</li>
                          <li className="flex items-center gap-3"><div className="h-1 w-1 bg-primary rounded-full" /> Clear invalidation level with less than 5% stop-loss distance.</li>
                        </ul>
                      </div>
                    </div>
                  </section>

                  {/* Risk Modeling */}
                  <section className="space-y-6">
                    <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary">3. Risk Modeling</h2>
                    <div className="prose prose-neutral dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
                      <p>
                        Risk is the only variable we truly control. Every signal undergoes a volatility-adjusted 
                        position sizing check. We do not provide signals with a mechanical Risk:Reward ratio 
                        lower than 1:2.0.
                      </p>
                      <p>
                        Our models account for "Black Swan" outlier events and perpetual funding volatility 
                        to ensure stop-loss levels are technically sound yet resistant to low-liquidity 
                        "stop raids."
                      </p>
                    </div>
                  </section>

                  {/* Execution Updates */}
                  <section className="space-y-6">
                    <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary">4. Monitoring & Execution</h2>
                    <div className="prose prose-neutral dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
                      <p>
                        Publication is not the end of the research cycle. All active signals are monitored 
                        programmatically for shifts in delta and open interest.
                      </p>
                      <ul className="space-y-4 list-none p-0 mt-6">
                        <li className="text-sm"><strong>Neutral Shift:</strong> If price action invalidates the thesis without hitting the stop-loss, signals are moved to "Closed" status immediately.</li>
                        <li className="text-sm"><strong>Real-time Logs:</strong> Updates are broadcasted if significant institutional buying or selling occurs near target zones.</li>
                      </ul>
                    </div>
                  </section>

                  {/* Post-Trade Review */}
                  <section className="space-y-6">
                    <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary">5. Post-Trade Analysis</h2>
                    <div className="prose prose-neutral dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
                      <p>
                        Monthly reviews are conducted to detect model drift. Win rates, drawdown duration, 
                        and slippage metrics are analyzed across all execution strategies to ensure 
                        long-term system alpha is preserved.
                      </p>
                    </div>
                  </section>

                </div>

                {/* Sidebar */}
                <div className="space-y-12">
                  <div className="space-y-6 py-2">
                    <div className="flex items-center gap-3">
                      <GitBranch className="h-4 w-4 text-primary" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Flow Control</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Fingerprint className="h-4 w-4 text-primary" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Unique ID System</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Activity className="h-4 w-4 text-primary" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Live Telemetry</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Microscope className="h-4 w-4 text-primary" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Deep Scan</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Audit Standards</p>
                    <p className="text-[11px] font-mono text-muted-foreground/80 leading-relaxed">
                      Framework v4.2.0
                      <br />
                      Compliance: Institutional Internal
                      <br />
                      Last Audit: Jan 2026
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Footer */}
            <footer className="border-t border-border bg-muted/10 px-8 py-6 sm:px-12 flex items-center justify-between">
              <p className="text-xs text-muted-foreground font-mono uppercase tracking-[0.2em]">
                System Archive // methodology documentation
              </p>
              <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                G-INTEL INTERNAL v4.2
              </div>
            </footer>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
