# Live demo websites

One working website per concept case study on the agency site. Each site in `sites/*` is an independent
Next.js app, statically exported to `sites/<id>/out` and deployed as its own Vercel project `ns-<id>-demo`.

| Site | Case study | Vercel project |
| --- | --- | --- |
| `atelier` | E-commerce store | `ns-atelier-demo` |
| `oakhaven` | Furniture & interiors | `ns-oakhaven-demo` |
| `ledgerly` | SaaS product website | `ns-ledgerly-demo` |
| `harbour` | Healthcare redesign (classic site, redesign, comparison) | `ns-harbour-demo` |
| `saffron` | Restaurant site + bug fixing showcase | `ns-saffron-demo` |
| `brightpath` | Course platform + QA dashboard | `ns-brightpath-demo` |
| `wayfarer` | Travel site demonstrating SEO & performance | `ns-wayfarer-demo` |
| `northfield` | Advisory firm + website care area | `ns-northfield-demo` |

`shared/` holds the `DemoBanner` shown at the top of every site (fictional brand, nothing is sent or charged,
link back to the case study). Sites share installed dependencies but nothing else: each has its own brand,
fonts and components.

## Working on a site

```sh
cd demos
npm install                          # once, for every site
npm run dev -w sites/atelier         # local development
npm run build -w sites/atelier       # static export to sites/atelier/out
node scripts/verify-site.mjs atelier # serve out/ like Vercel and crawl every page at desktop and mobile
```

`verify-site.mjs` also accepts a deployed URL: `node scripts/verify-site.mjs https://ns-atelier-demo.vercel.app`.

## Deploying

```sh
sh scripts/deploy-site.sh atelier    # production deploy of sites/atelier/out to ns-atelier-demo
```

New site: `sh scripts/new-site.sh <id> <case-study-slug> "<Brand>" <photo-prefix>`, then `npx vercel project add ns-<id>-demo`.

After a demo URL is verified, set `liveDemo: { status: "live", url }` on the project in `src/content/projects.ts`.
The agency's portfolio cards and case studies all read that one field.
