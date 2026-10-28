import "server-only";
import { industries } from "@/content/industries";
import { posts, postText, type Post } from "@/content/posts";
import { projects } from "@/content/projects";
import { services } from "@/content/services";
import { readingTime } from "@/lib/utils";

/*
 * Content access layer. Pages and components only ever call these functions — never the
 * content files directly. Content currently lives in typed files under src/content, which keeps
 * the site fast and free of external dependencies.
 *
 * To move to a headless CMS (Sanity, Strapi, Contentful…), re-implement these functions to fetch
 * from it and map the response onto the same types. No page or component needs to change.
 * See docs/CMS.md for the content models.
 */

export async function getServices() {
  return services;
}

export async function getIndustries() {
  return industries;
}

export async function getProjects() {
  return projects;
}

export type PostSummary = Omit<Post, "body"> & { readingMinutes: number };

const summarise = (p: Post): PostSummary => {
  const { body: _body, ...rest } = p;
  return { ...rest, readingMinutes: readingTime(postText(p)) };
};

export async function getPosts(limit?: number): Promise<PostSummary[]> {
  const sorted = [...posts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)).map(summarise);
  return limit ? sorted.slice(0, limit) : sorted;
}

export async function getPostBySlug(slug: string) {
  const post = posts.find((p) => p.slug === slug);
  return post ? { ...post, readingMinutes: readingTime(postText(post)) } : undefined;
}
