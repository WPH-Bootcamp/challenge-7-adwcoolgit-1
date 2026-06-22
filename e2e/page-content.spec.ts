import { expect, test } from "@playwright/test";

const sectionOrder = [
  "hero",
  "client-logos",
  "results",
  "process",
  "services",
  "industries",
  "portfolio",
  "testimonials",
  "faq",
  "contact",
] as const;

test("renders the complete company profile in Figma order", async ({
  page,
}) => {
  const failedAssets: string[] = [];
  page.on("response", (response) => {
    if (response.status() >= 400) {
      failedAssets.push(`${response.status()} ${response.url()}`);
    }
  });

  await page.goto("/");
  await page.waitForLoadState("networkidle");

  await expect(page.locator("header")).toHaveCount(1);
  await expect(page.locator("nav")).toHaveCount(2);
  await expect(page.locator("main")).toHaveCount(1);
  await expect(page.locator("footer")).toHaveCount(1);
  await expect(page.locator("h1")).toHaveCount(1);

  const renderedOrder = await page.locator("main > section").evaluateAll(
    (sections) => sections.map((section) => section.id),
  );
  expect(renderedOrder).toEqual(sectionOrder);

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: /Your Tech Partner for Smarter Growth/i,
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", {
      name: "Smart IT Solutions That Grow With You",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", {
      name: "What Partners Say About Working With Us",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Ready to Start? Let’s Talk." }),
  ).toBeVisible();

  await expect(page.locator('a[href="#"]')).toHaveCount(0);
  await expect(page.locator('img[src=""]')).toHaveCount(0);
  expect(failedAssets).toEqual([]);
});
