# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: trip-planning.spec.ts >> Trip planning — happy path >> trip has three waypoints after adding one stop
- Location: tests/trip-planning.spec.ts:82:6

# Error details

```
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('#onboarding-view .onboarding-panel.additional .sidebar').locator('.waypoint-list').locator('.onboarding-waypoint-view')
Expected: 3
Received: 2
Timeout:  5000ms

Call log:
  - Expect "toHaveCount" with timeout 5000ms
  - waiting for locator('#onboarding-view .onboarding-panel.additional .sidebar').locator('.waypoint-list').locator('.onboarding-waypoint-view')
    9 × locator resolved to 2 elements
      - unexpected value "2"

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e3]:
    - generic [ref=e4]:
      - generic [ref=e6]:
        - link "Mapbox" [ref=e8] [cursor=pointer]:
          - /url: http://mapbox.com/about/maps
        - list [ref=e10]:
          - listitem [ref=e11]: © Roadtrippers
          - listitem [ref=e12]:
            - text: •
            - link "© Mapbox" [ref=e13] [cursor=pointer]:
              - /url: https://www.mapbox.com/about/maps/
          - listitem [ref=e14]:
            - text: •
            - link "© OpenStreetMap" [ref=e15] [cursor=pointer]:
              - /url: http://www.openstreetmap.org/about/
          - listitem [ref=e16]:
            - text: •
            - link "Improve this map" [ref=e17] [cursor=pointer]:
              - /url: https://www.mapbox.com/contribute
        - generic:
          - region "Map" [ref=e18]
          - generic "Map marker"
      - generic:
        - generic:
          - generic:
            - generic:
              - generic [ref=e20]:
                - iframe [ref=e24]:
                  - generic [ref=f12e1]:
                    - link [ref=f12e2] [cursor=pointer]:
                      - /url: https://pagead2.googlesyndication.com/pcs/click?xai=AKAOjsvHzloTfEWVurshBd3EiMbD7gPHsec_uJYyVQ2cjYvTCN3t0YVdmc6t7KLAx1eO4p46Tq-O9KhgmjsJYcyJ0ylO5GyZzK4wlMjq2E3xNMoZs9iOH4QXIe5O1VchJJFAVytueRzw4ZmqWPntVeGbDbu13DHFbTUByKOlPngHfDqFvD7yvI3Z24DSPWhqrKCd7-SSDrKl4NddTBWBUbyVuPOImRmgkCXigQwK4u-DakoCSk4213KXaSnPzf__NIT7077dIFhMvY2R_n69zLIRCE5inlgS93ZQc0M4Fnqk9fYk4fRWJK-zwRnLl7Px0UIzudMoDC0Q82isqhwvTwcusU1LFQNlwbQj3q0H9onR3pORYGjWXN3ZbsC5ryq3ix-xeKo-Ym1XtS8Y3Affg7nBu57YmtEd0oNdDmw&sig=Cg0ArKJSzM3sti7xvRUy&fbs_aeid=%5Bgw_fbsaeid%5D&adurl=http://www.progressive.com/lp/rv/%3Fcode%3D8035700003
                    - img [ref=f12e6] [cursor=pointer]
                    - button [ref=f12e9] [cursor=pointer]:
                      - img [ref=f12e10]
                - button "Remove ads" [ref=e26] [cursor=pointer]
              - generic:
                - button [ref=e28] [cursor=pointer]:
                  - img [ref=e30]
                - button [ref=e32] [cursor=pointer]:
                  - img [ref=e34]
                - generic [ref=e36]:
                  - button [ref=e37] [cursor=pointer]:
                    - img [ref=e39]
                  - button [ref=e41] [cursor=pointer]:
                    - img [ref=e43]
              - generic [ref=e47]:
                - banner [ref=e48]:
                  - heading "Explore" [level=2] [ref=e49]
                - generic [ref=e50]:
                  - button "Start planning your next road trip today" [ref=e52] [cursor=pointer]:
                    - paragraph [ref=e54]: Start planning your next road trip today
                    - img [ref=e55]
                  - generic [ref=e57]:
                    - generic [ref=e58]:
                      - heading "Nearby guides for you" [level=2] [ref=e60]
                      - paragraph [ref=e61]:
                        - link "See all" [ref=e62] [cursor=pointer]:
                          - /url: /trips
                    - generic [ref=e63]:
                      - generic [ref=e65]:
                        - 'link "Gone But Not Forgotten: Former National Parks Gone But Not Forgotten: Former National Parks" [ref=e67] [cursor=pointer]':
                          - /url: /trips/14251975
                          - 'img "Gone But Not Forgotten: Former National Parks" [ref=e69]'
                          - 'heading "Gone But Not Forgotten: Former National Parks" [level=3] [ref=e70]':
                            - generic [ref=e71]: "Gone But Not Forgotten: Former National Parks"
                        - 'link "Canyons, caves, and abandoned Cadillacs: Southwest road trip Canyons, caves, and abandoned Cadillacs: Southwest road trip 1,847 mi" [ref=e73] [cursor=pointer]':
                          - /url: /trips/15631993
                          - 'img "Canyons, caves, and abandoned Cadillacs: Southwest road trip" [ref=e75]'
                          - 'heading "Canyons, caves, and abandoned Cadillacs: Southwest road trip" [level=3] [ref=e76]':
                            - generic [ref=e77]: "Canyons, caves, and abandoned Cadillacs: Southwest road trip"
                          - paragraph [ref=e78]: 1,847 mi
                        - link "The top things to do on an I-40 road trip The top things to do on an I-40 road trip 2,851 mi" [ref=e80] [cursor=pointer]:
                          - /url: /trips/14685149
                          - img "The top things to do on an I-40 road trip" [ref=e82]
                          - heading "The top things to do on an I-40 road trip" [level=3] [ref=e83]:
                            - generic [ref=e84]: The top things to do on an I-40 road trip
                          - paragraph [ref=e85]: 2,851 mi
                        - 'link "Ancient Mysteries: The 6 Coolest Indian Burial Mounds Ancient Mysteries: The 6 Coolest Indian Burial Mounds" [ref=e87] [cursor=pointer]':
                          - /url: /trips/15031463
                          - 'img "Ancient Mysteries: The 6 Coolest Indian Burial Mounds" [ref=e89]'
                          - 'heading "Ancient Mysteries: The 6 Coolest Indian Burial Mounds" [level=3] [ref=e90]':
                            - generic [ref=e91]: "Ancient Mysteries: The 6 Coolest Indian Burial Mounds"
                        - link "The top things to do on a Route 66 road trip The top things to do on a Route 66 road trip 2,316 mi" [ref=e93] [cursor=pointer]:
                          - /url: /trips/10296177
                          - img "The top things to do on a Route 66 road trip" [ref=e95]
                          - heading "The top things to do on a Route 66 road trip" [level=3] [ref=e96]:
                            - generic [ref=e97]: The top things to do on a Route 66 road trip
                          - paragraph [ref=e98]: 2,316 mi
                        - link "Meet America's most enchanting (and hidden) natural escape Meet America's most enchanting (and hidden) natural escape" [ref=e100] [cursor=pointer]:
                          - /url: /trips/17306041
                          - img "Meet America's most enchanting (and hidden) natural escape" [ref=e102]
                          - heading "Meet America's most enchanting (and hidden) natural escape" [level=3] [ref=e103]:
                            - generic [ref=e104]: Meet America's most enchanting (and hidden) natural escape
                        - link "Journey through Texas and Oklahoma to Route 66's midpoint Journey through Texas and Oklahoma to Route 66's midpoint 487 mi" [ref=e106] [cursor=pointer]:
                          - /url: /trips/24974955
                          - img "Journey through Texas and Oklahoma to Route 66's midpoint" [ref=e108]
                          - heading "Journey through Texas and Oklahoma to Route 66's midpoint" [level=3] [ref=e109]:
                            - generic [ref=e110]: Journey through Texas and Oklahoma to Route 66's midpoint
                          - paragraph [ref=e111]: 487 mi
                        - link "These are the best offbeat hidden gems in southeast Oklahoma These are the best offbeat hidden gems in southeast Oklahoma 323 mi" [ref=e113] [cursor=pointer]:
                          - /url: /trips/16216418
                          - img "These are the best offbeat hidden gems in southeast Oklahoma" [ref=e115]
                          - heading "These are the best offbeat hidden gems in southeast Oklahoma" [level=3] [ref=e116]:
                            - generic [ref=e117]: These are the best offbeat hidden gems in southeast Oklahoma
                          - paragraph [ref=e118]: 323 mi
                        - 'link "Need for Speed: A cross-country speedpark-fueled road trip Need for Speed: A cross-country speedpark-fueled road trip 2,741 mi" [ref=e120] [cursor=pointer]':
                          - /url: /trips/14352869
                          - 'img "Need for Speed: A cross-country speedpark-fueled road trip" [ref=e122]'
                          - 'heading "Need for Speed: A cross-country speedpark-fueled road trip" [level=3] [ref=e123]':
                            - generic [ref=e124]: "Need for Speed: A cross-country speedpark-fueled road trip"
                          - paragraph [ref=e125]: 2,741 mi
                        - 'link "Welcome to Choctaw Country: The heartland of enchantment Welcome to Choctaw Country: The heartland of enchantment 193 mi" [ref=e127] [cursor=pointer]':
                          - /url: /trips/16216387
                          - 'img "Welcome to Choctaw Country: The heartland of enchantment" [ref=e129]'
                          - 'heading "Welcome to Choctaw Country: The heartland of enchantment" [level=3] [ref=e130]':
                            - generic [ref=e131]: "Welcome to Choctaw Country: The heartland of enchantment"
                          - paragraph [ref=e132]: 193 mi
                        - 'link "America''s most wanted: See the graves of famous outlaws America''s most wanted: See the graves of famous outlaws" [ref=e134] [cursor=pointer]':
                          - /url: /trips/17118673
                          - 'img "America''s most wanted: See the graves of famous outlaws" [ref=e136]'
                          - 'heading "America''s most wanted: See the graves of famous outlaws" [level=3] [ref=e137]':
                            - generic [ref=e138]: "America's most wanted: See the graves of famous outlaws"
                        - link "Experience Endless Natural Beauty Along the Kiamichi Trace Experience Endless Natural Beauty Along the Kiamichi Trace 180 mi" [ref=e140] [cursor=pointer]:
                          - /url: /trips/17292023
                          - img "Experience Endless Natural Beauty Along the Kiamichi Trace" [ref=e142]
                          - heading "Experience Endless Natural Beauty Along the Kiamichi Trace" [level=3] [ref=e143]:
                            - generic [ref=e144]: Experience Endless Natural Beauty Along the Kiamichi Trace
                          - paragraph [ref=e145]: 180 mi
                        - 'link "Hidden Oklahoma: Explore the gems that time almost forgot Hidden Oklahoma: Explore the gems that time almost forgot 147 mi" [ref=e147] [cursor=pointer]':
                          - /url: /trips/17291467
                          - 'img "Hidden Oklahoma: Explore the gems that time almost forgot" [ref=e149]'
                          - 'heading "Hidden Oklahoma: Explore the gems that time almost forgot" [level=3] [ref=e150]':
                            - generic [ref=e151]: "Hidden Oklahoma: Explore the gems that time almost forgot"
                          - paragraph [ref=e152]: 147 mi
                        - link "The Ultimate Oklahoma I-44 Road Trip The Ultimate Oklahoma I-44 Road Trip 322 mi" [ref=e154] [cursor=pointer]:
                          - /url: /trips/15231595
                          - img "The Ultimate Oklahoma I-44 Road Trip" [ref=e156]
                          - heading "The Ultimate Oklahoma I-44 Road Trip" [level=3] [ref=e157]:
                            - generic [ref=e158]: The Ultimate Oklahoma I-44 Road Trip
                          - paragraph [ref=e159]: 322 mi
                        - 'link "Indian Mounds and Outlaw Hideouts: Oklahoma''s Wild History Indian Mounds and Outlaw Hideouts: Oklahoma''s Wild History 201 mi" [ref=e161] [cursor=pointer]':
                          - /url: /trips/17291005
                          - 'img "Indian Mounds and Outlaw Hideouts: Oklahoma''s Wild History" [ref=e163]'
                          - 'heading "Indian Mounds and Outlaw Hideouts: Oklahoma''s Wild History" [level=3] [ref=e164]':
                            - generic [ref=e165]: "Indian Mounds and Outlaw Hideouts: Oklahoma's Wild History"
                          - paragraph [ref=e166]: 201 mi
                        - link "The 12 most important Route 66 road trip photo ops The 12 most important Route 66 road trip photo ops 1,491 mi" [ref=e168] [cursor=pointer]:
                          - /url: /trips/14358996
                          - img "The 12 most important Route 66 road trip photo ops" [ref=e170]
                          - heading "The 12 most important Route 66 road trip photo ops" [level=3] [ref=e171]:
                            - generic [ref=e172]: The 12 most important Route 66 road trip photo ops
                          - paragraph [ref=e173]: 1,491 mi
                        - 'link "Road Trip Down US 83: The Road to Nowhere Road Trip Down US 83: The Road to Nowhere 1,869 mi" [ref=e175] [cursor=pointer]':
                          - /url: /trips/10397616
                          - 'img "Road Trip Down US 83: The Road to Nowhere" [ref=e177]'
                          - 'heading "Road Trip Down US 83: The Road to Nowhere" [level=3] [ref=e178]':
                            - generic [ref=e179]: "Road Trip Down US 83: The Road to Nowhere"
                          - paragraph [ref=e180]: 1,869 mi
                        - link "Offbeat guide to Kansas City, Missouri Offbeat guide to Kansas City, Missouri" [ref=e182] [cursor=pointer]:
                          - /url: /trips/14356652
                          - img "Offbeat guide to Kansas City, Missouri" [ref=e184]
                          - heading "Offbeat guide to Kansas City, Missouri" [level=3] [ref=e185]:
                            - generic [ref=e186]: Offbeat guide to Kansas City, Missouri
                        - 'link "Road trip along the Oregon Trail: A journey through history Road trip along the Oregon Trail: A journey through history 2,022 mi" [ref=e188] [cursor=pointer]':
                          - /url: /trips/14405751
                          - 'img "Road trip along the Oregon Trail: A journey through history" [ref=e190]'
                          - 'heading "Road trip along the Oregon Trail: A journey through history" [level=3] [ref=e191]':
                            - generic [ref=e192]: "Road trip along the Oregon Trail: A journey through history"
                          - paragraph [ref=e193]: 2,022 mi
                        - 'link "Will road-trip for BBQ: From Kansas City to the Carolinas Will road-trip for BBQ: From Kansas City to the Carolinas 2,211 mi" [ref=e195] [cursor=pointer]':
                          - /url: /trips/14425139
                          - 'img "Will road-trip for BBQ: From Kansas City to the Carolinas" [ref=e197]'
                          - 'heading "Will road-trip for BBQ: From Kansas City to the Carolinas" [level=3] [ref=e198]':
                            - generic [ref=e199]: "Will road-trip for BBQ: From Kansas City to the Carolinas"
                          - paragraph [ref=e200]: 2,211 mi
                      - button [ref=e201] [cursor=pointer]:
                        - img [ref=e203]
                  - link "Premium members get exclusive discounts from our partner brands" [ref=e206] [cursor=pointer]:
                    - /url: https://roadtrippers.com/member-deals/
                    - paragraph [ref=e208]: Premium members get exclusive discounts from our partner brands
                    - img [ref=e209]
                  - generic [ref=e211]:
                    - generic [ref=e212]:
                      - heading "Must-See Extraordinary Places" [level=2] [ref=e213]
                      - paragraph [ref=e214]:
                        - link "See all" [ref=e215] [cursor=pointer]:
                          - /url: https://roadtrippers.com/extraordinary-places
                    - generic [ref=e217]:
                      - generic [ref=e218]:
                        - link "Hakone Gardens Saratoga, CA 4.1" [ref=e219] [cursor=pointer]:
                          - /url: /us/saratoga-ca/points-of-interest/hakone-gardens-saratoga-ca
                          - img [ref=e222]
                          - generic [ref=e251]:
                            - heading "Hakone Gardens" [level=3] [ref=e252]
                            - paragraph [ref=e253]: Saratoga, CA
                            - list [ref=e254]:
                              - listitem [ref=e255]:
                                - generic [ref=e256]:
                                  - img [ref=e257]
                                  - generic [ref=e260]: "4.1"
                        - button [ref=e261] [cursor=pointer]:
                          - img [ref=e263]
                        - button [ref=e265] [cursor=pointer]:
                          - img [ref=e267]
                      - generic [ref=e269]:
                        - link "Mall of America® Bloomington, MN 4.5" [ref=e270] [cursor=pointer]:
                          - /url: /us/bloomington-mn/shopping/mall-of-america
                          - img [ref=e273]
                          - generic [ref=e313]:
                            - heading "Mall of America®" [level=3] [ref=e314]
                            - paragraph [ref=e315]: Bloomington, MN
                            - list [ref=e316]:
                              - listitem [ref=e317]:
                                - generic [ref=e318]:
                                  - img [ref=e319]
                                  - generic [ref=e322]: "4.5"
                        - button [ref=e323] [cursor=pointer]:
                          - img [ref=e325]
                        - button [ref=e327] [cursor=pointer]:
                          - img [ref=e329]
                      - generic [ref=e331]:
                        - link "Cadillac Ranch Amarillo, TX 4.0" [ref=e332] [cursor=pointer]:
                          - /url: /us/amarillo-tx/attractions/cadillac-ranch
                          - img [ref=e335]
                          - generic [ref=e368]:
                            - heading "Cadillac Ranch" [level=3] [ref=e369]
                            - paragraph [ref=e370]: Amarillo, TX
                            - list [ref=e371]:
                              - listitem [ref=e372]:
                                - generic [ref=e373]:
                                  - img [ref=e374]
                                  - generic [ref=e377]: "4.0"
                        - button [ref=e378] [cursor=pointer]:
                          - img [ref=e380]
                        - button [ref=e382] [cursor=pointer]:
                          - img [ref=e384]
                      - generic [ref=e386]:
                        - link "Colonial Williamsburg Williamsburg, VA 4.5" [ref=e387] [cursor=pointer]:
                          - /url: /us/williamsburg-va/points-of-interest/colonial-williamsburg-williamsburg
                          - img [ref=e390]
                          - generic [ref=e500]:
                            - heading "Colonial Williamsburg" [level=3] [ref=e501]
                            - paragraph [ref=e502]: Williamsburg, VA
                            - list [ref=e503]:
                              - listitem [ref=e504]:
                                - generic [ref=e505]:
                                  - img [ref=e506]
                                  - generic [ref=e509]: "4.5"
                        - button [ref=e510] [cursor=pointer]:
                          - img [ref=e512]
                        - button [ref=e514] [cursor=pointer]:
                          - img [ref=e516]
                      - generic [ref=e518]:
                        - link "The Pentagon Washington, DC 4.0" [ref=e519] [cursor=pointer]:
                          - /url: /us/washington-dc/attractions/the-pentagon
                          - img [ref=e522]
                          - generic [ref=e624]:
                            - heading "The Pentagon" [level=3] [ref=e625]
                            - paragraph [ref=e626]: Washington, DC
                            - list [ref=e627]:
                              - listitem [ref=e628]:
                                - generic [ref=e629]:
                                  - img [ref=e630]
                                  - generic [ref=e633]: "4.0"
                        - button [ref=e634] [cursor=pointer]:
                          - img [ref=e636]
                        - button [ref=e638] [cursor=pointer]:
                          - img [ref=e640]
                      - generic [ref=e642]:
                        - link "Cumberland Falls State Resort Park Corbin, KY 4.5" [ref=e643] [cursor=pointer]:
                          - /url: /us/corbin-ky/nature/cumberland-falls-state-resort-park-corbin-ky--2
                          - img [ref=e646]
                          - generic [ref=e695]:
                            - heading "Cumberland Falls State Resort Park" [level=3] [ref=e696]
                            - paragraph [ref=e697]: Corbin, KY
                            - list [ref=e698]:
                              - listitem [ref=e699]:
                                - generic [ref=e700]:
                                  - img [ref=e701]
                                  - generic [ref=e704]: "4.5"
                        - button [ref=e705] [cursor=pointer]:
                          - img [ref=e707]
                        - button [ref=e709] [cursor=pointer]:
                          - img [ref=e711]
              - button [ref=e713] [cursor=pointer]:
                - img [ref=e715]
          - generic [ref=e718]:
            - button "Explore" [ref=e719] [cursor=pointer]:
              - img [ref=e720]
              - generic [ref=e722]: Explore
            - button "Itinerary" [ref=e723] [cursor=pointer]:
              - img [ref=e724]
              - generic [ref=e726]: Itinerary
            - button "My trips" [ref=e727] [cursor=pointer]:
              - img [ref=e728]
              - generic [ref=e730]: My trips
            - button "Start Trip" [ref=e731] [cursor=pointer]:
              - img [ref=e732]
              - generic [ref=e734]: Start Trip
    - main [ref=e736]:
      - generic [ref=e739]:
        - generic [ref=e741]:
          - generic:
            - region "Map" [ref=e742]
            - generic "Map marker" [ref=e743] [cursor=pointer]:
              - generic [ref=e745]: "1"
            - generic "Map marker" [ref=e746] [cursor=pointer]:
              - generic [ref=e748]: "2"
          - generic:
            - generic:
              - generic:
                - button "Toggle attribution"
        - generic [ref=e749]:
          - heading "Do you have any places you already plan to visit?" [level=1] [ref=e750]
          - paragraph [ref=e751]: Start planning your route. If you're not sure where to stop, you can skip this step. You’ll be able to add more stops later.
          - generic [ref=e754]:
            - textbox "Add stops" [ref=e755]: Nashville
            - generic: Add stops
          - generic [ref=e760] [cursor=pointer]: I want to avoid highways
          - generic [ref=e761]:
            - generic [ref=e763]:
              - generic [ref=e766]: "1"
              - generic [ref=e767]:
                - button [ref=e768] [cursor=pointer]:
                  - img [ref=e770]
                - generic [ref=e773]: Chicago, IL
            - generic [ref=e775]:
              - generic [ref=e778]: "2"
              - generic [ref=e779]:
                - button [ref=e780] [cursor=pointer]:
                  - img [ref=e782]
                - generic [ref=e785]: Miami, FL
        - button "Launch trip" [ref=e788] [cursor=pointer]:
          - generic [ref=e789]: Launch trip
    - generic [ref=e791]:
      - link [ref=e792] [cursor=pointer]:
        - /url: https://roadtrippers.com/
        - img [ref=e793]
      - link "Exit" [ref=e800] [cursor=pointer]:
        - /url: /
  - button "Open support chat" [ref=e801] [cursor=pointer]:
    - img [ref=e802]
```

