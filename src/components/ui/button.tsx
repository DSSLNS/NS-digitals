import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "group/btn relative inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-[0.95rem] font-semibold transition-[background-color,color,box-shadow,transform] duration-300 ease-[var(--ease-studio)] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        primary: "bg-coral text-plum-deep shadow-[0_10px_24px_-12px_rgb(255_113_91/0.9)] hover:bg-[#ff8470] hover:shadow-[0_14px_30px_-12px_rgb(255_113_91/1)]",
        plum: "bg-plum text-ivory hover:bg-plum-deep",
        outline: "border border-plum/25 bg-white/60 text-plum hover:border-plum hover:bg-white",
        light: "bg-ivory text-plum hover:bg-white",
        "outline-light": "border border-ivory/40 text-ivory hover:border-ivory hover:bg-ivory/10",
      },
      size: {
        md: "",
        lg: "min-h-14 px-7 text-base",
        sm: "min-h-10 px-4 text-sm",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type Variants = VariantProps<typeof buttonVariants>;

const isExternal = (href: string) => /^https?:\/\//.test(href);

function Arrow({ external }: { external?: boolean }) {
  const Icon = external ? ArrowUpRight : ArrowRight;
  return <Icon aria-hidden="true" className="size-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-px" />;
}

/** Link styled as a button. External URLs open in a new tab and say so to assistive technology. */
export function ButtonLink({
  href,
  children,
  className,
  variant,
  size,
  arrow = true,
}: { href: string; children: React.ReactNode; className?: string; arrow?: boolean } & Variants) {
  const external = isExternal(href);
  const classes = cn(buttonVariants({ variant, size }), className);
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
        <span className="sr-only"> (opens in a new tab)</span>
        {arrow && <Arrow external />}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
      {arrow && <Arrow />}
    </Link>
  );
}

export function Button({ className, variant, size, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & Variants) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

/** Inline text link with an animated arrow, used for "Explore Service", "Read Article" and similar. */
export function ArrowLink({ href, children, className, srContext }: { href: string; children: React.ReactNode; className?: string; srContext?: string }) {
  return (
    <Link href={href} className={cn("group/link inline-flex items-center gap-1.5 rounded font-semibold text-plum", className)}>
      <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1.5px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-300 group-hover/link:bg-[length:100%_1.5px]">
        {children}
        {srContext && <span className="sr-only"> {srContext}</span>}
      </span>
      <ArrowRight aria-hidden="true" className="size-4 text-coral-ink transition-transform duration-300 group-hover/link:translate-x-1" />
    </Link>
  );
}
