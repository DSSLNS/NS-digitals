"use client";

import { useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { budgetOptions, currencyOptions, fieldLabels, serviceOptions, timelineOptions } from "@/lib/forms/options";
import type { EnquiryField } from "@/lib/forms/schemas";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ConsentField, ErrorSummary, Field, Input, Select, SpamProtection, SubmitButton, SuccessPanel, Textarea, val } from "./fields";
import { useEnquiry } from "./use-enquiry";

const steps: { title: string; fields: EnquiryField[] }[] = [
  { title: "Your project", fields: ["service", "description"] },
  { title: "Scope & timing", fields: ["company", "budget", "currency", "timeline"] },
  { title: "Your details", fields: ["name", "email", "consent"] },
];
const ALL_FIELDS = steps.flatMap((s) => s.fields);
const stepOf = (errors: Record<string, string>) => Math.max(0, steps.findIndex((s) => s.fields.some((f) => errors[f])));

export function QuoteFormFromUrl() {
  const requested = useSearchParams().get("service") ?? "";
  const preset = serviceOptions.some((o) => o.value === requested) ? requested : "";
  return <QuoteForm presetService={preset} key={preset} />;
}

/**
 * Three-step quote request. All steps live in one <form>, so every field is submitted together and
 * validated again on the server. Each step is validated before moving on.
 */
