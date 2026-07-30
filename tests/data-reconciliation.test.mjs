import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

function parseCsv(text) {
  const lines = text.trim().split(/\r?\n/);
  const parseLine = (line) => {
    const fields = [];
    let field = "";
    let quoted = false;
    for (let index = 0; index < line.length; index += 1) {
      const char = line[index];
      if (char === '"') {
        if (quoted && line[index + 1] === '"') {
          field += '"';
          index += 1;
        } else {
          quoted = !quoted;
        }
      } else if (char === "," && !quoted) {
        fields.push(field);
        field = "";
      } else {
        field += char;
      }
    }
    fields.push(field);
    return fields;
  };
  const headers = parseLine(lines.shift());
  return lines.map((line) =>
    Object.fromEntries(parseLine(line).map((value, index) => [headers[index], value])),
  );
}

async function csv(name) {
  return parseCsv(await readFile(new URL(`public/downloads/${name}`, root), "utf8"));
}

test("published headline and outcome totals reconcile to monthly analysis", async () => {
  const page = await readFile(new URL("app/page.tsx", root), "utf8");
  const rows = await csv("monthly_summary.csv");
  const totals = rows.reduce(
    (sum, row) => ({
      total: sum.total + Number(row.all_records),
      issued: sum.issued + Number(row.violations),
      nonissued: sum.nonissued + Number(row.exempt_reject_total),
    }),
    { total: 0, issued: 0, nonissued: 0 },
  );
  assert.deepEqual(totals, { total: 1566130, issued: 765297, nonissued: 800833 });
  assert.match(page, /Of 1,566,130 records, 765,297 resulted in an issued violation/);
  assert.match(page, /800,833 records—51\.1%—did not/);
  assert.match(page, /1\.57 million/);
});

test("published all-record route, neighborhood, corridor, and stop leaders match downloads", async () => {
  const page = await readFile(new URL("app/page.tsx", root), "utf8");
  const route = (await csv("route_summary.csv")).find((row) => row.route === "M101");
  const neighborhood = (await csv("neighborhood_summary.csv")).find(
    (row) => row.neighborhood === "Washington Heights (South)",
  );
  const corridor = (await csv("corridor_summary.csv")).find(
    (row) => row.corridor === "AMSTERDAM AV",
  );
  const stop = (await csv("stop_summary.csv")).find(
    (row) => row.stop_canonical === "MALCOLM X BLVD / W 125 ST",
  );
  assert.equal(Number(route.all_records), 540443);
  assert.equal(Number(neighborhood.all_records), 167059);
  assert.equal(Number(corridor.all_records), 242024);
  assert.equal(Number(stop.all_records), 35893);
  assert.match(page, /\["M101", 540443, "34\.5%"\]/);
  assert.match(page, /\["Washington Heights \(South\)", 167059\]/);
  assert.match(page, /\["Amsterdam Avenue", 242024\]/);
  assert.match(page, /\["Malcolm X Blvd \/ W 125 St", 35893, "32\.7%"\]/);
});

test("primary record trend runs through May 2026 and outcomes remain separate", async () => {
  const page = await readFile(new URL("app/page.tsx", root), "utf8");
  const rows = await csv("monthly_summary.csv");
  const results = JSON.parse(
    await readFile(new URL("public/downloads/analysis_results.json", root), "utf8"),
  );
  const may = rows.find((row) => row.month === "2026-05");
  assert.equal(Number(may.all_records), 33843);
  assert.equal(Number(may.active_routes), 17);
  assert.equal(
    results.stats.route_day_adjusted_records_mann_kendall.sen_slope_per_month,
    -7.2945328763049515,
  );
  assert.match(page, /7\.29 fewer records per active-route-day each month/);
  assert.match(page, /July 2024–May 2026/);
  assert.match(page, /Outcome trend tests end in March 2026/);
});

test("publication language contains no stale draft or source labels", async () => {
  const page = await readFile(new URL("app/page.tsx", root), "utf8");
  assert.doesNotMatch(page, /Draft for office review|NYC Open Data/);
  assert.match(page, /New York State Open Data \(MTA\)/);
  assert.match(page, /June 20, 2024–June 15, 2026/);
  assert.doesNotMatch(page, /issued violations only|seven in ten|24,144 issued violations/);
});
