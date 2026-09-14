# Sliders local expansion

## Owner approval — 2026-09-14

The owner reviewed and approved all five everyday additions: Cart quantity, Reading spacing, Content width, Card spacing and Thumbnail size. Continue local review with the ten Menus additions. This approval does not publish a release; the nine retained specialist sliders and the rejected Capacity thresholds keep the status described below.

## Owner revision — 2026-09-14

Local review only; no release, push or personal plugin installation. The owner rejected Capacity thresholds and requested five more everyday website controls. The remaining nine editors are retained, not replaced. The rejected source and ZIP were moved outside public/ into ignored .local/rejected/ and can also be recovered from Git history.

The local catalog now has 14 slider additions, 34 sliders overall, 234 components and 236 exports. The original approved baseline remains unchanged. The explicit catalog contract now expects this owner-requested 14-item slider batch and ten additions in each other category.

## Five new controls

| Package suffix | Name | Behavior |
| --- | --- | --- |
| quantity | Cart quantity | Integer quantity from 1 to 20, one-at-a-time buttons and exact subtotal in cents at the fixed example price of $12. No order is submitted. |
| line-height | Reading spacing | Unitless line-height from 1.2 to 2.0 applied to a real paragraph; Default returns 1.5. |
| content-width | Content width | Centered column from 50% to 100% of its container; text reflows without changing its font size. |
| card-gap | Card spacing | A 4–24 px gap between three fixed-size list cards; Compact and Spacious presets. |
| thumbnails | Thumbnail size | Six inline SVG gallery samples sized from 48 to 88 px, maintaining a 4:3 aspect ratio and wrapping into rows. |

Each suffix belongs to public/packages/sliders-<suffix>-v11/. These are distinct from the existing Type size and stepped-density controls: they edit quantity, actual line-height, column width, exact list gap and thumbnail dimensions.

The nine retained packages are loop, crossfade, gain, allocation, gradient-stops, frequency-band, envelope, dead-zone and tolerance. Their numeric behavior is unchanged.

## Hover repair

Reproduced the crossfade Equal power hover defect in Chromium. The generic :hover:enabled selector overrode the selected background while leaving dark selected text: background changed from rgb(212, 228, 216) to rgb(65, 72, 67), but text stayed rgb(32, 34, 34). Restricting that hover rule to buttons without aria-pressed="true" fixes the cascade. The same rule is corrected throughout this slider batch. The repaired selected state keeps its light background on hover.

## Package and language boundaries

Every new package contains index.html, buttons.css, buttons.js, example.js, the shared local font, OFL.txt and the existing repository MIT license. No external assets, requests or tracking are introduced.

Controllers follow mount(root, { values, disabled, onChange }) and expose fresh state, setValues(array), setDisabled(boolean), reset() and destroy(). User changes emit a bubbling, composed sliderchange event. Programmatic updates are silent. Consumers must connect application actions themselves; previews never save preferences or submit orders.

Public markup, sample names, controller labels, manifests and plugin assets remain English. The Russian review is generated separately under ignored .local/ru-review/. Its pixel labels are translated only for display; CSS values and exported state keep valid px units. The rejected package is absent from the catalog, compiled previews and offline bundle.

## Verification

- npm run build: passed, 234 components and 236 exports.
- node --test tests/batches/sliders.test.mjs: 32 passed, none failed or skipped. Includes all 14 package contracts, English offline sources, keyboard boundaries, isolated roots, reset/remount/destroy, disabled controls, new numeric/CSS values and the hover selector regression.
- npm run check: 152 passed, zero failed, 70 optional browser tests skipped in the default environment. Source/ZIP parity, offline plugin retrieval, palette export and English source validation passed.
- An additional all-category run with browser dependencies enabled was interrupted after it stalled; it is not counted as a completed full browser suite.
- Separate interactive Chromium checks completed for the five new controls: forward/reverse pointer drags, arrows, Home/End, Page keys, every preset, quantity buttons, actual rendered CSS changes and reset. Reduced-motion media emulation produced 0s button transitions.
- The crossfade hover regression was reproduced before repair and checked after repair. The rejected threshold route returns 404. All five new standalone routes and downloadable ZIPs return successfully.
- English standalone controls and compiled component pages were exercised. Russian previews were checked at 320, 768, 1024 and 1440 px, including maximum gallery/gap and narrowest column states.
- Compact preview spacing was adjusted after testing exposed clipped bottom controls in the new gallery and list-gap previews. No clipped controls or horizontal overflow remained in the final reviewed states.
- Final English root heights at 226 px width and dense states: quantity 400.1 px, line-height 405.9 px, content-width 423.2 px, card-gap 446.7 px, thumbnails 448.3 px. All are below the 458 px component-page content area.
- Screenshots and private translation files remain ignored and are not part of public/ or the plugin.

Firefox, WebKit, physical touch devices and screen-reader output were not tested. No publication or version bump has been performed. The owner still needs to review the five new controls.
