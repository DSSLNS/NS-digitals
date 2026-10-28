import { expect, test, type Page } from "@playwright/test";

/** The server treats forms submitted < 2.5s after render as bots, so tests wait like a person would. */
const humanPause = (page: Page) => page.waitForTimeout(2700);
/** Our error summary (Next.js also renders an empty role="alert" route announcer). */
const errorSummary = (page: Page) => page.locator('[role="alert"][tabindex="-1"]');

test.describe("contact form", () => {
  test("shows field-level errors and an error summary when submitted empty @cross-browser", async ({ page }) => {
    await page.goto("/contact");
    await page.getByRole("button", { name: "Send message" }).click();
    const summary = errorSummary(page);
    await expect(summary).toContainText("Please correct 5 fields");
    await expect(summary).toBeFocused();
    await expect(page.getByLabel("Full name")).toHaveAttribute("aria-invalid", "true");
    await expect(page.locator("#name-error")).toHaveText("Please enter your full name.");
    await expect(page.locator("#description-error")).toContainText("Tell us a little more");
    await expect(page.locator("#consent-error")).toContainText("Please confirm we can use your details");
    // Optional fields are not flagged.
    await expect(page.getByLabel("Company or website")).not.toHaveAttribute("aria-invalid", "true");
  });

  test("validates email format on blur and clears the error once fixed", async ({ page }) => {
    await page.goto("/contact");
    const email = page.getByLabel("Business email");
    await email.fill("not-an-email");
    await email.blur();
    await expect(page.getByText(/Enter a valid email address/)).toBeVisible();
    await email.fill("alex@example.com");
    await expect(page.getByText(/Enter a valid email address/)).toBeHidden();
    await expect(email).not.toHaveAttribute("aria-invalid", "true");
  });

  test("submits successfully through the server action @cross-browser", async ({ page }) => {
    await page.goto("/contact");
    await page.getByLabel("Full name").fill("Alex Tester");
    await page.getByLabel("Business email").fill("alex@example.com");
    await page.getByLabel("Service required").selectOption("qa-testing");
    await page.getByLabel("Project description").fill("We need cross-browser QA before our new site launches next month.");
    await page.getByLabel(/I agree that NS Digital Solutions/).check();
    await humanPause(page);
    await page.getByRole("button", { name: "Send message" }).click();
    await expect(page.getByRole("heading", { name: "Thanks, your message is on its way" })).toBeVisible();
  });

  test("consultation link switches the form type", async ({ page }) => {
    await page.goto("/contact?type=consultation");
    await expect(page.getByRole("button", { name: "Request a consultation" })).toBeVisible();
  });
});

test.describe("request a quote (multi-step)", () => {
  test("validates each step and submits @cross-browser", async ({ page }) => {
    await page.goto("/request-a-quote");
    await page.getByRole("button", { name: "Continue" }).click();
    await expect(page.getByText(/Choose the service you need/)).toBeVisible();

    await page.getByRole("radio", { name: "Website Redesign" }).check();
    await page.getByLabel("Project description").fill("Our site is ten years old and hard to use on mobile.");
    await page.getByRole("button", { name: "Continue" }).click();
    await expect(page.getByRole("heading", { name: "Scope and timing" })).toBeFocused();

    await page.getByLabel("Project budget").selectOption("5k-15k");
    await page.getByLabel("Currency").selectOption("GBP");
    await page.getByRole("button", { name: "Continue" }).click();
    await expect(page.getByRole("heading", { name: "Where should we send our reply?" })).toBeVisible();

    await page.getByRole("button", { name: "Send quote request" }).click();
    await expect(page.locator("#name-error")).toHaveText("Please enter your full name.");

    await page.getByLabel("Full name").fill("Sam Example");
    await page.getByLabel("Business email").fill("sam@example.com");
    await page.getByLabel(/I agree that NS Digital Solutions/).check();
    await humanPause(page);
    await page.getByRole("button", { name: "Send quote request" }).click();
    await expect(page.getByRole("heading", { name: "Thanks, your quote request is in" })).toBeVisible();
  });

  test("back button keeps entered values", async ({ page }) => {
    await page.goto("/request-a-quote");
    await page.getByRole("radio", { name: "Website Maintenance" }).check();
    await page.getByLabel("Project description").fill("Monthly updates and testing for our WordPress site.");
    await page.getByRole("button", { name: "Continue" }).click();
    await page.getByRole("button", { name: "Back" }).click();
    await expect(page.getByLabel("Project description")).toHaveValue("Monthly updates and testing for our WordPress site.");
    await expect(page.getByRole("radio", { name: "Website Maintenance" })).toBeChecked();
  });

  test("service page CTA preselects the service", async ({ page }) => {
    await page.goto("/request-a-quote?service=seo-performance");
    await expect(page.getByRole("radio", { name: "SEO & Performance Optimization" })).toBeChecked();
  });
});

test.describe("server-side validation (JavaScript disabled, so no client checks run)", () => {
  test.use({ javaScriptEnabled: false });
  test.skip(({ browserName, isMobile }) => browserName !== "chromium" || isMobile, "once is enough");

  test("server rejects invalid data and keeps the visitor's input", async ({ page }) => {
    await page.goto("/contact");
    await page.getByLabel("Full name").fill("A");
    await page.getByLabel("Business email").fill("not-an-email");
    await page.getByRole("button", { name: "Send message" }).click();
    await expect(page.getByText("Please correct the highlighted fields.")).toBeVisible();
    await expect(page.locator("#email-error")).toContainText("Enter a valid email address");
    await expect(page.getByLabel("Business email")).toHaveValue("not-an-email");
  });
});
