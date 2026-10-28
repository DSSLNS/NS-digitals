"use client";

import { useSearchParams } from "next/navigation";
import { budgetOptions, currencyOptions, fieldLabels, serviceOptions, timelineOptions, type EnquiryType } from "@/lib/forms/options";
import type { EnquiryField } from "@/lib/forms/schemas";
import { ConsentField, ErrorSummary, Field, Input, Select, SpamProtection, SubmitButton, SuccessPanel, Textarea, val } from "./fields";
import { useEnquiry } from "./use-enquiry";

const ALL_FIELDS: EnquiryField[] = ["name", "email", "company", "service", "budget", "currency", "timeline", "description", "consent"];

/** Reads ?type= and ?service= from the URL. Render inside <Suspense> with <ContactForm /> as the fallback. */
export function ContactFormFromUrl() {
  const params = useSearchParams();
  const type: EnquiryType = params.get("type") === "consultation" ? "consultation" : "contact";
  const requested = params.get("service") ?? "";
  const presetService = serviceOptions.some((o) => o.value === requested) ? requested : "";
  return <ContactForm type={type} presetService={presetService} key={`${type}-${presetService}`} />;
}

export function ContactForm({ type = "contact", presetService = "" }: { type?: EnquiryType; presetService?: string }) {
  const { state, action, pending, errors, summaryMessage, attempt, fieldHandlers, guardSubmit } = useEnquiry();

  if (state.status === "success") {
    return (
      <SuccessPanel title={type === "consultation" ? "Consultation request received" : "Thanks, your message is on its way"}>
        <p>We&apos;ve received your details and will reply by email. If anything changes in the meantime, just reply to our response.</p>
      </SuccessPanel>
    );
  }

  const v = state.values;
  return (
    <form
      id="enquiry-form"
      action={action}
      noValidate
      onSubmit={(e) => guardSubmit(e, ALL_FIELDS)}
      {...fieldHandlers}
      className="relative space-y-6"
      aria-describedby="required-note"
    >
      <SpamProtection />
      <input type="hidden" name="type" value={type} />
      <ErrorSummary key={attempt} message={summaryMessage} errors={errors} labels={fieldLabels} />
      <p id="required-note" className="text-sm text-muted">
        Fields marked <span className="text-coral-ink">*</span> are required.
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="name" label={fieldLabels.name!} required error={errors.name}>
          {(a) => <Input {...a} name="name" autoComplete="name" defaultValue={val(v, "name")} />}
        </Field>
        <Field id="email" label={fieldLabels.email!} required error={errors.email}>
          {(a) => <Input {...a} name="email" type="email" inputMode="email" autoComplete="email" defaultValue={val(v, "email")} />}
        </Field>
        <Field id="company" label={fieldLabels.company!} error={errors.company} hint="Your company name or current website, e.g. yourcompany.com">
          {(a) => <Input {...a} name="company" autoComplete="organization" defaultValue={val(v, "company")} />}
        </Field>
        <Field id="service" label={fieldLabels.service!} required error={errors.service}>
          {(a) => <Select {...a} name="service" options={serviceOptions} placeholder="Select a service" defaultValue={val(v, "service") || presetService} />}
        </Field>
      </div>

      <Field id="description" label={fieldLabels.description!} required error={errors.description} hint="Goals, current challenges, links or features: whatever helps us understand the project.">
        {(a) => <Textarea {...a} name="description" rows={6} defaultValue={val(v, "description")} />}
      </Field>

      <div className="grid gap-6 sm:grid-cols-3">
        <Field id="budget" label={fieldLabels.budget!} error={errors.budget}>
          {(a) => <Select {...a} name="budget" options={budgetOptions} placeholder="Select a range" defaultValue={val(v, "budget")} />}
        </Field>
        <Field id="currency" label={fieldLabels.currency!} error={errors.currency}>
          {(a) => <Select {...a} name="currency" options={currencyOptions} placeholder="Select currency" defaultValue={val(v, "currency")} />}
        </Field>
        <Field id="timeline" label={fieldLabels.timeline!} error={errors.timeline}>
          {(a) => <Select {...a} name="timeline" options={timelineOptions} placeholder="Select a timeline" defaultValue={val(v, "timeline")} />}
        </Field>
      </div>

      <ConsentField error={errors.consent} defaultChecked={val(v, "consent") === "yes"} />

      <div className="border-t border-line pt-6">
        <SubmitButton pending={pending}>{type === "consultation" ? "Request a consultation" : "Send message"}</SubmitButton>
      </div>
    </form>
  );
}
