import type { Metadata } from "next";
import { Code2, Compass, HeartHandshake, MessageCircle, ShieldCheck, Sprout } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { Monogram } from "@/components/layout/logo";

export const metadata: Metadata = buildMetadata({
  title: "About Us: An Independent Web Development & QA Agency",
  description:
    "NS Digital Solutions is an independent agency founded by Nrushimha and Satya, combining web development and quality assurance for businesses worldwide.",
  path: "/about",
});

const values = [
  { Icon: ShieldCheck, title: "Quality is planned, not inspected", body: "Testing is part of every project plan from day one, not a scramble before launch." },
  { Icon: MessageCircle, title: "Plain-English communication", body: "Clear updates, honest estimates and no jargon hiding the real status of your project." },
  { Icon: Compass, title: "Recommendations, not upsells", body: "We suggest what your website actually needs, even when that is less than you expected." },
  { Icon: Code2, title: "Code others can work with", body: "Documented, maintainable work you own outright, so you are never locked in." },
  { Icon: Sprout, title: "Improvement after launch", body: "Websites keep evolving. We stay available to test, fix and improve them." },
  { Icon: HeartHandshake, title: "Honest claims only", body: "We don't invent statistics, testimonials or guarantees. Our work should speak for itself." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "About", href: "/about" }]}
        eyebrow="About us"
        title="Two disciplines. One team. Better websites."
        lead="NS Digital Solutions is an independent digital agency that brings web development and quality assurance together, so the websites we deliver look great and work reliably."
        visual={
          <div aria-hidden="true" className="relative mx-auto aspect-square w-full max-w-sm">
            <span className="absolute inset-[8%] rounded-full bg-coral" />
            <span className="absolute right-0 top-0 size-1/3 animate-float rounded-[2rem] bg-lavender-deep" />
            <span className="absolute bottom-[4%] left-0 size-1/4 animate-float-slow rounded-full border-[10px] border-mint-deep" />
            <div className="absolute inset-[28%] grid place-items-center rounded-[2.5rem] bg-ivory shadow-lift">
              <Monogram className="size-3/5" />
            </div>
          </div>
        }
      />

      <Section labelledBy="story-title" className="pt-6 sm:pt-10">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <Reveal>
            <SectionHeading id="story-title" eyebrow="Our story" title="Where the NS comes from" />
          </Reveal>
          <Reveal delay={0.1} className="space-y-5 text-lg leading-relaxed text-charcoal/85">
            <p>
              The NS in our name stands for our founders, <strong className="text-plum">Nrushimha</strong> and <strong className="text-plum">Satya</strong>. We started the agency around a
              simple observation: most website problems aren&apos;t design problems or code problems. They&apos;re problems that nobody tested for.
            </p>
            <p>
              So we built an agency where development and quality assurance sit side by side. Developers build with testing in mind, QA engineers validate real user
              journeys on real devices, and both care about performance and accessibility from the first day of a project.
            </p>
            <p>
              We work remotely with businesses around the world, from startups launching their first site to established companies rebuilding, fixing or maintaining the
              one they have.
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section labelledBy="values-title" className="bg-white/60">
        <Container>
          <Reveal>
            <SectionHeading id="values-title" eyebrow="How we work" title="What you can expect from us" />
          </Reveal>
          <Stagger as="ul" className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {values.map(({ Icon, title, body }) => (
              <StaggerItem as="li" key={title} className="rounded-[1.5rem] border border-line bg-ivory p-7">
                <span className="grid size-11 place-items-center rounded-xl bg-coral-soft text-plum">
                  <Icon aria-hidden="true" className="size-5" strokeWidth={1.75} />
                </span>
                <h3 className="mt-5 text-xl font-bold">{title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      <Section labelledBy="global-title">
        <Container className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              id="global-title"
              eyebrow="Working globally"
              title="Remote-first, wherever you are"
              lead="We collaborate with clients across time zones using shared project boards, staging sites you can review anytime, and scheduled check-ins that suit your working hours. Quotes can be discussed in your preferred currency."
            />
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/services">Explore services</ButtonLink>
              <ButtonLink href="/work" variant="outline">
                See demonstration work
              </ButtonLink>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="grid grid-cols-2 gap-4">
              {["Shared project boards", "Staging sites to review", "Async-friendly updates", "Calls in your time zone"].map((t, i) => (
                <li key={t} className={["rounded-[1.5rem] p-6 font-display text-lg font-semibold text-plum", ["bg-lavender", "bg-mint", "bg-coral-soft", "bg-[#fff0c2]"][i]].join(" ")}>
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
