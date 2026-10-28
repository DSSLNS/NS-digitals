import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import type { Industry } from "@/content/industries";
import type { Project } from "@/content/projects";
import { serviceLabel, type Service } from "@/content/services";
import type { PostSummary } from "@/lib/content";
import { toneSurface } from "@/lib/tones";
import { cn, formatDate } from "@/lib/utils";
import { BrowserMockup } from "./visuals/browser-mockup";
import { IndustryArt } from "./visuals/industry-art";
import { PostCover } from "./visuals/post-cover";
import { ServiceArt } from "./visuals/service-art";

/*
 * Cards use the "stretched link" pattern: one real link (the title) whose ::after covers the card,
 * so the whole card is clickable while screen readers hear a single, descriptive link.
 */
const stretched = "after:absolute after:inset-0 after:rounded-[inherit] after:content-['']";
const lift = "transition-[transform,box-shadow] duration-500 ease-[var(--ease-studio)] hover:-translate-y-1.5 hover:shadow-lift focus-within:-translate-y-1.5 focus-within:shadow-lift";

export function ServiceCard({ service, large, headingLevel = "h3" }: { service: Service; large?: boolean; headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-plum/8 p-7 shadow-soft sm:p-8",
        toneSurface[service.tone],
        lift,
        large && "lg:flex-row lg:items-center lg:gap-10",
      )}
    >
      <div className={cn("relative mb-6 max-w-[13rem]", large && "lg:order-2 lg:mb-0 lg:max-w-[22rem] lg:flex-1")}>
        <ServiceArt slug={service.slug} />
      </div>
      <div className={cn("flex flex-1 flex-col", large && "lg:max-w-md")}>
        <H className={cn("font-bold leading-tight", large ? "text-3xl sm:text-4xl" : "text-2xl")}>
          <Link href={`/services/${service.slug}`} className={cn("rounded focus-visible:outline-none", stretched)}>
            {service.title}
          </Link>
        </H>
        <p className="mt-3 leading-relaxed text-charcoal/80">{service.cardDescription}</p>
        <span aria-hidden="true" className="mt-auto inline-flex items-center gap-1.5 pt-6 font-semibold text-plum">
          Explore Service
          <ArrowRight className="size-4 text-coral-ink transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
      {/* Focus ring for the stretched link, drawn on the card. */}
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[inherit] ring-coral-strong ring-offset-2 group-has-[:focus-visible]:ring-[3px]" />
    </article>
  );
}

export function IndustryCard({ industry }: { industry: Industry }) {
  return (
    <article className={cn("group relative flex h-full flex-col rounded-[1.75rem] border border-plum/8 p-7 shadow-soft", toneSurface[industry.tone], lift)}>
      <IndustryArt art={industry.art} />
      <h3 className="mt-6 text-xl font-bold">
        <Link href={`/industries#${industry.slug}`} className={cn("rounded focus-visible:outline-none", stretched)}>
          {industry.title}
        </Link>
      </h3>
      <p className="mt-2.5 leading-relaxed text-charcoal/80">{industry.summary}</p>
      <span aria-hidden="true" className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-plum">
        How we help
        <ArrowRight className="size-4 text-coral-ink transition-transform duration-300 group-hover:translate-x-1" />
      </span>
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[inherit] ring-coral-strong ring-offset-2 group-has-[:focus-visible]:ring-[3px]" />
    </article>
  );
}

export function DemoBadge({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center rounded-full border border-dashed border-plum/40 bg-white/80 px-3 py-1 text-xs font-semibold text-plum", className)}>
      Demonstration project
    </span>
  );
}

export function ProjectCard({ project, featured, headingLevel = "h3" }: { project: Project; featured?: boolean; headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  return (
    <article className={cn("group relative flex h-full flex-col", featured && "lg:grid lg:grid-cols-[1.25fr_1fr] lg:items-center lg:gap-12")}>
      <div className={cn("relative overflow-hidden rounded-[1.75rem] bg-ivory-deep p-5 sm:p-8", project.kind === "demonstration" && "pt-14 sm:pt-16")}>
        <div className="transition-transform duration-700 ease-[var(--ease-studio)] group-hover:-translate-y-2 group-hover:rotate-[-0.6deg] group-hover:scale-[1.02]">
          <BrowserMockup preview={project.preview} />
        </div>
        {project.kind === "demonstration" && <DemoBadge className="absolute left-5 top-4 sm:left-8 sm:top-5" />}
      </div>
      <div className={cn("pt-6", featured && "lg:pt-0")}>
        <p className="text-sm font-semibold text-coral-ink">
          {project.industry} · {project.category}
        </p>
        <H className={cn("mt-2 font-bold leading-tight", featured ? "text-3xl sm:text-4xl" : "text-2xl")}>
          <Link href={`/work/${project.slug}`} className={cn("rounded focus-visible:outline-none", stretched)}>
            {project.title}
          </Link>
        </H>
        <p className="mt-3 leading-relaxed text-muted">{project.summary}</p>
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Services delivered">
          {project.services.map((s) => (
            <li key={s} className="rounded-full bg-white px-3 py-1 text-xs font-medium text-plum ring-1 ring-plum/10">
              {serviceLabel(s)}
            </li>
          ))}
        </ul>
        <span aria-hidden="true" className="mt-5 inline-flex items-center gap-1.5 font-semibold text-plum">
          View project
          <ArrowRight className="size-4 text-coral-ink transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
      <span aria-hidden="true" className="pointer-events-none absolute -inset-2 rounded-[2rem] ring-coral-strong group-has-[:focus-visible]:ring-[3px]" />
    </article>
  );
}

export function PostCard({ post, headingLevel = "h3" }: { post: PostSummary; headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  return (
    <article className={cn("group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-plum/8 bg-white shadow-soft", lift)}>
      <PostCover cover={post.cover} className="aspect-[16/9]" />
      <div className="flex flex-1 flex-col p-7">
        <p className="text-sm font-semibold text-coral-ink">{post.category}</p>
        <H className="mt-2 text-xl font-bold leading-snug">
          <Link href={`/insights/${post.slug}`} className={cn("rounded focus-visible:outline-none", stretched)}>
            {post.title}
          </Link>
        </H>
        <p className="mt-3 leading-relaxed text-muted">{post.excerpt}</p>
        <div className="mt-auto space-y-4 pt-6 text-sm">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-muted">
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1">
              <Clock aria-hidden="true" className="size-3.5" />
              {post.readingMinutes} min read
            </span>
          </p>
          <span aria-hidden="true" className="inline-flex items-center gap-1 font-semibold text-plum">
            Read Article
            <ArrowRight className="size-4 text-coral-ink transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[inherit] ring-inset ring-coral-strong group-has-[:focus-visible]:ring-[3px]" />
    </article>
  );
}
