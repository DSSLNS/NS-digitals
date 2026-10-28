/**
 * Central site configuration.
 *
 * Business contact details are deliberately NOT hard-coded. Each one is read from an
 * environment variable (see .env.example) and only rendered when it is set, so the site
 * never publishes an invented phone number, address or social profile.
 */

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

const optional = (v: string | undefined) => (v && v.trim() ? v.trim() : undefined);

export const siteConfig = {
  name: "NS Digital Solutions",
  shortName: "NS Digital",
  tagline: "Build Better. Perform Better.",
  description:
    "NS Digital Solutions is an independent web development and quality assurance agency. We build, redesign, fix, test, optimise and maintain websites for growing businesses worldwide.",
  url: siteUrl,
  locale: "en",
  contact: {
    email: optional(process.env.NEXT_PUBLIC_CONTACT_EMAIL),
    phone: optional(process.env.NEXT_PUBLIC_CONTACT_PHONE),
    /** Free text such as "Remote-first · working with clients worldwide". Never list an office that does not exist. */
    location: optional(process.env.NEXT_PUBLIC_CONTACT_LOCATION),
  },
  /** External scheduling page (Cal.com, Calendly…). When unset, "Book a Consultation" opens the consultation form instead. */
  bookingUrl: optional(process.env.NEXT_PUBLIC_BOOKING_URL),
  /** Rendered only when configured, so no dead social links ship. */
  social: [
    { label: "LinkedIn", url: optional(process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN) },
    { label: "GitHub", url: optional(process.env.NEXT_PUBLIC_SOCIAL_GITHUB) },
    { label: "Instagram", url: optional(process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM) },
    { label: "X", url: optional(process.env.NEXT_PUBLIC_SOCIAL_X) },
  ].filter((s): s is { label: string; url: string } => Boolean(s.url)),
  twitterHandle: optional(process.env.NEXT_PUBLIC_TWITTER_HANDLE),
  /** Date shown on the legal pages. Update whenever the policy text changes. */
  legalUpdated: "2026-10-28",
} as const;

/** Where "Book a Consultation" goes: the external scheduler when configured, otherwise our own consultation form. */
export const consultationHref = siteConfig.bookingUrl ?? "/contact?type=consultation#enquiry";
export const isExternalBooking = Boolean(siteConfig.bookingUrl);

export const navigation = {
  main: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services", menu: "services" as const },
    { label: "Industries", href: "/industries" },
    { label: "Our Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Insights", href: "/insights" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Our Work", href: "/work" },
    { label: "Industries", href: "/industries" },
    { label: "Contact", href: "/contact" },
    { label: "Request a Quote", href: "/request-a-quote" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};
