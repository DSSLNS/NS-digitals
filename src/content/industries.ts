import type { ServiceSlug } from "./services";

/**
 * Industries we are set up to support. Copy describes typical needs of each sector —
 * it does not claim past clients. Add verified case studies to `projects.ts` as they exist.
 */
export type Industry = {
  slug: string;
  title: string;
  summary: string;
  needs: string[];
  services: ServiceSlug[];
  art: "retail" | "startup" | "professional" | "saas" | "hospitality" | "smallbiz";
  tone: "white" | "lavender" | "mint" | "coral" | "sun";
};

export const industries: Industry[] = [
  {
    slug: "retail-ecommerce",
    title: "Retail & E-commerce",
    summary: "Storefronts, product pages and checkouts that stay fast and dependable as your catalogue grows.",
    needs: ["Reliable cart and checkout", "Fast product and category pages", "Inventory and order integrations", "QA across payment methods"],
    services: ["ecommerce-development", "qa-testing", "seo-performance"],
    art: "retail",
    tone: "coral",
  },
  {
    slug: "startups",
    title: "Startups & New Ventures",
    summary: "Credible launch websites and landing pages built quickly, on foundations that will not need replacing in a year.",
    needs: ["Launch-ready marketing site", "Landing pages to test messaging", "Analytics from day one", "Room to scale"],
    services: ["website-development", "qa-testing", "website-maintenance"],
    art: "startup",
    tone: "sun",
  },
  {
    slug: "professional-services",
    title: "Professional Services",
    summary: "Clear, trustworthy websites for consultancies, firms and advisers, where credibility drives every enquiry.",
    needs: ["Clear service structure", "Thought-leadership content", "Accessible, polished design", "Simple enquiry flows"],
    services: ["website-redesign", "website-development", "seo-performance"],
    art: "professional",
    tone: "lavender",
  },
  {
    slug: "saas-technology",
    title: "SaaS & Technology",
    summary: "Marketing sites, documentation and product QA for teams that ship often and cannot afford regressions.",
    needs: ["Release and regression testing", "Test automation", "Fast marketing sites", "Developer-friendly handover"],
    services: ["qa-testing", "website-development", "bug-fixing"],
    art: "saas",
    tone: "mint",
  },
  {
    slug: "hospitality-lifestyle",
    title: "Hospitality & Lifestyle",
    summary: "Visual, mobile-first websites for venues and lifestyle brands, connected to booking and reservation tools.",
    needs: ["Image-rich, fast pages", "Booking tool integrations", "Mobile-first layouts", "Easy seasonal updates"],
    services: ["website-redesign", "seo-performance", "website-maintenance"],
    art: "hospitality",
    tone: "white",
  },
  {
    slug: "small-businesses",
    title: "Growing Small Businesses",
    summary: "Practical websites and dependable ongoing support for owners who need their site to simply work.",
    needs: ["Affordable, focused scope", "Local and international visibility", "Fixes without the wait", "Monthly care"],
    services: ["website-development", "bug-fixing", "website-maintenance"],
    art: "smallbiz",
    tone: "lavender",
  },
];
