import { type Page } from "@playwright/test";
import { TripPlannerMap } from "./trip-planner-map";
import { TripPlannerAsserter } from "./trip-planner-asserter";
import { TripPlannerSteps } from "./trip-planner-steps";

export class TripPlannerPage {
	readonly map: TripPlannerMap;

	constructor(private readonly page: Page) {
		this.map = new TripPlannerMap(page);
	}

	assertThat(): TripPlannerAsserter {
		return new TripPlannerAsserter(this);
	}

	steps(): TripPlannerSteps {
		return new TripPlannerSteps(this);
	}

	async navigate(): Promise<void> {
		await this.page.goto("/");
		await this.dismissCookiesPopupIfPresent();
		await this.dismissPromoPopupIfPresent();
	}

	async dismissCookiesPopupIfPresent(): Promise<void> {
		try {
			await this.map.cookiesConsentDialog.waitFor({
				state: "visible",
				timeout: 5000,
			});
			await this.map.acceptCookiesButton.click({ timeout: 5000 });
		} catch {
			return;
		}
	}

	async dismissPromoPopupIfPresent(): Promise<void> {
		try {
			await this.map.promoPopupOverlay.waitFor({
				state: "visible",
				timeout: 3000,
			});
		} catch {
			return;
		}

		try {
			await this.page
				.frameLocator("iframe.gist-message")
				.locator('button[onclick*="dismiss"]')
				.click({ timeout: 5000 });
		} catch {
			await this.page.evaluate(() => {
				document
					.querySelectorAll<HTMLElement>("#gist-embed-message, #gist-overlay")
					.forEach((el) => el.remove());
			});
		}
	}

	async clickNewTrip(): Promise<void> {
		await this.map.newTripButton.click();
	}

	async fillOrigin(origin: string): Promise<void> {
		await this.map.originInput.clear();
		await this.map.originInput.fill(origin);
	}

	async fillDestination(destination: string): Promise<void> {
		await this.map.destinationInput.clear();
		await this.map.destinationInput.fill(destination);
	}

	async clearOrigin(): Promise<void> {
		await this.map.originInput.clear();
	}

	async clearDestination(): Promise<void> {
		await this.map.destinationInput.clear();
	}

	async selectOriginSuggestion(): Promise<void> {
		await this.map.firstOriginSuggestion.click();
	}

	async selectDestinationSuggestion(): Promise<void> {
		await this.map.firstDestinationSuggestion.click();
	}

	async clickCreateTrip(): Promise<void> {
		await this.map.createTripButton.click();
	}

	async typeInAddStops(query: string): Promise<void> {
		await this.map.addStopsInput.clear();
		await this.map.addStopsInput.fill(query);
	}

	async selectFirstStopSuggestion(): Promise<void> {
		await this.map.firstStopSuggestion.click();
	}

	async clickLaunchTrip(): Promise<void> {
		await this.map.launchTripButton.click();
	}
}
