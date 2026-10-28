import { expect, test } from "@playwright/test";

/** Crawls every page in the sitemap and checks every internal link on it resolves. */
test("no dead internal links and no placeholder hrefs", async ({ page, request, baseURL }) => {
  test.setTimeout(180_000);
  test.skip(test.info().project.name !== "chromium", "crawl once");
  const sitemap = await (await request.get("/sitemap.xml")).text();
  const pages = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => new URL(m[1]!).pathname);
  expect(pages.length).toBeGreaterThan(20);

  const links = new Set<string>();
  for (const path of pages) {
    const res = await page.goto(path);
    expect(res?.status(), path).toBe(200);
    const hrefs = await page.$$eval("a[href]", (as) => as.map((a) => a.getAttribute("href") ?? ""));
    for (const href of hrefs) {
      expect(href, `placeholder link on ${path}`).not.toBe("#");
      expect(href, `empty link on ${path}`).not.toBe("");
      if (href.startsWith("/")) links.add(href.split("#")[0]!);
    }
  }
  for (const link of links) {
    const res = await request.get(new URL(link, baseURL).toString());
    expect(res.status(), `link ${link}`).toBe(200);
  }
});
