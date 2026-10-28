/**
 * Service content. Each page has its own copy — nothing here is shared boilerplate.
 * Technologies lists are representative tools for the service; review them against the
 * team's actual skills before launch and remove anything you would not take on.
 */

export type ServiceSlug =
  | "website-development"
  | "website-redesign"
  | "bug-fixing"
  | "qa-testing"
  | "ecommerce-development"
  | "seo-performance"
  | "website-maintenance";

export type CardTone = "white" | "lavender" | "mint" | "coral";

export type Service = {
  slug: ServiceSlug;
  title: string;
  /** Short label for menus. */
  navLabel: string;
  menuBlurb: string;
  cardDescription: string;
  tone: CardTone;
  seo: { title: string; description: string };
  hero: { eyebrow: string; title: string; lead: string };
  overview: { heading: string; body: string[] };
  problems: { title: string; body: string }[];
  deliverables: { heading: string; items: string[]; note: string };
  process: { title: string; body: string }[];
  technologies: { group: string; items: string[] }[];
  useCases: { title: string; body: string }[];
  faqs: { q: string; a: string }[];
  related: ServiceSlug[];
};

export const services: Service[] = [
  {
    slug: "website-development",
    title: "Website Development",
    navLabel: "Website Development",
    menuBlurb: "Custom, responsive websites built around your goals.",
    cardDescription: "Custom, responsive websites designed around your business goals, customers, and growth plans.",
    tone: "lavender",
    seo: {
      title: "Website Development Services for Growing Businesses",
      description:
        "Custom website development services: responsive, fast, accessible websites built with modern frameworks, tested by QA engineers and ready to grow with your business.",
    },
    hero: {
      eyebrow: "Website Development",
      title: "Websites engineered around how your business actually grows.",
      lead: "We plan, design and build custom websites that load quickly, work on every screen, and are simple for your team to update. Every build is tested before it reaches your customers.",
    },
    overview: {
      heading: "A website that is built to be used, not just admired",
      body: [
        "A good website does three jobs at once: it explains what you do, it earns the visitor's trust, and it makes the next step obvious. Our website development services start with those jobs and work backwards into structure, design and code.",
        "We build with modern, well-supported frameworks and a content management setup your team can actually use. Pages are responsive from the first commit, accessibility is considered as we build rather than patched afterwards, and our QA engineers test the site before launch, not after your customers find the problems.",
      ],
    },
    problems: [
      { title: "You are launching and need to look established", body: "A new venture needs a site that feels credible from day one, without a template that looks like everyone else's." },
      { title: "Your current platform is holding you back", body: "Page builders and ageing themes become slow, fragile and hard to extend once a business outgrows them." },
      { title: "Content updates need a developer", body: "When every text change becomes a ticket, the site falls out of date. We build editing workflows your team can own." },
      { title: "Integrations live in spreadsheets", body: "Forms, CRMs, booking tools and analytics that do not talk to each other cost time and leads." },
    ],
    deliverables: {
      heading: "What a typical build includes",
      items: [
        "Discovery workshop and sitemap",
        "Wireframes and visual design for key templates",
        "Responsive front-end development",
        "CMS setup with editable content models",
        "Form, CRM and analytics integrations",
        "On-page SEO foundations and structured data",
        "Accessibility review against WCAG 2.2 AA",
        "Cross-browser and device QA before launch",
        "Launch support and a handover session",
      ],
      note: "Scope is agreed in writing before work begins. Smaller projects, such as a single landing page, use a lighter version of the same process.",
    },
    process: [
      { title: "Discovery", body: "We map goals, audiences, content and integrations, and agree what success looks like." },
      { title: "Structure & design", body: "Sitemap, wireframes and visual design for the templates that matter most." },
      { title: "Build in sprints", body: "Working pages on a staging site you can review, with progress you can see each week." },
      { title: "QA & launch", body: "Functional, responsive and accessibility testing, then a planned, monitored launch." },
    ],
    technologies: [
      { group: "Front end", items: ["Next.js", "React", "TypeScript", "Tailwind CSS"] },
      { group: "Content", items: ["Headless CMS (e.g. Sanity, Strapi)", "WordPress"] },
      { group: "Hosting", items: ["Vercel", "Netlify", "Managed cloud hosting"] },
    ],
    useCases: [
      { title: "A launch site for a new venture", body: "A focused, fast marketing site with clear service pages and an enquiry flow, ready in weeks rather than months." },
      { title: "A content-rich company website", body: "Structured content models for services, team, insights and case studies that marketing can manage without help." },
      { title: "A campaign landing page", body: "A single high-performance page wired to analytics and your CRM, built to test messages quickly." },
    ],
    faqs: [
      { q: "How long does a custom website take to build?", a: "It depends on scope. A focused marketing site often takes several weeks; larger sites with integrations take longer. We give you a timeline with milestones after discovery, before you commit." },
      { q: "Will I be able to edit the website myself?", a: "Yes. We set up a content management system around your content and walk your team through it at handover." },
      { q: "Do you build on WordPress or a modern framework?", a: "Both are possible. We recommend the approach that suits your content, budget and team rather than a one-size-fits-all stack." },
      { q: "Is SEO included in website development?", a: "Technical SEO foundations are included: clean URLs, metadata, structured data, sitemaps and fast pages. Ongoing content and search strategy is a separate service." },
      { q: "Who owns the website and code?", a: "You do. Once the project is paid for, the code, design files and content are yours." },
    ],
    related: ["website-redesign", "qa-testing", "seo-performance"],
  },
  {
    slug: "website-redesign",
    title: "Website Redesign",
    navLabel: "Website Redesign",
    menuBlurb: "Modernise an outdated site without losing what works.",
    cardDescription: "Transform outdated websites into modern, intuitive experiences with improved usability, design, and conversions.",
    tone: "coral",
    seo: {
      title: "Website Redesign Services: Modern, SEO-Safe Rebuilds",
      description:
        "Website redesign services that modernise design and usability while protecting your search visibility, with content migration, redirects and full QA before launch.",
    },
    hero: {
      eyebrow: "Website Redesign",
      title: "Keep what works. Rebuild everything that doesn't.",
      lead: "We redesign tired websites into clear, modern experiences, and we migrate them carefully so the rankings, links and content you have built up are not lost in the move.",
    },
    overview: {
      heading: "A redesign should feel new without starting from zero",
      body: [
        "Most websites that need a redesign still have valuable parts: pages that rank, content customers rely on, and links from other sites. Our website redesign services begin with an honest review of what to keep, what to improve and what to retire.",
        "From there we modernise the structure, visual design and user journeys, then plan the migration in detail. That means URL mapping, redirects, metadata transfer and pre-launch testing, so the new site improves on the old one instead of resetting it.",
      ],
    },
    problems: [
      { title: "The site looks dated next to competitors", body: "Visitors judge credibility in seconds. An old design quietly undermines a strong business." },
      { title: "Visitors cannot find what they need", body: "Navigation that grew page by page over the years leaves people lost and leaving." },
      { title: "It is painful on mobile", body: "Layouts that were never designed for small screens frustrate the majority of your visitors." },
      { title: "You are worried about losing rankings", body: "Poorly planned redesigns can drop traffic overnight. A migration plan prevents that." },
    ],
    deliverables: {
      heading: "What a redesign includes",
      items: [
        "Content and analytics review of the current site",
        "UX audit of key journeys and pain points",
        "New information architecture and navigation",
        "Refreshed visual design system",
        "Responsive rebuild of templates",
        "URL mapping and 301 redirect plan",
        "Content and metadata migration",
        "Accessibility improvements",
        "Pre-launch QA and post-launch monitoring",
      ],
      note: "We can also redesign in phases, starting with the highest-impact templates, when a full rebuild is not the right first step.",
    },
    process: [
      { title: "Review", body: "Audit content, analytics, search visibility and user journeys to decide what stays." },
      { title: "Restructure", body: "New sitemap, navigation and wireframes shaped around how people really use the site." },
      { title: "Redesign & rebuild", body: "A refreshed design system applied across responsive, accessible templates." },
      { title: "Migrate & verify", body: "Redirects, metadata and content moved and tested, then monitored after launch." },
    ],
    technologies: [
      { group: "Design", items: ["Figma", "Design systems & component libraries"] },
      { group: "Build", items: ["Next.js", "React", "WordPress", "Headless CMS"] },
      { group: "Migration checks", items: ["Crawlers such as Screaming Frog", "Google Search Console"] },
    ],
    useCases: [
      { title: "Modernising a long-running company site", body: "A clearer structure and modern design that retire years of bolt-on pages without losing valuable content." },
      { title: "Moving off a restrictive platform", body: "Re-platforming from a page builder to a faster, more flexible stack, with every important URL redirected." },
      { title: "A conversion-focused refresh", body: "Redesigning the pages closest to the enquiry or checkout, where small usability improvements matter most." },
    ],
    faqs: [
      { q: "Will a redesign hurt my Google rankings?", a: "A well-planned redesign should not. We map old URLs to new ones, set up redirects, carry over metadata and check everything before and after launch. No one can promise rankings, but we take the known risks seriously." },
      { q: "Can you keep our existing content?", a: "Yes. We review it with you, migrate what is still useful, and recommend rewrites where pages are underperforming." },
      { q: "Do we have to change platforms?", a: "No. Sometimes the best option is a redesign on your current platform. We recommend a platform change only when it clearly helps." },
      { q: "Can we redesign in stages?", a: "Yes. Phased redesigns, starting with the most important templates, are often a good way to spread cost and reduce risk." },
      { q: "How do you decide what to change?", a: "We use your analytics, a UX review of key journeys and conversations with your team, rather than redesigning on taste alone." },
    ],
    related: ["website-development", "seo-performance", "qa-testing"],
  },
  {
    slug: "bug-fixing",
    title: "Bug Fixing & Technical Support",
    navLabel: "Bug Fixing & Support",
    menuBlurb: "Diagnose and resolve broken functionality fast.",
    cardDescription: "Identify and resolve website issues, broken functionality, layout problems, and technical errors.",
    tone: "white",
    seo: {
      title: "Website Bug Fixing Services & Technical Support",
      description:
        "Website bug fixing services for broken forms, JavaScript errors, layout issues, checkout problems and integration failures, diagnosed properly and verified with regression testing.",
    },
    hero: {
      eyebrow: "Bug Fixing & Technical Support",
      title: "Something broke. We find out why, and fix it properly.",
      lead: "From a form that stopped sending to a checkout that fails on one browser, we diagnose the root cause, fix it cleanly and test that nothing else broke along the way.",
    },
    overview: {
      heading: "Fixes that address causes, not just symptoms",
      body: [
        "Website bugs cost more than they appear to. A broken form loses leads silently, and a layout glitch on mobile makes a business look careless. Our website bug fixing services focus on finding the real cause so the same problem does not come back next month.",
        "Every fix follows the same discipline: reproduce the issue, investigate, fix, then re-test the affected journey and the areas around it. You get a plain-English summary of what was wrong and what changed.",
      ],
    },
    problems: [
      { title: "Forms or emails silently stopped working", body: "Enquiries vanish without errors, often after a plugin update or a hosting change." },
      { title: "Layouts break on certain devices", body: "Overlapping text, hidden buttons or horizontal scrolling on specific screens or browsers." },
      { title: "JavaScript errors and broken features", body: "Menus, sliders, filters or calculators that fail intermittently or after an update." },
      { title: "Integrations and payments failing", body: "API errors, payment gateway issues and third-party scripts that break key journeys." },
    ],
    deliverables: {
      heading: "What you get with every fix",
      items: [
        "Issue reproduction and root-cause investigation",
        "A clean, reviewed code fix",
        "Regression testing of affected journeys",
        "Cross-browser and device verification",
        "Plain-English summary of cause and resolution",
        "Recommendations to prevent recurrence",
      ],
      note: "Urgent production issues and planned bug backlogs are both welcome. Tell us how critical the problem is and we will agree priorities before starting.",
    },
    process: [
      { title: "Report", body: "Share what is happening, where, and any screenshots, URLs or error messages." },
      { title: "Reproduce & diagnose", body: "We recreate the issue and trace it to its source before touching code." },
      { title: "Fix & review", body: "A focused fix, reviewed and deployed safely, with your approval for anything risky." },
      { title: "Verify", body: "QA re-tests the issue and the surrounding functionality, then we report back." },
    ],
    technologies: [
      { group: "Platforms", items: ["React & Next.js", "WordPress", "Shopify", "Custom PHP & Node.js sites"] },
      { group: "Diagnostics", items: ["Browser developer tools", "Error monitoring (e.g. Sentry)", "Server and hosting logs"] },
    ],
    useCases: [
      { title: "A contact form that stopped delivering", body: "Tracing email delivery, spam filtering and form handling to restore a reliable enquiry flow." },
      { title: "Mobile layout regressions after an update", body: "Fixing CSS conflicts introduced by a theme or plugin update, then checking every key template." },
      { title: "An intermittent checkout failure", body: "Investigating payment and session errors that only appear for some customers or browsers." },
    ],
    faqs: [
      { q: "How quickly can you fix a website bug?", a: "It depends on the issue and access. Simple problems can be quick; complex, intermittent bugs take investigation. We give you an estimate once we have reproduced the issue." },
      { q: "Do you fix websites you did not build?", a: "Yes. Much of our bug fixing work is on sites built by others. We start with a short review so we understand the codebase before changing it." },
      { q: "What access do you need?", a: "Usually access to the CMS, hosting or code repository, depending on the issue. We use the minimum access required and can work on a staging copy." },
      { q: "How do you make sure a fix doesn't break something else?", a: "Every fix is followed by regression testing of the affected journey and related areas, carried out by QA rather than only by the developer who made the change." },
      { q: "Can you handle an ongoing list of bugs?", a: "Yes. We can work through a prioritised backlog, or move you onto a maintenance plan if issues keep appearing." },
    ],
    related: ["qa-testing", "website-maintenance", "ecommerce-development"],
  },
  {
    slug: "qa-testing",
    title: "QA & Website Testing",
    navLabel: "QA & Website Testing",
    menuBlurb: "Structured testing before every launch and release.",
    cardDescription: "Validate functionality, responsive layouts, cross-browser compatibility, user journeys, APIs, and releases.",
    tone: "mint",
    seo: {
      title: "Website Testing Services: QA, Cross-Browser & Automation",
      description:
        "Website testing services from dedicated QA engineers: functional, regression, cross-browser, responsive, accessibility, API and automated testing for launches and releases.",
    },
    hero: {
      eyebrow: "QA & Website Testing",
      title: "Find the problems before your customers do.",
      lead: "Our QA engineers test websites the way real people use them: on real browsers and devices, through complete journeys, before and after every release.",
    },
    overview: {
      heading: "Quality assurance as a discipline, not an afterthought",
      body: [
        "Testing is often squeezed into the final days before launch, or skipped entirely. Our website testing services make quality a planned part of delivery, with test plans, documented cases and clear reports your team can act on.",
        "We test websites we build, and we test websites built by others, including in-house teams and agencies who need an independent QA partner. Manual testing covers the judgement calls; automated tests guard critical journeys release after release.",
      ],
    },
    problems: [
      { title: "Launches keep surfacing surprise bugs", body: "Issues appear in production because no one tested the full journey on real devices." },
      { title: "Every release breaks something old", body: "Without regression coverage, fixing one thing quietly breaks another." },
      { title: "Your developers test their own work", body: "Builders naturally test the paths they built. Independent QA finds the paths they did not expect." },
      { title: "You need proof of quality", body: "Stakeholders want clear evidence that a release is ready, not just a developer's assurance." },
    ],
    deliverables: {
      heading: "Testing we provide",
      items: [
        "Test strategy and test plan",
        "Functional and exploratory testing",
        "Regression testing for releases",
        "Cross-browser testing (Chrome, Safari, Firefox, Edge)",
        "Responsive testing on real devices and emulators",
        "Accessibility testing against WCAG 2.2",
        "API testing",
        "Automated end-to-end tests for critical journeys",
        "Clear bug reports with steps, evidence and severity",
      ],
      note: "Testing can be a one-off pre-launch engagement, a per-release service, or ongoing QA alongside your development team.",
    },
    process: [
      { title: "Understand", body: "Learn the product, users and riskiest journeys, and agree what 'ready' means." },
      { title: "Plan", body: "Write a test plan and cases covering browsers, devices and priorities." },
      { title: "Test & report", body: "Execute tests and log reproducible bugs with evidence and severity." },
      { title: "Retest & automate", body: "Verify fixes, run regression, and automate the journeys that must never break." },
    ],
    technologies: [
      { group: "Automation", items: ["Playwright", "Cypress"] },
      { group: "API & accessibility", items: ["Postman", "axe accessibility tooling", "Screen readers (VoiceOver, NVDA)"] },
      { group: "Management", items: ["Jira", "Test case management tools", "BrowserStack or real devices"] },
    ],
    useCases: [
      { title: "Pre-launch QA for a new website", body: "A full functional, responsive and accessibility pass with a prioritised bug list before go-live." },
      { title: "Release testing for a product team", body: "Regression and exploratory testing each sprint, so releases ship with confidence." },
      { title: "Automation for critical journeys", body: "Automated tests for sign-up, checkout or enquiry flows that run on every deployment." },
    ],
    faqs: [
      { q: "Can you test a website you didn't build?", a: "Yes. Independent QA is a core part of what we do. We work with in-house teams and other agencies as a testing partner." },
      { q: "What is the difference between manual and automated testing?", a: "Manual testing uses human judgement to explore and assess a site. Automated testing runs scripted checks repeatedly and quickly. Most projects benefit from both, with automation focused on critical journeys." },
      { q: "Which browsers and devices do you test on?", a: "We agree a matrix based on your analytics and audience, typically covering current Chrome, Safari, Firefox and Edge on desktop and mobile." },
      { q: "How do you report bugs?", a: "Each issue includes steps to reproduce, expected and actual results, screenshots or recordings, environment details and a severity rating, in the tracker your team already uses." },
      { q: "Do you test accessibility?", a: "Yes. We combine automated checks with manual keyboard and screen reader testing against WCAG 2.2 AA criteria." },
    ],
    related: ["bug-fixing", "website-maintenance", "website-development"],
  },
  {
    slug: "ecommerce-development",
    title: "E-commerce Development",
    navLabel: "E-commerce Development",
    menuBlurb: "Online stores with dependable checkout flows.",
    cardDescription: "Build and improve online stores with smooth shopping experiences, dependable checkout flows, and scalable functionality.",
    tone: "lavender",
    seo: {
      title: "E-commerce Website Development Services",
      description:
        "E-commerce website development services: online stores, product pages, cart and checkout, payment and shipping integrations, and dedicated e-commerce QA.",
    },
    hero: {
      eyebrow: "E-commerce Development",
      title: "Online stores that make buying feel effortless.",
      lead: "We build and improve e-commerce websites with clear product pages, a dependable cart and checkout, and integrations that keep orders, stock and payments in sync.",
    },
    overview: {
      heading: "Every step between browsing and buying, built with care",
      body: [
        "In e-commerce, small frictions add up: a slow product page, a confusing size selector or a checkout error on one payment method. Our e-commerce development services focus on the journey from discovery to confirmed order.",
        "We work on hosted platforms and headless builds, integrating payments, shipping, inventory and order management. Because checkout is where errors are most expensive, every store build includes dedicated e-commerce QA across devices and payment scenarios.",
      ],
    },
    problems: [
      { title: "Customers abandon at checkout", body: "Unexpected steps, slow pages or payment errors lose sales at the final moment." },
      { title: "Product pages don't sell", body: "Weak imagery, missing information and poor mobile layouts make buying feel risky." },
      { title: "Systems don't talk to each other", body: "Manual stock updates and order re-keying cause errors and overselling." },
      { title: "The store slows down as it grows", body: "Large catalogues and heavy apps make stores sluggish, especially on mobile." },
    ],
    deliverables: {
      heading: "E-commerce capabilities",
      items: [
        "Store setup or custom headless storefront",
        "Category, search and product listing pages",
        "Product detail pages with variants",
        "Cart and checkout development",
        "Payment gateway integration",
        "Shipping and tax configuration",
        "Inventory and order management integrations",
        "Checkout usability improvements",
        "E-commerce QA across devices and payment methods",
      ],
      note: "We recommend the platform after understanding your catalogue, markets and team, not before.",
    },
    process: [
      { title: "Commerce discovery", body: "Catalogue, markets, payments, fulfilment and integrations mapped end to end." },
      { title: "Journey design", body: "Product discovery, product pages, cart and checkout designed for clarity on mobile first." },
      { title: "Build & integrate", body: "Storefront development and connections to payments, shipping and back-office systems." },
      { title: "Commerce QA & launch", body: "Test orders, payment scenarios, edge cases and devices before opening the doors." },
    ],
    technologies: [
      { group: "Platforms", items: ["Shopify", "WooCommerce", "Headless commerce APIs"] },
      { group: "Storefronts", items: ["Next.js", "React"] },
      { group: "Payments", items: ["Stripe", "PayPal", "Regional payment gateways"] },
    ],
    useCases: [
      { title: "A first online store for an established brand", body: "Bringing a physical or wholesale business online with a clean, trustworthy storefront." },
      { title: "Checkout reliability improvements", body: "Diagnosing and fixing checkout errors, then simplifying steps that cause drop-off." },
      { title: "Connecting the store to operations", body: "Integrating inventory and order systems so stock and fulfilment stay accurate." },
    ],
    faqs: [
      { q: "Which e-commerce platform should we use?", a: "It depends on your catalogue size, markets, budget and in-house skills. Hosted platforms suit many businesses; headless builds suit those that need more flexibility. We explain the trade-offs before recommending one." },
      { q: "Can you improve our existing store rather than rebuild it?", a: "Yes. Many projects start with targeted improvements to product pages, checkout or performance." },
      { q: "Do you test the checkout with real payments?", a: "We test with the payment provider's sandbox or test modes across card types and scenarios, and run controlled live checks at launch where appropriate." },
      { q: "Can you sell in multiple currencies and countries?", a: "Most modern platforms support multiple currencies, languages and tax rules. We configure them around the markets you actually serve." },
      { q: "Is e-commerce QA included?", a: "Yes. Checkout, payments, shipping rules and order notifications are tested before launch as part of every store build." },
    ],
    related: ["qa-testing", "seo-performance", "bug-fixing"],
  },
  {
    slug: "seo-performance",
    title: "SEO & Performance Optimization",
    navLabel: "SEO & Performance",
    menuBlurb: "Faster pages, healthier Core Web Vitals, better visibility.",
    cardDescription: "Improve technical SEO, page performance, Core Web Vitals, accessibility, and search visibility.",
    tone: "mint",
    seo: {
      title: "Website Performance Optimization & Technical SEO Services",
      description:
        "Website performance optimization services: Core Web Vitals, page speed, image and JavaScript optimization, technical SEO audits, crawlability and structured data.",
    },
    hero: {
      eyebrow: "SEO & Performance Optimization",
      title: "Make your website faster, cleaner and easier to find.",
      lead: "We measure what is slowing your site down and what is stopping search engines from understanding it, then fix the issues that matter most, in priority order.",
    },
    overview: {
      heading: "Speed and search visibility share the same foundations",
      body: [
        "Slow pages frustrate visitors, and technical problems make it harder for search engines to crawl and understand your content. Our website performance optimization services address both, starting with measurement rather than guesswork.",
        "We audit real-user and lab data, identify the biggest bottlenecks and technical SEO issues, and work through them in order of impact. We do not promise rankings, because no honest agency can, but we remove the technical barriers that hold good content back.",
      ],
    },
    problems: [
      { title: "Pages feel slow, especially on mobile", body: "Heavy images, scripts and fonts delay the moment visitors can actually use the page." },
      { title: "Core Web Vitals are failing", body: "Poor LCP, INP or CLS scores signal a frustrating experience for real users." },
      { title: "Pages are not being indexed", body: "Crawl errors, duplicate content or misconfigured tags keep valuable pages out of search." },
      { title: "Third-party scripts have piled up", body: "Tags, widgets and trackers added over the years quietly slow every page." },
    ],
    deliverables: {
      heading: "What we optimise",
      items: [
        "Technical SEO audit with prioritised findings",
        "Core Web Vitals analysis (LCP, INP, CLS)",
        "Image, font and media optimization",
        "JavaScript and CSS optimization",
        "Third-party script review",
        "Crawlability and indexability fixes",
        "Structured data implementation",
        "Accessibility quick wins",
        "Before-and-after measurement report",
      ],
      note: "Results depend on your platform, hosting and content. We measure before and after so you can see exactly what changed.",
    },
    process: [
      { title: "Measure", body: "Collect lab and field data, crawl the site and review Search Console." },
      { title: "Prioritise", body: "Rank issues by impact and effort so the first fixes deliver the most value." },
      { title: "Optimise", body: "Implement improvements to code, assets, configuration and markup." },
      { title: "Verify & monitor", body: "Re-measure, document results and set up ongoing performance monitoring." },
    ],
    technologies: [
      { group: "Measurement", items: ["Lighthouse", "PageSpeed Insights", "Chrome UX Report", "WebPageTest"] },
      { group: "Search", items: ["Google Search Console", "Crawlers such as Screaming Frog", "Schema.org structured data"] },
    ],
    useCases: [
      { title: "Rescuing a slow marketing site", body: "Reducing page weight and render-blocking resources so key pages load and respond faster." },
      { title: "Fixing indexing problems", body: "Resolving canonical, redirect and sitemap issues that keep important pages out of search results." },
      { title: "Performance for an online store", body: "Optimising product and category templates, where speed and stability matter most to shoppers." },
    ],
    faqs: [
      { q: "Can you guarantee first-page Google rankings?", a: "No, and you should be wary of anyone who does. Rankings depend on many factors outside any agency's control. We fix the technical issues that hold sites back and measure the improvements we make." },
      { q: "What are Core Web Vitals?", a: "They are Google's measures of real-user experience: Largest Contentful Paint (loading), Interaction to Next Paint (responsiveness) and Cumulative Layout Shift (visual stability)." },
      { q: "How do you measure improvement?", a: "We record lab and field metrics before we start and after each round of changes, so improvements are documented rather than claimed." },
      { q: "Does performance work require a redesign?", a: "Usually not. Many improvements are made to the existing site. If the platform itself is the limitation, we will tell you." },
      { q: "Is accessibility part of this service?", a: "We include accessibility quick wins, since they overlap with good technical SEO. A full accessibility audit is available through our QA service." },
    ],
    related: ["website-redesign", "website-maintenance", "ecommerce-development"],
  },
  {
    slug: "website-maintenance",
    title: "Website Maintenance",
    navLabel: "Website Maintenance",
    menuBlurb: "Updates, monitoring and fixes, handled every month.",
    cardDescription: "Keep your website healthy through regular updates, monitoring, fixes, regression testing, and ongoing improvements.",
    tone: "coral",
    seo: {
      title: "Website Maintenance Services & Support Plans",
      description:
        "Website maintenance services: updates, backups, security checks, uptime and performance monitoring, bug fixes, monthly regression testing and ongoing improvements.",
    },
    hero: {
      eyebrow: "Website Maintenance",
      title: "Your website, looked after every single month.",
      lead: "We keep your site updated, backed up, monitored and tested, and we keep improving it, so it stays fast, secure and reliable long after launch day.",
    },
    overview: {
      heading: "Websites are never really finished",
      body: [
        "Software ages. Dependencies need updates, browsers change, content grows and small issues accumulate. Our website maintenance services handle that steady work so your site never drifts into a fragile state.",
        "Each plan combines preventative care (updates, backups, security and performance checks) with a monthly regression test by QA and time for fixes and small improvements. You get a short report each month showing what was done.",
      ],
    },
    problems: [
      { title: "Updates feel risky, so they are skipped", body: "Outdated plugins and dependencies become a security and stability risk." },
      { title: "No one notices when something breaks", body: "Issues go undetected until a customer complains, or doesn't, and simply leaves." },
      { title: "Small changes wait for weeks", body: "Without a support arrangement, minor edits and fixes pile up." },
      { title: "There is no reliable backup", body: "A failed update or hosting problem could mean losing content or downtime." },
    ],
    deliverables: {
      heading: "What maintenance plans cover",
      items: [
        "CMS, plugin and dependency updates",
        "Scheduled, tested backups",
        "Uptime and performance monitoring",
        "Security checks",
        "Monthly regression testing of key journeys",
        "Bug fixes and technical support",
        "Content and small feature updates",
        "Monthly report with recommendations",
      ],
      note: "Plans are sized around your site and how much change it needs. Unused hours and response targets are agreed upfront.",
    },
    process: [
      { title: "Onboard", body: "Review the site, set up access, backups and monitoring, and agree priorities." },
      { title: "Maintain", body: "Apply updates safely on a schedule, with testing before and after." },
      { title: "Test & fix", body: "Monthly regression checks and fixes for anything that needs attention." },
      { title: "Report & improve", body: "A plain-English monthly summary and suggested improvements for the next cycle." },
    ],
    technologies: [
      { group: "Monitoring", items: ["Uptime monitoring", "Error monitoring", "Core Web Vitals tracking"] },
      { group: "Platforms", items: ["Next.js & React", "WordPress", "Shopify", "Headless CMS"] },
    ],
    useCases: [
      { title: "Ongoing care after a new build", body: "Keeping a newly launched site updated, monitored and improving month after month." },
      { title: "Taking over an unmaintained site", body: "Stabilising a site that has gone without updates, then moving it onto a regular plan." },
      { title: "A flexible extension of your team", body: "A monthly block of development and QA time for the changes your team doesn't have capacity for." },
    ],
    faqs: [
      { q: "What is included in a website maintenance plan?", a: "Updates, backups, monitoring, security checks, monthly regression testing, bug fixes and a set amount of time for small changes, with a monthly report." },
      { q: "Can you maintain a website you didn't build?", a: "Yes. We start with an onboarding review to understand the site, fix anything urgent and set up backups and monitoring." },
      { q: "How quickly do you respond to issues?", a: "Response targets are agreed as part of each plan, with faster handling for critical problems such as a site outage." },
      { q: "Do we need a long contract?", a: "Plans are typically monthly or quarterly. We would rather keep you because the work is useful than because a contract says so." },
      { q: "What happens if something breaks after an update?", a: "We test before and after updates and keep backups, so we can roll back quickly and then fix the underlying issue." },
    ],
    related: ["bug-fixing", "qa-testing", "seo-performance"],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
export const serviceLabel = (slug: ServiceSlug) => getService(slug)?.title ?? slug;
