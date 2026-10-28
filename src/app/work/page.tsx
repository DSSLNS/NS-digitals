import type { Metadata } from "next";
import { Suspense } from "react";
import { Info } from "lucide-react";
import { projectIndustries } from "@/content/projects";
import { getProjectCards, getServices } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { PortfolioGrid, PortfolioView } from "@/components/portfolio/portfolio-grid";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { Container, Section } from "@/components/ui/section";

export const metadata: Metadata = buildMetadata({
  title: "Our Work: Website, E-commerce & QA Case Studies",
  description:
    "Concept case studies across e-commerce, SaaS, healthcare, hospitality, education, travel and professional services, showing how we design, build, test, optimise and maintain websites.",
  path: "/work",
});

export default async function WorkPage() {
  const [projects, services] = await Promise.all([getProjectCards(), getServices()]);
  const industries = projectIndustries.filter((i) => projects.some((p) => p.industry === i));
  const props = { projects, services: services.map((s) => ({ slug: s.slug, label: s.title })), industries };
  const hasConcepts = projects.some((p) => p.kind === "concept");

  return (
    <>
      <PageHero
        crumbs={[{ label: "Our Work", href: "/work" }]}
        eyebrow="Our work"
        title="Case studies across every service we offer."
        lead="Each project opens a full case study: the challenge, our design and development approach, how it was tested and how it works on every screen. Filter by service or industry to find work like yours."
      />
      <Section className="pt-0 sm:pt-0">
        <Container>
          {hasConcepts && (
            <div className="mb-12 flex items-start gap-3 rounded-2xl border border-dashed border-plum/30 bg-white p-5 text-plum">
              <Info aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-coral-ink" />
              <p>
                <strong>About these projects:</strong> projects marked &ldquo;Concept project&rdquo; use fictional brands and briefs created to demonstrate our capabilities. They are not
                client work and make no claims about client results. Verified client case studies will be added as they are approved for publication.
              </p>
            </div>
          )}
          {/* The fallback is the full, unfiltered grid, so the page is complete without JavaScript. */}
          <Suspense fallback={<PortfolioView {...props} service={null} industry={null} />}>
            <PortfolioGrid {...props} />
          </Suspense>
        </Container>
      </Section>
      <CtaBand title="Have a project like one of these?" lead="Tell us what you're working on. We'll reply with questions, options and a clear next step." />
    </>
  );
}
