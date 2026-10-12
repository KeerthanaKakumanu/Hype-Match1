# HypeMatch

**Right Creator. Right Brand. Right Hype.**

A bright, creator-first discovery and campaign matching prototype focused on the Telugu creator ecosystem across Telangana and Andhra Pradesh.

## What this adjusted build includes
- Real public-profile leads shown first, ordered from widely known profiles toward more niche discoveries.
- Click-through links to public profiles when a direct URL could be identified.
- No stock portraits or AI-generated human portraits. Public profile avatars are attempted via a third-party avatar resolver for identified social handles; if it fails, the card falls back to bright initials/graphic avatars rather than showing a fake face.
- 2,000 clearly marked illustrative sample records after the public-profile leads, so the search UI can be tested at scale.
- Search, category/platform/state/size filters, sorting, profile detail modal, local shortlist, and a campaign brief builder with local heuristic matching.
- Bright orange, yellow, cream, violet and teal accents, mobile layout, favicon and Vercel config.

## Data transparency — please read
This is a prototype, not a verified influencer database. The first section includes public-profile leads based on publicly available creator roundups and known public channels. Some listed leads have direct public URLs; a few have search/placeholder URLs and are explicitly not treated as confirmed official links. Verify the exact account, current audience metrics, language, location, engagement, rates, availability and brand suitability on the platform before outreach. Follower counts shown for public leads are rough, unverified context only and may be outdated.

The remaining 2,000 records are generated **sample records**, not real creators. They are visually marked “SAMPLE ONLY”; names, metrics and budgets are illustrative. Do not describe them as real Telugu influencers. The design uses no fake creator portraits.

## Run locally
Requires Node.js 18+.
```bash
npm install
npm run dev
```

## Build for Vercel
```bash
npm run build
```
Build command: `npm run build` · Output directory: `dist` · Framework: Vite.

## Upload to a new GitHub repository
Extract the ZIP and upload the contents of the `HypeMatch` folder to the repository root. `package.json`, `index.html`, `src/`, and `public/` should be visible at the root. Do not upload the ZIP itself or create an extra nested project folder.

## Prototype limitations
No production database, login, live social API, creator verification API or external AI model is connected. The match list uses local heuristic scoring. Shortlists are stored in the current browser only.
