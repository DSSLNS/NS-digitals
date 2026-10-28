import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { mockups } from "@/components/mockups/registry";

/** Index of capturable screens, read by scripts/capture-mockups.mjs. Only available when MOCKUPS=1. */
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function MockupIndex() {
  if (process.env.MOCKUPS !== "1") notFound();
  return (
    <ul className="p-10">
      {Object.entries(mockups).flatMap(([slug, views]) =>
        Object.keys(views).map((view) => (
          <li key={`${slug}/${view}`} data-screen={`${slug}/${view}`}>
            {slug}/{view}
          </li>
        )),
      )}
    </ul>
  );
}
