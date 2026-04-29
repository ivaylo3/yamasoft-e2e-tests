import { type TripPlannerPage } from "./trip-planner";

export class TripPlannerSteps {
	constructor(private readonly tripPlannerPage: TripPlannerPage) {}

	async openCreateTripModal(): Promise<void> {
		await this.tripPlannerPage.clickNewTrip();
		await this.tripPlannerPage.assertThat().createTripModalIsVisible();
	}

	async createTrip(origin: string, destination: string): Promise<void> {
		await this.openCreateTripModal();
		await this.tripPlannerPage.fillOrigin(origin);
		await this.tripPlannerPage.selectOriginSuggestion();
		await this.tripPlannerPage.fillDestination(destination);
		await this.tripPlannerPage.selectDestinationSuggestion();
		await this.tripPlannerPage.clickCreateTrip();
		await this.tripPlannerPage.assertThat().createTripModalIsClosed();
		await this.tripPlannerPage.assertThat().onboardingViewIsVisible();
	}

	async addStop(query: string): Promise<void> {
		await this.tripPlannerPage.typeInAddStops(query);
		await this.tripPlannerPage.selectFirstStopSuggestion();
	}

	async createTripAndAddStop(
		origin: string,
		destination: string,
		stopQuery: string,
	): Promise<void> {
		await this.createTrip(origin, destination);
		await this.addStop(stopQuery);
	}

	async createTripAddStopAndLaunch(
		origin: string,
		destination: string,
		stopQuery: string,
	): Promise<void> {
		await this.createTripAndAddStop(origin, destination, stopQuery);
		await this.tripPlannerPage.clickLaunchTrip();
	}
}
