"use server";

import { siteConfig } from "@/config/site";
import { budgetOptions, serviceOptions, timelineOptions, type FormState } from "@/lib/forms/options";
import { enquirySchema, flattenErrors } from "@/lib/forms/schemas";
import { deliverLead, DeliveryNotConfiguredError } from "@/lib/forms/deliver";
import { isRateLimited, looksLikeSpam } from "@/lib/forms/protection";

const label = (opts: readonly { value: string; label: string }[], v?: string) => opts.find((o) => o.value === v)?.label ?? "—";

function echo(formData: FormData): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    if (key.startsWith("$") || key.startsWith("_") || typeof value !== "string") continue;
    out[key] = value;
  }
  return out;
}

const kinds = { contact: "General enquiry", quote: "Project quote request", consultation: "Consultation request" } as const;

export async function submitEnquiry(_prev: FormState, formData: FormData): Promise<FormState> {
  // Bots that trip the honeypot get a generic response and nothing is delivered. Real visitors never see this path.
  if (looksLikeSpam(formData)) return { status: "success" };
  if (await isRateLimited("enquiry")) {
    return { status: "error", message: "Too many submissions from your connection. Please wait a few minutes and try again.", values: echo(formData) };
  }

  const parsed = enquirySchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { status: "error", message: "Please correct the highlighted fields.", fieldErrors: flattenErrors(parsed.error), values: echo(formData) };
  }

  const d = parsed.data;
  try {
    await deliverLead({
      kind: kinds[d.type],
      replyTo: d.email,
      fields: [
        ["Name", d.name],
        ["Email", d.email],
        ["Company / website", d.company ?? "—"],
        ["Service", label(serviceOptions, d.service)],
        ["Budget", d.budget ? `${label(budgetOptions, d.budget)} ${d.currency ?? ""}`.trim() : "—"],
        ["Timeline", label(timelineOptions, d.timeline)],
        ["Project description", d.description],
        ["Privacy consent", "Given"],
      ],
    });
  } catch (error) {
    if (error instanceof DeliveryNotConfiguredError) console.error("[leads] no delivery channel configured — set RESEND_* or LEADS_WEBHOOK_URL");
    else console.error("[leads] submission failed", error);
    const fallback = siteConfig.contact.email ? `, or email us directly at ${siteConfig.contact.email}` : "";
    return {
      status: "error",
      message: `Sorry, we couldn't send your message just now. Your details haven't been lost: please try again in a moment${fallback}.`,
      values: echo(formData),
    };
  }
  return { status: "success" };
}
