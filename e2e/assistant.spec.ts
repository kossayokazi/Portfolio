import { expect, test } from "@playwright/test";

const open = async (page: import("@playwright/test").Page) => {
  await page.goto("/en/");
  await page.getByRole("button", { name: "Ask about Kossay", exact: true }).click();
};

test("assistant streams an answer to a suggested question", async ({ page }) => {
  await page.route("**/api/ask", (route) =>
    route.fulfill({
      status: 200,
      contentType: "text/event-stream",
      body: 'data: {"response":"Kossay built "}\n\ndata: {"response":"Iterum."}\n\ndata: [DONE]\n\n',
    }),
  );
  await open(page);
  await page.getByRole("button", { name: "What has Kossay built with AI?" }).click();
  await expect(page.getByText("Kossay built Iterum.")).toBeVisible();
  await expect(page.getByRole("link", { name: "Contact Kossay" })).toBeVisible();
});

test("assistant shows a fallback when the API is unavailable", async ({ page }) => {
  await page.route("**/api/ask", (route) => route.fulfill({ status: 503, json: { error: "x" } }));
  await open(page);
  await page.getByRole("button", { name: "What has Kossay built with AI?" }).click();
  await expect(page.getByRole("alert")).toContainText("unavailable");
});