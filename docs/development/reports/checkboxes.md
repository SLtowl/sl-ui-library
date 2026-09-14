# Checkboxes local review batch

Owner review: all ten new Checkboxes were approved on 2026-09-14. Russian labels, including sample item names, exist only in the ignored `.local/ru-review/` preview. Public sources and the plugin remain English. This approval does not authorize publication; the next category for owner review is Sliders.

Date: 2026-09-13. Status: implemented and locally verified; owner review and coordinator integration pending. This batch is not published.

## Existing-category review

Inspected the current repository catalog and all 25 checkbox package markups before selecting these additions. Used the repository source CLI to list the category, inspect Nested list, and retrieve its HTML, CSS, controller and example; compared all 25 current controllers (identical hash prefix `0d04c9c2faaf`). The installed skill's older category counts were not used.

The existing set comprises Signature check, Precision square, Circle check, Task complete, Select together, Square cross, Circle cross, Star, Heart, Bookmark check, Shield, Pin, Follow topic, Ring outline, Open corners, Selection chips, Weekdays, Format cards, Texture swatches, Round checklist, Exclusion list, Feature list, File list, Selection table and Nested list. These use independent native checkboxes, with single-parent tri-state behavior for the grouped examples. The additions below introduce distinct selection rules rather than extra glyph treatments.

## Delivered components and QA inventory

All variants have the prefix `checkboxes-` and suffix `-v11`.

| Variant purpose | Component | Behavior exercised with real browser input |
| --- | --- | --- |
| limited | Limited shortlist | Reach three choices, disable remaining choices, remove one, add another, Space to deselect, Clear. |
| budget | Selection budget | Sum costs to seven points, block an unaffordable choice, remove a cost, reach exactly eight, verify remaining budget and meter. |
| permissions | Permission matrix | Edit grants View in its resource row; removing View also removes Edit while preserving another row. |
| group-quotas | Grouped quotas | Fill independent two-item tool and format quotas; release one group without releasing the other. |
| filtered-bulk | Filtered bulk selection | Filter to one asset, select/deselect visible results, retain a hidden selected asset, show empty results, restore a mixed master. |
| ranked | Ranked shortlist | Select in a different order from the markup, promote rank two to rank one, return keyboard focus, preserve ordered state, remove a rank. |
| exclusive-none | Exclusive none | Replace several channels with None, replace None with a channel, remove None to leave an unspecified preference. |
| dependencies | Dependent export options | Selecting a detail adds Sources; removing Sources clears both dependent details but preserves Readme. |
| optional-radio | Optional delivery choice | Native ArrowDown replaces the selected mode, exact local credit cost updates, Clear leaves no radio selected. |
| filter-polarity | Include or exclude rules | ArrowRight changes one native group, another group stays independent, Clear returns all three rules to Any. |

The automated suite also covers malformed/unknown/duplicate values, silent controlled updates, snapshot isolation, reset, form reset, duplicate mount, repeated destroy/remount, event counts, callbacks and released constraints. Exploratory cases include 60 deterministic reversals plus 12 real keyboard reversals, literal Unicode and HTML-shaped search text, an empty filtered subset, and independent radio groups across two forms plus a Shadow DOM form.

## Package and integration contract

- Exactly ten manifest entries and ten self-contained seven-file packages: HTML, scoped CSS, controller, example, Instrument Sans font, OFL and repository MIT license.
- Each package owns one visible `.sl-component` form and a unique `data-kind`. Keep the form root and do not nest it inside another form: form ownership isolates native radio groups without global IDs or generated names.
- `window.SLComponent = { mount, mountPreview }` follows the compiler wrapper. Every package is offline and framework-free. Pure local selection uses no simulated requests, timers, observers or animation loops.
- `mount(root, { values, onChange })` returns `state`, `setValues(values)`, `reset()` and `destroy()`. Programmatic values are validated and updates are silent. User interactions dispatch composed, bubbling `selectionchange` events and invoke the callback with action and a copied state snapshot.
- Filtered bulk adds `setFilter(text)` and query/visible state. Ranked shortlist adds `moveEarlier(value)` and ordered values. Budget exposes used/budget; delivery exposes credits; limited and ranked expose limit. Exact rules and method returns appear in the package example and manifest usage.
- The local controller only selects values. Any application persistence, exports, permission enforcement, delivery operation or purchase must be connected by the integrator.

## Verification evidence

- `node --test tests/batches/checkboxes.test.mjs`: **35 passed, 0 failed, 0 skipped**. Controller tests use a small deterministic DOM fixture, not a simulated claim of browser coverage.
- `node --check`: all 20 added package JavaScript files, the manifest and the batch test pass.
- `npm run build`: passed with **140 components / 142 exports** in this isolated worktree. The compiler accepted every controller and generated every preview and ZIP.
- `npm run check`: stopped at the existing `verify.mjs:5` baseline assertion, **140 !== 130**. The shared count assertions were left intact for the coordinator. Later shared checks were not reached by this command.
- Real browser: Microsoft Edge **152.0.4191.66**, controlled by bundled Playwright in a persistent Node REPL. All ten interaction scenarios passed without page errors. Pointer input, Space, native radio arrows, Enter on Clear, focus return and preview Reset were exercised.
- Standalone views were inspected at 320px component width and at an explicit **226px root inside a 320px browser viewport**. Initial and changed-state contact sheets were reviewed. No horizontal overflow, unreachable controls or missing glyphs were found. The largest narrow root was Filtered bulk selection at approximately **432.4px**, inside the 458px content allowance. The final list cap is 280px; longer integrated content can scroll intentionally.
- All ten **compiled Shadow DOM previews** were checked on the real component page at a **320px browser viewport**. This page currently gives the root 254px. Every root stayed below the reserved 52px heading and within its 510px host. The lowest bottom edge was approximately **497.2px**. Every library Reset restored the initial state.
- Live reduced-motion changes were tested on every mounted component: transitions became `0s` immediately and returned when the preference was removed. No JavaScript animation scheduling exists.
- A violet semantic palette was visually checked with selected, disabled and focused controls; default and alternate text/foreground contrast pairs are tested at 4.5:1 or better. Check glyphs and focus bind to semantic variables. Forced-colors CSS is supplied, but assistive-technology and OS high-contrast testing were not performed.
- A visual browser finding was fixed: empty native radio groups also match `:indeterminate`. The mixed-state glyph and fill now target only checkbox inputs. Decorative marks use `pointer-events: none` so native input targets receive clicks. Matrix headers align with controls, and Clear returns focus before becoming disabled.

Temporary local evidence (not release assets) contains compiled-previews.png, narrow-initial.png, narrow-active.png, palette.png, motion.png and results.json. The narrow sheets preceded the final two-pixel list-cap adjustment; the compiled sheet reflects that final adjustment. The motion capture is a spot check; no frame-by-frame animation trace or screen-reader certification is claimed.

## Coordinator handoff

Only owned source packages, the checkbox manifest, this report and the batch tests are committed. Generated shared previews, view data and plugin assets are excluded; rebuild them after integrating category commits. No existing packages, root configuration, shared tests, plugin installations, version numbers or publication settings were changed. No known broken primary interaction remains. Final independent category-card review, shared-suite count updates and cross-browser/assistive-technology QA belong to integration.
