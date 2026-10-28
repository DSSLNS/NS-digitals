# NS Digital Solutions — website

Marketing and lead-generation site for NS Digital Solutions, an independent web development and QA agency.
*Build Better. Perform Better.*

**Stack:** Next.js 16 (App Router, static generation) · React 19 · TypeScript (strict) · Tailwind CSS 4 · Motion for React · Lucide · zod · Playwright + axe.

## Quick start

```bash
nvm use 24            # Node ≥ 20.9 required (Node 16 will not work)
npm install
cp .env.example .env.local
npm run dev           # http://localhost:3000
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` / `npm start` | Production build / serve |
| `npm run lint` · `npm run typecheck` | ESLint · TypeScript |
| `npm run test:e2e` | Builds, starts and runs the Playwright suite |

## Project structure

```
src/
  app/                  Routes (all statically generated except /og), server action, sitemap, robots, OG image
  components/
    home/               Homepage sections (hero, Dev+QA story, process, testimonials…)
    sections/           Shared page sections (page hero, CTA band, FAQ, legal…)
    forms/              Contact form, 3-step quote form, field primitives, shared hook
    layout/             Header (dropdown + mobile menu), footer, logo/monogram
    motion/             MotionProvider (LazyMotion + reduced-motion) and scroll reveals
    visuals/            Custom SVG/CSS illustrations — no stock imagery
    ui/                 Button, section primitives
  config/site.ts        Brand, navigation and env-driven business details
  content/              Typed content: services, industries, projects, posts, testimonials
  lib/                  Content access layer, SEO helpers, form validation & delivery
e2e/                    Playwright tests
docs/                   CMS guide and QA checklist
```

## Design system

Tokens live in `src/app/globals.css` (`@theme`): ivory `#FFF9F1`, plum `#492653`, coral `#FF715B`, lavender `#E7DDF8`, mint `#C9F2DF`, yellow `#FFD76A`, charcoal `#29252D`.
Headings use Space Grotesk, body text Inter (self-hosted via `next/font`).

Contrast rules baked into the tokens: coral buttons use **plum text** (white on coral fails WCAG AA);
small coral text uses `coral-ink` `#A8341F` (≥ 5:1 on every light surface); `coral-strong` is for large display text only.

## Before launch — things only you can provide

- [ ] **Contact details** — set `NEXT_PUBLIC_CONTACT_EMAIL` etc. Nothing is invented; unset details are simply not shown.
- [ ] **Lead delivery** — configure Resend and/or a webhook (see below). Without one, production forms show an error rather than a fake success.
- [ ] **Testimonials** — add verified quotes to `src/content/testimonials.ts`. The section is hidden in production until then.
- [ ] **Portfolio** — the three projects in `src/content/projects.ts` are clearly labelled *demonstration projects*. Replace or supplement them with real, client-approved work (`kind: "client"`).
- [ ] **Technologies** — review each service's tools list in `src/content/services.ts` against the team's real skills.
- [ ] **Legal pages** — have the Privacy Policy and Terms reviewed for your jurisdictions; update `legalUpdated` in `src/config/site.ts`.
- [ ] **Booking** — optionally set `NEXT_PUBLIC_BOOKING_URL`.

## Forms & lead delivery

Contact (`/contact`) and the 3-step quote form (`/request-a-quote`) share one zod schema, used in the browser for
instant field-level feedback and again in the server action (`src/app/actions.ts`), which never trusts the client.
The contact form also works without JavaScript.

- **Spam protection:** hidden honeypot, minimum fill time, per-IP rate limit (swap for Upstash/WAF for strict limits).
- **Delivery:** `src/lib/forms/deliver.ts` — Resend email and/or JSON webhook. Succeeds if at least one channel delivers.
- **Honesty:** success is shown only after delivery succeeds. With no channel configured in production, the visitor sees an error.
- **Consent:** a required privacy-consent checkbox, validated server-side.
- **Pre-selection:** `/request-a-quote?service=qa-testing`, `/contact?type=consultation`.

## SEO

Per-page title/description/canonical/hreflang/Open Graph/Twitter via `buildMetadata()`; JSON-LD for Organization, WebSite,
BreadcrumbList, Service, FAQPage and Article; `sitemap.xml`, `robots.txt` (previews are `Disallow: /`), dynamic OG images
at `/og?title=…`, permanent redirects for common legacy URLs in `next.config.ts`, custom 404.
International: one global English site with `x-default` hreflang; add regional variants in `src/lib/seo.ts` only when
genuinely localised pages exist.

## Deploying to Vercel

1. Push the repo to GitHub/GitLab and import it in Vercel (framework preset: Next.js; Node 20+).
2. Add the environment variables from `.env.example` (at minimum `NEXT_PUBLIC_SITE_URL` and one lead-delivery channel)
   for the Production environment. Mark `RESEND_API_KEY` and `LEADS_WEBHOOK_SECRET` as sensitive.
3. Add your domain; set `NEXT_PUBLIC_SITE_URL` to it and redeploy.
4. Submit a test enquiry on production and confirm it arrives.
5. Verify the domain in Google Search Console (`NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`) and submit `/sitemap.xml`.

Any Node host works too: `npm run build && npm start`.

## Content & CMS

Content is typed TypeScript in `src/content/`, read only through `src/lib/content.ts`. See [docs/CMS.md](docs/CMS.md)
for connecting Sanity or Strapi without touching page components.

## Testing

See [docs/QA-CHECKLIST.md](docs/QA-CHECKLIST.md) for the manual checklist and the latest automated results.
