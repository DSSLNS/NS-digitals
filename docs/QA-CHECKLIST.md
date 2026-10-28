# QA checklist

## Automated (Playwright + axe) — `npm run test:e2e`

Last run: 28 Oct 2026, against a production build.

| Project | Result |
| --- | --- |
| Chromium desktop | all passing |
| Mobile (Pixel 7, Chromium) | all passing |
| WebKit (Safari engine), `@cross-browser` tests | all passing |
| **Firefox**, `@cross-browser` tests | **not run** — Firefox could not launch in the build sandbox. Run `npx playwright test --project=firefox` locally or in CI. |

Combined: **90 passed, 0 failed** (24 skipped by design: viewport-specific or run-once tests).

Coverage: homepage CTAs and single H1 · all 7 service cards → correct pages · desktop nav + `aria-current` ·
services dropdown (keyboard, Escape, focus return) · skip link · mobile menu (open, Escape, navigate) ·
404 page and 404 for unknown slugs · 308 legacy redirects · crawl of every sitemap page and every internal link (no dead
links, no `href="#"`) · contact form validation, blur validation, real submission · consultation mode · 3-step quote
(per-step validation, back keeps values, `?service=` pre-select, submission) · server-side validation with JS disabled ·
metadata (title, description, canonical, OG, Twitter, JSON-LD) on 13 pages · unique service titles/descriptions ·
sitemap/robots/OG image · axe WCAG 2.2 AA scan on 13 pages × 2 viewports · reduced-motion behaviour · no-JS content visibility.

## Manual checks before each launch

**Functional**
- [ ] Submit contact and quote forms on production; confirm email/webhook arrives with all fields
- [ ] Booking button opens the configured scheduler (or the consultation form)
- [ ] All footer links, including social profiles once configured

**Responsive** — 360px, 390px, 768px, 1024px, 1440px, 1920px
- [ ] No horizontal scroll; hero visual and bento grid hold together; mobile menu scrolls on short screens

**Browsers** — latest Chrome, Safari (macOS + iOS), Firefox, Edge
- [ ] Animations smooth; dropdown and mobile menu; form validation messages

**Accessibility**
- [ ] Keyboard-only pass through home, a service page and both forms (visible focus everywhere)
- [ ] VoiceOver / NVDA: headings, form errors announced, carousel controls, menu dialog
- [ ] OS "reduce motion" on: no floating/parallax, Dev+QA story shows final state

**SEO**
- [ ] `NEXT_PUBLIC_SITE_URL` correct → canonicals and sitemap use the real domain
- [ ] Production `robots.txt` allows crawling; preview deployments disallow
- [ ] Rich Results Test on a service page and an article; share-preview check of OG images

**Performance**
- [ ] Lighthouse (mobile) on home, a service page and contact, on the production URL
- [ ] Core Web Vitals in Search Console after launch

Measured locally (production build, mobile emulation, localhost — indicative only, not a Lighthouse score):
homepage CLS 0, LCP element is the hero H1, ~249 KB gzipped JS (mostly React/Next runtime; zod is not loaded on the homepage).
