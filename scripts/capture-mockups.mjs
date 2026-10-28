/**
 * Captures the concept-project mockups as screenshots for the portfolio.
 *
 *   npm run mockups:capture                 # every screen
 *   npm run mockups:capture -- atelier,home # only screens matching any of the comma-separated terms
 *
 * Starts `next dev` with MOCKUPS=1 (which enables the /mockups capture route), screenshots each
 * screen and writes public/images/work/<slug>/<view>.jpg. Desktop screens are 1440×900; phone
 * screens ("mobile*" views) are 390×844 at 2× pixel density.
 */
import { spawn } from "node:child_process";
import { mkdir } from "node:fs/promises";
import { chromium } from "@playwright/test";

const PORT = 3200;
const base = `http://localhost:${PORT}`;
const filter = process.argv[2] ?? "";

const server = spawn("npx", ["next", "dev", "-p", String(PORT)], { env: { ...process.env, MOCKUPS: "1" }, stdio: ["ignore", "pipe", "inherit"] });
await new Promise((resolve, reject) => {
  server.stdout.on("data", (d) => String(d).includes("Ready") && resolve());
  server.on("exit", (code) => reject(new Error(`next dev exited with ${code}`)));
});

const browser = await chromium.launch();
try {
  const index = await (await fetch(`${base}/mockups`)).text();
  const screens = [...index.matchAll(/data-screen="([^"]+)"/g)].map((m) => m[1]).filter((s) => filter.split(",").some((f) => s.includes(f)));
  if (!screens.length) throw new Error("No screens found. Is the /mockups index rendering?");
  for (const key of screens) {
    const [slug, view] = key.split("/");
    const mobile = view.startsWith("mobile");
    const page = await browser.newPage({
      viewport: mobile ? { width: 390, height: 844 } : { width: 1440, height: 900 },
      deviceScaleFactor: mobile ? 2 : 1,
      reducedMotion: "reduce",
    });
    await page.goto(`${base}/mockups/${key}`, { waitUntil: "networkidle" });
    await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all([...document.images].map((img) => (img.complete ? null : new Promise((r) => (img.onload = img.onerror = r)))));
    });
    // Hide the Next.js dev indicator.
    await page.addStyleTag({ content: "nextjs-portal{display:none!important}" });
    await mkdir(`public/images/work/${slug}`, { recursive: true });
    await page.locator("[data-mockup]").screenshot({ path: `public/images/work/${slug}/${view}.jpg`, type: "jpeg", quality: 80 });
    console.log(`captured ${key}`);
    await page.close();
  }
} finally {
  await browser.close();
  server.kill();
}
