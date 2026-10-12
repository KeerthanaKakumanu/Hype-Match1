# HypeMatch — Creator discovery starter

**Right Creator. Right Brand. Right Hype.**

A responsive, static website for discovering Telugu/Telangana creator leads. It includes creator search, niche/platform filters, shortlist, profile detail modal, social links, campaign brief builder, and mobile layouts. It uses no paid API, database, or framework build step.

## Important honesty note

This ZIP is a **working starter directory, not a verified 2,000-creator database**. It contains a small, source-attributed set of public creator leads so the directory does not fabricate names or social URLs. Some source pages list creators with a Hyderabad connection rather than confirmed current Telangana residence; those entries say so. Confirm each social account and details before outreach.

The environment that produced this ZIP could not retrieve external binary assets. Consequently, creator portraits are requested from the public `unavatar.io` avatar resolver at runtime and are **not bundled locally**. If an image cannot be loaded, the matching card is hidden rather than showing a broken image or invented face. This means the site cannot honestly guarantee 100% photos offline or a complete 2,000+ photo directory. A live network connection is needed for the public photos.

## Run locally

Because the app fetches `creators.json`, serve the folder over HTTP instead of opening `index.html` directly.

Python:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000` from this folder.

Or deploy the folder as a static site on Vercel (Framework Preset: Other; Build Command: leave blank; Output Directory: `.`) or GitHub Pages.

## Features

- Search by name, handle, niche and location
- Filter by niche and platform
- Save creators to a session shortlist
- Profile detail modal with social and source links
- Campaign brief builder; includes saved creators and supports copying
- Responsive mobile and desktop UI
- Cards with unavailable public images are removed automatically

## Data and source links

The bundled `creators.json` includes a `source` URL for each public listing. Starting sources include:

- Telangana Tribune: https://www.telanganatribune.com/top-10-influencers-content-creators-from-hyderabad/
- Socialveins: https://socialveins.com/find-influencers/all-all-influencers-in-hyderabad-on-instagram
- Socialveins food list: https://socialveins.com/find-influencers/all-food-influencers-in-hyderabad-on-instagram
- Socialveins comedy list: https://socialveins.com/find-influencers/all-humor_comedy-influencers-in-hyderabad-on-instagram
- Aveoreach Telugu list: https://aveoreach.com/lists/telugu-influencers-india
- Hobo.Video food list: https://hobo.video/blog/20-hyderabad-food-influencers-you-should-follow-on-instagram/
- Siasat creator feature: https://www.siasat.com/meet-hyderabads-content-creators-telling-stories-beyond-food-3196835/
- My Village Show official website: https://www.myvillageshow.in/

Some directory sources can contain stale or approximate details. This project intentionally does not invent follower counts, email addresses, engagement rates, or verification badges.

## Growing the directory to 2,000+

To create a genuine 2,000+ directory, import a properly licensed dataset with verified fields and a photo source that can legally be downloaded and stored. Required minimum fields: `name`, `handle`, `niche`, `platform`, `instagram` or `youtube`, `source`; recommended: `location`, `followers`, `engagement`, `imageUrl`, `imageLicense`, `imageAttribution`, `lastVerified`. The public 5,000-row Dexfluence mirror is an India-wide creator index, not a verified Telangana/Telugu-only list, and its schema does not include bundled profile photos: https://huggingface.co/datasets/Shikha180224/dexfluence-indian-creator-index

Do not simply pad this directory with synthetic rows. Use source and photo checks before marking a profile verified.
