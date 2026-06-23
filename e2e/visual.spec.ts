import path from "node:path";
import { expect, test } from "@playwright/test";
import { figmaManifest } from "../src/data/figma-manifest";
import {
  captureFullPage,
  comparePngs,
  inspectPng,
  sha256File,
} from "./helpers/visualComparison";

const repositoryRoot = path.resolve(import.meta.dirname, "..");

for (const [mode, frame] of Object.entries(figmaManifest.frames)) {
  test(`${mode} Figma reference is native-size and immutable`, async () => {
    const referencePath = path.resolve(repositoryRoot, frame.referencePath);
    const [metadata, sha256] = await Promise.all([
      inspectPng(referencePath),
      sha256File(referencePath),
    ]);

    expect(metadata).toEqual({
      format: "png",
      height: frame.height,
      width: frame.width,
    });
    expect(sha256).toBe(frame.sha256);
    expect(frame.referencePath).toMatch(
      /^src\/assets\/reference\/figma-(desktop|mobile)-light\.png$/,
    );
  });
}

test("desktop page matches the native Figma reference", async ({
  browserName,
  page,
}, testInfo) => {
  test.skip(browserName !== "chromium", "Figma pixel oracle uses Chromium.");
  test.setTimeout(60_000);
  const frame = figmaManifest.frames.desktop;
  const referencePath = path.resolve(repositoryRoot, frame.referencePath);

  await page.setViewportSize({ width: frame.width, height: 1024 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  const actual = await captureFullPage(page);
  const comparison = await comparePngs({
    actual,
    artifactName: "desktop-figma",
    outputDir: testInfo.outputPath("figma-comparison"),
    referencePath,
  });

  await testInfo.attach("desktop-actual", {
    body: actual,
    contentType: "image/png",
  });
  await testInfo.attach("desktop-comparison", {
    body: Buffer.from(JSON.stringify(comparison, null, 2)),
    contentType: "application/json",
  });

  expect(comparison.actualWidth).toBe(frame.width);
  expect(comparison.actualHeight).toBe(frame.height);
  expect(comparison.diffPixelRatio).toBeLessThanOrEqual(0.02);
});

test("mobile page matches the native Figma reference", async ({
  browserName,
  page,
}, testInfo) => {
  test.skip(browserName !== "chromium", "Figma pixel oracle uses Chromium.");
  test.setTimeout(60_000);
  const frame = figmaManifest.frames.mobile;
  const referencePath = path.resolve(repositoryRoot, frame.referencePath);

  await page.setViewportSize({ width: frame.width, height: 852 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  const actual = await captureFullPage(page);
  const comparison = await comparePngs({
    actual,
    artifactName: "mobile-figma",
    outputDir: testInfo.outputPath("figma-comparison"),
    referencePath,
  });

  expect(comparison.actualWidth).toBe(frame.width);
  expect(comparison.actualHeight).toBe(frame.height);
  expect(comparison.diffPixelRatio).toBeLessThanOrEqual(0.02);
});
