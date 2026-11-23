import { expect, test } from "@playwright/test";

test("the classic page is still the default", async ({ page }) => {
  await page.goto("/en/");
  await expect(page.locator("#top h1")).toBeVisible();
  await expect(page.locator("html")).not.toHaveAttribute("data-world", "on");
});

test("falls back to the classic page when WebGL is unavailable", async ({ page }) => {
  await page.addInitScript(() => {
    (HTMLCanvasElement.prototype as unknown as { getContext: () => null }).getContext = () => null;
  });
  await page.goto("/en/?world=1");
  await expect(page.locator("#top h1")).toBeVisible();
  await expect(page.locator("html")).not.toHaveAttribute("data-world", "on");
});

test("world mode: start and skip work", async ({ page }) => {
  await page.goto("/en/?world=1");
  const webgl = await page.evaluate(() => !!document.createElement("canvas").getContext("webgl"));
  test.skip(!webgl, "WebGL unavailable in this runner");
  await expect(page.locator("html")).toHaveAttribute("data-world", "on");
  await page.getByRole("button", { name: "Start experience" }).click();
  await page.getByRole("button", { name: "Skip intro" }).click();
  await expect(page.getByRole("button", { name: "Skip intro" })).toHaveCount(0);
});