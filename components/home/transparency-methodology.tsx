"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, BookOpen, Scale, ShieldAlert } from "lucide-react"
import Link from "next/link"

const resources = [
  {
    title: "Methodology",
    description: "Our technical framework and analytical standards.",
    icon: BookOpen,
    href: "/methodology",
  },
  {
    title: "Responsible Usage",
    description: "Guidelines on position sizing and risk management.",
    icon: Scale,
    href: "/responsible-usage",
  },
  {
    title: "Performance Disclosure",
    description: "Transparent tracking and auditing of historical results.",
    icon: ShieldAlert,
    href: "/legal/disclaimer",
  },
]

export function TransparencyMethodology() {
  return (
    <section className="py-24 px-4 border-y border-border/50">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <h2 className="font-serif text-3xl font-medium sm:text-4xl">Transparency & Methodology</h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              We operate with a "show your work" mentality. Every signal is a result of 
              strict adherence to our core technical principles.
            </p>
          </div>

          <div className="lg:col-span-2 grid gap-6 sm:grid-cols-3">
            {resources.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="group relative"
              >
                <Link href={item.href} className="block space-y-4 rounded-xl border border-transparent p-6 transition-all hover:bg-muted/50 hover:border-border">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/5 text-primary">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="flex items-center text-lg font-semibold tracking-tight">
                      {item.title}
                      <ArrowUpRight className="ml-2 h-4 w-4 opacity-0 transition-all -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0" />
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                  
                  {/* Underline draw animation */}
                  <div className="absolute bottom-0 left-6 right-6 h-[1.5px] bg-primary scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
