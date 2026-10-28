import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { consultationHref, isExternalBooking, navigation, siteConfig } from "@/config/site";
import { getPosts, getServices } from "@/lib/content";
import { Container } from "@/components/ui/section";
import { Logo } from "./logo";

function FooterHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-coral-ink">{children}</h2>;
}

const linkClass = "rounded text-charcoal/80 transition-colors hover:text-plum";

export async function Footer() {
  const [services, posts] = await Promise.all([getServices(), getPosts(3)]);
  const { email, phone, location } = siteConfig.contact;

  return (
    <footer className="relative overflow-hidden bg-ivory-deep text-charcoal">
      <div aria-hidden="true" className="grid-lines mask-fade absolute inset-0 opacity-60" />
      <div aria-hidden="true" className="absolute -right-24 -top-24 size-80 rounded-full bg-lavender blur-3xl" />
      <Container className="relative">
        <div className="grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <Logo />
            <p className="mt-6 max-w-sm leading-relaxed text-charcoal/80">
              An independent web development and QA agency. We build, redesign, fix, test, optimize and maintain websites for growing businesses around the world.
            </p>
            <p className="mt-6 font-display text-xl font-semibold text-plum">{siteConfig.tagline}</p>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <nav aria-labelledby="footer-services">
              <FooterHeading>
                <span id="footer-services">Services</span>
              </FooterHeading>
              <ul className="mt-5 space-y-3 text-sm">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services/${s.slug}`} className={linkClass}>
                      {s.navLabel}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-labelledby="footer-company">
              <FooterHeading>
                <span id="footer-company">Company</span>
              </FooterHeading>
              <ul className="mt-5 space-y-3 text-sm">
                {navigation.company.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className={linkClass}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-labelledby="footer-insights">
              <FooterHeading>
                <span id="footer-insights">Insights</span>
              </FooterHeading>
              <ul className="mt-5 space-y-3 text-sm">
                {posts.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/insights/${p.slug}`} className={linkClass}>
                      {p.title}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/insights" className="rounded font-semibold text-coral-ink hover:underline">
                    All insights
                  </Link>
                </li>
              </ul>
            </nav>

            <div>
              <FooterHeading>Contact</FooterHeading>
              <ul className="mt-5 space-y-3 text-sm">
                {email && (
                  <li>
                    <a href={`mailto:${email}`} className={`${linkClass} inline-flex items-center gap-2 break-all`}>
                      <Mail aria-hidden="true" className="size-4 shrink-0 text-coral-ink" />
                      {email}
                    </a>
                  </li>
                )}
                {phone && (
                  <li>
                    <a href={`tel:${phone.replace(/[^+\d]/g, "")}`} className={`${linkClass} inline-flex items-center gap-2`}>
                      <Phone aria-hidden="true" className="size-4 shrink-0 text-coral-ink" />
                      {phone}
                    </a>
                  </li>
                )}
                {location && (
                  <li className="inline-flex items-start gap-2 text-charcoal/80">
                    <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-coral-ink" />
                    {location}
                  </li>
                )}
                <li>
                  <Link href="/contact" className={linkClass}>
                    Send us a message
                  </Link>
                </li>
                <li>
                  {isExternalBooking ? (
                    <a href={consultationHref} target="_blank" rel="noopener noreferrer" className={`${linkClass} inline-flex items-center gap-1`}>
                      Book a consultation <ArrowUpRight aria-hidden="true" className="size-3.5" />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  ) : (
                    <Link href={consultationHref} className={linkClass}>
                      Book a consultation
                    </Link>
                  )}
                </li>
              </ul>
              {siteConfig.social.length > 0 && (
                <ul className="mt-6 flex flex-wrap gap-2" aria-label="Social media">
                  {siteConfig.social.map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex rounded-full border border-plum/20 px-3 py-1.5 text-xs font-semibold text-plum transition-colors hover:border-plum hover:bg-white"
                      >
                        {s.label}
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-plum/10 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <ul className="flex gap-6">
            {navigation.legal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={linkClass}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
