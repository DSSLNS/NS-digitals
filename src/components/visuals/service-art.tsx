import type { ServiceSlug } from "@/content/services";
import { cn } from "@/lib/utils";

/*
 * Line-art illustrations, one per service. Pieces animate on hover of the parent `.group`
 * card. All transforms use fill-box origins so SVG parts rotate/move around their own centre.
 */

const P = "var(--color-plum)";
const box = "[transform-box:fill-box] origin-center transition-transform duration-700 ease-[var(--ease-studio)]";

function Development() {
  return (
    <>
      <rect x="18" y="18" width="124" height="84" rx="12" fill="white" stroke={P} strokeWidth="2.5" />
      <path d="M18 38h124" stroke={P} strokeWidth="2.5" />
      <circle cx="31" cy="28" r="3" fill="var(--color-coral)" />
      <circle cx="42" cy="28" r="3" fill="var(--color-sun)" />
      <circle cx="53" cy="28" r="3" fill="var(--color-mint-deep)" />
      <g className={cn(box, "group-hover:-translate-x-1.5")}>
        <path d="M62 56 50 68l12 12" fill="none" stroke={P} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <g className={cn(box, "group-hover:translate-x-1.5")}>
        <path d="m98 56 12 12-12 12" fill="none" stroke={P} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <path d="m86 52-12 32" stroke="var(--color-coral)" strokeWidth="3" strokeLinecap="round" />
    </>
  );
}

function Redesign() {
  return (
    <>
      <rect x="20" y="30" width="80" height="64" rx="10" fill="none" stroke={P} strokeOpacity=".35" strokeWidth="2" strokeDasharray="5 5" />
      <g className={cn(box, "group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:rotate-2")}>
        <rect x="56" y="18" width="84" height="68" rx="12" fill="white" stroke={P} strokeWidth="2.5" />
        <rect x="66" y="30" width="34" height="6" rx="3" fill={P} />
        <rect x="66" y="42" width="56" height="4" rx="2" fill={P} fillOpacity=".25" />
        <rect x="66" y="64" width="26" height="12" rx="6" fill="var(--color-coral)" />
        <circle cx="120" cy="66" r="10" fill="var(--color-lavender-deep)" />
      </g>
      <path d="M30 104c18 8 44 6 60-8" fill="none" stroke="var(--color-coral)" strokeWidth="2.5" strokeLinecap="round" />
      <path d="m84 92 7 4-2 8" fill="none" stroke="var(--color-coral)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </>
  );
}

function BugFixing() {
  return (
    <>
      <circle cx="80" cy="60" r="44" fill="none" stroke={P} strokeOpacity=".2" strokeWidth="2" strokeDasharray="3 6" className={cn(box, "group-hover:rotate-45")} />
      <g className={cn(box, "group-hover:scale-90")}>
        <ellipse cx="80" cy="64" rx="16" ry="21" fill="var(--color-sun)" stroke={P} strokeWidth="2.5" />
        <path d="M80 44v41M64 58h-10M64 70h-10M96 58h10M96 70h10M68 48l-6-8M92 48l6-8" stroke={P} strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="80" cy="42" r="7" fill={P} />
      </g>
      <path d="M118 28 134 12M126 12h8v8" stroke="var(--color-coral)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="30" cy="96" r="5" fill="var(--color-mint-deep)" />
    </>
  );
}

function QaTesting() {
  const rows = [36, 60, 84];
  return (
    <>
      <rect x="34" y="16" width="92" height="92" rx="14" fill="white" stroke={P} strokeWidth="2.5" />
      {rows.map((y, i) => (
        <g key={y}>
          <rect x="48" y={y - 8} width="16" height="16" rx="5" fill={i === 2 ? "var(--color-lavender)" : "var(--color-mint)"} stroke={P} strokeWidth="2" />
          {i < 2 ? (
            <path d={`m51.5 ${y}l3.5 3.5 6-7`} fill="none" stroke={P} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          ) : (
            <path
              d={`m51.5 ${y}l3.5 3.5 6-7`}
              fill="none"
              stroke={P}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          )}
          <rect x="72" y={y - 3} width={i === 1 ? 30 : 40} height="6" rx="3" fill={P} fillOpacity=".25" />
        </g>
      ))}
      <circle cx="128" cy="96" r="14" fill="var(--color-coral)" className={cn(box, "group-hover:scale-110")} />
      <path d="m122 96 4.5 4.5 8-9" fill="none" stroke={P} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </>
  );
}

