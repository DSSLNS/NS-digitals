import { Code2, Handshake, ShieldCheck, Zap } from "lucide-react";
import { Container, Eyebrow } from "@/components/ui/section";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

const capabilities = [
  { Icon: Code2, title: "Thoughtful development", body: "Clean, maintainable code shaped around your goals, not a template." },
  { Icon: ShieldCheck, title: "Quality-first delivery", body: "Dedicated QA engineers test every journey before it reaches your users." },
  { Icon: Zap, title: "Performance optimization", body: "Fast, stable pages with attention to Core Web Vitals from day one." },
  { Icon: Handshake, title: "Long-term partnership", body: "Support, maintenance and improvements long after launch." },
];

export function Trust() {
  return (
    <section aria-labelledby="trust-title" className="relative border-y border-line bg-white/50 py-20 sm:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <Reveal>
            <Eyebrow>Why it matters</Eyebrow>
            <h2 id="trust-title" className="mt-4 text-4xl font-bold leading-[1.05] sm:text-5xl">
              Good design gets attention. <span className="text-plum-soft">Great engineering earns trust.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg leading-relaxed text-muted">
              We combine thoughtful development, rigorous testing, and continuous optimization to help your website perform at its best.
            </p>
          </Reveal>
        </div>
        <Stagger as="ul" className="mt-14 grid gap-px overflow-hidden rounded-[1.75rem] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map(({ Icon, title, body }, i) => (
            <StaggerItem as="li" key={title} className="group relative bg-ivory p-7 transition-colors duration-500 hover:bg-white">
              <span className="grid size-12 place-items-center rounded-2xl bg-white text-plum ring-1 ring-plum/10 transition-[transform,background-color] duration-500 group-hover:-rotate-6 group-hover:bg-lavender">
                <Icon aria-hidden="true" className="size-5" strokeWidth={1.75} />
              </span>
              <h3 className="mt-6 text-xl font-bold">{title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{body}</p>
              {/* Number-free progress indicator: segments fill on hover, staggered per card. */}
              <div aria-hidden="true" className="mt-6 flex gap-1.5">
                {[0, 1, 2, 3].map((s) => (
                  <span
                    key={s}
                    className={cn("h-1.5 flex-1 rounded-full transition-colors duration-500 group-hover:bg-coral", s <= i ? "bg-coral/60" : "bg-plum/10")}
                    style={{ transitionDelay: `${s * 80}ms` }}
                  />
                ))}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
