"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, CircleAlert, CircleCheck, LoaderCircle } from "lucide-react";
import { HONEYPOT_FIELD, TIMESTAMP_FIELD } from "@/lib/forms/options";
import { Button, ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type A11yProps = { id: string; "aria-invalid"?: true; "aria-describedby"?: string; "aria-required"?: true };

const control =
  "block w-full rounded-2xl border border-plum/15 bg-white px-4 py-3.5 text-base text-charcoal shadow-[inset_0_1px_2px_rgb(73_38_83/0.04)] transition-[border-color,box-shadow] placeholder:text-muted/70 hover:border-plum/30 focus:border-plum focus:outline-none focus:ring-4 focus:ring-coral/25 aria-[invalid=true]:border-coral-ink aria-[invalid=true]:ring-coral-ink/15";

/** Label + control + hint + error, wired together with aria-describedby / aria-invalid. */
export function Field({
  id,
  label,
  required,
  hint,
  error,
  children,
  className,
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: (a: A11yProps) => React.ReactNode;
  className?: string;
}) {
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(" ") || undefined;
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-plum">
        {label}
        {required ? (
          <span className="text-coral-ink"> *</span>
        ) : (
          <span className="font-normal text-muted"> (optional)</span>
        )}
      </label>
      {children({ id, "aria-describedby": describedBy, ...(error ? { "aria-invalid": true as const } : {}), ...(required ? { "aria-required": true as const } : {}) })}
      {hint && (
        <p id={`${id}-hint`} className="mt-2 text-sm text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-2 flex items-start gap-1.5 text-sm font-medium text-coral-ink">
          <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn(control, "min-h-13", props.className)} />;
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={cn(control, "min-h-36 resize-y", props.className)} />;
}

export function Select({
  options,
  placeholder,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & { options: readonly { value: string; label: string }[]; placeholder: string }) {
  return (
    <div className="relative">
      <select {...props} className={cn(control, "min-h-13 appearance-none pr-11", props.className)}>
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-plum" />
    </div>
  );
}

/** Required privacy consent checkbox. */
export function ConsentField({ error, defaultChecked }: { error?: string; defaultChecked?: boolean }) {
  return (
    <div>
      <div className="flex items-start gap-3">
        <input
          id="consent"
          name="consent"
          type="checkbox"
          value="yes"
          defaultChecked={defaultChecked}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "consent-error" : undefined}
          aria-required
          className="mt-0.5 size-5 shrink-0 cursor-pointer rounded-md border-plum/30 accent-plum"
        />
        <label htmlFor="consent" className="text-sm leading-relaxed text-charcoal">
          I agree that NS Digital Solutions may use these details to respond to my enquiry, as described in the{" "}
          <Link href="/privacy-policy" className="font-semibold text-plum underline underline-offset-2">
            Privacy Policy
          </Link>
          . <span className="text-coral-ink">*</span>
        </label>
      </div>
      {error && (
        <p id="consent-error" className="mt-2 flex items-start gap-1.5 pl-8 text-sm font-medium text-coral-ink">
          <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

/** Honeypot + render timestamp. Hidden from people, visually and programmatically. */
export function SpamProtection() {
  const [renderedAt, setRenderedAt] = useState("");
  // eslint-disable-next-line react-hooks/set-state-in-effect -- timestamp must be taken on the client after hydration
  useEffect(() => setRenderedAt(String(Date.now())), []);
  return (
    <>
      <input type="hidden" name={TIMESTAMP_FIELD} value={renderedAt} />
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={HONEYPOT_FIELD}>Leave this field empty</label>
        <input id={HONEYPOT_FIELD} name={HONEYPOT_FIELD} type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>
    </>
  );
}

/** Error summary, focused and announced when shown, with links to each invalid field. */
export function ErrorSummary({ message, errors, labels }: { message?: string; errors: Record<string, string>; labels: Record<string, string> }) {
  const ref = useRef<HTMLDivElement>(null);
  const entries = Object.entries(errors).filter(([, v]) => v);
  // Render with key={attempt} so this runs once per failed attempt, not on every keystroke.
  useEffect(() => {
    if (message) ref.current?.focus();
  }, [message]);
  if (!message) return null;
  return (
    <div ref={ref} tabIndex={-1} role="alert" className="rounded-2xl border border-coral/50 bg-coral-soft p-5 text-sm text-plum-deep outline-none">
      <p className="flex items-center gap-2 font-semibold">
        <CircleAlert aria-hidden="true" className="size-4.5 text-coral-ink" />
        {message}
      </p>
      {entries.length > 0 && (
        <ul className="mt-2 list-disc space-y-1 pl-11">
          {entries.map(([field, msg]) => (
            <li key={field}>
              <a href={`#${field}`} className="underline underline-offset-2">
                {labels[field] ?? field}: {msg}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function SubmitButton({ pending, children, className }: { pending: boolean; children: React.ReactNode; className?: string }) {
  return (
    <Button type="submit" size="lg" disabled={pending} className={cn("w-full sm:w-auto", className)}>
      {pending ? (
        <>
          <LoaderCircle aria-hidden="true" className="size-5 animate-spin" />
          Sending…
        </>
      ) : (
        children
      )}
    </Button>
  );
}

/** Shown only after the server confirms delivery. */
export function SuccessPanel({ title, children }: { title: string; children: React.ReactNode }) {
  const ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => ref.current?.focus(), []);
  return (
    <div role="status" className="rounded-[1.75rem] bg-mint p-8 text-center sm:p-12">
      <CircleCheck aria-hidden="true" className="mx-auto size-14 text-plum" strokeWidth={1.5} />
      <h2 ref={ref} tabIndex={-1} className="mt-5 text-3xl font-bold outline-none">
        {title}
      </h2>
      <div className="mx-auto mt-3 max-w-md leading-relaxed text-charcoal/85">{children}</div>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/insights" variant="outline">
          Read our insights
        </ButtonLink>
        <ButtonLink href="/work" variant="plum">
          See our work
        </ButtonLink>
      </div>
    </div>
  );
}

export const val = (v: Record<string, string> | undefined, k: string) => v?.[k] ?? "";
