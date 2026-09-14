# Navigation local expansion

Date: 2026-09-14. Status: all ten cards approved by the owner, including simplified card 1. Continue owner review with Overlays. Nothing has been published.

## Owner feedback corrections, 2026-09-14

- Each of the ten cards now has a different repository-owned heading SVG, matched to its navigation pattern.
- Card 1 was simplified after the owner rejected redundant controls. Project section tabs now presents all six destinations in one wrapping group, with no All menu, Previous/Next buttons, position toolbar or scrollbar. Three columns fit the full component; two fit the narrow miniature. Each destination remains directly clickable, including returning from People to Overview. Left/Right and Home/End remain keyboard shortcuts. The internal package ID is unchanged; obsolete disclosure methods/state were removed from this unreleased component and its documented contract.
- Reading queue keeps up to twenty reading-change snapshots. Undo works repeatedly and remains available when visiting another document. Mark unread reverses the selected document directly; this change can also be undone. The controller adds `markUnread()` and `state.undoCount`; `complete()` still only marks an unread document as read.
- The spatial map uses one outer boundary, shared internal walls and door swings contained in the corridor. Room labels and selected backgrounds fit inside their room shapes at both 226 and 320 pixel component widths.
- Source, catalog descriptions, examples, generated previews and portable plugin data remain English. These are local review changes, not a release.

Current integrated validation: `npm run build` passed for 234 components and 236 exports. `npm run check` passed with 153 tests passing, no failures and 86 optional browser tests skipped. The focused navigation suite with Playwright enabled passed all 26 tests with no failures or skips. This suite and live miniature previews additionally cover navigation, repeated Undo, direct Mark unread, keyboard/focus behavior, distinct icons and room geometry. Browser evidence is Chromium-only.

This batch adds exactly ten catalog entries and ten standalone packages. Each package includes `index.html`, `buttons.css`, `buttons.js`, `example.js`, the approved Instrument Sans font, its OFL notice and the repository MIT license. The existing ten navigation packages were inspected: Underline tabs, View switcher, Folder trail, Pagination, Side navigation, Step navigation, Bottom navigation, Section index, Collection navigation and Tree navigation.

## Components and verified behavior

| Component | Package | Interaction evidence |
| --- | --- | --- |
| Project section tabs | `navigation-overflow-tabs-v11` | Six always-visible destinations share one synchronized content panel. One wrapping tab group is the only selection control. Mouse clicks, Left/Right and Home/End change the selected section. All labels fit at 226 and 320 pixel component widths, without horizontal or vertical scrolling. |
| Drill-down navigator | `navigation-drill-down-v11` | Workspace branches lead to Product or Studio and their terminal screens. Back and Escape restore the parent level and exact opener. Invalid cross-branch controller navigation is refused. |
| Navigation history | `navigation-history-v11` | Visiting Home, Brief and Design builds local history. Back and Forward restore content; visiting Review after Back truncates the old forward branch. Repeated current visits do not add entries. History holds at most twenty visits. |
| Contextual navigation rail | `navigation-context-rail-v11` | Document and Collection expose different section names and actual text. Switching objects restores the independently remembered section. Up/Down and Home/End move rail focus. |
| Landmark jump and return | `navigation-landmark-jump-v11` | The chooser focuses a target heading and scrolls only the local reading pane. Return restores the saved scroll offset and chooser focus. Escape closes the chooser or returns after a jump. |
| Searchable route finder | `navigation-route-finder-v11` | Name/path filtering exposes real local destination content. Back restores the query and result focus. An unmatched Unicode string containing HTML-like text stays literal, creates no image, and shows the empty result state. |
| Alphabet jump navigator | `navigation-alphabet-jump-v11` | Letter buttons and Left/Right/Home/End jump to directory groups. Inner scrolling tracks the current letter. Back restores the previous group position and letter focus. |
| Reference jump and return | `navigation-reference-return-v11` | Three inline source buttons lead to two notes. Returning from the second occurrence of reference 1 restores that exact source button and scroll offset. References remain inside the local article pane. |
| Reading queue navigator | `navigation-reading-queue-v11` | Read & next marks a document locally and advances to the next unread item. A read document offers Mark unread. Undo restores up to twenty successive reading-change snapshots, including selection and visit history, even after visiting another document. Back visits the prior document without discarding Undo. |
| Spatial destination map | `navigation-spatial-map-v11` | Original SVG floor-plan contours accompany native room buttons. Spatial arrow keys visit adjacent rooms; Home selects Entrance, and Escape/Back retraces room visits. Room content and the schematic highlight update together. |

