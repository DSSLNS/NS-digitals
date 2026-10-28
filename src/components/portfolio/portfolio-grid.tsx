"use client";

import { useId } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import * as m from "motion/react-m";
import { RotateCcw } from "lucide-react";
import type { ProjectCardData } from "@/content/projects";
import type { ServiceSlug } from "@/content/services";
import { staggerItem } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";
import { ProjectCard } from "./project-card";

type Option = { slug: ServiceSlug; label: string };

type ViewProps = {
  projects: ProjectCardData[];
  services: Option[];
  industries: readonly string[];
  service: ServiceSlug | null;
  industry: string | null;
  onChange?: (next: { service: ServiceSlug | null; industry: string | null }) => void;
};

const matches = (p: ProjectCardData, service: string | null, industry: string | null) =>
  (!service || p.services.some((s) => s.slug === service)) && (!industry || p.industry === industry);

/**
 * Filterable portfolio. Each filter's counts reflect the other active filter, and options with no
 * matching projects are disabled, so a combination can never produce an empty grid.
 */
export function PortfolioView({ projects, services, industries, service, industry, onChange }: ViewProps) {
  const selectId = useId();
  const visible = projects.filter((p) => matches(p, service, industry));
  const serviceCount = (s: ServiceSlug | null) => projects.filter((p) => matches(p, s, industry)).length;
  const industryCount = (i: string | null) => projects.filter((p) => matches(p, service, i)).length;
  const set = (next: Partial<{ service: ServiceSlug | null; industry: string | null }>) => onChange?.({ service, industry, ...next });
  const filtered = Boolean(service || industry);

  return (
    <div>
      <div className="flex flex-col gap-6 border-b border-line pb-8 lg:flex-row lg:items-end lg:justify-between">
        <div role="group" aria-label="Filter by service" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0">
          {[{ slug: null, label: "All work" } as const, ...services].map((o) => {
            const count = serviceCount(o.slug);
            const active = service === o.slug;
            return (
              <button
                key={o.slug ?? "all"}
                type="button"
                aria-pressed={active}
                disabled={!active && count === 0}
                onClick={() => set({ service: o.slug })}
                className={cn(
                  "inline-flex min-h-10 shrink-0 items-center gap-2 whitespace-nowrap rounded-full border px-4 text-sm font-semibold transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-40",
                  active ? "border-plum bg-plum text-ivory" : "border-plum/15 bg-white text-plum hover:border-plum/50",
                )}
              >
                {o.label}
                <span className={cn("rounded-full px-1.5 text-xs tabular-nums", active ? "bg-ivory/15" : "bg-ivory-deep text-muted")}>{count}</span>
              </button>
            );
          })}
        </div>
        <div className="flex shrink-0 items-end gap-3">
          <div>
            <label htmlFor={selectId} className="mb-1.5 block text-sm font-semibold text-plum">
              Industry
            </label>
            <select
              id={selectId}
              value={industry ?? ""}
              onChange={(e) => set({ industry: e.target.value || null })}
              className="min-h-11 w-full rounded-xl border border-plum/20 bg-white px-3 pr-9 text-sm text-charcoal sm:w-64"
            >
              <option value="">All industries ({industryCount(null)})</option>
              {industries.map((i) => {
                const count = industryCount(i);
                return (
                  <option key={i} value={i} disabled={count === 0 && industry !== i}>
                    {i} ({count})
                  </option>
                );
              })}
            </select>
          </div>
          {filtered && (
            <button type="button" onClick={() => set({ service: null, industry: null })} className="inline-flex min-h-11 items-center gap-1.5 rounded-full px-3 text-sm font-semibold text-plum hover:bg-white">
              <RotateCcw aria-hidden="true" className="size-4" /> Clear
            </button>
          )}
        </div>
      </div>

      <p aria-live="polite" className="mt-6 text-sm text-muted">
        Showing {visible.length} of {projects.length} projects
        {service && <> for {services.find((s) => s.slug === service)?.label}</>}
        {industry && <> in {industry}</>}
      </p>

      <m.ul
        key={`${service}-${industry}`}
        className="mt-8 grid gap-x-8 gap-y-16 md:grid-cols-2"
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
      >
        {visible.map((p) => (
          <m.li key={p.slug} data-reveal="" variants={staggerItem}>
            <ProjectCard project={p} headingLevel="h2" />
          </m.li>
        ))}
      </m.ul>
    </div>
  );
}

/** URL-synced wrapper: ?service=qa-testing&industry=Travel%20%26%20Tourism, so filtered views can be linked and shared. */
export function PortfolioGrid(props: Omit<ViewProps, "service" | "industry" | "onChange">) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const rawService = params.get("service");
  const rawIndustry = params.get("industry");
  // Ignore unknown values rather than showing an empty grid.
  const service = props.services.some((s) => s.slug === rawService) ? (rawService as ServiceSlug) : null;
  const knownIndustry = rawIndustry && props.industries.includes(rawIndustry) ? rawIndustry : null;
  // A linked combination with no projects falls back to the service alone.
  const industry = knownIndustry && props.projects.some((p) => matches(p, service, knownIndustry)) ? knownIndustry : null;

  return (
    <PortfolioView
      {...props}
      service={service}
      industry={industry}
      onChange={(next) => {
        const q = new URLSearchParams();
        if (next.service) q.set("service", next.service);
        if (next.industry) q.set("industry", next.industry);
        const qs = q.toString();
        router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
      }}
    />
  );
}
