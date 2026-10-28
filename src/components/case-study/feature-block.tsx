import { AlertTriangle, CalendarClock, Check, FlaskConical, Monitor, Smartphone, X } from "lucide-react";
import type { Project, ProjectFeature } from "@/content/projects";
import { cn } from "@/lib/utils";
import { mockSans, mockSerif } from "@/components/mockups/fonts";
import { BrowserFrame } from "@/components/portfolio/screen-frame";
import { BeforeAfter } from "./before-after";

/*
 * The project-specific section of each case study. Every variant labels illustrative or sample
 * content as such; nothing here presents invented client results.
 */

const half = "(min-width: 1024px) 50vw, 94vw";

function DataLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-plum/40 bg-white px-3 py-1 text-xs font-semibold text-plum">
      <FlaskConical aria-hidden="true" className="size-3.5 text-coral-ink" />
      {children}
    </span>
  );
}

function Journey({ project, f }: { project: Project; f: Extract<ProjectFeature, { type: "journey" }> }) {
  return (
    <>
      <ol className="space-y-14">
        {f.steps.map((s, i) => (
          <li key={s.view} className={cn("grid items-center gap-8 lg:gap-14", i % 2 === 1 ? "lg:grid-cols-[1fr_1.6fr]" : "lg:grid-cols-[1.6fr_1fr]")}>
            <BrowserFrame slug={project.slug} view={s.view} domain={project.domain} alt={s.alt} sizes={half} className={cn(i % 2 === 1 && "lg:order-2")} />
            <div>
              <span className="font-display text-sm font-bold text-coral-ink">Step {i + 1}</span>
              <h3 className="mt-2 text-2xl font-bold">{s.title}</h3>
              {s.caption && <p className="mt-3 text-lg leading-relaxed text-charcoal/80">{s.caption}</p>}
            </div>
          </li>
        ))}
      </ol>
      <div className="mt-14 rounded-2xl bg-white p-6 sm:p-8">
        <h3 className="text-xl font-bold">Scenarios in the checkout test plan</h3>
        <ul className="mt-4 flex flex-wrap gap-2">
          {f.scenarios.map((s) => (
            <li key={s} className="inline-flex items-center gap-1.5 rounded-full bg-ivory px-3.5 py-1.5 text-sm font-medium text-plum">
              <Check aria-hidden="true" className="size-3.5 text-coral-ink" strokeWidth={3} /> {s}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

function StyleTile({ project, f }: { project: Project; f: Extract<ProjectFeature, { type: "style-tile" }> }) {
  return (
    <div className={cn(mockSerif.variable, mockSans.variable, "grid gap-8 lg:grid-cols-[1fr_1.6fr] lg:gap-12")}>
      <div className="space-y-6 rounded-2xl bg-white p-6 sm:p-8">
        <div>
          <h3 className="text-xl font-bold">Colour</h3>
          <ul className="mt-4 grid grid-cols-2 gap-3">
            {f.colors.map((c) => (
              <li key={c.hex} className="flex items-center gap-3">
                <span aria-hidden="true" className="size-12 shrink-0 rounded-xl ring-1 ring-plum/10" style={{ background: c.hex }} />
                <span className="text-sm">
                  <span className="block font-semibold text-plum">{c.name}</span>
                  <span className="font-mono text-muted">{c.hex}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold">Typography</h3>
          <ul className="mt-4 space-y-4">
            {f.fonts.map((t) => (
              <li key={t.name} className="flex items-center gap-4 border-t border-line pt-4">
                <span aria-hidden="true" className={cn("w-16 shrink-0 text-5xl leading-none text-plum", t.family === "serif" ? "[font-family:var(--mock-serif)]" : "[font-family:var(--mock-sans)]")}>
                  Aa
                </span>
                <span className="text-sm">
                  <span className="block font-semibold text-plum">{t.name}</span>
                  <span className="text-muted">{t.role}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="space-y-4">
        {f.screens.map((s) => (
          <figure key={s.view}>
            <BrowserFrame slug={project.slug} view={s.view} domain={project.domain} alt={s.alt} sizes={half} />
            {s.caption && <figcaption className="mt-3 text-sm text-muted">{s.caption}</figcaption>}
          </figure>
        ))}
      </div>
    </div>
  );
}

function Budget({ project, f }: { project: Project; f: Extract<ProjectFeature, { type: "budget" }> }) {
  return (
    <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:gap-12">
      <div className="space-y-4">
        {f.screens.map((s) => (
          <figure key={s.view}>
            <BrowserFrame slug={project.slug} view={s.view} domain={project.domain} alt={s.alt} sizes={half} />
            {s.caption && <figcaption className="mt-3 text-sm text-muted">{s.caption}</figcaption>}
          </figure>
        ))}
      </div>
      <div className="rounded-2xl bg-white p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-xl font-bold">Performance budget</h3>
          <DataLabel>Targets, not results</DataLabel>
        </div>
        <dl className="mt-5 divide-y divide-line">
          {f.budgets.map((b) => (
            <div key={b.metric} className="grid grid-cols-[1fr_auto] items-baseline gap-x-4 py-4">
              <dt className="font-semibold text-plum">{b.metric}</dt>
              <dd className="font-display font-bold text-coral-ink">{b.target}</dd>
              <dd className="col-span-2 mt-1 text-sm leading-relaxed text-muted">{b.why}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

function BeforeAfterBlock({ project, f }: { project: Project; f: Extract<ProjectFeature, { type: "before-after" }> }) {
  return (
    <>
      <BeforeAfter slug={project.slug} before={f.before} after={f.after} />
      <div className="mt-12 overflow-hidden rounded-2xl bg-white">
        <table className="w-full text-left text-sm sm:text-base">
          <caption className="sr-only">What changed in the redesign</caption>
          <thead className="bg-plum text-ivory">
            <tr>
              <th scope="col" className="px-4 py-3 font-display font-semibold sm:px-6">
                Area
              </th>
              <th scope="col" className="px-4 py-3 font-display font-semibold sm:px-6">
                Before
              </th>
              <th scope="col" className="px-4 py-3 font-display font-semibold sm:px-6">
                After
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {f.changes.map((c) => (
              <tr key={c.area} className="align-top">
                <th scope="row" className="px-4 py-4 font-semibold text-plum sm:px-6">
                  {c.area}
                </th>
                <td className="px-4 py-4 text-muted sm:px-6">
                  <span className="flex gap-2">
                    <X aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-coral-ink" />
                    {c.before}
                  </span>
                </td>
                <td className="px-4 py-4 text-charcoal sm:px-6">
                  <span className="flex gap-2">
                    <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-[#1f7a52]" strokeWidth={2.5} />
                    {c.after}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function IssueLog({ f }: { f: Extract<ProjectFeature, { type: "issue-log" }> }) {
  return (
    <ol className="grid gap-5 md:grid-cols-2">
      {f.issues.map((i) => (
        <li key={i.id} className="flex flex-col rounded-2xl bg-white p-6 sm:p-7">
          <div className="flex items-center justify-between gap-3">
            <span className="font-mono text-sm font-semibold text-muted">{i.id}</span>
            <span className="rounded-full bg-ivory-deep px-3 py-1 text-xs font-semibold text-plum">{i.area}</span>
          </div>
          <p className="mt-4 flex gap-2.5 text-lg font-semibold leading-snug text-plum">
            <AlertTriangle aria-hidden="true" className="mt-1 size-5 shrink-0 text-coral-ink" />
            {i.symptom}
          </p>
          <dl className="mt-5 space-y-3 border-t border-line pt-5 text-sm leading-relaxed">
            {(
              [
                ["Root cause", i.cause],
                ["Fix", i.fix],
                ["Regression check", i.check],
              ] as const
            ).map(([k, v]) => (
              <div key={k} className="grid gap-1 sm:grid-cols-[8.5rem_1fr]">
                <dt className="font-semibold text-plum">{k}</dt>
                <dd className="text-charcoal/80">{v}</dd>
              </div>
            ))}
          </dl>
        </li>
      ))}
    </ol>
  );
}

function QaReport({ f }: { f: Extract<ProjectFeature, { type: "qa-report" }> }) {
  const total = f.suites.reduce(
    (t, s) => ({ cases: t.cases + s.cases, passed: t.passed + s.passed, failed: t.failed + s.failed, blocked: t.blocked + s.blocked }),
    { cases: 0, passed: 0, failed: 0, blocked: 0 },
  );
  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-xl font-bold">Test cycle summary</h3>
          <DataLabel>Demonstration data</DataLabel>
        </div>
        <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {(
            [
              ["Test cases", total.cases, "bg-ivory"],
              ["Passed", total.passed, "bg-mint"],
              ["Failed", total.failed, "bg-coral-soft"],
              ["Blocked", total.blocked, "bg-[#fff0c2]"],
            ] as const
          ).map(([k, v, bg]) => (
            <div key={k} className={cn("rounded-xl p-4", bg)}>
              <dt className="text-sm font-medium text-plum">{k}</dt>
              <dd className="mt-1 font-display text-3xl font-bold text-plum">{v}</dd>
            </div>
          ))}
        </dl>
        {/* Focusable so keyboard users can scroll the table on small screens. */}
        <div className="mt-8 overflow-x-auto" tabIndex={0} role="region" aria-label="Results by test suite">
          <table className="w-full min-w-[36rem] text-left text-sm">
            <caption className="sr-only">Results by test suite (demonstration data)</caption>
            <thead>
              <tr className="border-b border-line text-muted">
                <th scope="col" className="py-2 pr-4 font-medium">
                  Suite
                </th>
                <th scope="col" className="py-2 pr-4 font-medium">
                  Scope
                </th>
                <th scope="col" className="w-48 py-2 pr-4 font-medium">
                  Result
                </th>
                <th scope="col" className="py-2 text-right font-medium">
                  Pass / fail / blocked
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {f.suites.map((s) => (
                <tr key={s.name}>
                  <th scope="row" className="py-3 pr-4 font-semibold text-plum">
                    {s.name}
                  </th>
                  <td className="py-3 pr-4 text-muted">{s.scope}</td>
                  <td className="py-3 pr-4">
                    <span aria-hidden="true" className="flex h-2 overflow-hidden rounded-full bg-ivory-deep">
                      <span className="bg-mint-deep" style={{ width: `${(s.passed / s.cases) * 100}%` }} />
                      <span className="bg-coral" style={{ width: `${(s.failed / s.cases) * 100}%` }} />
                      <span className="bg-sun" style={{ width: `${(s.blocked / s.cases) * 100}%` }} />
                    </span>
                  </td>
                  <td className="py-3 text-right font-mono tabular-nums text-charcoal">
                    {s.passed} / {s.failed} / {s.blocked}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-2 text-sm">
          <span className="font-semibold text-plum">Browsers and devices:</span>
          {f.browsers.map((b) => (
            <span key={b} className="inline-flex items-center gap-1.5 rounded-full bg-ivory px-3 py-1 text-plum">
              {b.startsWith("iOS") || b.startsWith("Android") ? <Smartphone aria-hidden="true" className="size-3.5" /> : <Monitor aria-hidden="true" className="size-3.5" />}
              {b}
            </span>
          ))}
        </div>
      </div>
      <article className="rounded-2xl border border-plum/10 bg-white p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-sm font-semibold text-muted">{f.defect.id}</span>
          <span className="rounded-full bg-coral-soft px-3 py-1 text-xs font-semibold text-coral-ink">Severity: {f.defect.severity}</span>
          <span className="rounded-full bg-mint px-3 py-1 text-xs font-semibold text-plum">{f.defect.status}</span>
          <DataLabel>Sample defect report</DataLabel>
        </div>
        <h3 className="mt-4 text-xl font-bold">{f.defect.title}</h3>
        <div className="mt-5 grid gap-6 md:grid-cols-3">
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.14em] text-coral-ink">Steps to reproduce</h4>
            <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm leading-relaxed">
              {f.defect.steps.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.14em] text-coral-ink">Expected</h4>
            <p className="mt-2 text-sm leading-relaxed">{f.defect.expected}</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.14em] text-coral-ink">Actual</h4>
            <p className="mt-2 text-sm leading-relaxed">{f.defect.actual}</p>
          </div>
        </div>
      </article>
    </div>
  );
}

function SeoProcess({ f }: { f: Extract<ProjectFeature, { type: "seo-process" }> }) {
  return (
    <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:gap-12">
      <ol className="min-w-0 space-y-3">
        {f.steps.map((s, i) => (
          <li key={s.title} className="flex gap-5 rounded-2xl bg-white p-5 sm:p-6">
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-plum font-display text-sm font-bold text-ivory">{i + 1}</span>
            <div>
              <h3 className="text-lg font-bold">{s.title}</h3>
              <p className="mt-1 leading-relaxed text-muted">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className="min-w-0 space-y-6">
        <div className="rounded-2xl bg-white p-6 sm:p-8">
          <h3 className="text-xl font-bold">Core Web Vitals: &ldquo;good&rdquo; thresholds</h3>
          <dl className="mt-5 space-y-4">
            {f.vitals.map((v) => (
              <div key={v.metric} className="grid grid-cols-[1fr_auto] items-start gap-x-4 border-t border-line pt-4">
                <dt className="font-display text-lg font-bold text-plum">{v.metric}</dt>
                <dd className="row-span-2 rounded-full bg-mint px-3 py-1 font-semibold text-plum">{v.good}</dd>
                <dd className="text-sm text-muted">{v.meaning}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 text-sm text-muted">
            Thresholds as published by Google at{" "}
            <a href="https://web.dev/articles/vitals" target="_blank" rel="noopener noreferrer" className="font-medium text-coral-ink underline underline-offset-4">
              web.dev/articles/vitals
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            , measured at the 75th percentile of page loads.
          </p>
        </div>
        <figure className="overflow-hidden rounded-2xl bg-plum-deep">
          <figcaption className="border-b border-ivory/10 px-5 py-3 text-sm font-semibold text-ivory/80">Tour page metadata (excerpt)</figcaption>
          <pre tabIndex={0} aria-label="Tour page metadata example" className="overflow-x-auto p-5 text-[0.8rem] leading-relaxed text-mint">
            <code>{f.snippet}</code>
          </pre>
        </figure>
      </div>
    </div>
  );
}

function Maintenance({ f }: { f: Extract<ProjectFeature, { type: "maintenance" }> }) {
  return (
    <>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {f.cadence.map((c) => (
          <li key={c.period} className="rounded-2xl bg-white p-6">
            <h3 className="flex items-center gap-2 text-lg font-bold">
              <CalendarClock aria-hidden="true" className="size-5 text-coral-ink" strokeWidth={1.75} />
              {c.period}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm leading-relaxed">
              {c.tasks.map((t) => (
                <li key={t} className="flex gap-2">
                  <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-coral-ink" strokeWidth={2.5} />
                  {t}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <div className="mt-8 rounded-2xl bg-white p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-xl font-bold">Sample monthly log</h3>
          <DataLabel>Sample data</DataLabel>
        </div>
        <ol className="mt-5 divide-y divide-line">
          {f.log.map((l) => (
            <li key={l.date} className="grid gap-2 py-4 sm:grid-cols-[6rem_8rem_1fr] sm:gap-4">
              <span className="font-mono text-sm text-muted">{l.date}</span>
              <span>
                <span className="rounded-full bg-lavender px-3 py-1 text-xs font-semibold text-plum">{l.type}</span>
              </span>
              <span className="leading-relaxed">{l.entry}</span>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}

export function FeatureBlock({ project }: { project: Project }) {
  const f = project.feature;
  switch (f.type) {
    case "journey":
      return <Journey project={project} f={f} />;
    case "style-tile":
      return <StyleTile project={project} f={f} />;
    case "budget":
      return <Budget project={project} f={f} />;
    case "before-after":
      return <BeforeAfterBlock project={project} f={f} />;
    case "issue-log":
      return <IssueLog f={f} />;
    case "qa-report":
      return <QaReport f={f} />;
    case "seo-process":
      return <SeoProcess f={f} />;
    case "maintenance":
      return <Maintenance f={f} />;
  }
}
