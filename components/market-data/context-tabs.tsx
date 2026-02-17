"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { OITrackerTab } from "@/components/market-data/oi-tracker-tab"
import { WhaleActivityTab } from "@/components/market-data/whale-activity-tab"

interface ContextTabsProps {
    symbol: string
}

export function ContextTabs({ symbol }: ContextTabsProps) {
  return (
    <Tabs defaultValue="market-context" className="w-full space-y-4" id="market-context-tabs">
      <TabsList className="bg-muted/20 border border-border/40 w-full justify-start overflow-x-auto flex-nowrap no-scrollbar p-1">
        <TabsTrigger value="market-context" className="flex-shrink-0">Market Context</TabsTrigger>
        <TabsTrigger value="derivatives" className="flex-shrink-0">Derivatives</TabsTrigger>
        <TabsTrigger value="flows" className="flex-shrink-0">Flows</TabsTrigger>
        <TabsTrigger value="notes" className="flex-shrink-0">Notes</TabsTrigger>
      </TabsList>

      <TabsContent value="market-context" className="space-y-4 animate-in fade-in-50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-background/40 border-border/50">
                <CardHeader className="pb-2">
                    <CardTitle className="text-xs uppercase tracking-widest text-muted-foreground">HTF Bias</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-xl font-bold text-foreground">Consolidation</div>
                    <p className="text-xs text-muted-foreground mt-1">Range: $42,000 - $45,500</p>
                </CardContent>
            </Card>
             <Card className="bg-background/40 border-border/50">
                <CardHeader className="pb-2">
                    <CardTitle className="text-xs uppercase tracking-widest text-muted-foreground">Key Levels</CardTitle>
                </CardHeader>
                <CardContent className="space-y-1">
                    <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Resistance</span>
                        <span className="font-mono text-signal-missed">$45,500</span>
                    </div>
                     <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Pivot</span>
                        <span className="font-mono text-yellow-500">$43,200</span>
                    </div>
                     <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Support</span>
                        <span className="font-mono text-signal-hit">$41,800</span>
                    </div>
                </CardContent>
            </Card>
             <Card className="bg-background/40 border-border/50">
                <CardHeader className="pb-2">
                    <CardTitle className="text-xs uppercase tracking-widest text-muted-foreground">Volatility</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-xl font-bold text-foreground">Low / Compressing</div>
                    <p className="text-xs text-muted-foreground mt-1">Bollinger Bands squeezing on 4H.</p>
                </CardContent>
            </Card>
        </div>
      </TabsContent>

      <TabsContent value="derivatives" className="mt-0 animate-in fade-in-50">
         {/* Reusing existing component for now, but in future would filter by symbol */}
         <div className="border border-border/50 rounded-lg p-4 bg-background/20">
             <h3 className="text-sm font-bold mb-4 text-muted-foreground">Global Derivatives Context</h3>
             <OITrackerTab />
         </div>
      </TabsContent>

      <TabsContent value="flows" className="mt-0 animate-in fade-in-50">
         <div className="border border-border/50 rounded-lg p-4 bg-background/20">
              <h3 className="text-sm font-bold mb-4 text-muted-foreground">Recent Whale Activity</h3>
             <WhaleActivityTab />
         </div>
      </TabsContent>
      
      <TabsContent value="notes" className="mt-0 animate-in fade-in-50">
         <Card className="bg-yellow-950/10 border-yellow-900/20 dashed border-2">
             <CardContent className="pt-6">
                 <p className="text-sm text-yellow-600/80 font-mono text-center">
                     <span className="block text-2xl mb-2">🔒</span>
                     Premium Notes: This section is locked for Free users.
                 </p>
             </CardContent>
         </Card>
      </TabsContent>
    </Tabs>
  )
}
