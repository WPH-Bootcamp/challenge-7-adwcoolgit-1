import { expect, test } from "@playwright/test";

test("anchors, mobile menu, FAQ, industries, and focus order work", async ({
  page,
}) => {
  await page.setViewportSize({ width: 393, height: 852 });
  await page.goto("/");

  const menuButton = page.getByRole("button", { name: "Open navigation" });
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

  const menuButton = page.getByRole("button", { name: "Open navigation" });
  await page.getByRole("link", { name: /Your Logo home/i }).first().focus();
  await page.keyboard.press("Tab");
  await expect(menuButton).toBeFocused();

  await page.keyboard.press("Enter");
  await expect(menuButton).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(menuButton).toHaveAttribute("aria-expanded", "false");
  await expect(menuButton).toBeFocused();

  await page.keyboard.press("Space");
  await page.keyboard.press("Tab");
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
