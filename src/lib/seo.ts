import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/utils";

type MetadataInput = {
  title: string;
  description: string;
  /** Site path, e.g. "/services/website-development". */
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  noIndex?: boolean;
};

/** Complete page metadata — title, description, canonical, hreflang, Open Graph and Twitter. Every page uses this. */
export function buildMetadata({ title, description, path, type = "website", publishedTime, modifiedTime, noIndex }: MetadataInput): Metadata {
  const fullTitle = title.includes(siteConfig.name) ? title : `${title} | ${siteConfig.name}`;
  const url = absoluteUrl(path);
  const ogImage = absoluteUrl(`/og?title=${encodeURIComponent(title)}`);

  return {
    title: { absolute: fullTitle },
    description,
    alternates: {
      canonical: url,
      // One global English site today. Add regional variants (en-GB, en-AU…) here only when genuinely localised pages exist.
      languages: { en: url, "x-default": url },
    },
    openGraph: {
      type,
      url,
      title: fullTitle,
      description,
      siteName: siteConfig.name,
      locale: "en",
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      ...(type === "article" ? { publishedTime, modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
      ...(siteConfig.twitterHandle ? { site: siteConfig.twitterHandle } : {}),
    },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}

/* ---------- Structured data (schema.org). Only facts we can stand behind. ---------- */

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/icon.svg"),
    slogan: siteConfig.tagline,
    description: siteConfig.description,
    ...(siteConfig.contact.email ? { email: siteConfig.contact.email } : {}),
    ...(siteConfig.social.length ? { sameAs: siteConfig.social.map((s) => s.url) } : {}),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: absoluteUrl("/"),
    inLanguage: "en",
    publisher: { "@id": `${siteConfig.url}/#organization` },
  };
}

export function serviceSchema(s: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    description: s.description,
    url: absoluteUrl(s.path),
    provider: { "@id": `${siteConfig.url}/#organization` },
    areaServed: "Worldwide",
  };
}

export type Crumb = { label: string; href: string };

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.label, item: absoluteUrl(c.href) })),
  };
}

export function articleSchema(post: { title: string; description: string; path: string; publishedAt: string; updatedAt?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    mainEntityOfPage: absoluteUrl(post.path),
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: { "@type": "Organization", name: siteConfig.name, url: absoluteUrl("/about") },
    publisher: { "@id": `${siteConfig.url}/#organization` },
    image: absoluteUrl(`/og?title=${encodeURIComponent(post.title)}`),
    inLanguage: "en",
  };
}

/** FAQPage markup. Google shows FAQ rich results only for some sites, but the markup stays valid and accurate. */
export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}
