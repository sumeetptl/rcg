import { cn } from "@/lib/utils"
import { Lightbulb, AlertTriangle } from "lucide-react"

interface InsightBoxProps {
  title?: string
  content: string | React.ReactNode
  variant?: "default" | "warning"
  className?: string
}

export function InsightBox({
  title = "Market Insight",
  content,
  variant = "default",
  className,
}: InsightBoxProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg border p-4 sm:p-6",
        variant === "default" && "border-blue-500/20 bg-blue-500/5 text-blue-900 dark:text-blue-100",
        variant === "warning" && "border-amber-500/20 bg-amber-500/5 text-amber-900 dark:text-amber-100",
        className
      )}
    >
      <div className="flex items-start gap-4">
        <div className={cn(
            "rounded-full p-2 mt-0.5",
            variant === "default" && "bg-blue-500/10 text-blue-500",
            variant === "warning" && "bg-amber-500/10 text-amber-500",
        )}>
            {variant === "default" ? <Lightbulb className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
        </div>
        <div className="space-y-1">
          <h4 className={cn(
              "text-xs font-bold uppercase tracking-widest",
              variant === "default" && "text-blue-500",
              variant === "warning" && "text-amber-500",
          )}>
            {title}
          </h4>
          <div className="text-sm leading-relaxed opacity-90 font-medium">
            {content}
          </div>
        </div>
      </div>
    </div>
  )
}
