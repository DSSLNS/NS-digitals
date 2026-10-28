import { CheckCircle2 } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container, Eyebrow } from "@/components/ui/section";
import { HeroVisual, type HeroScreens } from "./hero-visual";

const trust = ["Development + QA expertise", "Performance-focused delivery", "Support for global businesses"];

export function Hero({ screens }: { screens?: HeroScreens }) {
  return (
    <section aria-labelledby="hero-title" className="relative -mt-20 overflow-hidden pb-20 pt-32 sm:pb-28 lg:pt-36">
      <div aria-hidden="true" className="absolute -left-40 top-20 size-[30rem] rounded-full bg-lavender/50 blur-3xl" />
      <Container className="relative grid items-center gap-14 lg:grid-cols-[1.08fr_1fr] lg:gap-10">
        <div>
          <div className="animate-rise">
            <Eyebrow>Independent digital agency · Built for growth</Eyebrow>
          </div>
          <h1
            id="hero-title"
            className="mt-6 animate-slide-up text-[2.75rem] font-bold leading-[0.98] tracking-[-0.035em] sm:text-6xl lg:text-[4.6rem] xl:text-[5.4rem]"
          >
            Your next big idea deserves a{" "}
            <span className="relative isolate inline-block whitespace-nowrap text-coral-strong">
              <span aria-hidden="true" className="absolute -inset-x-2 inset-y-[12%] -z-10 -rotate-1 rounded-2xl bg-lavender" />
              better website.
              <svg aria-hidden="true" viewBox="0 0 300 16" preserveAspectRatio="none" className="absolute -bottom-2 left-0 h-3 w-full sm:h-4">
                <path
                  d="M4 11C60 4 140 3 296 9"
                  fill="none"
                  stroke="var(--color-coral)"
                  strokeWidth="5"
                  strokeLinecap="round"
                  pathLength={1}
                  strokeDasharray="1"
                  className="animate-draw"
                />
              </svg>
            </span>
          </h1>
          <p className="mt-8 max-w-xl animate-rise text-lg leading-relaxed text-muted [animation-delay:150ms] sm:text-xl">
            From building powerful websites to fixing complex issues and improving performance, we help businesses create faster, smarter, more reliable digital experiences.
          </p>
          <div className="mt-10 flex animate-rise flex-col gap-3 [animation-delay:250ms] sm:flex-row">
            <ButtonLink href="/request-a-quote" size="lg">
              Let&apos;s Build Something Great
            </ButtonLink>
            <ButtonLink href="/services" variant="outline" size="lg">
              Explore Our Services
            </ButtonLink>
          </div>
          <ul className="mt-10 flex animate-rise flex-col gap-3 text-sm font-medium text-plum [animation-delay:350ms] sm:flex-row sm:flex-wrap sm:gap-x-6">
            {trust.map((t) => (
              <li key={t} className="flex items-center gap-2">
                <CheckCircle2 aria-hidden="true" className="size-4.5 text-coral-ink" />
                {t}
              </li>
            ))}
          </ul>
        </div>
        {screens && <HeroVisual screens={screens} />}
      </Container>
    </section>
  );
}
