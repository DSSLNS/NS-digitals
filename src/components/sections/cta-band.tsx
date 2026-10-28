import { consultationHref } from "@/config/site";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";

/** High-conversion closing CTA used on the homepage and every interior page. */
export function CtaBand({
  title = "Have a website idea? Let’s make it happen.",
  lead = "Tell us what you’re building, what needs fixing, or where your website could perform better. We’ll help you identify the next step.",
  quoteHref = "/request-a-quote",
}: {
  title?: string;
  lead?: string;
  quoteHref?: string;
}) {
  return (
    <section aria-labelledby="cta-title" className="px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="on-dark relative isolate overflow-hidden rounded-[2rem] bg-plum pb-20 pt-24 text-ivory sm:rounded-[2.5rem] sm:py-28">
        <div aria-hidden="true" className="grid-lines-dark mask-fade absolute inset-0 -z-10" />
        <div aria-hidden="true" className="absolute -right-14 -top-20 -z-10 size-36 animate-float-slow rounded-full bg-coral sm:-right-20 sm:-top-28 sm:size-80 lg:size-96" />
        <div aria-hidden="true" className="absolute -bottom-20 right-[30%] -z-10 hidden size-40 animate-float rounded-[2.2rem] bg-lavender/20 [animation-delay:-2s] lg:block" />
        <div aria-hidden="true" className="absolute bottom-16 right-[18%] -z-10 hidden size-16 animate-spin-slow rounded-xl border-4 border-sun sm:block" />
        <Container>
          <Reveal className="max-w-4xl">
            <h2 id="cta-title" className="text-[2.6rem] font-bold leading-[1.02] text-ivory sm:text-6xl lg:text-7xl">
              {title}
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ivory/80 sm:text-xl">{lead}</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={quoteHref} size="lg">
                Start a Project
              </ButtonLink>
              <ButtonLink href={consultationHref} variant="outline-light" size="lg">
                Book a Consultation
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </div>
    </section>
  );
}
