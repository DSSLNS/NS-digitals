import "server-only";

/**
 * Lead delivery. Configure one or both channels with environment variables:
 *  - Email via Resend: RESEND_API_KEY, LEADS_TO_EMAIL, LEADS_FROM_EMAIL
 *  - Webhook (CRM, Slack, HubSpot, n8n, Zapier…): LEADS_WEBHOOK_URL (+ optional LEADS_WEBHOOK_SECRET)
 * With neither configured, submissions are logged to the server console in development (or when
 * ALLOW_LOG_ONLY_LEADS=true). In production without a channel, delivery FAILS and the visitor sees an
 * error — the site never shows a success message for a lead nobody will receive.
 */

export class DeliveryNotConfiguredError extends Error {}

export type Lead = { kind: string; replyTo: string; fields: [string, string][] };

const escapeHtml = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

async function sendEmail(lead: Lead) {
  const subject = `${lead.kind}: ${lead.fields.find(([k]) => k === "Name")?.[1] ?? "New lead"}`;
  const text = lead.fields.map(([k, v]) => `${k}: ${v}`).join("\n");
  const html = `<h2>${escapeHtml(lead.kind)}</h2><table cellpadding="6">${lead.fields
    .map(([k, v]) => `<tr><th align="left" valign="top">${escapeHtml(k)}</th><td style="white-space:pre-wrap">${escapeHtml(v)}</td></tr>`)
    .join("")}</table>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.LEADS_FROM_EMAIL,
      to: process.env.LEADS_TO_EMAIL!.split(",").map((s) => s.trim()),
      reply_to: lead.replyTo,
      subject,
      text,
      html,
    }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`Resend responded ${res.status}: ${await res.text()}`);
}

async function sendWebhook(lead: Lead) {
  const res = await fetch(process.env.LEADS_WEBHOOK_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(process.env.LEADS_WEBHOOK_SECRET ? { Authorization: `Bearer ${process.env.LEADS_WEBHOOK_SECRET}` } : {}),
    },
    body: JSON.stringify({ kind: lead.kind, submittedAt: new Date().toISOString(), ...Object.fromEntries(lead.fields) }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
}

export async function deliverLead(lead: Lead) {
  const emailReady = Boolean(process.env.RESEND_API_KEY && process.env.LEADS_TO_EMAIL && process.env.LEADS_FROM_EMAIL);
  const webhookReady = Boolean(process.env.LEADS_WEBHOOK_URL);

  if (!emailReady && !webhookReady) {
    if (process.env.NODE_ENV !== "production" || process.env.ALLOW_LOG_ONLY_LEADS === "true") {
      console.info(`[leads] ${lead.kind} (log-only delivery)\n` + lead.fields.map(([k, v]) => `  ${k}: ${v}`).join("\n"));
      return;
    }
    throw new DeliveryNotConfiguredError("No lead delivery channel configured.");
  }

  // Succeed if at least one configured channel delivers.
  const results = await Promise.allSettled([emailReady ? sendEmail(lead) : null, webhookReady ? sendWebhook(lead) : null]);
  const attempted = results.filter((_, i) => (i === 0 ? emailReady : webhookReady));
  const failures = attempted.filter((r): r is PromiseRejectedResult => r.status === "rejected");
  failures.forEach((f) => console.error("[leads] delivery channel failed", f.reason));
  if (failures.length === attempted.length) throw new Error("All lead delivery channels failed.");
}
