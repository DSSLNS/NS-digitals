import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/sections/legal-page";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: "How NS Digital Solutions collects, uses and protects the personal information you share through this website.",
  path: "/privacy-policy",
});

/*
 * Written to match how this website actually behaves. Have it reviewed by a qualified adviser
 * for the jurisdictions you operate in (e.g. UK/EU GDPR, Australian Privacy Act, Indian DPDP Act)
 * before launch, and update it whenever you add tools that process personal data.
 */
export default function PrivacyPolicyPage() {
  const email = siteConfig.contact.email;
  const contactLine = email ? (
    <>
      by email at <a href={`mailto:${email}`}>{email}</a> or through our <Link href="/contact">contact form</Link>
    </>
  ) : (
    <>
      through our <Link href="/contact">contact form</Link>
    </>
  );
  return (
    <LegalPage title="Privacy Policy" path="/privacy-policy">
      <p>
        This policy explains how {siteConfig.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) handles personal information collected through this website. We aim to collect as
        little as possible and to use it only for the purpose you shared it for.
      </p>
      <h2>Information we collect</h2>
      <p>When you submit our contact, consultation or quote forms, we collect the details you choose to provide:</p>
      <ul>
        <li>your name and business email address;</li>
        <li>your company name or website, if provided;</li>
        <li>the service you are interested in, budget range, currency and timeline, if provided;</li>
        <li>your project description and any other information you include in it.</li>
      </ul>
      <p>
        Like most websites, our hosting provider automatically processes technical data such as IP addresses and browser details to deliver pages securely and protect
        against abuse. We use your IP address briefly to limit repeated automated submissions.
      </p>
      <h2>How we use it</h2>
      <ul>
        <li>to respond to your enquiry and discuss your project;</li>
        <li>to prepare proposals or quotes you have requested;</li>
        <li>to keep a record of our correspondence with you.</li>
      </ul>
      <p>We do not sell your personal information and we do not add you to marketing lists without your separate, explicit consent.</p>
      <h2>Legal basis</h2>
      <p>
        Where data-protection laws such as the GDPR apply, we process enquiry information with your consent, which you give when submitting a form, and on the basis of
        taking steps at your request before entering into a contract.
      </p>
      <h2>Who we share it with</h2>
      <p>
        Form submissions are delivered to our team through service providers that act on our instructions, such as our website host and email delivery or CRM provider.
        They may process data in countries other than your own, under appropriate safeguards.
      </p>
      <h2>Cookies and analytics</h2>
      <p>
        This website does not set advertising cookies. If we enable analytics, we will use privacy-friendly tools where possible and update this policy, including any
        consent options required in your region.
      </p>
      <h2>How long we keep it</h2>
      <p>We keep enquiry information only for as long as needed to handle your request and any resulting work, and for record-keeping required by law.</p>
      <h2>Your rights</h2>
      <p>
        Depending on where you live, you may have the right to access, correct, delete or restrict the use of your personal information, to withdraw consent, and to complain
        to a data-protection authority. To make a request, contact us {contactLine}.
      </p>
      <h2>Changes to this policy</h2>
      <p>We may update this policy from time to time. The date at the top of this page shows when it last changed.</p>
    </LegalPage>
  );
}
