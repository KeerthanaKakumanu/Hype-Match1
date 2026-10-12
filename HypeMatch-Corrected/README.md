# HypeMatch — Corrected Starter

**Slogan:** Right Creator. Right Brand. Right Hype.

A colorful, responsive React + TypeScript + Vite creator-discovery demo focused on Telangana and Telugu-relevant public profiles. It is free to run and deploy, with no paid API and no Lovable.

## Important data honesty
- This starter contains a **small set of public creator discovery leads**, not a verified influencer database or 2,000 invented profiles.
- Public profile links were gathered from public Hyderabad/Telangana creator roundups and directories. Some directory listings do not prove current residence; those are explicitly labelled “to verify.”
- Audience counts and engagement rates are intentionally omitted rather than fabricated. Check the linked live accounts before outreach.
- Instagram image URLs use a public profile-image resolver (`unavatar.io`). These are live third-party URLs and can fail due to platform restrictions, handle changes, or resolver availability. The UI retries and offers a retry control rather than showing initials or stock portraits. No creator portraits are bundled or falsely attributed.
- YouTube links labelled “Find on YouTube” open a YouTube search for the named creator when a verified channel URL was not established in the source notes. Confirm the official channel before outreach.

## Run locally
1. Install Node.js LTS.
2. Extract the ZIP.
3. Open a terminal in this folder.
4. Run `npm install`
5. Run `npm run dev`

## Build
```bash
npm install
npm run build
```
Vite output: `dist`

## Deploy to GitHub + Vercel
1. Create a new GitHub repository named `HypeMatch-Official` (or your preferred repo name).
2. Upload/extract the contents of this folder at the repository root. `package.json` and `index.html` must be at root.
3. In Vercel, import that repository.
4. Framework preset: Vite. Build command: `npm run build`. Output directory: `dist`.
5. Deploy.

## Features
- Search, niche and platform filters
- Creator cards open profile detail modals with public social links
- Shortlist toggles
- Responsive design and bright orange/yellow/red/teal/violet palette
- Campaign brief builder with copy action
- Honest labels for unverified audience data
- Photo retry UI; no random stock portraits or fake profile records

## Research references
- Telangana Tribune, “Top 10 Influencers & Content Creators from Hyderabad” (13 Nov 2025): https://www.telanganatribune.com/top-10-influencers-content-creators-from-hyderabad/
- Feedspot, “Top 100 Hyderabad Instagram Influencers” (directory updated Sep 2026): https://influencers.feedspot.com/hyderabad_instagram_influencers/
- Socialveins, “Top 20 Influencers in Hyderabad on Instagram” (updated Sep 2026): https://socialveins.com/find-influencers/all-all-influencers-in-hyderabad-on-instagram
- Modash, “Top 20 Hyderabad Influencers” (Oct 2026): https://www.modash.io/find-influencers/india/hyderabad

Research listings are discovery leads, not a substitute for checking the creator's current public profile.
