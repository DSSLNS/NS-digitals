"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useInView, useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import { Check, Code2, Layers, PenTool, Plug, RotateCcw, ShieldCheck } from "lucide-react";
import { Container, Eyebrow } from "@/components/ui/section";
import { cn } from "@/lib/utils";

const buildSteps = [
  { label: "Design", Icon: PenTool },
  { label: "Development", Icon: Code2 },
  { label: "Integration", Icon: Plug },
];
const checks = ["Responsive layouts", "Functional flows", "Accessibility", "Regression coverage"];
const buildLog = ["Design system and layouts agreed", "Responsive components built", "CMS, forms and APIs connected"];

const noop = () => () => {};

/** Sequence: 1–3 build steps, 4 hand-over line, 5–8 checks, 9 performance review, 10 validated. */
const FINAL = 10;

export function DevQaStory() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const reduce = useReducedMotion();
  const [played, setPlayed] = useState(0);
  const [run, setRun] = useState(0);
  // Reduced motion: show the finished state, but only after hydration so server and client HTML match.
  const hydrated = useSyncExternalStore(noop, () => true, () => false);
  const stage = reduce && hydrated ? FINAL : played;

  useEffect(() => {
    if (!inView || reduce) return;
    let s = 0;
    const id = setInterval(() => {
      s += 1;
      setPlayed(s);
      if (s >= FINAL) clearInterval(id);
    }, 420);
    return () => clearInterval(id);
  }, [inView, reduce, run]);

  const replay = () => {
    setPlayed(0);
    setRun((r) => r + 1);
  };

  const built = Math.min(stage, 3);
  const linked = stage >= 4;

  return (
    <section aria-labelledby="story-title" className="relative overflow-hidden bg-lavender/60 py-20 sm:py-28">
      <div aria-hidden="true" className="grid-lines mask-fade absolute inset-0" />
      <Container className="relative">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div>
            <Eyebrow>Development + QA</Eyebrow>
            <h2 id="story-title" className="mt-4 text-4xl font-bold leading-[1.02] sm:text-5xl lg:text-6xl">
              Built with creativity. <span className="text-coral-strong">Validated with precision.</span>
            </h2>
          </div>
          <p className="text-lg leading-relaxed text-charcoal/80">
            We don&apos;t stop at making a website look good. We test how it behaves, how it performs, and how it works for real users.
          </p>
        </div>

        <div ref={ref} className="mt-14 grid items-stretch gap-4 lg:grid-cols-[1fr_7rem_1fr] lg:gap-0">
          {/* Build panel */}
          <div className="rounded-[1.75rem] border border-plum/10 bg-white p-6 shadow-soft sm:p-8">
            <div className="flex items-center justify-between">
              <p className="inline-flex items-center gap-2 font-display font-semibold text-plum">
                <Layers aria-hidden="true" className="size-5 text-coral-ink" /> Build
              </p>
              <span className="text-xs font-medium text-muted">{built >= 3 ? "Ready for testing" : stage > 0 ? "In progress" : "Queued"}</span>
            </div>
            <div aria-hidden="true" className="mt-6 overflow-hidden rounded-2xl border border-plum/10">
              <div className="flex gap-1.5 border-b border-plum/10 px-3 py-2">
                <span className="size-2 rounded-full bg-coral" />
                <span className="size-2 rounded-full bg-sun" />
                <span className="size-2 rounded-full bg-mint-deep" />
              </div>
              <div className="grid grid-cols-[1.4fr_1fr] gap-3 p-4">
                <div className="space-y-2">
                  <m.span className="block h-3 rounded-full bg-plum" animate={{ width: built >= 1 ? "90%" : "30%" }} />
                  <m.span className="block h-3 rounded-full bg-plum" animate={{ width: built >= 1 ? "70%" : "20%" }} />
                  <m.span className="block h-2 rounded-full bg-plum/15" animate={{ width: built >= 2 ? "100%" : "40%" }} />
                  <m.span className="block h-6 rounded-full bg-coral" animate={{ width: built >= 2 ? "45%" : "0%" }} />
                </div>
                <m.div className="rounded-xl bg-lavender" animate={{ opacity: built >= 1 ? 1 : 0.3 }} />
              </div>
              <div className="grid grid-cols-3 gap-2 px-4 pb-4">
                {[0, 1, 2].map((i) => (
                  <m.span key={i} className="h-10 rounded-lg bg-mint" animate={{ opacity: built >= 3 ? 1 : 0.25, y: built >= 3 ? 0 : 6 }} transition={{ delay: i * 0.08 }} />
                ))}
              </div>
            </div>
            <ul className="mt-6 flex flex-wrap gap-2">
              {buildSteps.map(({ label, Icon }, i) => (
                <li
                  key={label}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors duration-500",
                    built > i ? "bg-plum text-ivory" : "bg-ivory-deep text-plum/70",
                  )}
                >
                  <Icon aria-hidden="true" className="size-3.5" />
                  {label}
                </li>
              ))}
            </ul>
            {/* Development indicator: illustrative progress, no numbers. */}
            <div aria-hidden="true" className="mt-5 h-1.5 overflow-hidden rounded-full bg-plum/10">
              <m.span className="block h-full rounded-full bg-coral" initial={{ width: "0%" }} animate={{ width: `${(built / 3) * 100}%` }} />
            </div>
            <ul className="mt-6 space-y-2.5 border-t border-plum/10 pt-5 font-mono text-[0.8rem] text-plum/80">
              {buildLog.map((line, i) => (
                <li key={line} className={cn("flex items-center gap-2 transition-opacity duration-500", built > i ? "opacity-100" : "opacity-30")}>
                  <span aria-hidden="true" className={cn("size-1.5 rounded-full", built > i ? "bg-mint-deep" : "bg-plum/30")} />
                  {line}
                </li>
              ))}
            </ul>
          </div>

          {/* Connector */}
          <div aria-hidden="true" className="relative flex items-center justify-center py-2 lg:py-0">
            <svg viewBox="0 0 112 40" className="hidden h-10 w-full lg:block">
              <path d="M4 20h104" stroke="var(--color-plum)" strokeOpacity=".15" strokeWidth="2" strokeDasharray="4 6" />
              <m.path d="M4 20h104" stroke="var(--color-coral)" strokeWidth="3" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: linked ? 1 : 0 }} transition={{ duration: 0.8 }} />
            </svg>
            <svg viewBox="0 0 40 64" className="h-16 w-10 lg:hidden">
              <path d="M20 4v56" stroke="var(--color-plum)" strokeOpacity=".15" strokeWidth="2" strokeDasharray="4 6" />
              <m.path d="M20 4v56" stroke="var(--color-coral)" strokeWidth="3" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: linked ? 1 : 0 }} transition={{ duration: 0.8 }} />
            </svg>
            <m.span
              className="absolute grid size-12 place-items-center rounded-full bg-coral text-plum-deep shadow-lift"
              animate={{ scale: linked ? 1 : 0.6, opacity: linked ? 1 : 0.4 }}
            >
              <ShieldCheck className="size-5" />
            </m.span>
          </div>

          {/* Validate panel */}
          <div className="rounded-[1.75rem] bg-plum p-6 text-ivory shadow-lift sm:p-8">
            <div className="flex items-center justify-between">
              <p className="inline-flex items-center gap-2 font-display font-semibold">
                <ShieldCheck aria-hidden="true" className="size-5 text-sun" /> Validate
              </p>
              <span className="text-xs font-medium text-ivory/70">{stage >= FINAL ? "Validated" : linked ? "Testing" : "Waiting for build"}</span>
            </div>
            <ul className="mt-6 space-y-3">
              {checks.map((c, i) => {
                const done = stage >= 5 + i;
                return (
                  <li key={c} className={cn("flex items-center gap-3 rounded-2xl px-4 py-3 transition-colors duration-500", done ? "bg-ivory/12" : "bg-ivory/5")}>
                    <span className={cn("grid size-6 place-items-center rounded-full transition-colors duration-500", done ? "bg-mint text-plum" : "border border-ivory/30")}>
                      <m.span initial={false} animate={{ scale: done ? 1 : 0 }}>
                        <Check aria-hidden="true" className="size-3.5" strokeWidth={3} />
                      </m.span>
                    </span>
                    <span className={cn("font-medium transition-opacity", done ? "opacity-100" : "opacity-60")}>{c}</span>
                  </li>
                );
              })}
            </ul>
            <div className="mt-5 rounded-2xl bg-ivory/5 px-4 py-4">
              <p className="text-sm font-medium text-ivory/80">Performance review</p>
              <div aria-hidden="true" className="mt-3 flex h-14 items-end gap-1">
                {[30, 45, 38, 60, 52, 72, 66, 80, 76, 88].map((h, i) => (
                  <m.span
                    key={i}
                    className="flex-1 rounded-t bg-sun/80"
                    initial={{ height: "12%" }}
                    animate={{ height: stage >= 9 ? `${h}%` : "12%" }}
                    transition={{ delay: i * 0.03 }}
                  />
                ))}
              </div>
            </div>
            <m.p
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-mint px-4 py-2 text-sm font-semibold text-plum"
              initial={false}
              animate={{ opacity: stage >= FINAL ? 1 : 0, y: stage >= FINAL ? 0 : 8 }}
            >
              <Check aria-hidden="true" className="size-4" strokeWidth={3} /> Ready to launch
            </m.p>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-start justify-between gap-3 text-sm text-muted sm:flex-row sm:items-center">
          <p>Illustrative sequence showing how we work. Status indicators are not live test data.</p>
          <button
            type="button"
            onClick={replay}
            disabled={stage < FINAL}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-semibold text-plum transition-opacity hover:bg-white/70 disabled:opacity-40 motion-reduce:hidden"
          >
            <RotateCcw aria-hidden="true" className="size-4" /> Replay sequence
          </button>
        </div>
      </Container>
    </section>
  );
}
