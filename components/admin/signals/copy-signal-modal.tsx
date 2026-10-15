"use client"

import React, { useState } from "react"
import { Copy, Check, Eye, Share2 } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  SignalDataForFormatting,
  formatSignalToText,
} from "@/lib/signal-formatter"

interface CopySignalModalProps {
  signal: SignalDataForFormatting
  variant?: "default" | "outline" | "secondary" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
  label?: string
  className?: string
  showPreviewDialog?: boolean
}

export function CopySignalModal({
  signal,
  variant = "outline",
  size = "sm",
  label = "Copy Signal Text",
  className = "",
  showPreviewDialog = true,
}: CopySignalModalProps) {
  const [copied, setCopied] = useState(false)
  const [leverage, setLeverage] = useState(10)
  const [isOpen, setIsOpen] = useState(false)

  const textToCopy = formatSignalToText(signal, { leverage })

  const handleCopy = async (e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    try {
      await navigator.clipboard.writeText(textToCopy)
      setCopied(true)
      toast.success("Signal copied to clipboard in CoinStaq format!")
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
      toast.error("Failed to copy to clipboard")
    }
  }

  // If user just wants an instant 1-click button without dialog
  if (!showPreviewDialog) {
    return (
      <Button
        type="button"
        variant={variant}
        size={size}
        onClick={handleCopy}
        className={className}
      >
        {copied ? (
          <Check className="mr-1.5 h-3.5 w-3.5 text-emerald-500" />
        ) : (
          <Copy className="mr-1.5 h-3.5 w-3.5" />
        )}
        <span>{copied ? "Copied!" : label}</span>
      </Button>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant={variant}
          size={size}
          className={className}
        >
          {copied ? (
            <Check className="mr-1.5 h-3.5 w-3.5 text-emerald-500" />
          ) : (
            <Copy className="mr-1.5 h-3.5 w-3.5" />
          )}
          <span>{label}</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl flex items-center gap-2">
            <Share2 className="h-5 w-5 text-primary" />
            Copy Signal Template
          </DialogTitle>
          <DialogDescription className="text-xs">
            Formatted for Telegram, Discord, and VIP signal channels.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Quick leverage adjustment */}
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono text-muted-foreground uppercase text-[11px] font-semibold">
              Leverage Multiplier:
            </span>
            <div className="flex gap-1.5">
              {[5, 10, 20].map((lev) => (
                <button
                  key={lev}
                  type="button"
                  onClick={() => setLeverage(lev)}
                  className={`px-2.5 py-1 rounded text-xs font-mono font-medium border transition-colors ${
                    leverage === lev
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-muted/40 hover:bg-muted text-muted-foreground"
                  }`}
                >
                  {lev}x
                </button>
              ))}
            </div>
          </div>

          {/* Text preview box */}
          <div className="relative rounded-lg border border-border bg-muted/40 p-4 font-mono text-xs leading-relaxed whitespace-pre overflow-x-auto text-foreground/90 select-all max-h-[360px] overflow-y-auto">
            {textToCopy}
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 pt-2 border-t border-border/60">
          <span className="text-[11px] text-muted-foreground font-mono">
            Click copy to clipboard
          </span>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsOpen(false)}
            >
              Close
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={handleCopy}
              className="gap-1.5"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-emerald-400" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy Text
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
