import {
  expect,
  test,
  type Locator,
  type Page,
  type TestInfo,
} from "@playwright/test";

async function attachState(
  locator: Locator,
  name: string,
  testInfo: TestInfo,
) {
  await expect(locator).toBeVisible();
  await testInfo.attach(name, {
    body: await locator.screenshot({ animations: "disabled" }),
    contentType: "image/png",
  });
}

async function openMobilePage(page: Page) {
  await page.setViewportSize({ width: 393, height: 852 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
}

test("captures the open mobile menu state", async ({ page }, testInfo) => {
  await openMobilePage(page);
  await page.getByRole("button", { name: "Open navigation" }).click();

  const panel = page.getByRole("navigation", { name: "Mobile" });
  await expect(panel).toHaveAttribute("data-state", "open");
  await expect(panel.getByRole("link", { name: "Let's Talk" })).toBeVisible();
  await attachState(panel, "mobile-menu-open", testInfo);
});

test("captures selected industry and testimonial states", async (
  { page },
  testInfo,
) => {
  await openMobilePage(page);

  const commerceTab = page.getByRole("tab", { name: "E-Commerce" });
  await commerceTab.click();
  await expect(commerceTab).toHaveAttribute("aria-selected", "true");
  await attachState(page.locator("#industries"), "industry-selected", testInfo);

  const thirdDot = page.getByRole("button", { name: "Show testimonial 3" });
  await thirdDot.click();
  await expect(thirdDot).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByText("Emily Chen", { exact: true })).toBeVisible();
  await attachState(
    page.locator("#testimonials"),
    "testimonial-selected",
    testInfo,
  );
});

test("captures the expanded FAQ state", async ({ page }, testInfo) => {
  await openMobilePage(page);

  const question = page.getByRole("button", {
    name: "How much does a project cost?",
  });
  await question.click();
  await expect(question).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByText(/Project cost depends on scope/)).toBeVisible();
  await attachState(page.locator("#faq"), "faq-expanded", testInfo);
});

test("captures invalid, submitting, and success form states", async (
  { page },
  testInfo,
) => {
  await openMobilePage(page);
  const contact = page.locator("#contact");

  await page.getByRole("button", { name: "Send" }).click();
  await expect(page.getByLabel(/Name/)).toHaveAttribute("aria-invalid", "true");
  await attachState(contact, "contact-invalid", testInfo);

  await page.getByLabel(/Name/).fill("Ada Lovelace");
  await page.getByLabel(/Email/).fill("ada@example.com");
  await page.getByLabel(/Message/).fill("Build a product");
  await page.getByRole("button", { name: "Send" }).click();
  const submitting = page.getByRole("button", { name: "Sending…" });
  await expect(submitting).toBeDisabled();
  await attachState(contact, "contact-submitting", testInfo);

  const success = page.getByRole("dialog");
  await expect(success).toBeVisible();
  await attachState(success, "contact-success", testInfo);
});
