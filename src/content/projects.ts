import type { ServiceSlug } from "./services";

/**
 * Portfolio entries.
 *
 * Every entry below is a DEMONSTRATION PROJECT — a concept created to show how we approach a brief.
 * They are not client work and carry no results. Replace them with verified client projects
 * (with written permission) as they become available, and set `kind: "client"`.
 */
export type Project = {
  slug: string;
  kind: "demonstration" | "client";
  title: string;
  industry: string;
  category: string;
  services: ServiceSlug[];
  summary: string;
  challenge: string;
  solution: string;
  approach: { title: string; body: string }[];
  /** Verified, client-approved outcomes only. Leave empty for demonstration projects. */
  results: string[];
  preview: { name: string; theme: "plum" | "coral" | "mint"; headline: string };
};

export const projects: Project[] = [
  {
    slug: "atelier-commerce-concept",
    kind: "demonstration",
    title: "Atelier: a boutique storefront concept",
    industry: "Retail & E-commerce",
    category: "E-commerce build",
    services: ["ecommerce-development", "qa-testing", "seo-performance"],
    summary: "A concept storefront for a small homeware brand, designed around fast product discovery and a short, confidence-building checkout.",
    challenge:
      "Small independent brands often compete with large retailers on trust and convenience. The brief: make a modest catalogue feel considered and premium, while keeping product pages fast and the checkout as short as possible on mobile.",
    solution:
      "An editorial storefront with curated collections, product pages that answer sizing, materials and delivery questions upfront, and a three-step checkout with clear costs from the start. The QA plan covers payment scenarios, stock edge cases and device coverage.",
    approach: [
      { title: "Product page structure", body: "Key buying information placed above the fold on mobile, with progressive disclosure for detail." },
      { title: "Checkout design", body: "Guest checkout by default, delivery costs shown early, and inline validation on every field." },
      { title: "Performance budget", body: "Responsive images and minimal third-party scripts, with a performance budget agreed per template." },
      { title: "E-commerce QA plan", body: "Test cases for cart edge cases, failed payments, discount codes and order notifications." },
    ],
    results: [],
    preview: { name: "Atelier", theme: "coral", headline: "Objects for slower living" },
  },
  {
    slug: "ledgerly-saas-concept",
    kind: "demonstration",
    title: "Ledgerly: a SaaS marketing site & QA concept",
    industry: "SaaS & Technology",
    category: "Website + QA automation",
    services: ["website-development", "qa-testing", "website-maintenance"],
    summary: "A concept marketing site and release-testing setup for a finance software product that ships updates every week.",
    challenge:
      "Fast-moving product teams need a marketing site that keeps pace with the product, plus confidence that frequent releases will not break sign-up or billing journeys.",
    solution:
      "A component-based marketing site with reusable page sections the team can assemble without developers, paired with automated end-to-end tests for sign-up, pricing and trial flows that run on every deployment.",
    approach: [
      { title: "Composable pages", body: "A library of content blocks so new feature pages can be published from the CMS." },
      { title: "Critical-journey automation", body: "Playwright tests for sign-up, pricing toggles and trial activation." },
      { title: "Release checklist", body: "A lightweight manual regression checklist for changes automation cannot judge." },
      { title: "Monitoring", body: "Uptime and Core Web Vitals monitoring with alerts routed to the team." },
    ],
    results: [],
    preview: { name: "Ledgerly", theme: "plum", headline: "Close your books in half the time" },
  },
  {
    slug: "harbour-clinic-redesign-concept",
    kind: "demonstration",
    title: "Harbour Clinic: an accessible redesign concept",
    industry: "Professional Services",
    category: "Redesign + accessibility",
    services: ["website-redesign", "seo-performance", "qa-testing"],
    summary: "A concept redesign for a physiotherapy practice, focused on accessibility, clear service information and simple appointment requests.",
    challenge:
      "Many practice websites grow piece by piece until visitors cannot find services or booking information, and accessibility is rarely tested. A redesign also risks losing pages that already rank locally.",
    solution:
      "A restructured site with plain-language service pages, a persistent appointment action, and an accessibility-first design system tested with keyboard and screen readers. The migration plan maps every existing URL to its new home.",
    approach: [
      { title: "Content restructure", body: "Services grouped by patient need rather than internal terminology." },
      { title: "Accessible design system", body: "Colour contrast, focus states and readable typography built in from the start." },
      { title: "SEO-safe migration", body: "URL mapping, redirects and metadata carried over, verified with a crawl before launch." },
      { title: "Assistive-technology testing", body: "Keyboard-only and screen reader checks of booking and contact journeys." },
    ],
    results: [],
    preview: { name: "Harbour Clinic", theme: "mint", headline: "Move better, feel better" },
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const projectsForService = (slug: ServiceSlug) => projects.filter((p) => p.services.includes(slug));
