# Basic animated buttons — batch 4 review

Status: owner approved on 2026-09-17 and integrated. These ten packages are included in `public/catalog-data.js` and generated plugin data.

## Components

1. Cart item — a standalone cart button whose plus draws into a check, without an additional preview scene.
2. Archive item — a document enters and returns from a detailed archive case with direction-aware opacity timing.
3. Complete task — centered preview and button checks draw without changing icon alignment.
4. Assign person — a single clean avatar contour docks into a task-card slot while its connector and target outline retract.
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
- Targeted real-browser interaction, lifecycle, 226 px fit, literal Unicode and reduced motion: passed (3/3 with bundled Chromium), including Cart's plus/check endpoints, Archive's immediate reverse visibility, Assign's single-contour dock, and Compare's symmetric split.
- Full `npm run check`: passed (165 tests passed, 96 optional browser checks skipped because their environment variables are not set by the aggregate runner).
- Main catalog includes this owner-approved batch and its generated previews, downloads and plugin source data.
