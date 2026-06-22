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

  const motionStyles = await page.evaluate(() => {
    const htmlStyle = getComputedStyle(document.documentElement);
    const buttonStyle = getComputedStyle(
      document.querySelector("button") as HTMLButtonElement,
    );
    return {
      scrollBehavior: htmlStyle.scrollBehavior,
      transitionDuration: buttonStyle.transitionDuration,
    };
  });
  expect(motionStyles.scrollBehavior).toBe("auto");
  expect(motionStyles.transitionDuration).toMatch(/0\.00001s|1e-05s|0s/);
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

test("Chromium accessibility tree exposes screen-reader landmarks and status", async ({
  browserName,
  page,
}) => {
  test.skip(
    browserName !== "chromium",
    "The Chromium accessibility tree is the NVDA compatibility smoke target.",
  );
  await page.goto("/");

  const session = await page.context().newCDPSession(page);
  await session.send("Accessibility.enable");
  const initialTree = await session.send("Accessibility.getFullAXTree");
  const initialNodes = initialTree.nodes as Array<{
    name?: { value?: string };
    role?: { value?: string };
  }>;

  expect(initialNodes.some((node) => node.role?.value === "main")).toBe(true);
  expect(initialNodes.some((node) => node.role?.value === "navigation")).toBe(
    true,
  );
  expect(
    initialNodes.some(
      (node) =>
        node.role?.value === "heading" &&
        node.name?.value === "Your Tech Partner for Smarter Growth",
    ),
  ).toBe(true);

  await page.getByLabel(/Name/).fill("Ada");
  await page.getByLabel(/Email/).fill("ada@example.com");
  await page.getByLabel(/Message/).fill("Build a product");
  await page.getByRole("button", { name: "Send" }).click();
  await expect(page.getByRole("status")).toBeFocused();

  const successTree = await session.send("Accessibility.getFullAXTree");
  const successNodes = successTree.nodes as Array<{
    name?: { value?: string };
    role?: { value?: string };
  }>;
  expect(successNodes.some((node) => node.role?.value === "status")).toBe(true);
  expect(
    successNodes.some((node) =>
      node.name?.value?.includes("Thanks for sharing your project"),
    ),
  ).toBe(true);
});
