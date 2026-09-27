import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter, Lora, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import { TopNavigation } from '@/components/layout/TopNavigation'
import { BottomNavigation } from '@/components/layout/BottomNavigation'
import { createClient } from '@/lib/supabase/server'
import './globals.css'
import { Disclaimer } from '@/components/disclaimer'

const _inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const _lora = Lora({ subsets: ['latin'], variable: '--font-lora' })
const _jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains' })

export const metadata: Metadata = {
  title: {
    default: 'CoinStaq | Intelligence for Digital Markets.',
    template: '%s | CoinStaq',
  },
  description: 'Research-driven market insights, structured strategies, and disciplined thinking for digital asset participants. Less Noise. More Edge.',
  keywords: ['crypto research', 'market intelligence', 'digital assets', 'trading strategy', 'coinstaq'],
  authors: [{ name: 'CoinStaq' }],
  openGraph: {
    title: 'CoinStaq | Intelligence for Digital Markets.',
    description: 'Research-driven market insights, structured strategies, and disciplined thinking for digital asset participants.',
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  let isAdmin = false;
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role, avatar_url, first_name, username")
      .eq("id", user.id)
      .single()
      
    if (profile) {
      isAdmin = profile.role === 'admin'
      user.user_metadata = {
         ...user.user_metadata,
         avatar_url: profile.avatar_url || user.user_metadata?.avatar_url,
         name: profile.first_name || profile.username || user.user_metadata?.name
      }
    }
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Disclaimer />
          <div className="md:pb-0 pb-[68px]">
            <TopNavigation isAuthenticated={!!user} isAdmin={isAdmin} user={user} />
            {children}
          </div>
          <BottomNavigation isAuthenticated={!!user} isAdmin={isAdmin} user={user} />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
