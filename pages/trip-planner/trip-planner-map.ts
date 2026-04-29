import { type Locator, type Page } from "@playwright/test";
import { BaseMap } from "../base/base-map";

export class TripPlannerMap extends BaseMap {
	public constructor(page: Page) {
		super(page);
	}

	public get newTripButton(): Locator {
		return this.page.getByTestId("map-action-bar__button--add-waypoint");
	}

	public get createTripModal(): Locator {
		return this.page.locator("section#create-trip-manually-modal-view");
	}

	public get originInput(): Locator {
		return this.createTripModal.locator("input#origin");
	}

	public get destinationInput(): Locator {
		return this.createTripModal.locator("input#destination");
	}

	public get quickLaunchRadio(): Locator {
		return this.createTripModal.locator(
			'input[name="trip-type"][value="false"]',
		);
	}

	public get autopilotRadio(): Locator {
		return this.createTripModal.locator('input[name="trip-type"][value="true"]');
	}

	public get createTripButton(): Locator {
		return this.createTripModal.getByRole("button", {
			name: "Create trip",
			exact: true,
		});
	}

	public get originInputError(): Locator {
		return this.createTripModal.locator(".origin-input.has-error");
	}

	public get destinationInputError(): Locator {
		return this.createTripModal.locator(".destination-input.has-error");
	}

	public get firstOriginSuggestion(): Locator {
		return this.createTripModal
			.locator(".origin-input .rt-autocomplete-list")
			.locator("button.rt-autocomplete-list-item-view")
			.first();
	}

	public get firstDestinationSuggestion(): Locator {
		return this.createTripModal
			.locator(".destination-input .rt-autocomplete-list")
			.locator("button.rt-autocomplete-list-item-view")
			.first();
	}

	public get onboardingView(): Locator {
		return this.page.locator("#onboarding-view");
	}

	private get onboardingSidebar(): Locator {
		return this.page.locator(
			"#onboarding-view .onboarding-panel.additional .sidebar",
		);
	}

	public get addStopsInput(): Locator {
		return this.onboardingSidebar.locator("input.rt-input-field");
	}

	public get firstStopSuggestion(): Locator {
		return this.onboardingSidebar
			.locator(".rt-autocomplete-list")
			.locator("button.rt-autocomplete-list-item-view")
			.first();
	}

	public get stopSearchResultItems(): Locator {
		return this.onboardingSidebar
			.locator(".rt-autocomplete-list")
			.locator("[data-sweetchuck-id^='autocomplete-list-item-view__button--result']");
	}

	public get waypointList(): Locator {
		return this.onboardingSidebar.locator(".waypoint-list");
	}

	public waypointItem(placeName: string): Locator {
		return this.waypointList
			.locator(".onboarding-waypoint-view")
			.filter({ hasText: placeName });
	}

	public get launchTripButton(): Locator {
		return this.page
			.locator("#onboarding-view .sidebar-actions")
			.getByRole("button", { name: "Launch trip", exact: true });
	}
}
