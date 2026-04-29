import { type Locator, type Page } from "@playwright/test";

export class BaseMap {
	public constructor(protected readonly page: Page) {}

	public get promoPopupOverlay(): Locator {
		return this.page.locator("#gist-overlay");
	}

	public get cookiesConsentDialog(): Locator {
		return this.page.getByRole("alertdialog", { name: "Privacy", exact: true });
	}

	public get acceptCookiesButton(): Locator {
		return this.cookiesConsentDialog.getByRole("button", {
			name: "Accept All Cookies",
			exact: true,
		});
	}
}
