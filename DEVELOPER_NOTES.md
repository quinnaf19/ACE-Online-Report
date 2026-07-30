# Developer notes

## Data audit

The report and embedded map were reconciled against the final cleaned analysis
on July 29, 2026. Checks cover record and outcome totals, study dates, monthly
series, route exposure, route/corridor/neighborhood/stop rankings, chart
values, and canonical-intersection map totals.

The map now combines route/NTA rows sharing a canonical stop label and displays
all ACE records by default, with final-outcome filters available. For example,
`MALCOLM X BLVD / W 125 ST` displays the reconciled total of 35,893 ACE records
before filters are applied. Canonical marker coordinates are drawn from
`stop_summary.csv`.

## Publication decisions

- Add the final report PDF and analytical workbook to Downloads if approved.
