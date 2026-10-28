/** The NS Digital Solutions agency site. Override with NEXT_PUBLIC_AGENCY_URL at build time if the domain changes. */
export const agencyUrl = (process.env.NEXT_PUBLIC_AGENCY_URL ?? "https://ns-digitals.vercel.app").replace(/\/$/, "");
export const agencyCaseStudyUrl = (slug: string) => `${agencyUrl}/work/${slug}`;
