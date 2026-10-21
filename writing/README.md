# Editing the Ledger article

The live page is checked-in static HTML. GitHub Pages needs no build tools or browser JavaScript.

- Edit `personal-ledger.template.html` for article text and code.
- `data-tex` spans contain editable LaTeX; add `data-inline="true"` for inline math.
- Code blocks declare `language-python` or `language-sql`.
- Run `npm install --prefix scripts`, then `node scripts/build-ledger.cjs` from the repository root to regenerate HTML, syntax highlighting, and local KaTeX assets.
- The `.mmd` files are Mermaid diagram sources. Render with `scripts/node_modules/.bin/mmdc -i writing/ledger-architecture.mmd -o blog/personal-ledger/diagrams/architecture.svg -c writing/mermaid-config.json -b transparent` (and likewise feedback/retry/correction). An installed Chrome can be selected with Mermaid CLI's `-p` Puppeteer config option.
- Keep examples explicitly illustrative and implementation references pinned to the revision actually reviewed.

## Publishing

The production site is https://alibekkaliyev.com on the Vercel project `alibekkaliyev` in `alibeks-projects-45fdaf8f`. `www` redirects to the apex domain.

`node scripts/build-site.cjs` assembles only public website assets in `dist/`. Vercel runs this automatically; article HTML must be regenerated separately when its template changes.

Push to `master` to deploy automatically through the Vercel GitHub app. For a manual deployment, run `npx vercel --prod --scope alibeks-projects-45fdaf8f` from the linked checkout.

GitHub Pages remains on `master` and serves browser redirects for the personal homepage and blog. `assets/legacy-redirect.js` preserves the path, query, and fragment; the separate research project site remains on GitHub Pages. Vercel Web Analytics records only visits to the production custom domain.
