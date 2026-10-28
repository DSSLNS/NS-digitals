import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, Info } from "lucide-react";
import { getProject, projects, toProjectCard } from "@/content/projects";
import { getService, serviceLabel } from "@/content/services";
import { buildMetadata } from "@/lib/seo";
import { projectToneSurface } from "@/lib/tones";
import { cn } from "@/lib/utils";
import { ServiceCard } from "@/components/cards";
import { FeatureBlock } from "@/components/case-study/feature-block";
import { Reveal } from "@/components/motion/reveal";
import { ConceptBadge, ProjectCard } from "@/components/portfolio/project-card";
import { BrowserFrame, PhoneFrame } from "@/components/portfolio/screen-frame";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { Container, Eyebrow, Section } from "@/components/ui/section";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => projects.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProject((await params).slug);
  if (!p) return {};
  return buildMetadata({ title: `${p.title} (Case Study)`, description: p.summary, path: `/work/${p.slug}` });
}

/** One numbered case-study section: label column on the left, content on the right. */
function CaseSection({ n, id, label, title, children }: { n: number; id: string; label: string; title: string; children: React.ReactNode }) {
  return (
    <Reveal as="section" className="grid scroll-mt-28 gap-4 border-t border-line pt-10 lg:grid-cols-[15rem_1fr] lg:gap-12">
      <p className="font-display text-sm font-semibold text-coral-ink">
        <span className="tabular-nums">{String(n).padStart(2, "0")}</span> · {label}
      </p>
      <div id={id} className="scroll-mt-28">
        <h2 className="text-3xl font-bold leading-tight sm:text-4xl">{title}</h2>
        <div className="mt-5 text-lg leading-relaxed text-charcoal/85">{children}</div>
      </div>
    </Reveal>
  );
}

function Checklist({ items, columns }: { items: string[]; columns?: boolean }) {
  return (
    <ul className={cn("mt-6 grid gap-3", columns && "sm:grid-cols-2")}>
      {items.map((i) => (
        <li key={i} className="flex gap-3 rounded-xl border border-line bg-white px-4 py-3 text-base text-charcoal">
          <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-coral-ink" strokeWidth={2.5} />
          {i}
        </li>
      ))}
    </ul>
  );
}

