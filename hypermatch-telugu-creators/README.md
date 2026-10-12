# HyperMatch – Telugu Creators Discovery Dataset & UI

High-quality, **verified-only** starter dataset of real Telugu content creators (primarily Telangana & Andhra Pradesh) for influencer marketing discovery.

## Honest status

- **Verified unique records in this package:** 20 core creators (expandable)
- **No fictional profiles, no fake follower counts, no AI-generated faces**
- Metrics that could not be confirmed are marked `"Not available"`
- Major public figures are flagged with `"is_celebrity": true` so they can be filtered separately
- Profile URLs point to real public YouTube / Instagram pages where verified
- Local image bundling is intentionally limited: platform profile photos are copyrighted; the UI uses initials + official profile links. You can later add creator-approved assets under `public/images/`

A full 500+ verified set with downloadable photos requires ongoing manual / semi-automated collection against public sources and respect for platform ToS. This package gives you a production-ready schema, working discovery UI, and a clean base to grow from.

## What’s included

```
hypermatch-telugu-creators/
├── data/
│   └── creators.json          # Structured dataset
├── public/
│   ├── index.html             # Discovery UI
│   ├── styles.css
│   └── app.js
├── scripts/
│   └── (optional helpers)
└── README.md
```

## Features of the discovery UI

- Search by name / niche / city
- Filters: platform, category, location, size band, hide celebrities
- Pagination (12 per page)
- Grid / list views
- Shortlist (persisted in localStorage) + export JSON
- Creator detail modal with profile links
- Fully static – works on free GitHub Pages / Vercel / Netlify
- No paid APIs, no Lovable dependency

## How to run locally

```bash
# From the project root
cd public
# Option A – simple Python server
python3 -m http.server 8080
# then open http://localhost:8080

# Option B – any static server that can also serve the sibling data/ folder
# If fetch fails, copy data/creators.json into public/data/creators.json
```

Because the UI fetches `../data/creators.json`, the easiest local setup is:

```bash
mkdir -p public/data
cp data/creators.json public/data/
cd public && python3 -m http.server 8080
```

## Integrating into your existing HyperMatch project

1. Copy `data/creators.json` into your project’s data or content folder.
2. Keep your existing design system, logo, theme and layout.
3. Load the JSON and map fields to your existing creator card component.
4. Re-use the filter / search / shortlist logic from `public/app.js` or adapt it to your framework (React/Vue/etc.).
5. Do **not** overwrite your current CSS or branding – only inject the dataset and the discovery behaviours.

Field mapping example:

| Dataset field | Suggested UI use |
|---------------|------------------|
| `id` | Unique key / shortlist key |
| `name` | Card title |
| `bio` | Short description |
| `niche` / `category_tags` | Tags & filters |
| `platform` + `profile_url` | Platform badge + external link |
| `followers_or_subscribers` | Metric display |
| `city` / `state` | Location filter |
| `is_celebrity` | Separate “Public figures” toggle |
| `verification_status` + `last_checked` | Trust badge |

## Growing the dataset

1. Only add creators with a publicly verifiable profile URL.
2. Never invent follower counts – use “Not available” when unsure.
3. Keep `is_celebrity: true` for major film / TV / political figures so everyday creators stay filterable.
4. Prefer official channel handles (@name) over vanity search results.
5. Update `last_checked` whenever you re-verify a metric.

Suggested next categories to expand (still real creators only):

- More food / cooking channels
- Student & education creators
- Fitness & wellness
- Agriculture & rural
- Music / dance / singing
- Regional news commentators
- Micro-influencers (10k–100k) with strong engagement

## Deployment (free)

- **GitHub Pages / Vercel / Netlify**: push the `public/` folder (with a copy of the JSON) as a static site.
- No server, no paid services required.

## License & respect

- Dataset fields are factual public information.
- Do not scrape Instagram/YouTube at scale in violation of their Terms of Service.
- Profile photos remain the property of the platforms / creators; link out rather than re-host unless you have permission.

---

Built for HyperMatch · Verified public data only · Expand responsibly
