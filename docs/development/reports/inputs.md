# Inputs local review batch

Owner review: all ten new Inputs were approved on 2026-09-14 after the picker fixes. The next category for sequential review is Toggles (`selection`). This approval does not publish the local batch.

## Owner picker feedback — 2026-09-14

The date, time, measurement and color fields now use project-styled picker panels instead of browser/OS picker popups. The panels stay inside their component root, share its palette tokens, restore trigger focus on Escape and use reversible opacity/transform transitions with reduced-motion support. Manual ISO date, HH:MM time and hex editing are still available.

- Calendar: Monday-first grid, localized month/day labels, month/year keyboard navigation, leap-day support, bounded dates, Today, Clear and disabled end dates before the start.
- Time: independent, bounded hour/minute lists; the selected row is scrolled into view. Apply commits the draft; Escape leaves the field unchanged.
- Measurement: styled unit choices with keyboard navigation. Canonical millimetres are preserved during repeated unit changes.
- Color: pointer-controlled saturation/brightness plane and keyboard-accessible HSV sliders. Apply commits; cancel preserves the previous hex. Presets still apply immediately.
- Attachment: `mountPreview()` uses built-in in-memory sample documents. It never invokes the system chooser. Normal `mount()` still supports real local File selection and its extension/size checks; no upload or file-content reading is supplied.

The Russian owner view is generated separately in ignored `.local/ru-review/`. Public sources, descriptions and plugin data stay English. The other five Inputs are unchanged. The owner also authorized fixing all seven remaining native pickers in other categories during this revision.

Verification: all **31 input tests passed**, without skips, in headless Edge. New tests cover picker keyboard/pointer flows, cancellation, focus cycling, 8 rapid open/close cycles per picker, remount cleanup, synthetic files, literal values and bounds. Russian expanded panels passed fit checks at 320, 768, 1024 and 1440 px viewport widths. English compiled category previews passed at 320 and 1440 px; the compiled calendar component page also opened correctly. Screenshots were inspected separately, including all five expanded Russian pickers at 320 px. No clipped essential controls or horizontal overflow remained. No screen-reader or Firefox/WebKit validation is claimed.

### Cross-category follow-up audit

A scan of every catalog export found native controls in seven other components. Following explicit owner approval, all seven now use project-styled controls:

| Component | Replacement |
| --- | --- |
| Reminder menu (`snooze-menu`) | Bounded hour/minute picker and editable HH:MM field |
| Weekly delivery menu (`menus-weekly-window-v11`) | Bounded hour/minute picker and editable HH:MM field |
| Contextual navigation rail (`navigation-context-rail-v11`) | Context listbox |
| Workspace settings (`overlays-workspace-settings-v11`) | Density listbox with draft cancellation |
| Project filter overlay (`overlays-filter-builder-v11`) | Status listbox with clear/reset synchronization |
| Focus timer overlay (`overlays-focus-timer-v11`) | Duration listbox, disabled while running |
| Capacity guard (`feedback-capacity-v11`) | Sample-size listbox |

Hidden select elements remain as form/controller value carriers, never as visible OS popups. Listboxes retain their category palette, bound and scroll their choices, support arrows/Home/End, dismiss on Escape or outside interaction and restore focus. Escape closes a nested picker before its parent overlay. Time menus retain single-minute precision and their existing outer confirmation step. All actions still affect local demo state only.

`tests/pickers.test.mjs` adds real-browser checks for all seven: five rapid open/close cycles, keyboard and pointer selection, nested Escape, 320 px popup bounds, reset, remount cleanup, original action values and no external requests. The timer locks its duration while running; settings cancellation restores the previous choice. Screenshots of all seven expanded controls were reviewed separately.

Final integrated verification: `npm run build` and `npm run check` passed with **262 tests, 0 failures, 0 skips** (230 components / 232 exports). A catalog-wide regression checks that every date, time, color and select popup is project-styled; only five hidden select value carriers remain. All seven additional controls were exercised in compiled Shadow DOM category cards at 320 and 1440 px viewport widths: 14/14 popup-bound checks passed without horizontal overflow or browser errors. Their reduced-motion transitions resolve to zero duration; a second navigation palette was also inspected visually. Closed listboxes no longer add scrollable overflow to the timer, and the filter overlay retains its no-scroll default layout. No public deployment, push or personal-plugin installation was performed.

## Original batch (historical)

The dated original-batch report below describes the initial implementation before these owner-requested changes. Its native-picker descriptions, integration limits and component counts are historical, not the current implementation.

This batch adds exactly ten catalog entries and ten complete, independent packages. It is for owner review before release. Existing packages, category scope, shared runtime and release settings are unchanged.

