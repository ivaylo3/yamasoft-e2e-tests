# Part 3 Bonus — Extensions

## 1. API Testing

The Roadtrippers search flow sends a `GET /api/v3/places/autocomplete` request for every
keystroke in the origin/destination inputs. Playwright's `request` fixture lets us test this
contract directly without loading the browser UI:

```typescript
import { test, expect } from "@playwright/test";

test("API: autocomplete returns results for a valid city query", async ({
	request,
}) => {
	const response = await request.get(
		"https://api.roadtrippers.com/api/v3/places/autocomplete",
		{
			params: { q: "New York", locale: "en" },
		},
	);

	expect(
		response.status(),
		"Autocomplete endpoint should return 200 OK",
	).toBe(200);

	const body = (await response.json()) as {
		results: { name: string }[];
	};

	expect(
		body.results.length,
		"Response should contain at least one result",
	).toBeGreaterThan(0);

	expect(
		body.results[0].name,
		"First result should contain the queried city name",
	).toContain("New York");
});

test("API: autocomplete returns empty results for a gibberish query", async ({
	request,
}) => {
	const response = await request.get(
		"https://api.roadtrippers.com/api/v3/places/autocomplete",
		{
			params: { q: "xqzwvbnmkjhg", locale: "en" },
		},
	);

	expect(response.status()).toBe(200);

	const body = (await response.json()) as { results: unknown[] };
	expect(
		body.results,
		"Gibberish query should return an empty results array",
	).toHaveLength(0);
});
```

**Why this matters:** The E2E tests exercise the full stack but are slow and environment-
dependent. An API-level contract test catches breaking API changes in seconds and gives
unambiguous signal about whether the problem is in the UI or the backend.

---

## 2. Visual Regression Testing

Playwright's built-in `toHaveScreenshot()` captures pixel-perfect baselines on first run and
diffs against them on subsequent runs.

```typescript
import { test, expect } from "@playwright/test";
import { TripPlannerPage } from "../pages/trip-planner/trip-planner";

test("visual: trip creation modal matches baseline", async ({ page }) => {
	const tripPlanner = new TripPlannerPage(page);
	await tripPlanner.navigate();
	await tripPlanner.clickNewTrip();

	await expect(
		tripPlanner.map.createTripModal,
		"Trip creation modal should match the approved visual baseline",
	).toHaveScreenshot("create-trip-modal.png", {
		maxDiffPixelRatio: 0.02,
	});
});

test("visual: onboarding view matches baseline after trip creation", async ({
	page,
}) => {
	const tripPlanner = new TripPlannerPage(page);
	await tripPlanner.navigate();
	await tripPlanner.steps().createTrip("Chicago", "Miami");

	await expect(
		tripPlanner.map.onboardingView,
		"Onboarding view should match the approved visual baseline",
	).toHaveScreenshot("onboarding-view.png", {
		maxDiffPixelRatio: 0.02,
	});
});
```

**Tool recommendation:** For a small suite, Playwright's built-in snapshots are sufficient.
For a larger team where visual baselines need designer review and cross-browser diffs,
I would recommend **Applitools Eyes**. It understands layout shifts (uses an AI-based diff
algorithm that ignores rendering noise) and has a review dashboard where designers can
approve or reject visual changes — something a pixel-diff PNG never provides.

Baselines are committed to the repo under `tests/__snapshots__/`. The `--update-snapshots`
flag regenerates them when intentional UI changes are made.

---

## 3. Accessibility Testing

`@axe-core/playwright` integrates directly into Playwright tests. Running a scan on the
trip planning flow gives immediate WCAG 2.1 AA coverage:

```typescript
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { TripPlannerPage } from "../pages/trip-planner/trip-planner";

test("a11y: trip creation modal has no WCAG 2.1 AA violations", async ({
	page,
}) => {
	const tripPlanner = new TripPlannerPage(page);
	await tripPlanner.navigate();
	await tripPlanner.clickNewTrip();

	const results = await new AxeBuilder({ page })
		.include("section#create-trip-manually-modal-view")
		.withTags(["wcag2a", "wcag2aa"])
		.analyze();

	expect(
		results.violations,
		`Accessibility violations found:\n${results.violations
			.map((v) => `- ${v.id}: ${v.description}`)
			.join("\n")}`,
	).toHaveLength(0);
});

test("a11y: onboarding view has no WCAG 2.1 AA violations", async ({
	page,
}) => {
	const tripPlanner = new TripPlannerPage(page);
	await tripPlanner.navigate();
	await tripPlanner.steps().createTrip("Chicago", "Miami");

	const results = await new AxeBuilder({ page })
		.include("#onboarding-view")
		.withTags(["wcag2a", "wcag2aa"])
		.analyze();

	expect(
		results.violations,
		`Onboarding view accessibility violations:\n${results.violations
			.map((v) => `- ${v.id}: ${v.description}`)
			.join("\n")}`,
	).toHaveLength(0);
});
```

**CI gating strategy:** Run the a11y scan on every PR. Block merge on `critical` or `serious`
violations (color contrast, missing labels, keyboard trapping). Log `moderate` and `minor`
violations as warnings — surfaced in the HTML report but non-blocking — to avoid
overwhelming developers with noise while the backlog is cleared.

A dedicated `a11y` test file keeps the checks isolated from functional tests. This also lets
CI report accessibility health separately from functional health.

---

## 4. AI-Assisted Testing

**Applitools Eyes** with its Visual AI diff would reduce false positives in the visual
regression layer by ~90% versus pixel-diffing — it ignores sub-pixel font rendering
differences and dynamic content (timestamps, ads) while still catching real layout breaks.
The Eyes SDK integrates with Playwright via `@applitools/eyes-playwright` and the batch
dashboard enables designer review before baselines are approved.

**Mabl** would be valuable for exploratory test generation: its ML model observes recorded
user sessions on staging and auto-generates test cases for flows that the manual team has
not yet automated. This is particularly useful for the Roadtrippers discovery sidebar, which
has many interactive states (filters, categories, map clusters) that would be laborious to
cover manually.

**KaneAI** is worth evaluating for natural-language test authoring — a QA analyst who
understands the trip planning domain but is not a TypeScript developer could express a test
scenario in plain English and KaneAI would generate a Playwright script. The generated
scripts still need code review, but the authoring bottleneck shifts from developers to the
broader QA team.

**Claude (Anthropic)** has practical value at two points in the automation workflow. During
test design, Claude can analyse a DOM snapshot or a description of a new feature and propose
a set of positive and negative test cases — including edge cases a manual review might miss.
During maintenance, it can explain why a selector broke, suggest a more resilient replacement,
and update the affected page-object file. Because Claude understands context across multiple
files, it can refactor a locator in the `*-map.ts` file and immediately verify that all
dependent actions, assertions, and steps remain consistent. The practical limit is that Claude
does not run the browser — final validation still belongs to a live Playwright run — but it
meaningfully reduces the time between "the UI changed" and "the test is fixed."

The right mix: Applitools for visual stability, Mabl for exploratory coverage expansion,
Claude for test design and maintenance acceleration, and keep Playwright as the primary
framework for deterministic functional tests. AI tools complement rather than replace
structured automation.
