import Link from "next/link";
import { CalendarDays, Mail, MessageSquareText, Search, Send } from "lucide-react";
import { consultationHref, isExternalBooking, siteConfig } from "@/config/site";
import { ButtonLink } from "@/components/ui/button";

const nextSteps = [
  { Icon: Send, title: "You send the details", body: "A few lines is enough to start." },
  { Icon: Search, title: "We review your project", body: "We look at your site or brief before replying." },
  { Icon: MessageSquareText, title: "We reply with next steps", body: "Questions, options and a suggested approach." },
];

export function ContactAside({ showQuoteLink = true }: { showQuoteLink?: boolean }) {
  const { email } = siteConfig.contact;
  return (
    <aside className="space-y-5 lg:sticky lg:top-28">
      <div className="rounded-[1.75rem] bg-plum p-7 text-ivory on-dark">
        <h2 className="font-display text-xl font-bold text-ivory">What happens next</h2>
        <ol className="mt-6 space-y-5">
          {nextSteps.map(({ Icon, title, body }, i) => (
            <li key={title} className="flex gap-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-ivory/10 text-sun">
                <Icon aria-hidden="true" className="size-4.5" />
              </span>
              <span>
                <span className="block font-semibold">
                  <span className="sr-only">Step {i + 1}: </span>
                  {title}
                </span>
                <span className="block text-sm text-ivory/75">{body}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>
      <div className="rounded-[1.75rem] bg-lavender p-7">
        <CalendarDays aria-hidden="true" className="size-6 text-plum" />
        <h2 className="mt-4 font-display text-xl font-bold">Prefer to talk it through?</h2>
        <p className="mt-2 text-charcoal/80">
          {isExternalBooking ? "Pick a time that suits you for a short introductory call." : "Request a consultation and we'll arrange a call at a time that works across time zones."}
        </p>
        <ButtonLink href={consultationHref} variant="plum" className="mt-5">
          Book a Consultation
        </ButtonLink>
      </div>
      {(showQuoteLink || email) && (
      <div className="rounded-[1.75rem] border border-line bg-white p-7">
        {showQuoteLink && (
          <>
            <h2 className="font-display text-xl font-bold">Need a detailed quote?</h2>
            <p className="mt-2 text-muted">Our guided quote form takes about two minutes.</p>
            <Link href="/request-a-quote" className="mt-4 inline-flex rounded font-semibold text-coral-ink underline underline-offset-4">
              Request a quote
            </Link>
          </>
        )}
        {email && (
          <p className="mt-6 flex items-center gap-2 border-t border-line pt-5 text-sm text-muted">
            <Mail aria-hidden="true" className="size-4 text-coral-ink" />
            <a href={`mailto:${email}`} className="font-medium text-plum underline-offset-4 hover:underline">
              {email}
            </a>
          </p>
        )}
      </div>
      )}
    </aside>
  );
}
