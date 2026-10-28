import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check, CircleAlert } from "lucide-react";
import { getService, services, type ServiceSlug } from "@/content/services";
import { projectsForService, toProjectCard } from "@/content/projects";
import { buildMetadata, serviceSchema } from "@/lib/seo";
import { toneSurface } from "@/lib/tones";
import { cn } from "@/lib/utils";
import { ServiceCard } from "@/components/cards";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { FaqList } from "@/components/sections/faq-list";
import { PageHero } from "@/components/sections/page-hero";
import { JsonLd } from "@/components/seo/json-ld";
import { ArrowLink, ButtonLink } from "@/components/ui/button";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { ProjectCard } from "@/components/portfolio/project-card";
import { BrowserFrame } from "@/components/portfolio/screen-frame";
import { ServiceIcon } from "@/components/visuals/icons";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = getService((await params).slug);
  if (!service) return {};
  return buildMetadata({ title: service.seo.title, description: service.seo.description, path: `/services/${service.slug}` });
}

export default async function ServicePage({ params }: Props) {
  const service = getService((await params).slug);
  if (!service) notFound();

  const path = `/services/${service.slug}`;
  const related = service.related.map((s) => getService(s)).filter((s) => s !== undefined);
  const projects = projectsForService(service.slug as ServiceSlug).map(toProjectCard);
  const showcase = projects[0];

  return (
    <>
      <JsonLd data={serviceSchema({ name: service.title, description: service.seo.description, path })} />
      <PageHero
        crumbs={[
          { label: "Services", href: "/services" },
          { label: service.title, href: path },
        ]}
        eyebrow={service.hero.eyebrow}
        title={service.hero.title}
        lead={service.hero.lead}
        actions={
          <>
            <ButtonLink href={`/request-a-quote?service=${service.slug}`} size="lg">
              Start a Project
            </ButtonLink>
            <ButtonLink href="#deliverables" variant="outline" size="lg" arrow={false}>
              See what&apos;s included
            </ButtonLink>
          </>
        }
        visual={
          showcase ? (
            <figure className={cn("rounded-[2rem] p-4 sm:p-6", toneSurface[service.tone])}>
              <BrowserFrame slug={showcase.slug} view={showcase.cover.view} domain={showcase.domain} alt={showcase.cover.alt} priority sizes="(min-width: 1024px) 34rem, 90vw" />
              <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-2 px-1 text-sm">
                <span className="text-charcoal/80">Concept case study: {showcase.name}</span>
                <ArrowLink href={`/work/${showcase.slug}`} srContext={`: ${showcase.title}`}>
                  View case study
                </ArrowLink>
              </figcaption>
            </figure>
          ) : (
            <ServiceIcon slug={service.slug} size="lg" />
          )
        }
      />

      {/* Overview */}
      <Section labelledBy="overview-title" className="pt-8 sm:pt-12">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <Reveal>
            <h2 id="overview-title" className="text-3xl font-bold leading-tight sm:text-4xl">
              {service.overview.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="space-y-5 text-lg leading-relaxed text-charcoal/85">
            {service.overview.body.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </Reveal>
        </Container>
      </Section>

      {/* Problems */}
      <Section labelledBy="problems-title" className="bg-white/60">
        <Container>
          <Reveal>
            <SectionHeading id="problems-title" eyebrow="Problems we solve" title="Sound familiar?" />
          </Reveal>
          <Stagger className="mt-12 grid gap-5 sm:grid-cols-2">
            {service.problems.map((p) => (
              <StaggerItem key={p.title} className="rounded-[1.5rem] border border-line bg-ivory p-7">
                <CircleAlert aria-hidden="true" className="size-6 text-coral-ink" />
                <h3 className="mt-4 text-xl font-bold">{p.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{p.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* Deliverables */}
      <Section id="deliverables" labelledBy="deliverables-title">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <SectionHeading id="deliverables-title" eyebrow="Deliverables & scope" title={service.deliverables.heading} lead={service.deliverables.note} />
          </Reveal>
          <Stagger as="ul" className="grid gap-3 sm:grid-cols-2">
            {service.deliverables.items.map((d) => (
              <StaggerItem as="li" key={d} className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-soft">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-mint text-plum">
                  <Check aria-hidden="true" className="size-3.5" strokeWidth={3} />
                </span>
                <span className="font-medium text-plum">{d}</span>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* Process */}
      <Section labelledBy="milestones-title" className="on-dark bg-plum text-ivory">
        <div aria-hidden="true" className="grid-lines-dark mask-fade absolute inset-0" />
        <Container className="relative">
          <Reveal>
            <SectionHeading dark id="milestones-title" eyebrow="Process & milestones" title="How the work moves forward" />
          </Reveal>
          <Stagger as="ol" className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {service.process.map((step, i) => (
              <StaggerItem as="li" key={step.title} className="rounded-[1.5rem] border border-ivory/15 bg-ivory/5 p-7">
                <span className="font-display text-sm font-bold text-sun">Step {String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-xl font-bold text-ivory">{step.title}</h3>
                <p className="mt-2 leading-relaxed text-ivory/75">{step.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* Technologies */}
      <Section labelledBy="tech-title">
        <Container>
          <Reveal>
            <SectionHeading
              id="tech-title"
              eyebrow="Tools & technologies"
              title="The right tools for the job"
              lead="We choose tools to suit your project and existing setup. These are the ones we commonly use for this service."
            />
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {service.technologies.map((g) => (
              <Reveal key={g.group} className="rounded-[1.5rem] border border-line bg-white p-7">
                <h3 className="text-lg font-bold">{g.group}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {g.items.map((t) => (
                    <li key={t} className="rounded-full bg-lavender px-3.5 py-1.5 text-sm font-medium text-plum">
                      {t}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Use cases + related demonstration work */}
      <Section labelledBy="usecases-title" className="bg-white/60">
        <Container>
          <Reveal>
            <SectionHeading id="usecases-title" eyebrow="Example use cases" title="When this service is the right fit" />
          </Reveal>
          <Stagger className="mt-12 grid gap-5 md:grid-cols-3">
            {service.useCases.map((u, i) => (
              <StaggerItem key={u.title} className={cn("rounded-[1.5rem] p-7", ["bg-lavender", "bg-mint", "bg-coral-soft"][i % 3])}>
                <h3 className="text-xl font-bold">{u.title}</h3>
                <p className="mt-2 leading-relaxed text-charcoal/80">{u.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
          {projects.length > 0 && (
            <div className="mt-20">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                  <h3 className="text-2xl font-bold">Related case studies</h3>
                  <p className="mt-2 max-w-2xl text-muted">Concept projects showing how we approach this kind of brief. They use fictional brands and are not client work.</p>
                </div>
                {projects.length > 2 && (
                  <ArrowLink href={`/work?service=${service.slug}`} className="shrink-0">
                    View all {projects.length} {service.navLabel} case studies
                  </ArrowLink>
                )}
              </div>
              <div className="mt-10 grid gap-x-8 gap-y-14 md:grid-cols-2">
                {projects.slice(0, 2).map((p) => (
                  <ProjectCard key={p.slug} project={p} />
                ))}
              </div>
            </div>
          )}
        </Container>
      </Section>

      {/* FAQs */}
      <Section labelledBy="faq-title">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <Reveal>
            <SectionHeading id="faq-title" eyebrow="FAQs" title="Questions, answered" lead="Can't find what you're looking for? Ask us directly." />
            <ButtonLink href="/contact" variant="outline" className="mt-8">
              Ask a question
            </ButtonLink>
          </Reveal>
          <Reveal delay={0.1}>
            <FaqList faqs={service.faqs} />
          </Reveal>
        </Container>
      </Section>

      {/* Related services */}
      <Section labelledBy="related-title" className="pt-0 sm:pt-0">
        <Container>
          <Reveal>
            <SectionHeading id="related-title" eyebrow="Related services" title="Often paired with" />
          </Reveal>
          <Stagger className="mt-12 grid gap-5 md:grid-cols-3">
            {related.map((s) => (
              <StaggerItem key={s.slug}>
                <ServiceCard service={s} />
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      <CtaBand
        title={`Let’s talk about ${service.navLabel}.`}
        quoteHref={`/request-a-quote?service=${service.slug}`}
        lead="Share a few details about your project and what you'd like to achieve. We'll come back with questions, options and a clear next step."
      />
    </>
  );
}
