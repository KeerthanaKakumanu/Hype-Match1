# HypeMatch — Verified Photo Build (small first launch)

**Right Creator. Right Brand. Right Hype.**

Colorful responsive React + TypeScript + Vite starter for free GitHub + Vercel deployment. This release intentionally includes only two high-recognition Telugu entertainment leads rather than padding the directory with unverified creator data.

## Image handling
The ZIP includes `scripts/fetch-photos.mjs`. During `npm run build`, it downloads the two licensed files from Wikimedia Commons into `public/images/`, validates each response as a JPEG with a plausible file size, and writes local credit records under `public/credits/`. Vite then bundles those local files into the deployed website. The site displays only local `/images/...` paths, not Instagram image URLs or an image resolver.

**Authoring-environment limitation:** outbound downloads were blocked while assembling this ZIP, so the JPEG binaries could not be embedded in this archive itself. The prebuild script downloads and validates them on your computer or Vercel. If a real image cannot be fetched, it stops the build instead of shipping broken photos. For photo files to already exist inside the ZIP before installation, download the source images in an internet-enabled environment and put them in `public/images/`.

## Profiles in this launch
- Allu Arjun — exact public Instagram URL: `https://www.instagram.com/alluarjunonline/`
- S. S. Rajamouli — exact public Instagram URL: `https://www.instagram.com/ssrajamouli/`
These are high-recognition Telugu entertainment figures, not a claim that either accepts influencer-marketing deals. Confirm campaign fit and availability directly. Follower counts and engagement metrics are omitted rather than guessed. No YouTube search links are used.

## Image sources and licenses
- Allu Arjun at 69th National Film Awards — Bollywood Hungama photo, CC BY 3.0: https://commons.wikimedia.org/wiki/File:Allu_Arjun_at_69th_NFA.jpg
- S. S. Rajamouli — Yasshu28, CC0 1.0: https://commons.wikimedia.org/wiki/File:SS_Rajamouli.jpg
Credits are shown in the profile modal and generated in `public/credits/`.

## Run / deploy
1. Install Node.js LTS.
2. Extract the ZIP; open a terminal in this folder.
3. Run `npm install`, then `npm run build` (this fetches and validates local photo files before building).
4. To deploy, push the contents of this folder to the root of a GitHub repository. `package.json` and `index.html` must be at root.
5. Import that repository in Vercel. Build command `npm run build`; output directory `dist`.

No paid API and no Lovable required. Vercel needs internet access to Wikimedia Commons during the build.

## Features
Search, category filter, working profile detail modals, exact Instagram profile links, source/license credits, shortlist, campaign brief builder, responsive design, reduced-motion support.

## Verification status
Image source pages and license terms were researched. Live HTTP checks of the Instagram profile URLs and actual photo downloads could not be completed from the ZIP-authoring environment. The included script validates photo downloads during build. Verify profile URLs before outreach.
