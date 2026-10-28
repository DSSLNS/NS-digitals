import { BriefcaseBusiness, Bug, CodeXml, Gauge, Laptop, ListChecks, PanelsTopLeft, Rocket, ShieldCheck, ShoppingBag, Store, UtensilsCrossed, type LucideIcon } from "lucide-react";
import type { Industry } from "@/content/industries";
import type { ServiceSlug } from "@/content/services";
import { cn } from "@/lib/utils";

/** One Lucide line icon per service, used everywhere a service is represented by an icon. */
export const serviceIcons: Record<ServiceSlug, LucideIcon> = {
  "website-development": CodeXml,
  "website-redesign": PanelsTopLeft,
  "bug-fixing": Bug,
  "qa-testing": ListChecks,
  "ecommerce-development": ShoppingBag,
  "seo-performance": Gauge,
  "website-maintenance": ShieldCheck,
};

export const industryIcons: Record<Industry["art"], LucideIcon> = {
  retail: ShoppingBag,
  startup: Rocket,
  professional: BriefcaseBusiness,
  saas: Laptop,
  hospitality: UtensilsCrossed,
  smallbiz: Store,
};

/** The standard icon tile: same size, stroke and treatment for every service and industry icon on the site. */
export function IconTile({ icon: Icon, className, size = "md" }: { icon: LucideIcon; className?: string; size?: "md" | "lg" }) {
  return (
    <span aria-hidden="true" className={cn("grid shrink-0 place-items-center rounded-xl bg-white text-plum ring-1 ring-plum/10", size === "lg" ? "size-14" : "size-12", className)}>
      <Icon className={size === "lg" ? "size-6" : "size-5"} strokeWidth={1.75} />
    </span>
  );
}

export function ServiceIcon({ slug, className, size }: { slug: ServiceSlug; className?: string; size?: "md" | "lg" }) {
  return <IconTile icon={serviceIcons[slug]} className={className} size={size} />;
}
