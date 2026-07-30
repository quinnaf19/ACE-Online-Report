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
