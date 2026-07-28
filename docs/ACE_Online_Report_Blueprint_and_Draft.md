# ACE Online Report Blueprint and Draft

## Working title

**Keeping Manhattan Moving**

### Working subtitle

**What 1.56 million camera-enforcement records reveal about bus-lane obstruction, enforcement outcomes, and where attention is needed next**

Alternative titles for office review:

- **Clear Lanes, Unclear Outcomes**
- **Caught on Camera: What Manhattan’s ACE Data Reveals**
- **Enforcing the Right of Way**
- **A Clearer Picture of Manhattan’s Bus Lanes**

The recommended title is **Keeping Manhattan Moving** because it is direct, neutral, and consistent with a public-sector report. “Clear Lanes, Unclear Outcomes” is more memorable but places greater emphasis on the growing non-issued share.

---

# Part I: Recommended Online Report Architecture

## 1. Sticky contents navigation

Use a narrow, persistent contents panel on desktop and a collapsible menu on mobile.

### Primary navigation

1. Why It Matters
2. How We Studied It
3. Explore the Map
4. Main Findings
5. What We Found
6. Confounding Factors
7. Recommendations
8. Data & Methodology

### “What We Found” sub-navigation

1. The overall trend
2. The growing non-issued share
3. Route concentration
4. Neighborhoods and corridors
5. Intersection hotspots

This closely follows the Manhattan Borough President’s dog waste report while giving the ACE report its own analytical logic.

---

## 2. Hero section

### Eyebrow

`NYC AUTOMATED CAMERA ENFORCEMENT`

### Headline

**Keeping Manhattan Moving**

### Standfirst

We analyzed more than 1.56 million Automated Camera Enforcement records from Manhattan to understand how enforcement has changed as the program has expanded, where issued violations are concentrated, and why a growing share of recorded events is not resulting in a violation.

### Publication line

`Published [MONTH YEAR] · Data: NYC Open Data, June 20, 2024–June 15, 2026`

### Hero visual

Use a restrained Manhattan map or abstract route-line graphic behind or beside the title. Do not use the full interactive map in the hero; save it for the exploration section.

### Optional hero statistic

Display one prominent number:

**1,566,130**

ACE records analyzed in Manhattan

---

## 3. Why It Matters

### Section label

`WHY IT MATTERS`

### Heading

**Blocked bus lanes and stops cost riders time—and can put them in danger**

### Content

Use three concise paragraphs:

1. Explain how bus-lane obstruction, double parking, and blocked bus stops delay service.
2. Explain the accessibility and safety implications when buses cannot reach the curb.
3. Explain why ACE expansion creates a timely need to evaluate both where the system records violations and what happens after an event is recorded.

### “What is ACE?” explainer box

Place a pale-colored explainer box beside or below the section:

**What is ACE?**

Automated Camera Enforcement uses cameras mounted on buses to document vehicles that block bus lanes, bus stops, or travel lanes along bus routes. The program is administered by the MTA in partnership with the New York City Department of Transportation and Department of Finance. A recorded event does not automatically become a violation: it may result in an issued violation, an exemption, or a rejection for technical or vehicle-information reasons.

### Context card

**The program is still expanding**

The MTA reported in July 2026 that ACE was active on 67 routes citywide, serving more than one million average weekday riders. This report evaluates Manhattan records through June 15, 2026, a different and earlier analytical window.