export function QuoteForm({ presetService = "" }: { presetService?: string }) {
  const [step, setStep] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);
  const headingRefs = useRef<(HTMLHeadingElement | null)[]>([]);

  const goTo = (n: number) => {
    setStep(n);
    requestAnimationFrame(() => headingRefs.current[n]?.focus());
  };

  const { state, action, pending, errors, summaryMessage, attempt, checkFields, fieldHandlers, guardSubmit } = useEnquiry({
    onServerResult: (r) => {
      if (r.fieldErrors && Object.keys(r.fieldErrors).length) setStep(stepOf(r.fieldErrors));
    },
  });

  if (state.status === "success") {
    return (
      <SuccessPanel title="Thanks, your quote request is in">
        <p>We&apos;ll review your project details and reply by email with questions, options and next steps.</p>
      </SuccessPanel>
    );
  }

  const v = state.values;
  const next = () => {
    if (formRef.current && checkFields(formRef.current, steps[step]!.fields)) goTo(step + 1);
  };
  const selectedService = val(v, "service") || presetService;

  return (
    <form
      ref={formRef}
      action={action}
      noValidate
      onSubmit={(e) => {
        if (step < steps.length - 1) {
          // Enter key on an early step advances rather than submitting.
          e.preventDefault();
          next();
          return;
        }
        const found = guardSubmit(e, ALL_FIELDS);
        if (found) setStep(stepOf(found));
      }}
      {...fieldHandlers}
      className="relative"
    >
      <SpamProtection />
      <input type="hidden" name="type" value="quote" />

      {/* Progress */}
      <ol className="mb-10 grid grid-cols-3 gap-2" aria-label="Form progress">
        {steps.map((s, i) => (
          <li key={s.title} aria-current={i === step ? "step" : undefined}>
            <span className={cn("block h-1.5 rounded-full transition-colors duration-500", i <= step ? "bg-coral" : "bg-plum/10")} />
            <span className={cn("mt-3 flex items-center gap-1.5 text-sm font-semibold", i === step ? "text-plum" : "text-muted")}>
              {i < step ? <Check aria-hidden="true" className="size-4 text-coral-ink" /> : <span className="font-display">{i + 1}.</span>}
              <span className="hidden sm:inline">{s.title}</span>
              <span className="sr-only sm:hidden">{s.title}</span>
              {i < step && <span className="sr-only">(completed)</span>}
            </span>
          </li>
        ))}
      </ol>

      <div className="mb-6">
        <ErrorSummary key={attempt} message={summaryMessage} errors={errors} labels={fieldLabels} />
      </div>

      {/* Step 1 */}
      <fieldset hidden={step !== 0} className="space-y-6">
        <legend className="sr-only">Step 1 of 3: Your project</legend>
        <h2 ref={(el) => { headingRefs.current[0] = el; }} tabIndex={-1} className="text-2xl font-bold outline-none sm:text-3xl">
          What can we help with?
        </h2>
        <div role="radiogroup" aria-labelledby="service-label" aria-describedby={errors.service ? "service-error" : undefined}>
          <p id="service-label" className="mb-3 text-sm font-semibold text-plum">
            {fieldLabels.service} <span className="text-coral-ink">*</span>
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {serviceOptions.map((o) => (
              <label
                key={o.value}
                className="group flex cursor-pointer items-center gap-3 rounded-2xl border border-plum/15 bg-white px-4 py-3.5 font-medium text-plum transition-colors hover:border-plum/40 has-[:checked]:border-plum has-[:checked]:bg-lavender has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-coral/30"
              >
                <input type="radio" name="service" value={o.value} defaultChecked={selectedService === o.value} className="size-4.5 accent-plum" />
                {o.label}
              </label>
            ))}
          </div>
          {errors.service && (
            <p id="service-error" className="mt-2 text-sm font-medium text-coral-ink">
              {errors.service}
            </p>
          )}
        </div>
        <Field id="description" label={fieldLabels.description!} required error={errors.description} hint="What are you building or fixing, and what would success look like?">
          {(a) => <Textarea {...a} name="description" rows={6} defaultValue={val(v, "description")} />}
        </Field>
      </fieldset>

      {/* Step 2 */}
      <fieldset hidden={step !== 1} className="space-y-6">
        <legend className="sr-only">Step 2 of 3: Scope and timing</legend>
        <h2 ref={(el) => { headingRefs.current[1] = el; }} tabIndex={-1} className="text-2xl font-bold outline-none sm:text-3xl">
          Scope and timing
        </h2>
        <p className="text-muted">All optional. A rough idea helps us suggest the right approach.</p>
        <Field id="company" label={fieldLabels.company!} error={errors.company} hint="Your company name or current website">
          {(a) => <Input {...a} name="company" autoComplete="organization" defaultValue={val(v, "company")} />}
        </Field>
        <div className="grid gap-6 sm:grid-cols-2">
          <Field id="budget" label={fieldLabels.budget!} error={errors.budget}>
            {(a) => <Select {...a} name="budget" options={budgetOptions} placeholder="Select a range" defaultValue={val(v, "budget")} />}
          </Field>
          <Field id="currency" label={fieldLabels.currency!} error={errors.currency}>
            {(a) => <Select {...a} name="currency" options={currencyOptions} placeholder="Select currency" defaultValue={val(v, "currency")} />}
          </Field>
        </div>
        <Field id="timeline" label={fieldLabels.timeline!} error={errors.timeline}>
          {(a) => <Select {...a} name="timeline" options={timelineOptions} placeholder="Select a timeline" defaultValue={val(v, "timeline")} />}
        </Field>
      </fieldset>

      {/* Step 3 */}
      <fieldset hidden={step !== 2} className="space-y-6">
        <legend className="sr-only">Step 3 of 3: Your details</legend>
        <h2 ref={(el) => { headingRefs.current[2] = el; }} tabIndex={-1} className="text-2xl font-bold outline-none sm:text-3xl">
          Where should we send our reply?
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          <Field id="name" label={fieldLabels.name!} required error={errors.name}>
            {(a) => <Input {...a} name="name" autoComplete="name" defaultValue={val(v, "name")} />}
          </Field>
          <Field id="email" label={fieldLabels.email!} required error={errors.email}>
            {(a) => <Input {...a} name="email" type="email" inputMode="email" autoComplete="email" defaultValue={val(v, "email")} />}
          </Field>
        </div>
        <ConsentField error={errors.consent} defaultChecked={val(v, "consent") === "yes"} />
      </fieldset>

      <div className="mt-10 flex flex-col-reverse gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        {step > 0 ? (
          <Button type="button" variant="outline" onClick={() => goTo(step - 1)}>
            <ArrowLeft aria-hidden="true" className="size-4" /> Back
          </Button>
        ) : (
          <span className="text-sm text-muted">Takes about two minutes.</span>
        )}
        {step < steps.length - 1 ? (
          <Button type="button" variant="plum" size="lg" onClick={next}>
            Continue <ArrowRight aria-hidden="true" className="size-4" />
          </Button>
        ) : (
          <SubmitButton pending={pending}>Send quote request</SubmitButton>
        )}
      </div>
    </form>
  );
}
