# Data display v11 local review batch

## Owner review revision — September 15, 2026

The owner requested changes to cards 1, 2, 3, 4, 6 and 9, then approved the complete ten-card group after reviewing the fixes on September 15, 2026. Data display is the final category in the sequential owner review; no further category batch remains to be shown. This approval is not a publication. Public labels, documentation and exports remain English.

- **1 — Conversion funnel:** left-aligned percentage tracks, clear row actions and drop-off details. Switching the percentage base updates both labels and bar lengths, with a reversible 320ms transition. Reduced motion disables the transition immediately.
- **2 — Review score matrix; 3 — Storage treemap:** removed underlines from selected numbers/letters. Existing selection boundaries and keyboard focus remain.
- **4 — Cycle comparison:** replaced the misleading handle-like paired points with two explicitly labeled bars per team. These are read-only values, not sliders; clicking a team reveals its exact count and percentage change. Both cycles use the same 0–160 issue scale.
- **6 — Latency distribution:** replaced the box-and-whisker diagram with five labeled statistic rows and animated region-comparison bars. The selected row explains its statistic. Both regions use the same 0–100 ms scale.
- **9 — Duration histogram:** moved counts above the columns, removed black count backgrounds and redundant underlines, and centered tabular numerals in each column. Frequency/cumulative mode changes preserve the exact data totals.

Added regression coverage for these visual contracts, real funnel animation and reversal, pointer/keyboard selection, count alignment in both modes at four viewport sizes, and every state of the redesigned cards at a 226px root width. Historical isolated-worktree verification below predates coordinator integration.

Current coordinator verification:

- `npm run build`: passes for 234 components and 236 exports. Generated preview/view data, plugin catalog and source bundle are synchronized with package sources.
- `npm run check`: 247 tests, 159 passed, zero failures, 88 optional browser tests skipped by the default environment. The verifier confirms all 236 packages/ZIPs, 1,101 source files and English UI.
- Dedicated Data display suite with `SL_UI_PLAYWRIGHT` and `SL_UI_BROWSER` configured: all 14 tests pass, zero skips. Intermediate funnel-animation samples are observed after a real click; rapid reversal returns to the exact initial percentage.
- Built gallery: six changed cards inspected at desktop width and in changed states at a 320px viewport. Geometry checked at 320, 768, 1024 and 1440px. No horizontal overflow or clipped controls found. Click, Enter, histogram End navigation and live summaries work in the actual Shadow DOM previews; no page errors observed.
- Every selection/mode combination of the four redesigned charts remains within the 438px standalone preview-content budget at a 226px root width. Reduced-motion and isolated lifecycle tests cover all ten components.

## Original batch handoff

Ten additions to the ten already approved Data display components. All changes are confined to the category manifest, ten new package directories, this report and the category test file. No publication, push, installed-plugin change or shared test change was performed.

## Components and interactions

| Package suffix | Catalog name | Behavior and sample model |
| --- | --- | --- |
| `heatmap` | Hourly heatmap | Select 15 weekday/time cells; exact cell counts total 94 cases. Arrows move within a bounded 3 × 5 matrix; Home/End select row endpoints and Control+Home/End select overall endpoints. |
| `histogram` | Duration histogram | Select six 2-minute bins. Frequency counts sum to 30 jobs; cumulative counts are 2, 6, 13, 22, 27, 30. Y-axis switches explicitly between 0–10 and 0–30 jobs. |
| `ranking` | Channel ranking | Rank four channels by visits or conversion, retaining stable channel selection. 1,000 visits produce 88 sign-ups. Conversion ties preserve source order. Remounting after sorting restores the correct default order. |
| `comparison` | Cycle comparison | Three pairs of labeled bars use a shared 0–160 issue scale. Toggle count/percentage deltas. Cycle totals are 240 and 270; Commerce correctly shows −10 issues / −12.5%. |
| `grouped-rows` | Grouped work log | Independently expand three groups and select six entries totaling 28 hours. Selection opens its group. Escape returns focus to the header; closed groups are inert. Dense expansion scrolls within a 248px inner region. Reset also resets its scroll position. |
| `distribution` | Latency distribution | Compare two five-number latency summaries on a fixed 0–100 ms scale; inspect min, Q1, median, Q3 or max with an explicit explanation of the selected statistic. |
| `series-legend` | Interactive series legend | Toggle three line series with solid, dashed and dotted patterns; exact totals are 115, 120 and 55 visits. Last visible series cannot be hidden. The visible total updates without changing the shared 0–40 visits scale. |
| `funnel` | Conversion funnel | Four stages contain 1,000, 600, 240 and 120 people. Toggle entry-based or previous-stage percentages; inspect numeric drop-off. Bar lengths animate to match the selected percentage base. |
| `score-matrix` | Review score matrix | Inspect nine criterion/platform scores totaling 37/45. Toggle scores and gaps to the target of 5. Bounded matrix keyboard navigation preserves rows/columns at edges. |
| `treemap` | Storage treemap | Select four collections and change proportional area from storage (50/25/15/10 GB) to files (240/360/120/80). Stable letter keys identify small rectangles at 226px width. |

