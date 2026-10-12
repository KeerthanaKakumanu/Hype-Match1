# HyperMatch deployment guide

## GitHub upload

The repository folder `hypermatch-telugu-creators` must contain `package.json`, `index.html`, `vite.config.js`, `vercel.json`, `src/main.jsx`, `src/styles.css`, and `data/creators.json` directly inside it. Do not upload only the `data` folder.

## Vercel

- Root Directory: `hypermatch-telugu-creators`
- Framework: Vite
- Install: `npm install`
- Build: `npm run build`
- Output: `dist`

Deploy after the GitHub commit is complete. If Vercel reports “Ready” but the URL is 404, check the deployment's source commit, Root Directory and build logs; a successful deploy status alone does not prove the correct app was published.

## Local verification

```bash
npm install
npm run validate:data
npm run build
npm run preview
```

## Current dataset status

The bundled data contains 5 source-linked public channels/creator channels, not 1,000 profiles. Do not report the 1,000-profile target as achieved until unique records are researched and validated. Subscriber counts change and must be refreshed before campaigns.
