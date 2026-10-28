import { Eye, Layers, MonitorSmartphone, Accessibility, LifeBuoy, Boxes } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container, Eyebrow } from "@/components/ui/section";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { IconTile } from "@/components/visuals/icons";

const points = [
  { Icon: Layers, title: "Development and testing under one roof", body: "Builders and QA engineers work side by side, so quality is planned in rather than inspected at the end." },
  { Icon: Eye, title: "Clear communication and project visibility", body: "Agreed milestones, a staging site you can review, and plain-English updates throughout." },
  { Icon: MonitorSmartphone, title: "Responsive-first engineering", body: "Layouts designed and tested for phones first, then scaled up to large screens." },
  { Icon: Boxes, title: "Maintainable, scalable solutions", body: "Reusable components and documented code your team, or any future developer, can work with." },
  { Icon: Accessibility, title: "Performance and accessibility awareness", body: "Core Web Vitals and WCAG 2.2 considered from the first design, not patched before launch." },
  { Icon: LifeBuoy, title: "Flexible support after launch", body: "Maintenance plans, bug fixes and improvements sized to what your site actually needs." },
];

export function Why() {
  return (
    <section aria-labelledby="why-title" className="relative py-20 sm:py-28">
      <Container className="grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <Eyebrow>Why NS Digital Solutions</Eyebrow>
            <h2 id="why-title" className="mt-4 text-5xl font-bold leading-[0.98] sm:text-6xl lg:text-7xl">
              More than a website. <span className="block text-coral-strong">A dependable digital partner.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15} className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/about" variant="outline">
              How we work
            </ButtonLink>
            <ButtonLink href="/work" variant="plum">
              See our case studies
            </ButtonLink>
          </Reveal>
        </div>
        <Stagger as="ul" className="grid gap-4 sm:grid-cols-2">
          {points.map(({ Icon, title, body }, i) => (
            <StaggerItem as="li" key={title} className={i % 2 === 1 ? "sm:pt-10" : ""}>
              <div className="h-full rounded-[1.5rem] border border-line bg-white p-7 shadow-soft">
                <IconTile icon={Icon} className="bg-mint ring-0" />
                <h3 className="mt-5 text-lg font-bold leading-snug">{title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{body}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
