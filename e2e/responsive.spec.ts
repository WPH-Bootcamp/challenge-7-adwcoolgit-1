import { expect, test } from "@playwright/test";

const viewports = [
  { width: 320, height: 852 },
  { width: 375, height: 812 },
  { width: 393, height: 852 },
  { width: 480, height: 900 },
  { width: 768, height: 1024 },
  { width: 900, height: 900 },
  { width: 1024, height: 768 },
  { width: 1280, height: 900 },
  { width: 1440, height: 1024 },
] as const;

for (const viewport of viewports) {
  test(`${viewport.width}px has no horizontal overflow or clipped controls`, async ({
    page,
  }) => {
    await page.setViewportSize(viewport);
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const dimensions = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));
    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);

    const controls = [
      page.getByRole("link", { name: /Your Logo home/i }).first(),
      viewport.width < 1024
        ? page.getByRole("button", { name: "Open navigation" })
        : page.locator('header a[href="#contact"]'),
      page.getByRole("button", { name: "Send" }),
    ];

    for (const control of controls) {
      await expect(control).toBeVisible();
      const box = await control.boundingBox();
      expect(box).not.toBeNull();
      expect(box!.x).toBeGreaterThanOrEqual(0);
      expect(box!.x + box!.width).toBeLessThanOrEqual(viewport.width + 1);
      expect(box!.width).toBeGreaterThanOrEqual(40);
      expect(box!.height).toBeGreaterThanOrEqual(40);
    }

    if (viewport.width < 1024) {
      await expect(page.getByRole("navigation", { name: "Primary" })).toBeHidden();
    } else {
      await expect(page.getByRole("navigation", { name: "Primary" })).toBeVisible();
    }
  });
}

test("content remains reachable at simulated 200 percent zoom", async ({
  page,
}) => {
  await page.setViewportSize({ width: 640, height: 900 });
  await page.goto("/");
  await page.evaluate(() => {
    document.documentElement.style.zoom = "2";
  });

  const dimensions = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));
  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);
  await expect(page.getByRole("heading", { name: /Ready to Start\\?/i })).toBeVisible();
  await expect(page.getByRole("button", { name: "Send" })).toBeVisible();
});
test("results cards stay inside the section at intermediate breakpoints", async ({
  page,
}) => {
  for (const viewport of [480, 649, 768, 900] as const) {
    await page.setViewportSize({ width: viewport, height: 900 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const measurements = await page.evaluate(() => {
      const section = document.querySelector("#results");
      const cards = [...document.querySelectorAll('#results [data-ui="stat-card"]')];
      const sectionRect = section?.getBoundingClientRect();

      return {
        sectionBottom: sectionRect?.bottom ?? 0,
        cardBottoms: cards.map((card) => card.getBoundingClientRect().bottom),
      };
    });

    for (const cardBottom of measurements.cardBottoms) {
      expect(cardBottom).toBeLessThanOrEqual(measurements.sectionBottom + 1);
    }
  }
});
test("header and hero stay within viewport at intermediate desktop widths", async ({
  page,
}) => {
  for (const viewport of [1024, 1032, 1200] as const) {
    await page.setViewportSize({ width: viewport, height: 700 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const measurements = await page.evaluate(() => {
      const rect = (selector) => {
        const element = document.querySelector(selector);
        if (!element) return null;
        const box = element.getBoundingClientRect();
        return { x: box.x, right: box.right };
      };

      return {
        headerInner: rect("header > div"),
        heroCopy: rect('[data-ui="hero-copy"]'),
        heroImage: rect('[data-ui="hero-image"]'),
      };
    });

    expect(measurements.headerInner?.x ?? -1).toBeGreaterThanOrEqual(0);
    expect(measurements.heroCopy?.x ?? -1).toBeGreaterThanOrEqual(0);
    expect(measurements.heroImage?.right ?? Number.MAX_SAFE_INTEGER).toBeLessThanOrEqual(viewport + 1);
  }
});
