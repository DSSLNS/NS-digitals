"use client";

import { useActionState, useState } from "react";
import { submitEnquiry } from "@/app/actions";
import { initialFormState, type FormState } from "@/lib/forms/options";
import { validateFields, type EnquiryField } from "@/lib/forms/schemas";

/** Fields validated as the visitor types; hidden/meta inputs (type, honeypot, timestamp) are ignored. */
const VALIDATED = new Set<string>(["name", "email", "company", "service", "budget", "currency", "timeline", "description", "consent"]);

const formValues = (form: HTMLFormElement) => Object.fromEntries(new FormData(form)) as Record<string, string>;

/**
 * Shared enquiry form logic: server action state + instant client-side validation using the
 * same zod schema the server uses. Fields validate on blur, and re-validate on input once they have an error.
 */
export function useEnquiry({ onServerResult }: { onServerResult?: (s: FormState) => void } = {}) {
  // The server action is passed directly (not wrapped) so the form keeps working without JavaScript.
  const [state, action, pending] = useActionState(submitEnquiry, initialFormState);

  /** Client verdicts per field: a message, or "" when the field is now valid (overrides any server error). */
  const [clientErrors, setClientErrors] = useState<Record<string, string>>({});
  const [summary, setSummary] = useState<string>();
  /** Incremented on every failed attempt; used as the error summary's key so it re-focuses each time. */
  const [attempt, setAttempt] = useState(0);

  // React to each new server result during render (not in an effect): server verdicts replace client
  // ones so server-only errors are never masked, and failed attempts re-focus the error summary.
  const [seen, setSeen] = useState(state);
  if (seen !== state) {
    setSeen(state);
    setClientErrors({});
    if (state.status === "error") setAttempt((a) => a + 1);
    onServerResult?.(state);
  }

  const errors: Record<string, string> = { ...(state.fieldErrors ?? {}) };
  for (const [k, v] of Object.entries(clientErrors)) {
    if (v) errors[k] = v;
    else delete errors[k];
  }

  const checkField = (form: HTMLFormElement, field: EnquiryField) => {
    const msg = validateFields(formValues(form), [field])[field] ?? "";
    setClientErrors((e) => ({ ...e, [field]: msg }));
    return msg;
  };

  /** Validates the given fields; returns true when all are valid and focuses the first invalid one otherwise. */
  const checkFields = (form: HTMLFormElement, fields: EnquiryField[]) => {
    const found = validateFields(formValues(form), fields);
    setClientErrors((e) => ({ ...e, ...Object.fromEntries(fields.map((f) => [f, found[f] ?? ""])) }));
    const first = fields.find((f) => found[f]);
    if (first) form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
    return !first;
  };

  const fieldName = (target: EventTarget) => {
    const name = (target as Partial<HTMLInputElement>).name;
    return name && VALIDATED.has(name) ? (name as EnquiryField) : undefined;
  };

  const fieldHandlers = {
    onBlur: (e: React.FocusEvent<HTMLFormElement>) => {
      const name = fieldName(e.target);
      if (name) checkField(e.currentTarget, name);
    },
    onChange: (e: React.FormEvent<HTMLFormElement>) => {
      const name = fieldName(e.target);
      if (name && errors[name]) checkField(e.currentTarget, name);
    },
  };

  /** Call from onSubmit with every field the form contains. Blocks submission when invalid and returns the errors found. */
  const guardSubmit = (e: React.FormEvent<HTMLFormElement>, fields: EnquiryField[]) => {
    const found = validateFields(formValues(e.currentTarget), fields);
    const invalid = fields.filter((f) => found[f]);
    setClientErrors(Object.fromEntries(fields.map((f) => [f, found[f] ?? ""])));
    if (invalid.length) {
      e.preventDefault();
      setAttempt((a) => a + 1);
      setSummary(`Please correct ${invalid.length === 1 ? "1 field" : `${invalid.length} fields`} before sending.`);
      return found;
    }
    setSummary(undefined);
    return null;
  };

  const hasErrors = Object.keys(errors).length > 0;
  // The client summary disappears once every field is fixed; server messages (e.g. delivery failures) stay.
  const summaryMessage = summary ? (hasErrors ? summary : undefined) : state.status === "error" ? state.message : undefined;

  return { state, action, pending, errors, summaryMessage, attempt, checkFields, fieldHandlers, guardSubmit };
}