| Package | Interaction and integration value |
| --- | --- |
| `inputs-tokens-v11` | Up to six unique tags; Enter commits one whole tag, including pasted Unicode; named remove controls return focus to the field. Duplicate and length errors are exposed. |
| `inputs-combobox-v11` | A strict assignee selection with stable IDs, local filtering, unavailable choices, arrow navigation, Enter selection, Escape cancellation and restoration on blur. Free text is separate from selection. |
| `inputs-date-range-v11` | Two native calendar fields with inclusive UTC day arithmetic, leap-day coverage, date-order validation and 2000–2100 bounds. |
| `inputs-time-v11` | Native wall-clock time in five-minute steps, three presets, midnight support and a minutes-since-midnight value. It does not schedule anything. |
| `inputs-duration-v11` | Hours/minutes composition, quarter-hour adjustments with carry, 0–1439 minute boundaries and preserved invalid drafts. |
| `inputs-measurement-v11` | Centimetre/inch editing backed by canonical millimetres, accurate conversion and repeat unit switching without accumulating display-rounding drift. |
| `inputs-editable-title-v11` | Explicit local Apply/Cancel, Enter/Escape, IME guards, exact Unicode text and return focus. It does not persist remotely. |
| `inputs-key-value-v11` | Up to three metadata pairs, unique keys, literal arbitrary text including `__proto__`, stable native input nodes while editing and predictable removal focus. |
| `inputs-color-v11` | Native color input, six-digit hex editing and swatches; preserves typed case/caret, validates drafts and synchronizes complete values. |
| `inputs-attachment-v11` | One native local document selection with an English visible chooser label, literal filename, byte size, extension/5 MiB checks and removal. It never reads or uploads file bytes. |

Every package includes `index.html`, `buttons.css`, `buttons.js`, `example.js`, the approved Instrument Sans font and OFL, and the repository MIT license. Each root is `.sl-component` with a unique `data-kind`; each controller uses the compiler's `window.SLComponent = { mount, mountPreview }` wrapper.

All controllers return `reset()`, `destroy()` and a fresh `state` snapshot. `mountPreview` is a direct local mount. `options.onChange` and bubbling/composed `sl:change` events report distinct changes; IME completion does not duplicate identical change notifications. The manifest documents each value shape and option. Validation uses visible text, ARIA and native custom validity where applicable. Native form reset, repeat mounting and cleanup are supported. IDs are allocated per instance without document-global mutable state.

Semantic palette variables cover surfaces, text, muted text, accent, borders, focus and errors. Motion uses reversible CSS transitions with live reduced-motion overrides. Focus uses a single inset outline on actions; native text selection and editing remain available. Long tag/option lists and long display text use bounded internal scrolling. No timers, animation loops, remote requests or external glyph assets are used.

## Verification — 2026-09-13

- `node --check` passed for the manifest, batch test file and all twenty package JavaScript files.
- `node --test tests/batches/inputs.test.mjs` passed **24 tests, 0 failures, 0 skips**, using the bundled Playwright runtime and headless Microsoft Edge **152.0.4191.66**. The browser tests use `SL_UI_PLAYWRIGHT` for an optional external Playwright entry point and `SL_UI_BROWSER_CHANNEL=msedge`; no dependency or personal plugin installation is required. Without an available browser runtime, the test explicitly skips browser coverage rather than claiming it ran.
- Coverage includes the ten primary interactions and error paths, literal Unicode/HTML-shaped strings, synthetic IME sequences, caret/node preservation, disabled controls, isolated Shadow DOM instances, unique IDs, repeated mount/destroy/reset, native form reset after an actual change, reduced-motion changes while mounted, and palette adaptation. An unchanged repeated event does not duplicate a callback.
- Standalone layouts were checked at 320, 768, 1024 and 1440 px viewport widths. A separate 274 px viewport produces the contract's **226 px root**, with expanded controls, errors and bounded scrolling checked against the 458 px available height.
- `npm run build` passed: **140 components / 142 exports**. The real compiled component pages mounted all ten controllers without browser errors at a 320 px viewport. Their roots stayed below the 52 px title area and within the 510 px preview; the combobox was expanded and metadata had three rows.
- Reviewed screenshots cover all ten fields, significant changed/error states, the expanded combobox, three metadata rows, a second palette and the compiled component-page previews. Images are local QA artifacts under the task visualization directory (`inputs-qa`), outside the source commit. No missing glyphs, stacked focus rings, external requests or unintended horizontal overflow were found.
- `git diff --check` passed.

## Integration and limits

`npm run check` stops at the existing baseline count assertion in `verify.mjs:5` (`140 !== 130`). The batch does not alter or weaken that shared assertion. The coordinator must update integrated counts and regenerate previews/plugin data after combining categories. Generated shared files and ZIP exports are intentionally excluded from the source commit.

This run does not claim Firefox/WebKit, screen-reader, actual operating-system IME or native picker-dialog coverage. Browser date/time presentation follows locale. Attachment checks concern filename extension and byte size, not file content. Measurement display rounds to eight decimal places; canonical millimetres remain unchanged by unit switches. No publishing, pushing, external persistence or installed-plugin update was performed.
