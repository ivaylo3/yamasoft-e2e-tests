import { test } from "./fixtures/fixtures";

test.describe("Trip planning — happy path", () => {
	test.beforeEach(async ({ tripPlanner }) => {
		await tripPlanner.dismissPromoPopupIfPresent();
		await tripPlanner.dismissCookiesPopupIfPresent();
	});

	test("trip creation modal is visible after clicking New Trip", async ({
		tripPlanner,
	}) => {
		await tripPlanner.clickNewTrip();
		await tripPlanner.assertThat().createTripModalIsVisible();
	});

	test("modal contains origin and destination inputs", async ({
		tripPlanner,
	}) => {
		await tripPlanner.clickNewTrip();
		await tripPlanner.assertThat().originInputIsVisible();
		await tripPlanner.assertThat().destinationInputIsVisible();
	});

	test("modal contains the Create trip button", async ({ tripPlanner }) => {
		await tripPlanner.clickNewTrip();
		await tripPlanner.assertThat().createTripButtonIsVisible();
	});

	test("Quick launch is selected by default", async ({ tripPlanner }) => {
		await tripPlanner.clickNewTrip();
		await tripPlanner.assertThat().quickLaunchIsSelected();
	});

	test("can fill in a starting point", async ({ tripPlanner }) => {
		await tripPlanner.clickNewTrip();
		await tripPlanner.fillOrigin("Chicago");
		await tripPlanner.assertThat().originInputHasValue("Chicago");
	});

	test("can fill in a destination", async ({ tripPlanner }) => {
		await tripPlanner.clickNewTrip();
		await tripPlanner.fillDestination("Miami");
		await tripPlanner.assertThat().destinationInputHasValue("Miami");
	});

	test("modal closes and onboarding view appears after creating a trip", async ({
		tripPlanner,
	}) => {
		await tripPlanner.steps().createTrip("Chicago", "Miami");
		await tripPlanner.assertThat().createTripModalIsClosed();
		await tripPlanner.assertThat().onboardingViewIsVisible();
	});

	test("origin and destination appear as waypoints after creating a trip", async ({
		tripPlanner,
	}) => {
		await tripPlanner.steps().createTrip("Chicago", "Miami");
		await tripPlanner.assertThat().waypointIsVisible("Chicago");
		await tripPlanner.assertThat().waypointIsVisible("Miami");
		await tripPlanner.assertThat().waypointCountIs(2);
	});

	test("Launch trip button is visible after creating a trip", async ({
		tripPlanner,
	}) => {
		await tripPlanner.steps().createTrip("Chicago", "Miami");
		await tripPlanner.assertThat().launchTripButtonIsVisible();
	});

	test("can add a stop to the trip", async ({ tripPlanner }) => {
		await tripPlanner.steps().createTrip("Chicago", "Miami");
		await tripPlanner.steps().addStop("Nashville");
		await tripPlanner.assertThat().waypointIsVisible("Nashville");
	});

	test("trip has three waypoints after adding one stop", async ({
		tripPlanner,
	}) => {
		await tripPlanner.steps().createTripAndAddStop("Chicago", "Miami", "Nashville");
		await tripPlanner.assertThat().waypointCountIs(3);
	});

	test("can complete full trip planning flow: create, add stop, and launch", async ({
		tripPlanner,
	}) => {
		await tripPlanner
			.steps()
			.createTripAddStopAndLaunch("Chicago", "Miami", "Nashville");
	});
});
