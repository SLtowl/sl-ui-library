# Basic animated buttons — batch 4 review

Status: local owner review required. These ten packages are intentionally excluded from `public/catalog-data.js` and generated plugin data until approval and a future release transition.

## Components

1. Cart item — a product card follows a curved route into a shopping bag with stable count geometry.
2. Archive item — a document enters a detailed archive case while its lid closes.
3. Complete task — centered preview and button checks draw without changing icon alignment.
4. Assign person — an avatar docks into a task card and reverses back to the unassigned state.
5. Compare items — two visible stacked cards separate symmetrically and gain a straight connector.
6. New folder — a layered folder opens and reveals two documents with a plus-to-check button icon.
7. Comment on selection — a comment attaches to visibly selected document text so the use case is explicit.
8. Translate text — fixed English/Russian sample handoff with literal Unicode.
9. Tag item — reversible local Design tag with restrained uppercase typography.
10. Add photo — a small photo stack settles into a full landscape card.

## Contract

- All packages are standalone, offline and self-contained.
- Preview actions mutate local demonstration state only; no network, filesystem, cart, archive, assignment, task, folder, comment, translation, tag or photo operation is claimed.
- Native buttons retain visible focus, live status, forced-colors support and reduced-motion fallbacks.
- `mount(root, options)` exposes one silent setter, `toggle()`, immutable state snapshots, repeat-safe `reset()` and `destroy()`.
- User actions call `onChange` and dispatch one bubbling, composed `sl:action` event.

## Verification

- Static package, source, offline and isolated-manifest contract: passed.
- Targeted real-browser interaction, lifecycle, 226 px fit, literal Unicode, reduced motion and symmetric Compare split: passed (3/3 with bundled Chromium).
- Full `npm run check`: passed (165 tests passed, 96 optional browser checks skipped because their environment variables are not set by the aggregate runner).
- Main catalog remains at 254 components and 256 export variants; this review batch is not included.
