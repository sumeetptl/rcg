export const LOGO_BASE_PATH = "/assets/crypto-logos";

// Explicit overrides for symbols that don't match their filename exactly
// or where we want to map multiple symbols to one logo.
const LOGO_EXCEPTIONS: Record<string, string> = {
  // Example: "BTC": "bitcoin.svg" (if we wanted to enforce that)
  // Based on file list, "btc.svg" exists, so standard mapping works.
  // Add special cases here as they are discovered.
  "shib": "shib.svg",
  "doge": "doge.svg",
  // Common variations if needed
};

// Common quote currencies to strip from the end of symbols
const QUOTE_SUFFIXES = [
  "usdt", "usdc", "busd", "usd", "perp"
];

/**
 * Resolves the logo path for a given symbol.
 * Defaults to trying the symbol name as the filename.
 * Automatically strips common quote suffixes (e.g. BTCUSDT -> btc).
 */
export function getLogoPath(symbol: string): string {
  if (!symbol) return `${LOGO_BASE_PATH}/default.svg`;
  
  let normalized = symbol.toLowerCase();
  
  // Strip common quote suffixes
  for (const suffix of QUOTE_SUFFIXES) {
    if (normalized.endsWith(suffix) && normalized.length > suffix.length) {
      normalized = normalized.slice(0, -suffix.length);
      break; // Only strip one suffix (e.g. prioritize USDT over USD)
    }
  }
  
  // Check exceptions first
  if (LOGO_EXCEPTIONS[normalized]) {
    return `${LOGO_BASE_PATH}/${LOGO_EXCEPTIONS[normalized]}`;
  }
  
  // Default convention: symbol.svg
  return `${LOGO_BASE_PATH}/${normalized}.svg`;
}

export const FALLBACK_LOGO = `${LOGO_BASE_PATH}/default.svg`;
