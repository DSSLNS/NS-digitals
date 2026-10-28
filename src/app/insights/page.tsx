import type { Metadata } from "next";
import { getPosts } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { PostCard } from "@/components/cards";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { Container, Section } from "@/components/ui/section";

export const metadata: Metadata = buildMetadata({
  title: "Insights: Web Development, QA, Performance & SEO Guides",
  description:
    "Practical articles on website redesign planning, performance issues, pre-launch QA, e-commerce checkout usability and technical SEO fundamentals.",
  path: "/insights",
});

export default async function InsightsPage() {
  const posts = await getPosts();
  return (
    <>
      <PageHero
        crumbs={[{ label: "Insights", href: "/insights" }]}
        eyebrow="Insights"
        title="Useful thinking for better websites."
        lead="Practical, jargon-light guides on building, testing and improving websites, written by the people who do the work."
      />
      <Section className="pt-0 sm:pt-0">
        <Container>
          <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <StaggerItem key={p.slug}>
                <PostCard post={p} headingLevel="h2" />
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>
      <CtaBand />
    </>
  );
}
