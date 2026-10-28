"use client";

import { useRef } from "react";
import { useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import * as m from "motion/react-m";
import { Check, Gauge, Sparkles } from "lucide-react";

/** Wraps a layer with a staggered entrance plus scroll-linked parallax. The inner element carries the CSS float loop. */
function Layer({
  children,
  className,
  delay,
  y,
}: {
  children: React.ReactNode;
  className: string;
  delay: number;
  y: MotionValue<number>;
}) {
  return (
    <m.div
      data-reveal=""
      className={className}
      style={{ y }}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.9 }}
    >
      {children}
    </m.div>
  );
}

/**
 * Decorative hero composition: browser window, preview cards, orb, shapes and labels.
 * Status labels are illustrative brand statements, not live data.
 */
export function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const speed = (px: number) => (reduce ? 0 : px);
  const slow = useTransform(scrollYProgress, [0, 1], [0, speed(-40)]);
  const mid = useTransform(scrollYProgress, [0, 1], [0, speed(-90)]);
  const fast = useTransform(scrollYProgress, [0, 1], [0, speed(-150)]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, speed(25)]);

  return (
    <div ref={ref} aria-hidden="true" className="relative mx-auto aspect-[1/1] w-full max-w-[36rem] select-none">
      <div className="grid-lines mask-fade absolute inset-[-10%] animate-[pulse_8s_ease-in-out_infinite] opacity-80" />

      {/* Coral orb */}
      <Layer className="absolute right-[4%] top-[6%] size-[46%]" delay={0.1} y={slow}>
        <div className="size-full rounded-full bg-[radial-gradient(circle_at_30%_30%,#ffb3a5_0%,var(--color-coral)_45%,var(--color-coral-strong)_100%)] shadow-[0_40px_80px_-30px_rgb(225_77_51/0.7)]" />
      </Layer>

      {/* Geometric shapes */}
      <m.div data-reveal="" style={{ rotate, y: mid }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="absolute bottom-[8%] left-[2%] size-[18%]">
        <div className="size-full rotate-12 rounded-[28%] bg-lavender-deep" />
      </m.div>
      <Layer className="absolute left-[10%] top-[4%] size-[12%]" delay={0.6} y={fast}>
        <div className="size-full animate-float-slow rounded-full border-[6px] border-sun" />
      </Layer>
      <Layer className="absolute bottom-[22%] right-[2%] size-[5%]" delay={0.7} y={fast}>
        <div className="size-full rounded-full bg-plum" />
      </Layer>

      {/* Main browser window */}
      <Layer className="absolute left-[8%] top-[20%] w-[78%]" delay={0.25} y={mid}>
        <div className="animate-float overflow-hidden rounded-[1.4rem] border border-plum/10 bg-white shadow-lift">
          <div className="flex items-center gap-1.5 border-b border-plum/10 px-4 py-3">
            <span className="size-2.5 rounded-full bg-coral" />
            <span className="size-2.5 rounded-full bg-sun" />
            <span className="size-2.5 rounded-full bg-mint-deep" />
            <span className="ml-3 h-4 flex-1 rounded-full bg-ivory-deep" />
          </div>
          <div className="grid grid-cols-[1.3fr_1fr] gap-4 p-5">
            <div className="space-y-2.5">
              <span className="block h-2 w-14 rounded-full bg-coral" />
              <span className="block h-4 w-full rounded-full bg-plum" />
              <span className="block h-4 w-4/5 rounded-full bg-plum" />
              <span className="block h-2 w-full rounded-full bg-plum/15" />
              <span className="block h-2 w-3/4 rounded-full bg-plum/15" />
              <span className="mt-4 block h-7 w-24 rounded-full bg-coral" />
            </div>
            <div className="relative rounded-2xl bg-lavender">
              <span className="absolute inset-x-4 bottom-4 h-1/2 rounded-xl bg-white/70" />
              <span className="absolute right-3 top-3 size-6 rounded-full bg-mint-deep" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 px-5 pb-5">
            <span className="h-14 rounded-xl bg-mint" />
            <span className="h-14 rounded-xl bg-coral-soft" />
            <span className="h-14 rounded-xl bg-ivory-deep" />
          </div>
        </div>
      </Layer>

      {/* Preview card: performance */}
      <Layer className="absolute left-0 top-[58%] w-[44%]" delay={0.55} y={fast}>
        <div className="animate-float-slow rounded-2xl border border-plum/10 bg-white p-4 shadow-lift [animation-delay:-3s]">
          <div className="flex items-center gap-2 text-xs font-semibold text-plum">
            <span className="grid size-7 place-items-center rounded-full bg-mint">
              <Gauge className="size-4" />
            </span>
            Performance optimized
          </div>
          <div className="mt-3 flex h-10 items-end gap-1.5">
            {[40, 55, 48, 70, 62, 85, 92].map((h, i) => (
              <span key={i} className="flex-1 rounded-t-md bg-mint-deep/70" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
      </Layer>

      {/* Preview card: QA */}
      <Layer className="absolute bottom-[2%] right-[6%] w-[46%]" delay={0.7} y={mid}>
        <div className="animate-float rounded-2xl bg-plum p-4 text-ivory shadow-lift [animation-delay:-1.5s]">
          <p className="text-xs font-semibold text-sun">Quality verified</p>
          <ul className="mt-2.5 space-y-1.5 text-[0.72rem]">
            {["Responsive layouts", "User journeys", "Accessibility"].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <span className="grid size-4 place-items-center rounded-full bg-mint text-plum">
                  <Check className="size-3" strokeWidth={3} />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </Layer>

      {/* Label chip */}
      <Layer className="absolute right-[0%] top-[16%]" delay={0.85} y={slow}>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-plum/10 bg-white px-3.5 py-2 text-xs font-semibold text-plum shadow-soft">
          <Sparkles className="size-3.5 text-coral-ink" />
          Built with precision
        </span>
      </Layer>
    </div>
  );
}
