import { expect, test } from "@playwright/test";

const services = [
  ["Website Development", "/services/website-development"],
  ["Website Redesign", "/services/website-redesign"],
  ["Bug Fixing & Technical Support", "/services/bug-fixing"],
  ["QA & Website Testing", "/services/qa-testing"],
  ["E-commerce Development", "/services/ecommerce-development"],
  ["SEO & Performance Optimization", "/services/seo-performance"],
  ["Website Maintenance", "/services/website-maintenance"],
] as const;

test.describe("homepage", () => {
  test("renders hero with one H1 and working CTAs @cross-browser", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toContainText("better website");
    await expect(page.getByRole("link", { name: "Let's Build Something Great" })).toHaveAttribute("href", "/request-a-quote");
    await expect(page.getByRole("link", { name: "Explore Our Services" })).toHaveAttribute("href", "/services");
  });

  test("every service card links to its service page", async ({ page }) => {
    await page.goto("/");
    const section = page.locator("section", { has: page.getByRole("heading", { name: "Everything your website needs to succeed." }) });
    for (const [title, href] of services) {
      await expect(section.getByRole("link", { name: title, exact: true })).toHaveAttribute("href", href);
    }
  });

  test("service card navigates to the correct page", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "QA & Website Testing", exact: true }).first().click();
    await expect(page).toHaveURL(/\/services\/qa-testing$/);
    await expect(page.locator("h1")).toHaveText("Find the problems before your customers do.");
  });

  test("final CTA buttons lead to real destinations", async ({ page }) => {
    await page.goto("/");
    const cta = page.locator("section", { has: page.locator("#cta-title") });
    await cta.getByRole("link", { name: "Start a Project" }).click();
    await expect(page).toHaveURL(/\/request-a-quote$/);
    await page.goto("/");
    await page.locator("section", { has: page.locator("#cta-title") }).getByRole("link", { name: /Book a Consultation/ }).click();
    await expect(page).toHaveURL(/\/contact\?type=consultation/);
    await expect(page.getByRole("button", { name: "Request a consultation" })).toBeVisible();
  });
});

test.describe("desktop navigation", () => {
  test.skip(({ isMobile }) => isMobile, "desktop only");

  test("main nav links navigate and mark the current page @cross-browser", async ({ page }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Main" });
    for (const [name, path] of [["Industries", "/industries"], ["Our Work", "/work"], ["About", "/about"], ["Insights", "/insights"]] as const) {
      await nav.getByRole("link", { name }).click();
      await expect(page).toHaveURL(new RegExp(`${path}$`));
      await expect(nav.getByRole("link", { name })).toHaveAttribute("aria-current", "page");
    }
  });

  test("services dropdown is keyboard accessible", async ({ page }) => {
    await page.goto("/about");
    const trigger = page.getByRole("button", { name: "Services" });
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await trigger.focus();
    await page.keyboard.press("Enter");
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    const panel = page.locator(`#${await trigger.getAttribute("aria-controls")}`.replace(/:/g, "\\:"));
    await expect(panel.getByRole("link", { name: /Website Maintenance/ })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await expect(trigger).toBeFocused();
  });

  test("services dropdown link navigates", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Services" }).click();
    await page.getByRole("link", { name: /^E-commerce Development/ }).first().click();
    await expect(page).toHaveURL(/\/services\/ecommerce-development$/);
  });

  test("skip link is the first focusable element", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
  });
});

test.describe("mobile navigation", () => {
  test.skip(({ isMobile }) => !isMobile, "mobile only");

  test("menu opens, traps focus context, closes with Escape and navigates", async ({ page }) => {
    await page.goto("/");
    const toggle = page.getByRole("button", { name: "Open menu" });
    await toggle.click();
    const dialog = page.getByRole("dialog", { name: "Site menu" });
    await expect(dialog).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();

    await page.getByRole("button", { name: "Open menu" }).click();
    await page.getByRole("dialog").getByRole("link", { name: "Our Work" }).click();
    await expect(page).toHaveURL(/\/work$/);
    await expect(page.getByRole("dialog")).toBeHidden();
  });

  test("menu lists every service", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();
    const dialog = page.getByRole("dialog");
    for (const [title] of services) {
      await expect(dialog.getByRole("link", { name: title.split(" &")[0]!, exact: false }).first()).toBeVisible();
    }
  });
});

test.describe("not found and redirects", () => {
  test("unknown URL shows the custom 404 with a route home @cross-browser", async ({ page }) => {
    const res = await page.goto("/this-page-does-not-exist");
    expect(res?.status()).toBe(404);
    await expect(page.locator("h1")).toHaveText("This page took a wrong turn.");
    await page.getByRole("link", { name: "Back to homepage" }).click();
    await expect(page).toHaveURL(/\/$/);
  });

  test("unknown service slug returns 404", async ({ page }) => {
    const res = await page.goto("/services/not-a-service");
    expect(res?.status()).toBe(404);
  });

  test("legacy URLs permanently redirect", async ({ request }) => {
    for (const [from, to] of [["/blog", "/insights"], ["/services/website-bug-fixing", "/services/bug-fixing"], ["/case-studies", "/work"]]) {
      const res = await request.get(from!, { maxRedirects: 0 });
      expect(res.status(), from).toBe(308);
      expect(res.headers().location).toBe(to);
    }
  });
});
