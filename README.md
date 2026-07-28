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
- Publication blueprint: `docs/ACE_Online_Report_Blueprint_and_Draft.md`
- Downloadable summary files: `public/downloads/`
- Prepublication items: `DEVELOPER_NOTES.md`

## Embedded map

The report embeds:

<https://ace-map.quinnaf19.workers.dev/>

## Publication status

This repository is a first complete draft for Manhattan Borough President's
Office review. Replace the provisional typographic office mark with an
office-supplied official logo asset and complete the hotspot reconciliation
noted in `DEVELOPER_NOTES.md` before final publication.
