# Editing the Ledger article

The live page is checked-in static HTML. GitHub Pages needs no build tools or browser JavaScript.

- Edit `personal-ledger.template.html` for article text and code.
- `data-tex` spans contain editable LaTeX; add `data-inline="true"` for inline math.
- Code blocks declare `language-python` or `language-sql`.
- Run `npm install --prefix scripts`, then `node scripts/build-ledger.cjs` from the repository root to regenerate HTML, syntax highlighting, and local KaTeX assets.
- The `.mmd` files are Mermaid diagram sources. Render with `scripts/node_modules/.bin/mmdc -i writing/ledger-architecture.mmd -o blog/personal-ledger/diagrams/architecture.svg -c writing/mermaid-config.json -b transparent` (and likewise feedback/retry/correction). An installed Chrome can be selected with Mermaid CLI's `-p` Puppeteer config option.
- Keep examples explicitly illustrative and implementation references pinned to the revision actually reviewed.
