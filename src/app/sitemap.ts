import type { MetadataRoute } from "next";
import { getPosts, getProjects, getServices } from "@/lib/content";
import { absoluteUrl } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, projects, posts] = await Promise.all([getServices(), getProjects(), getPosts()]);
  const staticPages: [string, number][] = [
    ["/", 1],
    ["/services", 0.9],
    ["/about", 0.7],
    ["/work", 0.7],
    ["/industries", 0.7],
    ["/insights", 0.7],
    ["/contact", 0.8],
    ["/request-a-quote", 0.8],
    ["/privacy-policy", 0.2],
    ["/terms", 0.2],
  ];
  return [
    ...staticPages.map(([path, priority]) => ({ url: absoluteUrl(path), priority })),
    ...services.map((s) => ({ url: absoluteUrl(`/services/${s.slug}`), priority: 0.9 })),
    ...projects.map((p) => ({ url: absoluteUrl(`/work/${p.slug}`), priority: 0.5 })),
    ...posts.map((p) => ({ url: absoluteUrl(`/insights/${p.slug}`), lastModified: p.updatedAt ?? p.publishedAt, priority: 0.6 })),
  ];
}
