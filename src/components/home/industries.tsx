import type { Industry } from "@/content/industries";
import { IndustryCard } from "@/components/cards";
import { ArrowLink } from "@/components/ui/button";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

export function Industries({ industries }: { industries: Industry[] }) {
  return (
    <Section labelledBy="industries-title" className="bg-white/60">
      <Container>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <Reveal>
            <SectionHeading
              id="industries-title"
              eyebrow="Industries"
              title="Digital solutions for businesses with ambition."
              lead="Every sector has its own priorities. These are the needs we plan around for each."
            />
          </Reveal>
          <Reveal delay={0.1} className="shrink-0">
            <ArrowLink href="/industries">Explore industries</ArrowLink>
          </Reveal>
        </div>
        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind) => (
            <StaggerItem key={ind.slug}>
              <IndustryCard industry={ind} />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
