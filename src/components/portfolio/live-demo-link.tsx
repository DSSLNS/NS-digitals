import { ArrowUpRight, Clock } from "lucide-react";
import { liveDemoUrl, type LiveDemo } from "@/content/projects";
import { cn } from "@/lib/utils";

/**
 * "Explore live demo" action. Opens the verified demo in a new tab; while a demo is not live it renders
 * an informative, non-interactive status instead of a link, so there is never a broken or placeholder URL.
 */
export function LiveDemoLink({ demo, name, variant = "inline", className }: { demo: LiveDemo; name: string; variant?: "inline" | "button"; className?: string }) {
  const url = liveDemoUrl({ liveDemo: demo });
  if (!url) {
    return (
      <span className={cn("inline-flex items-center gap-1.5 text-sm font-medium text-muted", className)}>
        <Clock aria-hidden="true" className="size-4" />
        Live demo coming soon
      </span>
    );
  }
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      data-live-demo
      className={cn(
        "group/demo inline-flex items-center justify-center gap-1.5 rounded-full font-semibold transition-[background-color,border-color,color] duration-300 focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-coral-strong",
        variant === "button"
          ? "min-h-14 bg-coral px-7 text-base text-plum-deep shadow-[0_10px_24px_-12px_rgb(255_113_91/0.9)] hover:bg-[#ff8470]"
          : "min-h-10 border border-plum/20 bg-white px-4 text-sm text-plum hover:border-plum hover:bg-plum hover:text-ivory",
        className,
      )}
    >
      Explore live demo
      <span className="sr-only">: {name} (opens in a new tab)</span>
      <ArrowUpRight aria-hidden="true" className="size-4 transition-transform duration-300 group-hover/demo:-translate-y-px group-hover/demo:translate-x-0.5" />
    </a>
  );
}
