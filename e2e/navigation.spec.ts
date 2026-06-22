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
