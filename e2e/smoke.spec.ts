import { expect, test } from "@playwright/test";

for (const locale of ["en", "fr"]) {
  test(`${locale}: home page shows the key sections`, async ({ page }) => {
    await page.goto(`/${locale}/`);
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator("#projects")).toBeVisible();
    await expect(page.locator("#contact form")).toBeVisible();
  });
}

async function fillAndSend(page: import("@playwright/test").Page) {
  await page.goto("/en/#contact");
  await page.getByLabel("Name", { exact: true }).fill("Test User");
  await page.getByLabel("Email", { exact: true }).fill("test@example.com");
  await page.getByLabel("Message", { exact: true }).fill("Hello from the smoke test");
  await page.getByRole("button", { name: "Send message" }).click();
}

test("contact form shows success when the API answers 200", async ({ page }) => {
  await page.route("**/api/contact", (route) => route.fulfill({ status: 200, json: { ok: true } }));
  await fillAndSend(page);
  await expect(page.getByText(/Thanks/)).toBeVisible();
});

test("contact form shows an error when the API fails", async ({ page }) => {
  await page.route("**/api/contact", (route) => route.fulfill({ status: 500, json: { error: "x" } }));
  await fillAndSend(page);
  await expect(page.getByText(/Something went wrong/)).toBeVisible();
});