# CI/CD Integration Strategy — Roadtrippers E2E Suite

The sample CircleCI configuration is at **`.circleci/config.yml`** in the project root.
This document explains the decisions behind it.

---

## 1. Pipeline Configuration — Triggers and Parallelisation

### Triggers

| Trigger | Workflow | Scope |
| ------- | -------- | ----- |
| Every push to a PR branch | `pr-tests` | Smoke suite, sharded ×3, flaky tests excluded |
| Merge to `main` | (covered by PR workflow) | — |
| Nightly cron — 02:00 UTC | `nightly-regression` | Regression suite + flaky quarantine job |

**Why two workflows?**
The PR workflow gives developers a fast signal before merge. The nightly run catches failures
that only surface against live state — third-party popup timing changes, session expiry, API
contract drift — without slowing down the PR feedback loop.

### Parallelisation via sharding

Playwright's `--shard=N/M` flag splits the test file list evenly across N CircleCI jobs
running in parallel. The matrix configuration in `config.yml` launches all shards simultaneously:

```yaml
e2e-tests:
  matrix:
    parameters:
      shard-index: [1, 2, 3]
```

Each shard runs on a `medium` executor. With 20 tests today the wall-clock
saving is modest, but the architecture scales: adding a fourth shard requires only one line
change to the matrix list and the `shard-total` parameter.

### Executor

The job uses the official `mcr.microsoft.com/playwright:v1.48.0-noble` Docker image, which
ships with all Playwright browsers pre-installed. This removes a separate browser install step
and keeps each shard under 3 minutes from checkout to results. The image version is pinned to
match the `@playwright/test` version in `package.json` to prevent silent compatibility drift.

### Environment variables

| Variable | Where set | Purpose |
| -------- | --------- | ------- |
| `CI` | Job `environment` block | Enables headless mode and 1 retry in `playwright.config.ts` |
| `BASE_URL` | Job `environment` block | Override to point at staging instead of production |
| `SLACK_ACCESS_TOKEN` | CircleCI context `slack-secrets` | Authenticates the Slack orb |
| `SLACK_DEFAULT_CHANNEL` | CircleCI context `slack-secrets` | Target channel for failure alerts |

---

## 2. Failure Handling and Reporting

### JUnit XML → CircleCI test history

`playwright.config.ts` configures the `junit` reporter to write
`test-results/results.xml`. Each shard's `store_test_results` step ingests this, giving
CircleCI:

- Per-test pass/fail timing across every build
- Automatic flake detection (CircleCI flags tests that toggle between pass/fail)
- Test suite health trends visible in the project dashboard

### HTML report → build artifacts

The `playwright-report/` directory (screenshots, videos, traces on failure) is uploaded
as a per-shard artifact. Engineers click through to the failing shard's report directly
from the CircleCI build page — no local re-run required.

### Slack notifications

The `circleci/slack` orb sends a failure alert only when a job fails. The message includes
branch name, author, shard index, and a direct build URL so the right team can act without
hunting for context. Alerts go to a dedicated `#e2e-alerts` channel to avoid flooding
general engineering channels.

### Retry policy

`retries: 1` in `playwright.config.ts` (active only when `CI=true`) absorbs one-off
network blips without masking real failures. One retry is the practical maximum before
retrying becomes a way of hiding problems rather than fixing them.

---

## 3. Flaky Test Strategy

### Detection

CircleCI's test history dashboard (populated via JUnit XML) surfaces tests that toggle
between pass and fail across recent builds. Any test failing on ≥ 2 of the last 10 runs
**without a code change on those runs** is a flake candidate.

### Quarantine

| Step | Action |
| ---- | ------ |
| 1 | Add `@flaky` to the test title or `test.describe` block |
| 2 | The `pr-tests` workflow excludes it: `--grep-invert @flaky` |
| 3 | The `flaky-quarantine` nightly job runs it with `--retries=2` |
| 4 | If it passes consistently in quarantine for 2 nights, it is un-tagged and restored |

This prevents a flaky test from blocking any PR while keeping it visible and actively
monitored — quarantine is a triage room, not a graveyard.

### Fix SLA and ownership

- The team that owns the feature under test owns the flaky test.
- Ownership is declared in a `test.describe` block comment: `// Owner: <team>`.
- Any test quarantined for more than **2 sprints** is escalated to the team lead or deleted.
  Stale quarantined tests add noise without value.

### Root causes in priority order

1. **Missing explicit wait** — replace `waitForTimeout` with `expect(locator).toBeVisible()`.
2. **Test data collision** — parallel tests sharing mutable state; isolate with unique IDs per run.
3. **Third-party overlay interference** — cookies/promo popups blocking clicks; handled in
   `TripPlannerPage.navigate()` but timing may need tuning if CDN delivery changes.
4. **Selector brittleness** — migrate to a `data-sweetchuck-id`-based or semantic locator.

---

## 4. Metrics

| Metric | Target | Why it matters |
| ------ | ------ | -------------- |
| **Pass rate — 7-day rolling** | ≥ 98% | Primary health signal. A sustained decline means new failures or growing flakiness — it forces a conversation before it becomes a crisis. |
| **Flake rate — per test and overall** | < 2% overall; quarantine at > 5% per test | Measures suite reliability independently of feature breakage. Queryable directly from CircleCI test history once JUnit XML is ingested. |
| **Time-to-feedback — p95 shard duration** | < 5 min on PRs | A suite that takes 20+ minutes stops being useful — developers move on. Sharding is the primary lever; this metric tells you when to add another shard. |
| **Defect escape rate** | Trending down quarter-over-quarter | Production bugs with no covering test. Requires correlation with the bug tracker. This is the only metric that proves the automation is testing the *right things*, not just accumulating tests. |

**What I deliberately excluded:** code coverage percentage. In E2E testing, 80% coverage of
the wrong flows is worse than 30% coverage of the critical happy paths. Coverage numbers
create false confidence and incentivise writing shallow tests to hit a number.
