import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { breadcrumbSchema, type Crumb } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { JsonLd } from "./json-ld";

/** Visible breadcrumb trail plus matching BreadcrumbList structured data. Home is added automatically. */
export function Breadcrumbs({ items, className }: { items: Crumb[]; className?: string }) {
  const crumbs = [{ label: "Home", href: "/" }, ...items];
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <nav aria-label="Breadcrumb" className={cn("text-sm", className)}>
        <ol className="flex flex-wrap items-center gap-1.5 text-muted">
          {crumbs.map((crumb, i) =>
            i === crumbs.length - 1 ? (
              <li key={crumb.href} aria-current="page" className="font-medium text-plum">
                {crumb.label}
              </li>
            ) : (
              <li key={crumb.href} className="flex items-center gap-1.5">
                <Link href={crumb.href} className="rounded transition-colors hover:text-plum">
                  {crumb.label}
                </Link>
                <ChevronRight aria-hidden="true" className="size-3.5 opacity-60" />
              </li>
            ),
          )}
        </ol>
      </nav>
    </>
  );
}
