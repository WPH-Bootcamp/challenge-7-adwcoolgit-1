import { expect, test } from "@playwright/test";

test("invalid and valid submissions stay local and announce success", async ({
  page,
}) => {
  const requests: string[] = [];
  page.on("request", (request) => {
    if (request.method() !== "GET") requests.push(request.url());
  });
  await page.goto("/");

  await page.getByRole("button", { name: "Send" }).click();
  await expect(page.getByText("Please enter your name.")).toBeVisible();

  await page.getByLabel(/Name/).fill("Ada Lovelace");
  await page.getByLabel(/Email/).fill("ada@example.com");
  await page.getByLabel(/Message/).fill("Build a product");
  await page.getByRole("button", { name: "Send" }).click();
  await expect(page.getByRole("button", { name: "Sending…" })).toBeDisabled();
  await expect(page.getByRole("status")).toContainText("Your message is ready");
  expect(requests).toEqual([]);
});

test("invalid, success, and reset states preserve focus and defaults", async ({
  page,
}) => {
  const nonGetRequests: string[] = [];
  page.on("request", (request) => {
    if (request.method() !== "GET") nonGetRequests.push(request.url());
  });
  await page.goto("/");

  await page.getByRole("button", { name: "Send" }).click();
  await expect(page.getByLabel(/Name/)).toBeFocused();
  await expect(page.getByLabel(/Name/)).toHaveAttribute("aria-invalid", "true");
  await expect(page.getByLabel(/Email/)).toHaveAttribute("aria-invalid", "true");
  await expect(page.getByLabel(/Message/)).toHaveAttribute(
    "aria-invalid",
    "true",
  );

  await page.getByLabel(/Name/).fill("Ada Lovelace");
  await page.getByLabel(/Email/).fill("ada@example.com");
  await page.getByLabel(/Message/).fill("Build a product");
  await page.getByRole("button", { name: "Send" }).click();

  const submitting = page.getByRole("button", { name: "Sending…" });
  await expect(submitting).toBeDisabled();
  await expect(page.getByRole("dialog")).toBeFocused();
  await expect(page.getByRole("dialog")).toHaveAttribute("aria-modal", "true");
  await expect(page.getByRole("status")).toContainText("Your message is ready");

  await page.getByRole("button", { name: "Send another message" }).click();
  await expect(page.getByLabel(/Name/)).toBeFocused();
  await expect(page.getByLabel(/Name/)).toHaveValue("");
  await expect(page.getByLabel("Web Development")).toBeChecked();
  expect(nonGetRequests).toEqual([]);
});
