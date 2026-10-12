# HyperMatch: beginner-friendly setup and deployment

## A. Run on your computer (optional)
1. Install Node.js 18 or newer from https://nodejs.org/.
2. Extract `HyperMatch_Complete_Project.zip` to a folder such as `Desktop/HyperMatch_Complete_Project`.
3. Open that folder in VS Code, or open a terminal in that folder.
4. Run `npm install` and wait for it to finish.
5. Run `npm run validate:data`. The script should report the current record count and pass data structure checks.
6. Run `npm run dev`. Open the local URL Vite prints, usually `http://localhost:5173`.
7. To test the production build, stop the dev server with Ctrl+C, run `npm run build`, then run `npm run preview`.

## B. Upload to GitHub
1. Open https://github.com/ and create a repository named `HyperMatch` (or open the repository you intend to use).
2. Open the extracted project folder on your computer.
3. Upload the *contents* of the folder to the repository root: `package.json`, `index.html`, `src/`, `data/`, `scripts/`, `docs/`, `README.md`, and configuration files. Do not upload the ZIP itself as the only repository file. Do not upload `node_modules` or `dist`.
4. Commit the files to the default branch.
5. Check that `package.json` is visible at the top level of the repository.

## C. Deploy on Vercel for free
1. Open https://vercel.com/ and sign in with GitHub.
2. Choose **Add New → Project**.
3. Import the repository you just uploaded.
4. Confirm the project root is the folder containing `package.json`.
5. Framework preset: **Vite**. Build command: `npm run build`. Output directory: `dist`.
6. Click **Deploy** and wait for the build to finish.
7. Open the deployment URL that Vercel actually shows. Do not use a guessed URL.
8. If a later GitHub commit is pushed to the connected branch, Vercel normally starts another deployment automatically.

## D. Test the deployed prototype
- Search `filmmaking`, `Runway`, `animation`, or `Telugu`.
- Open a profile and review tool tags, workflow, output formats, commercial-use notes, and demo trust signals.
- Save a creator, refresh the page, and verify that it remains saved in the same browser.
- Open Brief Builder, click a sample idea, generate the brief, edit the aspect ratio and rights text, save it, and download its JSON.
- Add a creator to engagements and move the stage forward.
- Test mobile width and clear filters to check the empty state.

## E. Adding real creator records
The included seed dataset is illustrative only. To import real records, prepare a JSON array using `data/creator-import-template.json` or a CSV using `data/creator-import-template.csv`, then use **Import creators** on the Discover page. Current CSV import is intentionally simple; for fields with commas or quoted CSV values, prefer JSON. Check every profile/source URL and licensing status, and set a verified status only when evidence has been reviewed. Current data import is session/browser state; it does not write changes back into the source files or shared database.

## Troubleshooting
- **`npm` is not recognized:** reinstall Node.js and reopen the terminal.
- **Build fails:** copy the full terminal error and check that you ran commands in the folder containing `package.json`.
- **No creator images:** sample visuals are CSS illustrations by design; no real creator photos are included.
- **Data disappears on another device:** expected for a frontend-only localStorage demo.
- **Vercel cannot find package.json:** the wrong root directory was selected or files were uploaded into an extra nested folder.
