import { serviceLabel, type ServiceSlug } from "./services";

/**
 * Portfolio entries.
 *
 * Every entry below is a CONCEPT PROJECT: a fictional brand and brief created to show how we approach
 * the work. They are not client work and carry no results, client names, budgets or testimonials.
 * Replace them with verified client projects (with written permission) as they become available,
 * and set `kind: "client"`.
 *
 * Screens are captured from the coded mockups in `src/components/mockups` with `npm run mockups:capture`
 * and stored in `public/images/work/<slug>/<view>.jpg`. Views starting with "mobile" are phone screens.
 */

export const projectIndustries = [
  "Fashion & Retail",
  "Furniture & Interiors",
  "SaaS & Technology",
  "Healthcare & Wellness",
  "Hospitality & Restaurants",
  "Education & E-learning",
  "Travel & Tourism",
  "Professional Services",
] as const;

export type ProjectIndustry = (typeof projectIndustries)[number];

export type ProjectTone = "lavender" | "mint" | "coral" | "sun" | "ivory";

export type ProjectScreen = { view: string; alt: string; caption?: string };

/** A project-specific section that makes each case study distinct. Rendered by components/case-study/feature-block.tsx. */
export type ProjectFeature =
  | { type: "journey"; title: string; intro: string; steps: (ProjectScreen & { title: string })[]; scenarios: string[] }
  | { type: "style-tile"; title: string; intro: string; colors: { name: string; hex: string }[]; fonts: { name: string; role: string; family: "serif" | "sans" }[]; screens: ProjectScreen[] }
  | { type: "budget"; title: string; intro: string; budgets: { metric: string; target: string; why: string }[]; screens: ProjectScreen[] }
  | { type: "before-after"; title: string; intro: string; before: ProjectScreen; after: ProjectScreen; changes: { area: string; before: string; after: string }[] }
  | { type: "issue-log"; title: string; intro: string; issues: { id: string; area: string; symptom: string; cause: string; fix: string; check: string }[] }
  | { type: "qa-report"; title: string; intro: string; suites: { name: string; scope: string; cases: number; passed: number; failed: number; blocked: number }[]; browsers: string[]; defect: { id: string; title: string; severity: string; steps: string[]; expected: string; actual: string; status: string } }
  | { type: "seo-process"; title: string; intro: string; steps: { title: string; body: string }[]; vitals: { metric: string; good: string; meaning: string }[]; snippet: string }
  | { type: "maintenance"; title: string; intro: string; cadence: { period: string; tasks: string[] }[]; log: { date: string; type: string; entry: string }[] };

export type Project = {
  slug: string;
  kind: "concept" | "client";
  /** Brand name shown in the preview frame. Fictional for concept projects. */
  name: string;
  title: string;
  domain: string;
  industry: ProjectIndustry;
  /** The service this project mainly demonstrates. */
  primaryService: ServiceSlug;
  services: ServiceSlug[];
  /** Card copy: the problem and the solution in two short sentences. */
  summary: string;
  overview: string;
  challenge: string;
  objectives: string[];
  solution: string;
  design: { body: string; points: string[] };
  development: { body: string; points: string[] };
  testing: { body: string; checks: string[] };
  responsive: string;
  technologies: string[];
  /** For concept projects: what the concept demonstrates. Never invented metrics. */
  outcome: string;
  /** Verified, client-approved results only. Always empty for concept projects. */
  results: string[];
  tone: ProjectTone;
  cover: ProjectScreen;
  mobile: ProjectScreen;
  feature: ProjectFeature;
};

