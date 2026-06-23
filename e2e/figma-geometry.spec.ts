import { expect, test, type Locator, type Page } from "@playwright/test";

interface ElementMetrics {
  borderRadius: number;
  boxShadow: string;
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
  height: number;
  letterSpacing: number;
  lineHeight: number;
  width: number;
  x: number;
  y: number;
}

async function elementMetrics(locator: Locator): Promise<ElementMetrics> {
  return locator.evaluate((element) => {
    const rect = element.getBoundingClientRect();
    const style = window.getComputedStyle(element);

    return {
      borderRadius: Number.parseFloat(style.borderRadius),
      boxShadow: style.boxShadow,
      fontFamily: style.fontFamily,
      fontSize: Number.parseFloat(style.fontSize),
      fontWeight: Number.parseInt(style.fontWeight, 10),
      height: rect.height,
      letterSpacing:
        style.letterSpacing === "normal"
          ? 0
          : Number.parseFloat(style.letterSpacing),
      lineHeight: Number.parseFloat(style.lineHeight),
      width: rect.width,
      x: rect.x,
      y: rect.y,
    };
  });
}

async function openAt(page: Page, width: number) {
  await page.setViewportSize({ width, height: 900 });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
}

function expectNear(actual: number, expected: number, precision = 1) {
  expect(actual).toBeCloseTo(expected, precision);
}

test.describe("shared Figma primitives", () => {
  test("mobile typography, logo, buttons, and fields use exact metrics", async ({
    page,
  }) => {
    await openAt(page, 393);

    const logo = await elementMetrics(
      page.locator('header [data-ui="brand-logo"]'),
    );
    const logoMark = await elementMetrics(
      page.locator('header [data-ui="brand-logo-mark"]'),
    );
    const logoText = await elementMetrics(
      page.locator('header [data-ui="brand-logo-text"]'),
    );
    expectNear(logo.width, 141);
    expectNear(logo.height, 32);
    expectNear(logoMark.width, 29.167);
    expectNear(logoMark.height, 32);
    expectNear(logoText.fontSize, 21.333);
    expectNear(logoText.lineHeight, 32);
    expect(logoText.fontWeight).toBe(600);
    expect(logoText.fontFamily).toContain("Outfit");

    const heading = page
      .locator('#results [data-ui="section-heading"]')
      .first();
    const title = await elementMetrics(
      heading.locator('[data-ui="section-heading-title"]'),
    );
    const subtitle = await elementMetrics(
      heading.locator('[data-ui="section-heading-subtitle"]'),
    );
    expectNear(title.fontSize, 28);
    expectNear(title.lineHeight, 38);
    expectNear(title.letterSpacing, -0.56);
    expect(title.fontWeight).toBe(700);
    expectNear(subtitle.fontSize, 14);
    expectNear(subtitle.lineHeight, 28);
    expect(subtitle.fontWeight).toBe(500);

    const heroButton = await elementMetrics(
      page.locator('#hero [data-ui="button"]'),
    );
    expectNear(heroButton.height, 44);
    expectNear(heroButton.fontSize, 14);
    expectNear(heroButton.lineHeight, 28);
    expect(heroButton.borderRadius).toBeGreaterThan(1000);
    expect(heroButton.boxShadow).toContain("inset");

    const input = await elementMetrics(page.locator("#contact-name"));
    const inputField = await elementMetrics(
      page.locator('#contact [data-kind="input"]').first(),
    );
    const textarea = await elementMetrics(page.locator("#contact-message"));
    const textareaField = await elementMetrics(
      page.locator('#contact [data-kind="textarea"]'),
    );
    const checkbox = await elementMetrics(page.locator("#service-web"));
    expectNear(input.height, 46);
    expectNear(inputField.height, 82);
    expectNear(textarea.height, 132);
    expectNear(textareaField.height, 168);
    expectNear(checkbox.width, 20);
    expectNear(checkbox.height, 20);
  });

  test("desktop typography and logo switch to desktop metrics", async ({
    page,
  }) => {
    await openAt(page, 1440);

    const logo = await elementMetrics(
      page.locator('header [data-ui="brand-logo"]'),
    );
    const logoText = await elementMetrics(
      page.locator('header [data-ui="brand-logo-text"]'),
    );
    expectNear(logo.width, 158.625);
    expectNear(logo.height, 36);
    expectNear(logoText.fontSize, 24);
    expectNear(logoText.lineHeight, 36);
    expect(logoText.fontWeight).toBe(600);

    const heading = page
      .locator('#results [data-ui="section-heading"]')
      .first();
    const title = await elementMetrics(
      heading.locator('[data-ui="section-heading-title"]'),
    );
    const subtitle = await elementMetrics(
      heading.locator('[data-ui="section-heading-subtitle"]'),
    );
    expectNear(title.fontSize, 40);
    expectNear(title.lineHeight, 56);
    expectNear(title.letterSpacing, -0.8);
    expect(title.fontWeight).toBe(700);
    expectNear(subtitle.fontSize, 18);
    expectNear(subtitle.lineHeight, 32);
    expect(subtitle.fontWeight).toBe(500);

    const headerButton = await elementMetrics(
      page.locator('header [data-ui="button"]'),
    );
    expectNear(headerButton.height, 44);
    expectNear(headerButton.fontSize, 14);
    expectNear(headerButton.lineHeight, 28);

    const input = await elementMetrics(page.locator("#contact-name"));
    const textarea = await elementMetrics(page.locator("#contact-message"));
    expectNear(input.height, 46);
    expectNear(textarea.height, 132);
  });
});

