import { Plus } from "lucide-react";
import { faqSchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";

/** Accessible FAQ accordion built on native <details>, so it works without JavaScript and with every assistive technology. */
export function FaqList({ faqs, withSchema = true }: { faqs: { q: string; a: string }[]; withSchema?: boolean }) {
  return (
    <>
      {withSchema && <JsonLd data={faqSchema(faqs)} />}
      <div className="divide-y divide-plum/10 border-y border-plum/10">
        {faqs.map((f) => (
          <details key={f.q} className="group py-2 [&[open]_.faq-icon]:rotate-45">
            <summary className="flex items-center justify-between gap-6 rounded-xl py-4 font-display text-lg font-semibold text-plum">
              <h3 className="text-lg">{f.q}</h3>
              <span className="faq-icon grid size-9 shrink-0 place-items-center rounded-full bg-white text-coral-ink ring-1 ring-plum/10 transition-transform duration-300">
                <Plus aria-hidden="true" className="size-4" />
              </span>
            </summary>
            <p className="max-w-3xl pb-5 pr-12 leading-relaxed text-muted">{f.a}</p>
          </details>
        ))}
      </div>
    </>
  );
}
