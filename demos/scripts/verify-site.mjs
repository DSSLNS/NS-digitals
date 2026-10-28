/**
 * Verifies a built demo site (its static `out/` folder) the way it will be served on Vercel.
 *
 *   node scripts/verify-site.mjs atelier            # serve sites/atelier/out locally and crawl it
 *   node scripts/verify-site.mjs https://x.vercel.app  # crawl a deployed site
 *
 * Crawls every internal link from the homepage at desktop (1440px) and mobile (375px) widths and
 * fails on: non-200 pages, console errors, failed requests, broken images, horizontal overflow,
 * placeholder links (href="#") and pages without exactly one <h1>.
 */
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { chromium } from "@playwright/test";

const target = process.argv[2];
if (!target) throw new Error("Usage: verify-site.mjs <site-id | https://url>");

let base = target;
let server;
if (!/^https?:/.test(target)) {
  const root = path.resolve(import.meta.dirname, "..", "sites", target, "out");
  const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".jpg": "image/jpeg", ".png": "image/png", ".svg": "image/svg+xml", ".woff2": "font/woff2", ".json": "application/json", ".ico": "image/x-icon", ".txt": "text/plain", ".xml": "application/xml", ".webmanifest": "application/manifest+json" };
  const exists = async (f) => (await stat(f).catch(() => null))?.isFile();
  server = createServer(async (req, res) => {
    const url = decodeURIComponent(new URL(req.url, "http://x").pathname);
    const candidates = [path.join(root, url), path.join(root, `${url}.html`), path.join(root, url, "index.html")];
    for (const f of candidates) {
      if (f.startsWith(root) && (await exists(f))) {
        res.writeHead(200, { "content-type": types[path.extname(f)] ?? "application/octet-stream" });
        return res.end(await readFile(f));
      }
    }
    res.writeHead(404, { "content-type": "text/html" });
    res.end(await readFile(path.join(root, "404.html")).catch(() => "Not found"));
  });
  await new Promise((r) => server.listen(0, r));
  base = `http://localhost:${server.address().port}`;
}

const browser = await chromium.launch();
const problems = [];
const seen = new Set(["/"]);
const queue = ["/"];
for (const [label, viewport] of [["desktop", { width: 1440, height: 900 }], ["mobile", { width: 375, height: 812 }]]) {
  const pages = label === "desktop" ? queue : [...seen];
  for (let i = 0; i < pages.length; i++) {
    const p = pages[i];
    const page = await browser.newPage({ viewport });
    const errs = [];
    page.on("console", (m) => m.type() === "error" && errs.push(m.text().slice(0, 160)));
    page.on("pageerror", (e) => errs.push(String(e).slice(0, 160)));
    page.on("requestfailed", (r) => errs.push(`failed ${r.url()}`));
    page.on("response", (r) => r.status() >= 400 && r.url().startsWith(base) && r.url() !== base + p && errs.push(`${r.status()} ${r.url()}`));
    const res = await page.goto(base + p, { waitUntil: "networkidle" });
    if (res?.status() !== 200) problems.push(`[${label}] ${p} returned ${res?.status()}`);
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 700) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 40)); }
    });
    await page.waitForTimeout(300);
    const info = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth - window.innerWidth,
      broken: [...document.images].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.getAttribute("src")),
      h1: document.querySelectorAll("h1").length,
      title: document.title,
      hrefs: [...document.querySelectorAll("a[href]")].map((a) => a.getAttribute("href")),
    }));
    if (info.overflow > 1) problems.push(`[${label}] ${p} horizontal overflow ${info.overflow}px`);
    if (info.broken.length) problems.push(`[${label}] ${p} broken images: ${info.broken.join(", ")}`);
    if (info.h1 !== 1) problems.push(`[${label}] ${p} has ${info.h1} <h1> elements`);
    if (!info.title) problems.push(`[${label}] ${p} has no <title>`);
    for (const e of errs) problems.push(`[${label}] ${p} ${e}`);
    for (const h of info.hrefs) {
      if (h === "#" || h === "") problems.push(`[${label}] ${p} placeholder link "${h}"`);
      if (label === "desktop" && h?.startsWith("/") && !h.startsWith("//")) {
        const clean = h.split("#")[0].split("?")[0] || "/";
        if (!seen.has(clean)) { seen.add(clean); queue.push(clean); }
      }
    }
    await page.close();
  }
}
await browser.close();
server?.close();
console.log(`Checked ${seen.size} pages at desktop and mobile widths on ${base}`);
console.log([...seen].sort().join("\n"));
if (problems.length) {
  console.log(`\n${problems.length} problem(s):\n${problems.join("\n")}`);
  process.exit(1);
}
console.log("\nNo problems found.");
