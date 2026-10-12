# HyperMatch — AI Content Creator Marketplace

Responsive React + Vite hackathon prototype for AI-native creator discovery, AI portfolio inspection, structured briefs, claim-specific trust signals, and engagement tracking.

## Data honesty
The included 12 profiles are **illustrative demo personas**, not verified real people. Their portfolio artwork is generated with CSS shapes and is not real creator work. This project does **not** contain 500+ sourced or verified creators. It includes CSV/JSON import templates and a browser import feature to add real sourced profiles after evidence and image rights are checked.

## Features
- Search by creator, skills, specialization, tools/models, language, and region.
- Filters for specialization, tool, output format, and verification status.
- Creator profile modal with portfolio, workflow, formats, commercial-use notes, and claim-specific trust signals.
- Shortlist saved in localStorage.
- Local rule-based brief assistant: rough idea → editable structured brief. No paid API.
- Save and download briefs as JSON.
- Engagement pipeline: shortlisted → brief sent → accepted → in production → revision → delivered.
- JSON/CSV import templates, data validation script, responsive yellow-orange UI.

## Run locally
Requires Node.js 18+.
```bash
npm install
npm run dev
```

## Validate and build
```bash
npm run validate:data
npm run build
npm run preview
```
Vite outputs production files to `dist/`. See the official [Vite build guide](https://vite.dev/guide/build) and [Vercel Vite guide](https://vercel.com/docs/frameworks/frontend/vite).

## Free Vercel deployment
1. Extract the ZIP.
2. Create or open a GitHub repository and upload the *contents* of the project folder to the repository root.
3. In Vercel choose **Add New → Project**, then import that repository.
4. Framework preset: Vite. Build command: `npm run build`. Output directory: `dist`.
5. Deploy. Use the actual URL Vercel reports after a successful deployment.

## Add sourced creators
Use `data/creator-import-template.csv` or `.json`. Supported fields include ID, name, handle, bio, specialization, skills, tools, content types, formats, languages, region, workflow, commercial-use terms, profile URL, source URL, last-checked date, verification status, and demo flag. Only mark records `verified` when supporting evidence has been reviewed. Do not invent counts, tool claims, identity, image rights, or commercial licensing.

## Known limitations
- Demo seed contains 12 illustrative personas; zero independently verified records.
- Frontend-only; saved data is local to one browser and is not shared across devices.
- Brief assistant is deterministic and rule-based, not a connected generative model.
- No auth, messaging, contracts, payment, or real deployment is included.
- Run the commands above in a Node environment to verify the build.
