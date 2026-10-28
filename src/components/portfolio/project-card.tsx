import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ProjectCardData } from "@/content/projects";
import { projectToneSurface } from "@/lib/tones";
import { cn } from "@/lib/utils";
import { BrowserFrame } from "./screen-frame";

export function ConceptBadge({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center rounded-full border border-dashed border-plum/35 bg-white/80 px-2.5 py-0.5 text-xs font-semibold text-plum", className)}>
      Concept project
    </span>
  );
}

/*
 * Portfolio card: a real website preview, the project's industry and main service, the problem and
 * solution, the services involved and a "View case study" cue. Uses the stretched-link pattern so the
 * whole card is clickable while screen readers hear one descriptive link (the title).
 */
export function ProjectCard({
  project,
  featured,
  headingLevel = "h3",
  priority,
}: {
  project: ProjectCardData;
  featured?: boolean;
  headingLevel?: "h2" | "h3";
  priority?: boolean;
}) {
  const H = headingLevel;
  const primary = project.services.find((s) => s.slug === project.primaryService);
  return (
    <article className={cn("group relative flex h-full flex-col", featured && "lg:grid lg:grid-cols-[1.35fr_1fr] lg:items-center lg:gap-12")}>
      <div className={cn("rounded-[1.25rem] p-3 transition-[transform,box-shadow] duration-500 ease-[var(--ease-studio)] group-hover:-translate-y-1 group-hover:shadow-lift sm:p-5", projectToneSurface[project.tone])}>
        <BrowserFrame
          slug={project.slug}
          view={project.cover.view}
          domain={project.domain}
          zoom
          priority={priority}
          sizes={featured ? "(min-width: 1280px) 720px, (min-width: 1024px) 56vw, 92vw" : "(min-width: 1280px) 560px, (min-width: 768px) 46vw, 92vw"}
        />
      </div>
      <div className={cn("flex flex-1 flex-col pt-6", featured && "lg:pt-0")}>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
          <span className="font-semibold text-coral-ink">{project.industry}</span>
          <span aria-hidden="true" className="text-plum/30">
            /
          </span>
          <span className="font-medium text-plum">{primary?.label}</span>
          {project.kind === "concept" && <ConceptBadge />}
        </div>
        <H className={cn("mt-3 font-bold leading-tight", featured ? "text-3xl sm:text-4xl" : "text-2xl")}>
          <Link href={`/work/${project.slug}`} className="rounded after:absolute after:inset-0 after:rounded-[1.5rem] after:content-[''] focus-visible:outline-none">
            {project.title}
          </Link>
        </H>
        <p className="mt-3 leading-relaxed text-muted">{project.summary}</p>
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Services involved">
          {project.services.map((s) => (
            <li key={s.slug} className="rounded-full bg-white px-3 py-1 text-xs font-medium text-plum ring-1 ring-plum/10">
              {s.label}
            </li>
          ))}
        </ul>
        <span aria-hidden="true" className="mt-auto inline-flex items-center gap-1.5 pt-5 font-semibold text-plum">
          View case study
          <ArrowRight className="size-4 text-coral-ink transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
      {/* Focus ring for the stretched link, drawn around the whole card. */}
      <span aria-hidden="true" className="pointer-events-none absolute -inset-2 rounded-[1.6rem] ring-coral-strong group-has-[:focus-visible]:ring-[3px]" />
    </article>
  );
}
