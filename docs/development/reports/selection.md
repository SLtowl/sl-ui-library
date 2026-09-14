# Selection expansion handoff

Owner review: all ten new Toggles were approved on 2026-09-14. The Russian review copy is private and local only, under ignored `.local/ru-review/`; public sources and the plugin remain English. No publishing is authorized by this review approval. The next category for owner review is Checkboxes.

Date: 2026-09-13. Status: implemented and locally verified; owner review and coordinator integration remain.

Exactly ten catalog entries and ten standalone packages were added. The existing ten binary toggles are unchanged.

## Components and verified behavior

| Component | Package | Interaction and evidence |
| --- | --- | --- |
| Presence rail | selection-presence-rail-v11 | Three-position radio rail. Pointer selection, wrapping arrows, Home/End and one tab stop per group. The indicator moves from its current position on reversal. |
| Reading density | selection-reading-density-v11 | Bounded Compact/Balanced/Roomy stepper changes three sample lines. Unavailable directions disable at endpoints; keyboard focus moves to the available direction. |
| Reading aids | selection-reading-aids-v11 | Master switch gates Line guide and Key phrases. Turning aids off preserves both child choices and disables their controls. Re-enabling restores the sample highlights. |
| Focus override | selection-focus-override-v11 | Temporary preset displays both effective options off, while retaining asymmetric saved preferences. Releasing the preset restores those choices. |
| Snap modes | selection-snap-modes-v11 | Grid and Guides each have Off/Soft/Firm modes and independent radio keyboard navigation. Guide visibility and sample marker respond locally. |
| Week rhythm | selection-week-rhythm-v11 | Seven independent pressed day buttons, Weekdays/Weekend replacement presets and Clear. Empty selection, singular counts and canonical week ordering are supported. |
| Measurement units | selection-measurement-units-v11 | Metric/Imperial selection converts canonical 12 km / 480 m into 7.5 mi / 1575 ft. Twenty round trips preserve the original metric values. |
| Inherited setting | selection-inherited-setting-v11 | Workspace/Custom source selection, visible effective value, disabled custom control while inherited, and remembered personal setting. External workspace-value changes have a validated API path. |
| Preview mode | selection-preview-mode-v11 | List/Outline draft changes the sample. Apply commits locally; Cancel and Escape restore the applied layout. Escape returns focus to the applied radio. |
| Output priority | selection-output-priority-v11 | Primary/fallback ordering with a reversible swap. Disabling fallback disables swapping, labels the inactive second choice and preserves priority. No audio routing is claimed. |

## Export contract

Every package contains index.html, buttons.css, buttons.js, example.js, instrument-sans-variable.woff2, OFL.txt and LICENSE. Font assets were copied from the approved theme-toggle package; LICENSE is byte-identical to the repository MIT license.

Each package uses a unique data-kind on one .sl-component root, complete visible HTML, English content, Instrument Sans, original inline SVG, scoped semantic palette tokens and the exact window.SLComponent = { mount, mountPreview } compiler wrapper. No remote requests, timers, animation frames, image glyphs or user-value HTML injection occur in package controllers.

The API accepts mount(root, { onChange(state) }). setState(patch, { emit: false }) validates known fields; invalid values (including undefined) throw before mutation. The state getter and emitted selectionchange detail.state are copies. Events bubble across Shadow DOM. reset() is silent, restores package defaults and repairs focus if necessary. destroy() aborts listeners, stops CSS transitions and releases the instance; repeated mount/destroy calls are safe. All selections are local and require explicit application integration for persistence or device operations.

Focus is captured before rendering disabled controls, because browsers can blur a control synchronously when disabled changes. Both the automated DOM double and the real standalone browser example exercise this case.

## Verification

- JavaScript syntax checks passed for all 20 package JavaScript files, the manifest and the category test file.
- node --test tests/batches/selection.test.mjs: 22 passed, 0 failed.
- The dependency-free tests parse actual package HTML into a small DOM double. They cover package completeness, exact compiler transformation, isolation, state validation, independent event payloads, reset, repeat mount/destroy, disabled behavior, radio keyboard handling, Shadow DOM focus scope, meaningful controller transitions and palette contrast. This double is not a browser or layout engine.
- npm run build passed: 140 components, 142 exports and the offline plugin bundle generated successfully in this isolated worktree.
- npm run check was run and stops at the shared legacy assertion in verify.mjs:5: 140 !== 130. Shared count assertions were not changed or weakened. The remainder of that chained command did not run.
- Real browser checks used the Codex in-app browser against the compiled component pages at a 320px viewport. All ten primary interaction patterns above were exercised through pointer/keyboard controls, including Space, Enter, Home/End and Escape where applicable. Screenshots were inspected for each component after a meaningful state change.
- A temporary local fixture mounted the actual compiled package controllers into Shadow DOM. Numeric measurements passed for 29 initial/changed states at exactly 226px root width inside a 458px stage (510px preview minus the 52px title reserve). Every essential button and root content fit. Ten duplicate instances also passed real DOM isolation and repeated-mount checks.
- The temporary fixture used transition suppression only to obtain stable layout measurements; this is not an OS reduced-motion emulation claim.
- All ten components were visually reviewed after changing semantic variables to a violet palette. Automated contrast checks passed for normal/muted text (4.5:1), accent/focus (3:1) and foreground on the accent surface (4.5:1) in the original and alternate palettes.
- The standalone Reading density export was checked at 320 x 720 with keyboard endpoint activation. An outer-body sizing issue was fixed in all examples; the final standalone example fits without unwanted outer scrolling.
- Browser warning/error logs from the local QA fixture were empty.

## Limits and integration notes

Screen-reader announcements, OS-level reduced-motion preference changes and forced-colors mode were not manually emulated. Reduced-motion behavior is implemented exclusively through live CSS media queries; package JavaScript has no timed motion to cancel. The media rules and transition-free final states are covered by source checks and the layout fixture.

The coordinator should regenerate the shared previews/plugin data, update baseline counts as part of integration, rerun the complete checks and perform independent gallery review. Generated shared files and ignored ZIPs are not part of this category commit. No existing package, shared catalog/runtime/configuration, installed plugin or release metadata was changed in the delivered source. Nothing was pushed or published.
