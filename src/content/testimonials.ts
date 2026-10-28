/**
 * Testimonials.
 *
 * `testimonials` must contain ONLY verified quotes from real clients, published with their permission.
 * It is intentionally empty until the first verified testimonial arrives. While it is empty, the
 * homepage section is hidden in production and shows the clearly labelled samples below in development.
 */
export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  /** Optional path to an authorised photo or logo in /public. */
  image?: string;
};

export const testimonials: Testimonial[] = [];

/** Development-only layout samples. Never rendered in a production build. */
export const sampleTestimonials: Testimonial[] = [
  { quote: "Sample testimonial. Replace with a verified quote from a real client before publishing.", name: "Client name", role: "Role", company: "Company" },
  { quote: "Second sample slot. Use it to check how longer quotes wrap across two or three lines in the slider layout.", name: "Client name", role: "Role", company: "Company" },
  { quote: "Third sample slot. Remove all samples once verified testimonials are added to the list above.", name: "Client name", role: "Role", company: "Company" },
];

export const showTestimonials = () => testimonials.length > 0 || process.env.NODE_ENV !== "production";
export const visibleTestimonials = () => (testimonials.length > 0 ? testimonials : sampleTestimonials);
export const usingSamples = () => testimonials.length === 0;
