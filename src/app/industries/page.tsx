import type { Metadata } from "next";
import { Check } from "lucide-react";
import { getIndustries } from "@/lib/content";
import { getService } from "@/content/services";
import { buildMetadata } from "@/lib/seo";
import { toneSurface } from "@/lib/tones";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { ArrowLink } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/section";
import { IconTile, industryIcons } from "@/components/visuals/icons";

export const metadata: Metadata = buildMetadata({
  title: "Industries: Websites for E-commerce, SaaS, Startups & More",
  description:
    "How we plan web development, QA and performance work around the needs of retail and e-commerce, startups, professional services, SaaS, hospitality and small businesses.",
  path: "/industries",
});

export default async function IndustriesPage() {
  const industries = await getIndustries();
  return (
    <>
      <PageHero
        crumbs={[{ label: "Industries", href: "/industries" }]}
        eyebrow="Industries"
        title="Digital solutions for businesses with ambition."
        lead="Different sectors need different things from a website. Here's what we plan around for each, and the services that usually fit best."
      />
      <Section className="pt-0 sm:pt-0">
        <Container className="space-y-6">
          {industries.map((ind) => (
            <Reveal key={ind.slug}>
              <article id={ind.slug} className={cn("group scroll-mt-28 rounded-[2rem] border border-plum/8 p-7 sm:p-10", toneSurface[ind.tone])}>
                <div className="grid gap-8 lg:grid-cols-[auto_1.2fr_1fr] lg:items-start lg:gap-12">
                  <IconTile icon={industryIcons[ind.art]} size="lg" />
                  <div>
                    <h2 className="text-3xl font-bold">{ind.title}</h2>
                    <p className="mt-3 text-lg leading-relaxed text-charcoal/85">{ind.summary}</p>
                    <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                      {ind.needs.map((n) => (
                        <li key={n} className="flex items-start gap-2 font-medium text-plum">
                          <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-coral-ink" strokeWidth={3} />
                          {n}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-[1.5rem] bg-white/70 p-6">
                    <h3 className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-coral-ink">Services that fit</h3>
                    <ul className="mt-4 space-y-3">
                      {ind.services.map((s) => (
                        <li key={s}>
                          <ArrowLink href={`/services/${s}`}>{getService(s)?.title ?? s}</ArrowLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
          <p className="pt-4 text-sm text-muted">
            Industry descriptions reflect the typical needs we plan for in each sector. They are not claims about specific past clients.
          </p>
        </Container>
      </Section>
      <CtaBand title="Don't see your industry?" lead="Most of what makes a website work is universal. Tell us about your business and we'll tell you honestly whether we're a good fit." />
    </>
  );
}
