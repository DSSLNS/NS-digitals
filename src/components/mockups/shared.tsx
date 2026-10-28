/* eslint-disable @next/next/no-img-element -- mockups are rendered only for screenshot capture, never served to visitors */
import { cn } from "@/lib/utils";

/*
 * Building blocks for the concept-project mockups. Mockups are full website screens rendered at a
 * fixed size (desktop 1440×900, phone 390×844) and captured as screenshots by scripts/capture-mockups.mjs.
 */

export const serif = "[font-family:var(--mock-serif)]";
export const sans = "[font-family:var(--mock-sans)]";

/** Fills its nearest positioned parent, which must set a size. */
export function Photo({ name, className, position }: { name: string; className?: string; position?: string }) {
  return <img src={`/images/photos/${name}.jpg`} alt="" className={cn("absolute inset-0 size-full object-cover", className)} style={position ? { objectPosition: position } : undefined} />;
}

export function Desktop({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("relative h-[900px] w-[1440px] overflow-hidden", sans, className)}>{children}</div>;
}

export function Phone({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("relative h-[844px] w-[390px] overflow-hidden", sans, className)}>{children}</div>;
}

/** iOS-style status bar for phone screens. */
export function StatusBar({ dark }: { dark?: boolean }) {
  return (
    <div className={cn("flex h-11 items-center justify-between px-7 text-[15px] font-semibold", dark ? "text-white" : "text-black")}>
      <span>9:41</span>
      <span className="flex items-center gap-1.5">
        <span className="flex items-end gap-[2px]">
          {[4, 6, 8, 10].map((h) => (
            <span key={h} className={cn("w-[3px] rounded-sm", dark ? "bg-white" : "bg-black")} style={{ height: h }} />
          ))}
        </span>
        <span className={cn("ml-1 h-[11px] w-[22px] rounded-[3px] border p-[1.5px]", dark ? "border-white/60" : "border-black/40")}>
          <span className={cn("block h-full w-4/5 rounded-[1px]", dark ? "bg-white" : "bg-black")} />
        </span>
      </span>
    </div>
  );
}
