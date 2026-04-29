import { test as base } from "@playwright/test";
import { TripPlannerPage } from "../../pages/trip-planner/trip-planner";

type Fixtures = {
	tripPlanner: TripPlannerPage;
};

export const test = base.extend<Fixtures>({
	tripPlanner: async ({ page }, use) => {
		const tripPlanner = new TripPlannerPage(page);
		await tripPlanner.navigate();
		await use(tripPlanner);
	},
});

export { expect } from "@playwright/test";
