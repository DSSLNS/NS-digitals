import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/sections/legal-page";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Service",
  description: "The terms that apply to your use of the NS Digital Solutions website.",
  path: "/terms",
});

/* Website terms of use. Project work is governed by a separate written agreement. Review with a qualified adviser before launch. */
export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" path="/terms">
      <p>
        These terms apply to your use of the {siteConfig.name} website. By using the site, you agree to them. Any services we provide are governed by a separate written
        agreement or proposal, which takes precedence over these terms.
      </p>
      <h2>Website content</h2>
      <p>
        The content on this website is provided for general information. We work to keep it accurate and current, but it is not professional advice for your specific
        situation. Projects labelled &ldquo;Demonstration project&rdquo; are concepts created to illustrate our approach and are not client work.
      </p>
      <h2>No guarantees of outcomes</h2>
      <p>
        Nothing on this website is a promise of particular search rankings, traffic, sales or performance scores. These depend on many factors outside our control. Any
        commitments we make about a project are set out in its written agreement.
      </p>
      <h2>Intellectual property</h2>
      <p>
        The design, text, illustrations and code of this website belong to {siteConfig.name} unless stated otherwise. You may share links to our pages, but please do not
        copy or republish substantial parts of the site without permission.
      </p>
      <h2>Enquiries</h2>
      <p>
        Submitting an enquiry or quote request does not create a contract or oblige either party to proceed. We handle the information you submit as described in our{" "}
        <Link href="/privacy-policy">Privacy Policy</Link>.
      </p>
      <h2>Acceptable use</h2>
      <p>Please do not misuse the website, for example by attempting to disrupt it, gain unauthorised access, or submit automated or misleading enquiries.</p>
      <h2>Links to other websites</h2>
      <p>We may link to third-party websites and tools, such as a booking service. We are not responsible for their content or practices.</p>
      <h2>Liability</h2>
      <p>To the extent permitted by law, we are not liable for any loss arising from your use of, or inability to use, this website.</p>
      <h2>Changes</h2>
      <p>
        We may update these terms from time to time. Continued use of the website after changes means you accept the updated terms. Questions? Please{" "}
        <Link href="/contact">contact us</Link>.
      </p>
    </LegalPage>
  );
}
