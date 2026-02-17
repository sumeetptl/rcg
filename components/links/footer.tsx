import Link from "next/link"

const footerLinks = [
  { label: "Methodology", href: "/methodology" },
  { label: "Responsible Usage", href: "/responsible-usage" },
  { label: "FAQ", href: "/faq" },
  { label: "Privacy Policy", href: "/legal/privacy-policy" },
  { label: "Terms of Service", href: "/legal/terms-of-service" },
  { label: "Disclaimer", href: "/legal/disclaimer" },
]

export function Footer() {
  return (
    <footer className="w-full py-8 mt-12 mb-4 border-t border-white/5 relative z-10">
      <div className="container max-w-xl mx-auto flex flex-wrap justify-center gap-x-6 gap-y-2 px-4">
        {footerLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="text-xs text-muted-foreground/60 hover:text-primary transition-colors hover:underline hover:underline-offset-4"
          >
            {link.label}
          </Link>
        ))}
      </div>
      <p className="text-center text-[10px] text-muted-foreground/30 mt-4">
        © 2026 The Real Crypto G. All rights reserved.
      </p>
    </footer>
  )
}
