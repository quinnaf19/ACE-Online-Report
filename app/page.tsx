import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Keeping Manhattan Moving | Manhattan ACE Report",
  description:
    "What 1.56 million Automated Camera Enforcement records reveal about Manhattan bus-lane obstruction, enforcement outcomes, and where attention is needed next.",
};

const monthly = [
  ["Jul ’24", 9754, 4, 78.7, 43.9, 9754],
  ["Aug", 9716, 4, 78.4, 45.6, 9716],
  ["Sep", 17436, 8, 126.3, 40.8, 8931],
  ["Oct", 50843, 8, 205.0, 39.3, 13507],
  ["Nov", 40609, 8, 169.2, 44.1, 11012],
  ["Dec", 38085, 8, 153.6, 40.7, 10510],
  ["Jan ’25", 36393, 8, 146.7, 44.1, 10292],
  ["Feb", 28126, 8, 125.6, 45.9, 9100],
  ["Mar", 35853, 8, 144.6, 46.2, 11122],
  ["Apr", 37703, 8, 157.1, 46.3, 11581],
  ["May", 41449, 12, 145.9, 47.5, 11313],
  ["Jun", 49902, 12, 138.6, 46.3, 10442],
  ["Jul", 51829, 12, 139.3, 45.8, 10371],
  ["Aug", 47734, 12, 128.3, 46.6, 9932],
  ["Sep", 45643, 12, 126.8, 50.3, 10521],
  ["Oct", 43367, 14, 105.8, 53.9, 8900],
  ["Nov", 36613, 14, 87.2, 56.2, 7481],
  ["Dec", 34305, 15, 74.9, 57.5, 7062],
  ["Jan ’26", 33352, 15, 71.7, 57.8, 8482],
  ["Feb", 37371, 15, 89.0, 54.3, 10265],
  ["Mar", 34280, 15, 73.7, 52.3, 7168],
] as const;

const routes = [
  ["M101", 266710, "34.9%"],
  ["M15-SBS", 170030, "22.2%"],
  ["M100", 99777, "13.0%"],
  ["M60-SBS", 58464, "7.6%"],
  ["M86-SBS", 32338, "4.2%"],
  ["M79-SBS", 29653, "3.9%"],
  ["M2", 28756, "3.8%"],
] as const;

const neighborhoods = [
  ["Washington Heights (South)", 85554],
  ["Harlem (South)", 73664],
  ["Washington Heights (North)", 61361],
  ["East Harlem (North)", 57788],
  ["Upper East Side–Yorkville", 48731],
  ["Upper East Side–Lenox Hill", 45435],
  ["Upper East Side–Carnegie Hill", 39345],
] as const;

const corridors = [
  ["Amsterdam Avenue", 116494],
  ["Broadway", 87971],
  ["Third Avenue", 74495],
  ["West 125th Street", 70910],
  ["First Avenue", 58005],
  ["Second Avenue", 56238],
] as const;

const stops = [
  ["Malcolm X Blvd / W 125 St", 24144, "32.7%"],
  ["Saint Nicholas Ave / W 125 St", 17012, "34.8%"],
  ["Catherine St / Madison St", 13112, "51.8%"],
  ["Second Ave / E 78 St", 10490, "42.2%"],
  ["Second Ave / E 125 St", 10254, "47.1%"],
  ["Broadway / W 178 St", 10238, "42.3%"],
  ["Amsterdam Ave / W 161 St", 10215, "49.0%"],
] as const;

const recommendations = [
  ["01", "Expand ACE strategically, not evenly", "Prioritize routes where obstruction is most likely to delay many riders or prevent accessible boarding, using ridership, speed, service frequency, safety, and existing camera coverage."],
  ["02", "Treat hotspot corridors as systems", "Review loading, passenger pickup, commercial delivery, curb regulations, lane design, and enforcement together where multiple routes converge."],
  ["03", "Pair enforcement with curb management", "At persistent hotspots, combine cameras with loading zones, clearer bus-stop markings, delivery strategies, street treatments, and targeted outreach."],
  ["04", "Audit the rise in non-issued outcomes", "Publish regular reports distinguishing exemptions, technical rejections, missing vehicle information, warnings, pending records, and final violations."],
  ["05", "Publish meaningful exposure measures", "Release camera-equipped bus trips, operating hours, route miles, scheduled service, warning-period status, and typical processing time."],
  ["06", "Evaluate every new rollout", "Preserve a baseline, identify a comparison corridor, and report bus speed, reliability, safety, obstruction, and curb activity after activation."],
] as const;

