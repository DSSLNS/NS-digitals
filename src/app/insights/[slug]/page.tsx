import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Clock } from "lucide-react";
import { posts } from "@/content/posts";
import { getService } from "@/content/services";
import { getPostBySlug, getPosts } from "@/lib/content";
import { articleSchema, buildMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import { PostCard } from "@/components/cards";
import { ArticleBody } from "@/components/sections/article-body";
import { CtaBand } from "@/components/sections/cta-band";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { ButtonLink } from "@/components/ui/button";
import { Container, Eyebrow, Section } from "@/components/ui/section";
import { PostCover } from "@/components/visuals/post-cover";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => posts.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug((await params).slug);
  if (!post) return {};
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/insights/${post.slug}`,
    type: "article",
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
  });
}

export default async function ArticlePage({ params }: Props) {
  const post = await getPostBySlug((await params).slug);
  if (!post) notFound();
  const path = `/insights/${post.slug}`;
  const service = getService(post.relatedService);
  const more = (await getPosts()).filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <JsonLd data={articleSchema({ title: post.title, description: post.excerpt, path, publishedAt: post.publishedAt, updatedAt: post.updatedAt })} />
      <article>
        <header className="relative -mt-20 pb-12 pt-32 sm:pt-36">
          <Container className="max-w-4xl">
            <Breadcrumbs
              items={[
                { label: "Insights", href: "/insights" },
                { label: post.title, href: path },
              ]}
            />
            <div className="mt-8 animate-rise">
              <Eyebrow>{post.category}</Eyebrow>
            </div>
            <h1 className="mt-5 animate-slide-up text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">{post.title}</h1>
            <p className="mt-6 animate-rise text-xl leading-relaxed text-muted [animation-delay:120ms]">{post.excerpt}</p>
            <p className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
              <span>By the NS Digital Solutions team</span>
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              <span className="inline-flex items-center gap-1">
                <Clock aria-hidden="true" className="size-3.5" /> {post.readingMinutes} min read
              </span>
            </p>
          </Container>
          <Container className="mt-12 max-w-5xl">
            <PostCover cover={post.cover} className="aspect-[21/9] rounded-[2rem]" />
          </Container>
        </header>
        <Container className="max-w-3xl pb-16">
          <ArticleBody blocks={post.body} />
          {service && (
            <aside className="mt-16 rounded-[1.75rem] bg-lavender p-8">
              <p className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-coral-ink">Related service</p>
              <h2 className="mt-2 text-2xl font-bold">{service.title}</h2>
              <p className="mt-2 text-charcoal/80">{service.cardDescription}</p>
              <ButtonLink href={`/services/${service.slug}`} variant="plum" className="mt-6">
                Explore {service.navLabel}
              </ButtonLink>
            </aside>
          )}
        </Container>
      </article>
      <Section labelledBy="more-title" className="bg-white/60">
        <Container>
          <h2 id="more-title" className="text-3xl font-bold sm:text-4xl">
            Keep reading
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {more.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </Container>
      </Section>
      <CtaBand />
    </>
  );
}
