import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const keyPages = [
  "/",
  "/services",
  "/services/website-development",
  "/services/qa-testing",
  "/about",
  "/work",
  "/work/ledgerly-saas-concept",
  "/work/harbour-clinic-redesign-concept",
  "/work/brightpath-qa-testing-concept",
  "/work/wayfarer-seo-performance-concept",
  "/industries",
  "/insights",
  "/insights/why-qa-matters-before-website-launch",
  "/contact",
  "/request-a-quote",
  "/privacy-policy",
];

test.describe("SEO metadata", () => {
  test.skip(({ isMobile }) => isMobile, "metadata is viewport independent");

  for (const path of keyPages) {
    test(`metadata on ${path}`, async ({ page }) => {
      await page.goto(path);
      const title = await page.title();
      expect(title.length).toBeGreaterThan(10);
      expect(title).toContain("NS Digital Solutions");
      const description = await page.locator('meta[name="description"]').getAttribute("content");
      expect(description?.length ?? 0).toBeGreaterThan(50);
      const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
      expect(new URL(canonical!).pathname).toBe(path);
      await expect(page.locator('meta[property="og:image"]')).toHaveCount(1);
      await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");
      await expect(page.locator("h1")).toHaveCount(1);
      for (const json of await page.locator('script[type="application/ld+json"]').allTextContents()) {
        expect(() => JSON.parse(json)).not.toThrow();
      }
    });
  }

  test("titles and descriptions are unique across service pages", async ({ page, request }) => {
    const sitemap = await (await request.get("/sitemap.xml")).text();
    const servicePaths = [...sitemap.matchAll(/<loc>[^<]*?(\/services\/[^<]+)<\/loc>/g)].map((m) => m[1]!);
    expect(servicePaths).toHaveLength(7);
    const titles = new Set<string>();
    const descriptions = new Set<string>();
    for (const p of servicePaths) {
      await page.goto(p);
      titles.add(await page.title());
      descriptions.add((await page.locator('meta[name="description"]').getAttribute("content")) ?? "");
      // Playwright's text matching ignores <script> contents, so read them directly.
      const jsonLd = (await page.locator('script[type="application/ld+json"]').allTextContents()).join("\n");
      expect(jsonLd).toContain('"@type":"Service"');
      expect(jsonLd).toContain('"@type":"BreadcrumbList"');
      expect(jsonLd).toContain('"@type":"FAQPage"');
    }
    expect(titles.size).toBe(7);
    expect(descriptions.size).toBe(7);
  });

  test("robots.txt and sitemap are served", async ({ request }) => {
    expect((await request.get("/robots.txt")).status()).toBe(200);
    const sitemap = await request.get("/sitemap.xml");
    expect(sitemap.status()).toBe(200);
    expect(await sitemap.text()).toContain("/services/website-maintenance");
  });

  test("Open Graph image renders", async ({ request }) => {
    const res = await request.get("/og?title=Test");
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toContain("image/png");
  });
});

test.describe("accessibility (axe, WCAG 2.2 AA)", () => {
  for (const path of keyPages) {
    test(`no detectable violations on ${path}`, async ({ page }) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(path);
      // Scroll through so in-view content is rendered in its final state before scanning.
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 600) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 60));
        }
      });
      // Let staggered fade-ins finish so contrast is measured at full opacity.
      await page.waitForTimeout(2500);
      const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
      expect(results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).slice(0, 3).join(", ")}`)).toEqual([]);
    });
  }
});

test.describe("motion and progressive enhancement", () => {
  test("reduced motion shows the Dev + QA sequence in its final state", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await page.locator("#story-title").scrollIntoViewIfNeeded();
    await expect(page.getByText("Ready to launch")).toBeVisible();
    await expect(page.getByRole("button", { name: "Replay sequence" })).toBeHidden();
  });

  test("animated sequence completes with motion enabled", async ({ page }) => {
    await page.goto("/");
    await page.locator("#story-title").scrollIntoViewIfNeeded();
    await page.getByText("Regression coverage").scrollIntoViewIfNeeded();
    await expect(page.getByText("Validated", { exact: true })).toBeVisible({ timeout: 10_000 });
  });

  test.describe("without JavaScript", () => {
    test.use({ javaScriptEnabled: false });
    test("content is visible and the contact form still renders", async ({ page }) => {
      await page.goto("/");
      const card = page.locator("#main").getByRole("link", { name: "Website Maintenance", exact: true });
      await card.scrollIntoViewIfNeeded();
      await expect(card).toBeVisible();
      const opacity = await page.locator("[data-reveal]").first().evaluate((el) => getComputedStyle(el).opacity);
      expect(opacity).toBe("1");
      await page.goto("/contact");
      await expect(page.getByLabel("Full name")).toBeVisible();
    });
  });
});
