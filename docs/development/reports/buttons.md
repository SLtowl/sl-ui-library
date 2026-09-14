# Buttons local expansion

Status: ten new packages ready for owner review. Nothing was published or pushed. The original ten Buttons entries remain unchanged.

## Packages and behavior

| Package | Interaction and integration |
| --- | --- |
| `buttons-split-action-v11` — Split export action | Separate primary action and SVG/PNG/PDF menu. Arrow keys, Home/End, Enter and Escape operate the menu; closing returns focus. `onExport({ format, signal })` supplies the actual export. Repeated activation does not duplicate work. |
| `buttons-cancellable-process-v11` — Cancellable processing | Callback-driven progress, cancellation and retry. Fractions are clamped to 0–1 and stay monotonic within a request. Progress and results from canceled requests are ignored. `onProcess({ signal, onProgress })` supplies processing. |
| `buttons-hold-confirm-v11` — Hold to confirm | A pointer hold confirms after 1.2 seconds; early release, leaving the button, blur and Escape stop it. Native keyboard activation opens an untimed Yes/Go back confirmation. `onConfirm({ signal })` supplies the archive operation. |
| `buttons-action-queue-v11` — Action queue | Holds up to three jobs, supports removal of waiting jobs, and runs them serially through `onRun({ id, label, signal })`. Successful jobs leave the queue. The current and waiting jobs survive failure or cancellation for retry. Labels are literal text. |
| `buttons-record-take-v11` — Record a take | Start/stop transport and actual elapsed seconds. `onStart({ signal })` returns a session with `dispose()`; `onStop({ session, signal })` handles stopping. Reset/destroy dispose the session. A session returned after canceled startup is immediately disposed. Canceling a pending stop retains the recording state and returns focus to Stop. |
| `buttons-review-decision-v11` — Approve or reject | Two explicit pressed states, a visible decision, and undo. This is a local decision model, with `sl:action` events and silent `setDecision()` restoration; it does not submit a review. |
| `buttons-refresh-snapshot-v11` — Refresh snapshot | Retains the previous count while refreshing and on failure/cancellation. `onRefresh({ count, version, signal })` returns a validated count and optional literal status label. Successful results increment a local revision and record the local update time. |
| `buttons-duplicate-item-v11` — Duplicate item | Replaces the owner-rejected comparison example. A compact Duplicate action keeps the original visible and shows the last confirmed copy. `onDuplicate({ source, copyNumber, signal })` returns a new `{ id, label }`. Repeat suppression, retry, cancellation, literal labels and late-result protection are included. The preview creates no files. Shuffle is unchanged. |
| `buttons-repeat-stepper-v11` — Press and repeat | Bounded quantity with pointer autorepeat, single native keyboard activation, arrows, Home/End and Escape. Repetition stops on release, leaving the button, blur or a boundary. Focus is retained at limits for immediate reversal. |
| `buttons-shuffle-choice-v11` — Shuffle and undo | Selects a different local suggestion on every pick and provides one-level undo. Accepts 2–20 distinct literal strings, including Unicode, and an optional validated random source. It performs no generation or network operation. |

Each package contains exactly seven files: `index.html`, `buttons.css`, `buttons.js`, `example.js`, the approved Instrument Sans font, `OFL.txt` and the repository MIT `LICENSE`. Each exposes the required `.sl-component` root and `window.SLComponent = { mount, mountPreview }`.

## Controller and design contract

- Normal async mounts require real callbacks and never synthesize external success. Preview simulations exist only in `mountPreview()`; a visible note identifies their local behavior.
- All controllers expose repeat-safe `reset()`, `destroy()` and a copied state snapshot. Mounting the same root disposes only that root's preceding controller. Controllers, request revisions, timers and recording sessions are instance-local.
- Async requests receive an AbortSignal. Rejection, AbortError and `{ status: "canceled" }` are handled. Reset cannot undo an already completed external operation.
- Controls use native buttons, visible focus, appropriate ARIA state, literal text setters and root-relative focus resolution in Shadow DOM. Closed panels are inert immediately.
- The charcoal/sage palette uses semantic `--action-*` variables. Fine inline SVG icons, scoped styles and live reduced-motion preferences are preserved. No remote font, icon, media, tracking or device request is made by the examples.

## Original batch verification

