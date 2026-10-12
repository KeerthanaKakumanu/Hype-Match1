# HyperMatch — Telugu Creator Marketplace

A React + Vite prototype for discovering source-linked Telugu creators/channels and building two-way brand/creator collaboration workflows. Theme: bold orange, red and yellow. AI helper: **HyAI**.

## Authenticity promise

The bundled seed dataset contains **5 source-linked public channel records** from the official My Village Show channel directory and creator website. It does **not** claim to contain 1,000 authentic creator profiles yet. The count is intentionally honest: the app never pads the directory with invented names or guessed metrics. “Source listed” is not the same as independently verified, platform-verified, available for hire, or endorsing a brand.

Public subscriber snapshots are shown only as rough ranges based on the source page checked on 2026-10-13; reconfirm current metrics directly before a commercial decision. No paid API is connected. HyAI uses transparent local keyword matching, not a live generative AI service.

## Run locally

Requirements: Node.js 18+ and npm.

```bash
npm install
npm run validate:data
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

## Deploy to GitHub + Vercel

1. Upload the **contents** of this `hypermatch-telugu-creators` folder into the matching folder in your GitHub repository. Preserve `data/`, `public/` if present, and all source/config files.
2. In Vercel, set **Root Directory** to `hypermatch-telugu-creators`.
3. Framework preset: **Vite**. Install command `npm install`; build command `npm run build`; output directory `dist`.
4. Deploy the latest GitHub commit. A green “Ready” status only confirms deployment completed; open the deployment URL and test it.

## Features

- Telugu-first directory with search, niche and platform filters.
- Source links and separate “source listed” / “needs review” status.
- Brand and creator views, role switch, shortlist, creator opportunities.
- Local HyAI campaign brief/matching helper.
- Campaign creation and status pipeline.
- JSON creator import and profile candidate form.
- JSON export for briefs and shortlists.
- Browser localStorage for demo persistence.
- Responsive layouts and Lucide platform/action icons.

## Demo limitations

- This is not production authentication: role selection is local to the browser, not an account/password system.
- Data, briefs, and campaigns are stored in localStorage, not shared across users/devices.
- Opportunity cards are explicitly sample opportunities, not real paid brand offers.
- Creator profile cards use designed initials/icons rather than fabricated headshots.
- Import records require both `profileUrl` and `sourceUrl`; imports are local to the current browser and must be reviewed before use.
- No claim of 1,000 real profiles until 1,000 unique, source-backed records are actually curated.

## Data sources

- My Village Show official site: https://www.myvillageshow.in/
- Official channel directory: https://www.myvillageshow.in/our-channels
- Gangavva creator website: https://www.gangavva.com/

Source pages establish public channel listings; they do not prove current audience numbers, commercial rates, booking availability, or consent to be listed as a HyperMatch partner.
