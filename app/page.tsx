import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Keeping Manhattan Moving | Manhattan ACE Report",
  description:
    "What 1.57 million Automated Camera Enforcement records reveal about recorded curb obstruction, enforcement outcomes, and where attention is needed next.",
};

const monthly = [
  ["Jul ’24", 17379, 4, 140.2, 43.9, 9754],
  ["Aug", 17857, 4, 144.0, 45.6, 9716],
  ["Sep", 29465, 8, 213.5, 40.8, 8931],
  ["Oct", 83714, 8, 337.6, 39.3, 13507],
  ["Nov", 72707, 8, 302.9, 44.1, 11012],
  ["Dec", 64178, 8, 258.8, 40.7, 10510],
  ["Jan ’25", 65138, 8, 262.7, 44.1, 10292],
  ["Feb", 51961, 8, 232.0, 45.9, 9100],
  ["Mar", 66678, 8, 268.9, 46.2, 11122],
  ["Apr", 70231, 8, 292.6, 46.3, 11581],
  ["May", 78975, 12, 278.1, 47.5, 11313],
  ["Jun", 92883, 12, 258.0, 46.3, 10442],
  ["Jul", 95695, 12, 257.2, 45.8, 10371],
  ["Aug", 89351, 12, 240.2, 46.6, 9932],
  ["Sep", 91832, 12, 255.1, 50.3, 10521],
  ["Oct", 94140, 14, 229.6, 53.9, 8900],
  ["Nov", 83686, 14, 199.3, 56.2, 7481],
  ["Dec", 80796, 15, 176.4, 57.5, 7062],
  ["Jan ’26", 79094, 15, 170.1, 57.8, 8482],
  ["Feb", 81787, 15, 194.7, 54.3, 10265],
  ["Mar", 71855, 15, 154.5, 52.3, 7168],
  ["Apr", 35660, 16, 76.2, 94.1, 0],
  ["May", 33843, 17, 65.5, 100.0, 0],
] as const;
const outcomeMonthly = monthly.slice(0, 21);

const routes = [
  ["M101", 540443, "34.5%"],
  ["M15-SBS", 346400, "22.1%"],
  ["M100", 182746, "11.7%"],
  ["M60-SBS", 101885, "6.5%"],
  ["M2", 69355, "4.4%"],
  ["M86-SBS", 68573, "4.4%"],
  ["M79-SBS", 60045, "3.8%"],
] as const;

const neighborhoods = [
  ["Washington Heights (South)", 167059],
  ["East Harlem (North)", 116294],
  ["Washington Heights (North)", 114881],
  ["Harlem (South)", 114106],
  ["Upper East Side–Yorkville", 101732],
  ["Upper East Side–Carnegie Hill", 83883],
  ["Upper East Side–Lenox Hill–Roosevelt Island", 83054],
] as const;

const corridors = [
  ["Amsterdam Avenue", 242024],
  ["Broadway", 176846],
  ["Third Avenue", 161240],
  ["First Avenue", 117840],
  ["Second Avenue", 116405],
  ["West 125th Street", 110178],
] as const;

const stops = [
  ["Malcolm X Blvd / W 125 St", 35893, "32.7%"],
  ["Catherine St / Madison St", 27219, "51.8%"],
  ["Saint Nicholas Ave / W 125 St", 26097, "34.8%"],
  ["Amsterdam Ave / W 161 St", 20023, "49.0%"],
  ["Second Ave / E 125 St", 19372, "47.1%"],
  ["Third Ave / E 86 St", 18700, "53.5%"],
  ["Second Ave / E 78 St", 18143, "42.2%"],
] as const;

const aceRouteSpeeds = [
  ["M42", 5.1],
  ["M57", 5.1],
  ["M31", 5.4],
  ["M34-SBS", 5.5],
  ["M34A-SBS", 5.6],
  ["M23-SBS", 5.8],
  ["M14A-SBS", 6.0],
  ["M4", 6.2],
  ["M86-SBS", 6.2],
  ["M116", 6.2],
  ["M14D-SBS", 6.3],
  ["M7", 6.3],
  ["M96", 6.4],
  ["M100", 6.4],
  ["M2", 7.0],
  ["M101", 7.0],
  ["M79-SBS", 7.9],
  ["M15-SBS", 8.1],
  ["M60-SBS", 11.5],
] as const;

type Recommendation = {
  number: string;
  title: string;
  text: string;
  bullets?: [string, string][];
};

