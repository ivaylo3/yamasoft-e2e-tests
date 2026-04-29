import { expect } from "@playwright/test";
import { type TripPlannerPage } from "./trip-planner";

export class TripPlannerAsserter {
	constructor(private readonly tripPlannerPage: TripPlannerPage) {}

	async createTripModalIsVisible(): Promise<void> {
		await expect(this.tripPlannerPage.map.createTripModal).toBeVisible();
	}

	async createTripModalIsClosed(): Promise<void> {
		await expect(this.tripPlannerPage.map.createTripModal).toBeHidden();
	}

	async originInputIsVisible(): Promise<void> {
		await expect(this.tripPlannerPage.map.originInput).toBeVisible();
	}

	async destinationInputIsVisible(): Promise<void> {
		await expect(this.tripPlannerPage.map.destinationInput).toBeVisible();
	}

	async originInputHasValue(value: string): Promise<void> {
		await expect(this.tripPlannerPage.map.originInput).toHaveValue(value);
	}

	async destinationInputHasValue(value: string): Promise<void> {
		await expect(this.tripPlannerPage.map.destinationInput).toHaveValue(value);
	}

	async originInputIsEmpty(): Promise<void> {
		await expect(this.tripPlannerPage.map.originInput).toHaveValue("");
	}

	async destinationInputIsEmpty(): Promise<void> {
		await expect(this.tripPlannerPage.map.destinationInput).toHaveValue("");
	}

	async quickLaunchIsSelected(): Promise<void> {
		await expect(this.tripPlannerPage.map.quickLaunchRadio).toBeChecked();
	}

	async autopilotIsSelected(): Promise<void> {
		await expect(this.tripPlannerPage.map.autopilotRadio).toBeChecked();
	}

	async createTripButtonIsVisible(): Promise<void> {
		await expect(this.tripPlannerPage.map.createTripButton).toBeVisible();
	}

	async originInputShowsValidationError(): Promise<void> {
		await expect(this.tripPlannerPage.map.originInputError).toBeVisible();
	}

	async destinationInputShowsValidationError(): Promise<void> {
		await expect(this.tripPlannerPage.map.destinationInputError).toBeVisible();
	}

	async onboardingViewIsVisible(): Promise<void> {
		await expect(this.tripPlannerPage.map.onboardingView).toBeVisible();
	}

	async waypointIsVisible(placeName: string): Promise<void> {
		await expect(
			this.tripPlannerPage.map.waypointItem(placeName),
		).toBeVisible();
	}

	async waypointCountIs(count: number): Promise<void> {
		await expect(
			this.tripPlannerPage.map.waypointList.locator(".onboarding-waypoint-view"),
		).toHaveCount(count);
	}

	async launchTripButtonIsVisible(): Promise<void> {
		await expect(this.tripPlannerPage.map.launchTripButton).toBeVisible();
	}

	async noAddedStopResultsFound(): Promise<void> {
		await expect(
			this.tripPlannerPage.map.stopSearchResultItems,
		).toHaveCount(0);
	}
}
