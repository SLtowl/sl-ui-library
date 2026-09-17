# Inputs basic 2 — local owner review

This batch adds ten distinct input patterns for local review only. It is intentionally not imported into `public/catalog-data.js`, built into the released catalog, pushed or published.

| Package | Interaction |
| --- | --- |
| `inputs-username-v11` | Profile handle validation, live count and stable editable draft. |
| `inputs-slug-v11` | Unicode path editing with an explicit, reversible Normalize action. |
| `inputs-percentage-v11` | 0–100 numeric validation, keyboard stepping and a smoothly updating meter. |
| `inputs-coordinates-v11` | Paired latitude/longitude validation and cardinal-direction preview. |
| `inputs-semantic-version-v11` | Major/minor/patch segments with bounded values and a local next-patch action. |
| `inputs-ipv4-v11` | One familiar dotted-address field that supports typing or pasting a complete IPv4 value and validates every 0–255 octet. |
| `inputs-card-number-v11` | Grouped digits and a local Luhn check; it makes no payment or network request. |
| `inputs-shortcut-v11` | Keyboard-chord recording, Escape cancellation and explicit clearing. |
| `inputs-search-replace-v11` | Literal match count and replacement inside a local sample line only. |
| `inputs-formula-v11` | Basic arithmetic through a small parser with no `eval` or dynamic code execution. |

All packages use native inputs and buttons, root-relative queries, literal text rendering, fresh state snapshots, repeat-safe reset/destroy, native form reset, forced-colors support and live reduced-motion CSS. Focus, validation, meters and helper text transition on one restrained 180–260 ms curve, with no delayed or perpetual motion.

Review URL while the local server is running: `http://127.0.0.1:4343/`.

## Verification

- `node --check` is run for every controller and the manifest.
- `node --test tests/batches/inputs-basic-2.test.mjs` covers package completeness, CSS scoping, safe controller source and ten-entry uniqueness.
- `SL_UI_BROWSER=1 node --test tests/batches/inputs-basic-2.test.mjs` additionally exercises every primary interaction, lifecycle cleanup, disabled state, narrow fit and reduced motion in headless Edge.