const recommendations: Recommendation[] = [
  {
    number: "01",
    title: "Expand ACE first where it can help the most riders",
    text: "The next phase should fill important gaps beside routes already using ACE and focus on corridors where slow service, blocked lanes, and inaccessible stops affect many riders.",
    bullets: [
      ["M1, M3, and M5", "Add coverage on the Fifth, Madison, and Sixth Avenue corridors. These routes would complement the M2, M4, and M7, while extending camera coverage to additional buses using some of Midtown’s slowest and busiest bus lanes."],
      ["M102 and M103", "Expand coverage on Third and Lexington Avenues alongside the M101. NYC DOT has reported daytime bus speeds of about 5 mph on Lexington Avenue, where deliveries and passenger pickups frequently block the bus lane."],
      ["M106", "Pair the M106 with the ACE-equipped M96 on the 96th Street corridor. Together, the routes serve hospitals, schools, seven subway lines, and thousands of daily crosstown riders."],
    ],
  },
  {
    number: "02",
    title: "Make loading zones and bus stops easier to recognize",
    text: "At persistent hotspots, add or resize loading zones, repaint bus-stop boundaries, and install clearer signs. Making legal loading space and bus-stop limits obvious can reduce conflicts before enforcement is needed.",
  },
  {
    number: "03",
    title: "Explain why recorded events do not become violations",
    text: "The MTA should publish regular reports separating ACE exemptions, technical problems, missing vehicle information, pending reviews, and issued violations to help the public understand enforcement trends.",
  },
];

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
  data = monthly,
  ariaLabel = "Monthly trend from July 2024 through May 2026",
}: {
  valueIndex: number;
  max: number;
  percent?: boolean;
  data?: readonly (readonly [string, number, number, number, number, number])[];
  ariaLabel?: string;
}) {
  return (
    <div className="column-chart" role="img" aria-label={ariaLabel}>
      {data.map((row) => {
        const value = Number(row[valueIndex]);
        return (
          <div className="column-item" key={`${row[0]}-${valueIndex}`}>
            <span className="column-value" title={value.toLocaleString()}>
              {percent ? `${value.toFixed(0)}%` : Math.round(value).toLocaleString()}
            </span>
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
              What 1.57 million camera-enforcement records reveal about recorded curb obstruction,
              enforcement outcomes, and where attention is needed next.
            </p>
            <p className="publine">Data: New York State Open Data (MTA), June 20, 2024–June 15, 2026</p>
          </section>

          <section id="why" className="report-section">
            <SectionHead label="WHY IT MATTERS" title="Blocked bus lanes and stops cost riders time and can put them in danger" />
            <div className="two-col">
              <div className="prose">
                <p>New York City buses depend on clear streets and accessible curbs. When a vehicle blocks a bus lane, double parks along a route, or occupies a bus stop, it can delay service for riders throughout the route.</p>
                <p>Curb obstructions also create safety and accessibility risks. When a bus cannot pull fully to the curb, passengers may have to board or exit in the street and people in wheelchairs may be unable to board.</p>
                <p>ACE was implemented as a program to address these growing issues, first implemented on select routes in June 2024. Since then, the program has expanded to encompass seventeen routes in Manhattan.</p>
                <p>As ACE continues to expand to more routes, policymakers need to understand not only how many records the program generates, but also where those records are concentrated and what happens after an event is captured.</p>
                <p>This report helps address those questions through temporal and geographic analyses of Manhattan’s ACE data. It contains both an analysis of ACE since its implementation, tracking both how the issue of curb obstruction has changed since implementation as well as how it is spread out across Manhattan.</p>
              </div>
              <aside className="explainer">
                <p className="card-label">WHAT IS ACE?</p>
                <p>Automated Camera Enforcement is a program where cameras mounted on buses document vehicles blocking bus lanes, bus stops, or travel lanes. A recorded event does not automatically become a violation: it may be issued, exempted, or rejected.</p>
                <div className="fine-callout">
                  <p className="card-label">HOW FINES WORK</p>
                  <h3>$50 for a first violation, rising to $250</h3>
                  <p>Before a violation is issued, two buses must document the obstruction and a City employee must review the evidence. Repeat violations increase in $50 steps, up to $250 per violation. ACE fines are civil penalties, do not add points to a driving record, and may be issued no more than once every two hours for the same type of obstruction. Revenue supports MTA operations, including bus service.</p>
                </div>
                <a href="https://www.mta.info/agency/new-york-city-transit/automated-camera-enforcement">Learn about ACE at the MTA ↗</a>
              </aside>
            </div>
          </section>

          <section id="study" className="report-section tinted">
            <SectionHead label="HOW WE STUDIED IT" title="We compiled every Manhattan ACE record" />
            <div className="lede">
              <p>To understand how ACE enforcement is working across Manhattan, we reviewed 1,596,097 records from New York State Open Data collected between June 20, 2024 and June 15, 2026. We verified each record using its longitude and latitude and retained 1,566,130 records located within Manhattan for analysis.</p>
              <p>Our primary analysis treats every retained record as a recorded ACE event. We tracked how record counts changed as ACE expanded to more routes and identified the routes, neighborhoods, corridors, and intersections where recorded events were most concentrated.</p>
              <p>We analyzed enforcement outcomes separately, comparing records that resulted in issued violations with exemptions and rejections. This distinction provides a picture of where cameras recorded potential obstruction while preserving the difference between a recorded event and a confirmed violation.</p>
            </div>
            <div className="outcome-guide">
              <p className="card-label">FROM CAMERA RECORD TO FINAL OUTCOME</p>
              <p>After an ACE camera records a potential obstruction, the record can follow one of two broad paths:</p>
              <div className="outcome-paths">
                <article>
                  <h3>Issued</h3>
                  <p>The event is confirmed and a violation is issued to the vehicle owner.</p>
                </article>
                <article>
                  <h3>Non-issued</h3>
                  <p>This report combines exemptions and rejections under “non-issued.” No violation results, but the underlying reasons differ:</p>
                  <ul>
                    <li><strong>Driver or vehicle information missing:</strong> The event appears valid, but missing, temporary, incorrect, or unmatched registration information prevents issuance.</li>
                    <li><strong>Exempt vehicle or activity:</strong> The event involves an allowed bus or paratransit vehicle, qualifying commercial stop under 20 minutes, emergency vehicle, or another recognized exemption such as a diplomatic or government vehicle.</li>
                    <li><strong>Technical issue or other rejection:</strong> Image quality or an obstructed view prevents reviewers from confirming the event—for example, because of weather, darkness, glare, a blocked plate or lane, or a camera problem.</li>
                  </ul>
                </article>
              </div>
              <div className="outcome-chart" role="img" aria-label="48.9 percent issued, 32 percent exemptions, 11 percent technical rejections, 8.1 percent DMV rejections">
                <span className="outcome issued-seg" style={{ width: "48.9%" }}>Issued 48.9%</span>
                <span className="outcome exempt-seg" style={{ width: "32%" }}>Exempt 32.0%</span>
                <span className="outcome tech-seg" style={{ width: "11%" }}>Technical 11.0%</span>
                <span className="outcome dmv-seg" style={{ width: "8.1%" }}>DMV 8.1%</span>
              </div>
            </div>
          </section>

          <section id="map" className="report-section map-section">
            <SectionHead label="EXPLORE THE DATA" title="Find an ACE hotspot" intro="Explore all recorded ACE events, filter by final outcome, route, or neighborhood, search for a stop, and zoom from the borough level to individual hotspots." />
            <div className="map-frame">
              <iframe
                src="https://ace-map.quinnaf19.workers.dev/"
                title="Interactive Manhattan ACE Record Explorer"
                loading="lazy"
                allowFullScreen
              />
            </div>
            <div className="map-actions">
              <a className="button" href="https://ace-map.quinnaf19.workers.dev/">Open map in a new tab ↗</a>
              <p>The map displays all ACE records by default. Use the outcome filter to isolate issued, non-issued, exempt, technical-rejection, or DMV-rejection records.</p>
            </div>
          </section>

          <aside className="analysis-note" aria-labelledby="analysis-note-title">
            <p className="section-label">NOTE BEFORE WE DIVE IN</p>
            <h2 id="analysis-note-title">Did recorded ACE events decline over time?</h2>
            <p>Answering that question is not as simple as comparing one month’s total with another. During the study period, ACE expanded from four active Manhattan routes to seventeen. Every added route gave bus cameras more opportunities to record an event—even if obstruction on each operating route was becoming less frequent.</p>
            <div className="exposure-model" aria-label="Two forces shape monthly ACE record totals">
              <div>
                <span className="model-arrow up">↑</span>
                <strong>More active routes</strong>
                <p>More streets and service days are observed.</p>
              </div>
              <b>push raw totals up</b>
              <div>
                <span className="model-arrow down">↓</span>
                <strong>Less obstruction per route</strong>
                <p>A successful program could reduce recorded events.</p>
              </div>
              <b>push raw totals down</b>
            </div>
            <p>To separate these opposing forces, we adjusted for <strong>route exposure</strong>. For each month, we counted every day that each ACE route was active. One route operating for 30 days equals 30 active-route-days; four routes operating for 30 days equal 120 active-route-days.</p>
            <div className="exposure-equation" role="img" aria-label="ACE records per active-route-day equals monthly ACE records divided by active-route-days">
              <span>ACE records per active-route-day</span>
              <b>=</b>
              <span className="fraction"><i>Monthly ACE records</i><i>Total active-route-days</i></span>
            </div>
            <p>This calculation puts months with different numbers of operating routes on a more comparable basis. It asks: <strong>for each route-day of ACE coverage, how many events were recorded?</strong> The primary trend uses all ACE records; whether those records were issued, exempted, or rejected is analyzed separately. The adjustment accounts for when routes joined the program and how many days they were active. It does not account for differences in route length, bus frequency, operating hours, or the number of camera-equipped trips, because those measures were not available in the dataset.</p>
          </aside>

          <section id="findings" className="report-section">
            <SectionHead label="MAIN FINDINGS" title="Here’s what the data shows" />
            <div className="stat-grid">
              <article><strong>1,566,130</strong><span>recorded ACE events</span></article>
              <article><strong>51.1%</strong><span>did not result in an issued violation</span></article>
              <article><strong>7.29 fewer</strong><span>ACE records per active-route-day each month</span></article>
              <article><strong>68.3%</strong><span>of ACE records came from three routes</span></article>
            </div>
            <ol className="finding-list">
              <li><strong>Recorded events declined after accounting for program expansion.</strong> ACE cameras recorded fewer events per active-route-day over time.</li>
              <li><strong>A growing share did not produce a violation.</strong> The combined non-issued rate rose an estimated 0.76 percentage points per month through March 2026.</li>
              <li><strong>Recorded events were concentrated.</strong> M101, M15-SBS, and M100 accounted for more than two-thirds of all records.</li>
              <li><strong>Uptown Manhattan contained many major hotspots.</strong> Washington Heights (South) led all NTAs, while several leading intersections were located along West 125th Street.</li>
              <li><strong>Many ACE routes remained very slow.</strong> In May 2026, more than half of the individual services represented in the ACE data averaged 6.2 mph or less.</li>
            </ol>
          </section>

          <div id="analysis" className="analysis-break">
            <span>THE ANALYSIS</span><h2>What we found</h2>
          </div>

          <Finding number="01" id="trend" title="Recorded ACE events declined after accounting for program expansion" why="ACE expanded from four active Manhattan routes at the beginning of the study period to 17 by May 2026. To compare months with different levels of coverage, we measured records per active-route-day—accounting for how many routes were active and for how many days.">
            <figure>
              <figcaption><strong>Recorded events declined relative to the number of active routes and days</strong><span>ACE records per active-route-day · July 2024–May 2026</span></figcaption>
              <MiniColumns valueIndex={3} max={340} />
              <small className="source">June 2026 is excluded as a partial month. Active-route-days account for the number of routes operating and the number of days each was active.</small>
            </figure>
            <p>Across the complete-month study period, the median estimated change was <strong>7.29 fewer ACE records per active-route-day each month.</strong></p>
            <blockquote><strong>Key finding</strong>After accounting for how many routes were active and for how many days, recorded ACE events declined significantly over time.</blockquote>
          </Finding>

          <Finding number="02" id="nonissued" title="More than half of ACE records did not result in an issued violation" why="A recorded ACE event is not the same as an issued violation. Understanding exemptions and rejections is essential to evaluating how recorded activity moves through review.">
            <p>Of 1,566,130 records, 765,297 resulted in an issued violation. The remaining <strong>800,833 records—51.1%—did not</strong>.</p>
            <figure>
              <figcaption><strong>The non-issued share rose through March 2026</strong><span>Monthly combined exemption and rejection rate</span></figcaption>
              <MiniColumns valueIndex={4} max={65} percent data={outcomeMonthly} ariaLabel="Monthly non-issued rate from July 2024 through March 2026" />
              <small className="source">July 2024–March 2026. Sen slope: +0.76 percentage points per month; p &lt; 0.001.</small>
            </figure>
            <blockquote><strong>Key finding</strong>More than half of all Manhattan ACE records did not result in an issued violation, and that share rose significantly from 43.9% in July 2024 to 52.3% in March 2026.</blockquote>
          </Finding>

          <Finding number="03" id="routes" title="Three routes generated more than two-thirds of Manhattan ACE records" why="Route totals reveal where recorded activity is concentrated, but must be read alongside activation dates, length, frequency, and camera-equipped service.">
            <div className="chart-card">
              <h3>M101 alone accounted for more than one-third of all records</h3>
              <p>ACE records by route · Full study period</p>
              <BarChart rows={routes} max={540443} />
              <small className="source">Route labels ending in SBS are presented in their public-facing Select Bus Service form.</small>
            </div>
            <p>These totals identify where ACE cameras recorded the most events. Longer and more frequent routes create more opportunities for bus cameras to encounter and record potential obstruction.</p>
            <blockquote><strong>Key finding</strong>M101, M15-SBS, and M100 generated 68.3% of all Manhattan ACE records.</blockquote>
          </Finding>

          <Finding number="04" id="geography" title="The geography of ACE enforcement is highly concentrated" why="Boroughwide totals conceal the streets and communities where obstruction repeatedly intersects with bus service.">
            <div className="split-charts">
              <div className="chart-card"><h3>Top neighborhoods</h3><p>ACE records by NTA</p><BarChart rows={neighborhoods} max={167059} /></div>
              <div className="chart-card"><h3>Top corridors</h3><p>ACE records by standardized corridor label</p><BarChart rows={corridors} max={242024} /></div>
            </div>
            <p>Washington Heights (South) contained 167,059 ACE records, the most of any NTA. Amsterdam Avenue led corridor labels with 242,024 records. Amsterdam Avenue, Broadway, Third Avenue, and First Avenue together accounted for approximately <strong>44.6%</strong> of all records.</p>
            <blockquote><strong>Key finding</strong>Uptown neighborhoods and a small group of major corridors account for a large share of recorded enforcement activity.</blockquote>
          </Finding>

          <Finding number="05" id="hotspots" title="West 125th Street anchors several of Manhattan’s largest hotspots" why="Intersection-level hotspots show where targeted curb level interventions should be focused.">
            <div className="table-wrap">
              <table>
                <caption>Leading canonical intersections</caption>
                <thead><tr><th>Intersection</th><th>ACE records</th><th>Non-issued rate</th></tr></thead>
                <tbody>{stops.map((row) => <tr key={row[0]}><td>{row[0]}</td><td>{row[1].toLocaleString()}</td><td>{row[2]}</td></tr>)}</tbody>
              </table>
            </div>
            <p>Malcolm X Boulevard and West 125th Street was the leading canonical intersection, with <strong>35,893 ACE records</strong>. Several other leading hotspots were located along West 125th Street.</p>
            <blockquote><strong>Key finding</strong>The 125th Street cluster is a leading hotspot and strong candidate for further coordinated review.</blockquote>
          </Finding>

          <Finding number="06" id="speeds" title="Many ACE routes remained slow—but record totals did not always identify the slowest service" why="ACE records show where bus cameras encountered potential obstruction. Bus speeds add a rider-centered measure of how quickly service moved through all of the conditions encountered along a route.">
            <div className="chart-card">
              <h3>More than half of ACE route services averaged 6.2 mph or less</h3>
              <p>Average bus speed by individual route service · May 2026</p>
              <BarChart rows={aceRouteSpeeds} max={11.5} suffix=" mph" />
              <small className="source">Source: MTA Bus Route Segment Speeds, summarized by reports.jehiah.cz. The M14A/M14D and M34/M34A branches are shown separately because the speed source reports them as distinct services.</small>
            </div>
            <p>Average speeds ranged from <strong>5.1 mph on the M42 and M57</strong> to 11.5 mph on the M60-SBS. The median across the 19 individual services represented by Manhattan’s 17 ACE route groups was <strong>6.2 mph</strong>; 10 services averaged 6.2 mph or less.</p>
            <p>The routes producing the most ACE records were not necessarily the slowest. M101 generated the most records and averaged 7.0 mph, while M15-SBS ranked second in records and averaged 8.1 mph. Meanwhile, the M42 and M57 had the slowest average speeds but generated far fewer ACE records during the study period.</p>
            <p>This comparison does not measure how much ACE changed bus speeds. Speed reflects traffic, signals, stop dwell time, construction, route design, and other operating conditions, while ACE totals also depend on implementation date, route length, service frequency, and camera coverage.</p>
            <blockquote><strong>Key finding</strong>Slow service remains common on ACE routes, especially on several Midtown and crosstown services, but ACE record totals alone should not be treated as a measure of route speed.</blockquote>
          </Finding>

          <section id="recommendations" className="report-section recommendations">
            <SectionHead label="RECOMMENDATIONS" title="Use expansion to target the places where enforcement and street design can do the most" />
            <div className="recommendation-list">
              {recommendations.map((rec) => (
                <article key={rec.number}>
                  <span>{rec.number}</span>
                  <div>
                    <h3>{rec.title}</h3>
                    <p>{rec.text}</p>
                    {rec.bullets && (
                      <ul>
                        {rec.bullets.map(([routes, reason]) => (
                          <li key={routes}><strong>{routes}:</strong> {reason}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </article>
              ))}
            </div>
            <p className="recommendation-sources">
              Route priorities also draw on NYC DOT’s published findings for
              {" "}<a href="https://www.nyc.gov/html/dot/html/pr2026/fast-buses-mamdani-moves-forward-madison-ave-bus-lane.shtml">Madison Avenue</a>,
              {" "}<a href="https://www.nyc.gov/mayors-office/news/2026/05/mamdani-administration-begins-work-on-lexington-avenue-bus-lane-">Lexington Avenue</a>, and
              {" "}<a href="https://www.nyc.gov/html/dot/html/pr2024/major-redesign-of-96th-st-manhattan.shtml">96th Street</a>.
            </p>
          </section>

          <section id="limits" className="report-section confounders">
            <SectionHead label="CONFOUNDING FACTORS" title="What else may shape the patterns" />
            <div className="factor-grid">
              {[
                ["Staggered implementation", "Later routes had fewer months to produce records."],
                ["Bus frequency", "More trips create more opportunities to observe an obstruction."],
                ["Route length & overlap", "Long and overlapping routes cover more street space."],
                ["Outcome maturation", "Recent records may not yet show final issued outcomes."],
                ["Traffic & construction", "Street work, weather, events, and seasonal travel affect demand."],
                ["Congestion Relief Zone", "Tolling began during the study period and may have changed traffic volumes and obstruction patterns south of 60th Street."],
                ["Land use & curb function", "Schools, hospitals, retail, and residences use curbs differently."],
                ["Standardization", "Canonical labels can combine points that appear separately on the map."],
              ].map((item, index) => <article key={item[0]}><span>{String(index + 1).padStart(2, "0")}</span><h3>{item[0]}</h3><p>{item[1]}</p></article>)}
            </div>
          </section>

          <section id="methodology" className="report-section methodology">
            <SectionHead label="DATA & METHODOLOGY" title="How the analysis was produced" />
            <details open>
              <summary>Data sources and fields</summary>
              <p>The primary source was the MTA Bus Automated Camera Enforcement Violations dataset downloaded from New York State Open Data. The extract contained 1,596,097 records dated from June 20, 2024 through June 15, 2026. Each row represents an event recorded by an ACE camera—not necessarily a confirmed violation.</p>
              <p>The analysis used six source fields: violation ID, first occurrence date and time, final status, bus route, reported stop name, and geographic point. A separate MTA file supplied the ACE implementation date for each route. NYC Department of City Planning 2020 Census Tract geometry supplied the borough and Neighborhood Tabulation Area associated with each coordinate.</p>
            </details>
            <details>
              <summary>Record cleaning and exclusions</summary>
              <p>Violation IDs were checked for exact duplicates, repeated IDs, and conflicting records. None were found, so no records were removed as duplicates. Dates were parsed into a common timestamp, geographic points were separated into longitude and latitude, route labels were standardized, and status values were checked against the recognized outcome categories.</p>
              <p>We excluded 29,334 records whose coordinates fell outside Manhattan or could not be matched to the official tract geometry, 26 records with missing or unrecognized statuses, and 607 records dated before the implementation date supplied for their route. These exclusions total 29,967 records, leaving 1,566,130 records in the final Manhattan dataset.</p>
              <p>Select Bus Service route variants were combined where they represent the same public-facing service. For example, M14A-SBS and M14D-SBS records were grouped as M14-SBS, and M34-SBS and M34A-SBS were grouped as M34-SBS.</p>
            </details>
            <details>
              <summary>Geographic assignment</summary>
              <p>Each unique, valid longitude and latitude pair was tested against official 2020 Census Tract polygon boundaries using a point-in-polygon algorithm. A bounding-box check first narrowed the possible polygons; a ray-casting test then determined whether the point fell inside a tract. Only points assigned to the borough of Manhattan were retained.</p>
              <p>Each retained record inherited the 2020 NTA name associated with its containing tract. NTAs are statistical approximations of neighborhoods rather than administrative boundaries, so neighborhood findings should be interpreted as geographic summaries, not measurements of official neighborhood jurisdictions.</p>
            </details>
            <details>
              <summary>Primary record measure and enforcement outcomes</summary>
              <p>The report’s primary findings count every retained ACE record, regardless of its final enforcement outcome. This measure describes where and when bus cameras recorded potential obstruction. It should not be interpreted as a count of confirmed violations or as a complete count of every obstruction that occurred.</p>
              <p>Enforcement outcomes were analyzed separately. Records marked “Violation Issued” were classified as issued. The report combines the following categories as non-issued:</p>
              <ul>
                <li><strong>Exemptions:</strong> emergency vehicles, qualifying commercial activity under 20 minutes, buses or paratransit vehicles, and other recognized exemptions.</li>
                <li><strong>Technical rejection:</strong> the available images or other technical information did not allow the event to be confirmed.</li>
                <li><strong>Driver or vehicle information missing:</strong> a violation could not be issued because identifying or registration information was unavailable or could not be matched.</li>
              </ul>
              <p>Non-issued therefore describes a shared outcome—no violation was issued—not a single underlying cause.</p>
            </details>
            <details>
              <summary>Stops, corridors, and hotspot aggregation</summary>
              <p>Stop names were converted to uppercase, punctuation was removed, extra spaces were collapsed, and common street suffixes were standardized—for example, “Avenue” became “AV” and “Boulevard” became “BLVD.” Where a stop name contained an intersection, the two street components were placed in a consistent order so reversed versions of the same intersection would match.</p>
              <p>A canonical hotspot combines all records sharing the resulting standardized intersection name across routes and source-coordinate variants. Its map coordinate is the median longitude and latitude of those records, reducing the influence of individual coordinate outliers. Corridor labels use the first street component of the standardized original stop name; ambiguous or non-intersection labels remain literal.</p>
              <p>Summary tables were calculated by month, route, NTA, corridor, and canonical intersection. The map data was first aggregated by route, canonical stop, and NTA so filters could be applied. After filtering, matching rows are recombined into one canonical intersection marker. The outcome filter changes the displayed measure without changing the underlying location definition.</p>
            </details>
            <details>
              <summary>Route exposure and time window</summary>
              <p>ACE expanded from four active Manhattan routes at the beginning of the study period to 17 by May 2026. Raw monthly totals are therefore not directly comparable: later months generally contain more routes and more opportunities for cameras to record an event.</p>
              <p>To account for this changing coverage, we calculated active-route-days. One route active for one calendar day contributes one active-route-day. For each month, the denominator is the sum of all days during which each route had been implemented. Monthly ACE records were divided by that denominator to produce records per active-route-day.</p>
              <p>The primary record trend covers 23 complete months from July 2024 through May 2026. June 2024 and June 2026 were excluded because each contains only part of a month. Outcome trends end in March 2026 because issued violations fall sharply afterward while non-issued records continue, indicating that recent records may not have completed review.</p>
            </details>
            <details>
              <summary>Bus speed comparison</summary>
              <p>The bus speed finding uses May 2026 route-level averages published by the MTA Bus Speed by Route Segment report at reports.jehiah.cz. That report summarizes the MTA Bus Route Segment Speeds dataset from New York State Open Data. Its speed measure represents the rider’s experienced travel speed and includes time spent at stops, traffic signals, traffic congestion, deliveries, road closures, and other conditions encountered along the route.</p>
              <p>We matched the published route labels to the 17 Manhattan ACE route groups and ranked their average speeds. The speed source reports M14A-SBS and M14D-SBS separately, as well as M34-SBS and M34A-SBS. Those branches are therefore displayed as 19 individual services rather than being combined into artificial route averages. The median is the middle value after ranking those 19 reported averages.</p>
              <p>This is a descriptive cross-sectional comparison, not a before-and-after evaluation. Routes received ACE at different times, and the available speed snapshot does not isolate the effect of camera enforcement from changes in traffic, schedules, construction, street design, stop dwell time, or other operating conditions.</p>
            </details>
            <details>
              <summary>Statistical methods</summary>
              <p><strong>Mann–Kendall trend test:</strong> This non-parametric test assessed whether monthly values generally moved upward or downward over time. It compares the ordering of month-to-month observations and does not require the data to follow a normal distribution.</p>
              <p><strong>Sen slope:</strong> For every pair of months, the analysis calculated the change in the measure divided by the number of months between them. The median of those pairwise slopes estimates the typical monthly change. This produced the finding of 7.29 fewer ACE records per active-route-day each month.</p>
              <p><strong>Outcome trend:</strong> The same Mann–Kendall and Sen-slope approach tested the monthly non-issued share through March 2026. A record-weighted linear regression was also calculated as a supporting check, giving greater weight to months containing more records.</p>
              <p>These tests identify consistent patterns in the observed data. They do not prove that ACE caused the changes. Statistical results and the complete analysis code are available in the Downloads section.</p>
            </details>
            <details>
              <summary>Software and reproducibility</summary>
              <p>Data cleaning, geographic assignment, aggregation, and statistical analysis were completed in Python using pandas and NumPy, together with Python’s standard library. The point-in-polygon procedure and Mann–Kendall and Sen-slope calculations are written directly in the downloadable analysis script.</p>
              <p>The online report was built with React and Next.js-compatible tooling. The interactive map uses Leaflet. Its compact data file contains aggregated counts for all records, issued violations, exemptions, technical rejections, missing driver or vehicle information, and the combined non-issued category.</p>
            </details>
            <details>
              <summary>Known limitations</summary>
              <ul>
                <li><strong>Recorded events are not all confirmed violations:</strong> exemptions may capture permitted activity, while technical rejections may not be confirmable.</li>
                <li><strong>Recorded events are not all obstruction:</strong> the dataset includes only events observed by an equipped bus while its camera system was operating.</li>
                <li><strong>Exposure is approximate:</strong> active-route-days account for implementation timing, but the data does not provide camera-equipped trips, operating hours, camera uptime, route miles, or comparable service-frequency denominators.</li>
                <li><strong>Route totals are not standardized risk:</strong> older, longer, more frequent, and overlapping routes have more opportunities to generate records.</li>
                <li><strong>Speed is a route-level snapshot:</strong> the May 2026 averages combine many operating conditions and cannot establish whether ACE caused buses to move faster or slower.</li>
                <li><strong>Recent outcomes may be incomplete:</strong> the final months may contain records that had not reached a final outcome when the data was extracted.</li>
                <li><strong>Canonical labels simplify geography:</strong> records with the same standardized intersection name are combined even when source coordinates vary.</li>
                <li><strong>The analysis is descriptive:</strong> traffic, construction, weather, land use, enforcement practices, and other concurrent changes prevent causal conclusions about ACE’s effect.</li>
              </ul>
            </details>
            <div className="sources">
              <h3>Primary sources</h3>
              <a href="https://www.mta.info/agency/new-york-city-transit/automated-camera-enforcement">MTA Automated Camera Enforcement ↗</a>
              <a href="https://data.ny.gov/Transportation/MTA-Bus-Automated-Camera-Enforcement-Violations-Be/kh8p-hcbm">MTA ACE violations dataset ↗</a>
              <a href="https://data.ny.gov/Transportation/MTA-Bus-Automated-Camera-Enforced-Routes-Beginning/ki2b-sg5y">MTA ACE route implementation dates ↗</a>
              <a href="https://data.ny.gov/Transportation/MTA-Bus-Route-Segment-Speeds-Beginning-2025/kufs-yh3x">MTA bus route segment speeds ↗</a>
              <a href="https://reports.jehiah.cz/bus_speeds/">MTA Bus Speed by Route Segment report ↗</a>
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
                ["Statistical results", "/downloads/analysis_results.json"],
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
        <p>ACE online report · July 2026</p>
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
      <a href="#speeds">6 · Bus speeds</a>
      <a href="#recommendations">Recommendations</a>
      <a href="#limits">Confounding Factors</a>
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
