# HyperMatch — correct Vercel deployment

Upload the contents of this folder into `hypermatch-telugu-creators` in your GitHub repository. That folder must contain `package.json` and `index.html` directly, plus `src/`, `data/`, `vite.config.js`, and `vercel.json`.

In Vercel set:
- Root Directory: `hypermatch-telugu-creators`
- Framework Preset: Vite
- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: `dist`

Commit the source files to GitHub, then redeploy the latest commit. A green “Ready” label is not proof that the right source folder was deployed; open the deployed URL and test it.

The seed data contains five source-linked public Telugu channel records. It does not claim the 1,000-record goal is complete. The current project has no production authentication/backend, and the build has not been verified in this environment because npm installation timed out.
