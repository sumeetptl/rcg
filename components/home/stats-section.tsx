"use client"

import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion"
import { useEffect, useState, useRef } from "react"

const stats = [
  { label: "Signals Published", value: 1240, suffix: "+" },
  { label: "Avg Risk/Reward", value: 2.4, prefix: "1:", decimal: 1 },
  { label: "Max Historical Drawdown", value: 14.2, suffix: "%", decimal: 1 },
  { label: "Tracking Since", value: 2021, prefix: "" },
]

function CountUp({ value, prefix = "", suffix = "", decimal = 0 }: { value: number, prefix?: string, suffix?: string, decimal?: number }) {
  const [displayValue, setDisplayValue] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      let start = 0
      const end = value
      const duration = 2000
      const increment = end / (duration / 16)
      
      const timer = setInterval(() => {
        start += increment
        if (start >= end) {
          setDisplayValue(end)
          clearInterval(timer)
        } else {
          setDisplayValue(start)
        }
      }, 16)
      return () => clearInterval(timer)
    }
  }, [isInView, value])

  return (
    <span ref={ref}>
      {prefix}{displayValue.toFixed(decimal)}{suffix}
    </span>
  )
}

export function StatsSection() {
  return (
    <section className="py-16 px-4 bg-background md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center md:text-left"
            >
              <div className="text-4xl font-serif font-medium tracking-tight sm:text-5xl">
                <CountUp value={stat.value} prefix={stat.prefix} suffix={stat.suffix} decimal={stat.decimal} />
              </div>
              <p className="mt-2 text-sm uppercase tracking-widest text-muted-foreground font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
