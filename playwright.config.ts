import { defineConfig, devices } from "@playwright/test";
import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.join(__dirname, ".env") });

export default defineConfig({
	testDir: "./tests",
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 1 : 0,
	workers: process.env.CI ? 2 : undefined,
	reporter: [
		["html", { outputFolder: "playwright-report", open: "never" }],
		["junit", { outputFile: "test-results/results.xml" }],
		["list"],
	],
	use: {
		baseURL: process.env.BASE_URL ?? "https://maps.roadtrippers.com",
		headless: !!process.env.CI,
		viewport: { width: 2560, height: 1440 },
		testIdAttribute: "data-sweetchuck-id",
		trace: "on-first-retry",
		screenshot: "only-on-failure",
		video: "retain-on-failure",
	},
	projects: [
		{
			name: "chromium",
			use: { ...devices["Desktop Chrome"] },
		},
	],
	outputDir: "test-results",
});
