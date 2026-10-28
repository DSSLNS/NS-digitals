import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { buildMetadata } from "@/lib/seo";
import { QuoteForm, QuoteFormFromUrl } from "@/components/forms/quote-form";
import { ContactAside } from "@/components/sections/contact-aside";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/section";

export const metadata: Metadata = buildMetadata({
  title: "Request a Quote for Your Website Project",
  description:
    "Request a quote for website development, redesign, QA, e-commerce, performance or maintenance. A short three-step form, reviewed by our team.",
  path: "/request-a-quote",
});

export default function RequestQuotePage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Request a Quote", href: "/request-a-quote" }]}
        eyebrow="Request a quote"
        title="Let's scope your project together."
        lead="Three short steps. Tell us what you need, roughly when, and where to reply. We'll take it from there."
      />
      <section aria-label="Quote request form" className="pb-24 sm:pb-32">
        <Container className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-14">
          <div className="rounded-[2rem] border border-line bg-white p-6 shadow-soft sm:p-10">
            <noscript>
              <p className="mb-6 rounded-2xl bg-sun/40 p-4 text-sm text-plum">
                This step-by-step form needs JavaScript. You can use our{" "}
                <Link href="/contact" className="font-semibold underline">
                  single-page contact form
                </Link>{" "}
                instead.
              </p>
            </noscript>
            <Suspense fallback={<QuoteForm />}>
              <QuoteFormFromUrl />
            </Suspense>
          </div>
          <ContactAside showQuoteLink={false} />
        </Container>
      </section>
    </>
  );
}
