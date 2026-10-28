import type { Project } from "@/content/projects";
import { cn } from "@/lib/utils";

const themes = {
  plum: { bg: "bg-plum", ink: "text-ivory", soft: "bg-ivory/15", accent: "bg-coral", card: "bg-ivory/10" },
  coral: { bg: "bg-coral-soft", ink: "text-plum", soft: "bg-plum/10", accent: "bg-plum", card: "bg-white" },
  mint: { bg: "bg-mint", ink: "text-plum", soft: "bg-plum/10", accent: "bg-coral", card: "bg-white/70" },
} as const;

/** A drawn website preview for portfolio cards. Decorative: the project title is always rendered as real text nearby. */
export function BrowserMockup({ preview, className }: { preview: Project["preview"]; className?: string }) {
  const t = themes[preview.theme];
  return (
    <div aria-hidden="true" className={cn("overflow-hidden rounded-2xl border border-plum/10 bg-white shadow-soft", className)}>
      <div className="flex items-center gap-1.5 border-b border-plum/10 bg-white px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-coral" />
        <span className="size-2.5 rounded-full bg-sun" />
        <span className="size-2.5 rounded-full bg-mint-deep" />
        <span className="ml-3 h-4 flex-1 rounded-full bg-ivory-deep" />
      </div>
      <div className={cn("p-5 sm:p-7", t.bg, t.ink)}>
        <div className="flex items-center justify-between text-[0.7rem] font-semibold">
          <span className="font-display text-sm">{preview.name}</span>
          <span className="flex gap-2">
            <span className={cn("h-1.5 w-8 rounded-full", t.soft)} />
            <span className={cn("h-1.5 w-8 rounded-full", t.soft)} />
            <span className={cn("h-1.5 w-8 rounded-full", t.accent)} />
          </span>
        </div>
        <p className="mt-8 max-w-[16rem] font-display text-xl font-bold leading-tight sm:text-2xl">{preview.headline}</p>
        <span className={cn("mt-4 block h-6 w-24 rounded-full", t.accent)} />
        <div className="mt-8 grid grid-cols-3 gap-2.5">
          {[0, 1, 2].map((i) => (
            <span key={i} className={cn("block aspect-[4/3] rounded-xl", t.card)} />
          ))}
        </div>
      </div>
    </div>
  );
}
