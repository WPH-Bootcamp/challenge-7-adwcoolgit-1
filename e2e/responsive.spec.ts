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
  await expect(page.getByRole("heading", { name: "Ready to Start? Let’s Talk." })).toBeVisible();
  await expect(page.getByRole("button", { name: "Send" })).toBeVisible();
});
