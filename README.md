# Roadtrippers E2E Test Suite

Playwright + TypeScript automated test suite for the trip planning feature at
[maps.roadtrippers.com](https://maps.roadtrippers.com). Submitted as a technical assessment
for the Automation QA Engineer role at Roadpass Digital.

---

## Why Playwright?

Playwright was chosen over Cypress and Selenium for three concrete reasons:

1. **Auto-waiting everywhere** — every action and assertion retries against the live DOM until
   the element is ready. Zero `sleep()` calls needed.
2. **Fixture system** — the `test.extend<Fixtures>()` API injects a fully-navigated page
   object into every test. Setup runs once per test; teardown is automatic.
3. **First-class TypeScript + parallelism** — native TS support without plugins, and tests run
   in parallel worker processes out of the box.

---

## Project Structure

```
e2e-tests-yamasoft/
├── .circleci/config.yml              ← CircleCI pipeline (Part 2)
├── pages/
│   ├── base/
│   │   └── base-map.ts               ← Shared locators (popup overlays, cookies)
│   └── trip-planner/                 ← Trip planner page objects (4-file POM)
│       ├── trip-planner-map.ts       ← Locator declarations only
│       ├── trip-planner.ts           ← Action methods (click, fill, navigate)
│       ├── trip-planner-asserter.ts  ← Web-first expect assertions
│       └── trip-planner-steps.ts     ← Multi-step orchestration
├── tests/
│   ├── fixtures/
│   │   └── fixtures.ts               ← Playwright fixture definitions
│   ├── trip-planning.spec.ts         ← Happy path scenarios (11 tests)
│   └── trip-planning-negative.spec.ts← Negative / error scenarios (9 tests)
├── part2-ci-strategy/strategy.md     ← CI/CD strategy document (Part 2)
├── part3-bonus/extensions.md         ← API, visual, a11y, perf, AI (Part 3)
├── playwright.config.ts
├── tsconfig.json
└── package.json
```

### Page Object Model — four files per page

Every page is split into four focused files:

| File            | Responsibility                                           |
| --------------- | -------------------------------------------------------- |
| `*-map.ts`      | Locator declarations only — one place to update selectors |
| `*.ts` (page)   | Action methods: click, fill, navigate, dismiss popups    |
| `*-asserter.ts` | Web-first `expect` assertions                            |
| `*-steps.ts`    | Multi-step orchestration combining actions + assertions   |

### Popup and overlay handling

The site shows several third-party overlays on every fresh page load. All are handled
automatically inside `TripPlannerPage.navigate()` **and** in a `test.beforeEach` hook
in every spec file, ensuring each test starts on a clean, unobstructed page:

| Overlay | Selector | Dismissal strategy |
| ------- | -------- | ------------------ |
| OneTrust cookies consent | `role=alertdialog[name="Privacy"]` | Click "Accept All Cookies" |
| Customer.io / Gist promo | `#gist-overlay` | Click iframe dismiss button; JS removal fallback |

### Locator strategy

Locators use `data-sweetchuck-id` attributes (the app's stable test-ID convention),
Playwright `getByRole`, and scoped CSS selectors derived from inspecting the live DOM.
`testIdAttribute` is set to `data-sweetchuck-id` in `playwright.config.ts` so
`getByTestId()` resolves these attributes correctly.

Because every locator lives in exactly one `*-map.ts` file, any selector change
touches one file and propagates automatically to all actions, assertions, and steps.

---

## Test Coverage

### `trip-planning.spec.ts` — Happy path (11 tests)

| Group | Test |
| ----- | ---- |
| Modal | Trip creation modal is visible after clicking New Trip |
| Modal | Modal contains origin and destination inputs |
| Modal | Modal contains the Create trip button |
| Modal | Quick launch is selected by default |
| Modal | Can fill in a starting point |
| Modal | Can fill in a destination |
| Creation | Modal closes and onboarding view appears after creating a trip |
| Creation | Origin and destination appear as waypoints after creating a trip |
| Creation | Launch trip button is visible after creating a trip |
| Stops | Can add a stop to the trip |
| Stops | Trip has three waypoints after adding one stop |
| Full flow | Create, add stop, and launch (end-to-end) |

### `trip-planning-negative.spec.ts` — Negative / error scenarios (9 tests)

| Group | Test |
| ----- | ---- |
| Defaults | Origin input is empty by default |
| Defaults | Destination input is empty by default |
| Clearing | Origin input is empty after clearing |
| Clearing | Destination input is empty after clearing |
| Validation | Cannot create a trip with both fields empty — shows errors on both |
| Validation | Cannot create a trip with missing origin — shows error on origin |
| Validation | Cannot create a trip with missing destination — shows error on destination |
| Invalid search | Searching for a gibberish stop shows no place results |
| Invalid search | Searching with only whitespace shows no place results |

---

## Prerequisites

- **Node.js 22** (`node --version` should print `v22.x.x`)
- **npm** (comes with Node)

---

## Setup

```bash
# 1. Clone the repository
git clone <repo-url>
cd e2e-tests-yamasoft

# 2. Install dependencies
npm ci

# 3. Install Playwright browsers (Chromium only)
npx playwright install --with-deps chromium

# 4. Create your local .env
echo "BASE_URL=https://maps.roadtrippers.com" > .env
```

> No credentials or session files are needed. Tests run against the public
> unauthenticated surface of maps.roadtrippers.com.

---

## Test Execution Report

The `playwright-report/` and `test-results/` folders are committed intentionally as
part of this assessment submission. They contain the HTML report and JUnit XML from
the latest clean local run and serve as the required evidence of a passing suite.

To view the report locally:

```bash
npx playwright show-report
```

To regenerate the report after your own run:

```bash
npx playwright test
npx playwright show-report
```

---

## Running Tests

```bash
# Run the full suite (headless)
npx playwright test

# Run in headed mode (watch the browser)
npx playwright test --headed

# Run only the happy path spec
npx playwright test tests/trip-planning.spec.ts

# Run only the negative scenarios spec
npx playwright test tests/trip-planning-negative.spec.ts

# Run a single test by title
npx playwright test --grep "can add a stop to the trip"

# Open the interactive HTML report after a run
npx playwright show-report

# Debug a single test step-by-step
npx playwright test --debug tests/trip-planning.spec.ts
```

---

## Trade-offs

| Decision | Rationale |
| -------- | --------- |
| **Unauthenticated scope** | The production site uses reCAPTCHA Enterprise which blocks automated login. The trip planning flow (create → add stops → launch) is fully accessible without authentication, making all 20 tests stable and credential-free. |
| **Chromium only** | The assessment targets a specific user flow, not cross-browser compatibility. Adding Firefox/Safari is a one-line change in `playwright.config.ts`. |
| **No mock/stub layer** | Tests run against live `maps.roadtrippers.com`. This gives the highest confidence but means the suite depends on network availability. A staging environment would make it fully hermetic. |
| **20 test cases** | Focused, readable coverage of the entire trip planning flow — modal validation, trip creation, waypoint addition, and launch — rather than shallow breadth across many unrelated flows. |
| **4-file POM** | Separating locators, actions, assertions, and orchestration into distinct files keeps each file under ~100 lines and makes the selector single source of truth. The trade-off is more files to navigate for a simple suite of this size. |
| **No `page.waitForTimeout()`** | Every synchronisation point uses a web-first `expect(locator)` assertion, which retries until Playwright's 30-second timeout. This makes tests stable against variable network latency. |

---

## Time Spent

| Activity | Time |
| -------- | ---- |
| Roadtrippers UI exploration + DevTools inspection | ~20 min |
| Framework architecture + page objects | ~60 min |
| Live DOM inspection + locator fixes | ~60 min |
| Test case implementation | ~60 min |
| CircleCI config + strategy document | ~60 min |
| Part 3 bonus extensions | ~40 min |
| README + polish | ~30 min |
| **Total** | **~4 hours** |
