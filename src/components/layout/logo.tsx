import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * NS monogram: an N and S drawn as one continuous line, joined by a coral node —
 * the point where building (N) hands over to validating (S).
 */
export function Monogram({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  const tile = tone === "light" ? "var(--color-plum)" : "var(--color-ivory)";
  const stroke = tone === "light" ? "var(--color-ivory)" : "var(--color-plum)";
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={cn("size-10 shrink-0", className)}>
      <rect width="48" height="48" rx="14" fill={tile} />
      <path d="M12.5 33V15l11 18V15" fill="none" stroke={stroke} strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M36.2 17.4c-1.1-1.6-2.9-2.5-4.9-2.4-2.4.1-4.1 1.7-3.9 3.7.3 3.7 9 2.7 9 7.7 0 2.7-2.3 4.7-5.1 4.6-2 0-3.8-1-4.8-2.5"
        fill="none"
        stroke={stroke}
        strokeWidth="3.4"
        strokeLinecap="round"
      />
      <circle cx="23.5" cy="15" r="3.6" fill="var(--color-coral)" />
      <circle cx="23.5" cy="15" r="1.3" fill={tile} />
    </svg>
  );
}

/** Full logo: monogram + wordmark. Use tone="dark" on plum or other dark backgrounds. */
export function Logo({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  return (
    <Link href="/" className={cn("group inline-flex items-center gap-2.5 rounded-xl", className)} aria-label="NS Digital Solutions, home">
      <Monogram tone={tone} className="transition-transform duration-500 ease-[var(--ease-studio)] group-hover:-rotate-6" />
      <span className={cn("font-display text-[1.05rem] leading-none tracking-tight", tone === "light" ? "text-plum" : "text-ivory")}>
        <span className="font-bold">NS</span> <span className="font-semibold">Digital</span>{" "}
        <span className={cn("font-medium", tone === "light" ? "text-plum-soft" : "text-ivory/75")}>Solutions</span>
      </span>
    </Link>
  );
}
