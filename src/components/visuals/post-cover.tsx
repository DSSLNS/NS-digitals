import type { Post } from "@/content/posts";
import { cn } from "@/lib/utils";

const covers: Record<Post["cover"], { bg: string; shape: string; accent: string; lines: string; grid: string }> = {
  plum: { bg: "bg-plum", shape: "bg-coral", accent: "border-sun", lines: "bg-ivory/30", grid: "grid-lines-dark" },
  coral: { bg: "bg-coral-soft", shape: "bg-coral", accent: "border-plum", lines: "bg-plum/25", grid: "grid-lines" },
  mint: { bg: "bg-mint", shape: "bg-white", accent: "border-plum", lines: "bg-plum/25", grid: "grid-lines" },
  lavender: { bg: "bg-lavender", shape: "bg-coral", accent: "border-mint-deep", lines: "bg-plum/25", grid: "grid-lines" },
  sun: { bg: "bg-[#fff0c2]", shape: "bg-coral", accent: "border-plum", lines: "bg-plum/25", grid: "grid-lines" },
};

/** Generated editorial cover art for articles, so no stock photography is needed. Decorative. */
export function PostCover({ cover, className }: { cover: Post["cover"]; className?: string }) {
  const c = covers[cover];
  return (
    <div aria-hidden="true" className={cn("relative overflow-hidden", c.bg, className)}>
      <div className={cn("absolute inset-0 opacity-70", c.grid)} />
      <span className={cn("absolute -bottom-12 -right-10 size-44 rounded-full transition-transform duration-700 ease-[var(--ease-studio)] group-hover:scale-110", c.shape)} />
      <span className={cn("absolute right-24 top-6 size-14 rounded-2xl border-[5px] transition-transform duration-700 ease-[var(--ease-studio)] group-hover:rotate-45", c.accent)} />
      <span className="absolute bottom-7 left-7 flex w-2/5 flex-col gap-2">
        <span className={cn("h-2.5 w-full rounded-full", c.lines)} />
        <span className={cn("h-2.5 w-4/5 rounded-full", c.lines)} />
        <span className={cn("h-2.5 w-3/5 rounded-full", c.lines)} />
      </span>
    </div>
  );
}