function Ecommerce() {
  return (
    <>
      <g className={cn(box, "group-hover:-translate-y-1.5")}>
        <path d="M46 44h68l-6 58H52z" fill="var(--color-coral-soft)" stroke={P} strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M64 50V38a16 16 0 0 1 32 0v12" fill="none" stroke={P} strokeWidth="2.5" strokeLinecap="round" />
      </g>
      <g className={cn(box, "group-hover:rotate-12")}>
        <path d="M104 70h28l6 10-6 10h-28z" fill="var(--color-sun)" stroke={P} strokeWidth="2.5" strokeLinejoin="round" />
        <circle cx="128" cy="80" r="2.5" fill={P} />
      </g>
      <circle cx="30" cy="30" r="6" fill="var(--color-lavender-deep)" />
      <path d="M68 74h24" stroke={P} strokeWidth="2.5" strokeLinecap="round" />
    </>
  );
}

function SeoPerformance() {
  return (
    <>
      <path d="M32 86a48 48 0 0 1 96 0" fill="none" stroke={P} strokeOpacity=".2" strokeWidth="10" strokeLinecap="round" />
      <path d="M32 86a48 48 0 0 1 70-42.7" fill="none" stroke="var(--color-mint-deep)" strokeWidth="10" strokeLinecap="round" />
      <g className="origin-[80px_86px] -rotate-45 transition-transform duration-1000 ease-[var(--ease-studio)] group-hover:rotate-[30deg]">
        <path d="M80 86V50" stroke={P} strokeWidth="3.5" strokeLinecap="round" />
      </g>
      <circle cx="80" cy="86" r="7" fill="var(--color-coral)" stroke={P} strokeWidth="2.5" />
      <g className={cn(box, "group-hover:scale-110")}>
        <circle cx="126" cy="30" r="12" fill="white" stroke={P} strokeWidth="2.5" />
        <path d="m135 39 8 8" stroke={P} strokeWidth="3" strokeLinecap="round" />
      </g>
    </>
  );
}

function Maintenance() {
  return (
    <>
      <g className={cn(box, "group-hover:rotate-90")}>
        <path d="M44 60a36 36 0 0 1 62-25" fill="none" stroke={P} strokeWidth="2.5" strokeLinecap="round" />
        <path d="m108 24-2 12-12-2" fill="none" stroke={P} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M116 60a36 36 0 0 1-62 25" fill="none" stroke={P} strokeWidth="2.5" strokeLinecap="round" />
        <path d="m52 96 2-12 12 2" fill="none" stroke={P} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <path d="M80 44l18 7v11c0 11-8 18-18 21-10-3-18-10-18-21V51z" fill="var(--color-mint)" stroke={P} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="m72 63 6 6 11-12" fill="none" stroke={P} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="132" cy="98" r="6" fill="var(--color-coral)" />
    </>
  );
}

const art: Record<ServiceSlug, () => React.ReactElement> = {
  "website-development": Development,
  "website-redesign": Redesign,
  "bug-fixing": BugFixing,
  "qa-testing": QaTesting,
  "ecommerce-development": Ecommerce,
  "seo-performance": SeoPerformance,
  "website-maintenance": Maintenance,
};

export function ServiceArt({ slug, className }: { slug: ServiceSlug; className?: string }) {
  const Art = art[slug];
  return (
    <svg viewBox="0 0 160 120" aria-hidden="true" className={cn("h-auto w-full", className)}>
      <Art />
    </svg>
  );
}