export const projects: Project[] = [
  {
    slug: "atelier-commerce-concept",
    kind: "concept",
    name: "Atelier",
    title: "Atelier: premium fashion e-commerce store",
    domain: "atelier-store.example",
    industry: "Fashion & Retail",
    primaryService: "ecommerce-development",
    services: ["ecommerce-development", "qa-testing", "seo-performance"],
    summary:
      "A small fashion label needs to feel as trustworthy as a big retailer online. We designed a fast storefront with filterable collections, detailed product pages and a three-step checkout.",
    overview:
      "Atelier is a fictional, independent clothing label selling considered everyday pieces. This concept covers the full shopping journey (collection pages, product detail, cart and checkout) and the QA plan that keeps it dependable as the catalogue grows.",
    challenge:
      "Independent labels compete with large retailers on trust and convenience. Shoppers abandon when sizing is unclear, delivery costs appear late or the checkout asks for an account. The store also has to stay fast with large, image-led product pages.",
    objectives: [
      "Help shoppers find the right piece in a few taps with useful filters and sorting",
      "Answer size, fabric, delivery and returns questions on the product page",
      "Keep checkout to three clear steps, with guest checkout and costs shown upfront",
      "Keep image-heavy pages fast on mid-range phones",
    ],
    solution:
      "An editorial storefront with curated collections, filter and sort controls that update without reloading, product pages that put size guidance and delivery information above the fold, a slide-out cart, and a three-step guest checkout with inline validation.",
    design: {
      body: "Photography leads, so the interface steps back: a warm neutral palette, a refined serif for headings and generous whitespace. Product cards show colour options and price clearly, and every action uses one consistent button style.",
      points: ["Four-column collection grid, two on mobile", "Sticky add-to-bag bar on small screens", "Size guide in a dialog, not a separate page", "Order summary visible at every checkout step"],
    },
    development: {
      body: "We would build the storefront as a headless front end on a hosted commerce platform, so the brand keeps a familiar admin while the shop front stays fast and fully custom.",
      points: ["Filters and sorting as URL parameters, so results can be shared and bookmarked", "Responsive images with explicit dimensions to prevent layout shift", "Cart state that persists between visits", "Payment through the platform's hosted, PCI-compliant checkout"],
    },
    testing: {
      body: "E-commerce bugs cost sales directly, so the QA plan focuses on the money path and the edge cases around it.",
      checks: ["Add to bag, update quantity and remove, across sizes and colours", "Out-of-stock and low-stock behaviour", "Discount codes: valid, expired and minimum spend", "Declined and interrupted payments", "Order confirmation email content", "Checkout on iOS Safari, Android Chrome and desktop browsers"],
    },
    responsive:
      "On phones, the product gallery becomes a swipeable carousel, filters move into a bottom sheet, and the add-to-bag button stays within thumb reach. Checkout fields use the right keyboard types and autofill.",
    technologies: ["Next.js", "TypeScript", "Shopify Storefront API", "Tailwind CSS", "Playwright"],
    outcome:
      "The concept shows how we plan a store around buying decisions: product information placed where questions arise, a short checkout, and a test plan that covers the scenarios that lose orders.",
    results: [],
    tone: "coral",
    cover: { view: "home", alt: "Atelier concept store homepage with a seasonal campaign banner and new-arrival product cards" },
    mobile: { view: "mobile-product", alt: "Atelier product page on a phone with photo gallery, size selector and add-to-bag button" },
    feature: {
      type: "journey",
      title: "The purchase journey, screen by screen",
      intro: "Three templates do most of the selling. Each one was designed and tested around the questions a shopper has at that moment.",
      steps: [
        { view: "collection", title: "Browse the collection", alt: "Atelier collection page with filters for category, size and colour, a sort menu and a product grid", caption: "Filters and sorting update instantly and keep their state in the URL." },
        { view: "product", title: "Decide on the product page", alt: "Atelier product detail page with image gallery, size selector, fabric details and delivery information", caption: "Size, fabric, delivery and returns answered without leaving the page." },
        { view: "checkout", title: "Check out as a guest", alt: "Atelier checkout page with delivery form, delivery options and an order summary", caption: "Three steps, costs visible upfront and inline validation on every field." },
      ],
      scenarios: ["Guest checkout with a saved address", "Discount code applied, then removed", "Item goes out of stock while in the bag", "Payment declined, then retried", "Browser back button during checkout"],
    },
  },
  {
    slug: "oakhaven-furniture-concept",
    kind: "concept",
    name: "Oakhaven",
    title: "Oakhaven: furniture & interiors website",
    domain: "oakhaven-living.example",
    industry: "Furniture & Interiors",
    primaryService: "website-development",
    services: ["website-development", "website-redesign", "ecommerce-development"],
    summary:
      "A furniture brand's products look ordinary in a generic template. We designed an editorial site where room photography, collections and material details sell the craft.",
    overview:
      "Oakhaven is a fictional furniture and interiors brand selling sofas, chairs and living-room pieces. The concept rethinks a template-based site as an editorial experience that shows how pieces live in real rooms, while still making it easy to browse and enquire.",
    challenge:
      "Furniture is a considered purchase. Shoppers want to see scale, texture and how a piece fits into a room, but template sites crop photography into small tiles and bury material and dimension details. Navigation built around product types also ignores how people actually shop: by room and style.",
    objectives: [
      "Let large-format room photography carry the brand",
      "Organise navigation by room and collection as well as product type",
      "Make dimensions, materials and lead times easy to find",
      "Give the in-house team an easy way to publish new collections",
    ],
    solution:
      "A full-bleed editorial homepage, collection pages that mix lifestyle imagery with product cards, and product pages with dimensions, material swatches and delivery lead times. Navigation offers both 'Shop by room' and 'Collections'.",
    design: {
      body: "A calm, gallery-like layout with a serif display face, a muted oak-and-linen palette and asymmetric editorial grids. Photography is never cropped into small, uniform squares.",
      points: ["Full-bleed hero with a single, clear call to action", "Editorial collection layouts mixing photography and products", "Material swatches and dimension diagrams on product pages", "Restrained motion: gentle image reveals only"],
    },
    development: {
      body: "We would build a component-based site on a headless CMS, with flexible page sections the team can arrange to publish a new collection without a developer.",
      points: ["Section-based page builder with guarded layout options", "Image pipeline producing modern formats at several sizes", "Product data synced from the commerce platform", "Structured data for products and breadcrumbs"],
    },
    testing: {
      body: "Image-led sites fail quietly: slow pages, layout shift and cropped photography. Testing focused on visual quality and speed as much as function.",
      checks: ["Visual review of every template at four breakpoints", "Image cropping and focal points across screen sizes", "Navigation menus with mouse, touch and keyboard", "CMS editing: each section added, reordered and removed", "Lead-time and dimension data shown correctly for each product"],
    },
    responsive:
      "The mega menu becomes a simple two-level drawer on phones, editorial grids stack into a single column with photography kept at full width, and product swatches become a horizontal scroller.",
    technologies: ["Next.js", "Sanity CMS", "TypeScript", "Tailwind CSS", "Vercel"],
    outcome:
      "The concept shows how we design around photography and real shopping behaviour, and how a flexible CMS lets a small team keep an image-led site fresh.",
    results: [],
    tone: "sun",
    cover: { view: "home", alt: "Oakhaven homepage with a full-width living room photograph and shop-by-room navigation" },
    mobile: { view: "mobile-home", alt: "Oakhaven homepage on a phone with room photography and collection links" },
    feature: {
      type: "style-tile",
      title: "Design system and collection pages",
      intro: "A small, deliberate system: two typefaces, a natural palette and editorial page sections the team can reuse for every new collection.",
      colors: [
        { name: "Linen", hex: "#F4EFE6" },
        { name: "Oak", hex: "#B08455" },
        { name: "Moss", hex: "#2F4A3A" },
        { name: "Charcoal", hex: "#2A2723" },
      ],
      fonts: [
        { name: "Fraunces", role: "Headings and editorial quotes", family: "serif" },
        { name: "Manrope", role: "Navigation, body copy and prices", family: "sans" },
      ],
      screens: [{ view: "collection", alt: "Oakhaven living-room collection page with an editorial photo grid and product cards", caption: "Collection pages mix editorial photography with products." }],
    },
  },
  {
    slug: "ledgerly-saas-concept",
    kind: "concept",
    name: "Ledgerly",
    title: "Ledgerly: SaaS product website",
    domain: "ledgerly.example",
    industry: "SaaS & Technology",
    primaryService: "website-development",
    services: ["website-development", "seo-performance", "qa-testing"],
    summary:
      "A finance software startup's site lags behind a product that ships weekly. We designed a fast, conversion-focused marketing site with real product screens, clear pricing and FAQs.",
    overview:
      "Ledgerly is a fictional bookkeeping product for small finance teams. The concept covers a marketing site that explains the product with real interface screens, presents pricing clearly and keeps pace with weekly releases.",
    challenge:
      "SaaS buyers want to see the product, understand pricing and trust the company before starting a trial. Many startup sites rely on abstract illustrations, hide pricing and become slow as marketing scripts accumulate, while every product release risks breaking sign-up.",
    objectives: [
      "Show the actual product instead of abstract illustrations",
      "Make plans and pricing easy to compare, with monthly and annual options",
      "Keep the site fast under an agreed performance budget",
      "Protect sign-up and trial journeys with automated tests on every deploy",
    ],
    solution:
      "A component-based marketing site with product-screen-led feature sections, use-case pages by team type, a transparent pricing page with a billing toggle and comparison table, and a searchable FAQ. Automated tests guard the sign-up journey.",
    design: {
      body: "Product screenshots are the hero of every section, framed consistently and annotated where useful. Typography is crisp and functional, with a single accent colour for calls to action.",
      points: ["Product-led hero with one primary and one secondary action", "Feature sections pairing a benefit with a real screen", "Pricing cards with the recommended plan clearly marked", "FAQ grouped by billing, security and onboarding"],
    },
    development: {
      body: "We would build a statically generated site from reusable content blocks, so marketing can publish new feature pages from the CMS, with third-party scripts loaded only after consent and interaction.",
      points: ["Reusable content blocks for features, quotes and comparisons", "Pricing data defined once and reused across pages", "Performance budget enforced in continuous integration", "Analytics and chat widgets loaded on demand"],
    },
    testing: {
      body: "Fast-moving teams need a safety net. Critical journeys are automated and run on every deployment, with a short manual checklist for visual changes.",
      checks: ["Sign-up and trial activation end to end", "Pricing toggle and plan selection", "Comparison table on small screens", "Form validation and error messages", "Accessibility checks with axe on key templates", "Lighthouse checks against the agreed budget"],
    },
    responsive:
      "The comparison table becomes per-plan accordions on phones, product screenshots switch to cropped mobile-friendly views, and the pricing toggle stays sticky above the plans.",
    technologies: ["Next.js", "TypeScript", "Contentful", "Playwright", "Lighthouse CI"],
    outcome:
      "The concept shows how we build product-led SaaS sites that explain clearly, convert on pricing and stay stable as releases ship every week.",
    results: [],
    tone: "lavender",
    cover: { view: "home", alt: "Ledgerly homepage with a product dashboard screenshot, headline and start-free-trial button" },
    mobile: { view: "mobile-home", alt: "Ledgerly homepage on a phone with headline, trial button and dashboard preview" },
    feature: {
      type: "budget",
      title: "Pricing page and performance budget",
      intro: "Before building, we agree budgets for every template. These are targets the build is tested against, not measured results.",
      budgets: [
        { metric: "Largest Contentful Paint", target: "≤ 2.5 s on mobile", why: "The hero screenshot should appear quickly on mid-range phones." },
        { metric: "Interaction to Next Paint", target: "≤ 200 ms", why: "The pricing toggle and menus must respond instantly." },
        { metric: "Cumulative Layout Shift", target: "≤ 0.1", why: "Screenshots and fonts reserve their space, so nothing jumps." },
        { metric: "JavaScript per page", target: "≤ 150 KB compressed", why: "Third-party scripts load only when needed." },
      ],
      screens: [{ view: "pricing", alt: "Ledgerly pricing page with monthly and annual toggle, three plans and a recommended plan highlighted", caption: "Three plans, a billing toggle and the recommended plan clearly marked." }],
    },
  },
  {
    slug: "harbour-clinic-redesign-concept",
    kind: "concept",
    name: "Harbour Clinic",
    title: "Harbour Clinic: healthcare website redesign",
    domain: "harbour-clinic.example",
    industry: "Healthcare & Wellness",
    primaryService: "website-redesign",
    services: ["website-redesign", "qa-testing", "seo-performance"],
    summary:
      "A physiotherapy clinic's dated site hides services and booking, especially on phones. We redesigned the structure, typography and navigation around patient needs.",
    overview:
      "Harbour Clinic is a fictional physiotherapy and wellness practice. This concept compares a typical outdated practice website with a redesigned version built around accessibility, plain-language service information and a simple appointment request.",
    challenge:
      "Practice websites often grow page by page until visitors cannot find services or booking information. Small text, low contrast, crowded navigation and desktop-only layouts make the site hard to use, especially for older patients on phones. A redesign also risks losing pages that already rank in local search.",
    objectives: [
      "Make booking an appointment the obvious next step on every page",
      "Group services by patient need, in plain language",
      "Meet WCAG 2.2 AA for contrast, focus states and readable text",
      "Keep existing search visibility through the migration",
    ],
    solution:
      "A restructured site with a clear hero and persistent booking action, services grouped by condition and treatment, practitioner profiles, and an accessible design system. Every old URL is mapped to its new home with redirects.",
    design: {
      body: "Calm, readable and reassuring: larger body text, strong contrast, a soft clinical palette and real photography of care rather than generic stock icons.",
      points: ["Navigation reduced from nine items to five", "Body text at 18px with comfortable line length", "One primary action: Book an appointment", "Visible focus states and large touch targets"],
    },
    development: {
      body: "We would rebuild on a modern CMS with structured content for services and practitioners, migrating content page by page with a URL map that keeps search rankings intact.",
      points: ["Structured service and practitioner content types", "301 redirects for every legacy URL", "LocalBusiness and MedicalClinic structured data", "Booking widget loaded only when requested"],
    },
    testing: {
      body: "Accessibility and migration safety were tested as carefully as visual design.",
      checks: ["Keyboard-only navigation of booking and contact journeys", "Screen reader checks with VoiceOver and NVDA", "Colour contrast on every component", "Crawl comparing old and new URLs before launch", "Forms tested with valid, invalid and partial input"],
    },
    responsive:
      "The redesign is mobile-first: a tap-to-call button and booking action stay in reach, service lists become clear cards and the opening hours are visible without scrolling.",
    technologies: ["Next.js", "WordPress (headless)", "TypeScript", "axe-core", "Screaming Frog"],
    outcome:
      "The concept shows how we approach a redesign: structure and accessibility first, visual polish second, and a migration plan that protects what already works.",
    results: [],
    tone: "mint",
    cover: { view: "home", alt: "Redesigned Harbour Clinic homepage with clear navigation, a book-appointment button and a photo of a physiotherapy session" },
    mobile: { view: "mobile-home", alt: "Redesigned Harbour Clinic homepage on a phone with book-appointment and call buttons" },
    feature: {
      type: "before-after",
      title: "Before and after",
      intro: "Drag the handle to compare a typical outdated practice website with the redesigned concept. The 'before' is a representative example, not a real clinic's site.",
      before: { view: "before", alt: "Representative outdated clinic website with crowded navigation, small text and a cluttered layout" },
      after: { view: "home", alt: "Redesigned Harbour Clinic homepage with clear hierarchy and a prominent booking button" },
      changes: [
        { area: "Layout", before: "Three cramped columns competing for attention", after: "One clear message, one primary action, supporting content below" },
        { area: "Typography", before: "13px body text, low-contrast grey", after: "18px body text with AA contrast throughout" },
        { area: "Navigation", before: "Nine top-level items in internal jargon", after: "Five items grouped by patient need" },
        { area: "Mobile usability", before: "Desktop layout shrunk to fit", after: "Mobile-first layout with booking and call buttons in reach" },
        { area: "Content hierarchy", before: "News and awards above services", after: "Services, booking and opening hours first" },
      ],
    },
  },
  {
    slug: "saffron-table-bug-fixing-concept",
    kind: "concept",
    name: "Saffron Table",
    title: "Saffron Table: restaurant website technical recovery",
    domain: "saffron-table.example",
    industry: "Hospitality & Restaurants",
    primaryService: "bug-fixing",
    services: ["bug-fixing", "website-maintenance", "qa-testing"],
    summary:
      "Broken layouts, a dead reservation button and a failing booking form are typical problems on restaurant sites. This case study walks through how we diagnose and fix them.",
    overview:
      "Saffron Table is a fictional neighbourhood restaurant. This case study uses its website to walk through common technical issues we see on hospitality sites, and the process we follow to diagnose, fix and prevent them. The issues are illustrative and did not happen on a real client's site.",
    challenge:
      "Restaurant sites change constantly (seasonal menus, events and new booking tools) and often by different people. Small changes break things quietly: a plugin update shifts the layout, a script conflict stops the reservation button working, and the booking form rejects valid phone numbers. Every broken journey is a lost booking.",
    objectives: [
      "Reproduce every reported issue reliably before changing code",
      "Find the root cause, not just the symptom",
      "Fix issues without introducing new regressions",
      "Leave behind checks that catch the same problems early",
    ],
    solution:
      "A structured triage: reproduce on the affected devices, isolate the cause in the browser's developer tools, fix on a staging copy, verify across browsers and add a regression check. Each fix is documented in plain English.",
    design: {
      body: "Fixes respect the existing design. Where a bug exposes a fragile pattern, such as fixed-height cards that break with longer menu descriptions, we replace it with a resilient one that looks the same.",
      points: ["Flexible card heights for menu items of any length", "Consistent button styles for every booking action", "Clear inline error messages on the booking form", "Opening hours visible on the homepage"],
    },
    development: {
      body: "Every fix starts with a reproducible case and ends with a short note: what broke, why and what changed.",
      points: ["Console and network inspection to isolate script conflicts", "CSS fixes using flexible layout instead of fixed heights", "Phone validation that accepts international formats", "Booking widget loaded once, after the page is interactive"],
    },
    testing: {
      body: "Every fix is verified where the bug was reported, then regression-tested across the site's key journeys.",
      checks: ["Reservation flow on iOS Safari, Android Chrome and desktop", "Booking form with UK, US and international numbers", "Menu pages with long and short descriptions", "Contact and map links", "Page speed before and after each fix"],
    },
    responsive:
      "Several of the illustrative issues only appear on phones. Each fix is checked at 360px, 390px, 768px and 1280px widths, and on real devices for touch interactions.",
    technologies: ["Chrome DevTools", "BrowserStack", "WordPress", "Playwright", "Sentry"],
    outcome:
      "The case study shows our bug-fixing process: reproduce, find the root cause, fix safely, verify and prevent the same problem from coming back.",
    results: [],
    tone: "coral",
    cover: { view: "home", alt: "Saffron Table restaurant homepage with a food photograph, opening hours and a reserve-a-table button" },
    mobile: { view: "mobile-booking", alt: "Saffron Table reservation form on a phone with date, time and party size fields" },
    feature: {
      type: "issue-log",
      title: "Illustrative issue log",
      intro: "Typical problems on restaurant websites and how we would resolve them. These are representative examples, not issues from a client engagement.",
      issues: [
        { id: "ST-01", area: "Layout", symptom: "Menu cards overlap on phones when a dish description runs to three lines.", cause: "Cards use a fixed height designed around short descriptions.", fix: "Replaced fixed heights with a flexible grid so cards grow with their content.", check: "Visual checks at four widths with the longest menu item." },
        { id: "ST-02", area: "Buttons", symptom: "'Reserve a table' does nothing on some pages.", cause: "The booking script loads twice and the second copy removes the first one's click handler.", fix: "Loaded the booking script once, from a single component, after the page is interactive.", check: "Automated test clicks the button on every template." },
        { id: "ST-03", area: "Forms", symptom: "The booking form rejects valid international phone numbers.", cause: "Validation only accepts one national format.", fix: "Accept international formats and normalise them on submission, with a clear example in the hint text.", check: "Form tests with UK, US, Indian and German numbers." },
        { id: "ST-04", area: "Responsive", symptom: "The page scrolls sideways on small phones.", cause: "An embedded map has a fixed pixel width.", fix: "Made the map responsive and added an overflow check to the test suite.", check: "Horizontal-overflow check on every page at 360px." },
      ],
    },
  },
  {
    slug: "brightpath-qa-testing-concept",
    kind: "concept",
    name: "Brightpath Academy",
    title: "Brightpath Academy: e-learning QA & testing",
    domain: "brightpath-academy.example",
    industry: "Education & E-learning",
    primaryService: "qa-testing",
    services: ["qa-testing", "bug-fixing", "website-maintenance"],
    summary:
      "An online learning platform must work for every learner, on every device. We set out a QA workflow covering sign-up, course purchase, lessons and regression testing.",
    overview:
      "Brightpath Academy is a fictional online course platform. The concept shows how we would plan and run QA for a learning site: test strategy, coverage across browsers and devices, defect reporting and regression testing before each release.",
    challenge:
      "Learning platforms combine marketing pages, account sign-up, payments, video lessons and progress tracking, often across several third-party services. A bug in any one of them stops a learner from starting a course, and issues tend to surface only on certain devices or browsers.",
    objectives: [
      "Cover every critical learner journey with documented test cases",
      "Test across the browsers and devices learners actually use",
      "Report defects clearly enough to fix without back-and-forth",
      "Automate regression checks for the journeys that matter most",
    ],
    solution:
      "A risk-based test plan, a browser and device matrix based on analytics, manual exploratory testing for new features, automated end-to-end tests for sign-up, purchase and lesson access, and a release checklist the team signs off before deploying.",
    design: {
      body: "QA starts at design: we review designs for missing states such as empty, loading, error and success before anything is built.",
      points: ["Design review for missing and error states", "Accessibility review of colours and focus order", "Content checks for course pages and emails", "Consistent error messages across forms"],
    },
    development: {
      body: "Automated tests live alongside the code and run on every pull request, so regressions are caught before they reach learners.",
      points: ["Playwright tests for sign-up, purchase and lesson access", "API checks for enrolment and progress endpoints", "Test data seeded and reset for each run", "Results reported in the pull request"],
    },
    testing: {
      body: "The workflow covers functional, responsive, cross-browser, form, integration, checkout and regression testing, with a clear report after every cycle.",
      checks: ["Functional flows: sign-up, login, enrolment and progress", "Responsive layouts at mobile, tablet and desktop widths", "Cross-browser: Chrome, Safari, Firefox and Edge", "Forms and validation, including edge cases", "API integrations for payments and the video player", "Course checkout with cards and discount codes", "Regression suite before every release"],
    },
    responsive:
      "Many learners study on phones and tablets, so lessons, quizzes and video playback are tested on real iOS and Android devices as well as in emulators.",
    technologies: ["Playwright", "Postman", "BrowserStack", "axe-core", "GitHub Actions"],
    outcome:
      "The concept shows our QA workflow end to end: a plan based on risk, broad coverage, clear defect reports and automation that protects every release.",
    results: [],
    tone: "lavender",
    cover: { view: "home", alt: "Brightpath Academy homepage with course categories, a featured course and a start-learning button" },
    mobile: { view: "mobile-course", alt: "Brightpath Academy lesson page on a phone with a video player and course progress" },
    feature: {
      type: "qa-report",
      title: "Sample test cycle report",
      intro: "This is what a test cycle report looks like. All figures below are demonstration data, not results from a real project.",
      suites: [
        { name: "Functional flows", scope: "Sign-up, login, enrolment, progress", cases: 42, passed: 39, failed: 2, blocked: 1 },
        { name: "Responsive layouts", scope: "360, 768, 1024 and 1440px widths", cases: 28, passed: 27, failed: 1, blocked: 0 },
        { name: "Cross-browser", scope: "Chrome, Safari, Firefox, Edge", cases: 36, passed: 35, failed: 1, blocked: 0 },
        { name: "Forms & validation", scope: "Required fields, formats, errors", cases: 24, passed: 24, failed: 0, blocked: 0 },
        { name: "API integrations", scope: "Payments, video player, email", cases: 18, passed: 17, failed: 0, blocked: 1 },
        { name: "Course checkout", scope: "Cards, discount codes, receipts", cases: 20, passed: 19, failed: 1, blocked: 0 },
        { name: "Regression", scope: "Automated critical journeys", cases: 30, passed: 30, failed: 0, blocked: 0 },
      ],
      browsers: ["Chrome", "Safari", "Firefox", "Edge", "iOS Safari", "Android Chrome"],
      defect: {
        id: "BP-114",
        title: "Discount code is cleared when the learner returns from the payment page",
        severity: "High",
        steps: ["Add 'UX Foundations' to the basket", "Apply discount code SPRING", "Continue to payment, then use the browser back button"],
        expected: "The basket still shows the discount and the reduced total.",
        actual: "The discount is removed and the full price is shown.",
        status: "Fixed and verified in regression",
      },
    },
  },
  {
    slug: "wayfarer-seo-performance-concept",
    kind: "concept",
    name: "Wayfarer Journeys",
    title: "Wayfarer Journeys: travel SEO & performance",
    domain: "wayfarer-journeys.example",
    industry: "Travel & Tourism",
    primaryService: "seo-performance",
    services: ["seo-performance", "website-development", "website-maintenance"],
    summary:
      "Travel sites rely on large photos and long tour pages, which can make them slow and hard to find in search. We set out a technical SEO and performance plan for a tour operator.",
    overview:
      "Wayfarer Journeys is a fictional small-group tour operator. This concept explains how we approach technical SEO and performance for an image-heavy travel site: what we audit, what we change and how we measure it.",
    challenge:
      "Tour pages are long and photo-heavy, itineraries are duplicated across similar trips, and booking widgets add heavy scripts. The result is often slow mobile pages, poor Core Web Vitals and search engines struggling to tell similar tours apart.",
    objectives: [
      "Make tour pages fast on mobile connections",
      "Give every tour a unique, descriptive title, description and structure",
      "Connect destinations, tours and guides with clear internal links",
      "Measure performance with real tests, not guesses",
    ],
    solution:
      "A technical audit followed by targeted changes: responsive, modern-format images; deferred booking scripts; unique metadata and structured data for every tour; a destination-led internal linking structure; and performance tests in every release.",
    design: {
      body: "Performance is a design decision. We keep the photography-led feel while setting rules: one hero image per page, galleries loaded on demand and fonts limited to two families.",
      points: ["Hero images sized for each breakpoint", "Galleries load only when opened", "Itineraries as scannable day-by-day sections", "Clear 'Check dates' action on every tour"],
    },
    development: {
      body: "Optimisations happen at the template level, so every current and future tour page benefits automatically.",
      points: ["AVIF and WebP images with explicit sizes", "Booking widget deferred until it is needed", "TouristTrip and BreadcrumbList structured data", "Canonical tags for similar itineraries"],
    },
    testing: {
      body: "Every change is measured. We run lab tests before and after each release and monitor field data where it is available.",
      checks: ["Lighthouse runs on key templates in a controlled environment", "Core Web Vitals monitoring from real-user data", "Crawl for broken links, redirects and duplicate titles", "Structured data validated with Google's Rich Results Test", "Image weight checks for every new tour page"],
    },
    responsive:
      "Most travel research happens on phones, so templates are optimised for mobile first: smaller hero images, a sticky 'Check dates' button and itineraries that expand day by day.",
    technologies: ["Next.js", "Lighthouse", "PageSpeed Insights", "Google Search Console", "Schema.org"],
    outcome:
      "The concept shows our SEO and performance process: audit, fix at the template level, validate and keep measuring. We report scores only from real test runs.",
    results: [],
    tone: "mint",
    cover: { view: "home", alt: "Wayfarer Journeys homepage with a mountain lake photograph, tour search and featured small-group tours" },
    mobile: { view: "mobile-home", alt: "Wayfarer Journeys homepage on a phone with destination search and a featured tour" },
    feature: {
      type: "seo-process",
      title: "How we approach technical SEO and performance",
      intro: "A repeatable process rather than a one-off checklist. Google's published Core Web Vitals thresholds are shown for reference.",
      steps: [
        { title: "Crawl and audit", body: "Crawl every URL to find broken links, redirect chains, duplicate titles, missing metadata and orphaned pages." },
        { title: "Fix the templates", body: "Change the templates rather than individual pages, so every tour benefits, including future ones." },
        { title: "Optimise images", body: "Serve modern formats at the right size for each screen, with explicit dimensions to prevent layout shift." },
        { title: "Improve Core Web Vitals", body: "Defer non-essential scripts, preload the hero image and keep interactions responsive." },
        { title: "Metadata and internal links", body: "Unique titles, descriptions and structured data, with destinations, tours and guides linked logically." },
        { title: "Test and monitor", body: "Lab tests on every release and field data over time. We only report numbers from real test runs." },
      ],
      vitals: [
        { metric: "LCP", good: "≤ 2.5 s", meaning: "How quickly the main content appears" },
        { metric: "INP", good: "≤ 200 ms", meaning: "How quickly the page responds to input" },
        { metric: "CLS", good: "≤ 0.1", meaning: "How much the layout moves while loading" },
      ],
      snippet: `<title>Dolomites Lakes & Peaks: 8-Day Small-Group Tour | Wayfarer</title>
<meta name="description" content="Hike between alpine lakes and..." />
<link rel="canonical" href="https://wayfarer-journeys.example/tours/dolomites" />
<script type="application/ld+json">
{ "@type": "TouristTrip", "name": "Dolomites Lakes & Peaks", ... }
</script>`,
    },
  },
  {
    slug: "northfield-maintenance-concept",
    kind: "concept",
    name: "Northfield Advisory",
    title: "Northfield Advisory: website maintenance & reliability",
    domain: "northfield-advisory.example",
    industry: "Professional Services",
    primaryService: "website-maintenance",
    services: ["website-maintenance", "bug-fixing", "qa-testing"],
    summary:
      "A firm's website quietly degrades between redesigns: outdated plugins, no tested backups, slow pages. We set out a maintenance plan built on monitoring, scheduled updates and regression testing.",
    overview:
      "Northfield Advisory is a fictional financial advisory firm whose website is its main source of enquiries. The concept shows how we would maintain a business-critical site: scheduled updates, monitoring, backups, security practices and testing after every change.",
    challenge:
      "Professional services sites are often launched and then left alone. Plugins fall behind, forms stop delivering without anyone noticing, backups are never tested and small content changes break layouts. Problems surface only when a prospective client mentions them.",
    objectives: [
      "Keep the platform, plugins and dependencies up to date safely",
      "Detect downtime, form failures and errors before clients do",
      "Make sure backups exist and can actually be restored",
      "Test the site after every update",
    ],
    solution:
      "A monthly maintenance plan: updates applied on staging first, automated visual and functional regression tests, uptime and form monitoring with alerts, daily off-site backups with quarterly restore tests, and a short monthly report in plain English.",
    design: {
      body: "Maintenance protects the design as well as the code. Visual regression tests compare key pages before and after every update, so layout changes never go unnoticed.",
      points: ["Visual baselines for key templates", "Content style guide for the in-house team", "Accessibility spot-checks each quarter", "Small UX improvements from the monthly backlog"],
    },
    development: {
      body: "Every change follows the same safe path: staging first, tested, deployed, then verified on the live site.",
      points: ["Staging environment that mirrors production", "Dependency and plugin updates batched monthly", "Security patches applied as soon as they are released", "Version control and a rollback plan for every deployment"],
    },
    testing: {
      body: "Regression testing after every update is what makes maintenance safe rather than risky.",
      checks: ["Automated checks of the enquiry and newsletter forms", "Visual comparison of key pages after updates", "Broken link scan each month", "Backup restore test each quarter", "SSL certificate and domain expiry monitoring"],
    },
    responsive:
      "Each monthly check includes the key pages at mobile, tablet and desktop widths, because content edits are the most common cause of broken mobile layouts.",
    technologies: ["WordPress", "Git", "UptimeRobot", "Playwright", "Cloudflare"],
    outcome:
      "The concept shows how we keep a business-critical website dependable: scheduled care, early warnings and testing that makes every update safe.",
    results: [],
    tone: "ivory",
    cover: { view: "home", alt: "Northfield Advisory homepage with a meeting photograph, advisory services and a book-a-consultation button" },
    mobile: { view: "mobile-home", alt: "Northfield Advisory homepage on a phone with services list and consultation button" },
    feature: {
      type: "maintenance",
      title: "Maintenance plan and sample log",
      intro: "What happens each week, month and quarter. The log entries are sample data showing the level of detail in our monthly report.",
      cadence: [
        { period: "Continuously", tasks: ["Uptime and SSL monitoring", "Form delivery checks", "Error alerts to our support queue"] },
        { period: "Weekly", tasks: ["Security patch review", "Backup verification", "Spam and form submission review"] },
        { period: "Monthly", tasks: ["Platform and plugin updates on staging", "Regression and visual tests", "Broken link scan", "Plain-English report"] },
        { period: "Quarterly", tasks: ["Backup restore test", "Performance review", "Accessibility spot-check", "Improvement recommendations"] },
      ],
      log: [
        { date: "Week 1", type: "Update", entry: "Platform and six plugins updated on staging; regression suite passed; deployed." },
        { date: "Week 2", type: "Fix", entry: "Team page layout broke after a long job title was added; card layout made flexible." },
        { date: "Week 3", type: "Monitoring", entry: "Contact form delivery alert; mail provider credential rotated; delivery confirmed." },
        { date: "Week 4", type: "Backup", entry: "Quarterly restore test to a clean environment completed successfully." },
      ],
    },
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

/** Projects that include a service, with those that mainly demonstrate it first. */
export const projectsForService = (slug: ServiceSlug) =>
  projects.filter((p) => p.services.includes(slug)).sort((a, b) => Number(b.primaryService === slug) - Number(a.primaryService === slug));

/** The lightweight, serialisable shape used by project cards (including the client-side portfolio filter). */
export type ProjectCardData = Pick<Project, "slug" | "kind" | "name" | "title" | "domain" | "industry" | "primaryService" | "summary" | "tone" | "cover"> & {
  services: { slug: ServiceSlug; label: string }[];
};

export const toProjectCard = (p: Project): ProjectCardData => ({
  slug: p.slug,
  kind: p.kind,
  name: p.name,
  title: p.title,
  domain: p.domain,
  industry: p.industry,
  primaryService: p.primaryService,
  summary: p.summary,
  tone: p.tone,
  cover: p.cover,
  services: p.services.map((s) => ({ slug: s, label: serviceLabel(s) })),
});

/** Public path of a captured screen. */
export const screenSrc = (slug: string, view: string) => `/images/work/${slug}/${view}.jpg`;
export const isMobileView = (view: string) => view.startsWith("mobile");
/** Pixel size of captured screens: desktop at 1440×900, phones at 390×844 captured at 2×. */
export const screenSize = (view: string) => (isMobileView(view) ? { width: 780, height: 1688 } : { width: 1440, height: 900 });