Every suffix above is prefixed with `data-display-` and ends in `-v11`. Catalog IDs add `matte-` before the full package name.

## Integration contract

Each flat package includes the seven required files, the approved Instrument Sans font/OFL and repository MIT license. Markup is complete before JavaScript runs. Each root is `.sl-component` with a unique `data-kind`; each IIFE exports exactly `window.SLComponent = { mount, mountPreview }`.

`mount(root, { onChange })` returns only the relevant selection/mode/toggle methods plus `reset()`, `destroy()` and an immutable `state` snapshot. Repeated mount returns the existing controller; destroy removes listeners with an AbortController, is repeat-safe and permits a fresh mount. The bubbling, composed `displaychange` event and callback receive `{ kind, action, state }`. No asynchronous operation or server success is simulated. Application strings use text-safe DOM APIs.

Scoped semantic `--dd-*` tokens expose surface, text, muted text, borders, selected/hover surfaces, chart accents and focus. Focus is a single inset outline. CSS transitions reverse naturally; reduced motion disables transitions immediately, including when the preference changes while mounted. There are no timers, RAF loops, remote requests or raster icons.

## Verification

- All 22 added JavaScript files pass `node --check` (20 package files, manifest and test).
- `node --test tests/batches/data-display.test.mjs` with `SL_UI_PLAYWRIGHT` pointing to the existing bundled Playwright package: 12 tests pass, zero failures, zero skips.
- The suite verifies compiler extraction, complete exports, font/license equality, scoped styling and offline source, isolated Shadow DOM instances, composed events, frozen snapshots, literal Unicode/HTML-like text, invalid input, reset, repeated activation, destroy/remount, native click/Enter/Space, matrix keys, Escape/focus return, exact data math, a 226px root in a 320px viewport, live reduced motion and a navy palette override.
- Initial 320px-wide components and changed 226px states were inspected in screenshots. The dense grouped state uses intentional inner scrolling. No horizontal control clipping was found; all tested roots remain within the 438px content budget inside the 510px preview.
- The built treemap component page was also opened in the in-app browser at a 320px viewport. File-count mode, collection selection and the complete bottom of the preview were inspected in the actual library Shadow DOM shell.
- `npm run build` succeeds: 140 components and 142 exports in this isolated worktree.
- `npm run check` stops at the pre-existing `verify.mjs:5` count assertion (`140 !== 130`). This shared baseline is intentionally left to the coordinator, as required by the parallel-batch contract. Shared generated files from the local build are not included in the commit.

## Reproduction and limitations

Set `SL_UI_PLAYWRIGHT` to an already installed Playwright package, then run `node --test tests/batches/data-display.test.mjs`. No dependencies are installed by the suite. Without that environment variable, the standalone contract test runs and the 11 browser tests are explicitly skipped. Set optional `SL_UI_QA_DIR` to save initial, narrow and palette/reduced-motion screenshots. The local run saved these in the host temporary `sl-dd-v11-qa` directory.

Browser evidence covers Chromium. Screen-reader speech, Firefox and Safari were not exercised. The palette check covers a navy surface and pale-blue accent/focus, not arbitrary consumer palettes. Remaining shared baseline checks and independent all-category review belong to the coordinator before release.
