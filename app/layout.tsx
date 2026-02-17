import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter, Lora, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'
import { Disclaimer } from '@/components/disclaimer'

const _inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const _lora = Lora({ subsets: ['latin'], variable: '--font-lora' })
const _jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains' })

export const metadata: Metadata = {
  title: {
    default: 'Real Crypto G | Crypto Research and Live Market Tools',
    template: '%s | Real Crypto G Research',
  },
  description: 'Institutional-grade crypto market intelligence and research-driven trading signals. The Real Crypto G provides deep-dive analysis for serious traders and investors.',
  keywords: ['crypto research', 'institutional signals', 'bitcoin analysis', 'market intelligence', 'digital assets', 'trading strategy'],
  authors: [{ name: 'Real Crypto G Research' }],
  openGraph: {
    title: 'Real Crypto G | Crypto Research and Live Market Tools',
    description: 'Institutional-grade crypto market intelligence and research-driven trading signals.',
    type: 'website',
  },
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#faf9f7' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a2e' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Disclaimer />
        <Analytics />
      </body>
    </html>
  )
}