test("desktop page uses the inspected Figma geometry", async ({ page }) => {
  await openAt(page, 1440);

  const header = await elementMetrics(page.locator("header"));
  const headerInner = await elementMetrics(page.locator("header > div"));
  const hero = await elementMetrics(page.locator("#hero"));
  const heroCopy = await elementMetrics(page.locator('[data-ui="hero-copy"]'));
  const heroImage = await elementMetrics(
    page.locator('[data-ui="hero-image"]'),
  );
  const headerCta = await elementMetrics(
    page.locator('header [data-ui="button"]'),
  );
  expectNear(header.height, 84);
  expectNear(headerInner.x, 140);
  expectNear(headerInner.width, 1160);
  expectNear(headerCta.width, 197);
  expectNear(hero.height, 747);
  expectNear(heroCopy.x, 140);
  expectNear(heroCopy.y, 230);
  expectNear(heroCopy.width, 653);
  expectNear(heroImage.x, 696);
  expectNear(heroImage.y, 0);
  expectNear(heroImage.width, 747);
  expectNear(heroImage.height, 747);

  for (const selector of [
    "#results",
    "#process",
    "#services",
    "#industries",
    "#portfolio",
  ]) {
    const container = await elementMetrics(page.locator(selector));
    expectNear(container.x, 140);
    expectNear(container.width, 1160);
  }

  const expectedCards = [
    ['[data-ui="stat-card"]', 4, 275, 275],
    ['[data-ui="process-card"]', 6, 532, undefined],
    ['[data-ui="service-card"]', 9, 373.333, 182],
    ['[data-ui="portfolio-card"]', 3, 373, 449],
  ] as const;
  for (const [selector, count, width, height] of expectedCards) {
    const cards = page.locator(selector);
    await expect(cards).toHaveCount(count);
    for (const card of await cards.all()) {
      const metrics = await elementMetrics(card);
      expectNear(metrics.width, width);
      if (height !== undefined) expectNear(metrics.height, height);
    }
  }

  const activeTestimonial = await elementMetrics(
    page.locator('[data-ui="testimonial-card"][aria-hidden="false"]'),
  );
  expectNear(activeTestimonial.width, 594);
  expectNear(activeTestimonial.height, 292);

  const footer = await elementMetrics(page.locator("footer"));
  expectNear(footer.x, 140);
  expectNear(footer.width, 1160);
  expectNear(footer.height, 328);
});

test("mobile page uses the inspected 393px Figma geometry", async ({ page }) => {
  await openAt(page, 393);

  const header = await elementMetrics(page.locator("header"));
  const headerInner = await elementMetrics(page.locator("header > div"));
  const menuIcon = await elementMetrics(
    page.getByRole("button", { name: "Open navigation" }).locator("img"),
  );
  expectNear(header.height, 64);
  expectNear(headerInner.x, 16);
  expectNear(headerInner.width, 361);
  expectNear(menuIcon.width, 24);
  expectNear(menuIcon.height, 24);

  const hero = await elementMetrics(page.locator("#hero"));
  const heroCopy = await elementMetrics(page.locator('[data-ui="hero-copy"]'));
  const heroImage = await elementMetrics(
    page.locator('[data-ui="hero-image"]'),
  );
  expectNear(hero.height, 745);
  expectNear(heroCopy.x, 16);
  expectNear(heroCopy.y, 125);
  expectNear(heroCopy.width, 361);
  expectNear(heroImage.x, 1);
  expectNear(heroImage.y, 408);
  expectNear(heroImage.width, 391);
  expectNear(heroImage.height, 391);

  const sectionHeights = [
    ["#client-logos", 144],
    ["#results", 688],
    ["#process", 853],
    ["#services", 1921],
    ["#industries", 655],
    ["#portfolio", 1568],
    ["#testimonials", 583],
    ["#faq", 1083.2125],
    ["#contact", 946],
  ] as const;
  for (const [selector, height] of sectionHeights) {
    const metrics = await elementMetrics(page.locator(selector));
    const isFullWidth =
      selector === "#client-logos" || selector === "#testimonials";
    expectNear(metrics.x, isFullWidth ? 0 : 16);
    expectNear(
      metrics.width,
      isFullWidth ? 393 : 361,
    );
    expectNear(metrics.height, height);
  }

  for (const card of await page.locator('[data-ui="stat-card"]').all()) {
    const metrics = await elementMetrics(card);
    expectNear(metrics.width, 172.5);
    expectNear(metrics.height, 172.5);
  }

  const processMarker = await elementMetrics(
    page.locator("#process ol > li > span").first(),
  );
  expectNear(processMarker.width, 40);
  expectNear(processMarker.height, 40);

  const activeTestimonial = await elementMetrics(
    page.locator('[data-ui="testimonial-card"][aria-hidden="false"]'),
  );
  expectNear(activeTestimonial.width, 361);
  expectNear(activeTestimonial.height, 284);

  const footer = await elementMetrics(page.locator("footer"));
  expectNear(footer.x, 16);
  expectNear(footer.width, 361);
  expectNear(footer.height, 528);

  const bodyHeight = await page.evaluate(() => document.body.scrollHeight);
  expectNear(bodyHeight, 9826);
});
