# Menus local expansion

Status: owner-approved after the feedback repairs on 2026-09-14. All ten menus are approved. Continue review with the ten new Navigation components in English, as requested by the owner. Nothing was published or pushed.

## Owner feedback repair — 2026-09-14

- Reproduced search focus outlines crossing the first character: the former negative outline offset equalled the text padding. Focus is now a single border on the padded search field, with no overlaid input outline.
- Reproduced dismissal when clicking a non-interactive label or panel padding. All ten dialog panels now have tabindex="-1", retaining focus inside without adding a Tab stop. The nested time picker uses the same approach. Outside click, Escape and keyboard exit still dismiss correctly.
- The owner requested priority-first ordering instead of a tie-breaker. Priority first now groups High, Medium and Low before applying the selected date/name direction. Turning it off restores normal field sorting; the labels, package example and catalog contract describe this explicitly.
- The column table uses automatic column widths, 12px text and unbroken cells inside a keyboard-scrollable local region. An overflow-only hint follows its actual width; the ResizeObserver is disconnected on destroy, the hint is removed and horizontal scroll resets.
- The document summary separates its current-version caption, 18px title and 15px/1.65 body. Draft copy has additional line spacing. The private Russian review uses a consistent Cyrillic-capable system font; public exports retain Instrument Sans and English strings.

Verification: five targeted regression tests failed before the repair. The final Menus browser suite passed all 57 tests with no failures or skips. npm run build passed; npm run check passed 152 tests with zero failures and 83 optional browser checks skipped in its default environment. The separate Menus run covers its skipped browser cases. Source verification checked 234 components, 236 packages/ZIPs, 1101 source files and English public UI. Additional Russian Shadow DOM checks covered plain panel clicks in all ten cards at 320, 768, 1024 and 1440px, nested time-picker clicks and Escape, priority ordering, table arrow-key scrolling, reset and document typography. Final screenshots were inspected after transitions settled. No page errors or unintended horizontal page overflow were observed; wide tables intentionally scroll inside their card.

The updated source, compiled previews and offline plugin assets are local review changes only. No publication, push or personal plugin installation was performed.

## Existing category reviewed

Reviewed all 15 existing menu interactions: Action menu, Sort menu, Multi-select menu, Context menu, Command menu, Workspace switcher, Status picker, Assignee menu, Appearance menu, Density menu, Export menu, Access menu, Reminder menu, Folder menu and Insert menu. Inspected the current catalog with the repository source CLI and read representative exported HTML, CSS, controllers and examples. The current repository takes precedence over the older installed skill catalog.

## Components and meaningful interactions

All package names below have the `menus-` prefix and `-v11` suffix.

| Component | Package purpose | Behavior verified |
| --- | --- | --- |
| Grouped resource picker | `resource-picker` | Filters projects and documents, hides empty groups, shows an empty result, and commits a chosen resource to the local summary. |
| Nested topic menu | `nested-topic` | Navigates a three-level taxonomy, supports Back and left/right arrows, and assigns only leaf topics with their complete path. |
| Recent action menu | `recent-actions` | Changes actual local zoom and pin state, repeats deduplicated recent actions, clamps zoom to 50–150%, and clears history without changing the canvas. |
| Tag assignment menu | `tag-workbench` | Searches, creates and toggles a draft assignment. Apply commits; dismissal cancels creation and selection. Enforces eight tags and 24 Unicode characters per new tag. |
| Branch and tag menu | `branch-picker` | Switches revision types, filters revisions, selects a local reference and shows coherent sample ahead/behind counts relative to main. |
| Weekly delivery menu | `weekly-window` | Combines weekday/weekend presets, individual days and a 24-hour time. Rejects empty days or time, cancels drafts and applies a local recurring preference. |
| Sort recipe menu | `sort-recipe` | Combines due date or task name and direction. Optional priority-first mode groups High, Medium, Low first, using the chosen field within each group. Recomputes actual sample task rows. |
| Column visibility menu | `column-visibility` | Toggles actual table headers and cells, retains the required task-name column, and offers compact and complete presets. |
| Document checkpoint menu | `checkpoint-menu` | Previews earlier document text, restores a selected local version and provides one-step undo. Cancel preserves the current version. |
| Inline variable menu | `variable-insert` | Replaces the saved textarea selection with a literal template variable. Preserves caret position, supports one-step undo and disables the unavailable account field. |

