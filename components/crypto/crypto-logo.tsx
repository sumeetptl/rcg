"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { getLogoPath, FALLBACK_LOGO } from "@/lib/crypto-logos";
import { cn } from "@/lib/utils";

interface CryptoLogoProps {
  symbol: string;
  size?: number;
  className?: string;
}

export function CryptoLogo({ symbol, size = 24, className }: CryptoLogoProps) {
  // 1. Compute target path immediately (no useEffect delay)
  const targetPath = getLogoPath(symbol);
  
  // 2. Track which symbols have failed to load to switch to fallback default.svg
  const [failed, setFailed] = useState(false);

  // Reset error state if target path or symbol changes
  useEffect(() => {
    setFailed(false);
  }, [targetPath, symbol]);

  const finalSrc = failed ? FALLBACK_LOGO : targetPath;

  return (
    <div 
      className={cn("relative shrink-0 rounded-full overflow-hidden flex items-center justify-center bg-white/10 dark:border dark:border-white/10", className)}
      style={{ width: size, height: size }}
    >
      <Image
        key={finalSrc}
        src={finalSrc}
        alt={`${symbol || "Crypto"} logo`}
        width={size}
        height={size}
        className="object-cover"
        onError={() => {
          if (finalSrc !== FALLBACK_LOGO) {
            setFailed(true);
          }
        }}
        unoptimized
      />
    </div>
  );
}
