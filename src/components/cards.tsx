import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import type { Industry } from "@/content/industries";
import type { Service } from "@/content/services";
import type { PostSummary } from "@/lib/content";
import { toneSurface } from "@/lib/tones";
import { cn, formatDate } from "@/lib/utils";
import { BrowserFrame } from "./portfolio/screen-frame";
import { IconTile, industryIcons, ServiceIcon } from "./visuals/icons";
import { PostCover } from "./visuals/post-cover";

/*
 * Cards use the "stretched link" pattern: one real link (the title) whose ::after covers the card,
 * so the whole card is clickable while screen readers hear a single, descriptive link.
 */
const stretched = "after:absolute after:inset-0 after:rounded-[inherit] after:content-['']";
const lift = "transition-[transform,box-shadow] duration-500 ease-[var(--ease-studio)] hover:-translate-y-1 hover:shadow-lift focus-within:-translate-y-1 focus-within:shadow-lift";
const focusRing = "pointer-events-none absolute inset-0 rounded-[inherit] ring-coral-strong ring-offset-2 group-has-[:focus-visible]:ring-[3px]";

export type ServicePreview = { slug: string; view: string; domain: string };

export function ServiceCard({
  service,
  large,
  compact,
  preview,
  headingLevel = "h3",
}: {
  service: Service;
  large?: boolean;
  compact?: boolean;
  /** A related project screen, shown on the large card. */
  preview?: ServicePreview;
  headingLevel?: "h2" | "h3";
}) {
  const H = headingLevel;
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-plum/10 shadow-soft",
        compact ? "p-6" : "p-7 sm:p-8",
        toneSurface[service.tone],
        lift,
        large && preview && "lg:flex-row lg:items-center lg:gap-10",
      )}
    >
      <div className={cn("flex flex-1 flex-col", large && preview && "lg:max-w-sm")}>
        <ServiceIcon slug={service.slug} />
        <H className={cn("mt-6 font-bold leading-tight", large ? "text-3xl sm:text-4xl" : compact ? "text-xl" : "text-2xl")}>
          <Link href={`/services/${service.slug}`} className={cn("rounded focus-visible:outline-none", stretched)}>
            {service.title}
          </Link>
        </H>
        <p className={cn("mt-3 leading-relaxed text-charcoal/80", compact && "text-base")}>{service.cardDescription}</p>
        <span aria-hidden="true" className="mt-auto inline-flex items-center gap-1.5 pt-6 font-semibold text-plum">
          Explore service
          <ArrowRight className="size-4 text-coral-ink transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
      {large && preview && (
        <div className="mt-8 lg:mt-0 lg:flex-1">
          <BrowserFrame slug={preview.slug} view={preview.view} domain={preview.domain} zoom sizes="(min-width: 1024px) 420px, 88vw" />
        </div>
      )}
      <span aria-hidden="true" className={focusRing} />
    </article>
  );
}

export function IndustryCard({ industry }: { industry: Industry }) {
  return (
    <article className={cn("group relative flex h-full flex-col rounded-[1.5rem] border border-plum/10 p-7 shadow-soft", toneSurface[industry.tone], lift)}>
      <IconTile icon={industryIcons[industry.art]} />
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
      <span aria-hidden="true" className={focusRing} />
    </article>
  );
}

export function PostCard({ post, headingLevel = "h3" }: { post: PostSummary; headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  return (
    <article className={cn("group relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-plum/10 bg-white shadow-soft", lift)}>
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