Source: [MTA Automated Camera Enforcement](https://www.mta.info/agency/new-york-city-transit/automated-camera-enforcement)

---

## 4. How We Studied It

### Section label

`HOW WE STUDIED IT`

### Heading

**We followed every Manhattan ACE record from location to outcome**

### Main text

Briefly explain:

- 1,596,097 source rows were reviewed.
- Records outside Manhattan, unmatched geographically, or otherwise outside the study rules were excluded.
- 1,566,130 records remained in the analytical dataset.
- Records span June 20, 2024 through June 15, 2026.
- Longitude and latitude were used to retain Manhattan events and assign each record to a 2020 Neighborhood Tabulation Area.
- Stop names were standardized so reversed street order and common suffix variations mapped to the same canonical intersection.
- Route activation dates were used to calculate active-route-day exposure.

### Study pipeline graphic

Use a horizontal four-step diagram:

`NYC Open Data records → Geographic validation → Outcome classification → Time and hotspot analysis`

On mobile, stack these vertically.

### Outcome-definition box

Use a three-column card:

| Outcome | Definition | Report treatment |
|---|---|---|
| Issued violation | Status is `VIOLATION ISSUED` | Counts as an issued violation |
| Exemption | One of four exempt statuses | Reported separately when useful |
| Rejection | Technical issue or missing driver/vehicle information | Reported separately when useful |

Below the table:

> Throughout the report, **non-issued records** means exemptions and rejections combined. These outcomes have different causes, but all share one important result: the recorded event did not become an issued violation.

---

## 5. Interactive Map

### Section label

`EXPLORE THE DATA`

### Heading

**Find an ACE hotspot**

### Introductory text

The interactive map plots the locations associated with all 765,297 issued violations in the Manhattan study dataset. Users can filter by bus route and neighborhood, search for a stop or intersection, change the minimum number of violations displayed, and zoom from the borough level to individual hotspots.

### Implementation

Embed the existing map:

[Manhattan Violation Explorer](https://ace-map.quinnaf19.workers.dev/)

Use a full-width iframe on desktop with a prominent “Open map in a new tab” link directly below it. On mobile, provide a static preview image and open the full map in a new tab if embedding produces an unusable layout.

### Required prepublication reconciliation

The analytical workbook reports **24,144 issued violations** for the canonical intersection `MALCOLM X BLVD / W 125 ST`, while the live map currently displays **22,315** for what appears to be the same hotspot. This likely reflects different aggregation rules: canonical intersection-name aggregation in the workbook versus narrower geographic-point aggregation in the map.

Before publication, Codex must:

1. Determine exactly why the totals differ.
2. Select and document one hotspot definition.
3. Make the report, map, tooltip, ranking panel, and downloadable data use the same definition.
4. Add a short methodology note explaining whether a “hotspot” means a canonical intersection, exact coordinate, clustered coordinates, or another spatial unit.

Until this is reconciled, the report draft uses the workbook’s canonical-intersection figure of 24,144.

---

## 6. “What This Data Measures” caution box

### Section label

`A NOTE BEFORE WE DIVE IN`

### Heading

**Camera records are not the same as the underlying prevalence of obstruction**

This should be a visually distinctive full-width section, similar to the dog waste report’s reporting-bias discussion.

Explain that totals depend on:

- Whether and when a route had ACE;
- How many buses and trips operated;
- How long the route was active;
- Camera availability and route operations;
- How events were reviewed and classified;
- Recent records that may not yet have matured into final outcomes; and
- The underlying frequency of bus-lane, bus-stop, and double-parking obstruction.

Conclude:

> This report therefore uses ACE records to identify patterns in recorded enforcement activity and outcomes. It does not treat raw counts as a direct measure of how frequently illegal obstruction occurs, and it does not claim that ACE caused the observed trends.

---

## 7. Main Findings

### Section label

`MAIN FINDINGS`

### Heading

**Here’s what the data shows**

### Introductory paragraph

Summarize the total analytical records and outcome split. Note that the most recent records require special care because of apparent processing lag.

### Key-number cards

Use five cards:

1. **1,566,130**  
   ACE records analyzed

2. **765,297**  
   issued violations

3. **51.1%**  
   of records did not result in an issued violation

4. **−4.41**  
   issued violations per active-route-day each month, the estimated median decline

5. **70.1%**  
   of issued violations came from three routes: M101, M15-SBS, and M100

### Key findings list

- **Expansion increased the system’s reach, but not necessarily the frequency of violations on an active route.** Raw monthly issued totals showed no statistically detectable monotonic trend through March 2026. After adjusting for the number of routes and days active, issued violations declined significantly.
- **A growing share of records did not produce a violation.** The combined exemption-and-rejection rate increased significantly through March 2026, rising by an estimated median 0.76 percentage points per month.
- **Issued violations were concentrated.** M101 alone accounted for 34.9% of issued violations, while M15-SBS accounted for 22.2% and M100 for 13.0%.
- **Uptown Manhattan contained many of the largest hotspots.** Washington Heights (South) recorded the most issued violations of any NTA, and West 125th Street contained several of the highest-volume intersections.
- **Recent months cannot yet be read as a completed enforcement outcome.** April through June 2026 contained continued exemptions and rejections but almost no issued violations, consistent with an unresolved outcome-processing lag.

### Chart immediately following the cards

**Chart: All ACE outcomes**

A 100% stacked horizontal bar showing:

- Issued: 765,297 (48.9%)
- Exemptions: 501,795 (32.0%)
- Technical rejections: 171,648 (11.0%)
- DMV/vehicle-information rejections: 127,390 (8.1%)

These totals come from the final monthly analytical table and sum to the 1,566,130 analytical records. Confirm them once more against the final analysis dataset before publication.

---

# Part II: Detailed Findings Blueprint and Draft Copy

## Finding 1: The headline trend changes when program expansion is taken into account

### Section label

`FINDING 1`

### Heading

**More routes produced more coverage—but violations declined after adjusting for exposure**

### “Why we looked at this” box

> **Why we looked at this:** ACE expanded from four active Manhattan routes at the beginning of the study period to 15 by March 2026. A rise in total violations could therefore reflect more enforcement coverage rather than more violations on routes already using the system.

### Recommended visual sequence

1. **Chart 1A:** Monthly issued violations, July 2024–March 2026.
2. **Chart 1B:** Number of active routes by month, shown as bars or a step line.
3. **Chart 1C:** Issued violations per active-route-day, July 2024–March 2026.
4. Optional small chart: Issued violations on the constant four-route cohort.

June 2024 should be labeled as a partial month. April–June 2026 should be excluded from primary trend charts or shown as a shaded “outcome maturation” region.

### Draft copy

Looking only at total violations gives an incomplete picture of how ACE changed over time. The program began the study period with four active Manhattan routes and expanded steadily, reaching 15 active routes by March 2026. Each added route created new opportunities for bus-mounted cameras to record obstruction and for the City to issue violations.

Across the complete-month study window from July 2024 through March 2026, raw monthly issued violations did not show a statistically detectable upward or downward trend. The Mann–Kendall trend test produced a Kendall’s tau of 0.105 and a p-value of 0.526, meaning the month-to-month pattern was too inconsistent to conclude that total issued violations were moving steadily in either direction. The estimated median change was an increase of 469 violations per month, but that estimate was not statistically significant.

The result changes when the expansion of ACE is taken into account. After dividing monthly violations by the number of days each active route was operating, issued violations declined significantly. The median estimated change was **4.41 fewer issued violations per active-route-day each month** (Kendall’s tau = −0.438; p = 0.006).

A second test reached a similar conclusion. Four routes—M14-SBS, M15-SBS, M23-SBS, and M34-SBS—were active throughout the full comparison period. Within this constant group, issued violations declined by an estimated **130 per month** (Kendall’s tau = −0.324; p = 0.043).

These findings do not prove that ACE caused drivers to change their behavior. Bus service, traffic, construction, camera operations, enforcement rules, and other conditions may also have changed. But they show why total violations should not be interpreted without accounting for the program’s rapidly growing footprint.

### Key-finding callout

> **Key finding:** Total monthly violations did not show a clear trend, but issued violations declined significantly after adjusting for route exposure. Program expansion masked a downward pattern on an active-route basis.

### Interpretation card

**What this could mean**

The decline is consistent with several possibilities: drivers may become more compliant after routes receive camera enforcement; enforcement may be most productive shortly after activation; or operational differences may reduce recorded or issued violations over time. Additional data on bus trips, camera uptime, warning periods, and repeat offenders would be needed to distinguish among these explanations.

---

## Finding 2: A growing share of records did not result in an issued violation

### Section label

`FINDING 2`

### Heading

**The non-issued share rose even as route-adjusted violations fell**

### “Why we looked at this” box

> **Why we looked at this:** A camera record is not the same as an issued violation. Understanding how many events are exempted or rejected is essential for evaluating how recorded enforcement activity moves through the review process.

### Recommended visuals

1. **Chart 2A:** Monthly issued share versus combined non-issued share, July 2024–March 2026.
2. **Chart 2B:** Monthly outcome composition, separated into issued, exempt, technical rejection, and DMV rejection.
3. **Chart 2C:** Indexed trend or percentage-point change in combined non-issued rate.

Do not mix April–June 2026 into the primary line without a strong visual warning. Ideally, add a shaded right-hand area labeled “Outcomes may still be maturing.”

### Draft copy

Of the 1,566,130 ACE records in the final Manhattan dataset, **765,297 resulted in an issued violation**. The remaining **800,833 records—51.1% of the total—did not**.

Non-issued records include both exemptions and rejections. Exemptions cover circumstances recognized by the program, including emergency vehicles, buses and paratransit, qualifying commercial vehicles, and other exempt situations. Rejections include technical issues and records for which driver or vehicle information was missing. These categories have different causes and should be monitored separately. From the standpoint of enforcement output, however, they share one result: no violation was issued.

The combined non-issued rate increased significantly between July 2024 and March 2026. A nonparametric trend test estimated a median increase of **0.76 percentage points per month** (Kendall’s tau = 0.733; p < 0.001). A weighted regression, which gave greater weight to months containing more records, estimated a similar increase of **0.89 percentage points per month** (p < 0.001; R² = 0.781).

The monthly combined non-issued rate was **43.9% in July 2024** and **52.3% in March 2026**. The path was not perfectly linear, but the longer-term direction was clear.

The final three months of the dataset require separate treatment. April 2026 contained 2,093 issued violations, while May and the first half of June contained none, even though exemptions and rejections continued to appear. That pattern is consistent with records awaiting a final issued outcome, but the dataset alone cannot confirm the cause. For that reason, the primary trend analysis ends in March 2026.

### Key-finding callout

> **Key finding:** More than half of all Manhattan ACE records did not result in an issued violation, and the non-issued share rose significantly through March 2026.

### Accountability question box

**The next question is why**

The aggregate data cannot show whether the increase resulted from more legitimate exemptions, technical limitations, incomplete vehicle information, changes in review practices, or timing differences in how outcomes are posted. A transparent program should make those pathways easy to distinguish.

---

## Finding 3: A small number of routes account for most issued violations

### Section label

`FINDING 3`

### Heading

**Three routes generated seven in ten Manhattan violations**

### “Why we looked at this” box

> **Why we looked at this:** Route totals reveal where ACE records are most concentrated, but they must be interpreted alongside activation dates, route length, service frequency, and the number of camera-equipped trips.

### Recommended visuals

1. **Chart 3A:** Ranked horizontal bars for issued violations by route.
2. **Chart 3B:** Top-route share of all Manhattan issued violations.
3. Optional: outcome composition for selected high-volume or high-non-issued routes, with activation-date warnings.

### Draft copy

Issued violations were not evenly distributed across Manhattan’s ACE routes. The **M101 recorded 266,710 issued violations**, representing **34.9%** of the boroughwide total. The **M15-SBS recorded 170,030**, or **22.2%**, while the **M100 recorded 99,777**, or **13.0%**.

Together, these three routes accounted for **70.1% of all issued violations** in the analytical dataset. The M60-SBS ranked fourth with 58,464 issued violations, or 7.6%.

This concentration does not necessarily mean that drivers violate the rules more often on these routes. The M101 and M15-SBS cover long, heavily traveled corridors and were active for much more of the study period than several newer routes. More frequent service creates more opportunities for bus-mounted cameras to encounter an obstructing vehicle. Route totals therefore identify where ACE enforcement activity is concentrated, not a standardized violation risk per bus trip.

Still, the concentration is operationally meaningful. Routes producing large shares of issued violations identify corridors where illegal stopping and parking repeatedly intersect with high-frequency bus service. They are logical places for closer curb-management review, loading-zone analysis, targeted outreach, and complementary street design.

### Key-finding callout

> **Key finding:** The M101, M15-SBS, and M100 generated 70.1% of all issued violations in the Manhattan dataset.

### Selected-route sidebar

**Routes worth a closer look**

- **M101:** Largest absolute volume, with 266,710 issued violations.
- **M15-SBS:** Second-largest volume, with 170,030 issued violations along the First and Second Avenue corridor.
- **M100:** Third-largest volume despite beginning ACE later in the study period, on May 27, 2025.
- **M42 and M57:** High aggregate non-issued shares, although route start dates and recent-outcome maturation make direct comparisons especially sensitive.

The report should not provide a profile for every route. These examples should be used only to illustrate distinct analytical patterns.

---

## Finding 4: Issued violations cluster in specific neighborhoods and corridors

### Section label

`FINDING 4`

### Heading

**The geography of ACE enforcement is highly concentrated**

### “Why we looked at this” box

> **Why we looked at this:** Boroughwide totals can conceal the specific streets and communities where bus-lane and curb obstruction repeatedly interfere with service.

### Recommended visuals

1. **Chart 4A:** Top 10 NTAs by issued violations.
2. **Map 4B:** Neighborhood choropleth showing issued counts and, on toggle, non-issued rates.
3. **Chart 4C:** Top 15 corridors by issued violations.
4. Include a button returning readers to the interactive map.

### Draft copy

Washington Heights and Harlem feature prominently in the geographic distribution of issued ACE violations.

**Washington Heights (South) recorded 85,554 issued violations**, the highest total of any Manhattan Neighborhood Tabulation Area and **11.2% of all issued violations** in the dataset. Harlem (South) ranked second with 73,664, or 9.6%, followed by Washington Heights (North) with 61,361, or 8.0%. Together, these three NTAs accounted for approximately **28.4%** of issued violations.

The pattern also appears at the corridor level. **Amsterdam Avenue recorded 116,494 issued violations**, representing **15.2%** of all Manhattan issued violations. Broadway followed with 87,971, or 11.5%; Third Avenue with 74,495, or 9.7%; and West 125th Street with 70,910, or 9.3%. Combined, these four corridor labels accounted for approximately **45.7%** of all issued violations.

Corridor totals should be interpreted carefully. The analysis defines a corridor using the first street component of each standardized stop label. A record labeled “Amsterdam Avenue / West 161st Street,” for example, is assigned to Amsterdam Avenue. This is useful for identifying broad patterns but does not measure route mileage, bus frequency, traffic volume, or the length of each street represented.

The uptown concentration nonetheless provides a clear signal for follow-up. Amsterdam Avenue, Broadway, and 125th Street are important bus corridors serving neighborhoods where reliable transit is central to everyday mobility. Repeated obstruction at these locations may have effects well beyond the individual vehicle receiving—or not receiving—a violation.

### Key-finding callout

> **Key finding:** Washington Heights (South) led all neighborhoods, while Amsterdam Avenue led all corridor labels. Four corridors accounted for approximately 45.7% of issued violations.

---

## Finding 5: West 125th Street anchors several of Manhattan’s largest hotspots

### Section label

`FINDING 5`

### Heading

**The highest-volume intersections form recognizable hotspot clusters**

### “Why we looked at this” box

> **Why we looked at this:** A neighborhood or route ranking tells us where to look. Intersection-level hotspots show where targeted curb management or street-level intervention may be possible.

### Recommended visuals

1. **Chart 5A:** Ranked top 15 canonical intersections.
2. **Map 5B:** Zoomed map centered on the 125th Street cluster.
3. **Table 5C:** Top intersections with total records, issued violations, non-issued records, and non-issued rate.

### Draft copy

The highest-volume canonical intersection in the analytical workbook was **Malcolm X Boulevard and West 125th Street**, with **24,144 issued violations**, or **3.15% of all issued violations in Manhattan**.

Several other major hotspots were located along or near West 125th Street:

- Saint Nicholas Avenue and West 125th Street: 17,012 issued violations;
- Adam Clayton Powell Jr. Boulevard and West 125th Street: 10,131;
- Frederick Douglass Boulevard and West 125th Street: 9,980; and
- Fifth Avenue and West 125th Street: 6,423.

Other leading intersections included Catherine Street and Madison Street, with 13,112 issued violations; Second Avenue and East 78th Street, with 10,490; Second Avenue and East 125th Street, with 10,254; and Broadway and West 178th Street, with 10,238.

The recurring concentration around 125th Street suggests that enforcement should not be considered route by route alone. Several bus routes and major avenues intersect on the corridor, and obstruction may reflect broader curb demand, commercial loading, passenger pickup and drop-off activity, street design, and traffic circulation. Corridor-level responses may therefore be more effective than treating each route independently.

### Key-finding callout

> **Key finding:** West 125th Street contains multiple top-ranked ACE hotspots, making it a strong candidate for a coordinated corridor-level review.

### Important map note

Do not publish the Malcolm X Boulevard / West 125th Street number until the map-versus-workbook aggregation discrepancy described earlier has been resolved.

---

## Optional Finding 6: Non-issued outcomes also vary geographically

This section is optional. Include it if the office wants greater emphasis on administrative outcomes rather than only issued violations.

### Section label

`FINDING 6`

### Heading

**High non-issued counts and high non-issued rates are not the same thing**

### Recommended visuals

1. Side-by-side maps: non-issued count versus non-issued rate.
2. Ranked rate chart restricted to locations with at least 1,000 total records.
3. Outcome composition for the highest-rate NTAs.

### Draft copy

Areas generating many ACE records will often generate many non-issued records simply because of their size. For that reason, this report distinguishes between the number of non-issued records and the rate at which records do not result in a violation.

Among Manhattan NTAs with at least 1,000 total ACE records, the **United Nations NTA had the highest combined non-issued rate: 86.3%, or 2,352 of 2,726 records**. Upper West Side–Lincoln Square followed at 81.4%, while Highbridge Park recorded 73.5% and Midtown–Times Square recorded 71.6%.

These areas did not necessarily produce the largest number of exemptions or rejections. Instead, they had the largest non-issued share among locations meeting the minimum-record threshold. Their rates may reflect local traffic functions, exempt vehicle activity, route operations, technical issues, or other place-specific conditions. The aggregate dataset cannot determine which explanation dominates.

### Key-finding callout

> **Key finding:** Non-issued outcomes vary substantially by place, but a high rate is a prompt for investigation—not evidence of improper review.

---

# Part III: Confounding Factors and Limitations

## Section label

`CONFOUNDING FACTORS`

## Heading

**What else may shape the patterns**

Present these as a grid of concise cards rather than a wall of text.

### 1. Staggered implementation

Routes entered ACE at different times. Later routes had fewer months in which to produce records, while established routes had much longer exposure.

### 2. Bus frequency and service levels

A route operating more buses and trips creates more opportunities for its cameras to observe an obstruction. The dataset does not provide a denominator of camera-equipped bus trips.

### 3. Route length and overlap

Long routes cover more street space, and multiple routes may share the same corridor. Raw route and corridor totals do not control for route miles.

### 4. Camera coverage and uptime

The dataset records events that entered the ACE system. It does not show when cameras were unavailable, how many buses were equipped, or how coverage varied by route and day.

### 5. Warning periods and enforcement rules

New ACE routes begin with warning notices before fine-bearing enforcement. Differences in route age and enforcement stage can affect observed outcomes.

### 6. Processing and outcome maturation

Recent records may appear as exempted or rejected before issued outcomes are fully posted. April–June 2026 are therefore excluded from primary trend inference.

### 7. Traffic, construction, and special events

Street work, parades, school activity, tourism, business loading, hospital and emergency activity, weather, and seasonal travel patterns can change curb demand and traffic conditions.

### 8. Land use and curb function

Commercial districts, school zones, hospitals, major destinations, and dense residential areas place different demands on limited curb space. These factors may explain part of the geographic pattern.

### 9. Stop and corridor standardization

Stop labels were normalized to combine common formatting differences and reversed street order. Corridor assignment uses the first street component in a standardized label. These methods improve comparability but may combine or separate locations differently from the live map.

### 10. Descriptive—not causal

The analysis identifies patterns in ACE records. It cannot establish that ACE caused fewer violations, faster buses, or changes in driver behavior without a comparison group or stronger before-and-after design.

---

# Part IV: Tentative Recommendations

## Section label

`RECOMMENDATIONS`

## Heading

**Use expansion to target the places where enforcement and street design can do the most**

Add a small label above this section:

`DRAFT FOR OFFICE REVIEW`

These recommendations should remain explicitly tentative until reviewed by the Manhattan Borough President’s Office.

## Recommendation 1: Expand ACE strategically, not evenly

### Draft copy

Future expansion should prioritize routes and corridors where obstruction is most likely to delay large numbers of riders or prevent accessible boarding—not simply distribute ACE evenly across the map. Candidate routes should be scored using ridership, bus speed, service frequency, bus-lane and bus-stop obstruction, double-parking data, crash and safety indicators, accessibility needs, and existing camera coverage.

The current dataset includes only routes that already use ACE. It therefore cannot identify the best non-ACE route by itself. Before recommending specific additions, the MTA and City should compare existing ACE routes with candidate routes that lack enforcement.

## Recommendation 2: Treat hotspot corridors as systems, not isolated route segments

### Draft copy

The clustering around West 125th Street, Amsterdam Avenue, Broadway, First and Second Avenues, and Third Avenue suggests that some problems operate at the corridor level. Where multiple bus routes share or cross a hotspot, the City should conduct coordinated reviews of loading zones, passenger pickup and drop-off activity, commercial deliveries, curb regulations, signal and lane design, and enforcement coverage.

West 125th Street is a particularly strong candidate for this type of review because several of Manhattan’s largest canonical-intersection hotspots are located along the corridor.

## Recommendation 3: Pair camera enforcement with curb-management changes

### Draft copy

Cameras can document and deter illegal obstruction, but repeated hotspots may indicate that curb demand and street design are working against compliance. At persistent locations, ACE should be paired with appropriate loading zones, clearer bus-stop markings, daylighting or physical treatments where warranted, delivery-management strategies, and targeted outreach to businesses, institutions, taxi and for-hire vehicle operators, and other frequent curb users.

## Recommendation 4: Audit the rise in non-issued outcomes

### Draft copy

The growing non-issued share warrants a transparent operational review. The MTA, Department of Finance, and Department of Transportation should publish regular outcome reports distinguishing exemptions, technical rejections, missing driver or vehicle information, warning notices, pending records, and final issued violations.

The goal should not be to eliminate legitimate exemptions. It should be to determine whether technical or administrative barriers are preventing otherwise valid events from becoming enforceable violations and to ensure that the public can understand how recorded events move through the system.

## Recommendation 5: Publish meaningful exposure measures

### Draft copy

Route totals cannot be compared fairly without knowing how much enforcement opportunity each route had. Future public datasets should include or be accompanied by monthly measures of camera-equipped bus trips, camera operating hours, route miles covered, scheduled service, warning-period status, and typical outcome-processing time.

These denominators would allow the public and policymakers to distinguish between a route that produces more violations because it runs more service and a route that produces more violations per unit of exposure.

## Recommendation 6: Build evaluation into every new rollout

### Draft copy

Each newly activated route should have a documented baseline and evaluation plan. At minimum, agencies should preserve pre-implementation measures of bus speed, reliability, collisions, obstruction complaints, and curb activity; identify a reasonable comparison corridor; and report results at regular intervals after activation.

Expansion creates an opportunity not only to deploy ACE more widely, but also to learn where it works best and which complementary street treatments produce the strongest results.

## Recommendation summary cards

1. **Target expansion** using ridership, delay, obstruction, safety, and accessibility.
2. **Review corridors** where multiple hotspots and routes intersect.
3. **Fix the curb** alongside enforcement.
4. **Explain non-issued outcomes** through transparent reporting.
5. **Publish exposure data** for fair route comparisons.
6. **Evaluate every rollout** with a baseline and comparison strategy.

---

# Part V: Data & Methodology

## Section label

`DATA & METHODOLOGY`

## Heading

**How the analysis was produced**

This section can be collapsed by default, with anchor links to subsections.

## Data source

The primary source is the NYC Open Data dataset containing MTA Automated Camera Enforcement records. The analytical extract covered June 20, 2024 through June 15, 2026.

Fields used:

- Violation ID
- First Occurrence
- Violation Status
- Bus Route ID
- Stop Name
- Violation Georeference

Insert the exact NYC Open Data dataset URL before publication.

## Record preparation

- Source rows reviewed: 1,596,097
- Rows outside Manhattan, unmatched geographically, or otherwise excluded: 29,967
- Preimplementation records excluded: 607
- Duplicate-ID rows removed: 0
- Final analytical records: 1,566,130
- Missing violation-status values: 26
- Missing stop-name values: 6,161
- Missing georeferences: 0

## Geographic assignment

Records were assigned to Manhattan using exact longitude and latitude and a point-in-polygon test against NYC Department of City Planning 2020 Census Tracts. NTA names were taken from the containing tract. NTAs are statistical approximations of neighborhoods and should not be treated as definitive neighborhood boundaries.

Sources:

- [NYC Department of City Planning Neighborhood Tabulation Areas](https://www.nyc.gov/content/planning/pages/resources/datasets/neighborhood-tabulation)
- [2020 Census Tract GeoJSON](https://data.cityofnewyork.us/resource/63ge-mke6.geojson?$limit=5000)
- [2020 NTA GeoJSON](https://data.cityofnewyork.us/resource/9nt8-h7nd.geojson?$limit=5000)

## Stop and corridor standardization

Stop names were converted to uppercase, punctuation and common street suffixes were normalized, and reversed intersection order was standardized. Median coordinates were retained for map display.

Corridors were defined using the first street component in the standardized original stop label. Ambiguous or non-intersection labels remained literal.

## Outcome categories

- **Issued:** `VIOLATION ISSUED`
- **Exemptions:** Four `EXEMPT` statuses
- **Technical rejection:** `TECHNICAL ISSUE/OTHER`
- **DMV rejection:** `DRIVER/VEHICLE INFO MISSING`
- **Non-issued:** All exemptions and rejections combined

## Route exposure

Implementation dates were supplied for all routes in the analytical dataset. Monthly active-route-days were calculated from these dates. The constant-cohort analysis used M14-SBS, M15-SBS, M23-SBS, and M34-SBS.

## Statistical methods

### Mann–Kendall trend test

The Mann–Kendall test was used to assess whether monthly measures showed a consistent upward or downward pattern without requiring a linear relationship or normally distributed values.

### Sen slope

Sen slope estimated the median monthly change associated with each trend.

### Weighted ordinary least squares

A weighted regression estimated the monthly change in the combined non-issued share, giving greater weight to months containing more ACE records.

### Primary inference window

Primary temporal tests use complete months from July 2024 through March 2026. June 2024 is incomplete. April–June 2026 were excluded from primary inference because issued outcomes dropped to 2,093, zero, and zero despite continued non-issued records, a pattern consistent with outcome-processing lag.

## Known limitations

Include the ten confounding-factor cards in a condensed technical form, plus:

- The dataset contains enforcement outcomes, not direct measurements of obstruction.
- It lacks camera-equipped trip and camera-uptime denominators.
- The design is descriptive and does not establish causality.
- The latest records may not have reached final disposition.
- Route totals are affected by route age, length, frequency, and overlap.
- NTA boundaries approximate neighborhoods.
- Stop-label and point-based hotspot aggregation can produce different totals and must be reconciled before publication.

## Downloads

Provide clearly labeled links to:

- Final analytical workbook
- Monthly summary CSV
- Route summary CSV
- Neighborhood summary CSV
- Corridor summary CSV
- Canonical stop summary CSV
- Map-ready data
- Reproducible analysis code

---

# Part VI: Complete Opening Narrative Draft

The following copy can be inserted into the report before the detailed finding sections.

## Why It Matters

### Blocked bus lanes and stops cost riders time—and can put them in danger

New York City buses depend on clear streets and accessible curbs. When a vehicle blocks a bus lane, double parks along a route, or occupies a bus stop, it can delay service for every rider behind it. When a bus cannot pull fully to the curb, passengers may have to board or exit in the street—a particular barrier for riders using wheelchairs and others who need an accessible boarding area.

Automated Camera Enforcement, or ACE, is one of the City’s main tools for addressing these obstructions. Cameras mounted on buses document vehicles blocking bus lanes, bus stops, and travel lanes along participating routes. The system is administered by the MTA in partnership with the New York City Department of Transportation and Department of Finance.

ACE is also expanding. The MTA reported in July 2026 that the program was active on 67 routes citywide and benefited more than one million average weekday riders. As more routes receive cameras, policymakers need to understand not only how many records the system generates, but where those records are concentrated and what happens after an event is captured.

This report analyzes more than 1.56 million Manhattan ACE records to answer three basic questions: Has enforcement activity changed over time? Where are issued violations concentrated? And how often does a recorded event actually result in an issued violation?

## How We Studied It

### We followed every Manhattan ACE record from location to outcome

We reviewed 1,596,097 records spanning June 20, 2024 through June 15, 2026. Using the longitude and latitude associated with each event, we retained records located within Manhattan and assigned them to 2020 Neighborhood Tabulation Areas. We excluded records outside the borough, records that could not be matched geographically, and records dated before a route’s ACE activation.

The final analytical dataset contains 1,566,130 records. We classified each record as an issued violation, exemption, technical rejection, or rejection caused by missing driver or vehicle information. When discussing all outcomes that did not become a violation, we use the term **non-issued records**. This combined category does not imply that every record should have resulted in a fine; legitimate exemptions and invalid records are necessary parts of the review process.

We also standardized stop and intersection labels, calculated totals by route, neighborhood, corridor, and canonical intersection, and used route implementation dates to adjust monthly trends for the number of routes and days active. Because the most recent months show signs that outcomes had not fully matured, our primary trend analysis ends in March 2026.

## Explore the Map

### Find an ACE hotspot

The map below displays all 765,297 issued violations in the Manhattan study dataset. Use the controls to filter by route or neighborhood, search for a stop or intersection, change the minimum violation threshold, and zoom in to explore individual hotspots.

The map identifies patterns in recorded enforcement activity. It should not be read as a direct measure of how often illegal obstruction occurs. A location’s total depends on bus frequency, route coverage, camera operations, time in the program, and the outcome-review process, as well as driver behavior.

## What This Data Measures

### Camera records are not the same as the underlying prevalence of obstruction

An ACE record begins with a camera-equipped bus encountering a potential obstruction. That means a record can exist only where an ACE route operates, when a participating bus is present, and when its camera system is functioning. Routes with more frequent service naturally have more opportunities to encounter an illegally stopped or parked vehicle.

The program also expanded throughout the study period. Manhattan began with four active routes in June 2024 and reached 15 by March 2026. A boroughwide rise in total records could therefore reflect a broader enforcement footprint rather than a change in behavior on routes that already had ACE.

Finally, not every recorded event becomes an issued violation. Some qualify for exemptions; some encounter technical problems; and some lack the driver or vehicle information needed for issuance. Recent records may also take time to receive their final status.

This report uses ACE data for what it can do best: identify patterns in recorded enforcement activity and outcomes across time and place. It does not claim that raw record totals measure the absolute prevalence of obstruction, and it does not claim that ACE caused the observed changes.

## Main Findings

### Here’s what the data shows

The final analytical dataset contains 1,566,130 Manhattan ACE records. Of those, 765,297—48.9%—resulted in an issued violation. The remaining 800,833 records, or 51.1%, were exempted or rejected.

The most important temporal finding is easy to miss in the raw totals. Monthly issued violations did not show a consistent upward or downward trend through March 2026. But during that period, ACE expanded from four to 15 active Manhattan routes. Once the analysis accounts for the number of routes and days active, issued violations show a statistically significant decline.

At the same time, the share of records that did not result in a violation increased significantly. That does not mean those records should necessarily have produced violations; many exemptions are legitimate. It does mean that a growing share of recorded events exited the system without an issued violation, creating an important question for program administrators.

The geography is equally striking. Three routes—the M101, M15-SBS, and M100—accounted for 70.1% of issued violations. Washington Heights (South) led all NTAs, Amsterdam Avenue led all corridor labels, and several of the largest intersection hotspots were concentrated along West 125th Street.

Together, these findings suggest two priorities. First, the City should evaluate ACE using exposure-adjusted measures rather than raw totals alone. Second, expansion should be paired with targeted investigation of the corridors and administrative pathways where records are most concentrated.

---

# Part VII: Codex Build Prompt

Copy the following prompt into the Codex thread that contains the analysis outputs, workbook, charts, CSVs, and map code.

## Prompt

Build a polished, public-facing online report about Manhattan’s Automated Camera Enforcement program. Use the attached `ACE_Online_Report_Blueprint_and_Draft.md` as the controlling content and structure specification, the uploaded analysis workbook and generated CSVs as the numerical source of truth, and the Manhattan Borough President’s dog waste report as the primary structural and visual reference:

https://mbp-bhs.github.io/manhattan-dog-waste/analysis.html

The existing interactive map is:

https://ace-map.quinnaf19.workers.dev/

### Purpose and audience

The report is intended for Manhattan residents, transit riders, policymakers, transportation advocates, journalists, and agency staff. It should explain the findings in plain language while preserving methodological rigor. The tone should be professional, accessible, and consistent with a Manhattan Borough President’s Office policy report.

### Required page structure

Build the report in this order:

1. Sticky contents navigation
2. Hero
3. Why It Matters
4. What Is ACE? explainer
5. How We Studied It
6. Interactive Map
7. What This Data Measures
8. Main Findings and key-number cards
9. Finding 1: exposure-adjusted temporal trend
10. Finding 2: growing non-issued share
11. Finding 3: concentration by route
12. Finding 4: concentration by neighborhood and corridor
13. Finding 5: intersection hotspots
14. Optional Finding 6: geographic non-issued rates
15. Confounding Factors
16. Tentative Recommendations
17. Data & Methodology
18. Downloads and sources

Follow the exact section headings, draft language, chart recommendations, callout boxes, and methodological guardrails in the blueprint unless the underlying verified data requires a correction.

### Data rules

1. Treat the analysis workbook and final analysis-ready datasets as the source of truth.
2. Never copy a statistic from prose without reconciling it to the underlying summary table.
3. Use exact counts internally and round percentages to one decimal place in public-facing text unless greater precision is substantively necessary.
4. Distinguish exemptions, technical rejections, and DMV/vehicle-information rejections wherever space permits.
5. Use **non-issued records** as the umbrella term for all exemptions and rejections. Explain that these statuses have different causes but share the result that no violation was issued.
6. Do not imply that every non-issued record should have become a violation.
7. Do not interpret raw route totals as standardized violation risk.
8. Do not make causal claims.
9. Exclude April–June 2026 from primary trend inference and clearly explain the outcome-maturation concern.
10. Label June 2024 and June 2026 as partial months wherever displayed.

### Required reconciliation

Before building the final hotspot section, resolve the discrepancy between:

- Workbook canonical-stop total for Malcolm X Boulevard / West 125th Street: 24,144 issued violations; and
- Existing live-map display: 22,315 issued violations.

Determine whether the difference is caused by exact-coordinate aggregation, canonical stop-name aggregation, geographic clustering, filtering, or a data-version difference. Select one documented definition and make the following agree:

- Report prose
- Chart rankings
- Map point or cluster
- Map sidebar
- Tooltip
- Downloadable stop summary

Do not silently choose one value. Document the resolution in a brief developer note and add a concise methodology note for readers.

### Interactive map

Embed the existing map within the report if technically reliable. Include:

- Bus-route filter
- Neighborhood filter
- Stop/intersection search
- Minimum-issued-violation threshold
- Reset control
- Visible-record counts
- Ranked visible-hotspot list
- Accessible legend
- Clear mobile alternative
- “Open map in a new tab” link

If the map and report are separate applications, preserve the map’s existing functionality and style while making the transition between them visually coherent.

### Required charts

Create or reuse the following:

1. Overall outcome composition
2. Monthly issued violations
3. Active routes by month
4. Issued violations per active-route-day
5. Constant four-route cohort trend
6. Monthly issued versus non-issued share
7. Monthly outcome composition by status
8. Ranked route totals
9. Ranked NTA totals
10. Ranked corridor totals
11. Ranked canonical-intersection hotspots
12. Optional: ranked NTA non-issued rates with a 1,000-record minimum

Every chart must have:

- A conclusion-oriented title
- Plain-language subtitle
- Explicit date window
- Legible axis labels
- Source note
- Accessible color contrast
- Alt text or an equivalent accessible description
- Responsive mobile behavior

Do not use a graph when a key-number card or short table communicates the result more clearly.

### Visual style

Use the dog waste report as a structural reference, not as a pixel-for-pixel copy. Preserve these design principles:

- Strong editorial typography
- Clear section labels
- Wide reading column
- Distinct “Why we looked at this” boxes
- Large key-number cards
- Full-width charts at important transitions
- Visually prominent key-finding blockquotes
- Recommendation callouts
- Collapsible technical methodology
- Sticky navigation on desktop
- Excellent mobile readability

Use a restrained transit-oriented palette. A dark navy, warm off-white, MTA-inspired blue, and one amber or red accent would work well. Avoid excessive color, dashboard-like density, and decorative animation that competes with the findings.

### Recommendations

Label recommendations as **Draft for Office Review**. Do not present the current dataset as sufficient to select a specific non-ACE route. Explain that ranking expansion candidates requires, at minimum:

- Ridership
- Bus speed and reliability
- Service frequency
- Bus-route mileage
- Existing ACE coverage
- Double-parking and obstruction indicators
- Bus-stop accessibility problems
- Crash and safety data
- Curb demand and land use

The recommendations may identify existing hotspot corridors for further review, especially West 125th Street, Amsterdam Avenue, Broadway, First and Second Avenues, and Third Avenue, but must not claim that the Manhattan ACE dataset alone proves where the next route should be deployed.

### Sources

Include:

- Exact NYC Open Data ACE dataset page
- MTA ACE program page: https://www.mta.info/agency/new-york-city-transit/automated-camera-enforcement
- NYC Department of City Planning NTA source
- Analysis workbook
- Downloadable summary data

Make every factual program-background claim traceable to an official source.

### Quality assurance

Before completion:

1. Reconcile every headline statistic to the workbook.
2. Confirm all percentages use the correct denominator.
3. Test the page at desktop, tablet, and mobile widths.
4. Test every contents link.
5. Test every map filter and reset control.
6. Test keyboard navigation and visible focus states.
7. Confirm charts remain readable without hover.
8. Confirm screen-reader labels and alt text.
9. Confirm downloads open and contain the advertised fields.
10. Check for console errors and missing assets.
11. Preserve the underlying analysis and map code.
12. Document how future data can be added without rebuilding the report manually.

Before making major design or content changes that depart from the supplied blueprint, explain the proposed change and why it improves accuracy, accessibility, or usability.

---

# Final Editorial Notes

1. **Use “issued violations,” not simply “violations,” when contrasting outcomes.** Every row is an ACE record, but only one status represents an issued violation.
2. **Keep the main story focused.** The report should not profile all routes or reproduce every table in the workbook.
3. **Lead with exposure-adjusted results.** Raw totals alone are likely to mislead readers because the program expanded rapidly.
4. **Treat the non-issued trend as an accountability question, not an accusation.**
5. **Do not recommend specific new non-ACE routes without adding candidate-route data.**
6. **Resolve the map/workbook hotspot discrepancy before publication.**
7. **Keep recommendations clearly labeled as tentative until MBPO review.**
8. **Separate the analytical end date from current program context.** The dataset ends June 15, 2026; the MTA’s current route count may be newer.
