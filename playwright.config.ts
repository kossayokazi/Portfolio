import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "e2e",
  timeout: 30_000,
  use: { baseURL: "http://localhost:3000", launchOptions: { args: ["--enable-unsafe-swiftshader"] } },
  webServer: {
    command: "npm run start",
    url: "http://localhost:3000/en/",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});