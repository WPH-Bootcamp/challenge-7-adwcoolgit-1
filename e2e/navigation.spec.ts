import { expect, test } from "@playwright/test";

test("anchors, mobile menu, FAQ, industries, and focus order work", async ({
  page,
}) => {
  await page.setViewportSize({ width: 393, height: 852 });
  await page.goto("/");

  const menuButton = page.locator(
    'button[aria-controls="mobile-navigation-panel"]',
  );
  await menuButton.click();
  await expect(menuButton).toHaveAttribute("aria-expanded", "true");
  await page
    .getByRole("navigation", { name: "Mobile" })
    .getByRole("link", { name: "Service" })
    .click();
  await expect(menuButton).toHaveAttribute("aria-expanded", "false");
  await expect(page.locator("#services")).toBeFocused();

  await page.getByRole("tab", { name: "E-Commerce" }).click();
  await expect(page.getByRole("tab", { name: "E-Commerce" })).toHaveAttribute(
    "aria-selected",
    "true",
  );

  const costQuestion = page.getByRole("button", {
    name: "How much does a project cost?",
  });
  await costQuestion.click();
  await expect(costQuestion).toHaveAttribute("aria-expanded", "true");

  await page.getByRole("button", { name: "Show testimonial 3" }).click();
  await expect(page.getByText("Emily Chen", { exact: true })).toBeVisible();

  await page.getByRole("link", { name: /Your Logo home/i }).first().focus();
  await page.keyboard.press("Tab");
  await expect(menuButton).toBeFocused();
});

test("mobile navigation and FAQ support keyboard-only activation", async ({
  browserName,
  page,
}) => {
  test.skip(
    browserName === "webkit",
    "WebKit requires platform full-keyboard-access settings to tab to links.",
  );
  await page.setViewportSize({ width: 393, height: 852 });
  await page.goto("/");

  const menuButton = page.locator(
    'button[aria-controls="mobile-navigation-panel"]',
  );
  await page.getByRole("link", { name: /Your Logo home/i }).first().focus();
  await page.keyboard.press("Tab");
  await expect(menuButton).toBeFocused();

  await page.keyboard.press("Enter");
  await expect(menuButton).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(menuButton).toHaveAttribute("aria-expanded", "false");
  await expect(menuButton).toBeFocused();

  await page.keyboard.press("Space");
  const firstMobileLink = page
    .getByRole("navigation", { name: "Mobile" })
    .getByRole("link")
    .first();
  await expect(firstMobileLink).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(menuButton).toHaveAttribute("aria-expanded", "false");

  const faqButton = page.getByRole("button", {
    name: "How long does it take?",
  });
  await faqButton.focus();
  await page.keyboard.press("Space");
  await expect(faqButton).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Shift+Tab");
  await expect(
    page.getByRole("button", { name: "How much does a project cost?" }),
  ).toBeFocused();
});

test("mobile menu traps focus and its CTA transfers focus to contact", async ({
  page,
}) => {
  await page.setViewportSize({ width: 393, height: 852 });
  await page.goto("/");

  const openButton = page.locator(
    'button[aria-controls="mobile-navigation-panel"]',
  );
  await openButton.click();
  const mobileNav = page.getByRole("navigation", { name: "Mobile" });
  const firstLink = mobileNav.getByRole("link").first();
  const cta = mobileNav.getByRole("link", { name: "Let's Talk" });

  await expect(firstLink).toBeFocused();
  await cta.focus();
  await page.keyboard.press("Tab");
  await expect(firstLink).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(cta).toBeFocused();

  await cta.press("Enter");
  await expect(openButton).toHaveAttribute("aria-expanded", "false");
  await expect(page.locator("#contact")).toBeFocused();
});

test("industry tabs support arrow keys and FAQ keeps one expanded item", async ({
  page,
}) => {
  await page.goto("/");

  const fintech = page.getByRole("tab", { name: "Fintech" });
  const commerce = page.getByRole("tab", { name: "E-Commerce" });
  const healthcare = page.getByRole("tab", { name: "Healtcare" });

  await fintech.focus();
  await page.keyboard.press("ArrowDown");
  await expect(commerce).toBeFocused();
  await expect(commerce).toHaveAttribute("aria-selected", "true");
  await page.keyboard.press("End");
  await expect(healthcare).toBeFocused();
  await expect(healthcare).toHaveAttribute("aria-selected", "true");
  await page.keyboard.press("Home");
  await expect(fintech).toBeFocused();

  const services = page.getByRole("button", {
    name: "What services do you offer?",
  });
  const cost = page.getByRole("button", {
    name: "How much does a project cost?",
  });
  await expect(services).toHaveAttribute("aria-expanded", "true");
  await cost.click();
  await expect(cost).toHaveAttribute("aria-expanded", "true");
  await expect(services).toHaveAttribute("aria-expanded", "false");
});

test("testimonial pagination exposes active state and keyboard focus", async ({
  page,
}) => {
  await page.goto("/");
  const first = page.getByRole("button", { name: "Show testimonial 1" });
  const second = page.getByRole("button", { name: "Show testimonial 2" });

  await second.focus();
  await page.keyboard.press("ArrowLeft");
  await expect(first).toBeFocused();
  await expect(first).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByText("John Lee", { exact: true })).toBeVisible();
});
