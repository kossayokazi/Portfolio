import { expect, test, type Page } from "@playwright/test";

async function openWorld(page: Page, path = "/en/?world=1") {
  await page.goto(path);
  const webgl = await page.evaluate(() => !!document.createElement("canvas").getContext("webgl"));
  test.skip(!webgl, "WebGL unavailable in this runner");
  await expect(page.locator("html")).toHaveAttribute("data-world", "on");
}

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

test("world mode: start and skip work, and the hidden page chrome is inert", async ({ page }) => {
  await openWorld(page);
  await expect(page.locator("body > header")).toHaveAttribute("inert", "");
  await page.getByRole("button", { name: "Start experience" }).click();
  await page.getByRole("button", { name: "Skip intro" }).click();
  await expect(page.getByRole("button", { name: "Skip intro" })).toHaveCount(0);
});

test("world mode: a lost WebGL context falls back to the classic page", async ({ page }) => {
  await openWorld(page);
  await expect(async () => {
    await page.evaluate(() =>
      document.querySelector("main canvas")?.dispatchEvent(new Event("webglcontextlost", { cancelable: true })),
    );
    await expect(page.locator("html")).not.toHaveAttribute("data-world", "on", { timeout: 500 });
  }).toPass();
  await expect(page.locator("#top h1")).toBeVisible();
  await expect(page.locator("body > header")).not.toHaveAttribute("inert", "");
});
test("world mode: the dock opens a place and Escape closes it", async ({ page }) => {
  await openWorld(page);
  await page.getByRole("button", { name: "Skip intro" }).click();
  await page.getByRole("navigation", { name: "Sections" }).getByRole("button", { name: "Projects" }).click();
  const panel = page.getByRole("region", { name: "Projects" });
  await expect(panel).toBeVisible();
  await expect(page).toHaveURL(/#projects$/);
  await page.keyboard.press("Escape");
  await expect(panel).toHaveCount(0);
});

test("world mode: a deep link opens its place after the intro", async ({ page }) => {
  await openWorld(page, "/en/?world=1#about");
  await page.getByRole("button", { name: "Skip intro" }).click();
  await expect(page.getByRole("region", { name: "About" })).toBeVisible();
});
