import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { siteConfig } from "@/config/site";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Absolute URL for a site path such as "/services/qa-testing". */
export function absoluteUrl(path = "/") {
  const p = path.startsWith("/") ? path : `/${path}`;
  return p === "/" ? siteConfig.url : `${siteConfig.url}${p}`;
}

export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(iso));
}

/** Rough reading time for article bodies (≈ 220 wpm). */
export function readingTime(text: string) {
  return Math.max(1, Math.round(text.trim().split(/\s+/).length / 220));
}
