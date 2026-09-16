# Basic animated buttons — batch 4 review

Status: local owner review required. These ten packages are intentionally excluded from `public/catalog-data.js` and generated plugin data until approval and a future release transition.

## Components

1. Cart item — reversible cart state with a dropping product and stable count geometry.
2. Archive item — reversible archive state with file and lid motion.
3. Complete task — reversible task completion with check draw and restrained strike.
4. Schedule item — reversible date state with a landing calendar marker.
5. Compare items — reversible two-card comparison with a visible connector.
6. New folder — reversible local folder preview with an opening face and plus-to-check icon.
7. Add comment — reversible local comment preview with line and count reveals.
8. Translate text — fixed English/Russian sample handoff with literal Unicode.
9. Tag item — reversible local Design tag with a sliding label.
10. Add photo — reversible synthetic photo preview with a frame reveal.

## Contract

- All packages are standalone, offline and self-contained.
- Preview actions mutate local demonstration state only; no network, filesystem, cart, archive, task, calendar, folder, comment, translation, tag or photo operation is claimed.
- Native buttons retain visible focus, live status, forced-colors support and reduced-motion fallbacks.
- `mount(root, options)` exposes one silent setter, `toggle()`, immutable state snapshots, repeat-safe `reset()` and `destroy()`.
- User actions call `onChange` and dispatch one bubbling, composed `sl:action` event.

## Verification

- Static package, source, offline and isolated-manifest contract: passed.
- Real browser interaction, lifecycle, 226 px fit, literal Unicode and reduced motion: passed (2/2 with bundled Chromium).
- Main catalog remains at 254 components and 256 export variants; this review batch is not included.
