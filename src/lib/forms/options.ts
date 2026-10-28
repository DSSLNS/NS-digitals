/** Select options and field names shared by the client forms and server-side validation. */

/** Hidden field that people never see; bots that fill every input reveal themselves. */
export const HONEYPOT_FIELD = "fax_number";
/** Client-set timestamp of when the form became interactive. */
export const TIMESTAMP_FIELD = "_rendered_at";

export const serviceOptions = [
  { value: "website-development", label: "Website Development" },
  { value: "website-redesign", label: "Website Redesign" },
  { value: "bug-fixing", label: "Bug Fixing & Technical Support" },
  { value: "qa-testing", label: "QA & Website Testing" },
  { value: "ecommerce-development", label: "E-commerce Development" },
  { value: "seo-performance", label: "SEO & Performance Optimization" },
  { value: "website-maintenance", label: "Website Maintenance" },
  { value: "not-sure", label: "Not sure yet, I'd like advice" },
] as const;

export const currencyOptions = [
  { value: "USD", label: "USD ($)" },
  { value: "GBP", label: "GBP (£)" },
  { value: "EUR", label: "EUR (€)" },
  { value: "AUD", label: "AUD (A$)" },
  { value: "CAD", label: "CAD (C$)" },
  { value: "INR", label: "INR (₹)" },
  { value: "OTHER", label: "Other" },
] as const;

/** Budget bands are currency-neutral; the currency field gives them meaning for international clients. */
export const budgetOptions = [
  { value: "under-2k", label: "Under 2,000" },
  { value: "2k-5k", label: "2,000 – 5,000" },
  { value: "5k-15k", label: "5,000 – 15,000" },
  { value: "15k-40k", label: "15,000 – 40,000" },
  { value: "40k-plus", label: "40,000+" },
  { value: "undecided", label: "Not decided yet" },
] as const;

export const timelineOptions = [
  { value: "asap", label: "As soon as possible" },
  { value: "1-3-months", label: "Within 1–3 months" },
  { value: "3-6-months", label: "Within 3–6 months" },
  { value: "flexible", label: "Flexible" },
] as const;

export const enquiryTypes = ["contact", "quote", "consultation"] as const;
export type EnquiryType = (typeof enquiryTypes)[number];

export type FormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Record<string, string>;
  /** Submitted values echoed back so fields keep their content after a failed submission. */
  values?: Record<string, string>;
};

export const initialFormState: FormState = { status: "idle" };

export const fieldLabels: Record<string, string> = {
  name: "Full name",
  email: "Business email",
  company: "Company or website",
  service: "Service required",
  budget: "Project budget",
  currency: "Currency",
  timeline: "Expected timeline",
  description: "Project description",
  consent: "Privacy consent",
};
