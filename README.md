# Keeping Manhattan Moving

Public-facing online report on Manhattan's Automated Camera Enforcement
program. The report analyzes 1,566,130 records from June 20, 2024 through
June 15, 2026 and embeds the standalone Manhattan ACE Violation Explorer.

## Local development

Requires Node.js 22 or newer.

```bash
npm install
npm run dev
```

Open the local address shown in Terminal.

## Validation

```bash
npm test
```

## Report content

- Main report component: `app/page.tsx`
- Report styling: `app/globals.css`
- Original archival blueprint: `docs/ACE_Online_Report_Blueprint_and_Draft.md`
- Downloadable summary files: `public/downloads/`
- Audit and publication notes: `DEVELOPER_NOTES.md`

## Embedded map

The report embeds:

<https://ace-map.quinnaf19.workers.dev/>

## Publication status

The site uses the Manhattan Borough President logo and visual system from the
approved Trump POPS report reference. Its published figures have been
reconciled to the downloadable analytical summaries; see
`DEVELOPER_NOTES.md` for audit scope and remaining publication decisions.
