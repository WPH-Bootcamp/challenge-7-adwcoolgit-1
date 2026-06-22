import { expect, test } from "@playwright/test";

test.use({ viewport: { width: 375, height: 812 } });

test("meets loading stability and request quality targets", async ({
  browserName,
  page,
}) => {
  test.skip(browserName !== "chromium", "Web Vitals are verified in Chromium.");
  const failedRequests: string[] = [];
  const consoleWarnings: string[] = [];

  page.on("requestfailed", (request) => {
    failedRequests.push(request.url());
  });
  page.on("console", (message) => {
    if (message.type() === "warning" || message.type() === "error") {
      consoleWarnings.push(message.text());
    }
  });

  await page.addInitScript(() => {
    const metrics = { cls: 0, lcp: 0 };
    Object.defineProperty(window, "__performanceMetrics", {
      configurable: false,
      value: metrics,
      writable: false,
    });

    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        metrics.lcp = entry.startTime;
      }
    }).observe({ type: "largest-contentful-paint", buffered: true });

    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const shift = entry as PerformanceEntry & {
          hadRecentInput: boolean;
          value: number;
        };
        if (!shift.hadRecentInput) metrics.cls += shift.value;
      }
    }).observe({ type: "layout-shift", buffered: true });
  });

  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(500);

  const metrics = await page.evaluate(() => {
    return (
      window as Window & {
        __performanceMetrics: { cls: number; lcp: number };
      }
    ).__performanceMetrics;
  });

  expect(failedRequests).toEqual([]);
  expect(consoleWarnings).toEqual([]);
  expect(metrics.lcp).toBeGreaterThan(0);
  expect(metrics.lcp).toBeLessThanOrEqual(2_500);
  expect(metrics.cls).toBeLessThanOrEqual(0.1);
});

test("keeps content usable when images are delayed or unavailable", async ({
  page,
}) => {
  await page.route("**/*.{png,jpg,jpeg,webp,avif}", async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 150));
    if (route.request().url().includes("portfolio-3")) {
      await route.abort("failed");
      return;
    }
    await route.continue();
  });

  await page.goto("/", { waitUntil: "domcontentloaded" });

  await expect(
    page.getByRole("heading", { level: 1, name: /Your Tech Partner/ }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: /Projects We/ }),
  ).toBeVisible();
  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  );
  expect(hasHorizontalOverflow).toBe(false);
});
