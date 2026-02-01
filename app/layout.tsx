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
    default: 'RealCryptoG | Premium Crypto Signals & Analysis',
    template: '%s | RealCryptoG',
  },
  description: 'Professional crypto trading signals and in-depth market analysis. Trusted by serious traders for premium content and real-time trading insights.',
  keywords: ['crypto', 'trading signals', 'bitcoin', 'ethereum', 'market analysis', 'cryptocurrency'],
  authors: [{ name: 'RealCryptoG' }],
  openGraph: {
    title: 'RealCryptoG',
    description: 'Professional crypto trading signals and in-depth market analysis.',
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
