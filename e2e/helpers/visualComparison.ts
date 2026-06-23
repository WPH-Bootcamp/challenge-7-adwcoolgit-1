import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { Page } from "@playwright/test";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";

interface ComparisonOptions {
  actual: Buffer;
  artifactName: string;
  outputDir: string;
  referencePath: string;
}

export interface ComparisonResult {
  actualHeight: number;
  actualWidth: number;
  diffPixelRatio: number;
  differentPixels: number;
  referenceHeight: number;
  referenceWidth: number;
}

function createWhiteCanvas(width: number, height: number) {
  const canvas = new PNG({ width, height });
  canvas.data.fill(255);
  return canvas;
}

function placeOnCanvas(source: PNG, width: number, height: number) {
  const canvas = createWhiteCanvas(width, height);
  PNG.bitblt(source, canvas, 0, 0, source.width, source.height, 0, 0);
  return canvas;
}

export async function inspectPng(filePath: string) {
  const png = PNG.sync.read(await readFile(filePath));
  return { format: "png", height: png.height, width: png.width };
}

export async function sha256File(filePath: string) {
  const contents = await readFile(filePath);
  return createHash("sha256").update(contents).digest("hex");
}

export async function waitForVisualReadiness(page: Page) {
  await page.waitForLoadState("networkidle");
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 700) {
      window.scrollTo(0, y);
      await new Promise((resolve) => window.setTimeout(resolve, 40));
    }
    await new Promise((resolve) => window.setTimeout(resolve, 200));

    await document.fonts.ready;
    for (const image of Array.from(document.images)) {
      if (image.complete && image.naturalWidth > 0) continue;
      image.scrollIntoView({ block: "center" });
      await new Promise<void>((resolve) => {
        image.addEventListener("load", () => resolve(), { once: true });
        image.addEventListener("error", () => resolve(), { once: true });
        window.setTimeout(resolve, 5_000);
      });
    }
    window.scrollTo(0, 0);
  });
}

export async function captureFullPage(page: Page) {
  await waitForVisualReadiness(page);
  return page.screenshot({ animations: "disabled", fullPage: true });
}

export async function comparePngs({
  actual,
  artifactName,
  outputDir,
  referencePath,
}: ComparisonOptions): Promise<ComparisonResult> {
  const [referenceSource, actualSource] = await Promise.all([
    readFile(referencePath).then((buffer) => PNG.sync.read(buffer)),
    Promise.resolve(PNG.sync.read(actual)),
  ]);
  const canvasWidth = Math.max(referenceSource.width, actualSource.width);
  const canvasHeight = Math.max(referenceSource.height, actualSource.height);
  const reference = placeOnCanvas(referenceSource, canvasWidth, canvasHeight);
  const captured = placeOnCanvas(actualSource, canvasWidth, canvasHeight);
  const diff = new PNG({ width: canvasWidth, height: canvasHeight });
  const overlay = new PNG({ width: canvasWidth, height: canvasHeight });

  const differentPixels = pixelmatch(
    reference.data,
    captured.data,
    diff.data,
    canvasWidth,
    canvasHeight,
    {
      alpha: 0.25,
      diffColor: [255, 0, 128],
      // Figma and Chromium rasterize the same local fonts differently.
      // Geometry is asserted separately within a 1px tolerance, so this only
      // absorbs antialiasing/color-fringe noise in the full-page comparison.
      threshold: 0.17,
    },
  );

  for (let offset = 0; offset < reference.data.length; offset += 4) {
    overlay.data[offset] = Math.round(
      (reference.data[offset] + captured.data[offset]) / 2,
    );
    overlay.data[offset + 1] = Math.round(
      (reference.data[offset + 1] + captured.data[offset + 1]) / 2,
    );
    overlay.data[offset + 2] = Math.round(
      (reference.data[offset + 2] + captured.data[offset + 2]) / 2,
    );
    overlay.data[offset + 3] = 255;
  }

  await mkdir(outputDir, { recursive: true });
  await Promise.all([
    writeFile(path.join(outputDir, `${artifactName}-actual.png`), actual),
    writeFile(
      path.join(outputDir, `${artifactName}-diff.png`),
      PNG.sync.write(diff),
    ),
    writeFile(
      path.join(outputDir, `${artifactName}-overlay.png`),
      PNG.sync.write(overlay),
    ),
  ]);

  return {
    actualHeight: actualSource.height,
    actualWidth: actualSource.width,
    diffPixelRatio: differentPixels / (canvasWidth * canvasHeight),
    differentPixels,
    referenceHeight: referenceSource.height,
    referenceWidth: referenceSource.width,
  };
}
