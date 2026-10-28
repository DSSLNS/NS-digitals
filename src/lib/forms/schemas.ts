import { z } from "zod";
import { budgetOptions, currencyOptions, enquiryTypes, serviceOptions, timelineOptions } from "./options";

const values = <T extends readonly { value: string }[]>(opts: T) => opts.map((o) => o.value) as [T[number]["value"], ...T[number]["value"][]];

/** Optional select: empty string becomes undefined, anything else must be a known option. */
const optionalEnum = <T extends readonly { value: string }[]>(opts: T, message: string) =>
  z.preprocess((v) => (v === "" || v == null ? undefined : v), z.enum(values(opts), { message }).optional());

const optionalText = (max: number, message: string) =>
  z.preprocess((v) => (typeof v === "string" && v.trim() === "" ? undefined : v), z.string().trim().max(max, message).optional());

/**
 * Single source of truth for enquiry validation. Used in the browser for instant, field-level
 * feedback and again on the server, which never trusts the client.
 */
export const enquirySchema = z.object({
  type: z.enum(enquiryTypes).catch("contact"),
  name: z.string().trim().min(2, "Please enter your full name.").max(100, "Name must be 100 characters or fewer."),
  email: z.string().trim().max(200, "Email must be 200 characters or fewer.").email("Enter a valid email address, e.g. name@company.com."),
  company: optionalText(200, "Keep this under 200 characters."),
  service: z.enum(values(serviceOptions), { message: "Choose the service you need, or “Not sure yet”." }),
  budget: optionalEnum(budgetOptions, "Choose a budget range from the list."),
  currency: optionalEnum(currencyOptions, "Choose a currency from the list."),
  timeline: optionalEnum(timelineOptions, "Choose a timeline from the list."),
  description: z
    .string()
    .trim()
    .min(20, "Tell us a little more about your project (at least 20 characters).")
    .max(5000, "Please keep your description under 5,000 characters."),
  consent: z.literal("yes", { message: "Please confirm we can use your details to respond to this enquiry." }),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
export type EnquiryField = keyof EnquiryInput;

/** Validates a subset of fields — used by the multi-step quote form before moving to the next step. */
export function validateFields(data: Record<string, unknown>, fields: EnquiryField[]) {
  const mask = Object.fromEntries(fields.map((f) => [f, true])) as { [K in EnquiryField]?: true };
  const result = enquirySchema.pick(mask).safeParse(data);
  return result.success ? {} : flattenErrors(result.error);
}

export function flattenErrors(error: z.ZodError) {
  const errors: Record<string, string> = {};
  for (const issue of error.issues) errors[String(issue.path[0])] ??= issue.message;
  return errors;
}
