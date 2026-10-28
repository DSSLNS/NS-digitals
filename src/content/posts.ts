import type { ServiceSlug } from "./services";

/**
 * Insights articles. Bodies are stored as typed blocks so the same shape can be fed from a
 * headless CMS later (see src/lib/content.ts) without changing any page component.
 */
export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul" | "ol"; items: string[] }
  | { type: "quote"; text: string };

export type Post = {
  slug: string;
  title: string;
  category: "Redesign" | "Performance" | "Quality Assurance" | "E-commerce" | "Technical SEO";
  excerpt: string;
  publishedAt: string;
  updatedAt?: string;
  relatedService: ServiceSlug;
  cover: "plum" | "coral" | "mint" | "lavender" | "sun";
  body: Block[];
};

export const posts: Post[] = [
  {
    slug: "why-qa-matters-before-website-launch",
    title: "Why QA matters before a website launch",
    category: "Quality Assurance",
    excerpt: "Launch day is the most expensive moment to discover a bug. Here is what structured pre-launch testing covers, and why developers shouldn't be the only testers.",
    publishedAt: "2026-10-20",
    relatedService: "qa-testing",
    cover: "mint",
    body: [
      { type: "p", text: "Most website launches are planned around design sign-off and content deadlines. Testing gets whatever time is left, often a day or two of clicking around on the developer's own laptop. Then the site goes live, and the first real visitors become the test team." },
      { type: "p", text: "Pre-launch quality assurance exists to move that discovery earlier, when fixing a problem is cheap and nobody outside the project has seen it." },
      { type: "h2", text: "Why developers shouldn't be the only testers" },
      { type: "p", text: "Developers test the paths they built, in the way they expect them to be used. That is valuable, but it is not the same as testing. A dedicated QA engineer approaches the site without those assumptions: they submit forms with unusual input, resize the browser mid-journey, use the keyboard instead of a mouse, and follow the routes real visitors take." },
      { type: "quote", text: "The most useful question in QA is not 'does it work?' but 'how could this fail for someone?'" },
      { type: "h2", text: "What a pre-launch test plan should cover" },
      { type: "ul", items: [
        "Functional testing: every form, button, menu, filter and integration does what it should, including error states.",
        "Responsive testing: layouts hold together across phones, tablets and desktops, not just at the breakpoints in the design file.",
        "Cross-browser testing: current versions of Chrome, Safari, Firefox and Edge, prioritised by your audience.",
        "Accessibility: keyboard navigation, focus visibility, form labels, colour contrast and screen reader announcements.",
        "Content and links: no broken internal links, missing images or placeholder text left behind.",
        "SEO essentials: titles, meta descriptions, canonical URLs, redirects, sitemap and robots rules.",
        "Performance: key templates checked for load time and layout stability on a mid-range mobile device.",
      ] },
      { type: "h2", text: "Severity matters more than volume" },
      { type: "p", text: "A pre-launch round will usually surface a list of issues. The goal is not zero issues; it is making sure nothing severe ships. A clear severity scale helps teams decide what blocks launch (a broken enquiry form) and what can follow shortly after (a minor spacing inconsistency)." },
      { type: "h2", text: "After launch: keep a regression safety net" },
      { type: "p", text: "Launch is the start of a site's life, not the end. Every update, plugin change or new feature can affect what already worked. A small set of automated tests for critical journeys, plus a short manual regression checklist, protects the work you have already paid for." },
    ],
  },
  {
    slug: "website-redesign-planning-guide",
    title: "Planning a website redesign without losing what works",
    category: "Redesign",
    excerpt: "A redesign is a chance to fix years of accumulated problems, and a risk to the traffic and content you have built. A practical planning checklist.",
    publishedAt: "2026-10-08",
    relatedService: "website-redesign",
    cover: "coral",
    body: [
      { type: "p", text: "Redesigns usually begin with a feeling: the site looks dated, it is hard to update, or competitors seem sharper. Those are good reasons to act. But the most successful redesigns start with evidence about what the current site does well, so the new one builds on it." },
      { type: "h2", text: "1. Audit before you design" },
      { type: "p", text: "Before anyone opens a design tool, gather three things: analytics showing which pages attract and convert visitors, search data showing which pages rank and earn links, and feedback from the people who answer customer questions." },
      { type: "ul", items: [
        "Which pages bring in the most organic traffic?",
        "Which pages lead to enquiries or sales?",
        "Which questions do customers ask that the site doesn't answer?",
        "Which pages are outdated, duplicated or never visited?",
      ] },
      { type: "h2", text: "2. Decide what to keep, improve and retire" },
      { type: "p", text: "Sort existing content into three groups. Keep pages that perform well. Improve pages with potential that are let down by structure or writing. Retire pages that serve no one, and redirect them to the closest relevant page." },
      { type: "h2", text: "3. Map every important URL" },
      { type: "p", text: "If URLs change, build a redirect map that pairs each old URL with its new destination. Permanent (301) redirects tell search engines where content has moved. Skipping this step is one of the most common reasons traffic drops after a relaunch." },
      { type: "h2", text: "4. Design around journeys, not pages" },
      { type: "p", text: "Identify the three or four journeys that matter most, such as finding a service, comparing options or getting in touch, and design the navigation and page structure to make those journeys short and obvious." },
      { type: "h2", text: "5. Test the new site against the old one" },
      { type: "p", text: "Before launch, crawl the staging site to check redirects, metadata and internal links. After launch, monitor Search Console and analytics closely for a few weeks so any issues are caught early." },
      { type: "quote", text: "A redesign should feel new to visitors and familiar to search engines." },
    ],
  },
  {
    slug: "common-website-performance-issues",
    title: "Seven common website performance issues and how to fix them",
    category: "Performance",
    excerpt: "Oversized images, render-blocking scripts and layout shifts are behind most slow websites. How to spot each one, and what actually fixes it.",
    publishedAt: "2026-09-24",
    relatedService: "seo-performance",
    cover: "sun",
    body: [
      { type: "p", text: "Slow websites are rarely slow for exotic reasons. In most audits, the same handful of issues account for the majority of the delay. The good news is that most of them can be fixed without rebuilding the site." },
      { type: "h2", text: "1. Images that are far larger than they need to be" },
      { type: "p", text: "A 4,000-pixel photo displayed at 600 pixels wide wastes bandwidth on every visit. Serve responsive images in modern formats such as AVIF or WebP, sized for the space they occupy, and lazy-load images below the fold." },
      { type: "h2", text: "2. Render-blocking JavaScript and CSS" },
      { type: "p", text: "Scripts and stylesheets loaded in the page head can delay the first paint. Defer non-critical scripts, split large bundles, and remove code that is no longer used." },
      { type: "h2", text: "3. Too many third-party scripts" },
      { type: "p", text: "Chat widgets, trackers, heatmaps and marketing tags add up. Review each one: is it still used, and does it need to load on every page? Removing two or three forgotten tags is often the fastest improvement available." },
      { type: "h2", text: "4. Web fonts that delay text" },
      { type: "p", text: "Fonts loaded from external services without a fallback strategy can leave text invisible while they download. Self-host fonts where possible, subset them, and use font-display settings so text appears immediately." },
      { type: "h2", text: "5. Layout shifts" },
      { type: "p", text: "Content that jumps as images, ads or banners load is measured by Cumulative Layout Shift. Reserve space for media with width and height attributes, and avoid inserting content above what the visitor is reading." },
      { type: "h2", text: "6. Slow server response" },
      { type: "p", text: "If the server takes a long time to respond, everything else waits. Caching, a content delivery network and static generation for pages that rarely change all reduce time to first byte." },
      { type: "h2", text: "7. Heavy interactions" },
      { type: "p", text: "Interaction to Next Paint measures how quickly a page responds to taps and clicks. Long JavaScript tasks are the usual cause. Break up heavy work, and avoid running expensive code on every scroll or keystroke." },
      { type: "h2", text: "Measure first, then fix" },
      { type: "p", text: "Use both lab tools like Lighthouse and field data from real users. Lab data helps you diagnose; field data tells you what visitors actually experience. Record a baseline before you change anything so improvements can be demonstrated." },
    ],
  },
  {
    slug: "ecommerce-checkout-usability",
    title: "E-commerce checkout usability: small fixes that remove friction",
    category: "E-commerce",
    excerpt: "Shoppers abandon checkouts for predictable reasons: surprise costs, forced accounts and confusing forms. Practical improvements that make buying easier.",
    publishedAt: "2026-09-10",
    relatedService: "ecommerce-development",
    cover: "lavender",
    body: [
      { type: "p", text: "Checkout is where a shopper has already decided to buy. Any friction at this point is especially costly, because the hard part, persuading them, is already done. Most checkout problems fall into a few well-understood categories." },
      { type: "h2", text: "Show total costs early" },
      { type: "p", text: "Unexpected delivery fees or taxes at the final step are one of the most common reasons for abandonment. Show delivery options and estimated costs in the cart, before the shopper commits to entering their details." },
      { type: "h2", text: "Offer guest checkout" },
      { type: "p", text: "Requiring an account before purchase adds a barrier at the worst moment. Let people check out as a guest, and offer account creation afterwards, when it feels like a benefit rather than a hurdle." },
      { type: "h2", text: "Make forms forgiving" },
      { type: "ul", items: [
        "Use the correct input types so mobile keyboards show numbers for card and phone fields.",
        "Support browser autofill with standard autocomplete attributes.",
        "Validate inline, with specific, helpful messages, not a generic error at the top of the page.",
        "Ask only for information you genuinely need to fulfil the order.",
      ] },
      { type: "h2", text: "Build trust at the point of payment" },
      { type: "p", text: "Clear returns information, recognisable payment options and a visible order summary reassure shoppers just as they hand over card details. Avoid redirects or design changes that make the payment step feel like a different site." },
      { type: "h2", text: "Test every payment scenario" },
      { type: "p", text: "Checkout testing should cover declined cards, expired sessions, discount codes, out-of-stock items mid-checkout, and each payment method you offer, on real mobile devices. These edge cases are exactly where real customers get stuck." },
    ],
  },
  {
    slug: "technical-seo-fundamentals",
    title: "Technical SEO fundamentals every business website needs",
    category: "Technical SEO",
    excerpt: "Before content and links can do their job, search engines need to crawl, render and understand your site. The technical foundations, in plain English.",
    publishedAt: "2026-08-27",
    relatedService: "seo-performance",
    cover: "plum",
    body: [
      { type: "p", text: "Technical SEO is the part of search optimisation that makes sure search engines can find, crawl, render and understand your pages. It won't make weak content rank, but technical problems can stop strong content from being seen at all." },
      { type: "h2", text: "Crawlability" },
      { type: "p", text: "Search engines discover pages by following links. Make sure important pages are linked from your navigation or other pages, your robots.txt file isn't blocking anything it shouldn't, and your XML sitemap lists the pages you want indexed." },
      { type: "h2", text: "Indexability" },
      { type: "p", text: "A page can be crawled but still excluded from search results. Check for accidental noindex tags, make sure canonical tags point to the right version of each page, and avoid publishing many near-identical pages." },
      { type: "h2", text: "Clean URLs and redirects" },
      { type: "p", text: "Use readable, stable URLs. When a URL must change, use a permanent redirect to the new location, and avoid chains of redirects that pass through several URLs." },
      { type: "h2", text: "Titles, descriptions and headings" },
      { type: "ul", items: [
        "Give every page a unique, descriptive title.",
        "Write meta descriptions that accurately summarise the page.",
        "Use one clear H1 per page, followed by a logical heading structure.",
      ] },
      { type: "h2", text: "Structured data" },
      { type: "p", text: "Structured data uses the schema.org vocabulary to describe your organisation, articles, breadcrumbs and more in a format machines can read. Only mark up information that is accurate and visible on the page." },
      { type: "h2", text: "Performance and mobile experience" },
      { type: "p", text: "Search engines use mobile versions of pages for indexing, and page experience signals such as Core Web Vitals reflect how real users experience your site. Fast, stable, mobile-friendly pages are good for visitors and search alike." },
      { type: "quote", text: "Technical SEO removes barriers. It does not guarantee rankings, and anyone who promises otherwise is guessing." },
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

export const postText = (p: Post) =>
  p.body.map((b) => ("text" in b ? b.text : b.items.join(" "))).join(" ");
