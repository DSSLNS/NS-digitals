import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/section";

export const metadata: Metadata = { title: "Page not found", robots: { index: false, follow: true } };

const popular = [
  { label: "Our services", href: "/services" },
  { label: "Our work", href: "/work" },
  { label: "Insights", href: "/insights" },
  { label: "Contact us", href: "/contact" },
];

export default function NotFound() {
  return (
    <section className="relative -mt-20 overflow-hidden pb-24 pt-36 sm:pb-32 sm:pt-44">
      <div aria-hidden="true" className="grid-lines mask-fade absolute inset-0" />
      <Container className="relative grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-coral-ink">Error 404</p>
          <h1 className="mt-4 text-5xl font-bold leading-[1] sm:text-7xl">This page took a wrong turn.</h1>
          <p className="mt-6 max-w-xl text-lg text-muted">
            The page you&apos;re looking for doesn&apos;t exist or has moved. Even our QA team couldn&apos;t find it. Let&apos;s get you somewhere useful.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/" size="lg">
              Back to homepage
            </ButtonLink>
            <ButtonLink href="/contact" variant="outline" size="lg">
              Tell us what you need
            </ButtonLink>
          </div>
          <nav aria-label="Popular pages" className="mt-10">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
              {popular.map((p) => (
                <li key={p.href}>
                  <Link href={p.href} className="rounded text-plum underline decoration-coral underline-offset-4">
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div aria-hidden="true" className="relative mx-auto aspect-square w-full max-w-sm">
          <span className="absolute inset-[10%] animate-float-slow rounded-full bg-coral" />
          <span className="absolute inset-0 grid place-items-center font-display text-[9rem] font-bold leading-none text-plum sm:text-[11rem]">404</span>
          <span className="absolute right-[4%] top-[6%] size-16 animate-float rounded-2xl bg-lavender-deep" />
        </div>
      </Container>
    </section>
  );
}
