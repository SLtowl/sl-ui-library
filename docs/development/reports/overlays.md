# Overlays local review batch

## Owner approval — September 15, 2026

All ten new Overlays are approved following the inner-click, notification typography and neutral-gray palette corrections. Publication remains a separate release step.

Status: implemented for local owner review. This batch adds exactly ten catalog entries and ten complete packages. No existing category packages or shared source files were edited. Publication, installed plugins and release configuration are unchanged.

## Owner feedback corrections, 2026-09-15

All ten panels now have a focusable dialog container. Previously, clicking a heading or padding inside a Shadow DOM preview could focus its outer `main` element, causing the focus-out dismissal handler to close the panel. Clicking non-interactive panel content now keeps focus inside the dialog. Tab and Shift+Tab from the panel itself enter the first/last control; normal backdrop, Escape, close-button and explicit action behavior is retained.

The ten new overlays use neutral grayscale surface, field, text, accent, border, focus and backdrop tokens instead of green-tinted values. The RGB mixer's chosen sample color remains a color value, independent of the interface palette. No other category was recolored.

Notification rows now have readable title/metadata spacing and unboxed, underlined `Mark as read` / `Mark as unread` actions with item-specific accessible names. Shortcut keycaps use a consistent monospace size, 24px minimum height and explicit `Ctrl + K` / `Cmd + K` notation. Both dense panels retain their visible footers and fit at minimum preview width without scrolling their initial content.

Current verification covers all ten panels inside a focusable Shadow DOM host, including headings, body/footer padding, checkbox-label near misses, forward/reverse Tab, Escape and actual backdrop clicks. Neutral palette tokens are enforced by the source contract test. The focused Chromium suite passed all 14 tests, without failures or skips. The build passed for 234 components and 236 exports; the repository check passed with 153 tests passing and 87 optional browser tests skipped. Live miniature previews were checked at the 320px browser width, including notification read/unread actions and shortcut keycaps. Publication is still pending owner review.

## Components

| Package | Component | Meaningful local behavior |
| --- | --- | --- |
| `overlays-workspace-settings-v11` | Workspace settings | Draft density, hint and label preferences; Apply commits, Cancel/Escape/backdrop discard. The sample and visible guidance reflect the draft. |
| `overlays-date-picker-v11` | Calendar date picker | A 42-day calendar, month navigation, roving date focus, arrows, Home/End and Page Up/Down. Selection commits an ISO date. Leap days and the 1900–2099 bounds are enforced. |
| `overlays-notification-inbox-v11` | Notification inbox | All/unread filters, per-item read/unread reversal and mark-all-read. Disappearing results move focus to the active filter. The empty state offers a clear return to All. |
| `overlays-plan-compare-v11` | Plan comparison | Monthly or full-year example prices, differences-only comparison and local Solo/Team selection. No checkout or purchase is performed. |
| `overlays-style-inspector-v11` | Compact style inspector | Live literal-text sample, 0–24 px corner radius, 25–100% opacity, accurate CSS readout and reset-style action. |
| `overlays-shortcut-guide-v11` | Keyboard shortcut guide | Search by action or key, Windows/Mac notation, empty results, live result count and clear-search focus. The reference never installs or executes shortcuts. |
| `overlays-filter-builder-v11` | Project filter overlay | Title, status and ownership filters combine with AND. Matching names/count update immediately; Apply commits exact results and dismissal discards the draft. |
| `overlays-color-mixer-v11` | RGB color mixer | Three bounded RGB channels, six-digit hex validation, literal error feedback, live swatch and committed/draft separation. Invalid hex disables Use color. |
| `overlays-focus-timer-v11` | Focus timer overlay | Real deadline-based countdown with Start/Pause/Resume, duration selection, restart and one completion event. Closing keeps time; reset/destroy clears it. No sound, external notifications or network requests. |
| `overlays-version-history-v11` | Version history overlay | Inspect three revisions, load one into the local example draft and undo the last load once. Current-version and unavailable-undo actions are disabled. |

All ten existing overlays were inspected before choosing these workflows: Project modal, Details drawer, Collection sheet, Project popover, Context tooltip, Confirmation dialog, Action palette, Document preview, Quick edit and Guided tour. Their generic creation/editing/menu/document/tour interactions are not repeated by this batch.

## Integration contract

Each folder contains `index.html`, scoped `buttons.css`, the standalone `buttons.js` IIFE, `example.js`, the approved Instrument Sans font and OFL, and a copy of the repository MIT license.

