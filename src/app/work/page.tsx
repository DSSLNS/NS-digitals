import type { Metadata } from "next";
import { Info } from "lucide-react";
import { getProjects } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { ProjectCard } from "@/components/cards";
import { Reveal } from "@/components/motion/reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { Container, Section } from "@/components/ui/section";

export const metadata: Metadata = buildMetadata({
  title: "Our Work: Portfolio & Demonstration Projects",
  description:
    "Explore how NS Digital Solutions approaches website development, redesign, e-commerce and QA projects, from the challenge and approach to delivery.",
  path: "/work",
});

export default async function WorkPage() {
  const projects = await getProjects();
  const hasDemo = projects.some((p) => p.kind === "demonstration");
  return (
    <>
      <PageHero
        crumbs={[{ label: "Our Work", href: "/work" }]}
        eyebrow="Our work"
        title="Thoughtful work. Meaningful outcomes."
        lead="Each project shows the challenge, our approach and how quality was built in. Results are only shown when they are verified and approved by the client."
      />
      <Section className="pt-0 sm:pt-0">
        <Container>
          {hasDemo && (
            <Reveal className="mb-14 flex items-start gap-3 rounded-2xl border border-dashed border-plum/30 bg-white p-5 text-plum">
              <Info aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-coral-ink" />
              <p>
                <strong>About these projects:</strong> projects marked &ldquo;Demonstration project&rdquo; are concepts created to show how we approach a brief. They are not
                client work and make no claims about results.
              </p>
            </Reveal>
          )}
          <div className="space-y-20">
            {projects.map((p, i) => (
              <Reveal key={p.slug}>
                <ProjectCard project={p} featured headingLevel="h2" />
                {i < projects.length - 1 && <hr className="mt-20 border-line" />}
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
      <CtaBand title="Want to see what we'd do with your project?" />
    </>
  );
}
