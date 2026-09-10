# Development

Node.js 22+ is enough; the shipped library and build have no npm dependencies.

```sh
npm run build
npm run check
npm start
```

Edit a package in `public/packages/`, update its metadata or usage in `public/catalog-data.js`, then rebuild. `build-previews.mjs` compiles controllers into the shared runtime; `build-views.mjs` builds route templates and initial examples; `build.mjs` refreshes ZIPs and the offline agent bundle. The two small `public/experiments/*/demo.js` adapters are retained as build inputs for approved upload/download previews, not an unfinished dependency on an external workspace.

Keep source and tracked generated outputs in the same commit. ZIP downloads are generated on build/start and ignored by Git; never hand-edit them. CI builds, checks byte equality and rejects stale tracked generated files. Do not update package source without rebuilding previews and plugin data.

New component types may need compiler/runtime support, not just a catalog entry. Existing tests intentionally pin the current 110-component / 112-variant release counts; update scope deliberately when adding approved components.

Use actual browser captures for product evidence. Label generated promotional imagery separately. Keep machine paths, personal notes, credentials and intermediate recordings out of the repository. The owner's Russian review document is intentionally outside this checkout.
