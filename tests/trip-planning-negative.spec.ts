import { test } from "./fixtures/fixtures";

test.describe("Trip planning — negative scenarios", () => {
	test.beforeEach(async ({ tripPlanner }) => {
		await tripPlanner.dismissPromoPopupIfPresent();
		await tripPlanner.dismissCookiesPopupIfPresent();
	});

	test("origin input is empty by default", async ({ tripPlanner }) => {
		await tripPlanner.clickNewTrip();
		await tripPlanner.assertThat().originInputIsEmpty();
	});

	test("destination input is empty by default", async ({ tripPlanner }) => {
		await tripPlanner.clickNewTrip();
		await tripPlanner.assertThat().destinationInputIsEmpty();
	});

	test("origin input is empty after clearing", async ({ tripPlanner }) => {
		await tripPlanner.clickNewTrip();
		await tripPlanner.fillOrigin("Chicago");
		await tripPlanner.clearOrigin();
		await tripPlanner.assertThat().originInputIsEmpty();
	});

	test("destination input is empty after clearing", async ({ tripPlanner }) => {
		await tripPlanner.clickNewTrip();
		await tripPlanner.fillDestination("Miami");
		await tripPlanner.clearDestination();
		await tripPlanner.assertThat().destinationInputIsEmpty();
	});

	test("cannot create a trip with both fields empty — shows validation errors on both inputs", async ({
		tripPlanner,
	}) => {
		await tripPlanner.clickNewTrip();
		await tripPlanner.clickCreateTrip();
		await tripPlanner.assertThat().createTripModalIsVisible();
		await tripPlanner.assertThat().originInputShowsValidationError();
		await tripPlanner.assertThat().destinationInputShowsValidationError();
	});

	test("cannot create a trip with missing origin — shows validation error on origin", async ({
		tripPlanner,
	}) => {
		await tripPlanner.clickNewTrip();
		await tripPlanner.fillDestination("Miami");
		await tripPlanner.selectDestinationSuggestion();
		await tripPlanner.clickCreateTrip();
		await tripPlanner.assertThat().createTripModalIsVisible();
		await tripPlanner.assertThat().originInputShowsValidationError();
	});

	test("cannot create a trip with missing destination — shows validation error on destination", async ({
		tripPlanner,
	}) => {
		await tripPlanner.clickNewTrip();
		await tripPlanner.fillOrigin("Chicago");
		await tripPlanner.selectOriginSuggestion();
		await tripPlanner.clickCreateTrip();
		await tripPlanner.assertThat().createTripModalIsVisible();
		await tripPlanner.assertThat().destinationInputShowsValidationError();
	});

	test("searching for a gibberish stop shows no place results", async ({
		tripPlanner,
	}) => {
		await tripPlanner.steps().createTrip("Chicago", "Miami");
		await tripPlanner.typeInAddStops("xqzwvbnmkjhg");
		await tripPlanner.assertThat().noAddedStopResultsFound();
	});

	test("searching with only whitespace shows no place results", async ({
		tripPlanner,
	}) => {
		await tripPlanner.steps().createTrip("Chicago", "Miami");
		await tripPlanner.typeInAddStops("   ");
		await tripPlanner.assertThat().noAddedStopResultsFound();
	});
});
