import type { Metadata } from "next";
import { Suspense } from "react";
import { buildMetadata } from "@/lib/seo";
import { ContactForm, ContactFormFromUrl } from "@/components/forms/contact-form";
import { ContactAside } from "@/components/sections/contact-aside";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/section";

export const metadata: Metadata = buildMetadata({
  title: "Contact Us: Start a Website Project",
  description:
    "Tell us about your website project, redesign, bug or performance issue. Our development and QA team will review it and reply with clear next steps.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Contact", href: "/contact" }]}
        eyebrow="Let's talk"
        title="Tell us what you're building, or what needs fixing."
        lead="Share a few details and we'll come back with questions, options and a clear next step. No pressure, no jargon."
      />
      <section id="enquiry" aria-label="Enquiry form" className="pb-24 sm:pb-32">
        <Container className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-14">
          <div className="rounded-[2rem] border border-line bg-white p-6 shadow-soft sm:p-10">
            <Suspense fallback={<ContactForm />}>
              <ContactFormFromUrl />
            </Suspense>
          </div>
          <ContactAside />
        </Container>
      </section>
    </>
  );
}
