"use client";

import * as m from "motion/react-m";
import { processSteps } from "@/content/process";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";

const VIEWPORT = { once: true, amount: 0.4 } as const;

/** Horizontal stepper on desktop, vertical timeline on mobile. The connecting line draws as the section enters view. */
export function Process() {
  return (
    <Section labelledBy="process-title">
      <Container>
        <Reveal>
          <SectionHeading id="process-title" eyebrow="How we work" title="A clearer process. Better outcomes." />
        </Reveal>
        <m.ol data-reveal="" className="relative mt-16 grid gap-10 lg:grid-cols-5 lg:gap-6" initial="hidden" whileInView="show" viewport={VIEWPORT}>
          {/* Desktop line */}
          <m.span
            aria-hidden="true"
            className="absolute left-0 right-0 top-7 hidden h-0.5 origin-left bg-coral lg:block"
            variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 1.6, ease: [0.65, 0, 0.35, 1] } } }}
          />
          <span aria-hidden="true" className="absolute left-0 right-0 top-7 -z-10 hidden h-0.5 bg-plum/10 lg:block" />
          {/* Mobile line */}
          <m.span
            aria-hidden="true"
            className="absolute bottom-4 left-7 top-4 w-0.5 origin-top bg-coral lg:hidden"
            variants={{ hidden: { scaleY: 0 }, show: { scaleY: 1, transition: { duration: 1.6, ease: [0.65, 0, 0.35, 1] } } }}
          />
          {processSteps.map((step, i) => (
            <m.li
              key={step.n}
              className="relative grid grid-cols-[3.5rem_1fr] gap-5 lg:block"
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { delay: 0.2 + i * 0.25, duration: 0.6 } } }}
            >
              <m.span
                className="relative z-10 grid size-14 place-items-center rounded-full border-2 border-coral bg-ivory font-display text-lg font-bold text-plum"
                variants={{
                  hidden: { scale: 0.6, backgroundColor: "#fff9f1" },
                  show: { scale: 1, backgroundColor: i === processSteps.length - 1 ? "#ff715b" : "#fff9f1", transition: { delay: 0.25 + i * 0.25, type: "spring", stiffness: 260, damping: 18 } },
                }}
              >
                {step.n}
              </m.span>
              <div className="lg:mt-6 lg:pr-4">
                <h3 className="text-xl font-bold">{step.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{step.body}</p>
              </div>
            </m.li>
          ))}
        </m.ol>
      </Container>
    </Section>
  );
}
