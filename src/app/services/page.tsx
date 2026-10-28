import type { Metadata } from "next";
import { getServices } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { ServiceCard } from "@/components/cards";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/section";

export const metadata: Metadata = buildMetadata({
  title: "Web Development, QA & Optimization Services",
  description:
    "Explore our seven services: website development, redesign, bug fixing, QA and testing, e-commerce development, SEO and performance optimization, and website maintenance.",
  path: "/services",
});

export default async function ServicesPage() {
  const services = await getServices();
  return (
    <>
      <PageHero
        crumbs={[{ label: "Services", href: "/services" }]}
        eyebrow="Services"
        title="Seven services. One team that builds and tests."
        lead="Whether you're starting fresh, fixing what's broken or keeping a site healthy, every service is delivered by developers and QA engineers working together."
        actions={
          <ButtonLink href="/request-a-quote" size="lg">
            Start a Project
          </ButtonLink>
        }
      />
      <Section className="pt-4 sm:pt-6">
        <Container>
          <Stagger className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <StaggerItem key={s.slug}>
                <ServiceCard service={s} headingLevel="h2" />
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>
      <CtaBand title="Not sure where to start?" lead="Describe the problem or the goal. We'll recommend the right service, or combination of services, and explain why." />
    </>
  );
}
