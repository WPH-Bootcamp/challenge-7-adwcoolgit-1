import { expect, test } from "@playwright/test";

const visualViewports = [
  { name: "320", width: 320, height: 852 },
  { name: "375", width: 375, height: 812 },
  { name: "768", width: 768, height: 1024 },
  { name: "1024", width: 1024, height: 768 },
  { name: "1440", width: 1440, height: 1024 },
] as const;

for (const viewport of visualViewports) {
  test(`page matches the approved ${viewport.name}px visual baseline`, async ({
    browserName,
    page,
  }) => {
    test.skip(browserName !== "chromium", "Golden screenshots use Chromium.");
    await page.setViewportSize(viewport);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 700) {
        window.scrollTo(0, y);
        await new Promise((resolve) => window.setTimeout(resolve, 40));
      }
      window.scrollTo(0, 0);
    });
    await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all(
        Array.from(document.images, (image) =>
          image.complete
            ? Promise.resolve()
            : new Promise<void>((resolve) => {
                image.addEventListener("load", () => resolve(), { once: true });
                image.addEventListener("error", () => resolve(), { once: true });
                window.setTimeout(resolve, 5_000);
              }),
        ),
      );
    });

    await expect(page).toHaveScreenshot(
      `company-profile-${viewport.name}.png`,
      {
        fullPage: true,
        animations: "disabled",
        maxDiffPixelRatio: 0.02,
      },
    );
  });
}
