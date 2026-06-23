import { expect, test } from "@playwright/test";
import { waitForVisualReadiness } from "./helpers/visualComparison";

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

  const clientLogos = page.locator("#client-logos img");
  await expect(clientLogos).toHaveCount(9);
  for (const logo of await clientLogos.all()) {
    await expect(logo).toHaveAttribute("loading", "eager");
  }

  await expect(page.getByRole("tab", { name: "Fintech" })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  await expect(
    page.getByRole("button", { name: "What services do you offer?" }),
  ).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByLabel("Testimonial 2 of 3")).toBeVisible();
  await expect(page.getByText("Sarah Tan", { exact: true })).toBeVisible();

  const exactCopy = [
    "Trusted by Global Innovators & Leading Brands",
    "End-to-End IT Solutions That Drive Results",
    "Clear steps. Smart execution. Results you can count on.",
    "Tailored tech to boost efficiency, security, and results.",
    "LET'S DISCUSS YOUR IDEAS",
  ];
  for (const copy of exactCopy) {
    await expect(page.getByText(copy, { exact: true })).toBeVisible();
  }

  await waitForVisualReadiness(page);
  const unloadedAssets = await page.locator("img").evaluateAll((images) =>
    images
      .filter((image) => !image.complete || image.naturalWidth === 0)
      .map((image) => image.getAttribute("src")),
  );
  await expect(page.locator('a[href="#"]')).toHaveCount(0);
  await expect(page.locator('img[src=""]')).toHaveCount(0);
  expect(unloadedAssets).toEqual([]);
  expect(failedAssets).toEqual([]);
});
