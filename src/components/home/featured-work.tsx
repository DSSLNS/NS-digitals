import type { Project } from "@/content/projects";
import { ProjectCard } from "@/components/cards";
import { ButtonLink } from "@/components/ui/button";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";

export function FeaturedWork({ projects }: { projects: Project[] }) {
  const [first, ...rest] = projects;
  if (!first) return null;
  const allDemo = projects.every((p) => p.kind === "demonstration");
  return (
    <Section labelledBy="work-title">
      <Container>
        <Reveal>
          <SectionHeading
            id="work-title"
            eyebrow="Our work"
            title="Thoughtful work. Meaningful outcomes."
            lead={
              allDemo
                ? "These are demonstration projects: concepts that show how we approach a brief. Verified client case studies will appear here as they are published."
                : "A selection of projects, each with the challenge, our approach and verified results."
            }
          />
        </Reveal>
        <div className="mt-14 space-y-16">
          <Reveal>
            <ProjectCard project={first} featured />
          </Reveal>
          <div className="grid gap-12 md:grid-cols-2 md:gap-8">
            {rest.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.1}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal className="mt-14">
          <ButtonLink href="/work" variant="plum">
            Explore Our Work
          </ButtonLink>
        </Reveal>
      </Container>
    </Section>
  );
}
