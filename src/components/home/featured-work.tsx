import type { ProjectCardData } from "@/content/projects";
import { ProjectCard } from "@/components/portfolio/project-card";
import { ButtonLink } from "@/components/ui/button";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";

export function FeaturedWork({ projects, total }: { projects: ProjectCardData[]; total: number }) {
  const [first, ...rest] = projects;
  if (!first) return null;
  const allConcept = projects.every((p) => p.kind === "concept");
  return (
    <Section labelledBy="work-title">
      <Container>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <Reveal>
            <SectionHeading
              id="work-title"
              eyebrow="Our work"
              title="See how we design, build and test."
              lead={
                allConcept
                  ? "Concept case studies across e-commerce, SaaS, healthcare, hospitality and more. Each one walks through the challenge, design, development, testing and the responsive experience."
                  : "A selection of projects, each with the challenge, our approach and verified results."
              }
            />
          </Reveal>
          <Reveal delay={0.1} className="shrink-0">
            <ButtonLink href="/work" variant="plum">
              View all {total} case studies
            </ButtonLink>
          </Reveal>
        </div>
        <div className="mt-14 space-y-16">
          <Reveal>
            <ProjectCard project={first} featured />
          </Reveal>
          <div className="grid gap-x-8 gap-y-16 md:grid-cols-2">
            {rest.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.1}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
