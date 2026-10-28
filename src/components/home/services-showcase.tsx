import type { Service } from "@/content/services";
import { ServiceCard, type ServicePreview } from "@/components/cards";
import { ArrowLink } from "@/components/ui/button";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

/** Editorial bento grid: rows of 4+2, 2+2+2 and 3+3 on large screens. */
const spans = ["lg:col-span-4", "lg:col-span-2", "lg:col-span-2", "lg:col-span-2", "lg:col-span-2", "lg:col-span-3", "lg:col-span-3"];

export function ServicesShowcase({ services, preview }: { services: Service[]; preview?: ServicePreview }) {
  return (
    <Section labelledBy="services-title">
      <Container>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <Reveal>
            <SectionHeading
              id="services-title"
              eyebrow="Services"
              title="Everything your website needs to succeed."
              lead="From the first line of code to ongoing optimization, we help you build, improve, and maintain digital experiences that work."
            />
          </Reveal>
          <Reveal delay={0.1} className="shrink-0">
            <ArrowLink href="/services">View all services</ArrowLink>
          </Reveal>
        </div>
        <Stagger className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-6">
          {services.map((s, i) => (
            <StaggerItem key={s.slug} className={cn(spans[i], i === 0 && "md:col-span-2")}>
              <ServiceCard service={s} large={i === 0} preview={i === 0 ? preview : undefined} />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
