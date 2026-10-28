import { expect, test } from "@playwright/test";

const caseStudies = [
  ["atelier-commerce-concept", "Atelier: premium fashion e-commerce store"],
  ["oakhaven-furniture-concept", "Oakhaven: furniture & interiors website"],
  ["ledgerly-saas-concept", "Ledgerly: SaaS product website"],
  ["harbour-clinic-redesign-concept", "Harbour Clinic: healthcare website redesign"],
  ["saffron-table-bug-fixing-concept", "Saffron Table: restaurant website technical recovery"],
  ["brightpath-qa-testing-concept", "Brightpath Academy: e-learning QA & testing"],
  ["wayfarer-seo-performance-concept", "Wayfarer Journeys: travel SEO & performance"],
  ["northfield-maintenance-concept", "Northfield Advisory: website maintenance & reliability"],
] as const;

const cards = (page: import("@playwright/test").Page) => page.getByRole("main").locator("ul li article");

test.describe("portfolio filters", () => {
  test("lists every case study, each linking to its page", async ({ page }) => {
    await page.goto("/work");
    await expect(page.getByText(`Showing ${caseStudies.length} of ${caseStudies.length} projects`)).toBeVisible();
    for (const [slug, title] of caseStudies) {
      await expect(page.getByRole("link", { name: title, exact: true })).toHaveAttribute("href", `/work/${slug}`);
    }
  });

  test("service filter shows only matching projects and updates the URL @cross-browser", async ({ page }) => {
    await page.goto("/work");
    const qa = page.getByRole("button", { name: /^QA & Website Testing/ });
    const expected = Number(await qa.locator("span").innerText());
    await qa.click();
    await expect(page).toHaveURL(/\/work\?service=qa-testing$/);
    await expect(qa).toHaveAttribute("aria-pressed", "true");
    await expect(page.getByText(`Showing ${expected} of ${caseStudies.length} projects for QA & Website Testing`)).toBeVisible();
    await expect(cards(page)).toHaveCount(expected);
    for (const card of await cards(page).all()) {
      await expect(card.getByRole("list", { name: "Services involved" })).toContainText("QA & Website Testing");
    }
  });

  test("every service filter returns at least one project and its count matches", async ({ page }) => {
    await page.goto("/work");
    const buttons = page.getByRole("group", { name: "Filter by service" }).getByRole("button");
    const total = await buttons.count();
    expect(total).toBe(8);
    for (let i = 1; i < total; i++) {
      const b = buttons.nth(i);
      const count = Number(await b.locator("span").innerText());
      expect(count).toBeGreaterThan(0);
      await b.click();
      await expect(cards(page)).toHaveCount(count);
    }
  });

  test("industry filter combines with service filter and can be cleared", async ({ page }) => {
    await page.goto("/work?service=seo-performance");
    const select = page.getByLabel("Industry");
    await select.selectOption("Travel & Tourism");
    await expect(page).toHaveURL(/service=seo-performance&industry=Travel/);
    await expect(cards(page)).toHaveCount(1);
    await expect(cards(page).first()).toContainText("Wayfarer Journeys");
    // Industries without SEO projects are disabled, so the grid can never be empty.
    await expect(select.locator("option", { hasText: "Furniture & Interiors" })).toBeDisabled();
    await page.getByRole("button", { name: "Clear" }).click();
    await expect(page).toHaveURL(/\/work$/);
    await expect(cards(page)).toHaveCount(caseStudies.length);
  });

  test("unknown or empty filter combinations from links fall back gracefully", async ({ page }) => {
    await page.goto("/work?service=not-a-service&industry=Nowhere");
    await expect(cards(page)).toHaveCount(caseStudies.length);
    await page.goto("/work?service=ecommerce-development&industry=Travel%20%26%20Tourism");
    await expect(cards(page).first()).toBeVisible();
  });

  test("card is clickable and opens the right case study", async ({ page }) => {
    await page.goto("/work");
    await page.getByRole("link", { name: "Ledgerly: SaaS product website", exact: true }).click();
    await expect(page).toHaveURL(/\/work\/ledgerly-saas-concept$/);
    await expect(page.locator("h1")).toHaveText("Ledgerly: SaaS product website");
  });
});

test.describe("case study pages", () => {
  test.skip(({ isMobile }) => isMobile, "structure is viewport independent");

  for (const [slug, title] of caseStudies) {
    test(`${slug} has the full case-study structure`, async ({ page }) => {
      await page.goto(`/work/${slug}`);
      await expect(page.locator("h1")).toHaveText(title);
      await expect(page.getByText(/is a fictional brand/)).toBeVisible();
      for (const heading of ["Project overview", "The challenge", "Project objectives", "The proposed solution", "Design approach", "Development implementation", "Testing and quality assurance", "The responsive experience", "Technologies used", "What this concept demonstrates", "Services behind this project"]) {
        await expect(page.getByRole("heading", { level: 2, name: heading })).toBeVisible();
      }
      await expect(page.locator("#cta-title")).toBeVisible();
      const broken = await page.evaluate(() => [...document.images].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.src));
      expect(broken).toEqual([]);
    });
  }

  test("before/after comparison responds to the keyboard", async ({ page }) => {
    await page.goto("/work/harbour-clinic-redesign-concept");
    const slider = page.getByRole("slider", { name: /Comparison position/ });
    await slider.focus();
    await page.keyboard.press("End");
    await expect(slider).toHaveValue("100");
    await page.keyboard.press("Home");
    await expect(slider).toHaveValue("0");
  });

  test("service page links to its filtered case studies", async ({ page }) => {
    await page.goto("/services/qa-testing");
    await page.getByRole("link", { name: /View all \d+ QA & Website Testing case studies/ }).click();
    await expect(page).toHaveURL(/\/work\?service=qa-testing$/);
    await expect(page.getByRole("button", { name: /^QA & Website Testing/ })).toHaveAttribute("aria-pressed", "true");
  });
});