## Controller and layout contract

Every root is `.sl-component` with a unique package `data-kind`. Every controller uses the required IIFE and `window.SLComponent = { mount, mountPreview }` declaration. `mount(root, { onNavigate })` returns documented component methods, `reset()`, `destroy()` and a copied `state` snapshot. Navigation emits a bubbling, composed `sl-navigate` event. No router, browser history, persistent storage or server operation is changed by the example.

Queries and focus use the supplied root and its own root node. Mounting an already mounted root destroys its previous controller through a root-local lifecycle event. Destroy removes AbortSignal-bound listeners and stops any native smooth scroll. Repeated reset/destroy and twenty repeated activation/reset cycles were checked; a second Shadow DOM instance retained its own state.

The charcoal/sage palette exposes surface, raised surface, text, muted text, accent, accent ink, border and focus variables. `--nav-color-scheme` also adapts native controls. Selected hover retains accent contrast. Focus uses one outline; selected states also use markers or underlines. Disclosure choices become inert immediately when closed. CSS transitions are reversible; scrolling follows the current reduced-motion preference and stops when that preference changes.

Disclosure lists overlay only their own component and stay inside its bounds. Reading panes and search results intentionally scroll internally. Components render useful markup immediately, use only bundled assets, and make no remote requests.

## Original isolated-batch validation, 2026-09-13

- `npm run build`: passed; generated 140 total components and 142 exports in this isolated worktree.
- `node --check`: passed for all twenty package JavaScript files, the navigation manifest and the batch test file.
- `node --test tests/batches/navigation.test.mjs`, with the already installed Playwright package supplied through `SL_UI_PLAYWRIGHT_PATH`: **22 passed, 0 failed, 0 skipped**.
- The browser run used local headless Chromium and native pointer/keyboard input. It checked every interaction above, emitted events, no browser page errors, repeated actions, reset, destroy, remount, independent instances and reduced-motion changes while mounted.
- Initial component bounds were checked at 320, 768, 1024 and 1440 pixel browser widths. Expanded/selected states were checked at a 226 pixel component width. Compiled `sl-preview` cards were mounted in Shadow DOM at 258 by 510 pixels, reserving the first 52 pixels for the component-page title. All ten roots and tested destinations stayed within the remaining area.
- Screenshots were inspected for all ten initial states at the full 320 pixel component width and selected/expanded states at 226 pixels. All ten also received a light cream/green palette check. A selected-hover contrast defect and immediate disclosure-focus timing defect found during QA were corrected and covered by regression assertions.

To repeat browser verification after integration:

```powershell
npm run build
$env:SL_UI_PLAYWRIGHT_PATH = '<path to an already installed playwright package>'
node --test tests/batches/navigation.test.mjs
```

`SL_UI_QA_DIR` optionally saves initial, desktop, narrow and palette screenshots outside the source tree. If Playwright cannot be resolved and no explicit package path was provided, the eleven source-contract tests run and the eleven browser tests are explicitly skipped. No dependency is automatically installed.

## Original integration notes, 2026-09-13

`npm run check` was attempted and stopped at the existing assertion in `verify.mjs:5`: `140 !== 130`. Later checks in that command were not reached. The coordinator owns baseline count updates and final shared verification; no existing test was weakened or edited.

Generated `public/preview-data.js`, `public/view-data.js` and plugin asset bundles are deliberately excluded from this category commit. The coordinator must rebuild them from the integrated sources. ZIP files remain generated, ignored outputs.

Browser evidence is for Chromium. Firefox, WebKit and an actual screen-reader session were not tested. Local navigation is complete; application routing or persisted read status must be connected explicitly by a consuming application. No primary interaction is known to be broken in the tested environment.
