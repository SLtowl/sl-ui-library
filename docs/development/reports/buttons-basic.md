# Basic Buttons — owner review batch

Status: **local owner review required**. These ten packages are intentionally absent from `public/catalog-data.js` and the published plugin until the owner approves them.

## Components

1. **Add item** — plus-to-check transition; local reversible `added` state.
2. **Send message** — departing paper plane, pending wash and drawn confirmation; application mounts require `onSend({ signal })`. The preview explicitly performs no send.
3. **Edit mode** — pencil-to-check transition; local reversible `editing` state.
4. **Link or unlink** — animated chain halves; local reversible `linked` state.
5. **Lock or unlock** — opening and closing shackle; local reversible `locked` state.
6. **Details disclosure** — rotating chevron and reversible height reveal; Escape closes and restores button focus.
7. **Filter toggle** — tightening funnel and active marker; local reversible `active` state.
8. **Sort direction** — flipping arrow and reordered row strokes; local `ascending` / `descending` state.
9. **Pin item** — settling pin rotation; local reversible `pinned` state.
10. **Print document** — animated paper feed, pending wash and drawn confirmation; application mounts require `onPrint({ signal })`. The preview explicitly performs no print.

## Package and interaction contract

- Isolated manifest: `public/catalog-batches/buttons-basic.js`.
- Ten distinct package folders, each with the required seven portable files.
- English interface text, repository-owned inline SVG, bundled Instrument Sans, offline source, scoped CSS and neutral charcoal palette.
- Native button keyboard activation, visible focus, `forced-colors`, live `prefers-reduced-motion`, 226 px fit and palette tokens.
- Local controls expose repeat-safe `reset()` and `destroy()`, silent setters, isolated state and one user event per state change.
- Asynchronous actions reject missing callbacks, suppress repeated starts, support AbortSignal cancellation and ignore late settlements.

## Verification

- `node --test tests/batches/buttons-basic.test.mjs` with local Playwright: **8 passed, 0 failed**.
- Browser coverage: pointer and keyboard reversal, disclosure focus, real callback success/failure/cancel, remount cleanup, silent restoration, 226 px fit, palette adaptation and reduced motion.
- `npm run build`: **234 released components rebuilt**; the unapproved batch remained outside release data.
- `npm run check`: **161 passed, 0 failed, 93 skipped**. Skips are optional browser suites without their environment variables; the new batch's dedicated browser suite was run separately and passed.
- Manual visual review covered the desktop grid, completed button states, the expanded disclosure and the lower cards. One stale disclosure accessible name and one review-iframe scrollbar were found and fixed during this pass.
- Owner feedback refinement: Send message, Link or unlink, Lock or unlock and Pin item now reserve label geometry so text changes cannot move the icon group. Their icon paths use longer continuous easing curves; Send keeps the plane on one trajectory through pending/complete, Link draws the connector after both chain halves meet, and Lock/Pin use smaller reversible rotations.
- Second owner feedback refinement: Send message now centers every label independently of its length while its icon remains anchored. Pin item uses a newly drawn classic two-part thumbtack outline instead of the original irregular pin contour.

Local review URL while the review server is running: `http://127.0.0.1:4337/`.
