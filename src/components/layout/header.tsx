"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { navigation } from "@/config/site";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";

export type NavService = { slug: string; label: string; blurb: string };

const isActive = (pathname: string, href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`));

export function Header({ services }: { services: NavService[] }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the route changes (state adjusted during render, not in an effect).
  const [menuPath, setMenuPath] = useState(pathname);
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setMobileOpen(false);
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500",
        scrolled || mobileOpen ? "bg-ivory/85 shadow-[0_1px_0_rgb(73_38_83/0.08)] backdrop-blur-xl" : "bg-transparent",
      )}
    >
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-plum px-5 py-3 font-semibold text-ivory focus:not-sr-only focus:absolute focus:left-4 focus:top-3"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
        <Logo />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navigation.main.map((item) =>
              item.menu === "services" ? (
                <li key={item.href}>
                  <ServicesMenu services={services} active={isActive(pathname, item.href)} />
                </li>
              ) : (
                <li key={item.href}>
                  <NavLink href={item.href} active={isActive(pathname, item.href)}>
                    {item.label}
                  </NavLink>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink href="/request-a-quote" size="sm" className="hidden sm:inline-flex">
            Start a Project
          </ButtonLink>
          <MobileMenu open={mobileOpen} setOpen={setMobileOpen} services={services} pathname={pathname} />
        </div>
      </div>
    </header>
  );
}

function NavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className="group relative inline-flex h-10 items-center rounded-full px-3.5 text-[0.95rem] font-medium text-plum"
    >
      {children}
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-x-3.5 bottom-1.5 h-0.5 origin-left rounded-full bg-coral transition-transform duration-300 ease-[var(--ease-studio)]",
          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
        )}
      />
    </Link>
  );
}

function ServicesMenu({ services, active }: { services: NavService[]; active: boolean }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const wrapRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const pathname = usePathname();
  const [openPath, setOpenPath] = useState(pathname);
  if (openPath !== pathname) {
    setOpenPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Hover opens on mouse devices; touch and keyboard use the button.
  const onEnter = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const onLeave = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    closeTimer.current = setTimeout(() => setOpen(false), 160);
  };

  return (
    <div
      ref={wrapRef}
      className="relative"
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      onBlur={(e) => {
        if (!wrapRef.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
        className="group relative inline-flex h-10 items-center gap-1 rounded-full px-3.5 text-[0.95rem] font-medium text-plum"
      >
        Services
        <ChevronDown aria-hidden="true" className={cn("size-4 transition-transform duration-300", open && "rotate-180")} />
        <span
          aria-hidden="true"
          className={cn(
            "absolute inset-x-3.5 bottom-1.5 h-0.5 origin-left rounded-full bg-coral transition-transform duration-300",
            active || open ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
          )}
        />
      </button>

      {/* Positioning wrapper stays static so Motion's transform doesn't override the centring translate. */}
      <div className={cn("absolute left-1/2 top-full z-50 w-[min(44rem,90vw)] -translate-x-1/2 pt-3", !open && "pointer-events-none")}>
      <AnimatePresence>
        {open && (
          <m.div
            id={panelId}
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98, transition: { duration: 0.18 } }}
            transition={{ duration: 0.35 }}
          >
            <div className="grid grid-cols-[1fr_14rem] overflow-hidden rounded-3xl border border-line bg-white shadow-lift">
              <ul className="grid grid-cols-2 gap-1 p-3">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services/${s.slug}`} className="block rounded-2xl p-3 transition-colors hover:bg-ivory focus-visible:bg-ivory">
                      <span className="block font-display font-semibold text-plum">{s.label}</span>
                      <span className="mt-0.5 block text-sm leading-snug text-muted">{s.blurb}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col justify-between bg-plum p-6 text-ivory">
                <div>
                  <p className="font-display text-lg font-semibold leading-snug">Development and QA under one roof.</p>
                  <p className="mt-2 text-sm text-ivory/75">Not sure which service fits? Tell us what you need.</p>
                </div>
                <div className="mt-6 space-y-3 text-sm font-semibold">
                  <Link href="/services" className="flex items-center gap-1.5 rounded text-sun hover:underline">
                    All services <ArrowRight aria-hidden="true" className="size-4" />
                  </Link>
                  <Link href="/contact" className="flex items-center gap-1.5 rounded hover:underline">
                    Talk to us <ArrowRight aria-hidden="true" className="size-4" />
                  </Link>
                </div>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
      </div>
    </div>
  );
}

function MobileMenu({
  open,
  setOpen,
  services,
  pathname,
}: {
  open: boolean;
  setOpen: (o: boolean) => void;
  services: NavService[];
  pathname: string;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  const close = useCallback(() => {
    setOpen(false);
    buttonRef.current?.focus();
  }, [setOpen]);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return close();
      if (e.key !== "Tab" || !panelRef.current) return;
      // Keep focus inside the menu (and its toggle button) while it is open.
      const focusables = [buttonRef.current, ...panelRef.current.querySelectorAll<HTMLElement>("a, button")].filter(Boolean) as HTMLElement[];
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };
  // The panel is portalled to <body>: the header's backdrop-filter would otherwise become the containing
  // block for this position:fixed panel and collapse it to the header's height.
  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  return (
    <div className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen(!open)}
        className="inline-flex size-12 items-center justify-center rounded-full border border-plum/15 bg-white/70 text-plum"
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        {open ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
      </button>

      {isClient &&
        createPortal(
      <AnimatePresence>
        {open && (
          <m.div
            ref={panelRef}
            id={panelId}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)", transition: { duration: 0.25 } }}
            transition={{ duration: 0.5 }}
            className="fixed inset-x-0 bottom-0 top-20 z-40 overflow-y-auto bg-ivory lg:hidden"
          >
            <m.nav aria-label="Mobile" className="px-5 pb-10 pt-4 sm:px-8" initial="hidden" animate="show" transition={{ staggerChildren: 0.05, delayChildren: 0.1 }}>
              <ul className="divide-y divide-line border-y border-line">
                {navigation.main.map((link) => (
                  <m.li key={link.href} variants={item}>
                    <Link
                      href={link.href}
                      aria-current={isActive(pathname, link.href) ? "page" : undefined}
                      className="flex items-center justify-between py-4 font-display text-2xl font-semibold text-plum aria-[current=page]:text-coral-ink"
                    >
                      {link.label}
                      <ArrowRight aria-hidden="true" className="size-5 text-coral-ink" />
                    </Link>
                  </m.li>
                ))}
              </ul>
              <m.div variants={item} className="mt-8">
                <p className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-coral-ink">Services</p>
                <ul className="mt-3 grid gap-1 sm:grid-cols-2">
                  {services.map((s) => (
                    <li key={s.slug}>
                      <Link href={`/services/${s.slug}`} className="block rounded-xl py-2 font-medium text-plum">
                        {s.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </m.div>
              <m.div variants={item} className="mt-8 grid gap-3 sm:grid-cols-2">
                <ButtonLink href="/request-a-quote" size="lg">
                  Start a Project
                </ButtonLink>
                <ButtonLink href="/contact" variant="outline" size="lg">
                  Let&apos;s Talk
                </ButtonLink>
              </m.div>
            </m.nav>
          </m.div>
        )}
      </AnimatePresence>,
          document.body,
        )}
    </div>
  );
}
