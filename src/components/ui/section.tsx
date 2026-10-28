import { cn } from "@/lib/utils";

export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8", className)}>{children}</div>;
}

export function Section({ className, children, id, labelledBy }: { className?: string; children: React.ReactNode; id?: string; labelledBy?: string }) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn("relative py-20 sm:py-28", className)}>
      {children}
    </section>
  );
}

export function Eyebrow({ children, className, tone = "coral" }: { children: React.ReactNode; className?: string; tone?: "coral" | "light" }) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 font-display text-xs font-semibold uppercase tracking-[0.18em]",
        tone === "coral" ? "text-coral-ink" : "text-sun",
        className,
      )}
    >
      <span aria-hidden="true" className={cn("h-px w-6", tone === "coral" ? "bg-coral" : "bg-sun")} />
      {children}
    </p>
  );
}

/** Standard section heading block: eyebrow, h2 and optional lead paragraph. */
export function SectionHeading({
  id,
  eyebrow,
  title,
  lead,
  align = "left",
  className,
  dark,
}: {
  id?: string;
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  dark?: boolean;
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <Eyebrow tone={dark ? "light" : "coral"}>{eyebrow}</Eyebrow>}
      <h2 id={id} className={cn("mt-4 text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-[3.5rem]", dark && "text-ivory")}>
        {title}
      </h2>
      {lead && <p className={cn("mt-5 text-lg leading-relaxed", dark ? "text-ivory/80" : "text-muted")}>{lead}</p>}
    </div>
  );
}