- Syntax checked all 20 package JavaScript files, the batch manifest and the test file.
- `node --test tests/batches/buttons.test.mjs` passes the export/contract test without dependencies and explicitly skips browser checks if Playwright is unavailable.
- With the existing bundled Playwright runtime and installed Microsoft Edge, the same command passes **15 tests, zero failures, zero skips**. No dependency or browser installation was needed.
- Browser checks exercise all ten primary interactions, actual keyboard input, hold/release, autorepeat, progress bounds, errors/retries, cancellation, late results, session disposal, literal Unicode, repeated mounting/destruction, reset DOM/ARIA equivalence, sibling isolation, all six async demo completion paths and Shadow DOM menu focus.
- Expanded 226 px roots measured between 307 and 451 px high; all stay below the 458 px content allowance for the 510 px preview with a 52 px title area. No horizontal overflow was detected. The bounded queue intentionally scrolls if supplied labels exceed the normal three-row layout.
- Live reduced motion disables CSS transitions. Recolored navy/sand components pass tested text contrast of at least 4.5:1 and focus contrast of at least 3:1. Narrow and palette screenshots were inspected for readable labels, visible icons, reachable controls and clipping.
- `npm run build` passes with 140 components and 142 exports in this isolated worktree, including compilation of the new controllers.
- `npm run check` stops at the pre-existing `verify.mjs:5` count assertion: **140 !== 130**. The shared baseline was not changed. `git diff --check` passes.

Browser test setup on this host:

```powershell
$env:SL_UI_PLAYWRIGHT_MODULE = '<absolute path to an installed playwright/index.mjs>'
$env:SL_UI_BROWSER_CHANNEL = 'msedge'
$env:SL_UI_SCREENSHOTS = Join-Path $env:TEMP 'sl-buttons-b967-qa'
node --test tests/batches/buttons.test.mjs
```

The module path and channel are optional environment inputs, not repository configuration. On another machine use its existing Playwright installation and browser. Screenshots are optional test outputs in the chosen directory; they are not committed.

## Integration and limitations

Only the assigned Buttons manifest, ten packages, test file and this report belong to the source commit. Build-generated previews, route data and plugin assets were produced for local verification and are intentionally excluded from the commit; the coordinator regenerates them after integrating all batches.

Browser evidence is Microsoft Edge/Chromium on Windows. Firefox, WebKit, physical touch hardware and a screen-reader session were not tested. No microphone, backend, export service or actual file rendering was connected: applications must supply the documented callbacks and recording cleanup. Independent coordinator QA in the complete catalog and owner visual approval are still required before release.

## Owner review replacement — 2026-09-13

The owner rejected Compare versions and explicitly retained Shuffle. Replaced the comparison package, catalog entry and export with Duplicate item; all nine other new Buttons packages are byte-for-byte unchanged. The removed comparison remains recoverable in local Git history. Nothing was published.

Duplicate uses the existing charcoal/sage tokens, fine inline SVGs, keyboard focus and reversible transitions. The compact preview shows the original and the latest confirmed copy. Normal mounts require a real `onDuplicate` callback. The demo only changes local UI state and never creates files or uses the clipboard.

- `npm run build`: 230 components and 232 exports; plugin catalog/source bundle and shared previews regenerated.
- `npm run check` with the installed Playwright ESM entry and Chrome/Edge: 245 passed, zero failures, zero skips. The Buttons suite contributes 15 passing tests, including the replacement and unchanged Shuffle.
- Independent browser checks: click, Enter, Space, Cancel, Escape, Reset, 20 repeat/cancel/reset cycles, reduced-motion changes, success and retry, rejected/duplicate IDs, immutable snapshots and late results after disposal. Long Unicode labels remain literal.
- Live mini-preview checked at 320, 768, 1024 and 1440 px. The completed component stays inside its card, with no horizontal overflow. Standalone 320 px layout has a 288 px root and no page overflow; corrected its grid sizing during review.
- The code page, all four HTML/CSS/JS/example endpoints and ZIP return HTTP 200. The filtered review page displays only Duplicate item. No browser page errors occurred.
- Screenshots cover initial, transitioning, completed and narrow states. Existing contrast and Shadow DOM tests pass. No external storage integration, Firefox, WebKit or physical screen-reader testing is claimed.
