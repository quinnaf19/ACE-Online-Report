import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("report includes required public-facing sections", async () => {
  const page = await readFile(new URL("app/page.tsx", root), "utf8");
  assert.match(page, /Keeping Manhattan/);
  assert.match(page, /Why It Matters/);
  assert.match(page, /How We Studied It/);
  assert.match(page, /Interactive Manhattan ACE Record Explorer/);
  assert.match(page, /Data & Methodology/);
  assert.match(page, /Recommendations/);
  assert.doesNotMatch(page, /codex-preview|SkeletonPreview/);
});

test("report embeds the public map and exposes downloads", async () => {
  const page = await readFile(new URL("app/page.tsx", root), "utf8");
  assert.match(page, /https:\/\/ace-map\.quinnaf19\.workers\.dev\//);
  assert.match(page, /\/downloads\/monthly_summary\.csv/);
  assert.match(page, /\/downloads\/stop_summary\.csv/);
});

test("exposure note appears between the map and main findings", async () => {
  const page = await readFile(new URL("app/page.tsx", root), "utf8");
  const map = page.indexOf('<section id="map"');
  const note = page.indexOf("NOTE BEFORE WE DIVE IN");
  const findings = page.indexOf('<section id="findings"');
  assert.ok(map < note && note < findings);
  assert.match(page, /Monthly ACE records/);
  assert.match(page, /Total active-route-days/);
  assert.match(page, /four routes operating for 30 days equal 120 active-route-days/);
});

test("finding one presents only the expansion-adjusted trend chart", async () => {
  const page = await readFile(new URL("app/page.tsx", root), "utf8");
  assert.match(page, /Recorded ACE events declined after accounting for program expansion/);
  assert.match(page, /Recorded events declined relative to the number of active routes and days/);
  assert.doesNotMatch(page, /Total ACE records moved unevenly|Monthly ACE records · July 2024–May 2026/);
});

test("recommendations prioritize named routes and use the consolidated structure", async () => {
  const page = await readFile(new URL("app/page.tsx", root), "utf8");
  assert.match(page, /M1, M3, and M5/);
  assert.match(page, /M102 and M103/);
  assert.match(page, /M106/);
  assert.match(page, /Make loading zones and bus stops easier to recognize/);
  assert.doesNotMatch(page, /six and twelve months after launch|establish a baseline for records/);
  assert.doesNotMatch(page, /Treat hotspot corridors as systems|Publish meaningful exposure measures|Evaluate every new rollout/);
});

test("recommendations appear before confounding factors in the report and navigation", async () => {
  const page = await readFile(new URL("app/page.tsx", root), "utf8");
  assert.ok(page.indexOf('<section id="recommendations"') < page.indexOf('<section id="limits"'));
  assert.ok(page.indexOf('<a href="#recommendations"') < page.indexOf('<a href="#limits"'));
});

test("methodology documents the reproducible workflow and exact exclusions", async () => {
  const page = await readFile(new URL("app/page.tsx", root), "utf8");
  for (const text of [
    "Data sources and fields",
    "Record cleaning and exclusions",
    "Geographic assignment",
    "Stops, corridors, and hotspot aggregation",
    "Route exposure and time window",
    "Statistical methods",
    "Software and reproducibility",
    "29,334 records",
    "26 records",
    "607 records",
    "1,566,130 records",
    "point-in-polygon algorithm",
    "Mann–Kendall trend test",
    "Sen slope",
    "pandas and NumPy",
  ]) assert.match(page, new RegExp(text.replace(/[–]/g, "–")));
});
