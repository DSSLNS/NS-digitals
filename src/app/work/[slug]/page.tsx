import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/content/projects";
import { getService } from "@/content/services";
import { buildMetadata } from "@/lib/seo";
import { DemoBadge, ProjectCard } from "@/components/cards";
import { Reveal } from "@/components/motion/reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { ArrowLink } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/section";
import { BrowserMockup } from "@/components/visuals/browser-mockup";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => projects.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProject((await params).slug);
  if (!p) return {};
  return buildMetadata({ title: p.title, description: p.summary, path: `/work/${p.slug}` });
}

export default async function ProjectPage({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const others = projects.filter((p) => p.slug !== project.slug).slice(0, 2);
  const isDemo = project.kind === "demonstration";

  return (
    <>
      <PageHero
        crumbs={[
          { label: "Our Work", href: "/work" },
          { label: project.title, href: `/work/${project.slug}` },
        ]}
        eyebrow={`${project.industry} · ${project.category}`}
        title={project.title}
        lead={project.summary}
        visual={
          <div className="relative">
            <BrowserMockup preview={project.preview} className="rotate-[-1.5deg] shadow-lift" />
            {isDemo && <DemoBadge className="absolute -top-3 left-4" />}
          </div>
        }
      />

      <Section className="pt-0 sm:pt-4">
        <Container className="grid gap-14 lg:grid-cols-[1fr_2fr]">
          <Reveal as="div" className="space-y-8 lg:sticky lg:top-28 lg:self-start">
            <div>
              <h2 className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-coral-ink">Services</h2>
              <ul className="mt-3 space-y-2">
                {project.services.map((s) => (
                  <li key={s}>
                    <ArrowLink href={`/services/${s}`}>{getService(s)?.title ?? s}</ArrowLink>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-coral-ink">Industry</h2>
              <p className="mt-3 font-medium text-plum">{project.industry}</p>
            </div>
            {isDemo && (
              <p className="rounded-2xl border border-dashed border-plum/30 bg-white p-4 text-sm text-plum">
                This is a demonstration project: a concept showing our approach. It is not client work.
              </p>
            )}
          </Reveal>

          <div className="space-y-14">
            <Reveal>
              <h2 className="text-3xl font-bold">The challenge</h2>
              <p className="mt-4 text-lg leading-relaxed text-charcoal/85">{project.challenge}</p>
            </Reveal>
            <Reveal>
              <h2 className="text-3xl font-bold">The solution</h2>
              <p className="mt-4 text-lg leading-relaxed text-charcoal/85">{project.solution}</p>
            </Reveal>
            <Reveal>
              <h2 className="text-3xl font-bold">Approach</h2>
              <ol className="mt-6 grid gap-4 sm:grid-cols-2">
                {project.approach.map((a, i) => (
                  <li key={a.title} className="rounded-[1.5rem] border border-line bg-white p-6">
                    <span className="font-display text-sm font-bold text-coral-ink">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="mt-2 text-lg font-bold">{a.title}</h3>
                    <p className="mt-1.5 leading-relaxed text-muted">{a.body}</p>
                  </li>
                ))}
              </ol>
            </Reveal>
            <Reveal>
              <h2 className="text-3xl font-bold">Results</h2>
              {project.results.length > 0 ? (
                <ul className="mt-4 list-disc space-y-2 pl-6 text-lg">
                  {project.results.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 text-lg leading-relaxed text-muted">
                  {isDemo ? "As a demonstration project, there are no client results to report." : "Results will be published once verified with the client."}
                </p>
              )}
            </Reveal>
          </div>
        </Container>
      </Section>

      {others.length > 0 && (
        <Section labelledBy="more-title" className="bg-white/60">
          <Container>
            <h2 id="more-title" className="text-3xl font-bold sm:text-4xl">
              More work
            </h2>
            <div className="mt-12 grid gap-12 md:grid-cols-2">
              {others.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          </Container>
        </Section>
      )}
      <CtaBand />
    </>
  );
}
