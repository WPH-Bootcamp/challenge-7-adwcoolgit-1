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
