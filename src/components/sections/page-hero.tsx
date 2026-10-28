import type { Crumb } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { Container, Eyebrow } from "@/components/ui/section";
import { cn } from "@/lib/utils";

/** Interior page hero: breadcrumbs, eyebrow, the page's single H1, lead, optional actions and visual. */
export function PageHero({
  crumbs,
  eyebrow,
  title,
  lead,
  actions,
  visual,
  className,
}: {
  crumbs: Crumb[];
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  actions?: React.ReactNode;
  visual?: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("relative -mt-20 overflow-hidden pb-16 pt-32 sm:pb-20 sm:pt-36", className)}>
      <div aria-hidden="true" className="grid-lines mask-fade absolute inset-0 opacity-70" />
      <div aria-hidden="true" className="absolute -right-32 -top-20 size-[28rem] rounded-full bg-lavender/70 blur-3xl" />
      <Container className={cn("relative", visual && "grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]")}>
        <div>
          <Breadcrumbs items={crumbs} />
          {eyebrow && (
            <div className="mt-8 animate-rise">
              <Eyebrow>{eyebrow}</Eyebrow>
            </div>
          )}
          <h1 className="mt-5 max-w-4xl animate-slide-up text-[2.6rem] font-bold leading-[1.02] tracking-[-0.03em] sm:text-6xl lg:text-[4.2rem]">{title}</h1>
          {lead && <p className="mt-6 max-w-2xl animate-rise text-lg leading-relaxed text-muted [animation-delay:120ms] sm:text-xl">{lead}</p>}
          {actions && <div className="mt-9 flex animate-rise flex-col gap-3 [animation-delay:200ms] sm:flex-row">{actions}</div>}
        </div>
        {visual && <div className="animate-rise [animation-delay:150ms]">{visual}</div>}
      </Container>
    </section>
  );
}