function BarChart({
  rows,
  max,
  suffix = "",
}: {
  rows: readonly (readonly [string, number, ...unknown[]])[];
  max: number;
  suffix?: string;
}) {
  return (
    <div className="bar-chart" role="img" aria-label="Ranked horizontal bar chart">
      {rows.map((row) => (
        <div className="bar-row" key={row[0]}>
          <span className="bar-label">{row[0]}</span>
          <span className="bar-track">
            <span className="bar-fill" style={{ width: `${(row[1] / max) * 100}%` }} />
          </span>
          <strong>{row[1].toLocaleString()}{suffix}</strong>
        </div>
      ))}
    </div>
  );
}

function MiniColumns({
  valueIndex,
  max,
  percent = false,
}: {
  valueIndex: number;
  max: number;
  percent?: boolean;
}) {
  return (
    <div className="column-chart" role="img" aria-label="Monthly trend from July 2024 through March 2026">
      {monthly.map((row) => {
        const value = Number(row[valueIndex]);
        return (
          <div className="column-item" key={`${row[0]}-${valueIndex}`}>
            <span className="column-value">{percent ? `${value.toFixed(0)}%` : value.toLocaleString()}</span>
            <span className="column-track">
              <span className="column-fill" style={{ height: `${Math.max(4, (value / max) * 100)}%` }} />
            </span>
            <small>{row[0]}</small>
          </div>
        );
      })}
    </div>
  );
}

