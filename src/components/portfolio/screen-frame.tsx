import Image from "next/image";
import { screenSrc } from "@/content/projects";
import { cn } from "@/lib/utils";

/*
 * Frames for captured website screens. The screenshots are decorative unless an `alt` is given:
 * cards always render the project title as real text next to them.
 */

export function BrowserFrame({
  slug,
  view,
  domain,
  alt = "",
  sizes,
  priority,
  className,
  zoom,
}: {
  slug: string;
  view: string;
  domain: string;
  alt?: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  /** Subtle zoom on hover of the parent `.group`. */
  zoom?: boolean;
}) {
  return (
    <div className={cn("overflow-hidden rounded-xl bg-white shadow-soft ring-1 ring-plum/10", className)}>
      <div aria-hidden="true" className="flex items-center gap-3 border-b border-plum/8 px-3 py-2 sm:px-4">
        <span className="flex gap-1.5">
          <span className="size-2 rounded-full bg-plum/15" />
          <span className="size-2 rounded-full bg-plum/15" />
          <span className="size-2 rounded-full bg-plum/15" />
        </span>
        <span className="min-w-0 flex-1 truncate rounded-md bg-ivory px-3 py-1 text-center text-[0.7rem] text-muted">{domain}</span>
        <span className="w-[2.6rem]" />
      </div>
      <div className="relative aspect-[16/10] overflow-hidden bg-ivory-deep">
        <Image
          src={screenSrc(slug, view)}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn("object-cover object-top", zoom && "transition-transform duration-700 ease-[var(--ease-studio)] group-hover:scale-[1.03]")}
        />
      </div>
    </div>
  );
}

export function PhoneFrame({ slug, view, alt = "", sizes, className }: { slug: string; view: string; alt?: string; sizes: string; className?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-[1.6rem] bg-plum-deep p-1.5 shadow-lift", className)}>
      <div className="relative aspect-[390/844] overflow-hidden rounded-[1.25rem] bg-ivory-deep">
        <Image src={screenSrc(slug, view)} alt={alt} fill sizes={sizes} className="object-cover object-top" />
      </div>
    </div>
  );
}
