"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { MoveHorizontal } from "lucide-react";
import { screenSrc, type ProjectScreen } from "@/content/projects";

/**
 * Before/after comparison. A native range input drives the split, so it works with mouse, touch
 * and keyboard (arrow keys, Home/End) and is announced by screen readers.
 */
export function BeforeAfter({ slug, before, after }: { slug: string; before: ProjectScreen; after: ProjectScreen }) {
  const [split, setSplit] = useState(50);
  const id = useId();
  const sizes = "(min-width: 1280px) 1200px, 94vw";
  return (
    <figure>
      <div className="relative aspect-[16/10] select-none overflow-hidden rounded-xl bg-ivory-deep shadow-lift ring-1 ring-plum/10">
        <Image src={screenSrc(slug, after.view)} alt={after.alt} fill sizes={sizes} className="object-cover object-top" />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}>
          <Image src={screenSrc(slug, before.view)} alt={before.alt} fill sizes={sizes} className="object-cover object-top" />
        </div>
        <span aria-hidden="true" className="absolute left-3 top-3 rounded-full bg-plum-deep/85 px-3 py-1 text-xs font-semibold text-ivory">
          Before
        </span>
        <span aria-hidden="true" className="absolute right-3 top-3 rounded-full bg-coral px-3 py-1 text-xs font-semibold text-plum-deep">
          After
        </span>
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_0_1px_rgb(73_38_83/0.25)]" style={{ left: `${split}%` }}>
          <span className="absolute top-1/2 left-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-plum shadow-lift">
            <MoveHorizontal className="size-5" />
          </span>
        </div>
        <label htmlFor={id} className="sr-only">
          Comparison position: drag or use arrow keys to reveal more of the before or after design
        </label>
        <input
          id={id}
          type="range"
          min={0}
          max={100}
          value={split}
          onChange={(e) => setSplit(Number(e.target.value))}
          aria-valuetext={`${split}% before, ${100 - split}% after`}
          className="peer absolute inset-0 size-full cursor-ew-resize opacity-0"
        />
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-xl ring-coral-strong ring-inset peer-focus-visible:ring-[3px]" />
      </div>
      <figcaption className="mt-3 text-sm text-muted">Drag the handle, or focus it and use the arrow keys, to compare the two designs.</figcaption>
    </figure>
  );
}
