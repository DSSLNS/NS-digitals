import { BriefcaseBusiness, Code2, Rocket, ShoppingBag, Store, UtensilsCrossed, type LucideIcon } from "lucide-react";
import type { Industry } from "@/content/industries";
import { cn } from "@/lib/utils";

/* A distinct geometric composition per industry: a shape, an accent and an icon, animated on card hover. */
const config: Record<Industry["art"], { Icon: LucideIcon; shape: React.ReactNode; accent: string }> = {
  retail: {
    Icon: ShoppingBag,
    shape: <rect x="10" y="10" width="60" height="60" rx="18" />,
    accent: "bg-sun",
  },
  startup: {
    Icon: Rocket,
    shape: <path d="M40 6 74 70H6z" />,
    accent: "bg-coral",
  },
  professional: {
    Icon: BriefcaseBusiness,
    shape: <circle cx="40" cy="40" r="32" />,
    accent: "bg-mint-deep",
  },
  saas: {
    Icon: Code2,
    shape: <path d="M40 6 70 23v34L40 74 10 57V23z" />,
    accent: "bg-lavender-deep",
  },
  hospitality: {
    Icon: UtensilsCrossed,
    shape: <path d="M40 8c18 0 32 14 32 32S58 72 40 72 8 58 8 40c0-10 4-14 10-20S30 8 40 8z" />,
    accent: "bg-coral",
  },
  smallbiz: {
    Icon: Store,
    shape: <path d="M10 30 40 8l30 22v40H10z" />,
    accent: "bg-sun",
  },
};

export function IndustryArt({ art, className }: { art: Industry["art"]; className?: string }) {
  const { Icon, shape, accent } = config[art];
  return (
    <div aria-hidden="true" className={cn("relative size-20", className)}>
      <svg viewBox="0 0 80 80" className="absolute inset-0 size-full fill-white stroke-plum transition-transform duration-700 ease-[var(--ease-studio)] [stroke-width:2] group-hover:rotate-6">
        {shape}
      </svg>
      <span className={cn("absolute -right-1 -top-1 size-4 rounded-full transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1", accent)} />
      <Icon className="absolute left-1/2 top-1/2 size-8 -translate-x-1/2 -translate-y-1/2 text-plum" strokeWidth={1.75} />
    </div>
  );
}
