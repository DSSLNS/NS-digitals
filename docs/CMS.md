# Content & CMS

All content is read through `src/lib/content.ts` (`getServices`, `getIndustries`, `getProjects`, `getPosts`, `getPostBySlug`).
Pages never import `src/content/*` for rendering lists, so moving to a headless CMS means re-implementing those
functions only.

## Editing content today

| What | File |
| --- | --- |
| Services (all 7 pages: hero, problems, deliverables, process, tools, use cases, FAQs, SEO) | `src/content/services.ts` |
| Industries | `src/content/industries.ts` |
| Portfolio case studies (card copy, all case-study sections, feature block) | `src/content/projects.ts` |
| Insights articles (structured blocks) | `src/content/posts.ts` |
| Testimonials (verified only) | `src/content/testimonials.ts` |

## Moving to Sanity (recommended) or Strapi

1. Create models mirroring the TypeScript types (`Service`, `Industry`, `Project`, `Post`, `Testimonial`).
   Article bodies map naturally onto Portable Text; render it in `components/sections/article-body.tsx`.
2. Re-implement the functions in `src/lib/content.ts` to fetch from the CMS, using `fetch(..., { next: { tags: ["content"] } })`
   or the CMS SDK, and map results onto the same types.
3. Add an on-demand revalidation route (`revalidateTag("content")`) called by a CMS webhook, protected by a secret.
4. Keep `generateStaticParams` in the dynamic routes; they should call the same content functions.
5. Keep SEO fields (`seo.title`, `seo.description`) required in the CMS schema.

No page or component should need changes.

## Portfolio screens

Project previews are screenshots of coded website mockups, so they stay crisp and consistent:

1. Mockups live in `src/components/mockups/<project>.tsx` and are registered in `src/components/mockups/registry.tsx`
   (desktop screens are 1440×900, phone screens 390×844; views starting with `mobile` are phone screens).
2. Run `npm run mockups:capture` (or `npm run mockups:capture -- atelier,home` for a subset). It starts `next dev`
   with `MOCKUPS=1`, which enables the internal `/mockups` route, and writes `public/images/work/<slug>/<view>.jpg`.
3. The `/mockups` route returns 404 in every normal build and is never linked or indexed.

Photography in `public/images/photos` is from Unsplash under the Unsplash License (see `CREDITS.md` there).
When replacing a concept project with real client work, use real screenshots in the same folders and set `kind: "client"`.