The mandatory `.sl-component` root has a unique package `data-kind`. `window.SLComponent = { mount, mountPreview }` matches the current compiler. `mountPreview(root)` delegates to the same local controller; no preview-only fake operation is necessary.

`mount(root, { onChange(detail) {} })` returns `open()`, `close({restoreFocus:true})`, `reset()`, `destroy()` and a fresh `state` snapshot. Local changes dispatch a bubbling, composed `overlaychange` event and call `onChange` with `{kind, action, value}`. Exact scenario state and event values are documented in the catalog manifest. Host persistence must be implemented by the consuming application; these callbacks do not report server success.

Instances use root-relative queries, Shadow DOM active-element lookup and private state. A WeakMap inside the IIFE prevents duplicate mounts. Destroy resets the UI, aborts listeners and clears the timer where applicable. Reset and destroy are repeat-safe.

Panels and backdrops stay inside a 440 px tall root. The panel maximum is 420 px, leaving room for the library's title/reset area in a 510 px preview. Close and footer controls remain outside the intentionally scrollable body. Ordinary initial open content fits without scrolling at 226 px and 320 px root widths; long user text or future content can use the inner scroll region.

Closed panels are inert and hidden from accessibility APIs. Open panels move focus to Close. Escape and backdrop dismissal return focus to the opener; Tab cycles through enabled visible controls inside the panel. Focus moving outside the component closes it without pulling focus back. No native viewport dialog or document-wide focus trap is used.

Palette variables are `--ov-surface`, `--ov-field`, `--ov-text`, `--ov-muted`, `--ov-accent`, `--ov-on-accent`, `--ov-border`, `--ov-focus`, `--ov-ink` and `--ov-backdrop`. CSS handles motion and responds immediately to reduced-motion preference changes. No first-paint timer, remote icon/font request or perpetual decorative animation is used.

## Original isolated-batch verification

Environment: Node.js 25.9.0, bundled Playwright 1.62.1, headless Microsoft Edge 152.0.4191.66 on Windows.

- Syntax checks: all twenty package JavaScript files, the manifest and the test file passed `node --check`.
- `node --test tests/batches/overlays.test.mjs`: 13 tests passed, zero failed or skipped when run with the existing browser runtime.
- The contract check verifies all seventy package files, font hash, exact license, compiler expression, offline source restrictions, scoped CSS and required catalog metadata.
- Browser coverage includes all ten primary workflows, initial open content at 226/320 px, viewport bounds, closed inert state, Escape, forward/reverse Tab, backdrop return focus, rapid open/close reversal, reset twice, mount deduplication, destroy twice and remount.
- Additional coverage includes isolated Shadow DOM state and focus, composed local events, Unicode and markup-like input as literal text, zero filter/search matches, leap day and both date bounds, invalid hex, keyboard range endpoints, timer pause/completion/cleanup with a controlled clock, and version undo.
- A recolored violet palette was inspected visually, including selected and disabled states and a single thin keyboard focus outline. Reduced-motion changes were tested while mounted.
- All ten standalone narrow panels and all ten compiled component-page mini-previews were inspected in browser screenshots. Primary controls and open panels remained inside their roots, with no horizontal overflow, missing icons or page errors. A final narrow contact sheet was saved in the task's visualization artifacts as `overlays-final-226px.png`.
- `npm run build` passed: 140 components and 142 exports were compiled, including the ten new packages.
- `git diff --check` passed.

The browser tests use an existing Playwright installation. To reproduce with a non-local installation, set `SL_UI_PLAYWRIGHT_PATH` to its `package.json` and `SL_UI_BROWSER_EXECUTABLE` to the browser executable, then run the test command above. Without Playwright the static contract test runs and browser tests are explicitly skipped; no dependencies are installed automatically.

## Original coordinator follow-up and limits

`npm run check` stops at the existing baseline count in `verify.mjs:5`: `140 !== 130`. The shared check and its legacy agent/plugin tests were not weakened or modified. The coordinator must update shared baseline expectations after integrating all categories and rerun the full suite.

Generated preview/view modules and plugin data were built for local verification but are excluded from this category commit. Regenerate them after cherry-picking the owned sources. ZIP outputs remain ignored build artifacts.

Browser verification covers Chromium/Edge; Firefox, WebKit, touch hardware and an external screen reader were not manually tested. No broken primary interaction is known. The batch remains unapproved for public release until the owner and coordinator review it.
