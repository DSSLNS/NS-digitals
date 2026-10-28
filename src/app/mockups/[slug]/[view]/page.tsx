import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { mockSans, mockSerif } from "@/components/mockups/fonts";
import { mockups } from "@/components/mockups/registry";

/*
 * Internal capture route for portfolio screenshots. It only exists when MOCKUPS=1 (see
 * scripts/capture-mockups.mjs); in normal builds no pages are generated and every URL 404s.
 */

const enabled = process.env.MOCKUPS === "1";

type Props = { params: Promise<{ slug: string; view: string }> };

export const metadata: Metadata = { robots: { index: false, follow: false } };
export const dynamicParams = false;

export function generateStaticParams() {
  if (!enabled) return [];
  return Object.entries(mockups).flatMap(([slug, views]) => Object.keys(views).map((view) => ({ slug, view })));
}

export default async function MockupPage({ params }: Props) {
  const { slug, view } = await params;
  const Screen = enabled ? mockups[slug]?.[view] : undefined;
  if (!Screen) notFound();
  return (
    <div data-mockup className={`${mockSerif.variable} ${mockSans.variable} fixed left-0 top-0 z-[1000] bg-white`}>
      <Screen />
    </div>
  );
}
