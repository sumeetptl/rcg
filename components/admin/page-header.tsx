import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface AdminPageHeaderProps {
  heading: string
  label?: string
  text?: string
  children?: React.ReactNode
  action?: {
    label: string
    href: string
  }
}

export function AdminPageHeader({
  heading,
  label,
  text,
  children,
  action,
}: AdminPageHeaderProps) {
  return (
    <header className="mb-8 flex flex-col gap-4 border-b border-border/60 pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {label && (
          <h1 className="font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
            {label}
          </h1>
        )}
        <p className="font-serif text-3xl font-medium tracking-tight text-foreground">
          {heading}
        </p>
        {text && (
          <p className="text-sm text-muted-foreground mt-2">{text}</p>
        )}
      </div>
      <div className="flex items-center gap-3">
        {children}
        {action && (
          <Button size="sm" asChild>
            <Link href={action.href}>
              <Plus className="mr-2 h-3.5 w-3.5" />
              {action.label}
            </Link>
          </Button>
        )}
      </div>
    </header>
  )
}
