import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { BrowserFrame, PhoneFrame } from "@/components/portfolio/screen-frame";

export type HeroScreens = {
  desktop: { slug: string; view: string; domain: string };
  phone: { slug: string; view: string };
};

const checks = ["Responsive layouts", "Checkout journey", "Accessibility review"];

/** Hero composition built from real concept-project screens rather than abstract shapes. */
export function HeroVisual({ screens }: { screens: HeroScreens }) {
  return (
    <div className="mx-auto w-full max-w-[38rem]">
      <div aria-hidden="true" className="relative pb-14 pl-8 sm:pl-14">
        <div className="absolute inset-y-8 left-16 right-0 rounded-[2rem] bg-lavender sm:left-24" />
        <div className="relative animate-rise">
          <BrowserFrame {...screens.desktop} priority sizes="(min-width: 1024px) 34rem, 88vw" className="shadow-lift" />
        </div>
        <div className="absolute bottom-0 left-0 w-[22%] animate-rise [animation-delay:200ms]">
          <PhoneFrame {...screens.phone} sizes="160px" />
        </div>
        <div className="absolute -bottom-2 right-3 hidden w-52 animate-rise rounded-2xl bg-white p-4 shadow-lift ring-1 ring-plum/10 [animation-delay:350ms] sm:block">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-coral-ink">QA checklist</p>
          <ul className="mt-2.5 space-y-2 text-sm text-plum">
            {checks.map((c) => (
              <li key={c} className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-[#1f7a52]" strokeWidth={2} />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="mt-6 text-center text-sm text-muted sm:text-right">
        Screens from our concept case studies.{" "}
        <Link href="/work" className="font-semibold text-plum underline decoration-plum/30 underline-offset-4 hover:decoration-plum">
          Explore the work
        </Link>
      </p>
    </div>
  );
}
