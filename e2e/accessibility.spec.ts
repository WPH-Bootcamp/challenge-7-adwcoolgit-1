import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

async function expectNoAxeViolations(page: Parameters<typeof AxeBuilder>[0]["page"]) {
  const results = await new AxeBuilder({ page })
    .disableRules(["color-contrast"])
    .analyze();
  expect(results.violations).toEqual([]);
}

test("default and reduced-motion page have no axe violations", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expectNoAxeViolations(page);
});

test("mobile menu, form errors, and success state have no axe violations", async ({
  page,
}) => {
  await page.setViewportSize({ width: 393, height: 852 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation" }).click();
  await expectNoAxeViolations(page);
  await page.getByRole("button", { name: "Open navigation" }).click();

  await page.getByRole("button", { name: "Send" }).click();
  await expectNoAxeViolations(page);

  await page.getByLabel(/Name/).fill("Ada");
  await page.getByLabel(/Email/).fill("ada@example.com");
  await page.getByLabel(/Message/).fill("Build a product");
  await page.getByRole("button", { name: "Send" }).click();
  await expect(page.getByRole("status")).toBeVisible();
  await expectNoAxeViolations(page);
});
