# Developer notes

## Hotspot reconciliation

The analytical workbook reports 24,144 issued violations for the canonical
label `MALCOLM X BLVD / W 125 ST`. That table groups every record sharing the
standardized stop label, across routes and source coordinates.

The existing map data groups records by route, canonical stop, and NTA. It
therefore divides the same canonical intersection across multiple map points.
The live map also appears to use an earlier generated `stops.json`, which is why
the visible combined point total cited during review (22,315) is lower than the
current canonical workbook total.

The report uses the workbook's canonical-intersection definition for rankings
and explains that definition to readers. Before the report is marked final,
regenerate the map data from the final analytical CSV and add an
intersection-level aggregation/display option so the map’s hotspot ranking and
tooltip can show the canonical 24,144 total.

## Publication placeholders

- Replace “Draft for office review” with the approved publication month.
- Add the final NYC Open Data ACE dataset URL.
- Add the final report PDF and analytical workbook to Downloads if approved.