# Test source

```ts
  1  | import { expect } from "@playwright/test";
  2  | import { type TripPlannerPage } from "./trip-planner";
  3  | 
  4  | export class TripPlannerAsserter {
  5  | 	constructor(private readonly tripPlannerPage: TripPlannerPage) {}
  6  | 
  7  | 	// ── Modal assertions ───────────────────────────────────────────────────────
  8  | 
  9  | 	async createTripModalIsVisible(): Promise<void> {
  10 | 		await expect(this.tripPlannerPage.map.createTripModal).toBeVisible();
  11 | 	}
  12 | 
  13 | 	async createTripModalIsClosed(): Promise<void> {
  14 | 		await expect(this.tripPlannerPage.map.createTripModal).toBeHidden();
  15 | 	}
  16 | 
  17 | 	async originInputIsVisible(): Promise<void> {
  18 | 		await expect(this.tripPlannerPage.map.originInput).toBeVisible();
  19 | 	}
  20 | 
  21 | 	async destinationInputIsVisible(): Promise<void> {
  22 | 		await expect(this.tripPlannerPage.map.destinationInput).toBeVisible();
  23 | 	}
  24 | 
  25 | 	async originInputHasValue(value: string): Promise<void> {
  26 | 		await expect(this.tripPlannerPage.map.originInput).toHaveValue(value);
  27 | 	}
  28 | 
  29 | 	async destinationInputHasValue(value: string): Promise<void> {
  30 | 		await expect(this.tripPlannerPage.map.destinationInput).toHaveValue(value);
  31 | 	}
  32 | 
  33 | 	async originInputIsEmpty(): Promise<void> {
  34 | 		await expect(this.tripPlannerPage.map.originInput).toHaveValue("");
  35 | 	}
  36 | 
  37 | 	async destinationInputIsEmpty(): Promise<void> {
  38 | 		await expect(this.tripPlannerPage.map.destinationInput).toHaveValue("");
  39 | 	}
  40 | 
  41 | 	async quickLaunchIsSelected(): Promise<void> {
  42 | 		await expect(this.tripPlannerPage.map.quickLaunchRadio).toBeChecked();
  43 | 	}
  44 | 
  45 | 	async autopilotIsSelected(): Promise<void> {
  46 | 		await expect(this.tripPlannerPage.map.autopilotRadio).toBeChecked();
  47 | 	}
  48 | 
  49 | 	async createTripButtonIsVisible(): Promise<void> {
  50 | 		await expect(this.tripPlannerPage.map.createTripButton).toBeVisible();
  51 | 	}
  52 | 
  53 | 	async originInputShowsValidationError(): Promise<void> {
  54 | 		await expect(this.tripPlannerPage.map.originInputError).toBeVisible();
  55 | 	}
  56 | 
  57 | 	async destinationInputShowsValidationError(): Promise<void> {
  58 | 		await expect(this.tripPlannerPage.map.destinationInputError).toBeVisible();
  59 | 	}
  60 | 
  61 | 	// ── Onboarding / add-stops assertions ─────────────────────────────────────
  62 | 
  63 | 	async onboardingViewIsVisible(): Promise<void> {
  64 | 		await expect(this.tripPlannerPage.map.onboardingView).toBeVisible();
  65 | 	}
  66 | 
  67 | 	async waypointIsVisible(placeName: string): Promise<void> {
  68 | 		await expect(
  69 | 			this.tripPlannerPage.map.waypointItem(placeName),
  70 | 		).toBeVisible();
  71 | 	}
  72 | 
  73 | 	async waypointCountIs(count: number): Promise<void> {
  74 | 		await expect(
  75 | 			this.tripPlannerPage.map.waypointList.locator(".onboarding-waypoint-view"),
> 76 | 		).toHaveCount(count);
     |     ^ Error: expect(locator).toHaveCount(expected) failed
  77 | 	}
  78 | 
  79 | 	async launchTripButtonIsVisible(): Promise<void> {
  80 | 		await expect(this.tripPlannerPage.map.launchTripButton).toBeVisible();
  81 | 	}
  82 | 
  83 | 	// The Add stops autocomplete renders no items at all when there are no results
  84 | 	async noAddedStopResultsFound(): Promise<void> {
  85 | 		await expect(
  86 | 			this.tripPlannerPage.map.stopSearchResultItems,
  87 | 		).toHaveCount(0);
  88 | 	}
  89 | }
  90 | 
```