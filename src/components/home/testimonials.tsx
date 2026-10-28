"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import type { Testimonial } from "@/content/testimonials";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { cn } from "@/lib/utils";

/**
 * Accessible testimonial carousel (WAI-ARIA carousel pattern): no autoplay, explicit
 * previous/next controls, slide position announced, arrow keys supported.
 */
export function Testimonials({ items, samples }: { items: Testimonial[]; samples: boolean }) {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const count = items.length;
  const go = (delta: number) => {
    setDir(delta);
    setIndex((i) => (i + delta + count) % count);
  };
  const t = items[index];
  if (!t) return null;

  return (
    <Section labelledBy="testimonials-title" className="bg-mint/50">
      <Container>
        <SectionHeading id="testimonials-title" eyebrow="Testimonials" title="Good partnerships speak for themselves." />
        {samples && (
          <p role="note" className="mt-6 inline-flex rounded-xl border border-dashed border-plum/40 bg-white px-4 py-2 text-sm font-medium text-plum">
            Sample placeholders, shown in development only. Add verified testimonials in src/content/testimonials.ts.
          </p>
        )}
        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Client testimonials"
          className="mt-12"
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") go(1);
            if (e.key === "ArrowLeft") go(-1);
          }}
        >
          <div className="relative min-h-[20rem] overflow-hidden rounded-[2rem] bg-white p-8 shadow-soft sm:min-h-[17rem] sm:p-12">
            <Quote aria-hidden="true" className="absolute right-8 top-8 size-16 text-lavender-deep" />
            <AnimatePresence mode="wait" initial={false} custom={dir}>
              <m.figure
                key={index}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${count}`}
                custom={dir}
                variants={{
                  enter: (d: number) => ({ opacity: 0, x: d * 40 }),
                  center: { opacity: 1, x: 0 },
                  exit: (d: number) => ({ opacity: 0, x: d * -40 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45 }}
                className="relative max-w-3xl"
              >
                <blockquote className="font-display text-2xl font-medium leading-snug text-plum sm:text-3xl">“{t.quote}”</blockquote>
                <figcaption className="mt-8 flex items-center gap-4">
                  {t.image ? (
                    <Image src={t.image} alt="" width={48} height={48} className="size-12 rounded-full object-cover" />
                  ) : (
                    <span aria-hidden="true" className="grid size-12 place-items-center rounded-full bg-coral font-display font-bold text-plum-deep">
                      {t.name.charAt(0)}
                    </span>
                  )}
                  <span>
                    <span className="block font-semibold text-plum">{t.name}</span>
                    <span className="block text-sm text-muted">
                      {t.role}, {t.company}
                    </span>
                  </span>
                </figcaption>
              </m.figure>
            </AnimatePresence>
          </div>
          {count > 1 && (
            <div className="mt-6 flex items-center justify-between gap-4">
              <div className="flex gap-2" aria-hidden="true">
                {items.map((_, i) => (
                  <span key={i} className={cn("h-1.5 rounded-full transition-all duration-500", i === index ? "w-10 bg-plum" : "w-4 bg-plum/20")} />
                ))}
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={() => go(-1)} className="grid size-12 place-items-center rounded-full border border-plum/20 bg-white text-plum transition-colors hover:bg-plum hover:text-ivory">
                  <ArrowLeft aria-hidden="true" className="size-5" />
                  <span className="sr-only">Previous testimonial</span>
                </button>
                <button type="button" onClick={() => go(1)} className="grid size-12 place-items-center rounded-full border border-plum/20 bg-white text-plum transition-colors hover:bg-plum hover:text-ivory">
                  <ArrowRight aria-hidden="true" className="size-5" />
                  <span className="sr-only">Next testimonial</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}