export default async function CaseStudyPage({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const isConcept = project.kind === "concept";
  const index = projects.indexOf(project);
  const prev = projects[(index - 1 + projects.length) % projects.length]!;
  const next = projects[(index + 1) % projects.length]!;
  const related = projects
    .filter((p) => p.slug !== project.slug)
    .map((p) => ({ p, shared: p.services.filter((s) => project.services.includes(s)).length }))
    .sort((a, b) => b.shared - a.shared)
    .slice(0, 2)
    .map(({ p }) => toProjectCard(p));
  const relatedServices = project.services.map((s) => getService(s)).filter((s) => s !== undefined);
  const tone = projectToneSurface[project.tone];

  return (
    <>
      <PageHero
        crumbs={[
          { label: "Our Work", href: "/work" },
          { label: project.name, href: `/work/${project.slug}` },
        ]}
        eyebrow={`${project.industry} · ${serviceLabel(project.primaryService)}`}
        title={project.title}
        lead={project.summary}
        actions={
          <>
            <ButtonLink href={`/request-a-quote?service=${project.primaryService}`} size="lg">
              Discuss a similar project
            </ButtonLink>
            <ButtonLink href="#challenge" variant="outline" size="lg" arrow={false}>
              Read the case study
            </ButtonLink>
          </>
        }
      />

      {/* Showcase */}
      <Container>
        <div className={cn("relative overflow-hidden rounded-[2rem] px-4 pt-4 sm:px-10 sm:pt-10 lg:px-14 lg:pt-14", tone)}>
          <div className="flex items-end gap-6 lg:gap-10">
            <BrowserFrame slug={project.slug} view={project.cover.view} domain={project.domain} alt={project.cover.alt} sizes="(min-width: 1280px) 960px, 90vw" priority className="min-w-0 flex-1 rounded-b-none" />
            <PhoneFrame slug={project.slug} view={project.mobile.view} alt={project.mobile.alt} sizes="220px" className="mb-6 hidden w-[22%] max-w-[15rem] shrink-0 sm:block lg:mb-10" />
          </div>
        </div>
        <dl className="mt-8 grid gap-6 rounded-[1.5rem] border border-line bg-white p-6 sm:grid-cols-2 sm:p-8 lg:grid-cols-4">
          <div>
            <dt className="text-sm font-semibold text-coral-ink">Industry</dt>
            <dd className="mt-1 font-medium text-plum">{project.industry}</dd>
          </div>
          <div>
            <dt className="text-sm font-semibold text-coral-ink">Main service</dt>
            <dd className="mt-1">
              <Link href={`/services/${project.primaryService}`} className="font-medium text-plum underline decoration-plum/30 underline-offset-4 hover:decoration-plum">
                {serviceLabel(project.primaryService)}
              </Link>
            </dd>
          </div>
          <div>
            <dt className="text-sm font-semibold text-coral-ink">Also involves</dt>
            <dd className="mt-1 font-medium text-plum">
              {project.services
                .filter((s) => s !== project.primaryService)
                .map((s) => serviceLabel(s))
                .join(", ")}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-semibold text-coral-ink">Project type</dt>
            <dd className="mt-1">{isConcept ? <ConceptBadge /> : <span className="font-medium text-plum">Client project</span>}</dd>
          </div>
        </dl>
        {isConcept && (
          <p className="mt-4 flex items-start gap-3 rounded-2xl border border-dashed border-plum/30 bg-white p-5 text-plum">
            <Info aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-coral-ink" />
            <span>
              {project.name} is a fictional brand. This concept project demonstrates how we would approach this kind of brief. It is not client work, and it contains no client results,
              testimonials or budgets.
            </span>
          </p>
        )}
      </Container>

      <Section className="pb-0 sm:pb-0">
        <Container className="space-y-14">
          <CaseSection n={1} id="overview" label="Overview" title="Project overview">
            <p>{project.overview}</p>
          </CaseSection>
          <CaseSection n={2} id="challenge" label="Challenge" title="The challenge">
            <p>{project.challenge}</p>
          </CaseSection>
          <CaseSection n={3} id="objectives" label="Objectives" title="Project objectives">
            <ol className="grid gap-3 sm:grid-cols-2">
              {project.objectives.map((o, i) => (
                <li key={o} className="flex gap-4 rounded-xl border border-line bg-white p-5 text-base text-charcoal">
                  <span className="font-display text-sm font-bold text-coral-ink">{String(i + 1).padStart(2, "0")}</span>
                  {o}
                </li>
              ))}
            </ol>
          </CaseSection>
          <CaseSection n={4} id="solution" label="Solution" title="The proposed solution">
            <p>{project.solution}</p>
          </CaseSection>
        </Container>
      </Section>

      {/* Project-specific deep dive */}
      <Section labelledBy="feature-title">
        <Container>
          <div className={cn("rounded-[2rem] px-5 py-12 sm:px-10 sm:py-16 lg:px-14", tone)}>
            <Reveal className="max-w-3xl">
              <Eyebrow>In detail</Eyebrow>
              <h2 id="feature-title" className="mt-4 text-3xl font-bold leading-tight sm:text-5xl">
                {project.feature.title}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-charcoal/80">{project.feature.intro}</p>
            </Reveal>
            <div className="mt-12">
              <FeatureBlock project={project} />
            </div>
          </div>
        </Container>
      </Section>

      <Section className="pt-0 sm:pt-0">
        <Container className="space-y-14">
          <CaseSection n={5} id="design" label="Design" title="Design approach">
            <p>{project.design.body}</p>
            <Checklist items={project.design.points} columns />
          </CaseSection>
          <CaseSection n={6} id="development" label="Development" title="Development implementation">
            <p>{project.development.body}</p>
            <Checklist items={project.development.points} columns />
          </CaseSection>
          <CaseSection n={7} id="testing" label="Testing & QA" title="Testing and quality assurance">
            <p>{project.testing.body}</p>
            <Checklist items={project.testing.checks} columns />
          </CaseSection>
          <CaseSection n={8} id="responsive" label="Responsive" title="The responsive experience">
            <div className="grid items-center gap-8 md:grid-cols-[1fr_14rem] md:gap-12">
              <p>{project.responsive}</p>
              <PhoneFrame slug={project.slug} view={project.mobile.view} alt={project.mobile.alt} sizes="224px" className="mx-auto w-56" />
            </div>
          </CaseSection>
          <CaseSection n={9} id="technologies" label="Technologies" title="Technologies used">
            <ul className="flex flex-wrap gap-2">
              {project.technologies.map((t) => (
                <li key={t} className="rounded-full bg-white px-4 py-2 text-base font-medium text-plum ring-1 ring-plum/10">
                  {t}
                </li>
              ))}
            </ul>
            {isConcept && <p className="mt-4 text-base text-muted">The proposed stack for this concept. For client work, we choose tools around your team, budget and existing platform.</p>}
          </CaseSection>
          <CaseSection n={10} id="outcome" label="Outcome" title={isConcept ? "What this concept demonstrates" : "The outcome"}>
            <p>{project.outcome}</p>
            {project.results.length > 0 ? (
              <ul className="mt-5 list-disc space-y-2 pl-6">
                {project.results.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            ) : (
              isConcept && <p className="mt-4 text-base text-muted">As a concept project, there are no client results to report.</p>
            )}
          </CaseSection>
          <CaseSection n={11} id="services" label="Related services" title="Services behind this project">
            <ul className="grid gap-5 md:grid-cols-3">
              {relatedServices.map((s) => (
                <li key={s.slug}>
                  <ServiceCard service={s} compact />
                </li>
              ))}
            </ul>
          </CaseSection>
        </Container>
      </Section>

      {/* Project navigation and related work */}
      <Section labelledBy="more-title" className="pt-10 sm:pt-14">
        <Container>
          <nav aria-label="Case studies" className="grid gap-4 sm:grid-cols-2">
            <Link href={`/work/${prev.slug}`} className="group flex items-center gap-4 rounded-2xl border border-line bg-white p-5 transition-colors hover:border-plum/30">
              <ArrowLeft aria-hidden="true" className="size-5 shrink-0 text-coral-ink transition-transform group-hover:-translate-x-1" />
              <span>
                <span className="block text-sm text-muted">Previous case study</span>
                <span className="font-semibold text-plum">{prev.title}</span>
              </span>
            </Link>
            <Link href={`/work/${next.slug}`} className="group flex items-center justify-end gap-4 rounded-2xl border border-line bg-white p-5 text-right transition-colors hover:border-plum/30">
              <span>
                <span className="block text-sm text-muted">Next case study</span>
                <span className="font-semibold text-plum">{next.title}</span>
              </span>
              <ArrowRight aria-hidden="true" className="size-5 shrink-0 text-coral-ink transition-transform group-hover:translate-x-1" />
            </Link>
          </nav>
          <div className="mt-20 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <h2 id="more-title" className="text-3xl font-bold sm:text-4xl">
              Related work
            </h2>
            <ButtonLink href="/work" variant="outline">
              View all case studies
            </ButtonLink>
          </div>
          <div className="mt-10 grid gap-x-8 gap-y-14 md:grid-cols-2">
            {related.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand title="Planning something similar?" quoteHref={`/request-a-quote?service=${project.primaryService}`} lead="Tell us about your project. We'll reply with questions, options and a clear next step." />
    </>
  );
}
