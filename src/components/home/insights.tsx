import type { PostSummary } from "@/lib/content";
import { PostCard } from "@/components/cards";
import { ArrowLink } from "@/components/ui/button";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

export function Insights({ posts }: { posts: PostSummary[] }) {
  return (
    <Section labelledBy="insights-title">
      <Container>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <Reveal>
            <SectionHeading id="insights-title" eyebrow="Insights" title="Useful thinking for better websites." />
          </Reveal>
          <Reveal delay={0.1} className="shrink-0">
            <ArrowLink href="/insights">All insights</ArrowLink>
          </Reveal>
        </div>
        <Stagger className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <StaggerItem key={p.slug}>
              <PostCard post={p} />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
