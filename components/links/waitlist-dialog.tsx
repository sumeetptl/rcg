"use client"

import { useState } from "react"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Loader2, ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface WaitlistDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function WaitlistDialog({ open, onOpenChange }: WaitlistDialogProps) {
  const [email, setEmail] = useState("")
  const [level, setLevel] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, level }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong")
      }

      setIsSuccess(true)
    } catch (error) {
      console.error(error)
      // Ideally show error toast here, but for now we essentially fail silently or log
      // In a real app we'd set an error state to show to user
      alert(error instanceof Error ? error.message : "Failed to join waitlist")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-background/80 dark:bg-[#0A0A0A]/90 backdrop-blur-xl border-black/5 dark:border-white/10 text-foreground dark:text-white p-0 overflow-hidden gap-0 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
        
        <div className="p-6 relative z-10">
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <DialogHeader className="mb-6 space-y-3">
                  <DialogTitle className="text-2xl font-semibold tracking-tight">Join the Early Access List</DialogTitle>
                  <DialogDescription className="text-muted-foreground text-base">
                    We’re opening access gradually.
                    <br />
                    Secure your spot before public release.
                  </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-black/5 dark:bg-white/5 border-black/5 dark:border-white/10 focus:border-primary/50 h-10 transition-colors placeholder:text-muted-foreground"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Select value={level} onValueChange={setLevel} required>
                      <SelectTrigger className="bg-black/5 dark:bg-white/5 border-black/5 dark:border-white/10 focus:ring-primary/20 h-10 w-full text-left">
                        <SelectValue placeholder="Select your trading level" />
                      </SelectTrigger>
                      <SelectContent className="bg-background dark:bg-[#1a1a1a] border-black/5 dark:border-white/10 text-foreground dark:text-white">
                        <SelectItem value="beginner">Beginner (Learning)</SelectItem>
                        <SelectItem value="intermediate">Intermediate (Active)</SelectItem>
                        <SelectItem value="pro">Professional / Institutional</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full h-11 text-base font-medium mt-2 bg-primary hover:bg-primary/90 transition-all rounded-lg text-primary-foreground"
                  >
                    {isLoading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        Join Waitlist <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-10 text-center"
              >
                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground dark:text-white mb-2">You’re on the list.</h3>
                <p className="text-muted-foreground">We'll notify you when your spot opens up.</p>
                <Button 
                  variant="ghost" 
                  onClick={() => onOpenChange(false)}
                  className="mt-6 text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:text-white dark:hover:bg-white/5"
                >
                  Close
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  )
}
