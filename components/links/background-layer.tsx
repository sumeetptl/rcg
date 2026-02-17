"use client"

import { motion } from "framer-motion"

export function BackgroundLayer() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none transition-colors duration-300 bg-[#F7F7F7] dark:bg-transparent">
      
      {/* 1. Base Gradient - Dark Only */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] to-[#121212] opacity-0 dark:opacity-100 transition-opacity duration-300" />

      {/* 1b. Light Mode Grid (Faint) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-100 dark:opacity-0 transition-opacity duration-300" />

      {/* 2. Soft radial glow behind center */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[120px] 
        bg-black/[0.02] dark:bg-white/[0.015] transition-colors duration-300" 
      />

      {/* 3. Floating gradient shapes */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen
        bg-blue-300/20 dark:bg-blue-900/10 transition-colors duration-300"
      />

      <motion.div
        animate={{
          x: [0, -70, 0],
          y: [0, 100, 0],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5,
        }}
        className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen
        bg-purple-300/10 dark:bg-purple-900/5 transition-colors duration-300"
      />

      {/* 4. Animated Grain Texture */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none">
        <svg className='w-full h-full'>
          <filter id='noiseFilter'>
            <feTurbulence 
              type='fractalNoise' 
              baseFrequency='0.6' 
              stitchTiles='stitch' 
            />
          </filter>
          <rect width='100%' height='100%' filter='url(#noiseFilter)' />
        </svg>
      </div>
    </div>
  )
}
