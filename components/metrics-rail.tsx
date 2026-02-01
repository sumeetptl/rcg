import { cn } from "@/lib/utils"

interface MetricItem {
  label: string
  value: string | number
  delta?: string
  deltaType?: "positive" | "negative" | "neutral"
  accent?: boolean
}

interface MetricsRailProps {
  metrics: MetricItem[]
  className?: string
}

export function MetricsRail({ metrics, className }: MetricsRailProps) {
  return (
    <div className={cn(
      "relative border-y border-border/30 bg-muted/20 overflow-x-auto",
      className
    )}>
      <div className="flex items-center divide-x divide-border/50 min-w-max">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className={cn(
              "relative flex items-center gap-3 py-4 px-6 first:pl-0 last:pr-0 transition-colors hover:bg-muted/30",
              index === 0 && "pl-0"
            )}
          >
            {/* Accent line (only for one metric with accent flag) */}
            {metric.accent && (
              <div
                className={cn(
                  "absolute left-0 top-0 bottom-0 w-[2px]",
                  metric.deltaType === "positive" && "bg-emerald-500/30",
                  metric.deltaType === "negative" && "bg-rose-500/30",
                  !metric.deltaType && "bg-primary/30"
                )}
              />
            )}

            {/* Metric content */}
            <div className="flex flex-col gap-1.5 min-w-0">
              <span className="text-[10px] uppercase tracking-[0.1em] text-muted-foreground/80 font-semibold">
                {metric.label}
              </span>
              <div className="flex items-baseline gap-2.5">
                <span
                  className={cn(
                    "font-mono text-xl font-semibold tracking-tight tabular-nums",
                    metric.deltaType === "positive" && "text-emerald-600 dark:text-emerald-400",
                    metric.deltaType === "negative" && "text-rose-600 dark:text-rose-400",
                    !metric.deltaType && "text-foreground"
                  )}
                >
                  {metric.value}
                </span>
                {metric.delta && (
                  <span className="text-[11px] text-muted-foreground/70 font-medium whitespace-nowrap">
                    {metric.delta}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