## Controller and packaging

Each package contains exactly `index.html`, `buttons.css`, `buttons.js`, `example.js`, `instrument-sans-variable.woff2`, `OFL.txt` and `LICENSE`. Font assets were copied byte-for-byte from the approved Assignee menu; the MIT license was copied from the repository.

Every package exposes `window.SLComponent = { mount, mountPreview }` in the compiler-compatible IIFE. Its controller provides `open(last = false)`, `close(restoreFocus = true)`, `reset()`, `destroy()` and a copied `state` getter. Repeated mounting of one root returns the existing instance. `onChange(state)` and the bubbling, composed `sl-menu-change` event receive independent copies. All actions are local; no asynchronous operation, network request, repository checkout, server persistence or actual delivery is simulated.

The charcoal/sage palette uses semantic CSS variables and the bundled Instrument Sans. Icons are original inline SVG paths. CSS transitions reverse from their current opacity/transform and respond to live reduced-motion changes; there are no animation timers, RAF loops or observers. Closing makes the panel inert immediately. Internal focus transfers, Escape, Tab dismissal, outside click and Shadow DOM focus are handled explicitly.

The root is at most 320px wide and 430px tall, fitting the preview's 458px area below its title. Long choice lists scroll separately from primary footer actions. Long result text has a bounded, keyboard-focusable scrolling region. User strings use text-safe DOM APIs.

## Verification

- All 22 owned JavaScript files passed `node --check` (ten controllers, ten examples, the manifest and the test file).
- `node --test tests/batches/menus.test.mjs` with the available Playwright runtime and installed Microsoft Edge: **44 passed, 0 failed, 0 skipped**. This includes 11 manifest/package checks and 33 browser checks.
- Browser checks cover all ten primary interactions, changed-state reset, repeat-safe destroy/remount, single notification delivery, copied event/state data, empty and invalid inputs, Unicode/HTML-shaped strings, eight-tag limits, native editing keys, arrow/Home/End navigation, Escape return focus, Tab/outside dismissal, repeated reversal, live reduced motion, and two independent Shadow DOM instances per package.
- Every package was checked at a forced root width of 226px. The tests assert bounded panel geometry, horizontal fit and visible primary footer buttons. Long Unicode tag results were tested against summary and feedback bounds.
- Semantic palette replacement was checked for all ten packages. Normal text, muted text, selected text and captions meet 4.5:1 in the default tested palette; the focus color exceeds 3:1 against its surface. A recolored 226px weekly menu was visually inspected.
- All ten actual compiled component-page previews were opened and exercised through real pointer/keyboard input at a 320px browser viewport. Reviewed separate screenshots of every open and post-interaction state; roots and panels remained within the 510px preview, below the 52px title. No page errors were observed.
- Standalone weekly-menu geometry was additionally checked at 320, 768, 1024 and 1440px browser widths. No horizontal page overflow or hidden primary footer actions were observed. Inspected a live reversal state with partially interpolated transform/opacity and transparent SVG backgrounds, followed by an immediate reduced-motion state.
- `npm run build` passed and generated 140 components / 142 exports in this isolated worktree.
- `npm run check` stops in the unchanged shared `verify.mjs:5` baseline assertion: `140 !== 130`. The coordinator owns and is updating shared count assertions. No shared tests were weakened here.

To enable the browser portion on another machine, provide an installed Playwright package and optionally an existing Chromium executable. The suite does not install dependencies:

```powershell
$env:SL_UI_PLAYWRIGHT = '<absolute path to playwright/package.json>'
$env:SL_UI_BROWSER = '<absolute path to a Chromium browser executable>'
node --test tests/batches/menus.test.mjs
```

Without a resolvable Playwright installation, the 33 browser checks explicitly skip while the 11 portable checks still run.

## Integration and limits

Only the category manifest, ten package folders, category tests and this report belong in the category commit. Generated `public/preview-data.js`, `public/view-data.js` and plugin catalog/source bundle changes from the verification build remain unstaged, as requested by the coordinator.

Browser validation used Microsoft Edge 152 / Chromium on Windows with the bundled Playwright runtime. Firefox, Safari, touch hardware, high-contrast OS modes and a screen reader were not exercised. This is a local-review batch; owner approval and the coordinator's independent integration QA remain required before release. Application wiring is intentionally absent for local selections and demonstrations.