function SectionHead({
  label,
  title,
  intro,
}: {
  label: string;
  title: string;
  intro?: string;
}) {
  return (
    <header className="section-head">
      <p className="section-label">{label}</p>
      <h2>{title}</h2>
      {intro && <p className="section-intro">{intro}</p>}
    </header>
  );
}

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#report">Skip to report</a>
      <input className="nav-state" type="checkbox" id="nav-state" />
      <label className="nav-toggle" htmlFor="nav-state" aria-label="Toggle report navigation">
        <span aria-hidden="true">☰</span> Contents
      </label>
      <label className="nav-overlay" htmlFor="nav-state" aria-hidden="true" />

      <div className="page-grid">
        <aside className="contents" id="report-nav">
          <p className="nav-logo">Contents</p>
          <Nav />
          <div className="byline">Brad Hoylman-Sigal · Manhattan Borough President</div>
        </aside>

        <main id="report">
          <section className="hero">
            <div className="logo-wrap">
              <img
                src="/brad-hoylman-sigal-logo.png"
                alt="Brad Hoylman-Sigal, Manhattan Borough President"
              />
            </div>
            <p className="kicker">Manhattan Borough President&apos;s Office</p>
            <h1>Keeping Manhattan Moving</h1>
            <p className="standfirst">
              What 1.56 million camera-enforcement records reveal about bus-lane obstruction,
              enforcement outcomes, and where attention is needed next.
            </p>
            <p className="publine">Data: NYC Open Data, June 20, 2024–June 15, 2026</p>
          </section>

          <section id="why" className="report-section">
            <SectionHead label="WHY IT MATTERS" title="Blocked bus lanes and stops cost riders time and can put them in danger" />
            <div className="two-col">
              <div className="prose">
                <p>New York City buses depend on clear streets and accessible curbs. When a vehicle blocks a bus lane, double parks along a route, or occupies a bus stop, it can delay service for riders throughout the route.</p>
                <p>Curb obstructions also create safety and accessibility risks. When a bus cannot pull fully to the curb, passengers may have to board or exit in the street.</p>
                <p>As ACE continues to expand to more routes, policymakers need to understand not only how many records the program generates, but also where those records are concentrated and what happens after an event is captured.</p>
              </div>
              <aside className="explainer">
                <p className="card-label">WHAT IS ACE?</p>
                <h3>Cameras mounted on buses document vehicles blocking the way.</h3>
                <p>Automated Camera Enforcement records vehicles blocking bus lanes, bus stops, or travel lanes. A recorded event does not automatically become a violation: it may be issued, exempted, or rejected.</p>
                <a href="https://www.mta.info/agency/new-york-city-transit/automated-camera-enforcement">Learn about ACE at the MTA ↗</a>
              </aside>
            </div>
          </section>

          <section id="study" className="report-section tinted">
            <SectionHead label="HOW WE STUDIED IT" title="We followed every Manhattan ACE record from location to outcome" />
            <p className="lede">We reviewed 1,596,097 records, validated each event using its longitude and latitude, and retained 1,566,130 Manhattan records for analysis.</p>
            <div className="pipeline" aria-label="Study pipeline">
              {["NYC Open Data records", "Geographic validation", "Outcome classification", "Time & hotspot analysis"].map((item, index) => (
                <div key={item}><span>0{index + 1}</span><strong>{item}</strong></div>
              ))}
            </div>
            <div className="outcome-defs">
              <article><span className="dot issued" /><h3>Issued</h3><p>Status is “Violation Issued.”</p></article>
              <article><span className="dot exempt" /><h3>Exemption</h3><p>One of four recognized exempt statuses.</p></article>
              <article><span className="dot rejected" /><h3>Rejection</h3><p>Technical issue or missing driver or vehicle information.</p></article>
            </div>
            <p className="note">“Non-issued” combines exemptions and rejections. These outcomes have different causes, but share one result: no violation was issued.</p>
          </section>

          <section id="map" className="report-section map-section">
            <SectionHead label="EXPLORE THE DATA" title="Find an ACE hotspot" intro="Filter by route or neighborhood, search for a stop, change the minimum violation threshold, and zoom from the borough level to individual hotspots." />
            <div className="map-frame">
              <iframe
                src="https://ace-map.quinnaf19.workers.dev/"
                title="Interactive Manhattan ACE Violation Explorer"
                loading="lazy"
                allowFullScreen
              />
            </div>
            <div className="map-actions">
              <a className="button" href="https://ace-map.quinnaf19.workers.dev/">Open map in a new tab ↗</a>
              <p>The map displays issued violations only. Counts are grouped by route, standardized stop, and neighborhood.</p>
            </div>
          </section>

          <section className="caution">
            <p className="section-label">A NOTE BEFORE WE DIVE IN</p>
            <h2>Camera records are not the same as the underlying prevalence of obstruction</h2>
            <p>Totals depend on when a route received ACE, how many buses and trips operated, route length, camera availability, review rules, processing time, and the underlying frequency of obstruction.</p>
            <p>This report identifies patterns in recorded enforcement activity and outcomes. It does not treat raw counts as a direct measure of illegal obstruction, and it does not claim that ACE caused the observed trends.</p>
          </section>

          <section id="findings" className="report-section">
            <SectionHead label="MAIN FINDINGS" title="Here’s what the data shows" />
            <div className="stat-grid">
              <article><strong>1.57M</strong><span>ACE records analyzed</span></article>
              <article><strong>765,297</strong><span>issued violations</span></article>
              <article><strong>51.1%</strong><span>did not result in an issued violation</span></article>
              <article><strong>−4.41</strong><span>issued violations per active-route-day each month</span></article>
              <article><strong>70.1%</strong><span>of violations came from three routes</span></article>
            </div>
            <div className="outcome-chart" role="img" aria-label="48.9 percent issued, 32 percent exemptions, 11 percent technical rejections, 8.1 percent DMV rejections">
              <span className="outcome issued-seg" style={{ width: "48.9%" }}>Issued 48.9%</span>
              <span className="outcome exempt-seg" style={{ width: "32%" }}>Exempt 32.0%</span>
              <span className="outcome tech-seg" style={{ width: "11%" }}>Technical 11.0%</span>
              <span className="outcome dmv-seg" style={{ width: "8.1%" }}>DMV 8.1%</span>
            </div>
            <ol className="finding-list">
              <li><strong>Expansion increased reach, but not necessarily violations on an active route.</strong> Raw monthly totals showed no clear trend; exposure-adjusted violations declined significantly.</li>
              <li><strong>A growing share did not produce a violation.</strong> The combined non-issued rate rose an estimated 0.76 percentage points per month through March 2026.</li>
              <li><strong>Issued violations were concentrated.</strong> M101, M15-SBS, and M100 accounted for seven in ten.</li>
              <li><strong>Uptown Manhattan contained many major hotspots.</strong> Washington Heights (South) led all NTAs, while West 125th Street contained several leading intersections.</li>
            </ol>
          </section>

          <div id="analysis" className="analysis-break">
            <span>THE ANALYSIS</span><h2>What we found</h2>
          </div>

          <Finding number="01" id="trend" title="More routes produced more coverage—but violations declined after adjusting for exposure" why="ACE expanded from four active Manhattan routes at the beginning of the study period to 15 by March 2026. A rise in total violations could therefore reflect more coverage rather than more violations on existing routes.">
            <p>Across complete months from July 2024 through March 2026, raw monthly issued violations did not show a statistically detectable trend (Kendall’s tau = 0.105; p = 0.526).</p>
            <figure>
              <figcaption><strong>Total violations moved unevenly as ACE expanded</strong><span>Monthly issued violations · July 2024–March 2026</span></figcaption>
              <MiniColumns valueIndex={1} max={52000} />
              <small className="source">Source: MBPO analysis of NYC Open Data. June 2024 excluded as a partial month.</small>
            </figure>
            <p>After dividing monthly violations by active-route-days, the pattern changed. The median estimated change was <strong>4.41 fewer issued violations per active-route-day each month</strong> (tau = −0.438; p = 0.006).</p>
            <figure>
              <figcaption><strong>Violations fell after accounting for route exposure</strong><span>Issued violations per active-route-day</span></figcaption>
              <MiniColumns valueIndex={3} max={210} />
              <small className="source">Primary trend window ends March 2026 because later outcomes may still be maturing.</small>
            </figure>
            <blockquote><strong>Key finding</strong>Total monthly violations did not show a clear trend, but violations declined significantly after adjusting for route exposure.</blockquote>
          </Finding>

          <Finding number="02" id="nonissued" title="The non-issued share rose even as route-adjusted violations fell" why="A camera record is not the same as an issued violation. Understanding exemptions and rejections is essential to evaluating how recorded activity moves through review.">
            <p>Of 1,566,130 records, 765,297 resulted in an issued violation. The remaining <strong>800,833 records—51.1%—did not</strong>.</p>
            <figure>
              <figcaption><strong>The non-issued share rose through March 2026</strong><span>Monthly combined exemption and rejection rate</span></figcaption>
              <MiniColumns valueIndex={4} max={65} percent />
              <small className="source">July 2024–March 2026. Sen slope: +0.76 percentage points per month; p &lt; 0.001.</small>
            </figure>
            <p>The monthly combined rate was 43.9% in July 2024 and 52.3% in March 2026. April through June are treated separately because issued outcomes fell sharply while other outcomes continued.</p>
            <blockquote><strong>Key finding</strong>More than half of all Manhattan ACE records did not result in an issued violation, and that share rose significantly.</blockquote>
          </Finding>

          <Finding number="03" id="routes" title="Three routes generated seven in ten Manhattan violations" why="Route totals reveal where activity is concentrated, but must be read alongside activation dates, length, frequency, and camera-equipped service.">
            <div className="chart-card">
              <h3>M101 alone accounted for more than one-third</h3>
              <p>Issued violations by route · Full study period</p>
              <BarChart rows={routes} max={266710} />
              <small className="source">Route labels ending in SBS are presented in their public-facing Select Bus Service form.</small>
            </div>
            <p>M101 recorded 266,710 issued violations, M15-SBS recorded 170,030, and M100 recorded 99,777. Together, the three routes accounted for <strong>70.1%</strong> of all issued violations.</p>
            <p>These totals identify enforcement concentration—not standardized risk. Longer and more frequent routes create more opportunities for bus cameras to encounter obstruction.</p>
            <blockquote><strong>Key finding</strong>M101, M15-SBS, and M100 generated seven in ten issued violations in the Manhattan dataset.</blockquote>
          </Finding>

          <Finding number="04" id="geography" title="The geography of ACE enforcement is highly concentrated" why="Boroughwide totals conceal the streets and communities where obstruction repeatedly intersects with bus service.">
            <div className="split-charts">
              <div className="chart-card"><h3>Top neighborhoods</h3><p>Issued violations by NTA</p><BarChart rows={neighborhoods} max={85554} /></div>
              <div className="chart-card"><h3>Top corridors</h3><p>Issued violations by standardized corridor label</p><BarChart rows={corridors} max={116494} /></div>
            </div>
            <p>Washington Heights (South) recorded 85,554 issued violations, the most of any NTA. Amsterdam Avenue led corridor labels with 116,494. Amsterdam Avenue, Broadway, Third Avenue, and West 125th Street together accounted for approximately <strong>45.7%</strong> of issued violations.</p>
            <blockquote><strong>Key finding</strong>Uptown neighborhoods and a small group of major corridors account for a large share of recorded enforcement activity.</blockquote>
          </Finding>

          <Finding number="05" id="hotspots" title="West 125th Street anchors several of Manhattan’s largest hotspots" why="Intersection-level hotspots show where targeted curb management or street-level intervention may be possible.">
            <div className="table-wrap">
              <table>
                <caption>Leading canonical intersections</caption>
                <thead><tr><th>Intersection</th><th>Issued</th><th>Non-issued rate</th></tr></thead>
                <tbody>{stops.map((row) => <tr key={row[0]}><td>{row[0]}</td><td>{row[1].toLocaleString()}</td><td>{row[2]}</td></tr>)}</tbody>
              </table>
            </div>
            <p>Malcolm X Boulevard and West 125th Street was the leading canonical intersection, with <strong>24,144 issued violations</strong>. Several other leading hotspots were located along West 125th Street.</p>
            <aside className="method-card"><strong>How a hotspot is defined</strong><p>The workbook combines records sharing a standardized canonical intersection name across routes and nearby source coordinates. The embedded map groups by route, stop, and neighborhood, so its route-specific points divide the canonical total across multiple map markers.</p></aside>
            <blockquote><strong>Key finding</strong>The 125th Street cluster is a strong candidate for a coordinated, corridor-level review.</blockquote>
          </Finding>

          <section id="limits" className="report-section confounders">
            <SectionHead label="CONFOUNDING FACTORS" title="What else may shape the patterns" />
            <div className="factor-grid">
              {[
                ["Staggered implementation", "Later routes had fewer months to produce records."],
                ["Bus frequency", "More trips create more opportunities to observe an obstruction."],
                ["Route length & overlap", "Long and overlapping routes cover more street space."],
                ["Camera coverage", "The data does not show uptime or equipped buses by day."],
                ["Warning periods", "New routes begin with warnings before fine-bearing enforcement."],
                ["Outcome maturation", "Recent records may not yet show final issued outcomes."],
                ["Traffic & construction", "Street work, weather, events, and seasonal travel affect demand."],
                ["Land use & curb function", "Schools, hospitals, retail, and residences use curbs differently."],
                ["Standardization", "Canonical labels can combine points that appear separately on the map."],
                ["Descriptive, not causal", "The analysis identifies patterns; it cannot establish ACE caused them."],
              ].map((item, index) => <article key={item[0]}><span>{String(index + 1).padStart(2, "0")}</span><h3>{item[0]}</h3><p>{item[1]}</p></article>)}
            </div>
          </section>

          <section id="recommendations" className="report-section recommendations">
            <SectionHead label="RECOMMENDATIONS · DRAFT FOR OFFICE REVIEW" title="Use expansion to target the places where enforcement and street design can do the most" />
            <div className="recommendation-list">
              {recommendations.map((rec) => <article key={rec[0]}><span>{rec[0]}</span><div><h3>{rec[1]}</h3><p>{rec[2]}</p></div></article>)}
            </div>
          </section>

          <section id="methodology" className="report-section methodology">
            <SectionHead label="DATA & METHODOLOGY" title="How the analysis was produced" />
            <details open>
              <summary>Data preparation and geographic assignment</summary>
              <p>The source extract covered June 20, 2024 through June 15, 2026. Of 1,596,097 reviewed rows, 29,967 were outside Manhattan, unmatched geographically, or otherwise excluded under the study rules. The final dataset contains 1,566,130 records. No duplicate violation IDs were removed.</p>
              <p>Exact longitude and latitude were tested against NYC Department of City Planning 2020 Census Tracts. NTA names were taken from the containing tract. NTAs are statistical approximations of neighborhoods.</p>
            </details>
            <details>
              <summary>Stops, corridors, and hotspot aggregation</summary>
              <p>Stop names were converted to uppercase; punctuation and common suffixes were normalized; reversed intersection order was standardized. The canonical-stop table aggregates all routes and coordinate variants sharing that standardized label. The map preserves route and neighborhood dimensions, so one canonical stop may appear as multiple points.</p>
            </details>
            <details>
              <summary>Route exposure and statistical methods</summary>
              <p>Monthly active-route-days were calculated from implementation dates. Primary temporal tests use complete months from July 2024 through March 2026. Mann–Kendall tests assessed consistent direction; Sen slopes estimated median monthly change. A weighted regression tested the combined non-issued share.</p>
            </details>
            <details>
              <summary>Known limitations</summary>
              <p>The dataset measures enforcement records, not all obstruction. It lacks bus-trip and camera-uptime denominators. Recent outcomes may be incomplete. Route totals reflect age, length, frequency, and overlap. The design is descriptive and does not establish causality.</p>
            </details>
            <div className="sources">
              <h3>Primary sources</h3>
              <a href="https://www.mta.info/agency/new-york-city-transit/automated-camera-enforcement">MTA Automated Camera Enforcement ↗</a>
              <a href="https://www.nyc.gov/content/planning/pages/resources/datasets/neighborhood-tabulation">NYC DCP Neighborhood Tabulation Areas ↗</a>
              <a href="https://data.cityofnewyork.us/resource/63ge-mke6.geojson?$limit=5000">2020 Census Tract GeoJSON ↗</a>
            </div>
          </section>

          <section id="downloads" className="downloads">
            <p className="section-label">DOWNLOADS</p>
            <h2>Review the numbers</h2>
            <div className="download-grid">
              {[
                ["Monthly summary", "/downloads/monthly_summary.csv"],
                ["Route summary", "/downloads/route_summary.csv"],
                ["Neighborhood summary", "/downloads/neighborhood_summary.csv"],
                ["Corridor summary", "/downloads/corridor_summary.csv"],
                ["Canonical stop summary", "/downloads/stop_summary.csv"],
                ["Analysis methods", "/downloads/analyze_ace.py"],
              ].map((file) => <a key={file[0]} href={file[1]} download><span>CSV / CODE</span><strong>{file[0]}</strong><b>↓</b></a>)}
            </div>
          </section>
        </main>
      </div>

      <footer>
        <div className="footer-brand">
          <img src="/brad-hoylman-sigal-logo.png" alt="" />
          <span><strong>Manhattan Borough President&apos;s Office</strong><small>1 Centre Street, New York, NY 10007</small></span>
        </div>
        <p>Draft online report · July 2026</p>
      </footer>
    </>
  );
}

function Nav() {
  return (
    <nav aria-label="Report sections">
      <a href="#why">Why It Matters</a>
      <a href="#study">How We Studied It</a>
      <a href="#map">Explore the Map</a>
      <a href="#findings">Main Findings</a>
      <span>The Analysis</span>
      <a href="#trend">1 · Overall trend</a>
      <a href="#nonissued">2 · Non-issued share</a>
      <a href="#routes">3 · Route concentration</a>
      <a href="#geography">4 · Neighborhoods</a>
      <a href="#hotspots">5 · Hotspots</a>
      <a href="#limits">Confounding Factors</a>
      <a href="#recommendations">Recommendations</a>
      <a href="#methodology">Data & Methodology</a>
      <a href="#downloads">Downloads</a>
    </nav>
  );
}

function Finding({
  number,
  id,
  title,
  why,
  children,
}: {
  number: string;
  id: string;
  title: string;
  why: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="report-section finding">
      <p className="section-label">FINDING {number}</p>
      <h2>{title}</h2>
      <aside className="why-box"><strong>Why we looked at this</strong><p>{why}</p></aside>
      <div className="finding-body">{children}</div>
    </section>
  );
}
